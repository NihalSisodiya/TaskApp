const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');
const { body } = require('express-validator');

// Separate validations for register
exports.registerValidations = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Register handler (no validations here)
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ username, email, password, role });
    await user.save();
    const token = generateToken(user._id, user.role);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
};

// Separate validations for login
exports.loginValidations = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').exists().withMessage('Password required'),
];

// Login handler (no validations here)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user._id, user.role);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};