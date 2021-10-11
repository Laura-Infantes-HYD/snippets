const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");

const transportConfig = {
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "laura.infantes.seg@outlook.com", // generated ethereal user
    pass: "Iwanttos3g123", // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const emailOptions = {
  from: "Snippets app <laura.infantes.seg@outlook.com>",
  to: "lauralopezinfantes@gmail.com",
  subject: "Confirm your snippets app account",
  text: "This is a test email",
};

// Create user
router.post("/", userExists, async (req, res) => {
  //Send confirmation email
  const transporter = nodemailer.createTransport(transportConfig);
  emailOptions.to = req.email;

  transporter.sendMail(emailOptions, async (error, info) => {
    if (error) return res.status(500).send({ message: error.message });

    //Create new user
    const newUser = new User({ ...req.body, isConfirmed: false });

    try {
      const user = await newUser.save();
      delete user.password;
      res.json(info);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
});

// Middleware
async function userExists(req, res, next) {
  let user;

  try {
    user = await User.findOne({ email: req.body.email });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  if (user) return res.status(404).json({ message: "Email in use" });
  next();
}

module.exports = router;
