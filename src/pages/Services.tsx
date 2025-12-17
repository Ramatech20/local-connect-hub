import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Filter, SlidersHorizontal, Wrench, Zap, Sparkles, Car, Scissors, Monitor, Camera, GraduationCap, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProviderCard from "@/components/cards/ProviderCard";

const categories = [
  { name: "All", icon: null, value: "all" },
  { name: "Plumbing", icon: Wrench, value: "plumbing" },
  { name: "Electrical", icon: Zap, value: "electrical" },
  { name: "Cleaning", icon: Sparkles, value: "cleaning" },
  { name: "Mechanics", icon: Car, value: "mechanics" },
  { name: "Salon & Beauty", icon: Scissors, value: "salon" },
  { name: "IT & Tech", icon: Monitor, value: "tech" },
  { name: "Photography", icon: Camera, value: "photography" },
  { name: "Tutoring", icon: GraduationCap, value: "tutoring" },
];

const allProviders = [
  {
    id: "1",
    name: "John Kamau",
    profession: "Master Plumber",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    rating: 4.9,
    reviewCount: 127,
    location: "Westlands, Nairobi",
    price: "KSh 1,500",
    isVerified: true,
    isFeatured: true,
    category: "plumbing",
  },
  {
    id: "2",
    name: "Grace Wanjiku",
    profession: "Professional Cleaner",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
    rating: 4.8,
    reviewCount: 89,
    location: "Kilimani, Nairobi",
    price: "KSh 2,000",
    isVerified: true,
    isFeatured: true,
    category: "cleaning",
  },
  {
    id: "3",
    name: "Peter Ochieng",
    profession: "Auto Mechanic",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.7,
    reviewCount: 156,
    location: "Industrial Area, Nairobi",
    price: "KSh 2,500",
    isVerified: true,
    isFeatured: false,
    category: "mechanics",
  },
  {
    id: "4",
    name: "Sarah Muthoni",
    profession: "Hair Stylist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    rating: 4.9,
    reviewCount: 234,
    location: "Karen, Nairobi",
    price: "KSh 1,000",
    isVerified: true,
    isFeatured: true,
    category: "salon",
  },
  {
    id: "5",
    name: "James Mwangi",
    profession: "Electrician",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    rating: 4.6,
    reviewCount: 98,
    location: "South B, Nairobi",
    price: "KSh 2,000",
    isVerified: true,
    isFeatured: false,
    category: "electrical",
  },
  {
    id: "6",
    name: "Lucy Akinyi",
    profession: "IT Support Specialist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    rating: 4.8,
    reviewCount: 67,
    location: "CBD, Nairobi",
    price: "KSh 3,000",
    isVerified: true,
    isFeatured: true,
    category: "tech",
  },
  {
    id: "7",
    name: "Michael Otieno",
    profession: "Photographer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    rating: 4.9,
    reviewCount: 145,
    location: "Lavington, Nairobi",
    price: "KSh 5,000",
    isVerified: true,
    isFeatured: false,
    category: "photography",
  },
  {
    id: "8",
    name: "Faith Njoroge",
    profession: "Math Tutor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    rating: 4.7,
    reviewCount: 78,
    location: "Runda, Nairobi",
    price: "KSh 1,500/hr",
    isVerified: true,
    isFeatured: false,
    category: "tutoring",
  },
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProviders = allProviders.filter((provider) => {
    const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory;
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary/30 py-12">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Find Service Providers
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our verified professionals and book the perfect service for your needs
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search services or providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base bg-card border-border rounded-xl"
              />
            </div>
            <div className="relative flex-1 sm:max-w-[200px]">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location"
                defaultValue="Nairobi"
                className="pl-12 h-12 text-base bg-card border-border rounded-xl"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-4 lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
            <Button className="h-12 px-6">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                        selectedCategory === cat.value
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {cat.icon && <cat.icon className="w-4 h-4" />}
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowFilters(false)} />
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-card p-6 animate-slide-in-right">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-foreground">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-6 h-6 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => {
                          setSelectedCategory(cat.value);
                          setShowFilters(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                          selectedCategory === cat.value
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {cat.icon && <cat.icon className="w-4 h-4" />}
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid */}
            <div className="flex-1">
              {/* Category Pills - Mobile */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-6 lg:hidden scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredProviders.length}</span>{" "}
                  providers found
                </p>
                <select className="bg-card border border-border rounded-lg px-3 py-2 text-sm">
                  <option>Sort by: Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                  <option>Reviews</option>
                </select>
              </div>

              {/* Provider Grid */}
              {filteredProviders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProviders.map((provider, index) => (
                    <div
                      key={provider.id}
                      className="animate-fade-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProviderCard {...provider} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No providers found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
