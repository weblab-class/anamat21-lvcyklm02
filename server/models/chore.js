const mongoose = require("mongoose");

const ChoreSchema = new mongoose.Schema({
  name: String,
  timesPerWeek: Number,
  maxAssignment: Number,
  currentlyAssigned: [String],
});

// compile model from schema
module.exports = mongoose.model("chore", ChoreSchema);
