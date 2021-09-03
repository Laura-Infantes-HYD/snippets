const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const snippetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
    default: [],
  },
  isFavourite: {
    type: Boolean,
    required: true,
    default: false,
  },
});

snippetSchema.plugin(paginate);

module.exports = mongoose.model("Snippet", snippetSchema);
