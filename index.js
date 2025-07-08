// server/index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {
  const { name, email, phone, carName, carModel, carPlate, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "info.shinecrewdetailing@gmail.com",
    subject: `New Inquiry from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Car Name:</strong> ${carName}</p>
      <p><strong>Car Model:</strong> ${carModel}</p>
      <p><strong>Car Plate:</strong> ${carPlate}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
