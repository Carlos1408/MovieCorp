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

const getCinemaFunctions = async (req, res) => {
  const { cinema_id } = req.params;
  const functions = await Function.find({
    cinema_id: mongoose.Types.ObjectId(cinema_id),
  });
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
  await room.updateOne({
    timeRanges: [
      ...room.timeRanges,
      {
        function_id: newFunction._id,
        from,
        to,
      },
    ],
  });
  await room.save();
  const movie = await Movie.findById(movie_id);
  await movie.updateOne({
    functions_ids: [...movie.functions_ids, newFunction._id],
  });
  await movie.save();
  res.json(newFunction);
};

const deleteFunction = async (req, res) => {
  const { id } = req.params;
  const function_ = deleteFunctionRaw(id);
  res.json(function_);
};

const deleteFunctionRaw = async (id) => {
  const function_ = await Function.findByIdAndRemove(id);
  if (function_) {
    const movie = await Movie.findById(function_.movie_id);
    if (movie) {
      await movie.updateOne({
        functions_ids: movie.functions_ids.filter((f) => {
          return f.toString() !== function_._id.toString();
        }),
      });
      await movie.save();
    }
    const room = await Room.findById(function_.room_id);
    if (room) {
      await room.updateOne({
        timeRanges: room.timeRanges.filter((tr) => {
          return tr.function_id.toString() !== function_._id.toString();
        }),
      });
      await room.save();
    }
  }
  return function_;
};

module.exports = {
  getAllFunctions,
  getFunction,
  createFunction,
  deleteFunction,
  getAllFunctionsLg,
  getFunctionLg,
  deleteFunctionRaw,
  getCinemaFunctions,
};
