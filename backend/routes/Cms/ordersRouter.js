const express = require("express");
const { Cms } = require("@/controllers");

const router = express.Router();

router.get("/", Cms.OrdersCtrl.index);

router.post("/:id", Cms.OrdersCtrl.update);
router.patch("/:id", Cms.OrdersCtrl.update);
router.delete("/:id", Cms.OrdersCtrl.destroy);
module.exports = router;
