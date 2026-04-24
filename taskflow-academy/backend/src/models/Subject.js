const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Subject code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Commerce', 'Management', 'Engineering', 'Arts']
  },
  credits: {
    type: Number,
    required: [true, 'Credits are required'],
    min: 1,
    max: 10
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required'],
    min: 1,
    max: 8
  },
  type: {
    type: String,
    enum: ['core', 'elective', 'lab', 'theory'],
    default: 'core'
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  weeklyHours: {
    lecture: {
      type: Number,
      default: 2,
      min: 0,
      max: 10
    },
    lab: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    },
    tutorial: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    }
  },
  maxStudents: {
    type: Number,
    default: 60,
    min: 1,
    max: 200
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active'
  },
  offeredSemesters: [{
    type: String,
    enum: ['Fall', 'Spring', 'Summer', 'Winter']
  }]
}, {
  timestamps: true
});

// Virtual for total weekly hours
subjectSchema.virtual('totalWeeklyHours').get(function() {
  return this.weeklyHours.lecture + this.weeklyHours.lab + this.weeklyHours.tutorial;
});

// Index for efficient queries
subjectSchema.index({ code: 1 });
subjectSchema.index({ department: 1, semester: 1 });
subjectSchema.index({ status: 1 });

module.exports = mongoose.model('Subject', subjectSchema);
