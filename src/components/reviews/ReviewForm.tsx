
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RatingInput } from "@/components/ui/rating";
import { useAuth } from "@/hooks/useAuth";

interface ReviewFormProps {
  productId: string;
  onSubmit: (reviewData: {
    rating: number;
    title: string;
    comment: string;
  }) => Promise<void>;
  isSubmitting?: boolean;
}

const ReviewForm = ({ productId, onSubmit, isSubmitting = false }: ReviewFormProps) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating || !comment.trim()) {
      return;
    }

    await onSubmit({
      rating,
      title: title.trim(),
      comment: comment.trim()
    });

    // Reset form
    setRating(0);
    setTitle("");
    setComment("");
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600 mb-4">Please log in to write a review</p>
          <Button variant="outline">Log In</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="rating">Rating *</Label>
            <div className="mt-2">
              <RatingInput 
                rating={rating} 
                onRatingChange={setRating}
                size="lg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="title">Review Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              maxLength={100}
            />
          </div>

          <div>
            <Label htmlFor="comment">Review *</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product"
              rows={4}
              maxLength={1000}
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={!rating || !comment.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
