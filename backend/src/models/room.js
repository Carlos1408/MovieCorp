const { Schema, model, default: mongoose } = require("mongoose");

const roomSchema = new Schema(
  {
    roomNum: { type: String, required: true },
    nRows: { type: Number, required: true },
    nCol: { type: Number, required: true },
    price: { type: Number, required: true },
    timeRanges: { type: Array, required: false, default: [] },
    cinema_id: { type: mongoose.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = model("room", roomSchema);
