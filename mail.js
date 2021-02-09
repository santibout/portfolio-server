require("dotenv").config();
const nodeMailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: process.env.MAIL_GUN_API_KEY,
    domain: process.env.MAIL_GUN_DOMAIN_NAME,
  },
};

const transporter = nodeMailer.createTransport(mailGun(auth));

const sendMail = (name, email, msg, cb) => {
  console.log(`from sendMail: name = ${name}, email = ${email}, msg = ${msg}`);
  const mailOptions = {
    sender: name,
    from: email,
    subject: msg,
    text: name + " " + email + " " + msg,
  };

  console.log("mailOptions ", mailOptions);

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error trying to send email");
      cb(err, null);
    } else {
      console.log("Message Sent");
      cb(null, data);
    }
  });
};

module.exports = sendMail;
// const mailgun = require("nodemailer-mailgun-transport");

// const mailgun = require("mailgun-js");
// const DOMAIN = "santibout@yahoo.com";
// const mg = mailgun({ apiKey: process.env.MAIL_GUN_API_KEY, domain: DOMAIN });

// const data = {
//   from:
//     "https://api.mailgun.net/v3/sandboxa5bad545d5fc4172820c7eddfa0ca97c.mailgun.org",
//   to: DOMAIN,
//   subject: "Mail Gun",
//   text: "Testing some Mailgun awesomness!",
// };

// mg.messages().send(data, function (error, body) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(body);
//   }
// });
