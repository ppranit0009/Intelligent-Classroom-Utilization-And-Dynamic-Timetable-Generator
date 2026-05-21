import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, X, Save, FileText, Upload, Eye, EyeOff, 
  Pin, PinOff, Calendar, Clock, User, Tag, Bell, Search, Filter,
  ChevronDown, ChevronUp, AlertCircle, CheckCircle, Info
} from 'lucide-react';
import { noticeCategories, noticePriorities, noticeAudiences, demoNotices } from '../data/noticeData';

const NoticeManagement = () => {
  const [notices, setNotices] = useState(demoNotices);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedNotice, setExpandedNotice] = useState(null);

  // New notice form state
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    category: 'academic',
    priority: 'medium',
    audience: 'all',
    expiryDate: '',
    attachments: [],
    tags: [],
    isPinned: false,
    allowComments: true
  });

  // Filter notices
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = searchQuery === '' || 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || notice.priority === selectedPriority;
    const matchesAudience = selectedAudience === 'all' || notice.audience === selectedAudience;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesAudience;
  }).sort((a, b) => {
    // Sort pinned notices first, then by priority, then by date
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    const priorityOrder = { urgent: 1, high: 2, medium: 3, low: 4 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    return new Date(b.postedDate) - new Date(a.postedDate);
  });

  // Handle create/update notice
  const handleSaveNotice = () => {
    if (editingNotice) {
      // Update existing notice
      setNotices(notices.map(notice => 
        notice.id === editingNotice.id 
          ? { 
              ...notice, 
              ...newNotice,
              updatedAt: new Date().toISOString()
            }
          : notice
      ));
      setEditingNotice(null);
    } else {
      // Create new notice
      const notice = {
        id: `N${String(notices.length + 1).padStart(3, '0')}`,
        ...newNotice,
        author: 'PRANIT_ADMIN',
        authorName: 'Pranit Patil',
        authorRole: 'Administrator',
        postedDate: new Date().toISOString().split('T')[0],
        viewCount: 0,
        comments: []
      };
      setNotices([notice, ...notices]);
    }
    
    // Reset form
    setNewNotice({
      title: '',
      content: '',
      category: 'academic',
      priority: 'medium',
      audience: 'all',
      expiryDate: '',
      attachments: [],
      tags: [],
      isPinned: false,
      allowComments: true
    });
    setShowCreateModal(false);
  };

  // Handle delete notice
  const handleDeleteNotice = (noticeId) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter(notice => notice.id !== noticeId));
    }
  };

  // Handle toggle pin
  const handleTogglePin = (noticeId) => {
    setNotices(notices.map(notice => 
      notice.id === noticeId 
        ? { ...notice, isPinned: !notice.isPinned }
        : notice
    ));
  };

  // Handle edit notice
  const handleEditNotice = (notice) => {
    setEditingNotice(notice);
    setNewNotice({
      title: notice.title,
      content: notice.content,
      category: notice.category,
      priority: notice.priority,
      audience: notice.audience,
      expiryDate: notice.expiryDate || '',
      attachments: notice.attachments || [],
      tags: notice.tags || [],
      isPinned: notice.isPinned || false,
      allowComments: notice.allowComments !== false
    });
    setShowCreateModal(true);
  };

  // Get priority styling
  const getPriorityStyle = (priority) => {
    const config = noticePriorities.find(p => p.id === priority) || noticePriorities[3];
    return {
      bgColor: priority === 'urgent' ? 'bg-red-50 dark:bg-red-900/20' :
              priority === 'high' ? 'bg-orange-50 dark:bg-orange-900/20' :
              priority === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
              'bg-green-50 dark:bg-green-900/20',
      borderColor: priority === 'urgent' ? 'border-red-200 dark:border-red-800' :
                  priority === 'high' ? 'border-orange-200 dark:border-orange-800' :
                  priority === 'medium' ? 'border-yellow-200 dark:border-yellow-800' :
                  'border-green-200 dark:border-green-800',
      textColor: priority === 'urgent' ? 'text-red-600 dark:text-red-400' :
                  priority === 'high' ? 'text-orange-600 dark:text-orange-400' :
                  priority === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-green-600 dark:text-green-400',
      badgeColor: priority === 'urgent' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' :
                  priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' :
                  priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300' :
                  'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Notice Management</h1>
            <p className="text-indigo-100">Create, edit, and manage institutional notices</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center gap-2 border border-white/30"
          >
            <Plus className="w-5 h-5" />
            Create Notice
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notices..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {filteredNotices.length} notices
            </span>
            <span className="flex items-center gap-1">
              <Pin className="w-4 h-4" />
              {filteredNotices.filter(n => n.isPinned).length} pinned
            </span>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            >
              <option value="all">All Categories</option>
              {noticeCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            >
              <option value="all">All Priorities</option>
              {noticePriorities.map(pri => (
                <option key={pri.id} value={pri.id}>{pri.name}</option>
              ))}
            </select>

            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            >
              <option value="all">All Audiences</option>
              {noticeAudiences.map(aud => (
                <option key={aud.id} value={aud.id}>{aud.name}</option>
              ))}
            </select>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPriority('all');
                setSelectedAudience('all');
                setSearchQuery('');
              }}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No notices found</p>
          </div>
        ) : (
          filteredNotices.map((notice) => {
            const priorityStyle = getPriorityStyle(notice.priority);
            const category = noticeCategories.find(c => c.id === notice.category);
            const isExpanded = expandedNotice === notice.id;

            return (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${priorityStyle.bgColor} ${priorityStyle.borderColor} border-2 rounded-2xl overflow-hidden`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {notice.title}
                        </h3>
                        {notice.isPinned && <Pin className="w-5 h-5 text-red-500" />}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`${priorityStyle.badgeColor} px-3 py-1 rounded-full text-xs font-bold`}>
                          {notice.priority}
                        </span>
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs">
                          {category?.name}
                        </span>
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs">
                          {noticeAudiences.find(a => a.id === notice.audience)?.name}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePin(notice.id)}
                        className={`p-2 rounded-lg ${notice.isPinned ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'} hover:bg-slate-200 dark:hover:bg-slate-700`}
                      >
                        {notice.isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEditNotice(notice)}
                        className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(notice.id)}
                        className="p-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {isExpanded ? notice.content : notice.content.substring(0, 200) + (notice.content.length > 200 ? '...' : '')}
                    </p>
                    
                    {notice.content.length > 200 && (
                      <button
                        onClick={() => setExpandedNotice(isExpanded ? null : notice.id)}
                        className={`${priorityStyle.textColor} font-medium text-sm mt-2 hover:opacity-70`}
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(notice.postedDate).toLocaleDateString()}
                    </span>
                    {notice.expiryDate && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Expires: {new Date(notice.expiryDate).toLocaleDateString()}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {notice.authorName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {notice.viewCount} views
                    </span>
                  </div>

                  {/* Tags */}
                  {notice.tags && notice.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {notice.tags.map((tag, index) => (
                        <span key={index} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {editingNotice ? 'Edit Notice' : 'Create New Notice'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingNotice(null);
                      setNewNotice({
                        title: '',
                        content: '',
                        category: 'academic',
                        priority: 'medium',
                        audience: 'all',
                        expiryDate: '',
                        attachments: [],
                        tags: [],
                        isPinned: false,
                        allowComments: true
                      });
                    }}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="Enter notice title..."
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    placeholder="Enter notice content..."
                    rows={6}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                {/* Category, Priority, Audience */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Category
                    </label>
                    <select
                      value={newNotice.category}
                      onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      {noticeCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={newNotice.priority}
                      onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      {noticePriorities.map(pri => (
                        <option key={pri.id} value={pri.id}>{pri.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Audience
                    </label>
                    <select
                      value={newNotice.audience}
                      onChange={(e) => setNewNotice({ ...newNotice, audience: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      {noticeAudiences.map(aud => (
                        <option key={aud.id} value={aud.id}>{aud.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={newNotice.expiryDate}
                    onChange={(e) => setNewNotice({ ...newNotice, expiryDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newNotice.tags.join(', ')}
                    onChange={(e) => setNewNotice({ ...newNotice, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) })}
                    placeholder="urgent, important, exam..."
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newNotice.isPinned}
                      onChange={(e) => setNewNotice({ ...newNotice, isPinned: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Pin this notice</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newNotice.allowComments}
                      onChange={(e) => setNewNotice({ ...newNotice, allowComments: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Allow comments</span>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-b-2xl flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingNotice(null);
                    setNewNotice({
                      title: '',
                      content: '',
                      category: 'academic',
                      priority: 'medium',
                      audience: 'all',
                      expiryDate: '',
                      attachments: [],
                      tags: [],
                      isPinned: false,
                      allowComments: true
                    });
                  }}
                  className="px-6 py-2.5 rounded-lg font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors border border-slate-300 dark:border-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotice}
                  disabled={!newNotice.title || !newNotice.content}
                  className="px-6 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingNotice ? 'Update Notice' : 'Create Notice'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NoticeManagement;
