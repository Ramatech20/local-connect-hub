import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export interface Conversation {
  id: string;
  customer_id: string;
  provider_id: string;
  created_at: string;
  updated_at: string;
  other_user?: {
    full_name: string | null;
    avatar_url: string | null;
  };
  last_message?: {
    content: string;
    created_at: string;
  };
  unread_count?: number;
}

export const useConversations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    if (!user) {
      setConversations([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .or(`customer_id.eq.${user.id},provider_id.eq.${user.id}`)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching conversations:", error);
        return;
      }

      // Fetch additional data for each conversation
      const enrichedConversations = await Promise.all(
        (data || []).map(async (conv) => {
          const otherUserId = conv.customer_id === user.id ? conv.provider_id : conv.customer_id;

          // Get other user's profile
          const { data: profileData } = await supabase
            .from("profiles")
            .select("full_name, avatar_url")
            .eq("user_id", otherUserId)
            .maybeSingle();

          // Get last message
          const { data: lastMessageData } = await supabase
            .from("messages")
            .select("content, created_at")
            .eq("conversation_id", conv.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();

          // Get unread count
          const { count } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conv.id)
            .neq("sender_id", user.id)
            .is("read_at", null);

          return {
            ...conv,
            other_user: profileData,
            last_message: lastMessageData,
            unread_count: count || 0,
          };
        })
      );

      setConversations(enrichedConversations);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("conversations-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        () => {
          fetchConversations();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const createConversation = async (providerId: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      // Check if conversation already exists
      const { data: existing } = await supabase
        .from("conversations")
        .select("id")
        .eq("customer_id", user.id)
        .eq("provider_id", providerId)
        .maybeSingle();

      if (existing) {
        return { data: existing, error: null };
      }

      const { data, error } = await supabase
        .from("conversations")
        .insert({ customer_id: user.id, provider_id: providerId })
        .select()
        .single();

      if (error) {
        console.error("Error creating conversation:", error);
        return { error };
      }

      fetchConversations();
      return { data, error: null };
    } catch (err) {
      return { error: err };
    }
  };

  return { conversations, loading, createConversation, refetch: fetchConversations };
};
