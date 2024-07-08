const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/cms/product/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product.reviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/cms/product/:id/additional-info', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product.additionalInfo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
