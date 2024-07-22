const mongoose = require("mongoose");
const { errorHandle } = require("../../lib");
const {
  Category,
  Product,
  Brand,
  Order,
  OrderDetails,
} = require("../../models");

class MiscCtrl {
  categories = async (req, res, next) => {
    try {
      const category = await Category.find({
        status: true,
      });
      res.send(category);
    } catch (err) {
      errorHandle(err, next);
    }
  };
  categoryById = async (req, res, next) => {
    try {
      const category = await Category.findOne({
        status: true,
        _id: req.params.id,
      });
      res.send(category);
    } catch (err) {
      errorHandle(err, next);
    }
  };
  categoryProducts = async (req, res, next) => {
    try {
      const products = await Product.find({
        status: true,
        categoryId: req.params.id,
      });
      res.send(products);
    } catch (err) {
      errorHandle(err, next);
    }
  };
  brands = async (req, res, next) => {
    try {
      const brands = await Brand.find({
        status: true,
      });
      res.send(brands);
    } catch (err) {
      errorHandle(err, next);
    }
  };
  brandsById = async (req, res, next) => {
    try {
      const brands = await Brand.findOne({
        status: true,
        _id: req.params.id,
      });
      res.send(brands);
    } catch (err) {
      errorHandle(err, next);
    }
  };
  brandsProducts = async (req, res, next) => {
    try {
      const products = await Product.find({
        status: true,
        brandId: req.params.id,
      });
      res.send(products);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  checkout = async (req, res, next) => {
    try {
      const cart = req.body; 
      const userId = req.uid;
  
      const order = await Order.create({ userId: userId });
  
      for (let item of cart) {
        const product = await Product.findById(item.id);
        if (!product) {
          throw new Error(`Product not found: ${item.id}`);
        }
  
        const price = product.discounted_price > 0 ? product.discounted_price : product.price;
        const total = price * item.quantity;
  
        await OrderDetails.create({
          orderId: order._id,
          productId: product._id,
          price: price,
          qty: item.quantity,
          total,
        });
      }
  
      res.send({
        message: "Thank You for Your Order",
        orderId: order._id
      });
    } catch (err) {
      console.error("Error during checkout:", err);
      errorHandle(err, next);
    }
  };
}

module.exports = new MiscCtrl();
