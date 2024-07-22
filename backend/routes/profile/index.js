const express = require("express");
const ProfileCtrl = require("../../controllers/Auth/profile.controller");
const { auth, customerAcces } = require("../../lib");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.route("/")
  .get(auth, ProfileCtrl.show)
  .put(auth, ProfileCtrl.update)
  .patch(auth, ProfileCtrl.update);

router.route("/password")
  .put(auth, ProfileCtrl.updatePassword)
  .patch(auth, ProfileCtrl.updatePassword);

router.post('/upload', auth, upload.single('profileImage'), ProfileCtrl.uploadProfileImage);

router.get("/reviews", auth, customerAcces, ProfileCtrl.reviews);
router.get("/orders", auth, customerAcces, ProfileCtrl.orders);

module.exports = router;
