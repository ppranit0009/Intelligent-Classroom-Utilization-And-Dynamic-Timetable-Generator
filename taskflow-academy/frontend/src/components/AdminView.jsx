import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, BookOpen, Calendar, TrendingUp, Award, AlertCircle,
    CheckCircle, Clock, BarChart3, PieChart, Activity, UserCheck,
    GraduationCap, ClipboardList, Target, Zap, Eye, FileText, MessageSquare, Send, X, Plus,
    Database, Shield, Bell, LogOut, Edit, Trash2, Search, Filter,
    Download, Upload, ChevronDown, Menu, Home, UserPlus, School, Monitor, Cpu, HardDrive,
    Globe, Lock, Mail, Phone, MapPin, Star, TrendingDown, ArrowUp, ArrowDown,
    RefreshCw, Save, Printer, Share2, Link2, Wifi, Battery, Cloud, Server
} from 'lucide-react';

const AdminView = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [showCreateClassModal, setShowCreateClassModal] = useState(false);
    const [notification, setNotification] = useState(null);

    // Mock data (in real app, this would come from backend)
    const [users, setUsers] = useState([
        { id: 'U001', name: 'John Doe', email: 'john@school.edu', role: 'student', status: 'active', joinedDate: '2024-01-15', lastActive: '2024-02-24' },
        { id: 'U002', name: 'Jane Smith', email: 'jane@school.edu', role: 'teacher', status: 'active', joinedDate: '2024-01-10', lastActive: '2024-02-23' },
        { id: 'U003', name: 'Mike Johnson', email: 'mike@school.edu', role: 'classTeacher', status: 'active', joinedDate: '2024-01-08', lastActive: '2024-02-24' },
        { id: 'U004', name: 'Sarah Williams', email: 'sarah@school.edu', role: 'student', status: 'inactive', joinedDate: '2024-01-20', lastActive: '2024-02-10' },
        { id: 'U005', name: 'David Brown', email: 'david@school.edu', role: 'teacher', status: 'active', joinedDate: '2024-01-12', lastActive: '2024-02-22' }
    ]);

    const [classes, setClasses] = useState([
        { id: 'C101', name: 'Mathematics 101', grade: 'Grade 10', section: 'A', teacher: 'Ms. Sarah Johnson', students: 25, maxStudents: 40, status: 'active' },
        { id: 'C102', name: 'Physics 101', grade: 'Grade 10', section: 'B', teacher: 'Mr. David Chen', students: 18, maxStudents: 35, status: 'active' },
        { id: 'C103', name: 'Chemistry Lab', grade: 'Grade 11', section: 'A', teacher: 'Dr. Emily Rodriguez', students: 22, maxStudents: 30, status: 'active' }
    ]);

    const [systemStats, setSystemStats] = useState({
        totalUsers: 1250,
        activeUsers: 890,
        totalClasses: 45,
        activeClasses: 38,
        totalAssignments: 234,
        pendingSubmissions: 67,
        systemUptime: '99.9%',
        storageUsed: '67.3%',
        serverLoad: '42%',
        networkSpeed: '1.2 Gbps',
        databaseSize: '2.4 GB',
        todayLogins: 342,
        weeklyGrowth: '+12.5%',
        monthlyRevenue: '$45,678',
        satisfactionRate: '94.2%',
        responseTime: '124ms',
        errorRate: '0.02%',
        securityScore: 'A+',
        backupStatus: 'Current',
        apiCalls: '1.2M',
        mobileUsers: '45%',
        desktopUsers: '55%'
    });

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'classes', label: 'Class Management', icon: School },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'logs', label: 'Activity Logs', icon: Activity }
    ];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    // Button handlers
    const handleCreateUser = () => {
        setShowCreateModal(true);
        setNotification({ type: 'info', message: 'Create User modal opened' });
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setNotification({ type: 'info', message: `Editing user: ${user.name}` });
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== userId));
            setNotification({ type: 'success', message: 'User deleted successfully' });
        }
    };

    const handleToggleUserStatus = (userId) => {
        setUsers(users.map(u => 
            u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
        ));
        setNotification({ type: 'success', message: 'User status updated' });
    };

    const handleCreateClass = () => {
        setShowCreateClassModal(true);
        setNotification({ type: 'info', message: 'Create Class modal opened' });
    };

    const handleEditClass = (classId) => {
        setNotification({ type: 'info', message: `Editing class: ${classId}` });
    };

    const handleDeleteClass = (classId) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            setClasses(classes.filter(c => c.id !== classId));
            setNotification({ type: 'success', message: 'Class deleted successfully' });
        }
    };

    const handleGenerateReport = (reportType) => {
        setNotification({ type: 'success', message: `${reportType} report generated successfully` });
    };

    const handleExportData = () => {
        setNotification({ type: 'success', message: 'Data exported successfully' });
    };

    // Clear notification after 3 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div className="space-y-6">
            {/* Notification Display */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border ${
                    notification.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' :
                    notification.type === 'warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                    notification.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' :
                    'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                    <div className="flex items-center gap-2">
                        {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                        {notification.type === 'warning' && <AlertCircle className="w-5 h-5" />}
                        {notification.type === 'error' && <X className="w-5 h-5" />}
                        {notification.type === 'info' && <Bell className="w-5 h-5" />}
                        <span>{notification.message}</span>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
                        <p className="text-purple-100 text-lg">System Management Dashboard</p>
                        <p className="text-purple-200 text-sm mt-1">Welcome, {user?.name || 'Administrator'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                            <Users className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-xl font-bold">{systemStats.totalUsers}</p>
                            <p className="text-sm text-purple-100">Total Users</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-wrap gap-1 lg:gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-1.5 lg:gap-2 px-2 lg:px-4 py-2 lg:py-3 rounded-lg font-medium text-xs lg:text-sm transition-all whitespace-nowrap
                                ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }
                            `}
                        >
                            <tab.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'dashboard' && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {/* System Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Users</p>
                                        <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{systemStats.totalUsers.toLocaleString()}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <ArrowUp className="w-3 h-3 text-green-500" />
                                            <span className="text-xs text-green-600 dark:text-green-400">{systemStats.weeklyGrowth}</span>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Users</p>
                                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">{systemStats.activeUsers.toLocaleString()}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-xs text-green-600 dark:text-green-400">Live</span>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Classes</p>
                                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{systemStats.totalClasses}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-xs text-blue-600 dark:text-blue-400">{systemStats.activeClasses} active</span>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                        <School className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">System Uptime</p>
                                        <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{systemStats.systemUptime}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Shield className="w-3 h-3 text-emerald-500" />
                                            <span className="text-xs text-emerald-600 dark:text-emerald-400">Secure</span>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                                        <Server className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">Revenue</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{systemStats.monthlyRevenue}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                                        <Star className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">Satisfaction</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{systemStats.satisfactionRate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">Response</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{systemStats.responseTime}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">Error Rate</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{systemStats.errorRate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                        <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">Database</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{systemStats.databaseSize}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                        <Cloud className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">Storage</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{systemStats.storageUsed}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Live Analytics Chart */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-blue-500" />
                                    User Activity Analytics
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Desktop Users</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '55%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">{systemStats.desktopUsers}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Mobile Users</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">{systemStats.mobileUsers}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Server Load</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">{systemStats.serverLoad}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Storage Used</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">{systemStats.storageUsed}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-green-500" />
                                    Recent Activity
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">New user registration</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">John Doe joined as student</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500">2 min ago</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">Class created</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">Mathematics 101 by Ms. Johnson</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500">5 min ago</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">Assignment submitted</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">23 new submissions today</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500">1 hour ago</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">System backup</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">Daily backup completed</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500">2 hours ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 shadow-lg">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Monitor className="w-5 h-5 text-indigo-500" />
                                System Performance Metrics
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Wifi className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{systemStats.networkSpeed}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Network Speed</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Cpu className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{systemStats.apiCalls}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">API Calls Today</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{systemStats.responseTime}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Avg Response</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{systemStats.securityScore}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Security Score</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'users' && (
                    <motion.div
                        key="users"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Users className="w-6 h-6 text-purple-500" />
                                    User Management
                                </h3>
                                <button
                                    onClick={handleCreateUser}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create User
                                </button>
                            </div>

                            {/* Search and Filter */}
                            <div className="flex gap-4 mb-6">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search users by name or email..."
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <select
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value)}
                                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="student">Students</option>
                                    <option value="teacher">Teachers</option>
                                    <option value="classTeacher">Class Teachers</option>
                                </select>
                            </div>

                            {/* Users Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800">
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Name</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Role</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Status</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Joined</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Last Active</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                                                                {user.name.split(' ').map(n => n[0]).join('')}
                                                            </span>
                                                        </div>
                                                        <span className="font-medium text-slate-900 dark:text-white">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{user.email}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        user.role === 'student' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                        user.role === 'teacher' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        user.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{user.joinedDate}</td>
                                                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{user.lastActive}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleEditUser(user)}
                                                            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleToggleUserStatus(user.id)}
                                                            className={`p-1 transition-colors ${
                                                                user.status === 'active' 
                                                                    ? 'text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300' 
                                                                    : 'text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300'
                                                            }`}
                                                        >
                                                            {user.status === 'active' ? <X className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'classes' && (
                    <motion.div
                        key="classes"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <School className="w-6 h-6 text-blue-500" />
                                    Class Management
                                </h3>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Class
                                </button>
                            </div>

                            {/* Classes Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {classes.map((classItem) => (
                                    <div key={classItem.id} className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white">{classItem.name}</h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">{classItem.teacher}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                classItem.status === 'active' 
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                                {classItem.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-4 h-4" />
                                                <span>{classItem.grade} - {classItem.section}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                <span>{classItem.students}/{classItem.maxStudents} students</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleEditClass(classItem.id)}
                                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClass(classItem.id)}
                                                className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'reports' && (
                    <motion.div
                        key="reports"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-green-500" />
                                    System Reports
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">User Statistics</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Complete user overview and activity</p>
                                        <button 
                                            onClick={() => handleGenerateReport('User Statistics')}
                                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Generate Report
                                        </button>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Class Performance</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Academic performance metrics</p>
                                        <button 
                                            onClick={() => handleGenerateReport('Class Performance')}
                                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Generate Report
                                        </button>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Attendance Report</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Attendance trends and patterns</p>
                                        <button 
                                            onClick={() => handleGenerateReport('Attendance')}
                                            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                        >
                                            Generate Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'logs' && (
                    <motion.div
                        key="logs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Activity className="w-6 h-6 text-orange-500" />
                                Activity Logs
                            </h3>
                            
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">User Login</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Admin logged in successfully</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-500">Just now</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">Class Created</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">New class Mathematics 101 created</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-500">5 minutes ago</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">User Registration</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">New student John Doe registered</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-500">1 hour ago</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">System Backup</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Automated backup completed</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-500">2 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminView;
