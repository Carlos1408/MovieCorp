const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lastnames: { type: String, required: true },
    birthdate: { type: String, required: true },
    phone: { type: Number, required: true },
    role: {type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("user", userSchema);
