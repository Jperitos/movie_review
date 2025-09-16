import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Movie } from '@/lib/movies';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-primary/50 text-primary" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <Card 
      className="movie-card cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight">{movie.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {movie.year}
            </Badge>
          </div>
          
          <Badge variant="outline" className="w-fit">
            {movie.genre}
          </Badge>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(movie.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              {movie.rating.toFixed(1)} ({movie.reviewCount} reviews)
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {movie.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};