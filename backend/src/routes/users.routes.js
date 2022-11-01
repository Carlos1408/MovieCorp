const { Router } = require("express");

const router = Router();

const {
  getAlltUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const { verifyToken, verifyManager } = require("../controllers/auth.controller");

router.get("/", verifyToken, verifyManager, getAlltUsers);
router.get("/:id", verifyToken, verifyManager, getUser);
router.post("/", verifyToken, verifyManager, createUser);
router.put("/:id", verifyToken, verifyManager, updateUser);
router.delete("/:id", verifyToken, verifyManager, deleteUser);

module.exports = router;
