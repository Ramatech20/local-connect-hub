import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
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

  return <div className="min-h-screen flex items-center justify-center">Processing authentication...</div>;
};

export default AuthCallback;
