const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, role, id } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { id }] });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with this email or ID'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
      id
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.id,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.id,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.id,
        profile: user.profile,
        enrolledClasses: user.enrolledClasses
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};
