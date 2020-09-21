require("dotenv/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const sendMail = require("./mail");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/portfolio", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Message = require("./models/message");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("mongoose connected");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("hi");
});

app.post("/contact", function (req, res) {
  console.log(req.body);
  const { name, email, message } = req.body;
  //   console.log(name, email, msg);
  const newMessage = new Message({ name, email, message });
  newMessage.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("git");
    }
  });
  // console.log("message: ", message);
  sendMail(name, email, message, function (err, data) {
    if (err) {
      res.status(500).json({ message: "self written internal error" });
    } else {
      res.json({ message: "self written email sent" });
    }
  });
});

app.listen(3201, function () {
  console.log("Z.E.R.O - 1 Systems Intialized on port 3201");
});
