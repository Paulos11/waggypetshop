const express = require("express");
const { Front } = require("@/controllers");
const { auth, customerAcces } = require("../../lib");
const path = require("path");

const router = express.Router();

router.get("/featured", Front.ProductCtrl.featured);
router.get("/latest", Front.ProductCtrl.latest);
router.get("/top-selling", Front.ProductCtrl.top);
router.get("/search", Front.ProductCtrl.search);
router.get("/:id", Front.ProductCtrl.byId);
router.get("/:id/similar", Front.ProductCtrl.similar);
router.post("/:id/review", auth, customerAcces, Front.ProductCtrl.review);

router.get("/image/:filename", (req, res, next) => {
  const options = {
    root: path.join(__dirname, "../uploads"),
    headers: {
      "Content-Type": "image/jpeg",
    },
  };

  const filename = req.params.filename;

  res.sendFile(filename, options, (err) => {
    if (err) {
      next(err);
    }
  });
});

module.exports = router;
