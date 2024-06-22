const mongoose = require("mongoose");
const modelConfig = require("../config/modelConfig");


const OrderDetails = mongoose.model(
  "OrderDetails",
  new mongoose.Schema(
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Order",
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
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
module.exports = OrderDetails;
