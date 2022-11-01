const { Router } = require("express");

const router = Router();

const {
  getAllFunctions,
  getFunction,
  createFunction,
  deleteFunction,
  getAllFunctionsLg,
  getFunctionLg,
} = require("../controllers/functions.controller");

const { verifyToken, verifyAdmin } = require("../controllers/auth.controller");

router.get("/", verifyToken, verifyAdmin, getAllFunctions);
router.get("/lg", verifyToken, verifyAdmin, getAllFunctionsLg);
router.get("/:id", verifyToken, verifyAdmin, getFunction);
router.get("/lg/:id", verifyToken, verifyAdmin, getFunctionLg);
router.post("/", verifyToken, verifyAdmin, createFunction);
router.delete("/:id", verifyToken, verifyAdmin, deleteFunction);

module.exports = router;
