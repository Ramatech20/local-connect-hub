import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type AppSupabaseClient = SupabaseClient<Database>;

let clientPromise: Promise<AppSupabaseClient | null> | null = null;

/**
 * Lazily loads the auto-generated backend client.
 * This prevents the entire app from crashing at startup if environment variables are missing.
 */
export async function getSupabaseClient(): Promise<AppSupabaseClient | null> {
  if (clientPromise) return clientPromise;

  clientPromise = (async () => {
    try {
      const mod = await import("@/integrations/supabase/client");
      return mod.supabase as AppSupabaseClient;
    } catch (e) {
      console.warn("Backend client failed to initialize (missing env vars?)", e);
      return null;
    }
  })();

  return clientPromise;
}
