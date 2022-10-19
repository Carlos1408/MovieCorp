const { Router } = require("express");

const router = Router();

const {
  getAllFunctions,
  getFunction,
  createFunction,
  deleteFunction,
  getAllFunctionsLg,
  getFunctionLg
} = require("../controllers/functions.controller");

router.get("/", getAllFunctions);
router.get("/lg", getAllFunctionsLg);
router.get("/:id", getFunction);
router.get("/lg/:id", getFunctionLg);
router.post("/", createFunction);
router.delete("/:id", deleteFunction);

module.exports = router;
