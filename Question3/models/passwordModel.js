const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
  password: String,
  stepsRequired: Number,
});

module.exports = mongoose.model("Password", passwordSchema)
