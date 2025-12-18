import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, Star, MapPin, ArrowRight, CheckCircle, Shield, ThumbsUp, 
  Wrench, Zap, Sparkles, Car, Scissors, Monitor, Camera, GraduationCap,
  Users, Award, Clock, BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { EnhancedProviderCard, Provider } from "@/components/cards/EnhancedProviderCard";
import CategoryCard from "@/components/cards/CategoryCard";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { LocationSelector } from "@/components/location/LocationSelector";
import { TrustBadgesGroup } from "@/components/badges/TrustBadge";
import heroImage from "@/assets/hero-services.jpg";

const categories = [
  { name: "Cleaning", icon: Sparkles, count: 156, href: "/services?category=cleaning" },
  { name: "Tutoring", icon: GraduationCap, count: 112, href: "/services?category=tutoring" },
  { name: "Repair", icon: Wrench, count: 224, href: "/services?category=repair" },
  { name: "Beauty & Salon", icon: Scissors, count: 203, href: "/services?category=salon" },
  { name: "Fitness", icon: Users, count: 89, href: "/services?category=fitness" },
  { name: "Plumbing", icon: Wrench, count: 124, href: "/services?category=plumbing" },
  { name: "Electrical", icon: Zap, count: 98, href: "/services?category=electrical" },
  { name: "IT & Tech", icon: Monitor, count: 76, href: "/services?category=tech" },
];

const featuredProviders: Provider[] = [
  {
    id: "1",
    name: "John Kamau",
    profession: "Master Plumber",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    rating: 4.9,
    reviewCount: 127,
    location: "Westlands, Nairobi",
    price: "KES 1,500",
    isVerified: true,
    isIdVerified: true,
    isBackgroundChecked: true,
    isTopRated: true,
    isFeatured: true,
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
    price: "KES 2,000",
    isVerified: true,
    isIdVerified: true,
    isBackgroundChecked: true,
    isFeatured: true,
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
    price: "KES 2,500",
    isVerified: true,
    isIdVerified: true,
    isFeatured: false,
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
    price: "KES 1,000",
    isVerified: true,
    isIdVerified: true,
    isBackgroundChecked: true,
    isTopRated: true,
    isFeatured: true,
    completionRate: 99,
    responseTime: "<30min",
    availableToday: true,
  },
];

const testimonials = [
  {
    name: "Mary Njeri",
    role: "Homeowner, Lavington",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    content: "Huduma has been a game-changer for finding reliable service providers. I found an excellent electrician within minutes, and the booking process was seamless!",
    rating: 5,
  },
  {
    name: "David Kimani",
    role: "Business Owner, CBD",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    content: "As a business owner, I need quick and reliable services. Huduma's verified providers and easy booking system save me so much time.",
    rating: 5,
  },
  {
    name: "Anne Wambui",
    role: "Apartment Resident, Kilimani",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200",
    content: "The quality of service providers on this platform is outstanding. I've been using Huduma for 6 months now and couldn't be happier!",
    rating: 5,
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Find a Service",
    description: "Browse categories or search for the service you need in your area.",
    icon: Search,
  },
  {
    step: 2,
    title: "Book a Provider",
    description: "Compare verified providers, check ratings, and book your preferred time.",
    icon: CheckCircle,
  },
  {
    step: 3,
    title: "Enjoy Quality Service",
    description: "Get professional service and pay securely via M-Pesa or card.",
    icon: ThumbsUp,
  },
];

const trustStats = [
  { value: "5,000+", label: "Verified Professionals", icon: Users },
  { value: "98%", label: "Satisfaction Rate", icon: ThumbsUp },
  { value: "50,000+", label: "Jobs Completed", icon: Award },
  { value: "<2hrs", label: "Avg. Response Time", icon: Clock },
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("nairobi");
  const [selectedEstate, setSelectedEstate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCity) params.set("city", selectedCity);
    if (selectedEstate) params.set("estate", selectedEstate);
    navigate(`/services?${params.toString()}`);
  };

  const handleLocationChange = (city: string, estate: string) => {
    setSelectedCity(city);
    setSelectedEstate(estate);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Professional services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-3xl space-y-8">
            {/* Trust indicator */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="h-4 w-4" />
              <span>Kenya's Most Trusted Service Marketplace</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find Verified Local{" "}
              <span className="text-primary">Service Providers</span>{" "}
              Near You
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Connect with trusted professionals in Nairobi, Mombasa, Kisumu, and more. 
              Book cleaners, tutors, mechanics, and other services with confidence.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="bg-card/80 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl border border-border/50">
                <div className="space-y-4">
                  {/* Location selector */}
                  <LocationSelector 
                    variant="hero"
                    onLocationChange={handleLocationChange}
                    defaultCity="nairobi"
                  />
                  
                  {/* Search input */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search for cleaners, plumbers, tutors..."
                        className="pl-12 h-12 bg-background/80 border-border/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button type="submit" size="lg" className="h-12 px-8">
                      Search Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            {/* Trust stats below search */}
            <div className="flex flex-wrap gap-6 pt-4">
              {trustStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse Service Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find verified professionals across all major service categories in your area
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                icon={category.icon}
                count={category.count}
                href={category.href}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" size="lg">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-2">
                <BadgeCheck className="h-4 w-4" />
                <span>Verified & Trusted</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Top Rated Professionals
              </h2>
              <p className="text-muted-foreground mt-2">
                Handpicked providers with excellent reviews and verified credentials
              </p>
            </div>
            <Link to="/services">
              <Button variant="ghost" className="group">
                View All Providers
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProviders.map((provider) => (
              <EnhancedProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Huduma Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Book trusted local services in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                <div className="text-center space-y-4">
                  <div className="relative inline-flex">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-10 w-10 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment trust signals */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">Secure payments via</p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 bg-green-500/10 text-green-700 px-4 py-2 rounded-full font-medium">
                <span className="text-lg">📱</span> M-Pesa
              </div>
              <div className="flex items-center gap-2 bg-blue-500/10 text-blue-700 px-4 py-2 rounded-full font-medium">
                <span className="text-lg">💳</span> Card Payments
              </div>
              <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-700 px-4 py-2 rounded-full font-medium">
                <Shield className="h-4 w-4" /> Payment Protected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers across Kenya
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join thousands of Kenyans who trust Huduma for their local service needs. 
            Find verified professionals in your area today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Find Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
