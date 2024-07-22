const express = require("express");
const router = express.Router();
const OrderController = require("../../controllers/front/orderController");
const { auth, adminAcces } = require("../../lib/index");

router.post("/", auth, OrderController.createOrder);
router.get("/user", auth, OrderController.getUserOrders);
router.get("/:orderId", auth, OrderController.getOrderDetails);

router.get("/admin", 
  auth, 
  adminAcces, 
  OrderController.getAllOrders
);router.patch("/:orderId/status", auth, adminAcces, OrderController.updateOrderStatus);

module.exports = router;
