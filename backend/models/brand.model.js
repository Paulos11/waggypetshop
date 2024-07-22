const mongoose = require("mongoose");
const { modelConfig } = require("@/config");

const Brand = mongoose.model(
  "Brand",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
    },
    modelConfig
  )
);

module.exports = Brand;
