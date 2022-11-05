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

const { verifyToken, verifyAdmin } = require("../controllers/auth.controller");

router.get("/", getAllRooms);
router.get("/lg/", getAllRoomsLg);
router.get("/:id", getRoom);
router.get("/lg/:id", getRoomLg);
router.post("/", verifyToken, verifyAdmin, createRoom);
router.put("/:id", verifyToken, verifyAdmin, updateRoom);
router.delete("/:id", verifyToken, verifyAdmin, deleteRoom);

module.exports = router;
