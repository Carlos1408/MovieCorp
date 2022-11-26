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
  getCinemaLg,
  updateCinemaNoImg,
} = require("../controllers/cinemas.controller");

const { verifyToken, verifyAdmin } = require("../controllers/auth.controller");

router.get("/", getAllCinemas);
router.get("/lg", getAllCinemasLg);
router.get("/:id", getCinema);
router.get("/lg/:id", getCinemaLg);
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  multer.single("image"),
  createCinema
);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  multer.single("image"),
  updateCinema
);
router.put("/noimg/:id", verifyToken, verifyAdmin, updateCinemaNoImg);
router.delete("/:id", verifyToken, verifyAdmin, deleteCinema);

module.exports = router;
