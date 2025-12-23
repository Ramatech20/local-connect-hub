import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Gift, Copy, Share2, Users, Wallet, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { getSupabaseClient } from "@/integrations/supabase/safeClient";

const Referrals = () => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string>("");
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    successfulReferrals: 0,
    totalEarnings: 0,
  });
  const [creditBalance, setCreditBalance] = useState(0);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        setUser(null);
        setLoading(false);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchReferralData(session.user.id);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const fetchReferralData = async (userId: string) => {
    const supabase = await getSupabaseClient();
    if (!supabase) return;

    try {
      // Fetch referral code
      const { data: codeData } = await supabase
        .from("referral_codes")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (codeData) {
        setReferralCode(codeData.code);
        setReferralStats({
          totalReferrals: codeData.total_referrals || 0,
          successfulReferrals: codeData.successful_referrals || 0,
          totalEarnings: codeData.total_earnings || 0,
        });
      }

      // Fetch credit balance
      const { data: creditData } = await supabase
        .from("user_credits")
        .select("balance")
        .eq("user_id", userId)
        .maybeSingle();

      if (creditData) {
        setCreditBalance(creditData.balance || 0);
      }

      // Fetch referral history
      const { data: referralData } = await supabase
        .from("referrals")
        .select("*")
        .eq("referrer_id", userId)
        .order("created_at", { ascending: false });

      if (referralData) {
        setReferrals(referralData);
      }
    } catch (error) {
      console.error("Error fetching referral data:", error);
    }
  };

  const copyToClipboard = () => {
    const referralLink = `${window.location.origin}/register?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const shareReferral = async () => {
    const referralLink = `${window.location.origin}/register?ref=${referralCode}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Huduma Hub",
          text: "Sign up using my referral link and we both get rewards!",
          url: referralLink,
        });
      } catch (error) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const rewardAmount = 200; // KES 200 reward per successful referral
  const discountPercent = 10; // 10% discount option

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Gift className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Refer & Earn</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Share Huduma Hub with friends and family. When they complete their first order, 
              you both get rewarded with discounts or credits!
            </p>
          </div>

          {!user ? (
            // Not logged in state
            <Card className="max-w-xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle>Join to Start Earning</CardTitle>
                <CardDescription>
                  Sign up or log in to get your unique referral code and start earning rewards
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 items-center">
                <Button asChild size="lg">
                  <a href="/register">Create Account</a>
                </Button>
                <p className="text-sm text-muted-foreground">
                  Already have an account? <a href="/login" className="text-primary hover:underline">Log in</a>
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Referrals</p>
                        <p className="text-2xl font-bold">{referralStats.totalReferrals}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-green-500/10">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Successful</p>
                        <p className="text-2xl font-bold">{referralStats.successfulReferrals}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-amber-500/10">
                        <Wallet className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Earned</p>
                        <p className="text-2xl font-bold">KES {referralStats.totalEarnings}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-blue-500/10">
                        <Gift className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Credit Balance</p>
                        <p className="text-2xl font-bold">KES {creditBalance}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Referral Code Card */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Your Referral Code</CardTitle>
                  <CardDescription>
                    Share your unique code with friends and earn rewards when they complete their first order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex gap-2">
                        <Input
                          value={`${window.location.origin}/register?ref=${referralCode}`}
                          readOnly
                          className="font-mono"
                        />
                        <Button variant="outline" size="icon" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Your code: <span className="font-mono font-bold text-primary">{referralCode}</span>
                      </p>
                    </div>
                    <Button onClick={shareReferral} className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* How it Works */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-primary">1</span>
                      </div>
                      <h3 className="font-semibold mb-2">Share Your Code</h3>
                      <p className="text-sm text-muted-foreground">
                        Send your unique referral link to friends, family, or share on social media
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-primary">2</span>
                      </div>
                      <h3 className="font-semibold mb-2">They Sign Up & Order</h3>
                      <p className="text-sm text-muted-foreground">
                        Your friend signs up using your link and completes their first booking
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-primary">3</span>
                      </div>
                      <h3 className="font-semibold mb-2">You Both Earn</h3>
                      <p className="text-sm text-muted-foreground">
                        You get KES {rewardAmount} credit or {discountPercent}% off, and so does your friend!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reward Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2">Option 1</Badge>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Account Credit
                    </CardTitle>
                    <CardDescription>
                      Get KES {rewardAmount} added to your account balance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Use on any service
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        No expiry date
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Stackable with other offers
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Option 2</Badge>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5" />
                      Percentage Discount
                    </CardTitle>
                    <CardDescription>
                      Get {discountPercent}% off your next booking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Instant discount
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Valid for 30 days
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Great for premium services
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Referral History */}
              <Card>
                <CardHeader>
                  <CardTitle>Referral History</CardTitle>
                  <CardDescription>Track the status of your referrals</CardDescription>
                </CardHeader>
                <CardContent>
                  {referrals.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No referrals yet. Share your code to start earning!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {referrals.map((referral) => (
                        <div
                          key={referral.id}
                          className="flex items-center justify-between p-4 rounded-lg border"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${
                              referral.status === "rewarded" 
                                ? "bg-green-500/10" 
                                : referral.status === "completed"
                                ? "bg-blue-500/10"
                                : "bg-amber-500/10"
                            }`}>
                              {referral.status === "rewarded" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : referral.status === "completed" ? (
                                <ArrowRight className="h-5 w-5 text-blue-500" />
                              ) : (
                                <Clock className="h-5 w-5 text-amber-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">Referral #{referral.id.slice(0, 8)}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(referral.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={
                              referral.status === "rewarded" 
                                ? "default" 
                                : referral.status === "completed"
                                ? "secondary"
                                : "outline"
                            }>
                              {referral.status === "rewarded" 
                                ? "Rewarded" 
                                : referral.status === "completed"
                                ? "Completed"
                                : "Pending"}
                            </Badge>
                            {referral.reward_amount > 0 && (
                              <p className="text-sm text-green-600 mt-1">
                                +KES {referral.reward_amount}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Referrals;
