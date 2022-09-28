const User = require("../models/user");

const getAlltUsers = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  console.log(user);
  res.json(user);
};

const createUser = async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  console.log(newUser);
  res.json(newUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = User.findByIdAndUpdate(id, req.body);
  console.log(user);
  res.json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = User.findByIdAndDelete(id);
  console.log(user);
  res.json(user);
};

module.exports = {
  getAlltUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
