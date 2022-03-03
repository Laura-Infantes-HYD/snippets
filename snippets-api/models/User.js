const mongoose = require("mongoose");
const { Schema, Types } = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isConfirmed: {
    type: String,
    required: true,
    default: false,
  },
  snippets: [{ type: Schema.Types.ObjectId, ref: "Snippet" }],
});

module.exports = mongoose.model("User", userSchema);
