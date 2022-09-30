const { Router } = require("express");

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
router.post("/", createCinema);
router.put("/:id", updateCinema);
router.delete("/:id", deleteCinema);

module.exports = router;