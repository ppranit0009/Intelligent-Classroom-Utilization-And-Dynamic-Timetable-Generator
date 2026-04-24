import React, { useState, useEffect } from 'react';
import { Bell, AlertCircle, Info, CheckCircle, Calendar, X, ChevronDown, ChevronUp, FileText, Download, MessageSquare, Eye, Pin, Clock, User, Tag, Filter, Search, Target, BookOpen, Briefcase, Tool } from 'lucide-react';
import { demoNotices, getNoticesByAudience, noticeCategories, noticePriorities, getPinnedNotices, getRecentNotices } from '../data/noticeData';

const NoticeBoard = ({ userRole = 'student', userClass = null, showFullBoard = false }) => {
    const [expandedNotice, setExpandedNotice] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPriority, setSelectedPriority] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    
    // Get notices based on user role
    const [notices, setNotices] = useState([]);
    
    useEffect(() => {
        const userNotices = getNoticesByAudience(userRole, userClass);
        setNotices(userNotices);
    }, [userRole, userClass]);

    // Get icon and styling based on notice priority
    const getPriorityStyle = (priority) => {
        const priorityConfig = noticePriorities.find(p => p.id === priority) || noticePriorities[3];
        return {
            bgColor: priority === 'urgent' ? 'bg-red-50 dark:bg-red-900/20' :
                    priority === 'high' ? 'bg-orange-50 dark:bg-orange-900/20' :
                    priority === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                    'bg-green-50 dark:bg-green-900/20',
            borderColor: priority === 'urgent' ? 'border-red-200 dark:border-red-800' :
                        priority === 'high' ? 'border-orange-200 dark:border-orange-800' :
                        priority === 'medium' ? 'border-yellow-200 dark:border-yellow-800' :
                        'border-green-200 dark:border-green-800',
            iconColor: priority === 'urgent' ? 'text-red-600 dark:text-red-400' :
                        priority === 'high' ? 'text-orange-600 dark:text-orange-400' :
                        priority === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-green-600 dark:text-green-400',
            badgeColor: priority === 'urgent' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' :
                        priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' :
                        priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300' :
                        'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
            icon: priority === 'urgent' ? AlertCircle :
                  priority === 'high' ? AlertCircle :
                  priority === 'medium' ? Bell :
                  Info
        };
    };

    // Get category styling
    const getCategoryStyle = (categoryId) => {
        const category = noticeCategories.find(c => c.id === categoryId) || noticeCategories[8];
        return {
            name: category.name,
            color: category.color,
            icon: category.id === 'academic' ? FileText :
                  category.id === 'events' ? Calendar :
                  category.id === 'examinations' ? FileText :
                  category.id === 'holidays' ? Calendar :
                  category.id === 'sports' ? Target :
                  category.id === 'placements' ? Briefcase :
                  category.id === 'library' ? BookOpen :
                  category.id === 'maintenance' ? Tool :
                  Bell
        };
    };

    // Filter notices based on multiple criteria
    const filteredNotices = notices.filter(notice => {
        const matchesSearch = searchQuery === '' || 
            notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
        const matchesPriority = selectedPriority === 'all' || notice.priority === selectedPriority;
        
        return matchesSearch && matchesCategory && matchesPriority;
    }).sort((a, b) => {
        // Sort pinned notices first, then by priority, then by date
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        
        const priorityOrder = { urgent: 1, high: 2, medium: 3, low: 4 };
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        
        return new Date(b.postedDate) - new Date(a.postedDate);
    });

    const toggleExpand = (noticeId) => {
        setExpandedNotice(expandedNotice === noticeId ? null : noticeId);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 p-4 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-white/20">
                            <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">Notice Board</h2>
                            <p className="text-indigo-100 text-sm font-medium">Stay updated with important announcements</p>
                        </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-4 rounded-full border border-white/30 shadow-lg">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            <span className="text-white font-bold text-lg sm:text-xl">{filteredNotices.length}</span>
                            <span className="text-white/80 text-xs sm:text-base">Notice{filteredNotices.length !== 1 ? 's' : ''}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search Bar */}
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
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {/* Category Filter */}
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

                        {/* Priority Filter */}
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
                    </div>
                )}
            </div>

            {/* Notices List */}
            <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                {filteredNotices.length === 0 ? (
                    <div className="text-center py-12 sm:py-16 lg:py-20">
                        <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                            <Bell className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-slate-400" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-xl sm:text-2xl font-bold mb-2 sm:mb-3">No notices available</p>
                        <p className="text-slate-400 dark:text-slate-500 text-sm sm:text-base">Check back later for updates</p>
                        <div className="mt-6 sm:mt-8 flex justify-center">
                            <button className="px-6 sm:px-8 py-2 sm:py-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors">
                                Refresh Notices
                            </button>
                        </div>
                    </div>
                ) : (
                    filteredNotices.map((notice) => {
                        const priorityStyle = getPriorityStyle(notice.priority);
                        const categoryStyle = getCategoryStyle(notice.category);
                        const Icon = priorityStyle.icon;
                        const CategoryIcon = categoryStyle.icon;
                        const isExpanded = expandedNotice === notice.id;

                        return (
                            <div
                                key={notice.id}
                                className={`${priorityStyle.bgColor} ${priorityStyle.borderColor} border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] transform relative`}
                            >
                                {/* Accent Border */}
                                <div className={`absolute top-0 left-0 right-0 h-1 ${priorityStyle.iconColor.replace('text', 'bg')} opacity-80`}></div>
                                
                                {/* Pinned Indicator */}
                                {notice.isPinned && (
                                    <div className="absolute top-2 right-2">
                                        <Pin className="w-4 h-4 text-red-500" />
                                    </div>
                                )}
                                
                                <div className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3 sm:space-x-5 flex-1">
                                            <div className={`${priorityStyle.iconColor} mt-1 flex-shrink-0`}>
                                                <div className={`p-3 sm:p-4 ${priorityStyle.bgColor} rounded-xl border-2 ${priorityStyle.borderColor}`}>
                                                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
                                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl leading-tight">
                                                        {notice.title}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 self-start sm:self-auto">
                                                        <span className={`${priorityStyle.badgeColor} px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm`}>
                                                            {notice.priority}
                                                        </span>
                                                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                            <CategoryIcon className="w-3 h-3" />
                                                            {categoryStyle.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                                                    {isExpanded ? notice.content : notice.content.substring(0, 150) + (notice.content.length > 150 ? '...' : '')}
                                                </p>

                                                {/* Attachments */}
                                                {notice.attachments && notice.attachments.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {notice.attachments.map((attachment, index) => (
                                                            <div key={index} className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-xs">
                                                                <FileText className="w-3 h-3 text-slate-500" />
                                                                <span className="text-slate-700 dark:text-slate-300">{attachment.name}</span>
                                                                <span className="text-slate-500">({Math.round(attachment.size / 1024)}KB)</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Tags */}
                                                {notice.tags && notice.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mb-3">
                                                        {notice.tags.map((tag, index) => (
                                                            <span key={index} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded text-xs">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                
                                                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                                    <span className="flex items-center font-medium">
                                                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                                        {new Date(notice.postedDate).toLocaleDateString()}
                                                    </span>
                                                    {notice.expiryDate && (
                                                        <span className="flex items-center font-medium">
                                                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                                            Expires: {new Date(notice.expiryDate).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center font-medium">
                                                        <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                                        {notice.authorName}
                                                    </span>
                                                    <span className="flex items-center font-medium">
                                                        <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                                        {notice.viewCount} views
                                                    </span>
                                                </div>

                                                {/* Comments */}
                                                {notice.comments && notice.comments.length > 0 && (
                                                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                            <MessageSquare className="w-3 h-3" />
                                                            {notice.comments.length} comment{notice.comments.length !== 1 ? 's' : ''}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={() => toggleExpand(notice.id)}
                                            className={`${priorityStyle.iconColor} hover:opacity-70 transition-all duration-200 ml-4 sm:ml-6 flex-shrink-0 p-2 sm:p-3 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50`}
                                        >
                                            {isExpanded ? (
                                                <ChevronUp className="w-5 h-5 sm:w-7 sm:h-7" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 sm:w-7 sm:h-7" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Expanded Content */}
                                    {isExpanded && (
                                        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2 fade-in duration-300">
                                            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-4">
                                                {notice.content}
                                            </p>

                                            {/* Download Attachments */}
                                            {notice.attachments && notice.attachments.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Attachments:</h4>
                                                    <div className="space-y-2">
                                                        {notice.attachments.map((attachment, index) => (
                                                            <div key={index} className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                                                                <div className="flex items-center gap-3">
                                                                    <FileText className="w-5 h-5 text-slate-500" />
                                                                    <div>
                                                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{attachment.name}</p>
                                                                        <p className="text-xs text-slate-500">{Math.round(attachment.size / 1024)}KB</p>
                                                                    </div>
                                                                </div>
                                                                <button className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700 flex items-center gap-1">
                                                                    <Download className="w-3 h-3" />
                                                                    Download
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Comments Section */}
                                            {notice.comments && notice.comments.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Comments:</h4>
                                                    <div className="space-y-3">
                                                        {notice.comments.map((comment) => (
                                                            <div key={comment.id} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <span className="font-medium text-sm text-slate-900 dark:text-white">{comment.authorName}</span>
                                                                    <span className="text-xs text-slate-500">{new Date(comment.date).toLocaleDateString()}</span>
                                                                </div>
                                                                <p className="text-sm text-slate-700 dark:text-slate-300">{comment.content}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default NoticeBoard;
