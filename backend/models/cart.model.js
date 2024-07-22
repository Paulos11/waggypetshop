const mongoose = require('mongoose');
const { modelConfig } = require('@/config');

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    name: String,
    price: Number,
    image: String
  }]
},modelConfig);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;