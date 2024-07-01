const mongoose = require('mongoose');
const Question = require('./question'); 

const newQuizSchema = new mongoose.Schema({
  subject: {
    type:String,
    required: true,
  },
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
    hours: {
      type: Number,
      required: true,
      default: 0,
  },
    minutes: {
      type: Number,
      required: true,
      default: 0,
    },
    seconds: {
      type: Number,
      required: true,
      default: 0,
    },
},
  quizType: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'other_question_type'],
    required: true,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question', 
  }],
});

newQuizSchema.virtual('timeLimitInSeconds').get(function () {
  const hoursInSeconds = this.timeLimit.hours * 3600;
  const minutesInSeconds = this.timeLimit.minutes * 60;
  const seconds = this.timeLimit.seconds;

  return hoursInSeconds + minutesInSeconds + seconds;
});

const newQuiz = mongoose.model('newQuiz', newQuizSchema);

module.exports = newQuiz;