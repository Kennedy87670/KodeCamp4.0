var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/register", function (req, res, next) {
  const { fullName, email, password } = req.body;
});
router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
});

module.exports = router;
