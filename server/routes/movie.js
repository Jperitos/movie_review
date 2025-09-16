// movieRoutes.js
import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Seed 20 movies
router.post("/seed", async (req, res) => {
  try {
    const sampleMovies = [
      {
        title: "Inception",
        year: 2010,
        genre: "Sci-Fi",
        description: "Dream within a dream thriller.",
        poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
      },
      {
        title: "The Dark Knight",
        year: 2008,
        genre: "Action",
        description: "Batman faces Joker in Gotham.",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      },
      {
        title: "Interstellar",
        year: 2014,
        genre: "Sci-Fi",
        description: "Exploring space to save humanity.",
        poster: "https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg",
      },
      {
        title: "The Matrix",
        year: 1999,
        genre: "Sci-Fi",
        description: "Neo discovers the truth about reality.",
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      },
      {
        title: "Avatar",
        year: 2009,
        genre: "Adventure",
        description: "A marine on Pandora becomes one with the Na'vi.",
        poster: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
      },
      {
        title: "Titanic",
        year: 1997,
        genre: "Romance",
        description: "A tragic love story aboard the Titanic.",
        poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
      },
      {
        title: "The Godfather",
        year: 1972,
        genre: "Crime",
        description: "The aging patriarch of a crime dynasty transfers control to his son.",
        poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      },
      {
        title: "The Godfather Part II",
        year: 1974,
        genre: "Crime",
        description: "The Corleone saga continues.",
        poster: "https://image.tmdb.org/t/p/w500/amvmeQWheahG3StKwIE1f7jRnkZ.jpg",
      },
      {
        title: "The Shawshank Redemption",
        year: 1994,
        genre: "Drama",
        description: "Hope can set you free.",
        poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      },
      {
        title: "Fight Club",
        year: 1999,
        genre: "Drama",
        description: "An underground fight club spirals out of control.",
        poster: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
      },
      {
        title: "Pulp Fiction",
        year: 1994,
        genre: "Crime",
        description: "Interwoven stories of crime in Los Angeles.",
        poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      },
      {
        title: "Forrest Gump",
        year: 1994,
        genre: "Drama",
        description: "Life is like a box of chocolates.",
        poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
      },
      {
        title: "The Avengers",
        year: 2012,
        genre: "Action",
        description: "Earth's mightiest heroes must come together.",
        poster: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
      },
      {
        title: "Avengers: Endgame",
        year: 2019,
        genre: "Action",
        description: "The final battle against Thanos.",
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      },
      {
        title: "Avengers: Infinity War",
        year: 2018,
        genre: "Action",
        description: "Thanos seeks the Infinity Stones.",
        poster: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      },
      {
        title: "Spider-Man: No Way Home",
        year: 2021,
        genre: "Action",
        description: "Peter Parker deals with multiverse chaos.",
        poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      },
      {
        title: "Iron Man",
        year: 2008,
        genre: "Action",
        description: "Tony Stark becomes Iron Man.",
        poster: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
      },
      {
        title: "Black Panther",
        year: 2018,
        genre: "Action",
        description: "T'Challa becomes king of Wakanda.",
        poster: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
      },
      {
        title: "Joker",
        year: 2019,
        genre: "Drama",
        description: "Arthur Fleck becomes the Joker.",
        poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
      },
      {
        title: "Oppenheimer",
        year: 2023,
        genre: "Drama",
        description: "The story of J. Robert Oppenheimer and the atomic bomb.",
        poster: "https://image.tmdb.org/t/p/w500/bAFmcr9E7yQa8Z46eqkCz4Ae2AA.jpg",
      },
    ];

    await Movie.insertMany(sampleMovies);
    res.json({ message: "Movies seeded!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
