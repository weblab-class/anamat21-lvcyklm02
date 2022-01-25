const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  group: String,
  time: { type: Date, default: Date.now },
  tags: [String],
  type: String,
});

// compile model from schema
module.exports = mongoose.model("announcement", AnnouncementSchema);
