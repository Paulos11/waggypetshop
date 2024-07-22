const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true, default: 'Processing' },
  totalAmount: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const orderDetailSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = { orderSchema, orderDetailSchema };
