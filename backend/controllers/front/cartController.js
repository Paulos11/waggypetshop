const { errorHandle } = require("../../lib");
const Cart = require("../../models/cart.model");

class CartController {
  getCart = async (req, res, next) => {
    try {
      const userId = req.params.userId || 'guest';
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      res.send(cart || { userId, items: [] });
    } catch (err) {
      errorHandle(err, next);
    }
  };

  addToCart = async (req, res, next) => {
    try {
      const userId = req.uid || 'guest';
      const { productId, quantity, name, price, image } = req.body;
      if (!productId || !quantity) {
        return res.status(400).json({ message: 'Product ID and quantity are required' });
      }

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, name, price, image });
      }

      await cart.save();
      res.send(cart);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  updateCartItem = async (req, res, next) => {
    try {
      const userId = req.uid || 'guest';
      const { productId, quantity } = req.body;
      if (!productId || !quantity) {
        return res.status(400).json({ message: 'Product ID and quantity are required' });
      }
      const cart = await Cart.findOneAndUpdate(
        { userId, "items.productId": productId },
        { $set: { "items.$.quantity": quantity } },
        { new: true }
      );
      res.send(cart);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  removeFromCart = async (req, res, next) => {
    try {
      const userId = req.uid || 'guest';
      const { productId } = req.params;
      if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId } } },
        { new: true }
      );
      res.send(cart);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const userId = req.uid || 'guest';
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [] } },
        { new: true }
      );
      res.send(cart);
    } catch (err) {
      errorHandle(err, next);
    }
  };
}

module.exports = new CartController();
