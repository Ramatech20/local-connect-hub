import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthProvider";
import { getSupabaseClient, AppSupabaseClient } from "@/integrations/supabase/safeClient";

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
}

export const useMessages = (conversationId: string | null) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const channelRef = useRef<ReturnType<AppSupabaseClient["channel"]> | null>(null);

  const fetchMessages = async () => {
    if (!conversationId || !user) {
      setMessages([]);
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
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data || []);

      // Mark messages as read
      await supabase
        .from("messages")
        .update({ read_at: new Date().toISOString() })
        .eq("conversation_id", conversationId)
        .neq("sender_id", user.id)
        .is("read_at", null);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const setup = async () => {
      await fetchMessages();

      if (!isMounted || !conversationId) return;

      const supabase = await getSupabaseClient();
      if (!supabase) return;

      // Subscribe to realtime updates
      const channel = supabase
        .channel(`messages-${conversationId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${conversationId}`,
          },
          async (payload) => {
            setMessages((prev) => [...prev, payload.new as Message]);

            // Mark as read if not sender
            if (user && payload.new.sender_id !== user.id) {
              const sb = await getSupabaseClient();
              if (sb) {
                sb.from("messages")
                  .update({ read_at: new Date().toISOString() })
                  .eq("id", payload.new.id);
              }
            }
          }
        )
        .subscribe();

      channelRef.current = channel;
    };

    setup();

    return () => {
      isMounted = false;
      if (channelRef.current) {
        getSupabaseClient().then((supabase) => {
          if (supabase && channelRef.current) {
            supabase.removeChannel(channelRef.current);
          }
        });
      }
    };
  }, [conversationId, user]);

  const sendMessage = async (content: string) => {
    if (!conversationId || !user || !content.trim()) {
      return { error: new Error("Invalid message") };
    }

    const supabase = await getSupabaseClient();
    if (!supabase) return { error: new Error("Backend not available") };

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: content.trim(),
        })
        .select()
        .single();

      if (error) {
        console.error("Error sending message:", error);
        return { error };
      }

      // Update conversation updated_at
      await supabase
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", conversationId);

      return { data, error: null };
    } catch (err) {
      return { error: err };
    }
  };

  return { messages, loading, sendMessage, refetch: fetchMessages };
};
