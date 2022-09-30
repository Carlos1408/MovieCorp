const {Schema, model} = require("mongoose");

const cinemaSchema = new Schema(
    {
        name: {type: String, required: true},
        address: {type: String, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    });

module.exports = model("cinema", cinemaSchema);