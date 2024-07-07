const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  profile,
} = require("../controller/authController");
const checkIfLoggedIn = require("../utils/checkIfLoggedIn");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", checkIfLoggedIn, profile);

module.exports = router;
