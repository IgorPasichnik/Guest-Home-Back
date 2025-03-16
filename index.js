const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json()); // <-- важно!
app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-email", async (req, res) => {
  try {
    console.log("Данные, полученные на сервере:", req.body);

    const transporter = nodemailer.createTransport({
      service: "Yandex",
      port: 465,
      secure: true,
      auth: {
        user: "GreenYardCrimea@yandex.ru",
        pass: "nogusocubfwdkuah",
      },
    });

    const { name, email, phoneNumber, room, date, adults, children, message } =
      req.body;

    const mailOptions = {
      from: "GreenYardCrimea@yandex.ru",
      to: "GreenYardCrimea@yandex.ru",
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

app.listen(5000, () => console.log("Сервер запущен на порту 5000"));
