
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingDisplay } from "@/components/ui/rating";
import { Review } from "@/types/firestore";

interface ReviewCardProps {
  review: Review;
  onHelpfulClick?: (reviewId: string) => void;
}

const ReviewCard = ({ review, onHelpfulClick }: ReviewCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {review.userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{review.userName}</span>
                {review.isVerified && (
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified Purchase
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <RatingDisplay rating={review.rating} size="sm" />
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {review.title && (
          <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
        )}
        
        <p className="text-gray-700 mb-4">{review.comment}</p>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onHelpfulClick?.(review.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            Helpful ({review.helpfulCount})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
