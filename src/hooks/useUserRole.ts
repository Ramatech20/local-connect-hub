import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { getSupabaseClient } from "@/integrations/supabase/safeClient";

export type UserRole = "customer" | "provider" | null;

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      const supabase = await getSupabaseClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching user role:", error);
          setRole(null);
        } else {
          setRole(data?.role as UserRole);
        }
      } catch (err) {
        console.error("Error:", err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  const setUserRole = async (newRole: "customer" | "provider") => {
    if (!user) return { error: new Error("Not authenticated") };

    const supabase = await getSupabaseClient();
    if (!supabase) return { error: new Error("Backend not available") };

    try {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: user.id, role: newRole });

      if (error) {
        console.error("Error setting role:", error);
        return { error };
      }

      setRole(newRole);
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  return { role, loading, setUserRole };
};
