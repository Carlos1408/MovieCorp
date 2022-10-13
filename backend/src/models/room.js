const {Schema, model} = require("mongoose");

const roomSchema = new Schema(
    {
        roomNum: {type: String, require: true},
        nRows: {type: Number, require: true},
        nCol: {type: Number, require: true},
        price: {type: Number, require: true},
    },
    {
        timestamps: true,
        versionKey: false,
    });
module.exports = model("room", roomSchema);