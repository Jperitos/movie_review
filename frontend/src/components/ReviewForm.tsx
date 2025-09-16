import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { mockAuth } from '@/lib/auth';
import type { Movie } from '@/lib/movies';

interface ReviewFormProps {
  movie: Movie;
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
}

export const ReviewForm = ({ movie, onSubmit, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive"
      });
      return;
    }

    onSubmit(rating, comment);
    setRating(0);
    setComment('');
  };

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || rating);
      stars.push(
        <button
          key={i}
          type="button"
          className="p-1 transition-colors"
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => setRating(i)}
        >
          <Star 
            className={`w-8 h-8 transition-colors ${
              isFilled 
                ? 'fill-primary text-primary' 
                : 'text-muted-foreground hover:text-primary'
            }`} 
          />
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Review "{movie.title}"</h3>
        <p className="text-muted-foreground">Share your thoughts about this movie</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex items-center justify-center gap-1">
            {renderRatingStars()}
          </div>
          {rating > 0 && (
            <p className="text-center text-sm text-muted-foreground">
              {rating} out of 5 stars
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Comment (optional)</Label>
          <Textarea
            id="comment"
            placeholder="What did you think about this movie?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1 gold-gradient">
            Submit Review
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};