const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const Transport = require("../email-config/transporter-config");

// Create user
router.post("/", userExists, async (req, res) => {
  const transport = new Transport();

  //Send confirmation email
  const transporter = nodemailer.createTransport(transport.config);
  transport.emailOptions.to = req.body.email;

  transporter.sendMail(transport.emailOptions, async (error, info) => {
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
