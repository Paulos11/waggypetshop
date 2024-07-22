const mongoose = require("mongoose");
const { modelConfig } = require("@/config");
const { featured } = require("../controllers/front/products.controller");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discounted_price: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    status: {
      type: Boolean,
      default: true,
    },
    colors: [
      {
        type: String,
      },
    ],
    sizes: [
      {
        type: String,
      },
    ],
    featured:{
      type: Boolean,
      default:true
    }
  
  },
  modelConfig
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
