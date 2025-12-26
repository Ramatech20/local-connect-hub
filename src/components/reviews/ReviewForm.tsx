import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useReviews } from "@/hooks/useReviews";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "@/hooks/use-toast";

interface ReviewFormProps {
  providerId: string;
  onSuccess?: () => void;
}

const ReviewForm = ({ providerId, onSuccess }: ReviewFormProps) => {
  const { user } = useAuth();
  const { addReview } = useReviews(providerId);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Rating required", description: "Please select a rating" });
      return;
    }

    setSubmitting(true);
    const { error } = await addReview(rating, comment);
    setSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit review",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Review submitted", description: "Thank you for your feedback!" });
    setRating(0);
    setComment("");
    onSuccess?.();
  };

  if (!user) {
    return (
      <div className="p-4 bg-secondary/50 rounded-xl text-center">
        <p className="text-muted-foreground">Please log in to leave a review</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-card border border-border rounded-xl space-y-4">
      <h3 className="font-semibold text-foreground">Write a Review</h3>

      {/* Star Rating */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""}` : "Select rating"}
        </span>
      </div>

      {/* Comment */}
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience (optional)"
        rows={3}
      />

      <Button onClick={handleSubmit} disabled={submitting || rating === 0}>
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
};

export default ReviewForm;
