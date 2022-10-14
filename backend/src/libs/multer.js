const multer = require("multer");
const { v4: uuid } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir;
    if(req.originalUrl.includes('movies')) dir = 'movies';
    if(req.originalUrl.includes('cinemas')) dir = 'cinemas';
    cb(null, `uploads/${dir}`);
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});

module.exports = multer({ storage });
