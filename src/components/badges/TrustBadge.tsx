import { BadgeCheck, Shield, Star, Clock, CreditCard, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeType = 
  | "id-verified" 
  | "background-checked" 
  | "top-rated" 
  | "fast-response" 
  | "verified-payment" 
  | "repeat-customer";

interface TrustBadgeProps {
  type: BadgeType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const badgeConfig: Record<BadgeType, { icon: typeof BadgeCheck; label: string; colorClass: string }> = {
  "id-verified": {
    icon: BadgeCheck,
    label: "ID Verified",
    colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
  },
  "background-checked": {
    icon: Shield,
    label: "Background Checked",
    colorClass: "bg-blue-500/10 text-blue-600 border-blue-500/20"
  },
  "top-rated": {
    icon: Star,
    label: "Top Rated",
    colorClass: "bg-amber-500/10 text-amber-600 border-amber-500/20"
  },
  "fast-response": {
    icon: Clock,
    label: "Fast Response",
    colorClass: "bg-purple-500/10 text-purple-600 border-purple-500/20"
  },
  "verified-payment": {
    icon: CreditCard,
    label: "Verified Payment",
    colorClass: "bg-green-500/10 text-green-600 border-green-500/20"
  },
  "repeat-customer": {
    icon: Users,
    label: "Repeat Customer",
    colorClass: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20"
  }
};

const sizeClasses = {
  sm: "text-xs px-1.5 py-0.5 gap-1",
  md: "text-sm px-2 py-1 gap-1.5",
  lg: "text-base px-3 py-1.5 gap-2"
};

const iconSizes = {
  sm: 12,
  md: 14,
  lg: 16
};

export const TrustBadge = ({ type, size = "sm", showLabel = true, className }: TrustBadgeProps) => {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        sizeClasses[size],
        config.colorClass,
        className
      )}
    >
      <Icon size={iconSizes[size]} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};

interface ProviderMetricsProps {
  completionRate?: number;
  responseTime?: string;
  className?: string;
}

export const ProviderMetrics = ({ completionRate, responseTime, className }: ProviderMetricsProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2 text-xs text-muted-foreground", className)}>
      {completionRate && (
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          {completionRate}% Completion Rate
        </span>
      )}
      {responseTime && (
        <span className="flex items-center gap-1">
          <Clock size={12} />
          Responds in {responseTime}
        </span>
      )}
    </div>
  );
};

interface TrustBadgesGroupProps {
  badges: BadgeType[];
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  className?: string;
}

export const TrustBadgesGroup = ({ badges, size = "sm", showLabels = true, className }: TrustBadgesGroupProps) => {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {badges.map(badge => (
        <TrustBadge key={badge} type={badge} size={size} showLabel={showLabels} />
      ))}
    </div>
  );
};
