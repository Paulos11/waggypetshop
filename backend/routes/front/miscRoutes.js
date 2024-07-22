const express = require("express");
const { Front } = require("@/controllers");
const { auth, customerAcces } = require("../../lib");

const router = express.Router();

router.get("/categories", Front.MiscCtrl.categories);
router.get("/categories/:id", Front.MiscCtrl.categoryById);
router.get("/categories/:id/products", Front.MiscCtrl.categoryProducts);
router.post("/checkout", auth, customerAcces, Front.MiscCtrl.checkout);
module.exports = router;
