
import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingDisplayProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export const RatingDisplay = ({ 
  rating, 
  maxRating = 5, 
  size = "md", 
  showValue = false,
  className 
}: RatingDisplayProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {[...Array(maxRating)].map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              sizeClasses[size],
              i < Math.floor(rating) 
                ? 'fill-yellow-400 text-yellow-400' 
                : i < rating 
                ? 'fill-yellow-200 text-yellow-400'
                : 'text-gray-300'
            )} 
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 ml-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

interface RatingInputProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const RatingInput = ({ 
  rating, 
  onRatingChange, 
  maxRating = 5, 
  size = "md",
  className 
}: RatingInputProps) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(maxRating)].map((_, i) => {
        const starRating = i + 1;
        const isActive = starRating <= (hoverRating || rating);
        
        return (
          <button
            key={i}
            type="button"
            className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
            onClick={() => onRatingChange(starRating)}
            onMouseEnter={() => setHoverRating(starRating)}
            onMouseLeave={() => setHoverRating(null)}
          >
            <Star 
              className={cn(
                sizeClasses[size],
                "transition-colors",
                isActive 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300 hover:text-yellow-200'
              )} 
            />
          </button>
        );
      })}
    </div>
  );
};
