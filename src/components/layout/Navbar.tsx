import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const serviceCategories = [
  {
    name: "Home Services",
    services: [
      { name: "Home Cleaning", href: "/services?category=cleaning" },
      { name: "Plumbing", href: "/services?category=plumbing" },
      { name: "Electrical", href: "/services?category=electrical" },
      { name: "Handyman", href: "/services?category=handyman" },
      { name: "Gardening & Landscaping", href: "/services?category=gardening" },
    ],
  },
  {
    name: "Moving & Logistics",
    services: [
      { name: "House Moving", href: "/services?category=moving" },
      { name: "Office Relocation", href: "/services?category=relocation" },
      { name: "Courier & Delivery", href: "/services?category=courier" },
    ],
  },
  {
    name: "Auto & Transport",
    services: [
      { name: "Car Wash", href: "/services?category=carwash" },
      { name: "Mechanic", href: "/services?category=mechanic" },
      { name: "Boda Boda", href: "/services?category=bodaboda" },
    ],
  },
  {
    name: "Personal Care",
    services: [
      { name: "Salon & Barbershop", href: "/services?category=salon" },
      { name: "Spa & Massage", href: "/services?category=spa" },
      { name: "Laundry & Dry Cleaning", href: "/services?category=laundry" },
    ],
  },
  {
    name: "Events & Catering",
    services: [
      { name: "Catering", href: "/services?category=catering" },
      { name: "Event Planning", href: "/services?category=events" },
      { name: "Photography", href: "/services?category=photography" },
      { name: "DJ & Entertainment", href: "/services?category=entertainment" },
    ],
  },
  {
    name: "Professional Services",
    services: [
      { name: "Tutoring", href: "/services?category=tutoring" },
      { name: "Security Services", href: "/services?category=security" },
      { name: "IT Support", href: "/services?category=it" },
      { name: "Fumigation & Pest Control", href: "/services?category=fumigation" },
    ],
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const toggleTheme = () => setTheme(currentTheme === "dark" ? "light" : "dark");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold text-foreground">Huduma</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.startsWith("/services") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-card border border-border rounded-xl shadow-xl z-50 p-4 animate-fade-in">
                  <div className="grid grid-cols-3 gap-4">
                    {serviceCategories.map((category) => (
                      <div key={category.name}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          {category.name}
                        </h4>
                        <ul className="space-y-1">
                          {category.services.map((service) => (
                            <li key={service.name}>
                              <Link
                                to={service.href}
                                className="block px-2 py-1.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                onClick={() => setServicesDropdownOpen(false)}
                              >
                                {service.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-border">
                    <Link
                      to="/services"
                      className="text-sm font-medium text-primary hover:underline"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md text-foreground hover:bg-muted/10"
            >
              {mounted ? (
                currentTheme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )
              ) : (
                <Sun className="w-5 h-5 opacity-0" />
              )}
            </button>

            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive("/")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname.startsWith("/services")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>

                {mobileServicesOpen && (
                  <div className="mt-2 ml-4 space-y-3 animate-fade-in">
                    {serviceCategories.map((category) => (
                      <div key={category.name}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-1">
                          {category.name}
                        </h4>
                        <div className="space-y-1">
                          {category.services.map((service) => (
                            <Link
                              key={service.name}
                              to={service.href}
                              className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Link
                      to="/services"
                      className="block px-4 py-2 text-sm font-medium text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All Services →
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive("/about")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
                <div className="flex items-center gap-2 px-4">
                  <button
                    onClick={() => {
                      toggleTheme();
                      setMobileMenuOpen(false);
                    }}
                    aria-label="Toggle theme"
                    className="p-2 rounded-md text-foreground hover:bg-muted/10"
                  >
                    {mounted ? (
                      currentTheme === "dark" ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )
                    ) : (
                      <Sun className="w-5 h-5 opacity-0" />
                    )}
                  </button>
                </div>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
