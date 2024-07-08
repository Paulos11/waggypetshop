const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist.js');
const auth = require('../middleware/auth.js');

router.post('/add', auth, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    wishlist = new Wishlist({ userId, products: [productId] });
  } else {
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }
  }

  await wishlist.save();
  res.status(200).json(wishlist);
});

router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const wishlist = await Wishlist.findOne({ userId });
  if (wishlist) {
    wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
    await wishlist.save();
  }

  res.status(200).json(wishlist);
});

router.get('/', auth, async (req, res) => {
  const userId = req.user._id;
  const wishlist = await Wishlist.findOne({ userId }).populate('products');
  res.status(200).json(wishlist);
});

module.exports = router;
