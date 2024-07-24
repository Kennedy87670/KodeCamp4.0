const express = require("express");
const rolesAllowed = require("../middleware/roleBasedAuth");
const verifyAuth = require("../middleware/verifyAuth");
const { getQuestion, unAnsweredQuestion, answerQuestion, quizHistory, markQuiz, quizHistoryById } = require("../controllers/userController");

var router = express.Router();


router.use(verifyAuth);

router.use(rolesAllowed(["user","admin"]));

router.get('/quiz/:questionNumber', getQuestion);

router.post("/answer-a-question", answerQuestion );


router.get("/unanswered-question-numbers", unAnsweredQuestion);

router.post("/mark-quiz", markQuiz );

router.get("/quiz-history", quizHistory );

router.get("/quiz-history/:id", quizHistoryById);




module.exports = router;