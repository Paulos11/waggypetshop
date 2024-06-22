const express = require("express");
const AuthCtrl = require("../../controllers/Auth/userController");

const router = express.Router();

router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);

module.exports = router;