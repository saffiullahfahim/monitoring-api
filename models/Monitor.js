const mongoose = require("mongoose");

const monitorSchema = mongoose.Schema(
  {
    link: String,
  },
  {
    timestamps: true,
  }
);

const Monitor = mongoose.model("Monitor", monitorSchema);

module.exports = Monitor;
