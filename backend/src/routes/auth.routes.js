const { Router } = require("express");
const { login, reLogin } = require("../controllers/auth.controller");

const router = Router();

router.post("/login", login);
router.get("/relogin", reLogin);

module.exports = router;
