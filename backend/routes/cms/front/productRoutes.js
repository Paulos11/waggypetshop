const express = require('express');
const {
  getProductById,
  updateProduct,
  uploadProductImages,
  getProductReviews,
  addProductReview,
  addToCart
} = require('../controllers/productController');

const router = express.Router();

router.route('/:id').get(getProductById).put(updateProduct);
router.route('/:id/images').post(uploadProductImages);
router.route('/:id/reviews').get(getProductReviews).post(addProductReview);
router.route('/cart').post(addToCart);

module.exports = router;
