const { Router } = require("express");
const multer = require("../libs/multer");

const router = Router();

const {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getAllMoviesLg,
  getMovieLg,
  updateMovieNoImg,
} = require("../controllers/movies.controller");

const { verifyToken, verifyAdmin } = require("../controllers/auth.controller");

router.get("/", getAllMovies);
router.get("/lg/", getAllMoviesLg);
router.get("/:id", getMovie);
router.get("/lg/:id", getMovieLg);
router.post("/", verifyToken, verifyAdmin, multer.single("image"), createMovie);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  multer.single("image"),
  updateMovie
);
router.put("/noimg/:id", verifyToken, verifyAdmin, updateMovieNoImg);
router.delete("/:id", verifyToken, verifyAdmin, deleteMovie);

module.exports = router;
