const mongoose = require("mongoose");
const Function = require("../models/function");
const Movie = require("../models/movie");
const Room = require("../models/room");

const getAllFunctions = async (req, res) => {
  const functions = await Function.find();
  res.json(functions);
};

const getAllFunctionsLg = async (req, res) => {
  const functions = await Function.aggregate([
    {
      $lookup: {
        from: "cinemas",
        localField: "cinema_id",
        foreignField: "_id",
        as: "cinema",
      },
    },
    { $unwind: "$cinema" },
    {
      $lookup: {
        from: "rooms",
        localField: "room_id",
        foreignField: "_id",
        as: "room",
      },
    },
    { $unwind: "$room" },
    {
      $lookup: {
        from: "movies",
        localField: "movie_id",
        foreignField: "_id",
        as: "movie",
      },
    },
    { $unwind: "$movie" },
  ]);
  res.json(functions);
};

const getFunction = async (req, res) => {
  const { id } = req.params;
  const function_ = await Function.findById(id);
  res.json(function_);
};

const getFunctionLg = async (req, res) => {
  const { id } = req.params;
  const function_ = await Function.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "cinemas",
        localField: "cinema_id",
        foreignField: "_id",
        as: "cinema",
      },
    },
    { $unwind: "$cinema" },
    {
      $lookup: {
        from: "rooms",
        localField: "room_id",
        foreignField: "_id",
        as: "room",
      },
    },
    { $unwind: "$room" },
    {
      $lookup: {
        from: "movies",
        localField: "movie_id",
        foreignField: "_id",
        as: "movie",
      },
    },
    { $unwind: "$movie" },
  ]);
  res.json(function_[0]);
};

const createFunction = async (req, res) => {
  const { cinema_id, room_id, movie_id, from, to } = req.body;
  const room = await Room.findById(room_id);
  const newFunction = new Function({
    cinema_id: mongoose.Types.ObjectId(cinema_id),
    room_id: mongoose.Types.ObjectId(room_id),
    movie_id: mongoose.Types.ObjectId(movie_id),
    from,
    to,
    nSeats: room.nRows * room.nCol,
  });
  await newFunction.save();
  const movie = await Movie.findById(movie_id);
  await Movie.updateOne({
    functions_ids: [...movie.functions_ids, newFunction._id],
  });
  await movie.save();
  res.json(newFunction);
};

const deleteFunction = async (req, res) => {
  const { id } = req.params;
  const function_ = await Function.findByIdAndRemove(id);
  const movie = await Movie.findById(function_.movie_id);
  await movie.updateOne({
    functions_ids: movie.functions_ids.filter((f) => {
      return f.toString() !== function_._id.toString();
    }),
  });
  await movie.save();
  res.json(function_);
};

module.exports = {
  getAllFunctions,
  getFunction,
  createFunction,
  deleteFunction,
  getAllFunctionsLg,
  getFunctionLg
};
