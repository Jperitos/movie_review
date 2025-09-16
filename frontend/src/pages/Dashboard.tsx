import { useState, useEffect } from "react";
import { Film, LogOut, Plus, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MovieCard } from "@/components/MovieCard";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewList } from "@/components/ReviewList";
import { ProfileSettings } from "@/components/ProfileSettings";
import { useToast } from "@/hooks/use-toast";
import { mockAuth, type User } from "@/lib/auth";
import { mockMovies, mockReviews, type Movie, type Review } from "@/lib/movies";
import { authApi } from "@/lib/authApi";
import { moviesApi } from "@/lib/moviesApi";
import { reviewsApi } from "@/lib/reviewsApi";
interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = authApi.getCurrentUser();
    setUser(currentUser);
  }, []);
  useEffect(() => {
    moviesApi
      .getAll()
      .then((data) => {
        const normalized = data.map((m) => ({
          id: m._id,
          title: m.title,
          year: m.year,
          genre: m.genre,
          description: m.description || "",
          poster: m.poster || "",
          rating: m.rating ?? 0,
          reviewCount: m.reviewCount ?? 0,
        }));
        setMovies(normalized);
      })
      .catch((err) =>
        toast({
          title: "Error",
          description: err.message || "Failed to load movies",
          variant: "destructive",
        })
      );
  }, []);

  const handleLogout = () => {
    authApi.logout();
    onLogout();
  };
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleAddReview = () => {
    setShowReviewForm(true);
  };
  useEffect(() => {
    if (!selectedMovie) return;

    reviewsApi
      .getByMovie(selectedMovie.id)
      .then((data) => {
        const normalized = data.map((r) => ({
          id: r._id || Date.now().toString(),
          movieId: r.movieId || selectedMovie.id,
          userId: r.userId,
          userName: r.userName || "Anonymous",
          rating: r.rating,
          comment: r.comment,
          date: r.date || new Date().toISOString(),
        }));
        setReviews(normalized);
      })
      .catch((err) =>
        toast({
          title: "Error",
          description: err.message || "Failed to load reviews",
          variant: "destructive",
        })
      );
  }, [selectedMovie]);

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!user || !selectedMovie) return;

    try {
      const review = await reviewsApi.add(selectedMovie.id, rating, comment);

      const newReview: Review = {
        id: review._id || Date.now().toString(),
        movieId: selectedMovie.id,
        userId: user.id,
        userName: user.name,
        rating: review.rating,
        comment: review.comment,
        date: review.createdAt || new Date().toISOString(),
      };

      setReviews((prev) => [newReview, ...prev]);
      setShowReviewForm(false);

      const updatedMovie = await moviesApi.getById(selectedMovie.id);
      setMovies((prev) => prev.map((m) => (m.id === selectedMovie.id ? { ...m, ...updatedMovie } : m)));
      setSelectedMovie((prev) => (prev ? { ...prev, ...updatedMovie } : prev));

      toast({
        title: "Review submitted!",
        description: `Thank you for reviewing "${selectedMovie.title}"`,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to submit review",
        variant: "destructive",
      });
    }
  };

  const getMovieReviews = (movieId: string) => {
    return reviews.filter((review) => review.movieId === movieId);
  };

  const closeMovieDialog = () => {
    setSelectedMovie(null);
    setShowReviewForm(false);
  };

  const closeSettingsDialog = () => {
    setShowSettings(false);
    // Refresh user data in case it was updated
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Film className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MovieReviews</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowSettings(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Popular Movies</h2>
          <p className="text-muted-foreground">Discover and review the latest films</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
          ))}
        </div>
      </main>

      {/* Movie Details Dialog */}
      <Dialog open={!!selectedMovie} onOpenChange={() => closeMovieDialog()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedMovie && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <img
                    src={selectedMovie.poster}
                    alt={selectedMovie.title}
                    className="w-24 h-36 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <DialogTitle className="text-xl mb-2">
                      {selectedMovie.title} ({selectedMovie.year})
                    </DialogTitle>
                    <p className="text-muted-foreground mb-2">{selectedMovie.genre}</p>
                    <p className="text-sm">{selectedMovie.description}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6">
                {showReviewForm ? (
                  <ReviewForm
                    movie={selectedMovie}
                    onSubmit={handleSubmitReview}
                    onCancel={() => setShowReviewForm(false)}
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Reviews</h3>
                      <Button onClick={handleAddReview} size="sm" className="gold-gradient">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Review
                      </Button>
                    </div>

                    <ReviewList reviews={getMovieReviews(selectedMovie.id)} />
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Profile Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={() => closeSettingsDialog()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Profile Settings
            </DialogTitle>
          </DialogHeader>

          {user && <ProfileSettings user={user} onClose={closeSettingsDialog} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};
