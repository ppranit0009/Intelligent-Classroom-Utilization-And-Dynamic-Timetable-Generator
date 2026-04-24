const express = require('express');
const { getClasses, joinClass, getEnrolledClasses, createClass } = require('../controllers/classController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getClasses);
router.post('/join', protect, joinClass);
router.get('/enrolled', protect, getEnrolledClasses);
router.post('/', protect, authorize('teacher', 'classTeacher', 'admin'), createClass);

module.exports = router;
