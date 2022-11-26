const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const pdf1 = require("html-pdf");
const pdf2 = require("html-pdf");
const fs = require("fs");
const path = require("path");

function createVoucher(cinema, movie, hour, seats, price, room, userData) {

    var today = new Date();
    var now = today.toLocaleDateString('en-GB');

    const formateador = new Intl.NumberFormat("es-BO", { style: "currency", "currency": "BOB" });
    const ubicacionPlantilla = require.resolve("../templates/voucher.html");
    let contenidoHtml = fs.readFileSync(ubicacionPlantilla, 'utf8');
    let cant = seats.length;

    let tabla = "";
    let total = cant * price;
    tabla = `<tr>
    <td>${movie}</td>
    <td>${hour}</td>
    <td>${cant}</td>
    <td>${formateador.format(price)}</td>
    <td>${formateador.format(total)}</td>
    </tr>`
   
    contenidoHtml = contenidoHtml.replace("{{tablaProductos}}", tabla);
    contenidoHtml = contenidoHtml.replace("{{name}}",userData.name);
    contenidoHtml = contenidoHtml.replace("{{lastname}}",userData.lastname);
    contenidoHtml = contenidoHtml.replace("{{ci}}",userData.CI);
    contenidoHtml = contenidoHtml.replace("{{fecha}}",now);
    contenidoHtml = contenidoHtml.replace("{{nVoucher}}", 1);
    contenidoHtml = contenidoHtml.replace("{{cinema}}",cinema);
    console.log();
    pdf1.create(contenidoHtml).toFile("./document/recibo.pdf",async(error,res) => {
        if (error) {
            console.log("Error creando PDF: " + error)
        } else {
            console.log("PDF creado correctamente RECIBO");
            createTicket(movie, cinema, room, hour, seats, userData);
        }
    });
}
function createTicket(movie, cinema, room, hour, seats, userData){

    const ubicacionPlantilla = require.resolve("../templates/ticket.html");
    let contenidoHtml = fs.readFileSync(ubicacionPlantilla, 'utf8');

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
    contenidoHtml = contenidoHtml.replace("{{tablaBoletos}}",tabla);
    pdf2.create(contenidoHtml).toFile("./document/boletos.pdf",async(error,res) => {
        if (error) {
            console.log("Error creando PDF: " + error)
        } else {
            console.log("PDF creado correctamente BOLETOS ");
            createMessage(userData);
        }
    });
}

function createMessage(userData) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'vcp256@gmail.com',
            pass: 'alhabaaodphimqcb',
        },
    });

    let mailOptions = {
        from: userData.name+" "+userData.lastname,
        to: userData.email,
        subject: "Comprobante de pago y boletos",
        text: "Muchas gracias por comprar en MovieCorp, le adjuntamos el recibo de su compra y sus boletos DISFRUTE SU PELíCULA!!!",
        attachments: [
            {path: "./document/recibo.pdf"},
            {path: "./document/boletos.pdf"}
        ]
    }

    transporter.sendMail( mailOptions, async(error, info) => {
        if (error) {
            
        } else {
            fs.unlink(path.resolve("./document/recibo.pdf"),(error)=>(console.log(error)));
            fs.unlink(path.resolve("./document/boletos.pdf"),(error)=>(console.log(error)));
        }
    });
}


const buy = async (req, res) => {
   /*const {cinema_id, room_id, movie_id, function_id} = req.body
    const function_ = await Function.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
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
    const cinema = function_.cinema
    const room = function_.room
    const movie = function_.movie*/
    const seats = ['110', '12', '13']
    const cinema = {name: "Cochabamba"}
    const room = {name: "A1", price: 25}
    const movie = {name: "LOS VENGADORES"}
    const userData = {name: "Victor", lastname: "Camacho", CI: 8801362, email: "vcp8801@gmail.com"}
    //const timeStart = new Date(function_.from)
    const timeStart = new Date();
    const hour = timeStart.getHours()+":"+timeStart.getMinutes();

    createVoucher(cinema.name, movie.name, hour, seats, room.price, room.name, userData)

    res.json(null);
  }

  module.exports = {
    buy
  }