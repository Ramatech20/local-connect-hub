import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export interface Review {
  id: string;
  reviewer_id: string;
  provider_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  reviewer?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export const useReviews = (providerId?: string) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState<number>(0);

  const fetchReviews = async () => {
    if (!providerId) {
      setReviews([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("provider_id", providerId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
        return;
      }

      // Fetch reviewer profiles
      const enrichedReviews = await Promise.all(
        (data || []).map(async (review) => {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("full_name, avatar_url")
            .eq("user_id", review.reviewer_id)
            .maybeSingle();

          return {
            ...review,
            reviewer: profileData,
          };
        })
      );

      setReviews(enrichedReviews);

      // Calculate average rating
      if (enrichedReviews.length > 0) {
        const total = enrichedReviews.reduce((sum, r) => sum + r.rating, 0);
        setAverageRating(total / enrichedReviews.length);
      } else {
        setAverageRating(0);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [providerId]);

  const addReview = async (rating: number, comment?: string) => {
    if (!user || !providerId) {
      return { error: new Error("Not authenticated or no provider specified") };
    }

    try {
      // Check if user already reviewed this provider
      const { data: existing } = await supabase
        .from("reviews")
        .select("id")
        .eq("reviewer_id", user.id)
        .eq("provider_id", providerId)
        .maybeSingle();

      if (existing) {
        return { error: new Error("You have already reviewed this provider") };
      }

      const { data, error } = await supabase
        .from("reviews")
        .insert({
          reviewer_id: user.id,
          provider_id: providerId,
          rating,
          comment: comment || null,
        })
        .select()
        .single();

      if (error) {
        console.error("Error adding review:", error);
        return { error };
      }

      fetchReviews();
      return { data, error: null };
    } catch (err) {
      return { error: err };
    }
  };

  const updateReview = async (reviewId: string, rating: number, comment?: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      const { data, error } = await supabase
        .from("reviews")
        .update({ rating, comment: comment || null })
        .eq("id", reviewId)
        .eq("reviewer_id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating review:", error);
        return { error };
      }

      fetchReviews();
      return { data, error: null };
    } catch (err) {
      return { error: err };
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId)
        .eq("reviewer_id", user.id);

      if (error) {
        console.error("Error deleting review:", error);
        return { error };
      }

      fetchReviews();
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  return { reviews, loading, averageRating, addReview, updateReview, deleteReview, refetch: fetchReviews };
};
