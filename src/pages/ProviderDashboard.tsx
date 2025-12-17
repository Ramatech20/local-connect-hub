import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  DollarSign, 
  Clock, 
  Star, 
  Settings,
  User,
  TrendingUp,
  MessageSquare,
  LogOut,
  Bell,
  ChevronRight,
  CheckCircle,
  XCircle,
  Eye,
  BarChart3
} from "lucide-react";
import Layout from "@/components/layout/Layout";

// Mock data
const pendingBookings = [
  {
    id: "1",
    customer: "Mary Njeri",
    service: "Pipe Repair",
    date: "Dec 20, 2024",
    time: "10:00 AM",
    location: "Westlands, Nairobi",
    price: "KSh 1,500",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  },
  {
    id: "2",
    customer: "David Kimani",
    service: "Drain Cleaning",
    date: "Dec 21, 2024",
    time: "2:00 PM",
    location: "Kilimani, Nairobi",
    price: "KSh 2,000",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  },
];

const recentReviews = [
  {
    id: "1",
    customer: "Anne Wambui",
    rating: 5,
    comment: "Excellent work! Fixed my kitchen sink quickly.",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200",
  },
  {
    id: "2",
    customer: "Peter Omondi",
    rating: 5,
    comment: "Very professional and punctual. Highly recommend!",
    date: "5 days ago",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
];

const stats = [
  { label: "Total Earnings", value: "KSh 45,200", change: "+12%", icon: DollarSign },
  { label: "Completed Jobs", value: "34", change: "+8%", icon: CheckCircle },
  { label: "Rating", value: "4.9", change: "+0.1", icon: Star },
  { label: "Response Rate", value: "95%", change: "+3%", icon: Clock },
];

const ProviderDashboard = () => {
  const provider = {
    name: "John Kamau",
    profession: "Master Plumber",
    email: "john@example.com",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
    isVerified: true,
  };

  return (
    <Layout>
      <div className="min-h-screen bg-secondary/30 py-8">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
                {/* Provider Info */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                    />
                    {provider.isVerified && (
                      <div className="absolute bottom-4 right-0 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-card">
                        <CheckCircle className="w-4 h-4 text-success-foreground" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{provider.name}</h2>
                  <p className="text-sm text-primary">{provider.profession}</p>
                  <p className="text-xs text-muted-foreground mt-1">{provider.email}</p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <Link to={`/provider/${provider.name.toLowerCase().replace(" ", "-")}`}>
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Public Profile
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Navigation */}
              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <nav className="divide-y divide-border">
                  {[
                    { icon: BarChart3, label: "Dashboard", href: "/provider/dashboard", active: true },
                    { icon: Calendar, label: "Bookings", href: "/provider/bookings" },
                    { icon: DollarSign, label: "Earnings", href: "/provider/earnings" },
                    { icon: MessageSquare, label: "Messages", href: "/provider/messages" },
                    { icon: Star, label: "Reviews", href: "/provider/reviews" },
                    { icon: User, label: "Profile", href: "/provider/profile" },
                    { icon: Settings, label: "Settings", href: "/provider/settings" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                        item.active
                          ? "bg-primary/5 text-primary border-l-4 border-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Link>
                  ))}
                  <button className="w-full flex items-center gap-3 px-6 py-4 text-destructive hover:bg-destructive/5 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
                  <p className="text-muted-foreground">Welcome back, {provider.name.split(" ")[0]}!</p>
                </div>
                <Button>
                  <Bell className="w-4 h-4 mr-2" />
                  5 Notifications
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card rounded-2xl p-5 shadow-card">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Pending Bookings */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Pending Requests</h2>
                  <Link to="/provider/bookings" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>

                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-muted/50"
                    >
                      <img
                        src={booking.image}
                        alt={booking.customer}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{booking.customer}</h3>
                        <p className="text-sm text-muted-foreground">{booking.service}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">{booking.price}</span>
                        <Button size="sm" className="h-9">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="h-9">
                          <XCircle className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Earnings Chart Placeholder */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Earnings Overview</h2>
                    <select className="text-sm bg-muted rounded-lg px-3 py-2 border-none">
                      <option>This Month</option>
                      <option>Last Month</option>
                      <option>This Year</option>
                    </select>
                  </div>
                  <div className="h-48 flex items-center justify-center bg-muted/50 rounded-xl">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">Earnings chart</p>
                      <p className="text-2xl font-bold text-foreground mt-2">KSh 45,200</p>
                    </div>
                  </div>
                </div>

                {/* Recent Reviews */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Recent Reviews</h2>
                    <Link to="/provider/reviews" className="text-sm text-primary hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <img
                            src={review.image}
                            alt={review.customer}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-foreground">{review.customer}</h4>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex gap-0.5 mb-2">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderDashboard;
