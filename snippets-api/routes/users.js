const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const Transport = require("../email-config/transporter-config");
const jwt = require("jsonwebtoken");

// Create user
router.post("/", userExists, async (req, res) => {
  const newUser = new User({ ...req.body, isConfirmed: false });
  let user;

  try {
    user = await newUser.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }

  //Send confirmation email
  sendConfirmationEmail(req, res, user);
});

function sendConfirmationEmail(req, res, user) {
  const transport = new Transport({ email: req.body.email, id: user._id });
  const transporter = nodemailer.createTransport(transport.config);
  transporter.sendMail(transport.getEmailOptions(), async (error, info) => {
    if (error) return res.status(500).send({ message: error.message });
    res.json(info);
  });
}

// confirm user
router.patch("/confirm/:id", findUserByEncryptedId, async (req, res) => {
  res.user.isConfirmed = true;

  try {
    const confirmedUser = await res.user.save();
    res.json(confirmedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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

async function findUserByEncryptedId(req, res, next) {
  let verification = jwt.verify(
    req.params.id,
    process.env.CONFIRMATION_TOKEN_SECRET
  );

  if (!verification.id) return res.status(401).json({ message: err.message });

  let user;

  try {
    user = await User.findById(verification.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
