const mongoose = require("mongoose");

const activeQuizSchema = new mongoose.Schema(
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
    user: {
      type: mongoose.Types.ObjectId,
      ref: "userModel",
      required: true,
    },

    questions: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("activeQuiz", activeQuizSchema);
