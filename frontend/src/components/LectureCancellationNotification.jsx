import React, { useState, useEffect } from 'react';
import { Bell, X, Calendar, Clock, User, AlertTriangle, CheckCircle } from 'lucide-react';

const LectureCancellationNotification = ({ 
  isOpen, 
  onClose, 
  notifications = [], 
  onMarkAsRead,
  onDismiss 
}) => {
  const [expandedNotification, setExpandedNotification] = useState(null);

  useEffect(() => {
    if (notifications.length > 0) {
      // Auto-dismiss success notifications after 5 seconds
      const timer = setTimeout(() => {
        notifications.forEach(notification => {
          if (notification.type === 'success') {
            onDismiss(notification.id);
          }
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications, onDismiss]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'cancellation':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info':
        return <Bell className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'cancellation':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800';
      case 'success':
        return 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800';
      case 'info':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800';
      default:
        return 'border-gray-200 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pointer-events-none">
      <div className="max-w-md w-full pointer-events-auto">
        {/* Notification Header */}
        <div className="bg-white dark:bg-slate-900 rounded-t-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-slate-900 rounded-b-2xl border border-t-0 border-slate-200 dark:border-slate-800 shadow-lg max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 ${getNotificationStyle(notification.type)} ${
                    !notification.read ? 'border-l-4 border-l-red-500' : ''
                  }`}
                  onClick={() => setExpandedNotification(expandedNotification === notification.id ? null : notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className={`font-medium text-slate-900 dark:text-white ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                        )}
                      </div>

                      {/* Expanded Details */}
                      {expandedNotification === notification.id && notification.details && (
                        <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="grid grid-cols-1 gap-2 text-sm">
                            {notification.details.subject && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-600 dark:text-slate-400">
                                  Subject: <span className="font-medium text-slate-900 dark:text-white">{notification.details.subject}</span>
                                </span>
                              </div>
                            )}
                            {notification.details.teacher && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-600 dark:text-slate-400">
                                  Teacher: <span className="font-medium text-slate-900 dark:text-white">{notification.details.teacher}</span>
                                </span>
                              </div>
                            )}
                            {notification.details.date && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-600 dark:text-slate-400">
                                  Date: <span className="font-medium text-slate-900 dark:text-white">{formatDate(notification.details.date)}</span>
                                </span>
                              </div>
                            )}
                            {notification.details.time && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-600 dark:text-slate-400">
                                  Time: <span className="font-medium text-slate-900 dark:text-white">{formatTime(notification.details.time)}</span>
                                </span>
                              </div>
                            )}
                            {notification.details.reason && (
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-slate-500 mt-0.5" />
                                <span className="text-slate-600 dark:text-slate-400">
                                  Reason: <span className="font-medium text-slate-900 dark:text-white">{notification.details.reason}</span>
                                </span>
                              </div>
                            )}
                            {notification.details.alternativeArrangements && (
                              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                  <strong>Alternative Arrangements:</strong> {notification.details.alternativeArrangements}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Notification Footer */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                          <span>{formatTime(notification.timestamp)}</span>
                          {notification.priority && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              notification.priority === 'high' 
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : notification.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                            }`}>
                              {notification.priority}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onMarkAsRead(notification.id);
                              }}
                              className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                              Mark as Read
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDismiss(notification.id);
                            }}
                            className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LectureCancellationNotification;
