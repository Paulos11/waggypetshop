const express = require("express");
const { Cms } = require("@/controllers");

const router = express.Router();

router.route("/").post(Cms.CategoryCtrl.store);

router
  .route("/:id")

  .put(Cms.CategoryCtrl.update)
  .delete(Cms.CategoryCtrl.destroy);

module.exports = router;
