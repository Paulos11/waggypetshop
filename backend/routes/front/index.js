const express = require("express");
const MiscCtrl = require("../../controllers/front/misc.controller");
const cartRoutes = require("./cartRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const logger = require("../../middleware/logger");
const orderRoutes = require("./orderRoutes");




const { auth, customerAcces } = require("../../lib");

const router = express.Router();

router.use(logger); 
router.get("/categories", MiscCtrl.categories);
router.get("/categories/:id", MiscCtrl.categoryById);
router.get("/categories/:id/products", MiscCtrl.categoryProducts);
router.get("/brands", MiscCtrl.brands);
router.get("/brands/:id", MiscCtrl.brandsById);
router.get("/brands/:id/products", MiscCtrl.brandsProducts);
router.post("/checkout", auth, customerAcces, MiscCtrl.checkout);

router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/", orderRoutes);

module.exports = router;
