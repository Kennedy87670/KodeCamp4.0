const quizModel = require("../models/quizModel");

exports.createQuiz = async (req, res, next) => {
  const {
    questionNumber,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctOption,
  } = req.body;

  const questions = await quizModel.create({
    questionNumber,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctOption,
  });

  res.status(201).json({
    status: " QuizCreated successfully",
    message: "Successfull",
  });
};
exports.getAllQuiz = async (req, res, next) => {
  const { page, limit } = req.params;
  const quizes = await quizModel.paginate({}, { page, limit });

  res.status(201).json({
    status: " successfully",
    message: quizes,
  });
};

exports.getQuizById = async (req, res, next) => {
  const { id } = req.params;
  const quiz = await quizModel.findById(id);

  res.status(201).json({
    status: " successfully",
    message: quiz,
  });
};
