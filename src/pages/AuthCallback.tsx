import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // Exchange any url fragment for a session (handles OAuth and magic links)
        const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true } as any);
        if (error) {
          toast({ title: "Auth error", description: error.message });
          navigate("/login");
          return;
        }

        // If session exists, navigate to home or intended route
        if (data?.session) {
          toast({ title: "Email confirmed", description: "Your email has been verified." });
          navigate("/");
        } else {
          // If no session, redirect to login with a message
          toast({ title: "Verification pending", description: "Please log in to continue." });
          navigate("/login");
        }
      } catch (e: any) {
        toast({ title: "Error", description: e?.message ?? "Authentication callback failed." });
        navigate("/login");
      }
    })();
  }, [navigate]);

  return <div className="min-h-screen flex items-center justify-center">Processing authentication...</div>;
};

export default AuthCallback;
