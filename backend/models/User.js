const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  googleId: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  loginMethod: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("user", UserSchema);
