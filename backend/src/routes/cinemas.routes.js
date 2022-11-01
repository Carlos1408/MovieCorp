const { Router } = require("express");
const multer = require("../libs/multer");

const router = Router();

const {
  getAllCinemas,
  getCinema,
  createCinema,
  updateCinema,
  deleteCinema,
  getAllCinemasLg,
  getCinemaLg
} = require("../controllers/cinemas.controller");

router.get("/", getAllCinemas);
router.get("/lg", getAllCinemasLg);
router.get("/:id", getCinema);
router.get("/lg/:id", getCinemaLg);
router.post("/", multer.single("image"), createCinema);
router.put("/:id", multer.single("image"), updateCinema);
router.delete("/:id", deleteCinema);

module.exports = router;
