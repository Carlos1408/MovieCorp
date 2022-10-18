const { Schema, model } = require("mongoose");
const { Room } = require("./room");

const cinemaSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    rooms_ids: { type: Array, required: false, default: [] },
    movies_ids: { type: Array, required: false, default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("cinema", cinemaSchema);
