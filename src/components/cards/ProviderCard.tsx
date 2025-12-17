import { Star, BadgeCheck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface ProviderCardProps {
  id: string;
  name: string;
  profession: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: string;
  isVerified?: boolean;
  isFeatured?: boolean;
}

const ProviderCard = ({
  id,
  name,
  profession,
  image,
  rating,
  reviewCount,
  location,
  price,
  isVerified = false,
  isFeatured = false,
}: ProviderCardProps) => {
  return (
    <Link to={`/provider/${id}`} className="group block">
      <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {isFeatured && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
              Featured
            </div>
          )}
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-card/95 backdrop-blur-sm text-sm font-semibold text-foreground">
            From {price}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                {name}
                {isVerified && (
                  <BadgeCheck className="w-4 h-4 text-success" />
                )}
              </h3>
              <p className="text-sm text-muted-foreground">{profession}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProviderCard;
