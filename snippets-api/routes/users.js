const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create user
router.post("/", async (req, res) => {
  const newUser = new User(req.body);

  try {
    const user = await newUser.save();
    const { password, ...hashedUser } = user;
    res.json(hashedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
