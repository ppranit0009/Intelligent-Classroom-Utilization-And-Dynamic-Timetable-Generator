import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertTriangle, Brain, Clock, Calendar, CheckCircle,
    User, BookOpen, Zap, RefreshCw, Bell, X, ChevronDown, ChevronUp
} from 'lucide-react';

// Shared storage key so AI agent and student portal talk to each other
export const EMERGENCY_TIMETABLE_KEY = 'taskflow-emergency-timetable';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const EmergencyTimetable = ({ userRole = 'student' }) => {
    const [timetable, setTimetable] = useState(null);
    const [expandedDay, setExpandedDay] = useState(null);

    // Poll localStorage every 5 seconds for new emergency timetables
    useEffect(() => {
        const load = () => {
            try {
                const stored = localStorage.getItem(EMERGENCY_TIMETABLE_KEY);
                if (stored) setTimetable(JSON.parse(stored));
            } catch {}
        };
        load();
        const interval = setInterval(load, 5000);
        return () => clearInterval(interval);
    }, []);

    const clearTimetable = () => {
        localStorage.removeItem(EMERGENCY_TIMETABLE_KEY);
        setTimetable(null);
    };

    const statusColor = (type) => {
        if (type === 'substitute') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
        if (type === 'syllabus_catch_up') return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
        if (type === 'regular') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
        return 'bg-slate-100 text-slate-700';
    };

    const typeLabel = (type) => {
        if (type === 'substitute') return '🔄 Substitute';
        if (type === 'syllabus_catch_up') return '📚 Syllabus Catch-Up';
        if (type === 'regular') return '✅ Regular';
        return type;
    };

    if (!timetable) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Emergency Timetable Active</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                        All teachers are present today. Your regular timetable is in effect.
                        This section will automatically update if any teacher is absent.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
                        <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                        <span>Auto-refreshing every 5 seconds</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Alert Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-2xl"
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wide animate-pulse">
                                    🚨 Emergency
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold mb-1">Emergency Timetable Active</h2>
                            <p className="text-red-100 text-sm">
                                <strong>{timetable.absentTeacher}</strong> is absent from{' '}
                                <strong>{timetable.startDate}</strong> to <strong>{timetable.endDate}</strong>.
                                AI has generated a substitute timetable.
                            </p>
                            <p className="text-red-200 text-xs mt-1">
                                Generated at {new Date(timetable.generatedAt).toLocaleTimeString()} •
                                Reason: {timetable.reason}
                            </p>
                        </div>
                    </div>
                    {userRole === 'admin' && (
                        <button
                            onClick={clearTimetable}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            title="Clear emergency timetable"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </motion.div>

            {/* AI Analysis Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-6 h-6 text-purple-500" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Analysis Summary</h3>
                    <span className="ml-auto px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-xs font-bold">
                        Confidence: {timetable.aiConfidence}%
                    </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Affected Lectures', value: timetable.summary?.affectedLectures || 0, color: 'red' },
                        { label: 'Substitute Assigned', value: timetable.summary?.substituteLectures || 0, color: 'amber' },
                        { label: 'Syllabus Catch-Up', value: timetable.summary?.catchUpLectures || 0, color: 'purple' },
                        { label: 'Teachers Notified', value: timetable.summary?.teachersNotified || 0, color: 'green' },
                    ].map((stat) => (
                        <div key={stat.label} className={`p-4 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 border border-${stat.color}-200 dark:border-${stat.color}-800`}>
                            <p className={`text-2xl font-bold text-${stat.color}-700 dark:text-${stat.color}-400`}>{stat.value}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timetable by Day */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    Emergency Schedule
                </h3>
                {(timetable.schedule || []).map((daySchedule) => (
                    <motion.div
                        key={daySchedule.day}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden"
                    >
                        <button
                            onClick={() => setExpandedDay(expandedDay === daySchedule.day ? null : daySchedule.day)}
                            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-900 dark:text-white">{daySchedule.day}</p>
                                    <p className="text-xs text-slate-500">{daySchedule.date} • {daySchedule.lectures?.length || 0} lectures</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {daySchedule.hasChanges && (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-bold">
                                        Modified
                                    </span>
                                )}
                                {expandedDay === daySchedule.day ? (
                                    <ChevronUp className="w-5 h-5 text-slate-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400" />
                                )}
                            </div>
                        </button>

                        <AnimatePresence>
                            {expandedDay === daySchedule.day && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 pt-0 space-y-2 border-t border-slate-100 dark:border-slate-800">
                                        {(daySchedule.lectures || []).map((lecture, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex items-center gap-4 p-3 rounded-lg ${
                                                    lecture.type !== 'regular'
                                                        ? 'bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800'
                                                        : 'bg-slate-50 dark:bg-slate-800'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2 text-slate-500 w-28 flex-shrink-0">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-sm font-mono">{lecture.time}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{lecture.subject}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {lecture.teacher}
                                                        {lecture.syllabusProgress != null && (
                                                            <span className="ml-2 text-purple-500">
                                                                ({lecture.syllabusProgress}% syllabus done)
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor(lecture.type)}`}>
                                                    {typeLabel(lecture.type)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Footer note */}
            <div className="flex items-center gap-2 text-xs text-slate-400 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                <span>This timetable updates automatically. Check back if you notice changes in your schedule.</span>
            </div>
        </div>
    );
};

export default EmergencyTimetable;
