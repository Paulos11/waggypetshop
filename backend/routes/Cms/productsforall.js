
const express = require("express");
const { Cms } = require("@/controllers");


const router = express.Router();

router.get('/products', Cms.ProductCtrl.index);
router.get('/product/:id', Cms.ProductCtrl.byId);
router.get('/categories/:id', Cms.CategoryCtrl.show);
router.get('/categories', Cms.CategoryCtrl.index);

module.exports = router;
