const Question = require('../models/question');
const newQuiz = require('../models/quizMain');

const viewQuestionsForQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await newQuiz.findById(quizId).populate('questions');

    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }

    const questions = quiz.questions || [];
    res.render('quizQuestions', { quiz, questions });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching quiz questions');
  }
};

const saveQuestion = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const { questionText, options, correctOption, marks } = req.body;

    const optionObjects = Object.keys(options).map((key) => ({
      text: options[key].text,
      isCorrect: options[key].isCorrect === 'on', 
    }));

    const question = new Question({
      questionText,
      options: optionObjects,
      correctOption,
      quiz: quizId,
      marks,
    });

    await question.save();

    const quiz = await newQuiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }

    quiz.questions.push(question._id);
    await quiz.save();

    res.redirect(`/auth/quizQuestions/${quizId}?newQuestion=${question._id}`);
  } catch (error) {
    console.error('Quiz creation error:', error);
    res.status(500).send('Quiz creation failed: ' + error.message);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const questionId = req.params.questionId;

    // Remove the question from the database
    await Question.findByIdAndDelete(questionId);

    // Fetch the remaining questions for the quiz
    const quiz = await newQuiz.findById(quizId).populate('questions');

    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }

    const questions = quiz.questions || [];
    res.render('quizQuestions', { quiz, questions });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting the question');
  }
};



const editQuestion = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const { questionText, options, correctOption, marks } = req.body;
    const questionId = req.params.questionId;

    // Find the question by its ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).send('Question not found');
    }

    // Perform the necessary updates
    question.questionText = questionText;
    question.options = options; 
    question.marks = marks;

    await question.save();

    res.send('Question edited successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error editing the question');
  }
};

module.exports = {
  saveQuestion,
  viewQuestionsForQuiz,
  deleteQuestion,
  editQuestion
};