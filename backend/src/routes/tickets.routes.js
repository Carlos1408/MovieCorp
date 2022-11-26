const { Router } = require("express");

const router = Router();

const {
  buy
} = require("../controllers/tickets.controller");


router.post("/",buy);


module.exports = router;
