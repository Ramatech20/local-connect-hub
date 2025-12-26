import { Star, User, Trash2 } from "lucide-react";
import { useReviews, Review } from "@/hooks/useReviews";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface ReviewListProps {
  providerId: string;
}

const ReviewList = ({ providerId }: ReviewListProps) => {
  const { user } = useAuth();
  const { reviews, loading, averageRating, deleteReview } = useReviews(providerId);

  const handleDelete = async (reviewId: string) => {
    const { error } = await deleteReview(reviewId);
    if (error) {
      toast({ title: "Error", description: "Failed to delete review", variant: "destructive" });
    } else {
      toast({ title: "Review deleted" });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-secondary/50 rounded-xl animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4 mb-2" />
            <div className="h-3 bg-muted rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl">
        <div className="text-center">
          <p className="text-3xl font-bold text-foreground">{averageRating.toFixed(1)}</p>
          {renderStars(Math.round(averageRating))}
        </div>
        <div className="text-sm text-muted-foreground">
          <p>{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Reviews */}
      {reviews.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          <Star className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No reviews yet</p>
          <p className="text-sm">Be the first to leave a review!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-card border border-border rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    {review.reviewer?.avatar_url ? (
                      <img
                        src={review.reviewer.avatar_url}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {review.reviewer?.full_name || "Anonymous"}
                    </p>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
                {user?.id === review.reviewer_id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(review.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {review.comment && (
                <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
