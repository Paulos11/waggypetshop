const express = require("express");
const { auth, customerAcces } = require("../../lib");
const WishlistController = require("../../controllers/front/wishlistController");

const router = express.Router();

router.get("/",  WishlistController.getWishlist);
router.post("/",  WishlistController.addToWishlist);
router.delete("/:productId",  WishlistController.removeFromWishlist);
router.delete("/",  WishlistController.clearWishlist);

module.exports = router;
