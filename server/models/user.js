const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  current_chores: [String],
  profile_picture: String,
  pronouns: String,
  phone_number: String,
  points: Number,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
