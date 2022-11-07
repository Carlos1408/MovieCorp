const Room = require("../models/room");
const Cinema = require("../models/cinema");
const mongoose = require("mongoose");
const Function = require("../models/function");
const Movie = require("../models/movie");
const { deleteFunctionRaw } = require("../controllers/functions.controller");

const getAllRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

const getAllRoomsLg = async (req, res) => {
  const rooms = await Room.aggregate([
    {
      $lookup: {
        from: "cinemas",
        localField: "cinema_id",
        foreignField: "_id",
        as: "cinema",
      },
    },
    { $unwind: "$cinema" },
  ]);
  res.json(rooms);
};

const getRoom = async (req, res) => {
  const { id } = req.params;
  const room = await Room.findById(id);
  res.json(room);
};

const getRoomLg = async (req, res) => {
  const { id } = req.params;
  const room = await Room.aggregate([
    {
      $lookup: {
        from: "cinemas",
        localField: "cinema_id",
        foreignField: "_id",
        as: "cinema",
      },
    },
    { $unwind: "$cinema" },
  ]);
  res.json(room[0]);
};

const createRoom = async (req, res) => {
  const { roomNum, nRows, nCol, price, cinema_id } = req.body;
  const newRoom = new Room({
    roomNum,
    nRows,
    nCol,
    price,
    cinema_id: mongoose.Types.ObjectId(cinema_id),
  });
  await newRoom.save();
  const cinema = await Cinema.findById(cinema_id);
  await cinema.updateOne({ rooms_ids: [...cinema.rooms_ids, newRoom._id] });
  cinema.save();
  res.json(newRoom);
};

const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { roomNum, nRows, nCol, price } = req.body;
  const room = await Room.findByIdAndUpdate(
    id,
    {
      roomNum,
      nRows,
      nCol,
      price,
    },
    {
      new: true,
    }
  );
  res.json(room);
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;
  const room = await Room.findByIdAndRemove(id);
  const cinema = await Cinema.findById(room.cinema_id);
  await cinema.updateOne({
    rooms_ids: cinema.rooms_ids.filter((r) => {
      return r.toString() !== room._id.toString();
    }),
  });
  cinema.save();

  const functions = await Function.find({
    room_id: mongoose.Types.ObjectId(id),
  });
  functions.forEach(async (f) => {
    deleteFunctionRaw(f._id.toString());
  });
  res.json(room);
};

module.exports = {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRoomsLg,
  getRoomLg,
};
