const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const pdf1 = require("html-pdf");
const pdf2 = require("html-pdf");
const fs = require("fs");
const path = require("path");
const Function = require("../models/function");

function createVoucher(cinema, movie, hour, seats, price, room, client) {
  var today = new Date();
  var now = today.toLocaleDateString("en-GB");

  const formateador = new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: "BOB",
  });
  const ubicacionPlantilla = require.resolve("../templates/voucher.html");
  let contenidoHtml = fs.readFileSync(ubicacionPlantilla, "utf8");
  let cant = seats.length;

  let tabla = "";
  let total = cant * price;
  tabla = `<tr>
    <td>${movie}</td>
    <td>${hour}</td>
    <td>${cant}</td>
    <td>${formateador.format(price)}</td>
    <td>${formateador.format(total)}</td>
    </tr>`;

  contenidoHtml = contenidoHtml.replace("{{tablaProductos}}", tabla);
  contenidoHtml = contenidoHtml.replace("{{names}}", client.names);
  contenidoHtml = contenidoHtml.replace("{{ci}}", client.ci);
  contenidoHtml = contenidoHtml.replace("{{fecha}}", now);
  contenidoHtml = contenidoHtml.replace("{{nVoucher}}", 1);
  contenidoHtml = contenidoHtml.replace("{{cinema}}", cinema);
  pdf1
    .create(contenidoHtml)
    .toFile("./document/recibo.pdf", async (error, res) => {
      if (error) {
        console.log("Error creando PDF: " + error);
      } else {
        console.log("creado recibo");
        createTicket(movie, cinema, room, hour, seats, client);
      }
    });
}
function createTicket(movie, cinema, room, hour, seats, client) {
  const ubicacionPlantilla = require.resolve("../templates/ticket.html");
  let contenidoHtml = fs.readFileSync(ubicacionPlantilla, "utf8");

  let tabla = "";
  for (const seat of seats) {
    tabla += `<tr>
                    <th><h1>${movie}</h1></th>
                </tr>
                <tr>
                    <th><h1>${cinema}</h1></th>
                </tr>
                <tr>
                    <th><h1>${room}</h1></th>
                </tr>
                <tr>
                    <th><h1>${hour}</h1></th>
                </tr>
                <tr>
                    <th><h1>${seat}</h1></th>
                </tr>
                <tr>
                    <th><h1>-----------------------</h1></th>
                </tr>
                `;
  }
  contenidoHtml = contenidoHtml.replace("{{tablaBoletos}}", tabla);
  pdf2
    .create(contenidoHtml)
    .toFile("./document/boletos.pdf", async (error, res) => {
      if (error) {
        console.log("Error creando PDF: " + error);
      } else {
        console.log("CREADO boletos");
        createMessage(client);
      }
    });
}

function createMessage(client) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "oasiscorp707@gmail.com",
      pass: "mwqbcvgisrvphbhv",
    },
  });

  let mailOptions = {
    from: client.names,
    to: client.email,
    subject: "Comprobante de pago y boletos",
    text: "Muchas gracias por comprar en MovieCorp, le adjuntamos el recibo de su compra y sus boletos DISFRUTE SU PELíCULA!!!",
    attachments: [
      { path: "./document/recibo.pdf" },
      { path: "./document/boletos.pdf" },
    ],
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
    } else {
      console.log("mensaje enviado");
      fs.unlink(path.resolve("./document/recibo.pdf"), (error) =>
        console.log(error)
      );
      fs.unlink(path.resolve("./document/boletos.pdf"), (error) =>
        console.log(error)
      );
    }
  });
}

const buy = async (req, res) => {
  const { cinema_id, client, movie_id, function_id, room_id, seats } = req.body;
  const oldFunction = await Function.findById(function_id);
  if (oldFunction) {
    await oldFunction.updateOne(
      {
        occupiedSeats: oldFunction.occupiedSeats.concat(seats),
      },
      { new: true }
    );
    await oldFunction.save();
  }
  const f = await Function.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(function_id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "cinemas",
        localField: "cinema_id",
        foreignField: "_id",
        as: "cinema",
      },
    },
    { $unwind: "$cinema" },
    {
      $lookup: {
        from: "rooms",
        localField: "room_id",
        foreignField: "_id",
        as: "room",
      },
    },
    { $unwind: "$room" },
    {
      $lookup: {
        from: "movies",
        localField: "movie_id",
        foreignField: "_id",
        as: "movie",
      },
    },
    { $unwind: "$movie" },
  ]);
  const function_ = f[0];

  const cinema = function_.cinema;
  const room = function_.room;
  const movie = function_.movie;
  const timeStart = new Date(function_.from);
  const hour = timeStart.getHours() + ":" + timeStart.getMinutes();

  createVoucher(
    cinema.name,
    movie.title,
    hour,
    seats,
    room.price,
    room.roomNum,
    client
  );

  res.json(null);
};
module.exports = {
  buy,
};
