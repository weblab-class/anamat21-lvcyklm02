const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  members: [UserSchema],
  chores: [String],
  points: Number,
});

// compile model from schema
module.exports = mongoose.model("group", GroupSchema);
