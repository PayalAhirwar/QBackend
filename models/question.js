const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      text: String,
      isCorrect: Boolean,
    }
  ],

   correctOption: {
     type: Number,
     required: true,
   },

   marks: {
    type: Number,
    required: true,
   }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;