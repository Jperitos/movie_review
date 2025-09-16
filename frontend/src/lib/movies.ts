import posterOne from "@/assets/movie-poster-1.jpg";
import posterTwo from "@/assets/movie-poster-2.jpg";
import posterThree from "@/assets/movie-poster-3.jpg";
import posterFour from "@/assets/movie-poster-4.jpg";
import posterFive from "@/assets/movie-poster-5.jpg";
import posterSix from "@/assets/movie-poster-6.jpg";
import posterSeven from "@/assets/movie-poster-7.jpg";
import posterEight from "@/assets/movie-poster-8.jpg";

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  poster: string;
  rating: number;
  reviewCount: number;
  description: string;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  createdAt?: string;
}

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Midnight Detective",
    genre: "Thriller",
    year: 2024,
    poster: posterOne,
    rating: 4.2,
    reviewCount: 156,
    description: "A noir detective thriller set in the dark streets of the city.",
  },
  {
    id: "2",
    title: "Quantum Horizon",
    genre: "Sci-Fi",
    year: 2023,
    poster: posterTwo,
    rating: 4.7,
    reviewCount: 289,
    description: "A mind-bending journey through space and time.",
  },
  {
    id: "3",
    title: "Summer Dreams",
    genre: "Romance",
    year: 2024,
    poster: posterThree,
    rating: 3.9,
    reviewCount: 92,
    description: "A heartwarming tale of love found during a summer vacation.",
  },
  {
    id: "4",
    title: "Dragon's Legacy",
    genre: "Fantasy",
    year: 2023,
    poster: posterFour,
    rating: 4.5,
    reviewCount: 234,
    description: "An epic fantasy adventure in a world of magic and dragons.",
  },
  {
    id: "5",
    title: "Shadows of Fear",
    genre: "Horror",
    year: 2024,
    poster: posterFive,
    rating: 4.1,
    reviewCount: 178,
    description: "A spine-chilling horror that will keep you on the edge of your seat.",
  },
  {
    id: "6",
    title: "Steel Thunder",
    genre: "Action",
    year: 2023,
    poster: posterSix,
    rating: 4.3,
    reviewCount: 342,
    description: "High-octane action with explosive sequences and incredible stunts.",
  },
  {
    id: "7",
    title: "Laugh Out Loud",
    genre: "Comedy",
    year: 2024,
    poster: posterSeven,
    rating: 3.8,
    reviewCount: 201,
    description: "A hilarious comedy that will have you rolling on the floor laughing.",
  },
  {
    id: "8",
    title: "Broken Dreams",
    genre: "Drama",
    year: 2023,
    poster: posterEight,
    rating: 4.6,
    reviewCount: 167,
    description: "A powerful drama exploring the depths of human emotion and resilience.",
  },
];

export const mockReviews: Review[] = [
  {
    id: "1",
    movieId: "1",
    userId: "1",
    userName: "Demo User",
    rating: 4,
    comment: "Great atmosphere and compelling storyline. The cinematography really captures the noir aesthetic.",
    date: "2024-01-15",
  },
  {
    id: "2",
    movieId: "2",
    userId: "2",
    userName: "John Doe",
    rating: 5,
    comment: "Mind-blowing sci-fi! The visual effects are spectacular and the plot keeps you guessing.",
    date: "2024-01-10",
  },
  {
    id: "3",
    movieId: "3",
    userId: "3",
    userName: "Jane Smith",
    rating: 4,
    comment: "A beautiful love story with stunning beach cinematography. Perfect for a date night!",
    date: "2024-01-12",
  },
  {
    id: "4",
    movieId: "5",
    userId: "1",
    userName: "Demo User",
    rating: 4,
    comment: "Genuinely scary! Had me jumping out of my seat multiple times.",
    date: "2024-01-14",
  },
  {
    id: "5",
    movieId: "6",
    userId: "2",
    userName: "John Doe",
    rating: 5,
    comment: "Best action movie of the year! The chase scenes are incredible.",
    date: "2024-01-11",
  },
];
