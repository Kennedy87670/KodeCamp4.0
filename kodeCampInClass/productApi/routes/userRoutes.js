const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.route("/register").post(userController.createUser);

router.route("/login").post(userController.loginUser);
router.route("/verify-email/:token").post(userController.verifyEmail);

module.exports = router;
