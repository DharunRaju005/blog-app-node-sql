const express = require("express");
const { signup, login, logout } = require("../Controllers/AuthController.js");
const AuthenticateUser = require("../Middleware/CheckUser.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",AuthenticateUser, logout);

module.exports = router;
