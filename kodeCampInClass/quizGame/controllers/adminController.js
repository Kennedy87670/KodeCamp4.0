const quizModel = require("../models/quizModel")


exports.postQuiz = async function (req, res, next) {
    const {
      question,
      questionNumber,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
    } = req.body;
  
    await quizModel.create({
      question,
      questionNumber,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
    });
  
    res.status(201).send({
      message: "Quiz created",
    });
  }

  exports.getQuizPaginate = async function (req, res, next) {
    const { page, limit } = req.params;
  
    const quizList = await quizModel.paginate({}, { page, limit });
  
    res.status(201).send({
      quizList,
    });
  }


  exports.getQuizById = async function (req, res, next) {
    const { id } = req.params;
  
    const quiz = await quizModel.findById(id);
  
    res.status(201).send({
      quiz,
    });
  }

  exports.updateQuizById = async function (req, res, next) {
    try {
      const { id } = req.params;
  
      const {
        question,
        questionNumber,
        optionA,
        optionB,
        optionC,
        optionD,
        correctOption,
      } = req.body;
  
      const updatedQuiz = await quizModel.findByIdAndUpdate(
        id,
        {
          question,
          questionNumber,
          optionA,
          optionB,
          optionC,
          optionD,
          correctOption,
        },
        { new: true }
      );
  
      res.send({
        message: "Edit successful",
        updatedQuiz,
      });
    } catch (error) {
      next(error);
    }
  }