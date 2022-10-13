const { Router } = require("express");

const router = Router();

const {
    getAllRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
} = require("../controllers/rooms.controller");

router.get("/", getAllRooms);
router.get("/:id", getRoom);
router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;