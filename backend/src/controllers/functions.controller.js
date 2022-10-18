const Function = require("../models/function");
const Movie = require("../models/movie");

const getAllFunctions = async (req, res) => {
  const function_ = await Function.find();
  res.json(function_);
};

const getFunction = async (req, res) => {
  const { id } = req.params;
  const function_ = await Function.findById(id);
  res.json(function_);
};

const createFunction = async (req, res) => {
  const { cinema_id, room_id, movie_id, from, to } = req.body;
  const newFunction = new Function({ cinema_id, room_id, movie_id, from, to });
  await newFunction.save();
  const movie = await Movie.findById(movie_id);
  await Movie.updateOne({ functions_ids: [...movie.functions_ids, newFunction._id] });
  movie.save();
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
  movie.save();
  res.json(function_);
};

module.exports = {
  getAllFunctions,
  getFunction,
  createFunction,
  deleteFunction,
};
