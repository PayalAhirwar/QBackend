// models/quizMain.js
const mongoose = require('mongoose');
const trueFalseQuestion = require('./tfQuestion'); // Import the question model

const newTFQuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  numQuestions: {
    type: Number,
    required: true,
  },
  timeLimit: {
      type: String,
      required: true,
  },
  quizType: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'other_question_type'],
    required: true,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trueFalseQuestion', // Reference to the Question model
  }],
  // Define any other fields you need for your schema
});

const newTFQuiz = mongoose.model('newTFQuiz', newTFQuizSchema);

module.exports = newTFQuiz;