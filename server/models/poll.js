const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  announcementId: String,
  pollOptions: [String],
  votes: [Number],
  usersWhoVoted: [String],
});

// compile model from schema
module.exports = mongoose.model("poll", PollSchema);
