const express = require("express");
const UsersRoutes = require("./users.router");
const CategoryRoutes = require("./categories.router.js");
const CustomerRoutes = require("./customers.router");
const ProductRoutes = require("./products.router");
// const ReviewsRoutes = require("./reviewsRouter");
const OrderRoutes = require("./ordersRouter");
const { adminAcces } = require("@/lib");
const router = express.Router();

router.use("/users", adminAcces, UsersRoutes);

router.use("/categories", adminAcces, CategoryRoutes);
router.use("/customers", adminAcces, CustomerRoutes);
router.use("/products", adminAcces, ProductRoutes);
// router.use("/reviews", adminAcces, ReviewsRoutes);
router.use("/orders", adminAcces, OrderRoutes);

module.exports = router;
