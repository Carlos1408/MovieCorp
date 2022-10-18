const { Router } = require("express");

const router = Router();

const {
  getAllFunctions,
  getFunction,
  createFunction,
  deleteFunction,
} = require("../controllers/functions.controller");

router.get("/", getAllFunctions);
router.get("/:id", getFunction);
router.post("/", createFunction);
router.delete("/:id", deleteFunction);

module.exports = router;
