import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Service Provider in Kenya",
    excerpt: "A comprehensive guide to finding reliable and verified professionals for your home and business needs.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600",
    category: "Tips & Guides",
    author: "Ramadhan Wambia",
    date: "January 15, 2025",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Top 10 Home Maintenance Services Every Kenyan Homeowner Needs",
    excerpt: "From plumbing to electrical work, discover the essential services that keep your home running smoothly.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
    category: "Home Services",
    author: "Joyce Benter",
    date: "January 12, 2025",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Growing Your Business on Huduma: A Provider's Success Story",
    excerpt: "Learn how local service providers are building thriving businesses through our platform.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600",
    category: "Success Stories",
    author: "Tavin Leshan",
    date: "January 10, 2025",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "The Future of Local Services in Kenya's Digital Economy",
    excerpt: "Exploring how technology is transforming the way Kenyans find and book local services.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600",
    category: "Industry Insights",
    author: "Wilson Kamau",
    date: "January 8, 2025",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "M-Pesa Payments: Making Service Bookings Easier",
    excerpt: "How mobile money integration is revolutionizing service payments across Kenya.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
    category: "Platform Updates",
    author: "Ramadhan Wambia",
    date: "January 5, 2025",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Safety First: How We Verify Service Providers",
    excerpt: "An inside look at our rigorous verification process that keeps you safe.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600",
    category: "Trust & Safety",
    author: "Joyce Benter",
    date: "January 3, 2025",
    readTime: "5 min read",
  },
];

const categories = [
  "All",
  "Tips & Guides",
  "Home Services",
  "Success Stories",
  "Industry Insights",
  "Platform Updates",
  "Trust & Safety",
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <div className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Huduma <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Insights, tips, and stories about local services in Kenya
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                className="pl-12 h-12 rounded-full"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-8 border-b border-border">
        <div className="container-custom">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="py-12">
        <div className="container-custom">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date.split(",")[0]}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="py-16 gradient-primary">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Get the latest tips, guides, and updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-card text-foreground"
              />
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
