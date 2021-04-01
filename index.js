require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const sgMail = require("@sendgrid/mail");
const cors = require("cors");

// mongoose.connect("mongodb://localhost/portfolio", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   // we're connected!
//   console.log("mongoose connected");
// });

sgMail.setApiKey(process.env.SENDGRID_ZERO_API_KEY);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("hi");
});

app.post("/contact", async function (req, res) {
  console.log("get route hit");
  console.log(req.body);
  const { name, email, message } = req.body;
  // const newMessage = new Message({ name, email, message });

  // try {
  //   const msg = new Message({ ...newMessage });
  //   let m = await msg.save();
  //   console.log("M: ", m);
  // } catch (err) {
  //   console.log("err: ", err);
  // }

  // newMessage.save(function (r) {
  //   if (r) {
  //     console.log("error: Could not save", r);
  //   } else {
  //     console.log("Mail Saved to MongoDB");
  //   }
  // });
  const msg = {
    from: "samuel.santibout@gmail.com",
    to: [
      "santibout@yahoo.com",
      "santibout01@gmail.com",
      "samuel.santibout@gmail.com",
    ],
    subject: "Portfolio Messeage",
    html: `<h1>From: ${name}</h1>
    <h3>${email}</h3>
    <p>${message}</p>`,
  };
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
});

app.listen(PORT, function () {
  console.log(`Z.E.R.O - 1 Systems Intialized on port ${PORT}`);
});
