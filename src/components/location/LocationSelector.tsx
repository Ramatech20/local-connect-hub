import { useState, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { kenyaCities, getCityEstates } from "@/data/locations";
import { cn } from "@/lib/utils";

interface LocationSelectorProps {
  onLocationChange?: (city: string, estate: string) => void;
  className?: string;
  variant?: "default" | "compact" | "hero";
  defaultCity?: string;
  defaultEstate?: string;
}

export const LocationSelector = ({
  onLocationChange,
  className,
  variant = "default",
  defaultCity = "nairobi",
  defaultEstate = ""
}: LocationSelectorProps) => {
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [selectedEstate, setSelectedEstate] = useState(defaultEstate);
  const [estates, setEstates] = useState<string[]>([]);

  useEffect(() => {
    setEstates(getCityEstates(selectedCity));
    setSelectedEstate("");
  }, [selectedCity]);

  useEffect(() => {
    if (onLocationChange) {
      onLocationChange(selectedCity, selectedEstate);
    }
  }, [selectedCity, selectedEstate, onLocationChange]);

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <MapPin className="h-4 w-4 text-primary" />
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-auto border-0 p-0 h-auto text-sm font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {kenyaCities.map(city => (
              <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedEstate && (
          <span className="text-muted-foreground">• {selectedEstate}</span>
        )}
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={cn("flex flex-col sm:flex-row gap-3", className)}>
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground/80 mb-1.5 block">City</label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full bg-background/80 backdrop-blur-sm border-border/50 h-12">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <SelectValue placeholder="Select city" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {kenyaCities.map(city => (
                <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground/80 mb-1.5 block">Estate / Area</label>
          <Select value={selectedEstate} onValueChange={setSelectedEstate}>
            <SelectTrigger className="w-full bg-background/80 backdrop-blur-sm border-border/50 h-12">
              <SelectValue placeholder="Select area" />
            </SelectTrigger>
            <SelectContent>
              {estates.map(estate => (
                <SelectItem key={estate} value={estate}>{estate}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col sm:flex-row gap-3", className)}>
      <Select value={selectedCity} onValueChange={setSelectedCity}>
        <SelectTrigger className="w-full sm:w-40">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <SelectValue placeholder="Select city" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {kenyaCities.map(city => (
            <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedEstate} onValueChange={setSelectedEstate}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Select area" />
        </SelectTrigger>
        <SelectContent>
          {estates.map(estate => (
            <SelectItem key={estate} value={estate}>{estate}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

interface LocationTagProps {
  city: string;
  estate?: string;
  distance?: string;
  available?: boolean;
  className?: string;
}

export const LocationTag = ({ city, estate, distance, available, className }: LocationTagProps) => {
  return (
    <div className={cn("flex items-center gap-1.5 text-sm", className)}>
      <MapPin className="h-3.5 w-3.5 text-primary" />
      <span className="text-muted-foreground">
        {estate ? `${estate}, ${city}` : city}
      </span>
      {distance && (
        <span className="text-xs text-primary font-medium">• {distance}</span>
      )}
      {available && (
        <span className="text-xs text-green-600 font-medium">• Available</span>
      )}
    </div>
  );
};
