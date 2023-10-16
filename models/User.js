const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
  email: {
    type: String,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    maxlength: 50,
  },
});

module.exports = mongoose.model("user", userSchema);
