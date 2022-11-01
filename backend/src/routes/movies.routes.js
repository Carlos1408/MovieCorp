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
} = require("../controllers/movies.controller");

const { verifyToken, verifyAdmin } = require("../controllers/auth.controller");

router.get("/", getAllMovies);
router.get("/lg/", verifyToken, verifyAdmin, getAllMoviesLg);
router.get("/:id", verifyToken, verifyAdmin, getMovie);
router.get("/lg/:id", verifyToken, verifyAdmin, getMovieLg);
router.post("/", verifyToken, verifyAdmin, multer.single("image"), createMovie);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  multer.single("image"),
  updateMovie
);
router.delete("/:id", verifyToken, verifyAdmin, deleteMovie);

module.exports = router;
