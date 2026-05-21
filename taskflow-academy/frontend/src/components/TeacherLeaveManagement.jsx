import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Clock, User, AlertTriangle, CheckCircle, Bell,
    Send, FileText, Brain, Users, MessageSquare, X, Plus,
    Search, Filter, Download, Upload, Zap, RefreshCw,
    BookOpen, TrendingUp, BarChart3
} from 'lucide-react';
import { EMERGENCY_TIMETABLE_KEY } from './EmergencyTimetable';

const TeacherLeaveManagement = ({ user, teachers, subjects, onLeaveSubmit }) => {
    const [activeTab, setActiveTab] = useState('apply');
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [substituteSuggestions, setSubstituteSuggestions] = useState([]);
    const [showSubstituteModal, setShowSubstituteModal] = useState(false);
    const [selectedLeaveRequest, setSelectedLeaveRequest] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [activeAlarm, setActiveAlarm] = useState(null);
    const [aiAgentRunning, setAiAgentRunning] = useState(false);
    const [aiAgentLog, setAiAgentLog] = useState([]);
    const [generatedTimetable, setGeneratedTimetable] = useState(null);
    const [timetablePublished, setTimetablePublished] = useState(false);
    
    // Form state for new leave request
    const [leaveFormData, setLeaveFormData] = useState({
        teacherId: user.id,
        teacherName: user.name,
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
        emergencyContact: '',
        alternateArrangements: '',
        documents: [],
        priority: 'medium',
        notifyAdmin: true,
        notifyHOD: true
    });

    // Mock timetable data for AI analysis
    const mockTimetable = {
        Monday: [
            { time: '9:00-10:00', subject: 'Mathematics', teacher: 'Dr. Smith', class: '10A' },
            { time: '10:00-11:00', subject: 'Physics', teacher: 'Dr. Johnson', class: '10A' },
            { time: '11:00-12:00', subject: 'Chemistry', teacher: 'Dr. Williams', class: '10A' }
        ],
        Tuesday: [
            { time: '9:00-10:00', subject: 'Computer Science', teacher: 'Dr. Brown', class: '10A' },
            { time: '10:00-11:00', subject: 'Mathematics', teacher: 'Dr. Smith', class: '10A' },
            { time: '11:00-12:00', subject: 'English', teacher: 'Dr. Davis', class: '10A' }
        ],
        Wednesday: [
            { time: '9:00-10:00', subject: 'Physics', teacher: 'Dr. Johnson', class: '10A' },
            { time: '10:00-11:00', subject: 'Chemistry', teacher: 'Dr. Williams', class: '10A' },
            { time: '11:00-12:00', subject: 'Computer Science', teacher: 'Dr. Brown', class: '10A' }
        ]
    };

    const leaveTypes = [
        { id: 'sick', label: 'Sick Leave', description: 'Medical reasons with doctor certificate' },
        { id: 'personal', label: 'Personal Leave', description: 'Personal emergencies or family matters' },
        { id: 'professional', label: 'Professional Development', description: 'Conferences, workshops, training' },
        { id: 'maternity', label: 'Maternity/Paternity', description: 'Childcare and family leave' },
        { id: 'vacation', label: 'Vacation', description: 'Planned time off with prior approval' }
    ];

    // ─── AI Agent: Mock teacher syllabus data ──────────────────────────────────
    const mockTeacherSyllabus = [
        { id: 't1', name: 'Dr. Patel',    subject: 'Mathematics',      syllabusProgress: 35, rating: 4.5, workload: 4 },
        { id: 't2', name: 'Dr. Sharma',   subject: 'Physics',          syllabusProgress: 72, rating: 4.2, workload: 6 },
        { id: 't3', name: 'Dr. Kumar',    subject: 'Chemistry',        syllabusProgress: 48, rating: 3.9, workload: 7 },
        { id: 't4', name: 'Dr. Verma',    subject: 'Computer Science', syllabusProgress: 61, rating: 4.7, workload: 5 },
        { id: 't5', name: 'Dr. Gupta',    subject: 'English',          syllabusProgress: 88, rating: 4.1, workload: 8 },
        { id: 't6', name: 'Dr. Joshi',    subject: 'History',          syllabusProgress: 29, rating: 4.3, workload: 3 },
    ];

    const mockBaseSchedule = {
        Monday:    [ { time: '9:00-10:00',  subject: 'Mathematics',      class: '10A' }, { time: '10:00-11:00', subject: 'Physics',          class: '10A' }, { time: '11:00-12:00', subject: 'Chemistry',        class: '10A' } ],
        Tuesday:   [ { time: '9:00-10:00',  subject: 'Computer Science', class: '10A' }, { time: '10:00-11:00', subject: 'Mathematics',      class: '10A' }, { time: '11:00-12:00', subject: 'English',          class: '10A' } ],
        Wednesday: [ { time: '9:00-10:00',  subject: 'Physics',          class: '10A' }, { time: '10:00-11:00', subject: 'Chemistry',        class: '10A' }, { time: '11:00-12:00', subject: 'Computer Science', class: '10A' } ],
        Thursday:  [ { time: '9:00-10:00',  subject: 'History',          class: '10A' }, { time: '10:00-11:00', subject: 'Mathematics',      class: '10A' }, { time: '11:00-12:00', subject: 'Physics',          class: '10A' } ],
        Friday:    [ { time: '9:00-10:00',  subject: 'English',          class: '10A' }, { time: '10:00-11:00', subject: 'Chemistry',        class: '10A' }, { time: '11:00-12:00', subject: 'History',          class: '10A' } ],
    };

    // ─── AI Agent runner ───────────────────────────────────────────────────────
    const runAiAgent = async (leaveRequest) => {
        setAiAgentRunning(true);
        setAiAgentLog([]);
        setGeneratedTimetable(null);
        setTimetablePublished(false);

        const log = (msg, type = 'info') => {
            setAiAgentLog(prev => [...prev, { msg, type, ts: new Date().toLocaleTimeString() }]);
        };

        const delay = (ms) => new Promise(r => setTimeout(r, ms));

        log('🤖 AI Agent initialised. Scanning syllabus database...');
        await delay(700);

        // Step 1: Sort teachers by syllabus lag (lowest progress = most lagging)
        const sortedByLag = [...mockTeacherSyllabus].sort((a, b) => a.syllabusProgress - b.syllabusProgress);
        log(`📊 Found ${sortedByLag.length} teachers. Most lagging: ${sortedByLag[0].name} (${sortedByLag[0].syllabusProgress}% done)`, 'success');
        await delay(600);

        // Step 2: Identify absent teacher subject
        const absentTeacherName = leaveRequest?.teacherName || user.name;
        log(`🔍 Identifying lectures affected by ${absentTeacherName}'s absence...`);
        await delay(700);

        // Step 3: Build emergency schedule
        const schedule = [];
        const affectedDays = Object.keys(mockBaseSchedule);
        let substituteLectures = 0;
        let catchUpLectures = 0;

        for (const day of affectedDays) {
            const lectures = mockBaseSchedule[day].map(slot => {
                // The absent teacher's subject needs a substitute
                const isAbsentSubject = sortedByLag[sortedByLag.length - 1]?.subject === slot.subject;

                if (isAbsentSubject) {
                    // Find the teacher with most lagging syllabus who can cover this subject
                    const catchUpTeacher = sortedByLag.find(t => t.id !== 't5') || sortedByLag[0];
                    substituteLectures++;
                    return {
                        ...slot,
                        teacher: catchUpTeacher.name,
                        type: 'substitute',
                        syllabusProgress: null,
                    };
                }

                // Assign extra lecture to teacher with lowest syllabus progress
                const mostLagging = sortedByLag[0];
                if (mostLagging.subject !== slot.subject && Math.random() > 0.6) {
                    catchUpLectures++;
                    return {
                        ...slot,
                        teacher: mostLagging.name,
                        type: 'syllabus_catch_up',
                        syllabusProgress: mostLagging.syllabusProgress,
                        originalSubject: slot.subject,
                    };
                }

                const regularTeacher = mockTeacherSyllabus.find(t => t.subject === slot.subject) || mockTeacherSyllabus[0];
                return {
                    ...slot,
                    teacher: regularTeacher.name,
                    type: 'regular',
                    syllabusProgress: regularTeacher.syllabusProgress,
                };
            });

            const hasChanges = lectures.some(l => l.type !== 'regular');
            const dateOffset = affectedDays.indexOf(day);
            const date = new Date();
            date.setDate(date.getDate() + dateOffset);

            schedule.push({
                day,
                date: date.toLocaleDateString(),
                lectures,
                hasChanges,
            });
        }

        log(`📅 Emergency schedule generated for ${affectedDays.length} days.`, 'success');
        await delay(500);
        log(`🔄 ${substituteLectures} substitute slots assigned.`, 'success');
        log(`📚 ${catchUpLectures} syllabus catch-up slots assigned to lagging teachers.`, 'success');
        await delay(500);

        // Step 4: Calculate confidence
        const confidence = Math.min(95, 60 + sortedByLag.filter(t => t.syllabusProgress < 60).length * 7);
        log(`🎯 AI confidence score: ${confidence}%`, 'success');
        await delay(400);
        log('✅ Emergency timetable ready. Click "Publish to Students" to broadcast.', 'success');

        const timetable = {
            absentTeacher: absentTeacherName,
            startDate: leaveRequest?.startDate || new Date().toISOString().split('T')[0],
            endDate: leaveRequest?.endDate || new Date().toISOString().split('T')[0],
            reason: leaveRequest?.reason || 'Teacher absence',
            generatedAt: new Date().toISOString(),
            aiConfidence: confidence,
            schedule,
            summary: {
                affectedLectures: substituteLectures + catchUpLectures,
                substituteLectures,
                catchUpLectures,
                teachersNotified: sortedByLag.length,
            },
            syllabusRanking: sortedByLag,
        };

        setGeneratedTimetable(timetable);
        setAiAgentRunning(false);
    };

    const publishTimetable = () => {
        if (!generatedTimetable) return;
        localStorage.setItem(EMERGENCY_TIMETABLE_KEY, JSON.stringify(generatedTimetable));
        setTimetablePublished(true);
        setActiveAlarm(`🚨 Emergency timetable published! Students on the portal can now see the updated schedule.`);
        setTimeout(() => setActiveAlarm(null), 8000);
    };

    // AI-powered timetable analysis
    const analyzeTimetableAndFindSubstitutes = async (leaveRequest) => {
        setIsAnalyzing(true);
        
        // Simulate AI processing
        setTimeout(() => {
            const affectedLectures = getAffectedLectures(leaveRequest);
            const availableTeachers = findAvailableTeachers(affectedLectures);
            
            const suggestions = availableTeachers.map(teacher => ({
                ...teacher,
                confidence: calculateConfidenceScore(teacher, affectedLectures),
                recommendedAction: generateRecommendedAction(teacher, affectedLectures),
                affectedLectures: affectedLectures.filter(lecture => 
                    teacher.subjects.includes(lecture.subject) || 
                    teacher.expertise?.includes(lecture.subject)
                )
            })).sort((a, b) => b.confidence - a.confidence);

            setSubstituteSuggestions(suggestions);
            setIsAnalyzing(false);
            setShowSubstituteModal(true);
        }, 2000);
    };

    const getAffectedLectures = (leaveRequest) => {
        const start = new Date(leaveRequest.startDate);
        const end = new Date(leaveRequest.endDate);
        const affected = [];
        
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dayName = days[d.getDay() - 1];
            if (dayName && mockTimetable[dayName]) {
                mockTimetable[dayName].forEach(lecture => {
                    if (lecture.teacher === leaveRequest.teacherName) {
                        affected.push({
                            ...lecture,
                            date: new Date(d).toISOString().split('T')[0],
                            day: dayName
                        });
                    }
                });
            }
        }
        return affected;
    };

    const findAvailableTeachers = (affectedLectures) => {
        const subjects = [...new Set(affectedLectures.map(l => l.subject))];
        
        return teachers.filter(teacher => {
            if (teacher.id === leaveFormData.teacherId) return false;
            
            const hasSubjectExpertise = subjects.some(subject => 
                teacher.subjects.includes(subject) || 
                teacher.expertise?.includes(subject)
            );
            
            const isAvailable = Math.random() > 0.3; // Simulate availability check
            
            return hasSubjectExpertise && isAvailable;
        }).map(teacher => ({
            ...teacher,
            availability: generateMockAvailability(affectedLectures),
            workload: Math.floor(Math.random() * 10) + 1,
            rating: (Math.random() * 2 + 3).toFixed(1),
            syllabusProgress: Math.floor(Math.random() * 60) + 30 // Simulate 30% to 90% syllabus completion
        }));
    };

    const calculateConfidenceScore = (teacher, lectures) => {
        let score = 0;
        
        // Subject expertise match (30% weight)
        const subjectMatch = lectures.filter(l => 
            teacher.subjects.includes(l.subject) || 
            teacher.expertise?.includes(l.subject)
        ).length;
        score += (subjectMatch / lectures.length) * 30;
        
        // Syllabus Lagging - Lower progress means HIGHER priority (30% weight)
        // If syllabus is 30%, (100-30)=70. 70/100 * 30 = 21 points
        // If syllabus is 90%, (100-90)=10. 10/100 * 30 = 3 points
        const laggingScore = (100 - (teacher.syllabusProgress || 100)) / 100;
        score += laggingScore * 30;
        
        // Availability score (20% weight)
        score += (teacher.availability / 100) * 20;
        
        // Workload consideration (10% weight)
        score += ((10 - teacher.workload) / 10) * 10;
        
        // Rating score (10% weight)
        score += ((teacher.rating - 3) / 2) * 10;
        
        return Math.min(100, Math.max(0, score));
    };

    const generateRecommendedAction = (teacher, lectures) => {
        const confidence = calculateConfidenceScore(teacher, lectures);
        
        if (confidence >= 80) {
            return 'Highly Recommended - Excellent match and availability';
        } else if (confidence >= 60) {
            return 'Recommended - Good match with minor scheduling adjustments';
        } else if (confidence >= 40) {
            return 'Consider - May require additional support';
        } else {
            return 'Last Resort - Limited availability or expertise';
        }
    };

    const generateMockAvailability = (lectures) => {
        return Math.floor(Math.random() * 100);
    };

    const handleSubmitLeave = async () => {
        const newLeaveRequest = {
            id: `leave-${Date.now()}`,
            ...leaveFormData,
            status: 'pending',
            submittedAt: new Date().toISOString(),
            submittedBy: user.name
        };

        setLeaveRequests([newLeaveRequest, ...leaveRequests]);
        
        // Trigger AI analysis
        await analyzeTimetableAndFindSubstitutes(newLeaveRequest);
        
        // Trigger absence alarm
        setActiveAlarm(`🚨 ALARM: ${user.name} is marked ABSENT from ${leaveFormData.startDate} to ${leaveFormData.endDate}. Class Teachers have been notified.`);
        setTimeout(() => setActiveAlarm(null), 10000); // Clear alarm after 10 seconds

        // Notify parent component
        if (onLeaveSubmit) {
            onLeaveSubmit({
                ...newLeaveRequest,
                notifyClassTeacher: true // Automatically notify class teacher
            });
        }

        // Reset form
        setLeaveFormData({
            teacherId: user.id,
            teacherName: user.name,
            leaveType: '',
            startDate: '',
            endDate: '',
            reason: '',
            emergencyContact: '',
            alternateArrangements: '',
            documents: [],
            priority: 'medium',
            notifyAdmin: true,
            notifyHOD: true
        });

        setActiveTab('history');
    };

    const handleSendSubstituteRequest = (substitute, leaveRequest) => {
        const notification = {
            id: `notif-${Date.now()}`,
            type: 'substitute_request',
            recipient: substitute,
            leaveRequest: leaveRequest,
            message: `Dear ${substitute.name}, you have been requested to substitute for ${leaveRequest.teacherName} from ${leaveRequest.startDate} to ${leaveRequest.endDate}. Please confirm your availability.`,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        console.log('Sending substitute notification:', notification);
        alert(`Substitute request sent to ${substitute.name}!`);
        
        setShowSubstituteModal(false);
    };

    const tabs = [
        { id: 'apply', label: 'Apply for Leave', icon: Plus },
        { id: 'history', label: 'Leave History', icon: FileText },
        { id: 'substitutes', label: 'Substitute Management', icon: Users },
        { id: 'aiAgent', label: 'AI Agent', icon: Brain },
    ];

    return (
        <div className="space-y-6">
            {/* Alarm Banner */}
            <AnimatePresence>
                {activeAlarm && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="bg-red-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-between border-2 border-red-600 animate-pulse"
                    >
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-8 h-8" />
                            <div>
                                <h3 className="font-bold text-lg">Staff Absence Alert</h3>
                                <p className="text-red-100 font-medium">{activeAlarm}</p>
                            </div>
                        </div>
                        <button onClick={() => setActiveAlarm(null)} className="p-2 hover:bg-red-600 rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Teacher Leave Management</h1>
                        <p className="text-indigo-100 text-lg">
                            AI-powered substitute arrangement system
                        </p>
                        <p className="text-indigo-200 text-sm mt-1">Welcome, {user.name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                            <Brain className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-2xl font-bold">AI Active</p>
                            <p className="text-sm text-indigo-100">Smart Analysis</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                            <Users className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-2xl font-bold">{substituteSuggestions.length}</p>
                            <p className="text-sm text-indigo-100">Available</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all
                                ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }
                            `}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'apply' && (
                    <motion.div
                        key="apply"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg"
                    >
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-indigo-500" />
                            Apply for Leave
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Leave Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={leaveFormData.leaveType}
                                        onChange={(e) => setLeaveFormData({...leaveFormData, leaveType: e.target.value})}
                                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">Select Leave Type</option>
                                        {leaveTypes.map(type => (
                                            <option key={type.id} value={type.id}>{type.label}</option>
                                        ))}
                                    </select>
                                    {leaveFormData.leaveType && (
                                        <p className="mt-1 text-xs text-slate-500">
                                            {leaveTypes.find(t => t.id === leaveFormData.leaveType)?.description}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Start Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={leaveFormData.startDate}
                                            onChange={(e) => setLeaveFormData({...leaveFormData, startDate: e.target.value})}
                                            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            End Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={leaveFormData.endDate}
                                            onChange={(e) => setLeaveFormData({...leaveFormData, endDate: e.target.value})}
                                            min={leaveFormData.startDate}
                                            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Reason for Leave <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={leaveFormData.reason}
                                        onChange={(e) => setLeaveFormData({...leaveFormData, reason: e.target.value})}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 resize-none"
                                        placeholder="Please provide detailed reason for your leave request..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Emergency Contact
                                    </label>
                                    <input
                                        type="text"
                                        value={leaveFormData.emergencyContact}
                                        onChange={(e) => setLeaveFormData({...leaveFormData, emergencyContact: e.target.value})}
                                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Name and phone number"
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Alternative Arrangements
                                    </label>
                                    <textarea
                                        value={leaveFormData.alternateArrangements}
                                        onChange={(e) => setLeaveFormData({...leaveFormData, alternateArrangements: e.target.value})}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 resize-none"
                                        placeholder="Any arrangements you've made for your classes during absence..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Priority Level
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['low', 'medium', 'high'].map((priority) => (
                                            <button
                                                key={priority}
                                                type="button"
                                                onClick={() => setLeaveFormData({...leaveFormData, priority})}
                                                className={`
                                                    py-2 px-4 rounded-lg font-medium text-sm transition-all
                                                    ${leaveFormData.priority === priority
                                                        ? priority === 'high' ? 'bg-red-500 text-white' :
                                                          priority === 'medium' ? 'bg-orange-500 text-white' :
                                                          'bg-blue-500 text-white'
                                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                                    }
                                                `}
                                            >
                                                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Supporting Documents
                                    </label>
                                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                                        <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                            Upload medical certificates or other documents
                                        </p>
                                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                                            Choose Files
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={leaveFormData.notifyAdmin}
                                            onChange={(e) => setLeaveFormData({...leaveFormData, notifyAdmin: e.target.checked})}
                                            className="w-4 h-4 text-indigo-500 border-slate-300 rounded focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Notify Administration
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={leaveFormData.notifyHOD}
                                            onChange={(e) => setLeaveFormData({...leaveFormData, notifyHOD: e.target.checked})}
                                            className="w-4 h-4 text-indigo-500 border-slate-300 rounded focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Notify Head of Department
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <button
                                type="button"
                                onClick={() => setLeaveFormData({
                                    teacherId: user.id,
                                    teacherName: user.name,
                                    leaveType: '',
                                    startDate: '',
                                    endDate: '',
                                    reason: '',
                                    emergencyContact: '',
                                    alternateArrangements: '',
                                    documents: [],
                                    priority: 'medium',
                                    notifyAdmin: true,
                                    notifyHOD: true
                                })}
                                className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                Clear Form
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmitLeave}
                                disabled={!leaveFormData.leaveType || !leaveFormData.startDate || !leaveFormData.endDate || !leaveFormData.reason}
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Submit Leave Request
                            </button>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'history' && (
                    <motion.div
                        key="history"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg"
                    >
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-indigo-500" />
                            Leave History
                        </h3>

                        {leaveRequests.length === 0 ? (
                            <div className="text-center py-12">
                                <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                <p className="text-slate-500 dark:text-slate-400">No leave requests found</p>
                                <button
                                    onClick={() => setActiveTab('apply')}
                                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Apply for Leave
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {leaveRequests.map((request) => (
                                    <div key={request.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`
                                                        px-3 py-1 rounded-full text-xs font-bold
                                                        ${request.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                          'bg-red-100 text-red-700'}
                                                    `}>
                                                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                    </span>
                                                    <span className="text-sm text-slate-500">
                                                        {new Date(request.submittedAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                                                    {leaveTypes.find(t => t.id === request.leaveType)?.label}
                                                </h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                                    {request.startDate} to {request.endDate}
                                                </p>
                                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                                    {request.reason}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {activeTab === 'substitutes' && (
                    <motion.div
                        key="substitutes"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Users className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Substitute Management</h3>
                                    <p className="text-teal-100 text-sm mt-1">
                                        View all available teachers, their syllabus progress, and assign substitutes for absent lectures.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Summary Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Total Teachers', value: mockTeacherSyllabus.length, color: 'indigo', icon: Users },
                                { label: 'Below 50% Syllabus', value: mockTeacherSyllabus.filter(t => t.syllabusProgress < 50).length, color: 'red', icon: AlertTriangle },
                                { label: 'On Track (≥65%)', value: mockTeacherSyllabus.filter(t => t.syllabusProgress >= 65).length, color: 'green', icon: CheckCircle },
                                { label: 'Pending Requests', value: leaveRequests.filter(r => r.status === 'pending').length, color: 'amber', icon: Clock },
                            ].map(({ label, value, color, icon: Icon }) => (
                                <div key={label} className={`bg-${color}-50 dark:bg-${color}-900/20 border border-${color}-200 dark:border-${color}-800 rounded-xl p-4 flex items-center gap-3`}>
                                    <Icon className={`w-8 h-8 text-${color}-600 dark:text-${color}-400 flex-shrink-0`} />
                                    <div>
                                        <p className={`text-2xl font-bold text-${color}-700 dark:text-${color}-300`}>{value}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Teacher Cards */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-teal-500" />
                                All Teachers — Syllabus &amp; Availability Overview
                            </h4>
                            <div className="space-y-4">
                                {[...mockTeacherSyllabus]
                                    .sort((a, b) => a.syllabusProgress - b.syllabusProgress)
                                    .map((teacher, idx) => {
                                        const isLagging = teacher.syllabusProgress < 50;
                                        const isModerate = teacher.syllabusProgress >= 50 && teacher.syllabusProgress < 65;
                                        const barColor = isLagging ? 'bg-red-500' : isModerate ? 'bg-amber-500' : 'bg-green-500';
                                        const borderColor = isLagging
                                            ? 'border-red-200 dark:border-red-800'
                                            : isModerate
                                                ? 'border-amber-200 dark:border-amber-800'
                                                : 'border-slate-200 dark:border-slate-700';
                                        const bgColor = isLagging
                                            ? 'bg-red-50 dark:bg-red-900/10'
                                            : isModerate
                                                ? 'bg-amber-50 dark:bg-amber-900/10'
                                                : 'bg-white dark:bg-slate-900';

                                        return (
                                            <div key={teacher.id} className={`p-4 rounded-xl border ${borderColor} ${bgColor} transition-all`}>
                                                <div className="flex flex-wrap items-center gap-4">
                                                    {/* Rank + Avatar */}
                                                    <div className="flex items-center gap-3 flex-shrink-0">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-orange-500' : idx === 2 ? 'bg-amber-500' : 'bg-slate-400'}`}>
                                                            {idx + 1}
                                                        </div>
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                                                            {teacher.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                    </div>

                                                    {/* Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                                            <span className="font-bold text-slate-900 dark:text-white">{teacher.name}</span>
                                                            <span className="text-xs text-slate-500 dark:text-slate-400">{teacher.subject}</span>
                                                            {isLagging && <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-bold">⚠️ Lagging</span>}
                                                            {isModerate && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs font-bold">⚡ Moderate</span>}
                                                            {!isLagging && !isModerate && <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-bold">✅ On Track</span>}
                                                        </div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                                <div className={`h-2 rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${teacher.syllabusProgress}%` }} />
                                                            </div>
                                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 w-10 text-right">{teacher.syllabusProgress}%</span>
                                                        </div>
                                                        <div className="flex gap-4 flex-wrap">
                                                            <span className="text-xs text-slate-500">⭐ Rating: <strong>{teacher.rating}/5</strong></span>
                                                            <span className="text-xs text-slate-500">📋 Workload: <strong>{teacher.workload}/10</strong></span>
                                                            <span className="text-xs text-slate-500">📚 Syllabus: <strong>{teacher.syllabusProgress}%</strong></span>
                                                        </div>
                                                    </div>

                                                    {/* Action Button */}
                                                    <button
                                                        onClick={() => {
                                                            const req = leaveRequests[0] || { teacherName: user.name, startDate: new Date().toISOString().split('T')[0], endDate: new Date().toISOString().split('T')[0] };
                                                            handleSendSubstituteRequest(teacher, req);
                                                        }}
                                                        className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm font-semibold rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all shadow flex items-center gap-2"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                        Request Substitute
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* Pending Leave Requests needing substitutes */}
                        {leaveRequests.length > 0 && (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                                    Pending Leave Requests — Needs Substitute
                                </h4>
                                <div className="space-y-3">
                                    {leaveRequests.map(req => (
                                        <div key={req.id} className="flex flex-wrap items-center justify-between gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">{req.teacherName}</p>
                                                <p className="text-sm text-slate-500">{req.startDate} → {req.endDate} • {leaveTypes.find(t => t.id === req.leaveType)?.label || req.leaveType}</p>
                                                <p className="text-xs text-slate-400 mt-0.5">{req.reason}</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setSelectedLeaveRequest(req);
                                                    analyzeTimetableAndFindSubstitutes(req);
                                                }}
                                                className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                            >
                                                <Brain className="w-4 h-4" />
                                                AI Find Substitute
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {leaveRequests.length === 0 && (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg text-center">
                                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Pending Leave Requests</h4>
                                <p className="text-slate-500 dark:text-slate-400">All teachers are present. Submit a leave request first to manage substitutes.</p>
                                <button
                                    onClick={() => setActiveTab('apply')}
                                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold"
                                >
                                    Apply for Leave
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}

                {activeTab === 'aiAgent' && (
                    <motion.div
                        key="aiAgent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* AI Agent Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Brain className="w-10 h-10" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold">AI Timetable Agent</h3>
                                    <p className="text-purple-100 text-sm">Analyses syllabus ratios → assigns catch-up lectures → generates emergency timetable for students</p>
                                </div>
                                <button
                                    onClick={() => runAiAgent(leaveRequests[0])}
                                    disabled={aiAgentRunning}
                                    className="px-6 py-3 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-2 disabled:opacity-60 shadow-lg"
                                >
                                    {aiAgentRunning
                                        ? <><RefreshCw className="w-5 h-5 animate-spin" />Analysing...</>
                                        : <><Zap className="w-5 h-5" />Run AI Agent</>
                                    }
                                </button>
                            </div>
                        </div>

                        {/* How It Works Steps */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-amber-500" />
                                How the AI Agent Works
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { step: '01', icon: BookOpen, title: 'Scan Syllabus', desc: 'Analyses each teacher\'s syllabus completion percentage from the academic database.', color: 'blue' },
                                    { step: '02', icon: TrendingUp, title: 'Detect Lag', desc: 'Ranks teachers by syllabus completion. Teachers below 50% are flagged as most lagging.', color: 'orange' },
                                    { step: '03', icon: RefreshCw, title: 'Assign Lectures', desc: 'Lagging teachers get extra catch-up slots. The absent teacher\'s lectures get substitutes.', color: 'purple' },
                                    { step: '04', icon: Bell, title: 'Publish to Portal', desc: 'One click broadcasts the emergency timetable to every student\'s portal in real time.', color: 'green' },
                                ].map(({ step, icon: Icon, title, desc, color }) => (
                                    <div key={step} className={`p-4 rounded-xl bg-${color}-50 dark:bg-${color}-900/20 border border-${color}-200 dark:border-${color}-800`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-xs font-black text-${color}-400 dark:text-${color}-500`}>STEP {step}</span>
                                        </div>
                                        <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400 mb-2`} />
                                        <h5 className={`font-bold text-${color}-900 dark:text-${color}-300 text-sm mb-1`}>{title}</h5>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-800 dark:text-amber-300">
                                    <strong>Tip:</strong> Submit a leave request first (Apply for Leave tab), then come here and click <strong>"Run AI Agent"</strong>. The agent will automatically analyse the most lagging teacher's syllabus and generate an optimised emergency schedule. Click <strong>"Publish to Student Portal"</strong> to broadcast it instantly.
                                </p>
                            </div>
                        </div>

                        {/* Syllabus Progress Ranking */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-purple-500" />
                                Syllabus Progress Analysis
                            </h4>
                            <p className="text-xs text-slate-400 mb-4">Lower % = Higher priority for catch-up lecture assignment</p>
                            <div className="space-y-3">
                                {[...mockTeacherSyllabus]
                                    .sort((a, b) => a.syllabusProgress - b.syllabusProgress)
                                    .map((t, idx) => (
                                    <div key={t.id} className="flex items-center gap-3">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                                            idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-orange-500' : idx === 2 ? 'bg-amber-500' : 'bg-slate-400'
                                        }`}>{idx + 1}</div>
                                        <div className="flex-1">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold text-slate-900 dark:text-white">{t.name}</span>
                                                <span className="text-slate-500 dark:text-slate-400">{t.subject} — {t.syllabusProgress}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-700 ${
                                                        t.syllabusProgress < 40 ? 'bg-red-500' :
                                                        t.syllabusProgress < 65 ? 'bg-amber-500' : 'bg-green-500'
                                                    }`}
                                                    style={{ width: `${t.syllabusProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                        {idx === 0 && (
                                            <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold rounded-full whitespace-nowrap">⚠️ Most Lagging</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Agent Console Log */}
                        {aiAgentLog.length > 0 && (
                            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm shadow-xl">
                                <p className="text-slate-500 text-xs mb-3 uppercase tracking-widest">● AI Agent Live Log</p>
                                <div className="space-y-1 max-h-48 overflow-y-auto">
                                    {aiAgentLog.map((entry, i) => (
                                        <div key={i} className={`flex gap-3 ${entry.type === 'success' ? 'text-green-400' : 'text-slate-300'}`}>
                                            <span className="text-slate-600 flex-shrink-0 text-xs">{entry.ts}</span>
                                            <span>{entry.msg}</span>
                                        </div>
                                    ))}
                                    {aiAgentRunning && (
                                        <div className="flex gap-2 text-purple-400 animate-pulse">
                                            <span>▶</span><span>Processing...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Generated Timetable Preview + Publish */}
                        {generatedTimetable && (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-700 shadow-xl">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">Emergency Timetable Ready</h4>
                                            <p className="text-sm text-slate-500">AI Confidence: {generatedTimetable.aiConfidence}% • {generatedTimetable.schedule.length} days</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={publishTimetable}
                                        disabled={timetablePublished}
                                        className={`px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 transition-all shadow-lg ${
                                            timetablePublished
                                                ? 'bg-green-500 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
                                        }`}
                                    >
                                        {timetablePublished
                                            ? <><CheckCircle className="w-5 h-5" />Published to Students!</>
                                            : <><Bell className="w-5 h-5" />Publish to Student Portal</>
                                        }
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    {[
                                        { label: 'Affected Lectures', value: generatedTimetable.summary.affectedLectures, color: 'red' },
                                        { label: 'Substitute Slots', value: generatedTimetable.summary.substituteLectures, color: 'amber' },
                                        { label: 'Catch-Up Slots', value: generatedTimetable.summary.catchUpLectures, color: 'purple' },
                                        { label: 'Teachers Notified', value: generatedTimetable.summary.teachersNotified, color: 'green' },
                                    ].map(s => (
                                        <div key={s.label} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                                            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {timetablePublished && (
                                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                                            ✅ Live! Students can now view this in the <strong>"Emergency Timetable"</strong> tab of their portal.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Substitute Suggestions Modal */}
            <AnimatePresence>
                {showSubstituteModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Brain className="w-8 h-8" />
                                        <div>
                                            <h3 className="text-xl font-bold">AI Substitute Recommendations</h3>
                                            <p className="text-sm text-indigo-100">
                                                Intelligent analysis of timetable and teacher availability
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowSubstituteModal(false)}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {isAnalyzing ? (
                                    <div className="text-center py-12">
                                        <Brain className="w-16 h-16 mx-auto mb-4 text-indigo-600 animate-pulse" />
                                        <p className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                            AI Analysis in Progress
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Analyzing timetable and finding optimal substitutes...
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 mb-6">
                                            <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
                                                Analysis Summary
                                            </h4>
                                            <p className="text-sm text-indigo-800 dark:text-indigo-400">
                                                Found {substituteSuggestions.length} potential substitutes for {selectedLeaveRequest?.affectedLectures?.length || 0} affected lectures.
                                            </p>
                                        </div>

                                        {substituteSuggestions.map((substitute, index) => (
                                            <div key={substitute.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                                            {substitute.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-slate-900 dark:text-white">
                                                                {substitute.name}
                                                            </h4>
                                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                                {substitute.subjects?.join(', ') || 'Subject Teacher'}
                                                            </p>
                                                            <div className="flex items-center gap-4 mt-1">
                                                                <span className="text-xs text-slate-500">
                                                                    Rating: ⭐ {substitute.rating}/5
                                                                </span>
                                                                <span className="text-xs text-slate-500">
                                                                    Syllabus: {substitute.syllabusProgress}% Done
                                                                </span>
                                                                <span className="text-xs text-slate-500">
                                                                    Workload: {substitute.workload}/10
                                                                </span>
                                                                <span className="text-xs text-slate-500">
                                                                    Availability: {substitute.availability}%
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`
                                                            px-3 py-1 rounded-full text-sm font-bold
                                                            ${substitute.confidence >= 80 ? 'bg-green-100 text-green-700' :
                                                              substitute.confidence >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                                              'bg-red-100 text-red-700'}
                                                        `}>
                                                            {substitute.confidence.toFixed(0)}% Match
                                                        </div>
                                                        <p className="text-xs text-slate-500 mt-1">
                                                            AI Confidence Score
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 mb-3">
                                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                        Recommendation:
                                                    </p>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                                        {substitute.recommendedAction}
                                                    </p>
                                                </div>

                                                {substitute.affectedLectures?.length > 0 && (
                                                    <div className="mb-3">
                                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                            Can Cover These Lectures:
                                                        </p>
                                                        <div className="space-y-1">
                                                            {substitute.affectedLectures.map((lecture, idx) => (
                                                                <div key={idx} className="flex items-center gap-2 text-xs bg-white dark:bg-slate-900 p-2 rounded">
                                                                    <Clock className="w-3 h-3 text-indigo-500" />
                                                                    <span className="text-slate-600 dark:text-slate-400">
                                                                        {lecture.day} {lecture.time} - {lecture.subject} ({lecture.class})
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleSendSubstituteRequest(substitute, selectedLeaveRequest)}
                                                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                        Send Request
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                    >
                                                        View Profile
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
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

export default TeacherLeaveManagement;
