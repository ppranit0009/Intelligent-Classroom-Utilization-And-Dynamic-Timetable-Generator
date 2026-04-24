const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Room name is required'],
    trim: true,
    unique: true
  },
  number: {
    type: String,
    required: [true, 'Room number is required'],
    trim: true,
    unique: true
  },
  building: {
    type: String,
    required: [true, 'Building is required'],
    enum: ['Main Building', 'Science Block', 'Engineering Block', 'Library', 'Sports Complex', 'Admin Block']
  },
  floor: {
    type: Number,
    required: [true, 'Floor is required'],
    min: 0,
    max: 10
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: 1,
    max: 500
  },
  type: {
    type: String,
    required: [true, 'Room type is required'],
    enum: ['classroom', 'lab', 'lecture hall', 'seminar room', 'computer lab', 'conference room']
  },
  equipment: [{
    type: String,
    enum: ['projector', 'whiteboard', 'smart board', 'computer', 'internet', 'air conditioning', 'sound system', 'lab equipment']
  }],
  accessibility: {
    wheelchairAccessible: {
      type: Boolean,
      default: false
    },
    hasRamp: {
      type: Boolean,
      default: false
    },
    hasElevator: {
      type: Boolean,
      default: false
    }
  },
  availability: {
    monday: {
      available: { type: Boolean, default: true },
      blockedTimes: [{ type: String }] // Array of time ranges like "09:00-11:00"
    },
    tuesday: {
      available: { type: Boolean, default: true },
      blockedTimes: [{ type: String }]
    },
    wednesday: {
      available: { type: Boolean, default: true },
      blockedTimes: [{ type: String }]
    },
    thursday: {
      available: { type: Boolean, default: true },
      blockedTimes: [{ type: String }]
    },
    friday: {
      available: { type: Boolean, default: true },
      blockedTimes: [{ type: String }]
    },
    saturday: {
      available: { type: Boolean, default: false },
      blockedTimes: [{ type: String }]
    },
    sunday: {
      available: { type: Boolean, default: false },
      blockedTimes: [{ type: String }]
    }
  },
  status: {
    type: String,
    enum: ['available', 'maintenance', 'renovation', 'closed'],
    default: 'available'
  },
  maintenanceSchedule: [{
    startDate: Date,
    endDate: Date,
    reason: String
  }],
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Virtual for full room identifier
roomSchema.virtual('fullIdentifier').get(function() {
  return `${this.building} - Floor ${this.floor} - Room ${this.number}`;
});

// Virtual for checking if room is available at specific time
roomSchema.methods.isAvailableAt = function(day, startTime, endTime) {
  if (!this.availability[day.toLowerCase()]?.available) {
    return false;
  }
  
  const blockedTimes = this.availability[day.toLowerCase()].blockedTimes;
  for (const blockedTime of blockedTimes) {
    const [blockedStart, blockedEnd] = blockedTime.split('-');
    if (this.timeOverlaps(startTime, endTime, blockedStart, blockedEnd)) {
      return false;
    }
  }
  
  return true;
};

// Helper method to check time overlap
roomSchema.methods.timeOverlaps = function(start1, end1, start2, end2) {
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  const s1 = toMinutes(start1);
  const e1 = toMinutes(end1);
  const s2 = toMinutes(start2);
  const e2 = toMinutes(end2);
  
  return (s1 < e2 && s2 < e1);
};

// Index for efficient queries
roomSchema.index({ building: 1, floor: 1 });
roomSchema.index({ type: 1, capacity: 1 });
roomSchema.index({ status: 1 });

module.exports = mongoose.model('Room', roomSchema);
