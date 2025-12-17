import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const TestimonialCard = ({ name, role, image, content, rating }: TestimonialCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card relative">
      <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
      
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "fill-accent text-accent" : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-foreground/80 mb-6 leading-relaxed">{content}</p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
