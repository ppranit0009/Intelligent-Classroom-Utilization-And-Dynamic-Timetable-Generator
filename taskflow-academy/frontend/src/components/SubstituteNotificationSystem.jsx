import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, BellRing, CheckCircle, X, Clock, Calendar, Users,
    AlertTriangle, MessageSquare, Send, Eye, FileText, Brain,
    TrendingUp, BarChart3, Activity
} from 'lucide-react';

const SubstituteNotificationSystem = ({ 
    notifications = [], 
    onMarkAsRead, 
    onDismiss, 
    onAccept, 
    onDecline,
    user 
}) => {
    const [filter, setFilter] = useState('all');
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;
    const urgentCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !notification.read;
        if (filter === 'urgent') return notification.priority === 'high';
        if (filter === 'pending') return notification.status === 'pending';
        return true;
    });

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'substitute_request':
                return Users;
            case 'leave_approved':
                return CheckCircle;
            case 'lecture_cancellation':
                return AlertTriangle;
            case 'timetable_update':
                return Calendar;
            case 'ai_analysis':
                return Brain;
            default:
                return Bell;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
            case 'medium':
                return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
            case 'low':
                return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'accepted':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'declined':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'completed':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default:
                return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400';
        }
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInMinutes = Math.floor((now - time) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    const handleAcceptSubstitute = (notification) => {
        if (onAccept) {
            onAccept(notification);
        }
    };

    const handleDeclineSubstitute = (notification) => {
        if (onDecline) {
            onDecline(notification);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <BellRing className="w-8 h-8" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Substitute Notifications</h2>
                            <p className="text-indigo-100">
                                AI-powered substitute assignment notifications
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold">{unreadCount}</p>
                            <p className="text-xs text-indigo-100">Unread</p>
                        </div>
                        {urgentCount > 0 && (
                            <div className="text-center">
                                <p className="text-2xl font-bold text-red-300">{urgentCount}</p>
                                <p className="text-xs text-red-200">Urgent</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-wrap gap-2">
                    {['all', 'unread', 'urgent', 'pending'].map((filterType) => (
                        <button
                            key={filterType}
                            onClick={() => setFilter(filterType)}
                            className={`
                                px-4 py-2 rounded-lg font-medium text-sm transition-all
                                ${filter === filterType
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }
                            `}
                        >
                            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                            {filterType === 'unread' && unreadCount > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                            {filterType === 'urgent' && urgentCount > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {urgentCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-lg">
                        <Bell className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            No notifications found
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            {filter === 'all' 
                                ? "You don't have any notifications yet" 
                                : `No ${filter} notifications found`}
                        </p>
                    </div>
                ) : (
                    filteredNotifications.map((notification) => {
                        const Icon = getNotificationIcon(notification.type);
                        return (
                            <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`
                                    bg-white dark:bg-slate-900 rounded-xl border shadow-lg transition-all
                                    ${notification.read 
                                        ? 'border-slate-200 dark:border-slate-700 opacity-75' 
                                        : 'border-indigo-200 dark:border-indigo-700 shadow-indigo-100 dark:shadow-indigo-900/20'
                                    }
                                `}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`
                                                p-3 rounded-xl
                                                ${notification.type === 'substitute_request' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' :
                                                  notification.type === 'ai_analysis' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                                                  'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}
                                            `}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                                        {notification.title}
                                                    </h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityColor(notification.priority)}`}>
                                                        {notification.priority}
                                                    </span>
                                                    {notification.status && (
                                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(notification.status)}`}>
                                                            {notification.status}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-slate-700 dark:text-slate-300 mb-3">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {formatTimeAgo(notification.timestamp)}
                                                    </span>
                                                    {notification.leaveRequest && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {notification.leaveRequest.startDate} - {notification.leaveRequest.endDate}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {!notification.read && (
                                                <button
                                                    onClick={() => onMarkAsRead && onMarkAsRead(notification.id)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                                    title="Mark as read"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSelectedNotification(notification)}
                                                className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                title="View details"
                                            >
                                                <FileText className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onDismiss && onDismiss(notification.id)}
                                                className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                title="Dismiss"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action buttons for substitute requests */}
                                    {notification.type === 'substitute_request' && notification.status === 'pending' && (
                                        <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                                            <button
                                                onClick={() => handleAcceptSubstitute(notification)}
                                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Accept Substitute
                                            </button>
                                            <button
                                                onClick={() => handleDeclineSubstitute(notification)}
                                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <X className="w-4 h-4" />
                                                Decline Request
                                            </button>
                                            <button
                                                className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                                Ask Question
                                            </button>
                                        </div>
                                    )}

                                    {/* Additional details for AI analysis notifications */}
                                    {notification.type === 'ai_analysis' && notification.analysisResults && (
                                        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                <h4 className="font-semibold text-purple-900 dark:text-purple-300">
                                                    AI Analysis Results
                                                </h4>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                        {notification.analysisResults.confidence}%
                                                    </p>
                                                    <p className="text-xs text-purple-700 dark:text-purple-300">Match Confidence</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                        {notification.analysisResults.affectedLectures}
                                                    </p>
                                                    <p className="text-xs text-purple-700 dark:text-purple-300">Affected Lectures</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                        {notification.analysisResults.availableSubstitutes}
                                                    </p>
                                                    <p className="text-xs text-purple-700 dark:text-purple-300">Available Substitutes</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedNotification && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {(() => {
                                            const Icon = getNotificationIcon(selectedNotification.type);
                                            return <Icon className="w-6 h-6" />;
                                        })()}
                                        <div>
                                            <h3 className="text-xl font-bold">{selectedNotification.title}</h3>
                                            <p className="text-sm text-indigo-100">
                                                {formatTimeAgo(selectedNotification.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedNotification(null)}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                                            Message
                                        </h4>
                                        <p className="text-slate-700 dark:text-slate-300">
                                            {selectedNotification.message}
                                        </p>
                                    </div>

                                    {selectedNotification.leaveRequest && (
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                                                Leave Details
                                            </h4>
                                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-slate-600 dark:text-slate-400">Teacher:</span>
                                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                        {selectedNotification.leaveRequest.teacherName}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-slate-600 dark:text-slate-400">Period:</span>
                                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                        {selectedNotification.leaveRequest.startDate} - {selectedNotification.leaveRequest.endDate}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-slate-600 dark:text-slate-400">Reason:</span>
                                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                        {selectedNotification.leaveRequest.reason}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedNotification.affectedLectures && (
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                                                Affected Lectures
                                            </h4>
                                            <div className="space-y-2">
                                                {selectedNotification.affectedLectures.map((lecture, index) => (
                                                    <div key={index} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                                                        <Clock className="w-4 h-4 text-indigo-500" />
                                                        <span className="text-sm text-slate-900 dark:text-white">
                                                            {lecture.day} {lecture.time} - {lecture.subject} ({lecture.class})
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {selectedNotification.type === 'substitute_request' && selectedNotification.status === 'pending' && (
                                    <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                                        <button
                                            onClick={() => {
                                                handleAcceptSubstitute(selectedNotification);
                                                setSelectedNotification(null);
                                            }}
                                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDeclineSubstitute(selectedNotification);
                                                setSelectedNotification(null);
                                            }}
                                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            Decline
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SubstituteNotificationSystem;
