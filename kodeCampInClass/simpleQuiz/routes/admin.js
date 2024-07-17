const express = require("express");
const {
  createQuiz,
  getAllQuiz,
  getQuizById,
} = require("../controller/adminController");
const verifyAuth = require("../middleware/verifyAuth");
const rolesAllowed = require("../middleware/roleBasedAuth");

const router = express.Router();

router.use(verifyAuth);
router.use(rolesAllowed(["admins"]));

router.post("/quiz", createQuiz);
router.get("/quiz/:page/:limit", getAllQuiz);
router.get("/quiz-by-id/:id", getQuizById);

module.exports = router;
