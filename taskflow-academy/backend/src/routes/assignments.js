const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Placeholder for assignment routes
router.get('/', protect, (req, res) => {
  res.json({ message: 'Assignments endpoint' });
});

module.exports = router;
