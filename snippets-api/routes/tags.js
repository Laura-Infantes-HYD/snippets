const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post tag
router.post("/", async (req, res) => {
  const newTag = new Tag(req.body);

  try {
    const tag = await newTag.save();
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete tag
router.delete("/:id", getTag, async (req, res) => {
  try {
    const deletedTag = await res.tag.remove();
    res.json({ message: `Deleted snippet: ${deletedTag.id}` });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getTag(req, res, next) {
  let tag;
  try {
    tag = await Tag.findById(req.params.id);
    if (tag == null) {
      return res.status(404).json({ message: "Cannot find tag" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.tag = tag;
  next();
}

module.exports = router;
