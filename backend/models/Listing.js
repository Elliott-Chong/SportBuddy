const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amountOfPeopleNeeded: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
  },

  chat: [
    {
      message: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      time: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],

  dateOfMeet: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  peopleJoined: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  ],
});
module.exports = mongoose.model("listing", UserSchema);
