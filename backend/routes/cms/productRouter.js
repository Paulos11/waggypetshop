const express = require("express");
const ProductCtrl = require("../../controllers/cms/productController");
const upload = require("../../middleware/index");
const mimeList = ["image/jpeg", "image/png", "image/gif"];

const router = express.Router();

router
  .route("/")
  .get(ProductCtrl.index)
  .post(upload(mimeList).array("images"), ProductCtrl.store);

router
  .route("/:id")
  .get(ProductCtrl.show)
  .get(ProductCtrl.byId)
  .put(upload(mimeList).array("images"), ProductCtrl.update)
  .patch(upload(mimeList).array("images"), ProductCtrl.update)
  .delete(ProductCtrl.destroy);

router.delete("/:id/image/:filename", ProductCtrl.destroyImage);

module.exports = router;
