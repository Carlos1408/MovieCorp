const multer = require("multer");
const { v4: uuid } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const urlArr = req.originalUrl.split("/");
    console.log(path.resolve(`uploads/${urlArr[urlArr.length - 2]}`));
    cb(null, `uploads/${urlArr[urlArr.length - 2]}`);
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});

module.exports = multer({ storage });
