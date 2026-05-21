const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        enum: ['sick', 'personal', 'professional', 'maternity', 'vacation'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: String
    },
    alternateArrangements: {
        type: String
    },
    documents: [{
        filename: String,
        originalName: String,
        path: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'cancelled'],
        default: 'pending'
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approvedAt: {
        type: Date
    },
    approvalComments: {
        type: String
    },
    // AI Analysis Results
    aiAnalysis: {
        affectedLectures: [{
            day: String,
            date: Date,
            time: String,
            subject: String,
            class: String,
            room: String
        }],
        substituteSuggestions: [{
            teacherId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Teacher'
            },
            teacherName: String,
            subjects: [String],
            rating: Number,
            workload: Number,
            availability: Number,
            confidenceScore: Number,
            affectedLectures: [{
                day: String,
                time: String,
                subject: String,
                class: String
            }],
            recommendedAction: String
        }],
        analysisSummary: {
            totalAffectedLectures: Number,
            availableSubstitutes: Number,
            highConfidenceMatches: Number,
            analysisTimestamp: Date
        }
    },
    // Substitute assignments
    substituteAssignments: [{
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        },
        teacherName: String,
        lectures: [{
            day: String,
            date: Date,
            time: String,
            subject: String,
            class: String,
            room: String
        }],
        assignedAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'confirmed', 'completed'],
            default: 'pending'
        }
    }],
    // Substitute responses
    substituteResponses: [{
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        },
        response: {
            type: String,
            enum: ['accepted', 'declined']
        },
        message: String,
        respondedAt: {
            type: Date,
            default: Date.now
        }
    }],
    // Notifications sent
    notificationsSent: {
        admin: {
            type: Boolean,
            default: false
        },
        hod: {
            type: Boolean,
            default: false
        },
        substitutes: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
});

// Indexes for better query performance
leaveSchema.index({ teacherId: 1, status: 1 });
leaveSchema.index({ startDate: 1, endDate: 1 });
leaveSchema.index({ status: 1, priority: 1 });
leaveSchema.index({ submittedAt: -1 });

// Virtual for duration in days
leaveSchema.virtual('duration').get(function() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
});

// Pre-save middleware to validate dates
leaveSchema.pre('save', function(next) {
    if (this.startDate && this.endDate) {
        if (new Date(this.startDate) > new Date(this.endDate)) {
            return next(new Error('End date must be after start date'));
        }
    }
    next();
});

module.exports = mongoose.model('Leave', leaveSchema);
