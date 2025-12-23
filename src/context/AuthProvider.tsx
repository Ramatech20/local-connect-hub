import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/integrations/supabase/safeClient";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    (async () => {
      const supabase = await getSupabaseClient();

      // If the backend client can't initialize (e.g. env vars missing), don't crash the whole app.
      if (!supabase) {
        setSession(null);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
      } catch (e) {
        console.warn("Error getting initial session", e);
      } finally {
        setLoading(false);
      }

      const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
        setSession(nextSession ?? null);
        setUser(nextSession?.user ?? null);
        setLoading(false);
      });

      unsubscribe = () => {
        try {
          listener.subscription?.unsubscribe();
        } catch {}
      };
    })();

    return () => {
      unsubscribe?.();
    };
  }, []);

  const signUp = async (email: string, password: string, redirectTo?: string) => {
    const supabase = await getSupabaseClient();
    if (!supabase) {
      return Promise.resolve({ data: null, error: { message: "Backend is not configured yet." } });
    }

    const redirect = redirectTo ?? `${window.location.origin}/auth/callback`;
    return supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirect },
    });
  };

  const signIn = async (email: string, password: string) => {
    const supabase = await getSupabaseClient();
    if (!supabase) {
      return Promise.resolve({ data: null, error: { message: "Backend is not configured yet." } });
    }

    return supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    const supabase = await getSupabaseClient();
    if (!supabase) {
      return Promise.resolve({ error: { message: "Backend is not configured yet." } });
    }

    return supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthProvider;
