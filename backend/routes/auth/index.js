const express = require("express");
const { Auth } = require("@/controllers");
const router = express.Router();

router.post("/register", Auth.RegisterCtrl.register);
router.post("/login", Auth.LoginCtrl.login);
router.post("/profile", Auth.ProfileCtrl.show);

module.exports = router;
