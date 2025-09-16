import express from "express";
import Review from "../models/Review.js";
import Movie from "../models/Movie.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware: Protect routes
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get reviews for a movie
router.get("/:movieId", async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId }).populate("user", "name email");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a review
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;

    if (!movieId || !rating) {
      return res.status(400).json({ message: "MovieId and rating are required" });
    }

    const review = new Review({
      movie: movieId,
      user: req.user.id,
      rating,
      comment,
    });

    await review.save();

    // update movie stats
    const reviews = await Review.find({ movie: movieId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Movie.findByIdAndUpdate(movieId, {
      reviewCount: reviews.length,
      rating: avgRating,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
