const Movie = require("../models/movie");
const fs = require("fs");
const path = require("path");

const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

const getMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  res.json(movie);
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
  const oldMovie = await Movie.findById(id);
  if (oldMovie) {
    await fs.unlink(path.resolve(oldMovie.imagePath), (err) => {
      console.log(err);
    });
  }
  const movie = await Movie.findByIdAndUpdate(
    id,
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
      cinemas_ids: []
    },
    { new: true }
  );
  console.log(movie);
  res.json(movie);
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndRemove(id);
  if (movie) {
    await fs.unlink(path.resolve(movie.imagePath), (err) => {
      console.log(err);
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
};
