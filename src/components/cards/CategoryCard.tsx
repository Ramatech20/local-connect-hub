import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  count: number;
  href: string;
  color?: string;
}

const CategoryCard = ({ name, icon: Icon, count, href, color = "primary" }: CategoryCardProps) => {
  return (
    <Link to={href} className="group block">
      <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300`}>
          <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
        </div>
        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">{count} providers</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
