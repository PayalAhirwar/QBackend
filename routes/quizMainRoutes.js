const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const userQuizController = require('../controllers/userQuizController');
const questionController = require('../controllers/questionController');

//const userQuestionController = require('../controllers/userQuizController');

// Fetch quizzes and render the quizMain page
router.get('/adminQuizPage', quizController.fetchQuizzes);

// POST request to create a new quiz
router.post('/adminQuizPage', quizController.createNewQuiz);

router.post('/subjectWiseQuiz/:subject', quizController.createNewQuiz);
// Display questions for a specific quiz
//router.get('/quizMain/:quizId', quizMainController.viewQuestions);
router.get('/adminQuizPage/:quizId/:subject', questionController.viewQuestionsForQuiz);
// Display questions for a specific quiz

router.get('/quizQuestions/:quizId', questionController.viewQuestionsForQuiz);
//router.get('/quizQuestions/:quizId',questionController.saveQuestion)
router.post('/quizQuestions/:quizId',questionController.saveQuestion)

router.delete('/adminQuizPage/:quizId', quizController.deleteQuiz);

router.delete('/subjectWiseQuiz/:subject/:quizId', quizController.deleteQuiz);

router.delete('/quizQuestions/:quizId/:questionId', questionController.deleteQuestion);

router.get('/userQuizPage',userQuizController.fetchUserQuizzes )

router.get('/userQuizPage/:quizId', userQuizController.userViewQuestionsForQuiz);

router.post('/userQuestion',userQuizController.calculateScore)

router.get('/subjectWiseQuiz/:subject', quizController.fetchQuizSubjectWise)

router.get('/subWiseQuizUser/:subject', userQuizController.fetchUserQuizzes)

// router.get('/trueFalseQ/:quizId', questionController.viewQuestionsForQuiz)

// router.post('/trueFalseQ/:quizId',questionController.saveTFQuestion)

//router.put('/quizQuestions/:quizId/:questionId', quizController.editQuestion);



module.exports = router;
