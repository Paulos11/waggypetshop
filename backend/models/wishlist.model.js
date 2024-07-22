const mongoose = require('mongoose');
const { modelConfig } = require('@/config');

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, modelConfig);

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = Wishlist;