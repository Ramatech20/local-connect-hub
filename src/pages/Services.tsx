import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Search, Filter, Star, MapPin, ChevronDown, SlidersHorizontal,
  Grid3X3, List, BadgeCheck, X
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { EnhancedProviderCard, Provider } from "@/components/cards/EnhancedProviderCard";
import { LocationSelector } from "@/components/location/LocationSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { kenyaCities } from "@/data/locations";

const allProviders: Provider[] = [
  {
    id: "1",
    name: "John Kamau",
    profession: "Master Plumber",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    rating: 4.9,
    reviewCount: 127,
    location: "Westlands, Nairobi",
    city: "Nairobi",
    estate: "Westlands",
    distance: "2km",
    price: "KES 1,500",
    isVerified: true,
    isIdVerified: true,
    isBackgroundChecked: true,
    isTopRated: true,
    isFeatured: true,
    category: "plumbing",
    completionRate: 98,
    responseTime: "<2hrs",
    availableToday: true,
  },
  {
    id: "2",
    name: "Grace Wanjiku",
    profession: "Professional Cleaner",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
    rating: 4.8,
    reviewCount: 89,
    location: "Kilimani, Nairobi",
    city: "Nairobi",
    estate: "Kilimani",
    distance: "1.5km",
    price: "KES 2,000",
    isVerified: true,
    isIdVerified: true,
    isBackgroundChecked: true,
    isFeatured: true,
    category: "cleaning",
    completionRate: 96,
    responseTime: "<1hr",
    availableToday: true,
  },
  {
    id: "3",
    name: "Peter Ochieng",
    profession: "Auto Mechanic",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.7,
    reviewCount: 156,
    location: "Industrial Area, Nairobi",
    city: "Nairobi",
    estate: "Industrial Area",
    price: "KES 2,500",
    isVerified: true,
    isIdVerified: true,
    isFeatured: false,
    category: "mechanics",
    completionRate: 94,
    responseTime: "<3hrs",
  },
  {
    id: "4",
    name: "Sarah Muthoni",
    profession: "Hair Stylist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    rating: 4.9,
    reviewCount: 234,
    location: "Karen, Nairobi",
    city: "Nairobi",
    estate: "Karen",
    distance: "5km",
    price: "KES 1,000",
    isVerified: true,
    isIdVerified: true,
    isBackgroundChecked: true,
    isTopRated: true,
    isFeatured: true,
    category: "salon",
    completionRate: 99,
    responseTime: "<30min",
    availableToday: true,
  },
  {
    id: "5",
    name: "James Mwangi",
    profession: "Electrician",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    rating: 4.6,
    reviewCount: 98,
    location: "South B, Nairobi",
    city: "Nairobi",
    estate: "South B",
    price: "KES 2,000",
    isVerified: true,
    isIdVerified: true,
    isFeatured: false,
    category: "electrical",
    completionRate: 92,
    responseTime: "<2hrs",
  },
  {
    id: "6",
    name: "Lucy Akinyi",
    profession: "IT Support Specialist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    rating: 4.8,
    reviewCount: 67,
    location: "CBD, Nairobi",
    city: "Nairobi",
    estate: "CBD",
    distance: "3km",
    price: "KES 3,000",
    isVerified: true,
    isIdVerified: true,
    isBackgroundChecked: true,
    isFeatured: true,
    category: "tech",
    completionRate: 97,
    responseTime: "<1hr",
    availableToday: true,
  },
  {
    id: "7",
    name: "Michael Otieno",
    profession: "Photographer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    rating: 4.9,
    reviewCount: 145,
    location: "Lavington, Nairobi",
    city: "Nairobi",
    estate: "Lavington",
    price: "KES 5,000",
    isVerified: true,
    isIdVerified: true,
    isTopRated: true,
    isFeatured: false,
    category: "photography",
    completionRate: 98,
    responseTime: "<2hrs",
  },
  {
    id: "8",
    name: "Faith Njoroge",
    profession: "Math Tutor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    rating: 4.7,
    reviewCount: 78,
    location: "Runda, Nairobi",
    city: "Nairobi",
    estate: "Runda",
    distance: "8km",
    price: "KES 1,500/hr",
    isVerified: true,
    isIdVerified: true,
    isFeatured: false,
    category: "tutoring",
    completionRate: 95,
    responseTime: "<1hr",
  },
  {
    id: "9",
    name: "Hassan Abdalla",
    profession: "AC Technician",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    rating: 4.8,
    reviewCount: 92,
    location: "Nyali, Mombasa",
    city: "Mombasa",
    estate: "Nyali",
    price: "KES 3,500",
    isVerified: true,
    isIdVerified: true,
    isBackgroundChecked: true,
    isFeatured: true,
    category: "repair",
    completionRate: 96,
    responseTime: "<2hrs",
    availableToday: true,
  },
  {
    id: "10",
    name: "Patricia Atieno",
    profession: "Fitness Trainer",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    rating: 4.9,
    reviewCount: 112,
    location: "Milimani, Kisumu",
    city: "Kisumu",
    estate: "Milimani",
    price: "KES 2,000/session",
    isVerified: true,
    isIdVerified: true,
    isTopRated: true,
    isFeatured: true,
    category: "fitness",
    completionRate: 99,
    responseTime: "<30min",
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "cleaning", label: "Cleaning" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "salon", label: "Beauty & Salon" },
  { value: "mechanics", label: "Mechanics" },
  { value: "tech", label: "IT & Tech" },
  { value: "photography", label: "Photography" },
  { value: "tutoring", label: "Tutoring" },
  { value: "repair", label: "Repair" },
  { value: "fitness", label: "Fitness" },
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "reviews", label: "Most Reviews" },
];

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
  const [selectedEstate, setSelectedEstate] = useState(searchParams.get("estate") || "");
  const [priceRange, setPriceRange] = useState([500, 50000]);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showTopRatedOnly, setShowTopRatedOnly] = useState(false);
  const [showAvailableToday, setShowAvailableToday] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedCity) params.set("city", selectedCity);
    if (selectedEstate) params.set("estate", selectedEstate);
    setSearchParams(params);
  }, [searchQuery, selectedCategory, selectedCity, selectedEstate, setSearchParams]);

  const handleLocationChange = (city: string, estate: string) => {
    const cityObj = kenyaCities.find(c => c.id === city);
    setSelectedCity(cityObj?.name || "");
    setSelectedEstate(estate);
  };

  const filteredProviders = useMemo(() => {
    let results = [...allProviders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.profession.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      results = results.filter(p => p.category === selectedCategory);
    }

    // City filter
    if (selectedCity) {
      results = results.filter(p => p.city === selectedCity);
    }

    // Estate filter
    if (selectedEstate) {
      results = results.filter(p => p.estate === selectedEstate);
    }

    // Price filter
    results = results.filter(p => {
      const priceNum = parseInt(p.price.replace(/[^0-9]/g, ""));
      return priceNum >= priceRange[0] && priceNum <= priceRange[1];
    });

    // Verified filter
    if (showVerifiedOnly) {
      results = results.filter(p => p.isIdVerified && p.isBackgroundChecked);
    }

    // Top rated filter
    if (showTopRatedOnly) {
      results = results.filter(p => p.rating >= 4.8);
    }

    // Available today filter
    if (showAvailableToday) {
      results = results.filter(p => p.availableToday);
    }

    // Sort
    switch (sortBy) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        results.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, "")));
        break;
      case "price-high":
        results.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, "")));
        break;
      case "reviews":
        results.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Recommended: featured first, then by rating
        results.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
        });
    }

    return results;
  }, [
    searchQuery,
    selectedCategory,
    selectedCity,
    selectedEstate,
    priceRange,
    sortBy,
    showVerifiedOnly,
    showTopRatedOnly,
    showAvailableToday,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedCity("");
    setSelectedEstate("");
    setPriceRange([500, 50000]);
    setShowVerifiedOnly(false);
    setShowTopRatedOnly(false);
    setShowAvailableToday(false);
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedCity,
    selectedEstate,
    showVerifiedOnly,
    showTopRatedOnly,
    showAvailableToday,
    priceRange[0] > 500 || priceRange[1] < 50000,
  ].filter(Boolean).length;

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Location</Label>
        <LocationSelector onLocationChange={handleLocationChange} />
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-2 block">
          Price Range: KES {priceRange[0].toLocaleString()} - KES {priceRange[1].toLocaleString()}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={500}
          max={50000}
          step={500}
          className="mt-4"
        />
      </div>

      {/* Toggle filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="verified" className="text-sm">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-emerald-600" />
              Fully Verified Only
            </div>
          </Label>
          <Switch
            id="verified"
            checked={showVerifiedOnly}
            onCheckedChange={setShowVerifiedOnly}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="toprated" className="text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              Top Rated (4.8+)
            </div>
          </Label>
          <Switch
            id="toprated"
            checked={showTopRatedOnly}
            onCheckedChange={setShowTopRatedOnly}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="available" className="text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Available Today
            </div>
          </Label>
          <Switch
            id="available"
            checked={showAvailableToday}
            onCheckedChange={setShowAvailableToday}
          />
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="bg-background border-b">
          <div className="container py-6">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Find Services</h1>
                <p className="text-muted-foreground">
                  {selectedCity || selectedEstate
                    ? `Services available in ${selectedEstate ? `${selectedEstate}, ` : ""}${selectedCity || "your area"}`
                    : "Discover verified professionals near you"}
                </p>
              </div>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={`Find cleaners in ${selectedEstate || selectedCity || "your area"}...`}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Mobile filter trigger */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden relative">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FiltersContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Active filters badges */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {categories.find(c => c.value === selectedCategory)?.label}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                    </Badge>
                  )}
                  {selectedCity && (
                    <Badge variant="secondary" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {selectedCity}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCity("")} />
                    </Badge>
                  )}
                  {selectedEstate && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedEstate}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedEstate("")} />
                    </Badge>
                  )}
                  {showVerifiedOnly && (
                    <Badge variant="secondary" className="gap-1">
                      <BadgeCheck className="h-3 w-3" />
                      Verified
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setShowVerifiedOnly(false)} />
                    </Badge>
                  )}
                  {showTopRatedOnly && (
                    <Badge variant="secondary" className="gap-1">
                      <Star className="h-3 w-3" />
                      Top Rated
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setShowTopRatedOnly(false)} />
                    </Badge>
                  )}
                  {showAvailableToday && (
                    <Badge variant="secondary" className="gap-1">
                      Available Today
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setShowAvailableToday(false)} />
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container py-6">
          <div className="flex gap-6">
            {/* Desktop sidebar filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h3>
                <FiltersContent />
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredProviders.length}</span> providers
                  {selectedEstate && ` in ${selectedEstate}`}
                  {selectedCity && !selectedEstate && ` in ${selectedCity}`}
                </p>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* View toggle */}
                  <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Provider grid/list */}
              {filteredProviders.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredProviders.map((provider) => (
                    <EnhancedProviderCard
                      key={provider.id}
                      provider={provider}
                      variant={viewMode === "list" ? "compact" : "default"}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No providers found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search in a different area
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
