import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { getSupabaseClient } from "@/integrations/supabase/safeClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const supabase = await getSupabaseClient();
        if (!supabase) {
          toast({ title: "Auth error", description: "Backend is not configured yet." });
          navigate("/login");
          return;
        }

        // Get the current session after OAuth/magic link redirect
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          toast({ title: "Auth error", description: error.message });
          navigate("/login");
          return;
        }

        if (data?.session) {
          toast({ title: "Welcome!", description: "You have been signed in successfully." });
          navigate("/");
        } else {
          toast({ title: "Verification pending", description: "Please log in to continue." });
          navigate("/login");
        }
      } catch (e: any) {
        toast({ title: "Error", description: e?.message ?? "Authentication callback failed." });
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="sr-only">Authentication callback</h1>
      <p className="text-muted-foreground">Processing authentication…</p>
    </main>
  );
};

export default AuthCallback;

