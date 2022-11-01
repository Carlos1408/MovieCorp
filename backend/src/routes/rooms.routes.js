const { Router } = require("express");

const router = Router();

const {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRoomsLg,
  getRoomLg,
} = require("../controllers/rooms.controller");

router.get("/", getAllRooms);
router.get("/lg/", getAllRoomsLg);
router.get("/:id", getRoom);
router.get("/lg/:id", getRoomLg);
router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;
