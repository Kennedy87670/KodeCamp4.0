const activeQuizModel = require("../models/activeQuizModel");
const quizHistoryModel = require("../models/quizHistoryModel");
const quizModel = require("../models/quizModel");

exports.quizById = async (req, res) => {
  const { questionNumber } = req.params;
  const quiz = await quizModel.findOne({ questionNumber });

  res.status(201).json({
    status: " successfully",
    message: quiz,
  });
};
exports.answerQuestion = async (req, res) => {
  const { quiz, optionChoosen } = req.body;
  const record = activeQuizModel.create({
    quiz,
    optionChoosen,
    user: req.userDetails.userId,
  });

  res.status(201).json({
    status: " successfully Recorded",
  });
};

exports.markQuiz = async (req, res) => {
  const activeQuiz = await activeQuizModel.find(
    { user: req.userDetails.userId }.populate("quiz", "-questionNumber")
  );

  let totalMarks = 0;
  let totalAnsweredQuestion = activeQuiz.length;
  let totalCorrectQuestion = 0;
  let totalIncorrectQuestions = 0;

  for (let question of activeQuiz) {
    if (question.quiz.correctOption == question.optionChoosen) {
      totalMarks += 10;
      totalCorrectQuestion += 1;
    } else {
      totalIncorrectQuestions += 1;
    }
  }

  await quizHistoryModel.create({
    score: totalMarks,
    totalCorrectQuestion,
    totalIncorrectQuestions,
    questions: activeQuiz,
    user: req.userDetails.userId,
  });

  await activeQuizModel.deleteMany({ user: req.userDetails.userId });

  await res.status(201).json({
    status: " Result",
    totalMarks,
    totalAnsweredQuestion,
    totalCorrectQuestion,
    totalIncorrectQuestions,
  });
};
