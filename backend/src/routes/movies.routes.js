const { Router } = require("express");
const multer = require("../libs/multer");

const router = Router();

const {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.controller");

router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.post("/", multer.single("image"), createMovie);
router.put("/:id", multer.single("image"), updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
