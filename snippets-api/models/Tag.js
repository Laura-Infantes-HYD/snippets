const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tag", snippetSchema);
