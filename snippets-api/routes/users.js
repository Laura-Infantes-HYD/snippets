const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create user
router.post("/", userExists, async (req, res) => {
  const newUser = new User(req.body);

  try {
    const user = await newUser.save();
    delete user.password;
    res.json(user);
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

module.exports = router;
