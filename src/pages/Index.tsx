import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Wrench, Zap, Sparkles, Car, Scissors, Monitor, Camera, GraduationCap, CheckCircle, ArrowRight, Shield, Clock, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CategoryCard from "@/components/cards/CategoryCard";
import ProviderCard from "@/components/cards/ProviderCard";
import TestimonialCard from "@/components/cards/TestimonialCard";
import heroImage from "@/assets/hero-services.jpg";

const categories = [
  { name: "Plumbing", icon: Wrench, count: 124, href: "/services?category=plumbing" },
  { name: "Electrical", icon: Zap, count: 98, href: "/services?category=electrical" },
  { name: "Cleaning", icon: Sparkles, count: 156, href: "/services?category=cleaning" },
  { name: "Mechanics", icon: Car, count: 87, href: "/services?category=mechanics" },
  { name: "Salon & Beauty", icon: Scissors, count: 203, href: "/services?category=salon" },
  { name: "IT & Tech", icon: Monitor, count: 76, href: "/services?category=tech" },
  { name: "Photography", icon: Camera, count: 64, href: "/services?category=photography" },
  { name: "Tutoring", icon: GraduationCap, count: 112, href: "/services?category=tutoring" },
];

const featuredProviders = [
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
    title: "Search for a Service",
    description: "Browse through our categories or search for the specific service you need in your area.",
    icon: Search,
  },
  {
    step: 2,
    title: "Choose a Provider",
    description: "Compare verified providers based on ratings, reviews, and pricing to find your perfect match.",
    icon: CheckCircle,
  },
  {
    step: 3,
    title: "Book & Pay Securely",
    description: "Select your preferred date and time, then pay securely through M-Pesa or card.",
    icon: Shield,
  },
  {
    step: 4,
    title: "Get Quality Service",
    description: "Sit back and let the professional handle your task. Rate them after completion.",
    icon: ThumbsUp,
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Professional services"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              <Shield className="w-4 h-4" />
              <span>Trusted by 10,000+ Kenyans</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up animation-delay-100">
              Find Trusted Local
              <span className="text-gradient block">Service Providers</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-up animation-delay-200">
              Connect with verified plumbers, electricians, cleaners, and more in your neighborhood. 
              Quality services, fair prices, complete peace of mind.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-fade-up animation-delay-300">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="What service do you need?"
                  className="pl-12 h-14 text-base bg-card border-border rounded-xl"
                />
              </div>
              <div className="relative flex-1 sm:max-w-[240px]">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Location"
                  defaultValue="Nairobi"
                  className="pl-12 h-14 text-base bg-card border-border rounded-xl"
                />
              </div>
              <Button variant="hero" className="h-14 px-8">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-fade-up animation-delay-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Verified Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span>Same Day Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Browse Service Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From home repairs to personal care, find the right professional for any job
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CategoryCard {...category} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" size="lg">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Top Rated Providers
              </h2>
              <p className="text-lg text-muted-foreground">
                Handpicked professionals with excellent reviews
              </p>
            </div>
            <Link to="/services">
              <Button variant="outline">
                See All Providers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProviders.map((provider, index) => (
              <div
                key={provider.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProviderCard {...provider} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How Huduma Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting quality service is as easy as 1-2-3-4
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                    <item.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Whether you need a service or want to offer your skills, Huduma has you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button size="xl" className="bg-card text-foreground hover:bg-card/90 shadow-lg">
                Find a Service
              </Button>
            </Link>
            <Link to="/register?type=provider">
              <Button size="xl" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
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
