const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/moviecorp-dev", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
