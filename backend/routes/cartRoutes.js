const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const auth = require('../middleware/auth');

const getOrCreateCart = async (req) => {
  if (req.user) {
    return await Cart.findOne({ userId: req.user._id }) || new Cart({ userId: req.user._id });
  } else {
    if (!req.session.cartId) {
      const cart = new Cart({ sessionId: req.session.id });
      await cart.save();
      req.session.cartId = cart._id;
      return cart;
    }
    return await Cart.findOne({ sessionId: req.session.cartId }) || new Cart({ sessionId: req.session.cartId });
  }
};

router.post('/add', auth, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await getOrCreateCart(req);

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await getOrCreateCart(req);

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const cart = await getOrCreateCart(req);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

module.exports = router;
