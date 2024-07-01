const User = require('../models/user');
const bcrypt = require('bcryptjs');

const renderRegistrationPage = (req, res) => {
  res.render('register', { errorMessage: null });
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ $or: [{ username: username.trim() }, { email: email.trim() }] });
    if (existingUser) {
      return res.render('register', { errorMessage: 'Username or email is already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, confirmPassword: hashedPassword });
    await user.save();
    console.log('User saved successfully');
    res.redirect('/auth/userLogin');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).render('register', { errorMessage: 'Registration failed: ' + error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('userLogin', { errorMessage: 'User not found'});
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.render('userLogin', { errorMessage: 'Incorrect password' });
    }
    res.redirect('/layoutUser');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).render('userLogin', { errorMessage: 'Login failed: ' + error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, SecurityCode } = req.body;
    const validAdminUsernames = ['saloni', 'payal', 'manisha'];
    const Code = '123'
    if (!validAdminUsernames.includes(username)) {
      return res.render('adminLogin', { errorMessage: 'Invalid admin' });
    }
    if (SecurityCode != Code) {
      return res.render('adminLogin', { errorMessage: 'Incorrect password' });
    }
    res.redirect('/layoutAdmin')
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).render('adminLogin', { errorMessage: 'Login failed: ' + error.message });
  }
};

module.exports = { renderRegistrationPage, registerUser, loginUser, loginAdmin }
