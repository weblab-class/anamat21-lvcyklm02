const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  content: String,
  author: String,
  time: { type: Date, default: Date.now },
});

// compile model from schema
module.exports = mongoose.model("announcement", AnnouncementSchema);
