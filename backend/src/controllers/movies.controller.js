const Movie = require("../models/movie");
const Cinema = require("../models/cinema");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Function = require("../models/function");
const { deleteFunctionRaw } = require("../controllers/functions.controller");

const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

const getAllMoviesLg = async (req, res) => {
  const movies = await Movie.aggregate([
    {
      $lookup: {
        from: "functions",
        localField: "function_id",
        foreignField: "_id",
        as: "functions",
      },
    },
  ]);
  res.json(movies);
};

const getMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  res.json(movie);
};

const getMovieLg = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "functions",
        localField: "functions_id",
        foreignField: "_id",
        as: "functions",
      },
    },
  ]);
  res.json(movie[0]);
};

const createMovie = async (req, res) => {
  const {
    title,
    synopsis,
    length,
    genre,
    rating,
    protagonists,
    director,
    trailer,
  } = req.body;
  const newMovie = new Movie({
    title,
    synopsis,
    length,
    genre,
    rating,
    protagonists,
    director,
    imagePath: req.file.path,
    trailer,
  });
  await newMovie.save();
  res.json(newMovie);
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  let upMovie;
  const {
    title,
    synopsis,
    length,
    genre,
    rating,
    protagonists,
    director,
    trailer,
  } = req.body;
  const movie = await Movie.findById(id);
  if (movie) {
    await fs.unlink(path.resolve(movie.imagePath), (err) => {
      console.log(err);
    });
    upMovie = await movie.updateOne(
      {
        title,
        synopsis,
        length,
        genre,
        rating,
        protagonists,
        director,
        imagePath: req.file.path,
        trailer,
      },
      { new: true }
    );
    await movie.save();
  }
  res.json(upMovie);
};

const updateMovieNoImg = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    synopsis,
    length,
    genre,
    rating,
    protagonists,
    director,
    trailer,
  } = req.body;
  console.log(req.params);
  console.log(req.body);
  const movie = await Movie.findById(id);
  if (movie) {
    await movie.updateOne(
      {
        title,
        synopsis,
        length,
        genre,
        rating,
        protagonists,
        director,
        trailer,
      },
      { new: true }
    );
    await movie.save();
  }
  res.json(movie);
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndRemove(id);
  if (movie) {
    await fs.unlink(path.resolve(movie.imagePath), (err) => {
      console.log(err);
    });
    const cinemas = await Cinema.find();
    cinemas.forEach(async (cinema) => {
      await cinema.updateOne({
        movies_ids: cinema.movies_ids.filter((m_id) => {
          m_id.toString() !== movie._id.toString();
        }),
      });
      await cinema.save();
    });
    const functions = await Function.find({
      movie_id: mongoose.Types.ObjectId(id),
    });
    functions.forEach(async (f) => {
      deleteFunctionRaw(f._id.toString());
    });
  }
  res.json(movie);
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieLg,
  getAllMoviesLg,
  updateMovieNoImg,
};
