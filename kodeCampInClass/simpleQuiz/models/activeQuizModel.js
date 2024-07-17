const mongoose = require("mongoose");

const activeQuizSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Types.ObjectId,
      ref: "quizModel",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "userModel",
      required: true,
    },

    optionChoosen: {
      type: String,
      enum: ["optionA", "optionB", "optionC", "optionD  "],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("activeQuiz", activeQuizSchema);
