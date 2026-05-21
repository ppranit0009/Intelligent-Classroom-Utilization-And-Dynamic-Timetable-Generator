const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        required: true
    },
    time: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    academicYear: {
        type: String,
        required: true
    },
    isRegular: {
        type: Boolean,
        default: true
    },
    isSubstitute: {
        type: Boolean,
        default: false
    },
    originalTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    substituteTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    status: {
        type: String,
        enum: ['scheduled', 'cancelled', 'completed', 'substituted'],
        default: 'scheduled'
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Indexes for better query performance
timetableSchema.index({ teacher: 1, day: 1 });
timetableSchema.index({ date: 1, time: 1 });
timetableSchema.index({ subject: 1, class: 1 });
timetableSchema.index({ status: 1 });
timetableSchema.index({ isSubstitute: 1, substituteTeacher: 1 });

// Compound index for teacher availability
timetableSchema.index({ teacher: 1, date: 1, startTime: 1, endTime: 1 });

// Pre-save middleware to validate time format
timetableSchema.pre('save', function(next) {
    if (this.startTime && this.endTime) {
        const start = new Date(`2000-01-01T${this.startTime}`);
        const end = new Date(`2000-01-01T${this.endTime}`);
        
        if (start >= end) {
            return next(new Error('End time must be after start time'));
        }
    }
    next();
});

// Static method to find teacher's schedule for a date range
timetableSchema.statics.findTeacherSchedule = async function(teacherId, startDate, endDate) {
    return this.find({
        teacher: teacherId,
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        },
        status: { $ne: 'cancelled' }
    }).sort({ date: 1, startTime: 1 });
};

// Static method to find available teachers for a specific time slot
timetableSchema.statics.findAvailableTeachers = async function(day, time, subject) {
    const [startTime, endTime] = time.split('-');
    
    return this.aggregate([
        {
            $match: {
                day: day,
                time: time,
                status: { $ne: 'cancelled' }
            }
        },
        {
            $lookup: {
                from: 'teachers',
                localField: 'teacher',
                foreignField: '_id',
                as: 'teacherInfo'
            }
        },
        {
            $unwind: '$teacherInfo'
        },
        {
            $match: {
                'teacherInfo.subjects': subject,
                'teacherInfo.isAvailable': true
            }
        },
        {
            $group: {
                _id: '$teacher',
                teacher: { $first: '$teacherInfo' },
                totalLectures: { $sum: 1 },
                subjects: { $addToSet: '$subject' }
            }
        }
    ]);
};

// Virtual for lecture duration
timetableSchema.virtual('duration').get(function() {
    const start = new Date(`2000-01-01T${this.startTime}`);
    const end = new Date(`2000-01-01T${this.endTime}`);
    const diffMs = end - start;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return diffMins;
});

module.exports = mongoose.model('Timetable', timetableSchema);
