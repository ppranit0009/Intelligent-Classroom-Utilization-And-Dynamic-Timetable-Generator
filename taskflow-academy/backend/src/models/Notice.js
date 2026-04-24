const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 5000
  },
  category: {
    type: String,
    required: true,
    enum: ['academic', 'events', 'examinations', 'holidays', 'sports', 'placements', 'library', 'maintenance', 'general'],
    default: 'general'
  },
  priority: {
    type: String,
    required: true,
    enum: ['urgent', 'high', 'medium', 'low'],
    default: 'medium'
  },
  audience: {
    type: String,
    required: true,
    enum: ['all', 'students', 'teachers', 'classTeachers', 'admin', 'faculty', 'specific'],
    default: 'all'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  authorRole: {
    type: String,
    required: true,
    enum: ['admin', 'teacher', 'classTeacher']
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    default: null
  },
  attachments: [{
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: null
    }
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isPinned: {
    type: Boolean,
    default: false
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'draft'],
    default: 'active'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  comments: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  targetClasses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }],
  targetDepartments: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Virtual for checking if notice is expired
noticeSchema.virtual('isExpired').get(function() {
  if (!this.expiryDate) return false;
  return new Date() > this.expiryDate;
});

// Virtual for formatted posted date
noticeSchema.virtual('formattedPostedDate').get(function() {
  return this.postedDate.toLocaleDateString();
});

// Virtual for formatted expiry date
noticeSchema.virtual('formattedExpiryDate').get(function() {
  if (!this.expiryDate) return null;
  return this.expiryDate.toLocaleDateString();
});

// Method to increment view count
noticeSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

// Method to add comment
noticeSchema.methods.addComment = function(authorId, authorName, content) {
  this.comments.push({
    author: authorId,
    authorName: authorName,
    content: content,
    date: new Date()
  });
  return this.save();
};

// Static method to find active notices
noticeSchema.statics.findActive = function(audience = null) {
  const query = { status: 'active' };
  
  if (audience && audience !== 'all') {
    query.audience = { $in: [audience, 'all'] };
  }
  
  // Filter out expired notices
  query.$or = [
    { expiryDate: null },
    { expiryDate: { $gt: new Date() } }
  ];
  
  return this.find(query).sort({ isPinned: -1, priority: 1, postedDate: -1 });
};

// Static method to find pinned notices
noticeSchema.statics.findPinned = function(audience = null) {
  const query = { 
    isPinned: true, 
    status: 'active' 
  };
  
  if (audience && audience !== 'all') {
    query.audience = { $in: [audience, 'all'] };
  }
  
  // Filter out expired notices
  query.$or = [
    { expiryDate: null },
    { expiryDate: { $gt: new Date() } }
  ];
  
  return this.find(query).sort({ priority: 1, postedDate: -1 });
};

// Static method to search notices
noticeSchema.statics.searchNotices = function(searchTerm, audience = null) {
  const query = {
    status: 'active',
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { content: { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ]
  };
  
  if (audience && audience !== 'all') {
    query.audience = { $in: [audience, 'all'] };
  }
  
  // Filter out expired notices
  query.$and = query.$and || [];
  query.$and.push({
    $or: [
      { expiryDate: null },
      { expiryDate: { $gt: new Date() } }
    ]
  });
  
  return this.find(query).sort({ isPinned: -1, priority: 1, postedDate: -1 });
};

// Indexes for better performance
noticeSchema.index({ audience: 1, status: 1, postedDate: -1 });
noticeSchema.index({ category: 1, priority: 1 });
noticeSchema.index({ isPinned: 1, postedDate: -1 });
noticeSchema.index({ author: 1, postedDate: -1 });
noticeSchema.index({ expiryDate: 1 });
noticeSchema.index({ tags: 1 });

module.exports = mongoose.model('Notice', noticeSchema);
