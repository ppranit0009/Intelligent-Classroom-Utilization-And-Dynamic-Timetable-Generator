import React, { useState } from 'react';
import { Bell, AlertCircle, Info, CheckCircle, Calendar, X, ChevronDown, ChevronUp } from 'lucide-react';

const NoticeBoard = ({ notices = [], userRole = 'student' }) => {
    const [expandedNotice, setExpandedNotice] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'urgent', 'general', 'event'

    // Get icon and styling based on notice type
    const getNoticeStyle = (type) => {
        switch (type) {
            case 'urgent':
                return {
                    icon: AlertCircle,
                    bgColor: 'bg-red-50 dark:bg-red-900/20',
                    borderColor: 'border-red-200 dark:border-red-800',
                    iconColor: 'text-red-600 dark:text-red-400',
                    badgeColor: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                };
            case 'event':
                return {
                    icon: Calendar,
                    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
                    borderColor: 'border-purple-200 dark:border-purple-800',
                    iconColor: 'text-purple-600 dark:text-purple-400',
                    badgeColor: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                };
            case 'success':
                return {
                    icon: CheckCircle,
                    bgColor: 'bg-green-50 dark:bg-green-900/20',
                    borderColor: 'border-green-200 dark:border-green-800',
                    iconColor: 'text-green-600 dark:text-green-400',
                    badgeColor: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                };
            default:
                return {
                    icon: Info,
                    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                    borderColor: 'border-blue-200 dark:border-blue-800',
                    iconColor: 'text-blue-600 dark:text-blue-400',
                    badgeColor: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                };
        }
    };

    // Filter notices based on selected filter and user role
    const filteredNotices = notices.filter(notice => {
        const roleMatch = notice.targetRole === 'all' || notice.targetRole === userRole;
        const typeMatch = filter === 'all' || notice.type === filter;
        return roleMatch && typeMatch;
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

            {/* Filter Tabs */}
            <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
                <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide">
                    {['all', 'urgent', 'general', 'event', 'success'].map((filterType) => (
                        <button
                            key={filterType}
                            onClick={() => setFilter(filterType)}
                            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-base transition-all duration-200 whitespace-nowrap transform hover:scale-105 ${filter === filterType
                                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 border-2 border-indigo-500'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500'
                                }`}
                        >
                            {filterType === 'all' && '📋 All'}
                            {filterType === 'urgent' && '🚨 Urgent'}
                            {filterType === 'general' && '📢 General'}
                            {filterType === 'event' && '📅 Event'}
                            {filterType === 'success' && '✅ Success'}
                        </button>
                    ))}
                </div>
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
                        const style = getNoticeStyle(notice.type);
                        const Icon = style.icon;
                        const isExpanded = expandedNotice === notice.id;

                        return (
                            <div
                                key={notice.id}
                                className={`${style.bgColor} ${style.borderColor} border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] transform relative`}
                            >
                                {/* Accent Border */}
                                <div className={`absolute top-0 left-0 right-0 h-1 ${style.iconColor.replace('text', 'bg')} opacity-80`}></div>
                                
                                <div className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3 sm:space-x-5 flex-1">
                                            <div className={`${style.iconColor} mt-1 flex-shrink-0`}>
                                                <div className={`p-3 sm:p-4 ${style.bgColor} rounded-xl border-2 ${style.borderColor}`}>
                                                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
                                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl leading-tight">
                                                        {notice.title}
                                                    </h3>
                                                    <span className={`${style.badgeColor} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide shadow-sm self-start sm:self-auto`}>
                                                        {notice.type}
                                                    </span>
                                                </div>
                                                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                                                    {notice.shortDescription}
                                                </p>
                                                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                                    <span className="flex items-center font-medium">
                                                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                                        {notice.date}
                                                    </span>
                                                    {notice.postedBy && (
                                                        <span className="flex items-center font-medium">
                                                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-slate-400 rounded-full mr-2"></div>
                                                            Posted by: {notice.postedBy}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {notice.fullDescription && (
                                            <button
                                                onClick={() => toggleExpand(notice.id)}
                                                className={`${style.iconColor} hover:opacity-70 transition-all duration-200 ml-4 sm:ml-6 flex-shrink-0 p-2 sm:p-3 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50`}
                                            >
                                                {isExpanded ? (
                                                    <ChevronUp className="w-5 h-5 sm:w-7 sm:h-7" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 sm:w-7 sm:h-7" />
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {/* Expanded Content */}
                                    {isExpanded && notice.fullDescription && (
                                        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2 fade-in duration-300">
                                            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                                {notice.fullDescription}
                                            </p>
                                            {notice.actionLink && (
                                                <a
                                                    href={notice.actionLink}
                                                    className={`inline-block mt-3 sm:mt-5 px-4 sm:px-7 py-2 sm:py-4 rounded-xl ${style.iconColor} bg-white dark:bg-slate-800 border-2 ${style.borderColor} font-bold text-sm sm:text-base hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                                                >
                                                    {notice.actionText || 'Learn More'}
                                                </a>
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
