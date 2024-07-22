const mongoose = require('mongoose');
const { orderSchema } = require('./sharedSchemas');

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;