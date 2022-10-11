const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

app.set("port", 4000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api/v1/users", require("./routes/users.routes"));
app.use("/api/v1/cinemas", require("./routes/cinemas.routes"));
app.use("/api/v1/movies", require("./routes/movies.routes"));

module.exports = app;
