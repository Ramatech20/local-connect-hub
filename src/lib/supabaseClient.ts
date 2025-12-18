import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Use Vite's import.meta.env only — process is not defined in the browser.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.length > 0 &&
  supabaseAnonKey.length > 0 &&
  !String(supabaseUrl).includes("your-project") &&
  !String(supabaseUrl).includes("local-connect-hub") &&
  !String(supabaseAnonKey).includes("replace-with") &&
  !String(supabaseAnonKey).toLowerCase().includes("your-anon-key")
);

// Only create a real client if properly configured
// Use a placeholder URL/key to avoid the "supabaseUrl is required" error
const placeholderUrl = "https://placeholder.supabase.co";
const placeholderKey = "placeholder-key";

export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? supabaseUrl : placeholderUrl,
  isSupabaseConfigured ? supabaseAnonKey : placeholderKey
);

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase not configured: Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable backend features."
  );
}

export default supabase;
