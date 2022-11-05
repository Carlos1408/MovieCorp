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

router.get("/", getAllFunctions);
router.get("/lg", getAllFunctionsLg);
router.get("/:id", getFunction);
router.get("/lg/:id", getFunctionLg);
router.post("/", verifyToken, verifyAdmin, createFunction);
router.delete("/:id", verifyToken, verifyAdmin, deleteFunction);

module.exports = router;
