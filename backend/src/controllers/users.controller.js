const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const getAlltUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};

const createUser = async (req, res) => {
  const { name, lastnames, birthdate, phone, email, role, password } = req.body;
  const hash = await bcryptjs.hash(password, 8);
  const newUser = new User({
    name,
    lastnames,
    birthdate,
    phone,
    email,
    role,
    password: hash,
  });
  await newUser.save();
  res.json(newUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastnames, birthdate, phone, email, role } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      name,
      lastnames,
      birthdate,
      phone,
      email,
      role,
    },
    { new: true }
  );
  res.json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res.json(user);
};

module.exports = {
  getAlltUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
