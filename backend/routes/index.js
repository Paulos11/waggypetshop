const express = require('express');
const router = express.Router();

const AuthRoutes = require('./Auth/authRoutes');
const CategoryRoutes = require('./cms/categoryRoutes');
const ProductRoutes = require('./cms/productRouter');
const CartRoutes = require('./cartRoutes');
const WishlistRoutes = require('./wishlistRoutes');

router.use('/auth', AuthRoutes);
router.use('/cms/category', CategoryRoutes);
router.use('/cms/product', ProductRoutes);
router.use('/cart', CartRoutes);  
router.use('/wishlist', WishlistRoutes);

module.exports = router;
