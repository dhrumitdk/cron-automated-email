import express from "express";
import * as dotenv from "dotenv";
import nodemailer from "nodemailer";
import cron from "node-cron";

// App config
const app = express();
const port = process.env.PORT || 4000;
dotenv.config();

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Service to send automated emails!");
});

cron.schedule("30 * * * * * *", () => {
  console.log(`cron running`);
  const transporter = nodemailer.createTransport({
    service: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "noreply.allremote@gmail.com",
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "noreply.allremote@gmail.com",
    to: "dhrumit.dk@gmail.com",
    subject: "New Test Email!",
    html: `I am automated email! Have a good day &#128512;`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Email sent!");
  });
});

// Listen
app.listen(port, () => {
  console.log("Hello Express server is up and running!");
});
