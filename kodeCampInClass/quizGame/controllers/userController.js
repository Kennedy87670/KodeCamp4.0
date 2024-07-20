const activeQuizModel = require("../models/activeQuizModel")
const quizModel = require("../models/quizModel")
const quizHistoryModel = require("../models/quizHistoryModel")




exports.getQuestion = async function (req, res, next) {

    const { questionNumber } = req.params;
  
    const quiz = await quizModel.findOne({ questionNumber }, "-correctOption -createdAt -updatedAt");
  
    res.json({
      quiz
    });
  
  }

exports.answerQuestion = async function (req, res, next) {

    const { quiz, optionChosen } = req.body;
  
    const questionAlreadyAnswered = await activeQuizModel.exists({ user: req.userDetails.userId, quiz });
  
    if (questionAlreadyAnswered) {
      res.status(400).send({
        message: "This quetion has already been answered by you..."
      });
      return;
    }
  
    await activeQuizModel.create({
      quiz, optionChosen, user: req.userDetails.userId
    });
  
    res.send({
      message: "Answer recorded"
    });
  }


  exports.unAnsweredQuestion =  async function (req, res, next) {
    try {
  
      const answeredQuiz = await activeQuizModel.find({ user: req.userDetails.userId }).populate("quiz", "questionNumber");
      const answeredNumber = answeredQuiz.map(q => q.quiz.questionNumber);
      const totalQuestions = await quizModel.countDocuments({});
  
      const unansweredQuestions = [];
  
      for (let i = 1; i <= totalQuestions; i++) {
        if(answeredNumber.includes(i)) {
          unansweredQuestions.push({
            questionNumber: i,
            state: "answered"
          });
        } else {
          unansweredQuestions.push({
            questionNumber: i,
            state: "unanswered"
          });
        }
      }
  
      res.send({
        unansweredQuestions
      });
  
    } catch (error) {
      next(error);
    }
  }
  
  exports.markQuiz = async function (req, res, next) {

    const activeQuiz = await activeQuizModel.find({ user: req.userDetails.userId }).populate("quiz", "-questionNumber");
  
    let totalMarks = 0;
    let totalAnsweredQuetions = activeQuiz.length;
    let totalCorrectQuestions = 0;
    let totalIncorrectQuestions = 0;
  
    for (let question of activeQuiz) {
      if (question.quiz.correctOption == question.optionChosen) {
        totalMarks += 10;
        totalCorrectQuestions += 1;
      } else {
        totalIncorrectQuestions += 1;
      }
    }
  
    await quizHistoryModel.create({
      score: totalMarks,
      totalCorrectQuestions,
      totalIncorrectQuestions,
      questions: activeQuiz,
      user: req.userDetails.userId
    });
  
    await activeQuizModel.deleteMany({ user: req.userDetails.userId })
  
    res.send({
      totalMarks,
      totalAnsweredQuetions,
      totalCorrectQuestions,
      totalIncorrectQuestions
    });
  }

exports.quizHistory = async function (req, res, next) {
    try {
  
      const result = await quizHistoryModel.paginate({ user: req.userDetails.userId });
  
      res.send({
        result
      });
  
    } catch (error) {
      next(error);
    }
  }

exports.quizHistoryById = async function (req, res, next) {
    try {
  
      const { id } = req.params;
  
      const result = await quizHistoryModel.findById(id);
  
      res.send({
        result
      });
  
    } catch (error) {
      next(error);
    }
  }




// find will return an array

// findOne will get the first occurance

// findById will return the first occurance by Id

// findIdAndUpdate find by id and update

// findOneAndUpdate will get the first occurance update 

// updateMany will update all the occurance

// deleteMany will delete all occurance

// countDocuments will count the countDocuments

// findByIdAndDelete will find by ID and delete

// findOneAndDelete WILL find one and delete

// distinct will get the set of a value
