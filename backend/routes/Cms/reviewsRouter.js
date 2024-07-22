const express = require("express");
const { adminAcces } = require("../../lib");
const reviewsController = require("../../controllers/cms/reviews.controller");

const router = express.Router();

router.get("/", reviewsController.index);
router.delete("/:id", adminAcces, reviewsController.destroy);

module.exports = router;
