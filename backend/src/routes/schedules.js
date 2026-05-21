const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth.protect);

// CRUD operations
router.post('/', scheduleController.createSchedule);
router.get('/', scheduleController.getSchedules);
router.get('/grid', scheduleController.getTimetableGrid);
router.get('/:id', scheduleController.getScheduleById);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

// Advanced scheduling features
router.post('/auto-generate', scheduleController.generateAutoSchedule);
router.post('/detect-conflicts', scheduleController.detectConflicts);

module.exports = router;
