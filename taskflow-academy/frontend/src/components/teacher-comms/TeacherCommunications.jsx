import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, TrendingUp, History, MessageSquare } from 'lucide-react';
import ReportForm from './ReportForm';
import AudienceToggle from './AudienceToggle';
import HistoryPanel from './HistoryPanel';
import ProgressTracker from './ProgressTracker';
import MessagingHub from './MessagingHub';
import { saveReport, getReportHistory, initializeReportStore } from '../../services/reportService';
import { mockReports, mockStudentProgress } from '../../store/mockReportsStore';

/**
 * TeacherCommunications Component
 * Main container for the AI-powered communication platform
 */
export default function TeacherCommunications({ students }) {
    const [activeSection, setActiveSection] = useState('report');
    const [audience, setAudience] = useState('student');
    const [selectedStudent, setSelectedStudent] = useState(students[0] || null);
    const [reports, setReports] = useState(mockReports);

    // Initialize report store
    React.useEffect(() => {
        initializeReportStore(mockReports);
    }, []);

    const handleSaveReport = (reportData) => {
        const savedReport = saveReport(reportData);
        setReports([savedReport, ...reports]);
    };

    const handleSendMessage = (messageData) => {
        // In a real app, this would send the message
        console.log('Message sent:', messageData);
    };

    const sections = [
        { id: 'report', label: 'Report', icon: FileText },
        { id: 'progress', label: 'Progress', icon: TrendingUp },
        { id: 'history', label: 'History', icon: History },
        { id: 'messages', label: 'Messages', icon: MessageSquare }
    ];

    const pageVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl">
                <h1 className="text-2xl font-bold mb-2">Communications Hub</h1>
                <p className="text-blue-100">
                    AI-powered tools for creating reports, tracking progress, and communicating with students and parents
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex gap-2">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`
                  flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all
                  ${activeSection === section.id
                                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/30'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }
                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="hidden sm:inline">{section.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Student Selector (for Report section) */}
            {activeSection === 'report' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        Select Student
                    </label>
                    <select
                        value={selectedStudent?.id || ''}
                        onChange={(e) => {
                            const student = students.find(s => s.id === e.target.value);
                            setSelectedStudent(student);
                        }}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Audience Toggle (for Report and Messages sections) */}
            {(activeSection === 'report' || activeSection === 'messages') && (
                <AudienceToggle
                    audience={audience}
                    onAudienceChange={setAudience}
                />
            )}

            {/* Content Area with Framer Motion Transitions */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    {activeSection === 'report' && (
                        <ReportForm
                            audience={audience}
                            selectedStudent={selectedStudent}
                            onSave={handleSaveReport}
                        />
                    )}

                    {activeSection === 'progress' && (
                        <ProgressTracker
                            students={students}
                            progressData={mockStudentProgress}
                        />
                    )}

                    {activeSection === 'history' && (
                        <HistoryPanel reports={reports} />
                    )}

                    {activeSection === 'messages' && (
                        <MessagingHub
                            students={students}
                            audience={audience}
                            onSendMessage={handleSendMessage}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
