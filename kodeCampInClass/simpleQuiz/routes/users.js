const express = require("express");
const {
  quizById,
  answerQuestion,
  markQuiz,
} = require("../controller/userController");
const verifyAuth = require("../middleware/verifyAuth");
const rolesAllowed = require("../middleware/roleBasedAuth");

const router = express.Router();

router.use(verifyAuth);
router.use(rolesAllowed(["users"]));

router.get("/quiz/:quizNumber", quizById);
router.post("/answer-a-question", answerQuestion);
router.post("/mark-quiz", markQuiz);

module.exports = router;
