import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "@/hooks/use-toast";

interface RoleSelectorProps {
  onComplete?: () => void;
}

const RoleSelector = ({ onComplete }: RoleSelectorProps) => {
  const { setUserRole } = useUserRole();
  const [selecting, setSelecting] = useState(false);
  const navigate = useNavigate();

  const handleSelectRole = async (role: "customer" | "provider") => {
    setSelecting(true);
    const { error } = await setUserRole(role);
    setSelecting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to set your role. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Welcome!",
      description: role === "provider" 
        ? "You're now registered as a service provider"
        : "You're now ready to find services",
    });

    onComplete?.();
    
    if (role === "provider") {
      navigate("/provider-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            How will you use Huduma?
          </h1>
          <p className="text-muted-foreground">
            Choose your role to get started
          </p>
        </div>

        <div className="grid gap-4">
          <button
            onClick={() => handleSelectRole("customer")}
            disabled={selecting}
            className="p-6 bg-card border-2 border-border rounded-2xl hover:border-primary transition-all text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">I need services</h3>
                <p className="text-muted-foreground mt-1">
                  Find and book trusted local service providers for your needs
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleSelectRole("provider")}
            disabled={selecting}
            className="p-6 bg-card border-2 border-border rounded-2xl hover:border-primary transition-all text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">I provide services</h3>
                <p className="text-muted-foreground mt-1">
                  Grow your business by connecting with customers in your area
                </p>
              </div>
            </div>
          </button>
        </div>

        {selecting && (
          <p className="text-center text-muted-foreground mt-4">Setting up your account...</p>
        )}
      </div>
    </div>
  );
};

export default RoleSelector;
