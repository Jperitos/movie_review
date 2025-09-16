// src/lib/moviesApi.ts
import { apiClient } from "./apiClient";

export interface Movie {
  _id: string;
  title: string;
  year: number;
  genre: string;
  description?: string;
  poster?: string;
  rating?: number;
  reviewCount?: number;
}

export const moviesApi = {
  async getAll(): Promise<Movie[]> {
    return apiClient<Movie[]>("/movies");
  },
  async getById(id: string): Promise<Movie> {
    return apiClient<Movie>(`/movies/${id}`);
  },
  async create(movie: Omit<Movie, "_id">): Promise<Movie> {
    return apiClient<Movie>("/movies", {
      method: "POST",
      body: JSON.stringify(movie),
    });
  },
  async delete(id: string): Promise<{ message: string }> {
    return apiClient<{ message: string }>(`/movies/${id}`, { method: "DELETE" });
  },
};
