const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    answer: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Datas", dataSchema);
