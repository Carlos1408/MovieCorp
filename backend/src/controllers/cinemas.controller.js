const fs = require("fs");
const path = require("path");
const Cinema = require("../models/cinema");
const Movie = require("../models/movie");
const Room = require("../models/room");

const getAllCinemas = async (req, res) => {
  const cinemas = await Cinema.find();
  res.json(cinemas);
};

const getCinema = async (req, res) => {
  const { id } = req.params;
  const cinema = await Cinema.findById(id);
  res.json(cinema);
};

const createCinema = async (req, res) => {
  const { name, address } = req.body;
  const movies_ids = req.body.movies_ids ? req.body.movies_ids.split(",") : [];
  const newCinema = new Cinema({
    name,
    address,
    imagePath: req.file.path,
    movies_ids,
  });
  await newCinema.save();
  if (movies_ids) {
    movies_ids.forEach(async (movie_id) => {
      const movie = await Movie.findById(movie_id);
      await movie.updateOne({
        cinemas_ids: [...movie.cinemas_ids, newCinema._id],
      });
      await movie.save();
    });
  }
  res.json(newCinema);
};

const updateCinema = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  const movies_ids = req.body.movies_ids ? req.body.movies_ids.split(",") : [];
  const cinema = await Cinema.findById(id);
  if (cinema) {
    await fs.unlink(path.resolve(cinema.imagePath), (err) => {
      console.log(err);
    });
    await cinema.updateOne({
      name,
      address,
      imagePath: req.file.path,
      movies_ids,
    });
    await cinema.save();
  }
  res.json(cinema);
};

const deleteCinema = async (req, res) => {
  const { id } = req.params;
  const cinema = await Cinema.findByIdAndRemove(id);
  if (cinema) {
    await fs.unlink(path.resolve(cinema.imagePath), (err) => {
      console.log(err);
    });
    cinema.rooms_ids.forEach(async (room_id) => {
      await Room.findByIdAndRemove(room_id);
    });
  }
  res.json(cinema);
};

module.exports = {
  getAllCinemas,
  getCinema,
  createCinema,
  updateCinema,
  deleteCinema,
};
