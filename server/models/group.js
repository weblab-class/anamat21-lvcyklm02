const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: String,
  members: [String],
  chores: [String],
  points: Number,
});

// compile model from schema
module.exports = mongoose.model("group", GroupSchema);
