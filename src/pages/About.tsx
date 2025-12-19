import { Button } from "@/components/ui/button";
import { Shield, Users, Target, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Every service provider is verified through a rigorous background check process to ensure your safety and peace of mind.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We're building a community where local professionals can thrive and customers can find reliable services easily.",
  },
  {
    icon: Target,
    title: "Quality Service",
    description: "We maintain high standards through customer reviews, ratings, and ongoing quality assurance programs.",
  },
  {
    icon: Award,
    title: "Fair Pricing",
    description: "Transparent pricing with no hidden fees. What you see is what you pay, with secure payment options.",
  },
];

const team = [
  {
    name: "Ramadhan Wambia",
    role: "CEO & Co-founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
  },
  {
    name: "Tavin Leshan",
    role: "CTO & Co-founder",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300",
  },
  {
    name: "Wilson Kamau",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
  },
  {
    name: "Joyce Benter",
    role: "Head of Customer Success",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Verified Providers" },
  { value: "25,000+", label: "Jobs Completed" },
  { value: "4.8", label: "Average Rating" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Connecting Kenya with
              <span className="text-gradient block">Trusted Local Services</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Huduma was founded with a simple mission: to make it easy for Kenyans to find 
              reliable, verified service providers in their local area. We believe everyone 
              deserves access to quality services, and every skilled professional deserves 
              the opportunity to grow their business.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Huduma started in 2025 when our founders experienced firsthand the challenges 
                  of finding reliable service providers in Eldoret. After countless frustrating 
                  experiences with unreliable workers and unclear pricing, they decided to build 
                  a solution.
                </p>
                <p>
                  Today, Huduma has grown into Kenya's leading local services marketplace, 
                  connecting thousands of customers with verified professionals across multiple 
                  service categories. From plumbers and electricians to beauticians and tutors, 
                  we're making quality services accessible to everyone.
                </p>
                <p>
                  Our platform ensures trust through verified profiles, secure payments, and a 
                  robust review system. We're not just a marketplace – we're building a community 
                  where skilled professionals can grow their businesses and customers can find 
                  the help they need with confidence.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-2xl shadow-lg">
                <p className="text-3xl font-bold">2025</p>
                <p className="text-sm">Founded in Eldoret</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Huduma
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-6 shadow-card animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals working to transform local services in Kenya
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Choose Huduma?
              </h2>
              <div className="space-y-4">
                {[
                  "All service providers are verified and background-checked",
                  "Secure payment options including M-Pesa",
                  "Real customer reviews and ratings",
                  "24/7 customer support",
                  "Money-back guarantee on all services",
                  "No hidden fees or charges",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/services">
                  <Button size="lg">
                    Find a Service
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600"
                alt="Happy customers"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Join Huduma?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Whether you need a service or want to offer your skills, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90">
                Find a Service
              </Button>
            </Link>
            <Link to="/register?type=provider">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
