import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";

const schema = z.object({ email: z.string().min(1, "Email required").email("Invalid email") });
type FormValues = z.infer<typeof schema>;

const ForgotPassword = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      // Supabase v2 API: resetPasswordForEmail
      const res = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/login`,
      } as any);
      if ((res as any).error) {
        toast({ title: "Error", description: (res as any).error.message });
      } else {
        toast({ title: "Email sent", description: "Check your inbox for password reset instructions." });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e?.message ?? "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Reset your password</h1>
        <p className="text-muted-foreground mb-6">Enter your email and we'll send a password reset link.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input className="pl-10" type="email" placeholder="you@example.com" {...register("email")} />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading || formState.isSubmitting}>
            {loading ? "Sending..." : "Send reset email"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
