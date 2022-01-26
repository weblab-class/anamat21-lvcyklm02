const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  userid: mongoose.ObjectId,
  choreid: mongoose.ObjectId,
  groupid: mongoose.ObjectId,
  time: { type: Date, default: Date.now },
  status: { type: String, enum: ["complete", "incomplete", "overdue"] },
  content: String,
});

// compile model from schema
module.exports = mongoose.model("assignment", AssignmentSchema);
