const Notice = require('../models/Notice');
const User = require('../models/User');

// Get all notices for a specific audience
const getNotices = async (req, res) => {
  try {
    const { audience } = req.query;
    const userRole = req.user?.role || 'student';
    
    // Determine audience based on user role if not specified
    let targetAudience = audience;
    if (!targetAudience) {
      switch (userRole) {
        case 'admin':
          targetAudience = 'admin';
          break;
        case 'teacher':
          targetAudience = 'teachers';
          break;
        case 'classTeacher':
          targetAudience = 'classTeachers';
          break;
        case 'student':
          targetAudience = 'students';
          break;
        default:
          targetAudience = 'all';
      }
    }
    
    const notices = await Notice.findActive(targetAudience)
      .populate('author', 'name email')
      .lean();
    
    res.json({
      success: true,
      data: notices,
      count: notices.length
    });
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching notices',
      error: error.message
    });
  }
};

// Get pinned notices
const getPinnedNotices = async (req, res) => {
  try {
    const { audience } = req.query;
    const userRole = req.user?.role || 'student';
    
    let targetAudience = audience;
    if (!targetAudience) {
      switch (userRole) {
        case 'admin':
          targetAudience = 'admin';
          break;
        case 'teacher':
          targetAudience = 'teachers';
          break;
        case 'classTeacher':
          targetAudience = 'classTeachers';
          break;
        case 'student':
          targetAudience = 'students';
          break;
        default:
          targetAudience = 'all';
      }
    }
    
    const notices = await Notice.findPinned(targetAudience)
      .populate('author', 'name email')
      .lean();
    
    res.json({
      success: true,
      data: notices,
      count: notices.length
    });
  } catch (error) {
    console.error('Error fetching pinned notices:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pinned notices',
      error: error.message
    });
  }
};

// Get single notice by ID
const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const notice = await Notice.findById(id)
      .populate('author', 'name email')
      .populate('comments.author', 'name email')
      .lean();
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }
    
    // Increment view count
    await Notice.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });
    
    res.json({
      success: true,
      data: notice
    });
  } catch (error) {
    console.error('Error fetching notice:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching notice',
      error: error.message
    });
  }
};

// Create new notice
const createNotice = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      priority,
      audience,
      expiryDate,
      attachments,
      tags,
      isPinned,
      allowComments,
      targetClasses,
      targetDepartments
    } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }
    
    // Get author information
    const author = req.user;
    
    const notice = new Notice({
      title,
      content,
      category: category || 'general',
      priority: priority || 'medium',
      audience: audience || 'all',
      author: author._id,
      authorName: author.name,
      authorRole: author.role,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      attachments: attachments || [],
      tags: tags ? tags.map(tag => tag.trim().toLowerCase()).filter(Boolean) : [],
      isPinned: isPinned || false,
      allowComments: allowComments !== false,
      targetClasses: targetClasses || [],
      targetDepartments: targetDepartments || []
    });
    
    await notice.save();
    
    // Populate author information for response
    await notice.populate('author', 'name email');
    
    res.status(201).json({
      success: true,
      message: 'Notice created successfully',
      data: notice
    });
  } catch (error) {
    console.error('Error creating notice:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating notice',
      error: error.message
    });
  }
};

// Update notice
const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Find the notice
    const notice = await Notice.findById(id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }
    
    // Check if user has permission to update this notice
    const user = req.user;
    if (notice.author.toString() !== user._id.toString() && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this notice'
      });
    }
    
    // Update fields
    const allowedUpdates = [
      'title', 'content', 'category', 'priority', 'audience',
      'expiryDate', 'attachments', 'tags', 'isPinned', 'allowComments',
      'targetClasses', 'targetDepartments', 'status'
    ];
    
    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        if (field === 'tags') {
          notice[field] = updates[field].map(tag => tag.trim().toLowerCase()).filter(Boolean);
        } else if (field === 'expiryDate') {
          notice[field] = updates[field] ? new Date(updates[field]) : null;
        } else {
          notice[field] = updates[field];
        }
      }
    });
    
    await notice.save();
    
    // Populate author information for response
    await notice.populate('author', 'name email');
    
    res.json({
      success: true,
      message: 'Notice updated successfully',
      data: notice
    });
  } catch (error) {
    console.error('Error updating notice:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating notice',
      error: error.message
    });
  }
};

// Delete notice
const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the notice
    const notice = await Notice.findById(id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }
    
    // Check if user has permission to delete this notice
    const user = req.user;
    if (notice.author.toString() !== user._id.toString() && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this notice'
      });
    }
    
    await Notice.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'Notice deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting notice:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting notice',
      error: error.message
    });
  }
};

// Toggle pin status
const togglePinNotice = async (req, res) => {
  try {
    const { id } = req.params;
    
    const notice = await Notice.findById(id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }
    
    // Check if user has permission to pin this notice
    const user = req.user;
    if (notice.author.toString() !== user._id.toString() && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to pin this notice'
      });
    }
    
    notice.isPinned = !notice.isPinned;
    await notice.save();
    
    res.json({
      success: true,
      message: `Notice ${notice.isPinned ? 'pinned' : 'unpinned'} successfully`,
      data: { isPinned: notice.isPinned }
    });
  } catch (error) {
    console.error('Error toggling pin status:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling pin status',
      error: error.message
    });
  }
};

// Add comment to notice
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user = req.user;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }
    
    const notice = await Notice.findById(id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }
    
    if (!notice.allowComments) {
      return res.status(403).json({
        success: false,
        message: 'Comments are not allowed on this notice'
      });
    }
    
    await notice.addComment(user._id, user.name, content.trim());
    
    // Populate comments for response
    const updatedNotice = await Notice.findById(id)
      .populate('comments.author', 'name email')
      .lean();
    
    res.json({
      success: true,
      message: 'Comment added successfully',
      data: updatedNotice.comments[updatedNotice.comments.length - 1]
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message
    });
  }
};

// Search notices
const searchNotices = async (req, res) => {
  try {
    const { q: searchTerm, audience } = req.query;
    const userRole = req.user?.role || 'student';
    
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Search term is required'
      });
    }
    
    let targetAudience = audience;
    if (!targetAudience) {
      switch (userRole) {
        case 'admin':
          targetAudience = 'admin';
          break;
        case 'teacher':
          targetAudience = 'teachers';
          break;
        case 'classTeacher':
          targetAudience = 'classTeachers';
          break;
        case 'student':
          targetAudience = 'students';
          break;
        default:
          targetAudience = 'all';
      }
    }
    
    const notices = await Notice.searchNotices(searchTerm, targetAudience)
      .populate('author', 'name email')
      .lean();
    
    res.json({
      success: true,
      data: notices,
      count: notices.length,
      searchTerm
    });
  } catch (error) {
    console.error('Error searching notices:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching notices',
      error: error.message
    });
  }
};

// Get notice statistics
const getNoticeStats = async (req, res) => {
  try {
    const userRole = req.user?.role;
    
    // Only admins can see full statistics
    if (userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    
    const stats = await Notice.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pinned: { $sum: { $cond: ['$isPinned', 1, 0] } },
          byCategory: {
            $push: {
              category: '$category',
              count: 1
            }
          },
          byPriority: {
            $push: {
              priority: '$priority',
              count: 1
            }
          },
          byAudience: {
            $push: {
              audience: '$audience',
              count: 1
            }
          },
          totalViews: { $sum: '$viewCount' },
          totalComments: { $sum: { $size: '$comments' } }
        }
      }
    ]);
    
    const result = stats[0] || {
      total: 0,
      pinned: 0,
      byCategory: [],
      byPriority: [],
      byAudience: [],
      totalViews: 0,
      totalComments: 0
    };
    
    // Group by category
    const categoryStats = {};
    result.byCategory.forEach(item => {
      if (!categoryStats[item.category]) {
        categoryStats[item.category] = 0;
      }
      categoryStats[item.category]++;
    });
    
    // Group by priority
    const priorityStats = {};
    result.byPriority.forEach(item => {
      if (!priorityStats[item.priority]) {
        priorityStats[item.priority] = 0;
      }
      priorityStats[item.priority]++;
    });
    
    // Group by audience
    const audienceStats = {};
    result.byAudience.forEach(item => {
      if (!audienceStats[item.audience]) {
        audienceStats[item.audience] = 0;
      }
      audienceStats[item.audience]++;
    });
    
    res.json({
      success: true,
      data: {
        total: result.total,
        pinned: result.pinned,
        byCategory: categoryStats,
        byPriority: priorityStats,
        byAudience: audienceStats,
        totalViews: result.totalViews,
        totalComments: result.totalComments
      }
    });
  } catch (error) {
    console.error('Error fetching notice stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching notice statistics',
      error: error.message
    });
  }
};

module.exports = {
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
};
