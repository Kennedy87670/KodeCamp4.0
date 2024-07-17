const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    questionNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    optionA: {
      type: String,
      required: true,
    },
    optionB: {
      type: String,
      required: true,
    },
    optionC: {
      type: String,
      required: true,
    },
    optionD: {
      type: String,
      required: true,
    },
    correctOption: {
      type: String,
      enum: ["optionA", "optionB", "optionC", "optionD"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
