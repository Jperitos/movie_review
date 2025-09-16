import { Star, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Review } from '@/lib/movies';

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`w-4 h-4 ${
            i <= rating 
              ? 'fill-primary text-primary' 
              : 'text-muted-foreground'
          }`} 
        />
      );
    }
    return stars;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Reviews ({reviews.length})</h3>
      
      {reviews.map((review) => (
        <Card key={review.id} className="movie-card">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.userName}</span>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(review.date)}
                </p>
              </div>
            </div>
          </CardHeader>
          {review.comment && (
            <CardContent className="pt-0">
              <p className="text-sm">{review.comment}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};