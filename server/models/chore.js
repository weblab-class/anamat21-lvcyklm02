const mongoose = require("mongoose");

const ChoreSchema = new mongoose.Schema({
  content: String,
  freq: Number,
  hand: Number, // number of people assigned
  currentlyAssigned: { days: [String], users: [String] },
  group: String,
});

// compile model from schema
module.exports = mongoose.model("chore", ChoreSchema);
