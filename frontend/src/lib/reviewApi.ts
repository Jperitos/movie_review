const API_URL = "http://localhost:5000/api";

export const reviewApi = {
  async getMovies() {
    const res = await fetch(`${API_URL}/movies`);
    return res.json();
  },

  async getReviews(movieId: string) {
    const res = await fetch(`${API_URL}/reviews/${movieId}`);
    return res.json();
  },

  async addReview(token: string, movieId: string, rating: number, comment: string) {
    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ movieId, rating, comment }),
    });
    return res.json();
  },
};
