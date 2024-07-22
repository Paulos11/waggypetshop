const mongoose = require('mongoose');
const Order = require('../../models/order.model');
const OrderDetails = require('../../models/order-details.model');
const Product = require('../../models/product.model');

class OrderController {
  createOrder = async (req, res) => {
    try {
      const { userId, products } = req.body;

      const order = new Order({ userId });
      await order.save();

      let totalAmount = 0;

      for (let item of products) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ message: `Product ${item.productId} not found` });
        }

        const orderDetail = new OrderDetails({
          orderId: order._id,
          productId: item.productId,
          price: product.price,
          qty: item.quantity,
          total: product.price * item.quantity,
        });

        await orderDetail.save();
        totalAmount += orderDetail.total;
      }

      order.totalAmount = totalAmount;
      await order.save();

      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Error creating order', error: error.message });
    }
  };

  getUserOrders = async (req, res) => {
    try {
      console.log('Fetching orders for user:', req.user._id);
      const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
      console.log('Fetched orders:', orders);
      res.json(orders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  };

  getOrderDetails = async (req, res, next) => {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return next({
          message: 'Invalid Order ID',
          status: 400,
        });
      }
      console.log('Fetching order details for orderId:', orderId);
      const orderDetails = await OrderDetails.find({ orderId: mongoose.Types.ObjectId(orderId) }).populate('productId');
      res.json(orderDetails);
    } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({
        message: 'Error fetching order details',
        error: error.message,
      });
    }
  };

  getAllOrders = async (req, res, next) => {
    console.log('Entering getAllOrders function');
    try {
      console.log('Attempting to fetch orders');
      const orders = await Order.find().lean();
      console.log(`Successfully fetched ${orders.length} orders`);
      res.json(orders);
    } catch (error) {
      console.error('Error in getAllOrders:', error);
      next(error);
    }
  };

  updateOrderStatus = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return next({
          message: 'Invalid Order ID',
          status: 400,
        });
      }
      const { status } = req.body;

      const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
  };
}

module.exports = new OrderController();