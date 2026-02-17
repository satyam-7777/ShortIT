const mongoose = require("mongoose");

const urlShortnerSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    lastClickedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const shortUrlModel = mongoose.model("Shorturl", urlShortnerSchema);
module.exports = shortUrlModel;
