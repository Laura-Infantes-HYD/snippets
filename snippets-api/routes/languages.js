const express = require("express");
const router = express.Router();
const Language = require("../models/Language");

// Get all languages
router.get("/", async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
