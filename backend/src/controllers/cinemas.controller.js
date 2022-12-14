const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const Cinema = require("../models/cinema");
const Room = require("../models/room");
const Function = require("../models/function");
const { deleteFunctionRaw } = require("../controllers/functions.controller");

const getAllCinemas = async (req, res) => {
  const cinemas = await Cinema.find();
  res.json(cinemas);
};

const getAllCinemasLg = async (req, res) => {
  const cinemas = await Cinema.aggregate([
    {
      $lookup: {
        from: "rooms",
        localField: "rooms_ids",
        foreignField: "_id",
        as: "rooms",
      },
    },
    {
      $lookup: {
        from: "movies",
        localField: "movies_ids",
        foreignField: "_id",
        as: "movies",
      },
    },
  ]);
  res.json(cinemas);
};

const getCinema = async (req, res) => {
  const { id } = req.params;
  const cinema = await Cinema.findById(id);
  res.json(cinema);
};

const getCinemaLg = async (req, res) => {
  const { id } = req.params;
  const cinema = await Cinema.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "rooms",
        localField: "rooms_ids",
        foreignField: "_id",
        as: "rooms",
      },
    },
    {
      $lookup: {
        from: "movies",
        localField: "movies_ids",
        foreignField: "_id",
        as: "movies",
      },
    },
  ]);
  res.json(cinema[0]);
};

const createCinema = async (req, res) => {
  const { name, address } = req.body;
  const movies_ids = req.body.movies_ids ? req.body.movies_ids.split(",") : [];
  const newCinema = new Cinema({
    name,
    address,
    imagePath: req.file.path,
    movies_ids: movies_ids.map((id) => {
      return mongoose.Types.ObjectId(id);
    }),
  });
  await newCinema.save();
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
      movies_ids: movies_ids.map((id) => {
        return mongoose.Types.ObjectId(id);
      }),
    });
    await cinema.save();
  }
  res.json(cinema);
};

const updateCinemaNoImg = async (req, res) => {
  const { id } = req.params;
  const { name, address, movies_ids } = req.body;
  const cinema = await Cinema.findById(id);
  if (cinema) {
    await cinema.updateOne({
      name,
      address,
      movies_ids: movies_ids.map((id) => {
        return mongoose.Types.ObjectId(id);
      }),
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
    const functions = await Function.find({
      cinema_id: mongoose.Types.ObjectId(id),
    });
    functions.forEach(async (f) => {
      deleteFunctionRaw(f._id.toString());
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
  getAllCinemasLg,
  getCinemaLg,
  updateCinemaNoImg,
};
