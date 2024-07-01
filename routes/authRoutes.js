const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET request for the login page
router.get('/userLogin', (req, res) => {
  res.render('userLogin', { errorMessage: null });
});

// GET request for the login page
router.get('/adminLogin', (req, res) => {
  res.render('adminLogin', { errorMessage: null });
});

// GET request for the registration page
router.get('/register', (req, res) => {
    res.render('register', { errorMessage: null });
  });

// POST request for user login
router.post('/userLogin', authController.loginUser);

router.post('/adminLogin', authController.loginAdmin);

// POST request for user registration
router.post('/register', authController.registerUser);

module.exports = router;
