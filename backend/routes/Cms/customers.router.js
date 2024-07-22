const express = require("express");
const { Cms } = require("@/controllers");

const router = express.Router();

router.route("/").get(Cms.CustomerCtrl.index).post(Cms.CustomerCtrl.store);

router
  .route("/:id")
  .get(Cms.CustomerCtrl.show)
  .put(Cms.CustomerCtrl.update)
  .delete(Cms.CustomerCtrl.destroy);

module.exports = router;
