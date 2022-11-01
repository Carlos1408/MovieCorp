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

router.get("/", verifyToken, verifyAdmin, getAllRooms);
router.get("/lg/", verifyToken, verifyAdmin, getAllRoomsLg);
router.get("/:id", verifyToken, verifyAdmin, getRoom);
router.get("/lg/:id", verifyToken, verifyAdmin, getRoomLg);
router.post("/", verifyToken, verifyAdmin, createRoom);
router.put("/:id", verifyToken, verifyAdmin, updateRoom);
router.delete("/:id", verifyToken, verifyAdmin, deleteRoom);

module.exports = router;
