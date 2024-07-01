const newQuiz = require('../models/quizMain');

const renderQuizMainPage = (req, res) => {
  res.render('adminQuizPage', { errorMessage: null });
};
const createNewQuiz = async (req, res) => {
  try {
    const { title, timeLimit, score, numQuestions, quizType, subject } = req.body;
    console.log('Request Body:', req.body);
    const quiz = new newQuiz({ title, timeLimit, score, numQuestions, quizType, subject });
    await quiz.save();
    res.redirect(`/auth/subjectWiseQuiz/${subject}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const fetchQuizzes = async (req, res) => {
  try {
    const subject = req.params.subject;

    const quizzes = await newQuiz.find({ subject });

    console.log('Fetched quizzes:', quizzes);

    res.render('adminQuizPage', { quizzes, errorMessage: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching quizzes');
  }
};


const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const subject = req.params.subject;
    console.log(subject);

    await newQuiz.findByIdAndDelete(quizId);

    res.redirect(`/auth/subjectWiseQuiz/${subject}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting the quiz');
  }
};


const fetchQuizSubjectWise = async (req, res) => {
  const subject = req.params.subject;
  try {
    const quizzes = await newQuiz.find({ subject });

    res.render('subjectWiseQuiz', { quizzes, subject });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  renderQuizMainPage,
  createNewQuiz,
  fetchQuizzes,
  fetchQuizSubjectWise,
  deleteQuiz
};
