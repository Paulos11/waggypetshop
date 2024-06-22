const mongoose = require('mongoose')
const modelConfig = require('../config/modelConfig')

const orderSchema = mongoose.Schema({
  userId: {
   types: mongoose.Schema.Types.ObjectId,
   required: true,
   ref: 'User'},
status:{
   type: String,
   enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
   default: 'pending'
},
items: [
  {
      product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
      },
      quantity: {
          type: Number,
          required: true,
          min: 1
      },
      price: {
          type: Number,
          required: true
      }
  }
],
  }, modelConfig
)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order;