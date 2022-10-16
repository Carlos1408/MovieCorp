const Room = require("../models/room");
const Cinema = require("../models/cinema");

const getAllRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

const getRoom = async (req, res) => {
  const { id } = req.params;
  const room = await Room.findById(id);
  res.json(room);
};

const createRoom = async (req, res) => {
  const { roomNum, nRows, nCol, price, cinema_id } = req.body;
  const newRoom = new Room({
    roomNum,
    nRows,
    nCol,
    price,
  });
  await newRoom.save();
  const cinema = await Cinema.findById(cinema_id);
  await cinema.updateOne(
    { rooms: [...cinema.rooms, newRoom._id] }
  );
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
  const room = await Room.findByIdAndDelete(id);
  res.json(room);
};

module.exports = {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};
