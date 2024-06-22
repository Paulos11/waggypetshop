
const express = require("express");

const AuthRoutes = require('./Auth/authRoutes')
const CategoryRoutes = require('./cms/categoryRoutes')
const ProductRoutes = require('./cms/productRouter')
const router = express.Router();


router.use('/auth' , AuthRoutes)
router.use('/cms/category' , CategoryRoutes)
router.use('/cms/product' , ProductRoutes)

module.exports = router;
