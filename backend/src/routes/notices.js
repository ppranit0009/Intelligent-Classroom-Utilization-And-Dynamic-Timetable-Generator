const express = require('express');
const router = express.Router();
const {
  getNotices,
  getPinnedNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
  togglePinNotice,
  addComment,
  searchNotices,
  getNoticeStats
} = require('../controllers/noticeController');
const { protect, authorize } = require('../middleware/auth');

// Public routes (for getting notices)
router.get('/', getNotices);
router.get('/pinned', getPinnedNotices);
router.get('/search', searchNotices);
router.get('/stats', protect, authorize('admin'), getNoticeStats);
router.get('/:id', getNoticeById);

// Protected routes (require authentication)
router.post('/', protect, authorize('admin', 'teacher', 'classTeacher'), createNotice);
router.put('/:id', protect, updateNotice);
router.delete('/:id', protect, deleteNotice);
router.patch('/:id/pin', protect, togglePinNotice);
router.post('/:id/comments', protect, addComment);

module.exports = router;
