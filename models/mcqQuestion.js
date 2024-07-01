// const mongoose = require('mongoose');
// const commonQuestionSchema = require('./CommonQuestion');

// const mcqQuestionSchema = commonQuestionSchema.discriminator('MCQQuestion', new mongoose.Schema({
//   options: [
//     {
//       text: String,
//       isCorrect: Boolean,
//     },
//   ],
//   correctOption: {
//     type: Number,
//     required: true,
//   },
// }));

// module.exports = mongoose.model('MCQQuestion', mcqQuestionSchema);
