const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-email", async (req, res) => {
  try {
    console.log("Данные, полученные на сервере:", req.body);

    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
      // tls: {
      //   rejectUnauthorized: false,
      // },
    });

    const { name, email, phoneNumber, room, date, adults, children, message } =
      req.body;

    const mailOptions = {
      from: process.env.EMAIL_ADRESS,
      to: process.env.EMAIL_ADRESS,
      subject: "Новое бронирование",
      html: `
        <strong>От:</strong> ${name}<br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Телефон:</strong> ${phoneNumber}<br/>
        <strong>Тип номера:</strong> ${room}<br/>
        <strong>Дата заезда/выезда:</strong> ${date}<br/>
        <strong>Взрослые:</strong> ${adults}<br/>
        <strong>Дети:</strong> ${children}<br/>
        <strong>Пожелания:</strong> ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Сообщение успешно отправлено!" });
  } catch (e) {
    console.error("Ошибка при отправке:", e);
    res.status(500).send({ message: "Ошибка отправки сообщения" });
  }
});

app.listen(5000, "0.0.0.0", () => console.log("Server running on IPv4"));
