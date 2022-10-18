const { Schema, model } = require("mongoose");
const { Room } = require("./room");

const cinemaSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    imagePath: {type: String, required: true},
    movies_ids: { type: Array, required: false, default: [] },
    rooms_ids: { type: Array, required: false, default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("cinema", cinemaSchema);
