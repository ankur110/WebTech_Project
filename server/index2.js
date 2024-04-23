const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({ email, subject, message, username }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.EMAIL_USER,
      to: "22cs3010@rgipt.ac.in", // Replace with the actual recipient email address
      subject: subject,
      html: `
      <p>From: ${username}</p>
      <p>Email: ${email}</p>
      <p>Message:</p>
      <p>${message}</p>
      <p>Best Regards</p>
      `,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

// Now, handle the email sending request
app.post("/", async (req, res) => {
  try {
    const { email, subject, message, username } = req.body; // Extract data from request body
    const response = await sendEmail({ email, subject, message, username });
    res.json(response); // Send response to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
