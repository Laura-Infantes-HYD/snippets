const express = require("express");
const router = express.Router();
const Snippet = require("../models/Snippet");

// Get all snippets
router.get("/", async (req, res) => {
  const { page, ...searchQueries } = req.query;
  const { q, ...query } = {
    ...searchQueries,
  };

  if (searchQueries.q) {
    query.name = new RegExp(searchQueries.q, "i");
  }

  try {
    const snippets = await Snippet.paginate(query, {
      limit: 4,
      page: page || 1,
    });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post snippet
router.post("/", async (req, res) => {
  const newSnippet = new Snippet(req.body);

  try {
    const snippet = await newSnippet.save();
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Patch snippet
router.patch("/:id", getSnippet, async (req, res) => {
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
router.delete("/:id", getSnippet, async (req, res) => {
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
