import { apiClient } from "./apiClient";

export interface Review {
  _id?: string;
  id?: string;
  movieId: string;
  userId: string;
  userName?: string;
  rating: number;
  comment?: string;
  date?: string;
  createdAt?: string;
}

export const reviewsApi = {
  async getByMovie(movieId: string) {
    return apiClient<Review[]>(`/reviews/${movieId}`);
  },

  async add(movieId: string, rating: number, comment?: string) {
    return apiClient<Review>("/reviews", {
      method: "POST",
      body: JSON.stringify({ movieId, rating, comment }),
    });
  },
};
