const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    maxlength: 50,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    maxlength: 25,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
