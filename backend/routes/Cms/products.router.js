const express = require("express");
const { Cms } = require("@/controllers");
const { upload } = require("../../lib");
const mimeList = ["image/jpeg", "image/png", "image/gif"];

const router = express.Router();

router
  .route("/")
  .post(upload(mimeList).array("images"), Cms.ProductCtrl.store);

router
  .route("/:id")
  .put(upload(mimeList).array("images"), Cms.ProductCtrl.update)
  .patch(upload(mimeList).array("images"), Cms.ProductCtrl.update)
  .delete(Cms.ProductCtrl.destroy);

router.delete("/:id/image/:filename", Cms.ProductCtrl.destroyImage);

module.exports = router;
