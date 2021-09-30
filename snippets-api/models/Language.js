const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Language", snippetSchema);
