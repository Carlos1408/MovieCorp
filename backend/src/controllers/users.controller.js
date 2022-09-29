const User = require("../models/user");
const bcryptjs = require("bcryptjs");

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
  const { name, lastnames, birthdate, phone, email, password } = req.body;
  const hash = await bcryptjs.hash(password, 8);
  const newUser = new User({
    name,
    lastnames,
    birthdate,
    phone,
    email,
    password: hash,
  });
  await newUser.save();
  console.log(newUser);
  res.json(newUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastnames, birthdate, phone, email } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      name,
      lastnames,
      birthdate,
      phone,
      email,
    },
    { new: true }
  );
  console.log(user);
  res.json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
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
