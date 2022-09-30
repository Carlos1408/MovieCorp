const Cinema = require("../models/cinema");

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
  const newCinema = new Cinema({
    name,
    address,
  });
  await newCinema.save();
  res.json(newCinema);
};

const updateCinema = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  const cinema = await Cinema.findByIdAndUpdate(
    id,
    {
      name,
      address,
    },
    {
      new: true,
    }
  );
  res.json(cinema);
};

const deleteCinema = async (req, res) => {
  const { id } = req.params;
  const cinema = await Cinema.findByIdAndDelete(id);
  res.json(cinema);
};

module.exports = {
  getAllCinemas,
  getCinema,
  createCinema,
  updateCinema,
  deleteCinema,
};
