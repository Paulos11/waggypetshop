const express = require("express");
const { auth, customerAcces } = require("../../lib");
const CartController = require("../../controllers/front/cartController");

const router = express.Router();

router.get("/:userId", CartController.getCart);
router.post("/", CartController.addToCart);
router.put("/", CartController.updateCartItem);
router.delete("/:productId", CartController.removeFromCart);
router.delete("/", CartController.clearCart);

module.exports = router;
