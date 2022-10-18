const { Schema, model } = require("mongoose");

const functionSchema = new Schema(
  {
    cinema_id: { type: String, required: true },
    room_id: { type: String, required: true },
    movie_id: {type: String, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
    nSeats: { type: Number, required: false },
    occupiedSeats: { type: Array, required: false, default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("function", functionSchema);
