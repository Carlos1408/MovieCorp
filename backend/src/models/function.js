const { Schema, model, default: mongoose } = require("mongoose");

const functionSchema = new Schema(
  {
    cinema_id: { type: mongoose.Types.ObjectId, required: true },
    room_id: { type: mongoose.Types.ObjectId, required: true },
    movie_id: { type: mongoose.Types.ObjectId, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    nSeats: { type: Number, required: false },
    occupiedSeats: { type: Array, required: false, default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("function", functionSchema);
