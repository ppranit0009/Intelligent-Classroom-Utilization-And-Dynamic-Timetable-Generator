const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    recipientRole: {
        type: String,
        enum: ['admin', 'hod', 'teacher']
    },
    type: {
        type: String,
        enum: [
            'substitute_request',
            'substitute_assigned',
            'substitute_response',
            'leave_request',
            'leave_approved',
            'leave_rejected',
            'lecture_cancellation',
            'timetable_update',
            'ai_analysis',
            'urgent'
        ],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['pending', 'read', 'accepted', 'declined', 'confirmed', 'completed'],
        default: 'pending'
    },
    read: {
        type: Boolean,
        default: false
    },
    readAt: {
        type: Date
    },
    // Related leave request
    leaveRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leave'
    },
    // For substitute notifications
    affectedLectures: [{
        day: String,
        date: Date,
        time: String,
        subject: String,
        class: String,
        room: String
    }],
    confidenceScore: {
        type: Number
    },
    // Response handling
    responseMessage: {
        type: String
    },
    respondedAt: {
        type: Date
    },
    respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    // Additional metadata
    metadata: {
        type: mongoose.Schema.Types.Mixed
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Indexes for better query performance
notificationSchema.index({ recipientId: 1, status: 1 });
notificationSchema.index({ recipientId: 1, read: 1 });
notificationSchema.index({ type: 1, status: 1 });
notificationSchema.index({ priority: 1, createdAt: -1 });
notificationSchema.index({ leaveRequestId: 1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Pre-save middleware to set expiration for certain notification types
notificationSchema.pre('save', function(next) {
    if (!this.expiresAt) {
        // Set expiration for urgent notifications after 7 days
        if (this.priority === 'high' && this.type === 'substitute_request') {
            this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        }
        // Set expiration for regular notifications after 30 days
        else {
            this.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        }
    }
    next();
});

// Virtual for time ago
notificationSchema.virtual('timeAgo').get(function() {
    const now = new Date();
    const diff = now - this.createdAt;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
});

module.exports = mongoose.model('Notification', notificationSchema);
