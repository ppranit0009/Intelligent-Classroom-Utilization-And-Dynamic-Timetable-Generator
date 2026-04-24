import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, BookOpen, Calendar, TrendingUp, Award, AlertCircle,
    CheckCircle, Clock, BarChart3, PieChart, Activity, UserCheck,
    GraduationCap, ClipboardList, Target, Zap, Eye, FileText, MessageSquare, Send, X, Plus
} from 'lucide-react';
import AttendanceManagement from './AttendanceManagement';
import TeacherCommunications from './teacher-comms/TeacherCommunications';
import NoticeBoardSimple from './NoticeBoardSimple';
import TeacherCommunityGroup from './TeacherCommunityGroup';
import ClassAnalyticsDashboard from './ClassAnalyticsDashboard';
import { getClassById, getClassPerformanceMetrics, getUpcomingAssessments } from '../data/classData';

const ClassTeacherView = ({ user, students, teachers, subjects, attendanceRecords, assignments, submissions, onUpdateAttendance, classes, notices = [] }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageRecipient, setMessageRecipient] = useState(null);
    const [messageData, setMessageData] = useState({ subject: '', message: '', priority: 'normal' });
    
    // Class Creation State
    const [showCreateClassModal, setShowCreateClassModal] = useState(false);
    const [classFormData, setClassFormData] = useState({
        className: '',
        section: '',
        grade: '',
        description: '',
        maxStudents: 40,
        subjectTeachers: [],
        roomNumber: '',
        schedule: '',
        classCode: ''
    });
    const [createdClasses, setCreatedClasses] = useState([]);

    // Filter students in this class teacher's class
    const classStudents = useMemo(() =>
        students.filter(s => s.classId === user.classId),
        [students, user.classId]
    );

    // Get class info
    const classInfo = useMemo(() => {
        const classes = [
            { id: 'C101', name: 'Class 10', section: 'A' },
            { id: 'C102', name: 'Class 10', section: 'B' },
            { id: 'C103', name: 'Class 11', section: 'A' }
        ];
        return classes.find(c => c.id === user.classId) || { name: 'Unknown Class', section: 'N/A' };
    }, [user.classId]);

    // Calculate attendance statistics
    const attendanceStats = useMemo(() => {
        const classAttendance = attendanceRecords.filter(record =>
            classStudents.some(s => s.id === record.studentId)
        );

        const total = classAttendance.length;
        const present = classAttendance.filter(r => r.status === 'Present').length;
        const absent = classAttendance.filter(r => r.status === 'Absent').length;
        const late = classAttendance.filter(r => r.status === 'Late').length;

        return {
            total,
            present,
            absent,
            late,
            percentage: total > 0 ? ((present / total) * 100).toFixed(1) : 0
        };
    }, [attendanceRecords, classStudents]);

    // Calculate student progress stats
    const progressStats = useMemo(() => {
        const avgProgress = classStudents.reduce((sum, s) => sum + s.progress, 0) / classStudents.length || 0;
        const onTrack = classStudents.filter(s => s.status === 'On Track').length;
        const ahead = classStudents.filter(s => s.status === 'Ahead').length;
        const atRisk = classStudents.filter(s => s.status === 'At Risk').length;

        return { avgProgress: avgProgress.toFixed(1), onTrack, ahead, atRisk };
    }, [classStudents]);

    // Get subject teachers for this class
    const subjectTeachers = useMemo(() => {
        if (!subjects || subjects.length === 0) return teachers;
        return teachers.filter(t => 
            t.subjects && t.subjects.some(subId =>
                subjects.find(sub => sub.id === subId)
            )
        );
    }, [teachers, subjects]);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'createClass', label: 'Create Class', icon: Plus },
        { id: 'teachers', label: 'Subject Teachers', icon: Users },
        { id: 'community', label: 'Teacher Community', icon: MessageSquare },
        { id: 'attendance', label: 'Attendance', icon: Calendar },
        { id: 'attendanceManagement', label: 'Mark Attendance', icon: UserCheck },
        { id: 'progress', label: 'Student Progress', icon: TrendingUp },
        { id: 'communications', label: 'Communications', icon: MessageSquare },
        { id: 'analytics', label: 'Analytics', icon: PieChart }
    ];

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    // Message handling functions
    const handleOpenMessage = (teacher) => {
        setMessageRecipient(teacher);
        setShowMessageModal(true);
    };

    const handleSendMessage = () => {
        // In a real app, this would send the message to a backend
        console.log('Sending message to:', messageRecipient.name);
        console.log('Message data:', messageData);

        // Show success notification (you can integrate with your notification system)
        alert(`Message sent successfully to ${messageRecipient.name}!`);

        // Reset and close
        setShowMessageModal(false);
        setMessageData({ subject: '', message: '', priority: 'normal' });
        setMessageRecipient(null);
    };

    const handleCloseMessage = () => {
        setShowMessageModal(false);
        setMessageData({ subject: '', message: '', priority: 'normal' });
        setMessageRecipient(null);
    };

    // Class Creation Functions
    const generateClassCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };

    const handleCreateClass = () => {
        const newClass = {
            id: `C${Date.now()}`,
            ...classFormData,
            classCode: generateClassCode(),
            createdBy: user.name,
            createdAt: new Date().toISOString(),
            status: 'active',
            currentStudents: 0
        };

        setCreatedClasses([...createdClasses, newClass]);
        setShowCreateClassModal(false);
        setClassFormData({
            className: '',
            section: '',
            grade: '',
            description: '',
            maxStudents: 40,
            subjectTeachers: [],
            roomNumber: '',
            schedule: '',
            classCode: ''
        });

        alert(`Class created successfully! Class Code: ${newClass.classCode}`);
    };

    const handleAddTeacherToClass = (teacherId) => {
        const teacher = teachers.find(t => t.id === teacherId);
        if (teacher && !classFormData.subjectTeachers.includes(teacherId)) {
            setClassFormData({
                ...classFormData,
                subjectTeachers: [...classFormData.subjectTeachers, teacherId]
            });
        }
    };

    const handleRemoveTeacherFromClass = (teacherId) => {
        setClassFormData({
            ...classFormData,
            subjectTeachers: classFormData.subjectTeachers.filter(id => id !== teacherId)
        });
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Class Teacher Dashboard</h1>
                        <p className="text-purple-100 text-lg">
                            {classInfo.name} - Section {classInfo.section}
                        </p>
                        <p className="text-purple-200 text-sm mt-1">Welcome, {user.name}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                        <GraduationCap className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{classStudents.length}</p>
                        <p className="text-sm text-purple-100">Total Students</p>
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
                {activeTab === 'createClass' && (
                    <motion.div
                        key="createClass"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Plus className="w-6 h-6 text-purple-500" />
                                Create New Class Room
                            </h3>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Class Basic Info */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Class Name
                                        </label>
                                        <input
                                            type="text"
                                            value={classFormData.className}
                                            onChange={(e) => setClassFormData({...classFormData, className: e.target.value})}
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="e.g., Mathematics 101"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Grade Level
                                        </label>
                                        <select
                                            value={classFormData.grade}
                                            onChange={(e) => setClassFormData({...classFormData, grade: e.target.value})}
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="">Select Grade</option>
                                            <option value="Grade 9">Grade 9</option>
                                            <option value="Grade 10">Grade 10</option>
                                            <option value="Grade 11">Grade 11</option>
                                            <option value="Grade 12">Grade 12</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Section
                                        </label>
                                        <input
                                            type="text"
                                            value={classFormData.section}
                                            onChange={(e) => setClassFormData({...classFormData, section: e.target.value})}
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="e.g., A, B, C"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Room Number
                                        </label>
                                        <input
                                            type="text"
                                            value={classFormData.roomNumber}
                                            onChange={(e) => setClassFormData({...classFormData, roomNumber: e.target.value})}
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="e.g., Room 201"
                                        />
                                    </div>
                                </div>
                                
                                {/* Class Details */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={classFormData.description}
                                            onChange={(e) => setClassFormData({...classFormData, description: e.target.value})}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Describe the class objectives and curriculum..."
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Maximum Students
                                        </label>
                                        <input
                                            type="number"
                                            value={classFormData.maxStudents}
                                            onChange={(e) => setClassFormData({...classFormData, maxStudents: parseInt(e.target.value)})}
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            min="1"
                                            max="100"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Schedule
                                        </label>
                                        <input
                                            type="text"
                                            value={classFormData.schedule}
                                            onChange={(e) => setClassFormData({...classFormData, schedule: e.target.value})}
                                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="e.g., Mon-Wed 9:00 AM - 2:00 PM"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Generated Class Code
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={classFormData.classCode || generateClassCode()}
                                                readOnly
                                                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-mono text-center"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setClassFormData({...classFormData, classCode: generateClassCode()})}
                                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                            >
                                                Regenerate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Subject Teachers Selection */}
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Assign Subject Teachers</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {teachers.filter(t => t.role !== 'Class Teacher').map((teacher) => {
                                        const isSelected = classFormData.subjectTeachers.includes(teacher.id);
                                        const teacherSubject = subjects.find(s => s.id === teacher.subjects[0]);
                                        
                                        return (
                                            <div
                                                key={teacher.id}
                                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                    isSelected 
                                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                                                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                                }`}
                                                onClick={() => isSelected ? handleRemoveTeacherFromClass(teacher.id) : handleAddTeacherToClass(teacher.id)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                                            {teacher.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <h5 className="font-semibold text-slate-900 dark:text-white text-sm">{teacher.name}</h5>
                                                            <p className="text-xs text-slate-600 dark:text-slate-400">{teacherSubject?.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                                        isSelected 
                                                            ? 'bg-purple-600 border-purple-600' 
                                                            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                                                    }`}>
                                                        {isSelected ? (
                                                            <CheckCircle className="w-4 h-4 text-white" />
                                                        ) : (
                                                            <Plus className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateClassModal(false)}
                                    className="px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCreateClass}
                                    disabled={!classFormData.className || !classFormData.grade || !classFormData.section}
                                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                >
                                    Create Class Room
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                icon={Users}
                                label="Total Students"
                                value={classStudents.length}
                                color="blue"
                                trend="+2 this month"
                            />
                            <StatCard
                                icon={CheckCircle}
                                label="Attendance Rate"
                                value={`${attendanceStats.percentage}%`}
                                color="green"
                                trend={attendanceStats.percentage >= 85 ? 'Excellent' : 'Needs Attention'}
                            />
                            <StatCard
                                icon={TrendingUp}
                                label="Avg. Progress"
                                value={`${progressStats.avgProgress}%`}
                                color="purple"
                                trend={`${progressStats.onTrack} on track`}
                            />
                            <StatCard
                                icon={AlertCircle}
                                label="At Risk Students"
                                value={progressStats.atRisk}
                                color="red"
                                trend="Requires attention"
                            />
                        </div>

                        {/* Student Status Distribution */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-purple-500" />
                                    Student Performance Status
                                </h3>
                                <div className="space-y-3">
                                    <StatusBar label="Ahead" count={progressStats.ahead} total={classStudents.length} color="emerald" />
                                    <StatusBar label="On Track" count={progressStats.onTrack} total={classStudents.length} color="blue" />
                                    <StatusBar label="At Risk" count={progressStats.atRisk} total={classStudents.length} color="red" />
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-indigo-500" />
                                    Recent Activity
                                </h3>
                                <div className="space-y-3">
                                    {classStudents.slice(0, 5).map((student) => (
                                        <div key={student.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                                    {student.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white text-sm">{student.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Last active: {student.lastActive}</p>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${student.status === 'Ahead' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                student.status === 'On Track' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                }`}>
                                                {student.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'teachers' && (
                    <motion.div
                        key="teachers"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Users className="w-6 h-6 text-purple-500" />
                                Subject Teachers Activity
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {subjectTeachers.map((teacher) => {
                                    const teacherSubject = subjects.find(s => s.id === teacher.subjects[0]);
                                    const isExpanded = selectedTeacher === teacher.id;
                                    const teacherAssignments = assignments.filter(a => a.subjectId === teacher.subjects[0]);
                                    const activeAssignments = teacherAssignments.filter(a => new Date(a.dueDate) >= new Date());

                                    // Mock activity data
                                    const recentActivities = [
                                        { type: 'assignment', action: 'Created new assignment', item: teacherAssignments[0]?.title || 'Problem Set', time: '2 hours ago' },
                                        { type: 'attendance', action: 'Marked attendance', item: 'Class session', time: '5 hours ago' },
                                        { type: 'grading', action: 'Graded submissions', item: '12 assignments', time: '1 day ago' },
                                        { type: 'assignment', action: 'Updated deadline', item: teacherAssignments[1]?.title || 'Lab Report', time: '2 days ago' }
                                    ];

                                    return (
                                        <div key={teacher.id} className={`p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl border transition-all ${isExpanded ? 'border-purple-300 dark:border-purple-700 shadow-lg' : 'border-slate-200 dark:border-slate-700'}`}>
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                                                        {teacher.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 dark:text-white">{teacher.name}</h4>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400">{teacherSubject?.name}</p>
                                                    </div>
                                                </div>
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-bold"
                                                    style={{
                                                        backgroundColor: `${teacherSubject?.color}20`,
                                                        color: teacherSubject?.color
                                                    }}
                                                >
                                                    {teacherSubject?.code}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg">
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Assignments</p>
                                                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                                                        {teacherAssignments.length}
                                                    </p>
                                                </div>
                                                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg">
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Active</p>
                                                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                                        {activeAssignments.length}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-3">
                                                <button
                                                    onClick={() => setSelectedTeacher(isExpanded ? null : teacher.id)}
                                                    className="flex items-center justify-center gap-2 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>{isExpanded ? 'Hide' : 'View'}</span>
                                                </button>
                                                <button
                                                    onClick={() => handleOpenMessage(teacher)}
                                                    className="flex items-center justify-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                >
                                                    <Send className="w-4 h-4" />
                                                    <span>Message</span>
                                                </button>
                                            </div>

                                            {/* Expanded Activity View */}
                                            {isExpanded && (
                                                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3 animate-in slide-in-from-top-2 fade-in">
                                                    <h5 className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-3">Recent Activities</h5>
                                                    {recentActivities.map((activity, idx) => (
                                                        <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === 'assignment' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                                                activity.type === 'attendance' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                                                                    'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                                                }`}>
                                                                {activity.type === 'assignment' ? <FileText className="w-4 h-4" /> :
                                                                    activity.type === 'attendance' ? <CheckCircle className="w-4 h-4" /> :
                                                                        <ClipboardList className="w-4 h-4" />}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.action}</p>
                                                                <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{activity.item}</p>
                                                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{activity.time}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'community' && (
                    <motion.div
                        key="community"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <TeacherCommunityGroup teachers={teachers} user={user} />
                    </motion.div>
                )}

                {activeTab === 'attendance' && (
                    <motion.div
                        key="attendance"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-purple-500" />
                                Attendance Overview
                            </h3>

                            {/* Attendance Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-green-600 dark:text-green-400">Present</p>
                                            <p className="text-2xl font-bold text-green-700 dark:text-green-300">{attendanceStats.present}</p>
                                        </div>
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-red-600 dark:text-red-400">Absent</p>
                                            <p className="text-2xl font-bold text-red-700 dark:text-red-300">{attendanceStats.absent}</p>
                                        </div>
                                        <AlertCircle className="w-8 h-8 text-red-500" />
                                    </div>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Late</p>
                                            <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{attendanceStats.late}</p>
                                        </div>
                                        <Clock className="w-8 h-8 text-amber-500" />
                                    </div>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Rate</p>
                                            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{attendanceStats.percentage}%</p>
                                        </div>
                                        <BarChart3 className="w-8 h-8 text-purple-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Student-wise Attendance */}
                            <div className="space-y-3">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-300">Student-wise Attendance</h4>
                                {classStudents.map((student) => {
                                    const studentAttendance = attendanceRecords.filter(r => r.studentId === student.id);
                                    const studentPresent = studentAttendance.filter(r => r.status === 'Present').length;
                                    const studentTotal = studentAttendance.length;
                                    const studentRate = studentTotal > 0 ? ((studentPresent / studentTotal) * 100).toFixed(1) : 0;

                                    return (
                                        <div key={student.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                                        {student.avatar}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">{student.id}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{studentRate}%</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{studentPresent}/{studentTotal} days</p>
                                                </div>
                                            </div>
                                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${studentRate >= 85 ? 'bg-green-500' :
                                                        studentRate >= 70 ? 'bg-amber-500' :
                                                            'bg-red-500'
                                                        }`}
                                                    style={{ width: `${studentRate}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'progress' && (
                    <motion.div
                        key="progress"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-purple-500" />
                                Student Progress Tracking
                            </h3>
                            <div className="space-y-4">
                                {classStudents.map((student) => {
                                    const studentSubmissions = submissions.filter(sub => sub.studentId === student.id);
                                    const gradedSubmissions = studentSubmissions.filter(sub => sub.status === 'Graded');

                                    return (
                                        <div key={student.id} className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                                                        {student.avatar}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 dark:text-white">{student.name}</h4>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400">{student.email}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.status === 'Ahead' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                    student.status === 'On Track' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                    {student.status}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3 mb-3">
                                                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-center">
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Progress</p>
                                                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{student.progress}%</p>
                                                </div>
                                                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-center">
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Submissions</p>
                                                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{studentSubmissions.length}</p>
                                                </div>
                                                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-center">
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Graded</p>
                                                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{gradedSubmissions.length}</p>
                                                </div>
                                            </div>

                                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                                                <div
                                                    className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                                    style={{ width: `${student.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'attendanceManagement' && (
                    <motion.div
                        key="attendanceManagement"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <AttendanceManagement
                            attendanceRecords={attendanceRecords || []}
                            students={classStudents}
                            classes={classes || []}
                            subjects={subjects}
                            onUpdateAttendance={onUpdateAttendance}
                        />
                    </motion.div>
                )}

                {activeTab === 'communications' && (
                    <motion.div
                        key="communications"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <TeacherCommunications students={classStudents} />
                    </motion.div>
                )}

                {activeTab === 'analytics' && (
                    <motion.div
                        key="analytics"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <ClassAnalyticsDashboard />
                    </motion.div>
                )}

            {/* Message Modal */}
            {showMessageModal && messageRecipient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"><Send className="w-6 h-6" /></div>
                                    <div>
                                        <h3 className="text-xl font-bold">Send Message</h3>
                                        <p className="text-sm text-blue-100">To: {messageRecipient.name}</p>
                                    </div>
                                </div>
                                <button onClick={handleCloseMessage} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">{messageRecipient.name.split(' ').map(n => n[0]).join('')}</div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">{messageRecipient.name}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{subjects.find(s => s.id === messageRecipient.subjects[0])?.name || 'Subject Teacher'}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Priority</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['normal', 'important', 'urgent'].map((priority) => (
                                        <button key={priority} onClick={() => setMessageData({ ...messageData, priority })} className={`py-2 px-4 rounded-lg font-medium text-sm transition-all ${messageData.priority === priority ? priority === 'urgent' ? 'bg-red-500 text-white' : priority === 'important' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                                <input type="text" value={messageData.subject} onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })} placeholder="Enter message subject..." className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                                <textarea value={messageData.message} onChange={(e) => setMessageData({ ...messageData, message: e.target.value })} placeholder="Type your message here..." rows={6} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quick Templates</label>
                                <div className="flex flex-wrap gap-2">
                                    <button onClick={() => setMessageData({ ...messageData, subject: 'Student Progress Discussion', message: 'I would like to discuss the progress of some students in your class. Please let me know when you are available for a meeting.' })} className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Progress Discussion</button>
                                    <button onClick={() => setMessageData({ ...messageData, subject: 'Assignment Coordination', message: 'I wanted to coordinate with you regarding upcoming assignments to ensure balanced workload for students.' })} className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Assignment Coordination</button>
                                    <button onClick={() => setMessageData({ ...messageData, subject: 'Parent Meeting Request', message: 'We need to schedule a parent meeting to discuss student performance. Could you please share your availability?' })} className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Parent Meeting</button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-b-2xl flex gap-3 justify-end">
                            <button onClick={handleCloseMessage} className="px-6 py-2.5 rounded-lg font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors border border-slate-300 dark:border-slate-600">Cancel</button>
                            <button onClick={handleSendMessage} disabled={!messageData.subject || !messageData.message} className="px-6 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
            
            </AnimatePresence>
            
            {/* Notice Board */}
            <div className="mt-8">
                <NoticeBoardSimple userRole="classTeacher" />
            </div>
        </div>
    );
};

// Helper Components
const StatCard = ({ icon: Icon, label, value, color, trend }) => {
    const colorClasses = {
        blue: 'from-blue-500 to-indigo-500',
        green: 'from-green-500 to-emerald-500',
        purple: 'from-purple-500 to-indigo-500',
        red: 'from-red-500 to-orange-500'
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{value}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">{trend}</p>
        </div>
    );
};

const StatusBar = ({ label, count, total, color }) => {
    const percentage = (count / total) * 100;
    const colorClasses = {
        emerald: 'bg-emerald-500',
        blue: 'bg-blue-500',
        red: 'bg-red-500'
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{count}/{total}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <div
                    className={`h-2.5 rounded-full ${colorClasses[color]}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default ClassTeacherView;
