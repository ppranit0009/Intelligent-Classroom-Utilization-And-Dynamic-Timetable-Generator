const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Assignment title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: [true, 'Class is required']
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Teacher is required']
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  maxMarks: {
    type: Number,
    required: [true, 'Maximum marks is required'],
    min: 1
  },
  submissionType: {
    type: String,
    enum: ['file', 'text', 'link', 'mixed'],
    default: 'file'
  },
  attachments: [{
    filename: String,
    url: String,
    size: Number
  }],
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    fileUrl: String,
    textContent: String,
    linkUrl: String,
    marks: {
      type: Number,
      min: 0
    },
    feedback: String,
    status: {
      type: String,
      enum: ['submitted', 'graded', 'late'],
      default: 'submitted'
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'closed'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual to check if assignment is overdue
assignmentSchema.virtual('isOverdue').get(function() {
  return new Date() > this.dueDate;
});

// Virtual to get submission count
assignmentSchema.virtual('submissionCount').get(function() {
  return this.submissions.length;
});

module.exports = mongoose.model('Assignment', assignmentSchema);
