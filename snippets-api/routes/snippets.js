const express = require("express");
const mongoose = require("mongoose");
const authenticate = require("../middleware/authentication");
const router = express.Router();
const Snippet = require("../models/Snippet");

// Get all snippets
router.get("/", authenticate, async (req, res) => {
  const { page: pageStr = 1, ...searchQueries } = req.query;
  const { q, ...query } = {
    ...searchQueries,
  };

  page = parseInt(pageStr);

  if (searchQueries.q) {
    query.name = new RegExp(searchQueries.q, "i");
  }

  if (searchQueries.tags) {
    const tags = searchQueries.tags;
    query.tags = { $and: tags.split("%") };
  }

  try {
    const itemsPerPage = 4;
    const idQuery = { $in: res.user.snippets };
    const snippets = await Snippet.find({
      _id: idQuery,
    })
      .skip(itemsPerPage * (page - 1))
      .limit(itemsPerPage);

    const count = await Snippet.count({ _id: idQuery });
    const totalPages = Math.ceil(count / itemsPerPage);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      docs: snippets,
      hasNextPage,
      hasPrevPage,
      page,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post snippet
router.post("/", authenticate, async (req, res) => {
  const newSnippet = new Snippet(req.body);

  try {
    const snippet = await newSnippet.save();
    res.user.snippets.push(snippet.id);

    //Add snippet id to user profile
    const user = await res.user.save();
    res.json(user.snippets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Patch snippet
router.patch("/:id", [authenticate, getSnippet], async (req, res) => {
  //Modify all requested properties
  for (const key in req.body) {
    res.snippet[key] = req.body[key];
  }
  try {
    const patchedSnippet = await res.snippet.save();
    res.json(patchedSnippet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete snippet
router.delete("/:id", [authenticate, getSnippet], async (req, res) => {
  try {
    const deletedSnippet = await res.snippet.remove();
    res.json({ message: `Deleted snippet: ${deletedSnippet.id}` });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getSnippet(req, res, next) {
  let snippet;
  try {
    snippet = await Snippet.findById(req.params.id);
    if (snippet == null) {
      return res.status(404).json({ message: "Cannot find snippet" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.snippet = snippet;
  next();
}

module.exports = router;
