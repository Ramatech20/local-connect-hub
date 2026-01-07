import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Building, Gift } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "@/hooks/use-toast";
import { getSupabaseClient } from "@/integrations/supabase/safeClient";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const [searchParams] = useSearchParams();
  const isProvider = searchParams.get("type") === "provider";
  const refCode = searchParams.get("ref") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"customer" | "provider">(isProvider ? "provider" : "customer");
  const [step, setStep] = useState(1);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [referralCode, setReferralCode] = useState(refCode);
  const [referralValid, setReferralValid] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // Validate referral code (if backend isn't available yet, keep it neutral)
  useEffect(() => {
    let cancelled = false;

    const validateReferralCode = async () => {
      if (!referralCode) {
        if (!cancelled) setReferralValid(null);
        return;
      }

      const supabaseClient = await getSupabaseClient();
      if (!supabaseClient) {
        if (!cancelled) setReferralValid(null);
        return;
      }

      const { data } = await supabaseClient
        .from("referral_codes")
        .select("code")
        .eq("code", referralCode.toUpperCase())
        .maybeSingle();

      if (!cancelled) setReferralValid(!!data);
    };

    const timeout = window.setTimeout(validateReferralCode, 500);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [referralCode]);

  const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  type FormValues = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", lastName: "", email: "", phone: "", password: "" },
  });

  const { signUp } = useAuth();

  const submitCustomer = async (data: FormValues) => {
    if (!agreeTerms) {
      toast({ title: "Terms Required", description: "Please agree to the Terms of Service and Privacy Policy." });
      return;
    }
    
    const res = await signUp(data.email, data.password);
    if (res.error) {
      toast({ title: "Sign up failed", description: res.error.message });
      return;
    }

    // Wait a moment for auth to complete, then set role
    setTimeout(async () => {
      const supabaseClient = await getSupabaseClient();
      if (!supabaseClient) return;

      const { data: sessionData } = await supabaseClient.auth.getSession();
      if (sessionData?.session?.user) {
        // Set user role
        await supabaseClient.from("user_roles").insert({
          user_id: sessionData.session.user.id,
          role: userType,
        });

        // Update profile with name and phone
        await supabaseClient.from("profiles").update({
          full_name: `${data.firstName} ${data.lastName}`,
          phone: data.phone,
        }).eq("user_id", sessionData.session.user.id);
      }
    }, 1000);

    toast({ title: "Account created", description: "Check your email to confirm your account." });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold text-foreground">Huduma</span>
          </Link>

          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Create your account
          </h1>
          <p className="text-muted-foreground mb-8">
            Join thousands of Kenyans using Huduma
          </p>

          {/* User Type Toggle */}
          <div className="flex p-1 bg-muted rounded-xl mb-8">
            <button
              onClick={() => setUserType("customer")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                userType === "customer"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              I need services
            </button>
            <button
              onClick={() => setUserType("provider")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                userType === "provider"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              I provide services
            </button>
          </div>

          {step === 1 && (
            <form className="space-y-4 animate-fade-in" onSubmit={handleSubmit(submitCustomer)}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input className="pl-10" placeholder="John" {...register("firstName")} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <Input placeholder="Doe" {...register("lastName")} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input className="pl-10" type="email" placeholder="john@example.com" {...register("email")} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input className="pl-10" placeholder="+254 7XX XXX XXX" {...register("phone")} />
                  </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      className="pl-10 pr-10"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      {...register("password")}
                    />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Referral Code Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Referral Code (Optional)
                </label>
                <div className="relative">
                  <Gift className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    className={`pl-10 ${referralValid === true ? 'border-green-500' : referralValid === false ? 'border-red-500' : ''}`}
                    placeholder="Enter referral code"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  />
                </div>
                {referralValid === true && (
                  <p className="text-sm text-green-600 mt-1">Valid referral code! You will receive a reward after your first order.</p>
                )}
                {referralValid === false && (
                  <p className="text-sm text-red-600 mt-1">Invalid referral code</p>
                )}
              </div>

              {/* Terms Agreement Checkbox */}
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline font-medium">
                    Terms of Service
                  </Link>
                  ,{" "}
                  <Link to="/privacy" className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  , and{" "}
                  <Link to="/cookies" className="text-primary hover:underline font-medium">
                    Cookie Policy
                  </Link>
                  . I understand that Huduma charges a platform fee on completed bookings.
                </label>
              </div>

              {userType === "provider" ? (
                <Button className="w-full" size="lg" onClick={() => setStep(2)} disabled={!agreeTerms}>
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button className="w-full" size="lg" disabled={!agreeTerms}>
                  Create Account
                </Button>
              )}
            </form>
          )}

          {step === 2 && userType === "provider" && (
            <form className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Business/Professional Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input className="pl-10" placeholder="Your business name" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Service Category
                </label>
                <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground">
                  <option value="">Select your main service</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="mechanics">Auto Mechanics</option>
                  <option value="salon">Salon & Beauty</option>
                  <option value="tech">IT & Tech Support</option>
                  <option value="photography">Photography</option>
                  <option value="tutoring">Tutoring</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location/Area of Service
                </label>
                <Input placeholder="e.g., Westlands, Nairobi" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Years of Experience
                </label>
                <Input type="number" placeholder="5" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Brief Description
                </label>
                <textarea
                  className="w-full p-3 rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Tell us about your services..."
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="flex-1">
                  Create Account
                </Button>
              </div>
            </form>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={async () => {
              const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  redirectTo: `${window.location.origin}/`,
                },
              });
              if (error) {
                toast({ title: "Google sign up failed", description: error.message });
              }
            }}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>

          <p className="mt-8 text-xs text-muted-foreground text-center">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            {userType === "provider"
              ? "Grow your business with Huduma"
              : "Find trusted professionals"}
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            {userType === "provider"
              ? "Join our network of verified service providers and reach thousands of customers in your area."
              : "Connect with verified local service providers for all your needs - from home repairs to personal care."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
