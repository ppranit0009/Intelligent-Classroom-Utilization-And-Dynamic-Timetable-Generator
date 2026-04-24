import React, { useState, useMemo } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp, Award, Flame, ChevronLeft, ChevronRight, Info, BarChart3 } from 'lucide-react';

const AttendanceMarker = ({ user, attendanceRecords, subjects = [] }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showFullView, setShowFullView] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('all'); // 'all' or subjectId

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Filter attendance records for current user and selected subject
    const userAttendance = useMemo(() => {
        const filtered = attendanceRecords.filter(record => record.studentId === user.id);
        if (selectedSubject === 'all') {
            return filtered;
        }
        return filtered.filter(record => record.subjectId === selectedSubject);
    }, [attendanceRecords, user.id, selectedSubject]);

    // Check if already marked today
    const todayRecord = userAttendance.find(record => record.date === today);
    const isMarkedToday = !!todayRecord;

    // Calculate statistics
    const stats = useMemo(() => {
        const totalDays = userAttendance.length;
        const presentDays = userAttendance.filter(r => r.status === 'Present').length;
        const lateDays = userAttendance.filter(r => r.status === 'Late').length;
        const absentDays = userAttendance.filter(r => r.status === 'Absent').length;
        const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

        // Calculate current streak
        let streak = 0;
        const sortedRecords = [...userAttendance].sort((a, b) => new Date(b.date) - new Date(a.date));
        for (const record of sortedRecords) {
            if (record.status === 'Present') {
                streak++;
            } else {
                break;
            }
        }

        return { totalDays, presentDays, lateDays, absentDays, percentage, streak };
    }, [userAttendance]);

    // Calculate subject-wise attendance statistics for graph
    const subjectAttendanceStats = useMemo(() => {
        if (!subjects || subjects.length === 0) return [];

        return subjects.map(subject => {
            // Get all attendance records for this subject and user
            const subjectRecords = attendanceRecords.filter(
                r => r.studentId === user.id && r.subjectId === subject.id
            );

            // Count present records
            const presentCount = subjectRecords.filter(r => r.status === 'Present').length;
            const totalClasses = subjectRecords.length;

            // Calculate percentage
            const percentage = totalClasses > 0
                ? Math.round((presentCount / totalClasses) * 100)
                : 0;

            return {
                id: subject.id,
                name: subject.name,
                code: subject.code,
                color: subject.color,
                presentCount,
                totalClasses,
                percentage
            };
        });
    }, [attendanceRecords, user.id, subjects]);

    // Calendar helpers
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const getAttendanceForDate = (dateStr) => {
        return userAttendance.find(record => record.date === dateStr);
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    // Compact view for dashboard
    if (!showFullView) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40">
                            <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">My Attendance</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">View your attendance record</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.percentage}%</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                            {selectedSubject === 'all' ? 'Overall' : subjects.find(s => s.id === selectedSubject)?.name}
                        </div>
                    </div>
                </div>

                {/* Subject Tabs */}
                {subjects.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedSubject('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedSubject === 'all'
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            All Subjects
                        </button>
                        {subjects.map(subject => {
                            const subjectRecords = attendanceRecords.filter(
                                r => r.studentId === user.id && r.subjectId === subject.id
                            );
                            const subjectPresent = subjectRecords.filter(r => r.status === 'Present').length;
                            const subjectPercentage = subjectRecords.length > 0
                                ? Math.round((subjectPresent / subjectRecords.length) * 100)
                                : 0;

                            return (
                                <button
                                    key={subject.id}
                                    onClick={() => setSelectedSubject(subject.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedSubject === subject.id
                                        ? 'text-white shadow-lg'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                        }`}
                                    style={selectedSubject === subject.id ? { backgroundColor: subject.color } : {}}
                                >
                                    {subject.name} ({subjectPercentage}%)
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Subject-wise Attendance Graph */}
                {subjects.length > 0 && subjectAttendanceStats.length > 0 && (
                    <div className="mb-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">My Attendance by Subject</h4>
                        </div>

                        <div className="space-y-3">
                            {subjectAttendanceStats.map((subject) => (
                                <div key={subject.id} className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{ backgroundColor: subject.color }}
                                            />
                                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                                {subject.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                {subject.presentCount}/{subject.totalClasses}
                                            </span>
                                            <span className="text-xs font-bold text-slate-900 dark:text-white min-w-[2.5rem] text-right">
                                                {subject.percentage}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative h-6 bg-white dark:bg-slate-700 rounded-md overflow-hidden">
                                        <div
                                            className="absolute inset-y-0 left-0 rounded-md transition-all duration-500 ease-out flex items-center justify-end pr-2"
                                            style={{
                                                width: `${subject.percentage}%`,
                                                backgroundColor: subject.color,
                                                opacity: 0.85
                                            }}
                                        >
                                            {subject.percentage > 20 && (
                                                <span className="text-xs font-semibold text-white">
                                                    {subject.percentage}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Today's Status */}
                <div className="mb-6">
                    {isMarkedToday ? (
                        <div className={`flex items-center justify-between p-4 rounded-xl border-2 ${todayRecord.status === 'Present'
                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800'
                            : todayRecord.status === 'Absent'
                                ? 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800'
                                : 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800'
                            }`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${todayRecord.status === 'Present' ? 'bg-emerald-500' :
                                    todayRecord.status === 'Absent' ? 'bg-red-500' : 'bg-amber-500'
                                    }`}>
                                    {todayRecord.status === 'Present' && <CheckCircle className="w-5 h-5 text-white" />}
                                    {todayRecord.status === 'Absent' && <XCircle className="w-5 h-5 text-white" />}
                                    {todayRecord.status === 'Late' && <Clock className="w-5 h-5 text-white" />}
                                </div>
                                <div>
                                    <div className={`font-bold ${todayRecord.status === 'Present' ? 'text-emerald-700 dark:text-emerald-300' :
                                        todayRecord.status === 'Absent' ? 'text-red-700 dark:text-red-300' :
                                            'text-amber-700 dark:text-amber-300'
                                        }`}>
                                        Marked {todayRecord.status}
                                    </div>
                                    <div className={`text-sm ${todayRecord.status === 'Present' ? 'text-emerald-600 dark:text-emerald-400' :
                                        todayRecord.status === 'Absent' ? 'text-red-600 dark:text-red-400' :
                                            'text-amber-600 dark:text-amber-400'
                                        }`}>
                                        {todayRecord.markedAt !== '-' ? `Today at ${todayRecord.markedAt}` : 'By teacher'}
                                    </div>
                                </div>
                            </div>
                            <Award className={`w-6 h-6 ${todayRecord.status === 'Present' ? 'text-emerald-500' :
                                todayRecord.status === 'Absent' ? 'text-red-500' : 'text-amber-500'
                                }`} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl border-2 border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-slate-300 dark:bg-slate-600">
                                    <Info className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-700 dark:text-slate-300">Not Marked Yet</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Your teacher will mark attendance</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Flame className="w-4 h-4 text-orange-500" />
                            <div className="text-xl font-bold text-slate-900 dark:text-white">{stats.streak}</div>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Day Streak</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{stats.presentDays}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Present</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="text-xl font-bold text-red-600 dark:text-red-400 mb-1">{stats.absentDays}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Absent</div>
                    </div>
                </div>

                <button
                    onClick={() => setShowFullView(true)}
                    className="w-full py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                    View Full Attendance History →
                </button>
            </div>
        );
    }

    // Full calendar view
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40">
                        <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Attendance History</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Your complete attendance record</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowFullView(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    ← Back to Summary
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Attendance Rate</div>
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.percentage}%</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Present Days</div>
                    </div>
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.presentDays}</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Current Streak</div>
                    </div>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.streak}</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Late Days</div>
                    </div>
                    <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.lateDays}</div>
                </div>
            </div>

            {/* Calendar */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={previousMonth}
                        className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{monthName}</h4>
                    <button
                        onClick={nextMonth}
                        className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                        <div key={`empty-${index}`} className="aspect-square" />
                    ))}

                    {/* Days of the month */}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const day = index + 1;
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const attendance = getAttendanceForDate(dateStr);
                        const isToday = dateStr === today;

                        let bgColor = 'bg-white dark:bg-slate-700';
                        let borderColor = 'border-slate-200 dark:border-slate-600';
                        let icon = null;

                        if (attendance) {
                            if (attendance.status === 'Present') {
                                bgColor = 'bg-emerald-100 dark:bg-emerald-900/30';
                                borderColor = 'border-emerald-300 dark:border-emerald-700';
                                icon = <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />;
                            } else if (attendance.status === 'Absent') {
                                bgColor = 'bg-red-100 dark:bg-red-900/30';
                                borderColor = 'border-red-300 dark:border-red-700';
                                icon = <XCircle className="w-3 h-3 text-red-600 dark:text-red-400" />;
                            } else if (attendance.status === 'Late') {
                                bgColor = 'bg-amber-100 dark:bg-amber-900/30';
                                borderColor = 'border-amber-300 dark:border-amber-700';
                                icon = <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />;
                            }
                        }

                        return (
                            <div
                                key={day}
                                className={`aspect-square flex flex-col items-center justify-center rounded-lg border-2 ${bgColor} ${borderColor} ${isToday ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-800' : ''
                                    } transition-all hover:scale-105`}
                            >
                                <div className="text-sm font-semibold text-slate-900 dark:text-white">{day}</div>
                                {icon && <div className="mt-1">{icon}</div>}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-300 dark:border-emerald-700" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-300 dark:border-amber-700" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">Late</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">Absent</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceMarker;
