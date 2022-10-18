const { Router } = require("express");
const multer = require("../libs/multer");

const router = Router();

const {
  getAllCinemas,
  getCinema,
  createCinema,
  updateCinema,
  deleteCinema,
} = require("../controllers/cinemas.controller");

router.get("/", getAllCinemas);
router.get("/:id", getCinema);
router.post("/", multer.single("image"), createCinema);
router.put("/:id", multer.single("image"), updateCinema);
router.delete("/:id", deleteCinema);

module.exports = router;
