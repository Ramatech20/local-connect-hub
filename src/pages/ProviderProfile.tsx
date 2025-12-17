import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  BadgeCheck, 
  MapPin, 
  Clock, 
  Calendar,
  Phone,
  MessageSquare,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import Layout from "@/components/layout/Layout";

// Mock provider data
const providerData = {
  id: "1",
  name: "John Kamau",
  profession: "Master Plumber",
  tagline: "Professional plumbing solutions for your home and business",
  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
  coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200",
  rating: 4.9,
  reviewCount: 127,
  completedJobs: 342,
  location: "Westlands, Nairobi",
  responseTime: "Usually responds within 30 minutes",
  memberSince: "January 2022",
  isVerified: true,
  about: "With over 15 years of experience in plumbing, I specialize in residential and commercial plumbing services. From simple repairs to complete installations, I take pride in delivering quality workmanship and excellent customer service. I'm licensed, insured, and committed to getting the job done right the first time.",
  services: [
    { name: "Pipe Repair", price: "KSh 1,500", duration: "1-2 hours" },
    { name: "Drain Cleaning", price: "KSh 2,000", duration: "1-3 hours" },
    { name: "Water Heater Installation", price: "KSh 5,000", duration: "2-4 hours" },
    { name: "Toilet Repair", price: "KSh 1,500", duration: "1-2 hours" },
    { name: "Faucet Installation", price: "KSh 1,000", duration: "30-60 mins" },
    { name: "Emergency Plumbing", price: "KSh 3,000", duration: "Varies" },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400",
    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
  ],
  reviews: [
    {
      id: "1",
      name: "Mary Njeri",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      rating: 5,
      date: "2 weeks ago",
      content: "John did an excellent job fixing our kitchen sink. He was punctual, professional, and cleaned up after the work. Highly recommended!",
    },
    {
      id: "2",
      name: "David Kimani",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      rating: 5,
      date: "1 month ago",
      content: "Great service! Fixed a stubborn leak that other plumbers couldn't solve. Fair pricing and honest advice.",
    },
    {
      id: "3",
      name: "Anne Wambui",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100",
      rating: 4,
      date: "2 months ago",
      content: "Very professional and knowledgeable. Installed our water heater perfectly. Only minor delay in arrival but great work overall.",
    },
  ],
  availability: [
    { day: "Monday", hours: "8:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "8:00 AM - 6:00 PM" },
    { day: "Wednesday", hours: "8:00 AM - 6:00 PM" },
    { day: "Thursday", hours: "8:00 AM - 6:00 PM" },
    { day: "Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
};

const ProviderProfile = () => {
  const { id } = useParams();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // In a real app, you'd fetch provider data based on id
  const provider = providerData;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % provider.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + provider.gallery.length) % provider.gallery.length);
  };

  return (
    <Layout>
      {/* Cover Image */}
      <div className="relative h-64 lg:h-80">
        <img
          src={provider.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
      </div>

      <div className="container-custom -mt-20 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card">
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-card shadow-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
                        {provider.name}
                        {provider.isVerified && (
                          <BadgeCheck className="w-6 h-6 text-success" />
                        )}
                      </h1>
                      <p className="text-lg text-primary font-medium">{provider.profession}</p>
                      <p className="text-muted-foreground mt-1">{provider.tagline}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsFavorited(!isFavorited)}
                        className={isFavorited ? "text-destructive border-destructive" : ""}
                      >
                        <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">{provider.rating}</span>
                      <span className="text-muted-foreground">({provider.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{provider.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>{provider.completedJobs} jobs completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">{provider.about}</p>
            </div>

            {/* Services */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-6">Services & Pricing</h2>
              <div className="grid gap-3">
                {provider.services.map((service) => (
                  <button
                    key={service.name}
                    onClick={() => setSelectedService(service.name)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedService === service.name
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {service.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-primary">{service.price}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-6">Work Gallery</h2>
              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img
                    src={provider.gallery[currentImageIndex]}
                    alt={`Work sample ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 shadow-lg flex items-center justify-center hover:bg-card transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 shadow-lg flex items-center justify-center hover:bg-card transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {provider.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === currentImageIndex ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-semibold">{provider.rating}</span>
                  <span className="text-muted-foreground">({provider.reviewCount})</span>
                </div>
              </div>
              <div className="space-y-6">
                {provider.reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground">{review.name}</h4>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-accent text-accent"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6">
                View All Reviews
              </Button>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">Book This Provider</h3>
              
              {/* Response Time */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Clock className="w-4 h-4 text-success" />
                {provider.responseTime}
              </div>

              {/* Selected Service */}
              {selectedService && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                  <p className="text-sm text-muted-foreground">Selected service:</p>
                  <p className="font-semibold text-foreground">{selectedService}</p>
                </div>
              )}

              {/* Availability */}
              <div className="mb-6">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Availability
                </h4>
                <div className="space-y-2">
                  {provider.availability.map((slot) => (
                    <div
                      key={slot.day}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{slot.day}</span>
                      <span className={slot.hours === "Closed" ? "text-destructive" : "text-foreground"}>
                        {slot.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link to={`/book/${provider.id}`}>
                  <Button className="w-full" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Now
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" size="lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
                <Button variant="ghost" className="w-full" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>

              {/* Member Since */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                Member since {provider.memberSince}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderProfile;
