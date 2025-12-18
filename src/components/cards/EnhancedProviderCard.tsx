import { Link } from "react-router-dom";
import { Star, MapPin, Clock, BadgeCheck, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrustBadge, TrustBadgesGroup, ProviderMetrics, BadgeType } from "@/components/badges/TrustBadge";
import { cn } from "@/lib/utils";

export interface Provider {
  id: string;
  name: string;
  profession: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  estate?: string;
  city?: string;
  distance?: string;
  price: string;
  isVerified: boolean;
  isFeatured?: boolean;
  isIdVerified?: boolean;
  isBackgroundChecked?: boolean;
  isTopRated?: boolean;
  completionRate?: number;
  responseTime?: string;
  category?: string;
  availableToday?: boolean;
}

interface EnhancedProviderCardProps {
  provider: Provider;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export const EnhancedProviderCard = ({ provider, variant = "default", className }: EnhancedProviderCardProps) => {
  const badges: BadgeType[] = [];
  if (provider.isIdVerified || provider.isVerified) badges.push("id-verified");
  if (provider.isBackgroundChecked) badges.push("background-checked");
  if (provider.isTopRated || provider.rating >= 4.8) badges.push("top-rated");
  if (provider.responseTime && provider.responseTime.includes("<")) badges.push("fast-response");

  if (variant === "compact") {
    return (
      <Link to={`/provider/${provider.id}`}>
        <Card className={cn(
          "group hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50",
          provider.isFeatured && "ring-2 ring-primary/20",
          className
        )}>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="relative">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              {provider.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                  <BadgeCheck size={12} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{provider.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{provider.profession}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{provider.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">{provider.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/provider/${provider.id}`}>
      <Card className={cn(
        "group hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50 h-full",
        provider.isFeatured && "ring-2 ring-primary/20 bg-gradient-to-b from-primary/5 to-transparent",
        className
      )}>
        <div className="relative">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Featured badge */}
          {provider.isFeatured && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </div>
          )}
          {/* Available today badge */}
          {provider.availableToday && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Available Today
            </div>
          )}
          {/* Verification badge on image */}
          {provider.isVerified && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
              <BadgeCheck className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Name and profession */}
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {provider.name}
            </h3>
            <p className="text-sm text-muted-foreground">{provider.profession}</p>
          </div>

          {/* Trust badges */}
          <TrustBadgesGroup badges={badges} size="sm" showLabels={false} />

          {/* Metrics */}
          {(provider.completionRate || provider.responseTime) && (
            <ProviderMetrics
              completionRate={provider.completionRate}
              responseTime={provider.responseTime}
            />
          )}

          {/* Rating and reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-sm">{provider.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({provider.reviewCount} reviews)</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{provider.location}</span>
            {provider.distance && (
              <span className="text-primary font-medium">• {provider.distance}</span>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div>
              <span className="text-sm text-muted-foreground">From</span>
              <p className="font-bold text-lg text-primary">{provider.price}</p>
            </div>
            <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
