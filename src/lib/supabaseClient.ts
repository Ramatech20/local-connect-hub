import { createClient } from "@supabase/supabase-js";

// Use Vite's import.meta.env only — process is not defined in the browser.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Do not throw to avoid breaking imports in tests/build; provide clear guidance.
  console.error(
    "Missing Supabase env vars: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file",
  );
}

export const supabase = createClient(String(supabaseUrl ?? ""), String(supabaseAnonKey ?? ""));

export default supabase;

// Helpful flag for runtime guards
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !String(supabaseUrl).includes("your-project") &&
    !String(supabaseUrl).includes("local-connect-hub") &&
    !String(supabaseAnonKey).includes("replace-with") &&
    !String(supabaseAnonKey).toLowerCase().includes("your-anon-key"),
);
