const express = require("express");
const { Cms } = require("@/controllers");

const router = express.Router();

router
  .route("/")
  .get(Cms.UserCtrl.index)
  .post(Cms.UserCtrl.store);

router
  .route("/:id")
  .get(Cms.UserCtrl.show)
  .put(Cms.UserCtrl.update)
  .delete(Cms.UserCtrl.destroy);

module.exports = router;
