const express = require("express");
const authenticate = require("../middleware/authentication");
const router = express.Router();
const Snippet = require("../models/Snippet");

// Get all snippets
router.get("/", authenticate, async (req, res) => {
  const { page, ...searchQueries } = req.query;
  const { q, ...query } = {
    ...searchQueries,
  };

  if (searchQueries.q) {
    query.name = new RegExp(searchQueries.q, "i");
  }

  if (searchQueries.tags) {
    const tags = searchQueries.tags;
    query.tags = { $and: tags.split("%") };
  }

  try {
    const user = await res.user.populate([
      {
        path: "snippets",
        options: {
          skip: page || 0,
          limit: 4,
        },
      },
    ]);

    res.json(user.snippets);
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
