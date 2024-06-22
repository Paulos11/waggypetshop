const express = require("express");
const categoryCtrl = require("../../controllers/cms/categoryController");

const router = express.Router();

router.route("/").get(categoryCtrl.index).post(categoryCtrl.store);

router
  .route("/:id")
  .get(categoryCtrl.show)
  .put(categoryCtrl.update)
  .delete(categoryCtrl.destroy);

module.exports = router;
