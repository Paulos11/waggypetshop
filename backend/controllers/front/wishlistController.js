const { errorHandle } = require("../../lib");
const Wishlist = require("../../models/wishlist.model");

class WishlistController {
  getWishlist = async (req, res, next) => {
    console.log('getWishlist called');
    try {
      const userId = req.uid || req.query.userId; 
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      console.log('Fetching wishlist for user:', userId);
      const wishlist = await Wishlist.findOne({ userId });
      console.log('Wishlist found:', wishlist);
      res.send(wishlist || { userId, items: [] });
    } catch (err) {
      console.error('Error in getWishlist:', err);
      errorHandle(err, next);
    }
  };

  addToWishlist = async (req, res, next) => {
    try {
      const userId = req.uid;
      const { productId } = req.body;
      if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      const wishlist = await Wishlist.findOneAndUpdate(
        { userId },
        { $push: { items: { productId } } },
        { new: true, upsert: true }
      );
      res.send(wishlist);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  removeFromWishlist = async (req, res, next) => {
    try {
      const userId = req.uid;
      const { productId } = req.params;
      if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      const wishlist = await Wishlist.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId } } },
        { new: true }
      );
      res.send(wishlist);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  clearWishlist = async (req, res, next) => {
    try {
      const userId = req.uid;
      const wishlist = await Wishlist.findOneAndUpdate(
        { userId },
        { $set: { items: [] } },
        { new: true }
      );
      res.send(wishlist);
    } catch (err) {
      errorHandle(err, next);
    }
  };
}

module.exports = new WishlistController();