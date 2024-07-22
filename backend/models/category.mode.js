const mongoose = require("mongoose");
const { modelConfig } = require("@/config");

const Category = mongoose.model(
  "Category",
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
module.exports = Category;
