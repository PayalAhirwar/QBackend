const newQuiz = require('../models/quizMain');
const Question = require('../models/mcqQuestion');

const fetchUserQuizzes = async (req, res) => {
  try {
    const subject = req.params.subject; 

    const quizzes = await newQuiz.find({ subject });

    console.log('Fetched quizzes:', quizzes);

    res.render('userQuizPage', { quizzes, errorMessage: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching quizzes');
  }
};


const userViewQuestionsForQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await newQuiz.findById(quizId).populate('questions');

    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }

    const questions = quiz.questions || [];
    res.render('userQuestion', { quiz, questions });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching quiz questions');
  }
};

const calculateScore = async (req, res) => {
    const { quizId, answers } = req.body;

    try {
        const quiz = await newQuiz.findById(quizId).populate('questions').exec();
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const questions = quiz.questions;
        let score = 0;

        answers.forEach(answer => {
            const question = questions.find(q => q._id.toString() === answer.questionId);
            if (question) {
                const correctOptionIndex = question.correctOption - 1;
                if (answer.selectedOption === correctOptionIndex) {
                    score += question.marks;
                }
            }
        });

        res.json({ questions, answers, score });
    } catch (error) {
        console.error('Error processing quiz submission:', error);
        res.status(500).json({ message: 'Server error' });
}
}

module.exports = {
  fetchUserQuizzes,
  userViewQuestionsForQuiz,
  calculateScore
};
