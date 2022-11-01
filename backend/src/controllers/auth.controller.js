const User = require("../models/user");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    await bycript.compare(password, user.password, (err, succ) => {
      if (err) {
        console.log(err);
      }
      if (succ) {
        const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey");
        res.json({ token, user });
      } else {
        res.json({ message: "error" });
      }
    });
  } else {
    res.json({ message: "error" });
  }
};

const reLogin = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.json({ message: "unauthorized" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.json({ message: "unauthorized" });
    }
    const payload = await jwt.verify(token, "secretkey");
    if (!payload) {
      return res.json({ message: "unauthorized" });
    }
    const id = payload._id;
    req.userId = id;
    const user = await User.findById(id);
    res.json({ user });
  } catch (err) {
    return res.json({ message: "reLogged" });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.json({ message: "unauthorized" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.json({ message: "unauthorized" });
    }
    const payload = await jwt.verify(token, "secretkey");
    if (!payload) {
      return res.json({ message: "unauthorized" });
    }
    req.userId = payload._id;
    req.userRole = payload.role;
    next();
  } catch (err) {
    return res.json({ message: "unauthorized" });
  }
};

const verifyAdmin = async (req, res, next) => {
  const role = req.userRole;
  console.log(role);
  if (role === "admin") next();
  else return res.json({ message: "unauthorized" });
};

const verifyManager = (req, res, next) => {
  const role = req.userRole;
  if (role === "manager") next();
  else return res.json({ message: "unauthorized" });
};

module.exports = { login, reLogin, verifyToken, verifyAdmin, verifyManager };
