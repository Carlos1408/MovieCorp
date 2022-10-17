const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    length: { type: Number, required: true },
    genre: { type: String, required: false },
    rating: { type: String, required: true },
    protagonists: { type: String, required: false },
    director: { type: String, required: true },
    imagePath: { type: String, required: true },
    trailer: { type: String, required: true },
    cinemas_ids: { type: Array, required: false, default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("movie", movieSchema);
