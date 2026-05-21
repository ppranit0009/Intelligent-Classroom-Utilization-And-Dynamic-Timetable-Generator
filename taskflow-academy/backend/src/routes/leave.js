const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/leave-documents/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image, PDF, and document files are allowed'));
        }
    }
});

// Public routes (if any)
// None - all leave management routes require authentication

// Protected routes
router.use(protect);

// Teacher routes
router.post('/request', 
    upload.array('documents', 5), 
    leaveController.submitLeaveRequest
);

router.get('/teacher/:teacherId', 
    authorize('teacher', 'admin', 'hod'),
    leaveController.getTeacherLeaveRequests
);

router.get('/notifications/:teacherId',
    authorize('teacher'),
    leaveController.getSubstituteNotifications
);

router.post('/respond/:notificationId',
    authorize('teacher'),
    leaveController.respondToSubstituteRequest
);

// Admin/HOD routes
router.get('/all',
    authorize('admin', 'hod'),
    leaveController.getAllLeaveRequests
);

router.put('/:leaveId/status',
    authorize('admin', 'hod'),
    leaveController.updateLeaveStatus
);

// AI Analysis route
router.post('/analyze-substitutes',
    authorize('admin', 'hod'),
    leaveController.analyzeSubstitutes
);

// Error handling middleware for multer
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 5MB.'
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                message: 'Too many files. Maximum 5 files allowed.'
            });
        }
    }
    
    if (error.message.includes('Only image, PDF, and document files are allowed')) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    
    next(error);
});

module.exports = router;
