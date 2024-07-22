const express = require("express");
const AuthRoutes = require("./auth");
const ProfileRoutes = require("./profile");
const CmsRoutes = require("./Cms");
const FrontRoutes = require("./front");
const { auth, cmsAcces } = require("@/lib");
const ProductsRoutes = require("./front/productRoutes");
const OrderRoutes = require("./front/orderRoutes");
const MiscRoutes = require("./front/miscRoutes");
const ProductForAllRoutes = require("./Cms/productsforall");
const forAll = require("./Cms/productsforall");
const ReviewsRoutes = require('./Cms/reviewsRouter')
const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/profile", auth, ProfileRoutes);
router.use("/cms", auth, cmsAcces, CmsRoutes);

router.use("/cms/", ProductForAllRoutes);

router.use("/products", ProductsRoutes);
router.use("/products", FrontRoutes);

router.use('/orders', OrderRoutes)
router.use("/", ProductForAllRoutes);
router.use("/", ReviewsRoutes);

module.exports = router;
