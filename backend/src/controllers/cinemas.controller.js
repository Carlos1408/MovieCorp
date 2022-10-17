const Cinema = require("../models/cinema");
const Movie = require("../models/movie");

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
  const { name, address, movies } = req.body;
  const newCinema = new Cinema({
    name,
    address,
    movies,
  });
  await newCinema.save();
  movies.forEach(async (movie_id) => {
    const movie = await Movie.findById(movie_id);
    await movie.updateOne({
      cinemas_ids: [...movie.cinemas_ids, newCinema._id],
    });
    movie.save();
  });
  res.json(newCinema);
};

const updateCinema = async (req, res) => {
  const { id } = req.params;
  const { name, address, movies } = req.body;
  const cinema = await Cinema.findByIdAndUpdate(
    id,
    {
      name,
      address,
      movies,
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
