const mongoose = require('mongoose');
const { orderDetailSchema } = require('./sharedSchemas');


const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;