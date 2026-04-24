const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Placeholder for user routes
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'User profile endpoint' });
});

module.exports = router;
