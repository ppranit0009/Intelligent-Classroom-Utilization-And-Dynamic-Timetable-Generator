import React, { useState, useMemo } from 'react';
import { User, X, Users, TrendingUp, AlertTriangle, ChevronDown, Mail, ArrowLeft, CheckCircle, Clock } from 'lucide-react';

const TeacherProfile = ({ isOpen, onClose, students = [], classes = [], assignments = [], submissions = [], user }) => {
    const [selectedClassId, setSelectedClassId] = useState(classes?.[0]?.id || '');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [reportSent, setReportSent] = useState(false);

    const filteredStudents = useMemo(() => {
        return students.filter(student => student.classId === selectedClassId);
    }, [students, selectedClassId]);

    if (!isOpen) return null;

    const currentClass = classes.find(c => c.id === selectedClassId);

    // Calculate class stats
    const totalStudents = filteredStudents.length;
    const averageProgress = totalStudents > 0
        ? Math.round(filteredStudents.reduce((acc, curr) => acc + curr.progress, 0) / totalStudents)
        : 0;
    const atRiskCount = filteredStudents.filter(s => s.status === 'At Risk').length;

    const handleSendReport = () => {
        // Simulate API call
        setReportSent(true);
        setTimeout(() => {
            setReportSent(false);
            // Optionally close student view or show persistent success message
        }, 2000);
    };

    const StudentDetailView = ({ student, onBack }) => {
        // Filter data for this student
        const studentSubmissions = submissions.filter(s => s.studentId === student.id);
        const submittedAssignmentIds = studentSubmissions.map(s => {
            // Find matching assignment to get ID if submission doesn't match assignment IDs directly (mock data might be loose)
            // In our mock data, submissions don't link back to assignment IDs directly, they just have titles.
            // But let's check if we can match by title for robustnes or just assume.
            // The mock data structure: assignments has id, submissions has id (unique).
            // We need to know WHICH assignment a submission is for to calculate "remaining".
            // Comparing titles is a safe bet for this mock data.
            return assignments.find(a => a.title === s.title)?.id;
        }).filter(Boolean);

        const remainingAssignments = assignments.filter(a => !submittedAssignmentIds.includes(a.id));

        return (
            <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-6">
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mr-2"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </button>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Student Details</h3>
                </div>

                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl font-bold text-slate-600 dark:text-slate-300 mb-3">
                        {student.avatar}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{student.name}</h2>
                    <p className="text-slate-500 dark:text-slate-400">{student.email}</p>
                    <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium border ${student.status === 'Ahead' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' :
                        student.status === 'At Risk' ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                        {student.status}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Progress</p>
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{student.progress}%</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Last Active</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1.5">{student.lastActive}</p>
                    </div>
                </div>

                {/* Assignments Lists */}
                <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                    {/* Remaining */}
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                            Remaining Assignments
                        </h4>
                        {remainingAssignments.length > 0 ? (
                            <div className="space-y-2">
                                {remainingAssignments.map(a => (
                                    <div key={a.id} className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-medium text-sm text-slate-900 dark:text-white">{a.title}</span>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                                                Due: {a.deadline}
                                            </span>
                                        </div>
                                        {a.description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{a.description}</p>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-slate-500 italic">No remaining assignments.</p>
                        )}
                    </div>

                    {/* Completed */}
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                            Completed Assignments
                        </h4>
                        {studentSubmissions.length > 0 ? (
                            <div className="space-y-2">
                                {studentSubmissions.map(s => (
                                    <div key={s.id} className="p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium text-sm text-slate-900 dark:text-white">{s.title}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${s.status === 'Graded' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                                'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400'
                                                }`}>{s.status}</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                            <span>Submitted: {s.date}</span>
                                            {s.grade !== '-' && <span>Grade: {s.grade}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-slate-500 italic">No completed assignments.</p>
                        )}
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                    <button
                        onClick={handleSendReport}
                        disabled={reportSent}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center transition-all ${reportSent
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30'
                            }`}
                    >
                        {reportSent ? (
                            <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Report Sent!
                            </>
                        ) : (
                            <>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Action Report
                            </>
                        )}
                    </button>
                </div>
            </div>
        )
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end pointer-events-none">
            <div
                className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity pointer-events-auto"
                onClick={onClose}
            />
            <div className="relative h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out pointer-events-auto border-l border-slate-200 dark:border-slate-800 flex flex-col">

                {/* Main Content or Student Detail View */}
                <div className="flex-1 p-6 relative overflow-hidden flex flex-col">
                    {selectedStudent ? (
                        <StudentDetailView student={selectedStudent} onBack={() => setSelectedStudent(null)} />
                    ) : (
                        <>
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                                    <Users className="w-5 h-5 mr-2 text-indigo-500" />
                                    Class Progress
                                </h2>
                                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Class Selector */}
                            <div className="mb-6">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Select Class</label>
                                <div className="relative">
                                    <select
                                        value={selectedClassId}
                                        onChange={(e) => setSelectedClassId(e.target.value)}
                                        className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer"
                                    >
                                        {classes.map(cls => (
                                            <option key={cls.id} value={cls.id}>{cls.name} ({cls.section})</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                </div>
                            </div>

                            {/* Class Stats */}
                            <div className="mb-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30">
                                        <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">Avg. Progress</p>
                                        <div className="flex items-end">
                                            <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{averageProgress}%</p>
                                            <TrendingUp className="w-4 h-4 text-indigo-500 ml-2 mb-1.5" />
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
                                        <p className="text-sm text-amber-600 dark:text-amber-400 mb-1">At Risk</p>
                                        <div className="flex items-end">
                                            <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{atRiskCount}</p>
                                            <AlertTriangle className="w-4 h-4 text-amber-500 ml-2 mb-1.5" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Student List */}
                            <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-3">
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Student List ({filteredStudents.length})</h4>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <div
                                            key={student.id}
                                            onClick={() => setSelectedStudent(student)}
                                            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 cursor-pointer transition-all group"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 transition-colors">
                                                        {student.avatar}
                                                    </div>
                                                    <div>
                                                        <h5 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{student.name}</h5>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${student.status === 'Ahead' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                                    student.status === 'At Risk' ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400' :
                                                        'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400'
                                                    }`}>
                                                    {student.status}
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${student.progress >= 80 ? 'bg-emerald-500' :
                                                        student.progress < 50 ? 'bg-red-500' :
                                                            'bg-indigo-500'
                                                        }`}
                                                    style={{ width: `${student.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
                                        No students in this class.
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
