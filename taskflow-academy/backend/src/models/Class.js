const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Class name is required'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Class code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  grade: {
    type: String,
    required: [true, 'Grade is required'],
    enum: ['F.Y.BCA', 'S.Y.BCA', 'T.Y.BCA', 'F.Y.B.Com', 'B.Sc.IT', 'F.Y.B.Sc', 'S.Y.B.Sc', 'T.Y.B.Sc']
  },
  section: {
    type: String,
    required: [true, 'Section is required'],
    enum: ['A', 'B', 'C', 'D']
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Teacher is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  roomNumber: {
    type: String,
    required: [true, 'Room number is required']
  },
  schedule: {
    type: String,
    required: [true, 'Schedule is required']
  },
  currentStudents: {
    type: Number,
    default: 0,
    min: 0
  },
  maxStudents: {
    type: Number,
    required: [true, 'Maximum students is required'],
    min: 1
  },
  subjects: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active'
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual to check if class is full
classSchema.virtual('isFull').get(function() {
  return this.currentStudents >= this.maxStudents;
});

// Virtual to get available spots
classSchema.virtual('availableSpots').get(function() {
  return this.maxStudents - this.currentStudents;
});

module.exports = mongoose.model('Class', classSchema);
