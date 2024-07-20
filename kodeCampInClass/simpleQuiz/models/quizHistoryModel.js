const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const quizHistoryModel

 = new mongoose.Schema(
  {
    score: {
      type: Number,

      required: true,
    },
    totalCorrectQuestion: {
      type: Number,

      required: true,
    },
    totalIncorrectQuestions: {
      type: Number,

      required: true,
    },
   

    questions: {
      type: Array,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

quizHistoryModel.plugin(mongoosePaginate)

module.exports = mongoose.model("activeQuiz", quizHistoryModel 
);
