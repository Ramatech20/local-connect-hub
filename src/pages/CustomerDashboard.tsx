import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  Settings,
  User,
  CreditCard,
  Heart,
  MessageSquare,
  LogOut,
  Bell,
  ChevronRight,
  Search
} from "lucide-react";
import Layout from "@/components/layout/Layout";

// Mock data
const upcomingBookings = [
  {
    id: "1",
    provider: "John Kamau",
    service: "Pipe Repair",
    date: "Dec 20, 2024",
    time: "10:00 AM",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
  },
  {
    id: "2",
    provider: "Sarah Muthoni",
    service: "Hair Styling",
    date: "Dec 22, 2024",
    time: "2:00 PM",
    status: "pending",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
];

const recentActivity = [
  { type: "booking", message: "Booking confirmed with John Kamau", time: "2 hours ago" },
  { type: "review", message: "You left a 5-star review for Grace Wanjiku", time: "1 day ago" },
  { type: "payment", message: "Payment of KSh 2,000 processed successfully", time: "3 days ago" },
];

const favoriteProviders = [
  {
    id: "1",
    name: "John Kamau",
    profession: "Plumber",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
  },
  {
    id: "4",
    name: "Sarah Muthoni",
    profession: "Hair Stylist",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    id: "2",
    name: "Grace Wanjiku",
    profession: "Cleaner",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200",
  },
];

const CustomerDashboard = () => {
  const user = {
    name: "Mary Njeri",
    email: "mary@example.com",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  };

  return (
    <Layout>
      <div className="min-h-screen bg-secondary/30 py-8">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
                {/* User Info */}
                <div className="text-center mb-6">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                  />
                  <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 rounded-xl bg-muted">
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-xs text-muted-foreground">Bookings</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-muted">
                    <p className="text-2xl font-bold text-accent">8</p>
                    <p className="text-xs text-muted-foreground">Reviews</p>
                  </div>
                </div>

                <Link to="/services">
                  <Button className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Find Services
                  </Button>
                </Link>
              </div>

              {/* Navigation */}
              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <nav className="divide-y divide-border">
                  {[
                    { icon: User, label: "Profile", href: "/customer/profile" },
                    { icon: Calendar, label: "My Bookings", href: "/customer/bookings" },
                    { icon: Heart, label: "Favorites", href: "/customer/favorites" },
                    { icon: MessageSquare, label: "Messages", href: "/customer/messages" },
                    { icon: CreditCard, label: "Payments", href: "/customer/payments" },
                    { icon: Settings, label: "Settings", href: "/customer/settings" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center gap-3 px-6 py-4 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
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
              {/* Welcome Banner */}
              <div className="bg-primary rounded-2xl p-6 lg:p-8 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                      Welcome back, {user.name.split(" ")[0]}!
                    </h1>
                    <p className="text-primary-foreground/80">
                      You have {upcomingBookings.length} upcoming bookings
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <Button className="bg-card text-foreground hover:bg-card/90">
                      <Bell className="w-4 h-4 mr-2" />
                      3 Notifications
                    </Button>
                  </div>
                </div>
              </div>

              {/* Upcoming Bookings */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Upcoming Bookings</h2>
                  <Link to="/customer/bookings" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>

                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <img
                        src={booking.image}
                        alt={booking.provider}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{booking.provider}</h3>
                        <p className="text-sm text-muted-foreground">{booking.service}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
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
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "confirmed"
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        <div>
                          <p className="text-sm text-foreground">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Favorite Providers */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Favorite Providers</h2>
                    <Link to="/customer/favorites" className="text-sm text-primary hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {favoriteProviders.map((provider) => (
                      <Link
                        key={provider.id}
                        to={`/provider/${provider.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                      >
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{provider.name}</h3>
                          <p className="text-sm text-muted-foreground">{provider.profession}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                        </div>
                      </Link>
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

export default CustomerDashboard;
