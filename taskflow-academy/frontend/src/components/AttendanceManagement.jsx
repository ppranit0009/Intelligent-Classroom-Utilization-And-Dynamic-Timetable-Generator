import React, { useState, useMemo } from 'react';
import { Calendar, Users, TrendingUp, Download, Search, ChevronDown, CheckCircle, XCircle, Clock, BarChart3 } from 'lucide-react';

const AttendanceManagement = ({ attendanceRecords, students, classes, subjects, onUpdateAttendance }) => {
    const [selectedClass, setSelectedClass] = useState('all');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter students by class
    const filteredStudents = useMemo(() => {
        if (selectedClass === 'all') return students;
        return students.filter(s => s.classId === selectedClass);
    }, [students, selectedClass]);

    // Get attendance for a specific student on selected date
    const getAttendanceForStudent = (studentId) => {
        return attendanceRecords.find(
            record => record.studentId === studentId && record.date === selectedDate
        );
    };

    // Calculate overall statistics
    const stats = useMemo(() => {
        const todayRecords = attendanceRecords.filter(r => r.date === selectedDate);
        const classStudents = selectedClass === 'all'
            ? students
            : students.filter(s => s.classId === selectedClass);

        const present = todayRecords.filter(r =>
            r.status === 'Present' && classStudents.some(s => s.id === r.studentId)
        ).length;

        const absent = todayRecords.filter(r =>
            r.status === 'Absent' && classStudents.some(s => s.id === r.studentId)
        ).length;

        const late = todayRecords.filter(r =>
            r.status === 'Late' && classStudents.some(s => s.id === r.studentId)
        ).length;

        const total = classStudents.length;
        const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

        return { present, absent, late, total, percentage };
    }, [attendanceRecords, students, selectedDate, selectedClass]);

    // Calculate subject-wise attendance statistics for graph
    const subjectAttendanceStats = useMemo(() => {
        if (!subjects || subjects.length === 0) return [];

        return subjects.map(subject => {
            // Get all attendance records for this subject
            const subjectRecords = attendanceRecords.filter(r => r.subjectId === subject.id);

            // Get unique dates for this subject
            const uniqueDates = [...new Set(subjectRecords.map(r => r.date))];

            // Calculate total possible classes (students × dates)
            const classStudents = selectedClass === 'all'
                ? students
                : students.filter(s => s.classId === selectedClass);

            const totalPossibleClasses = classStudents.length * uniqueDates.length;

            // Count present records
            const presentCount = subjectRecords.filter(r =>
                r.status === 'Present' && classStudents.some(s => s.id === r.studentId)
            ).length;

            // Calculate percentage
            const percentage = totalPossibleClasses > 0
                ? Math.round((presentCount / totalPossibleClasses) * 100)
                : 0;

            return {
                id: subject.id,
                name: subject.name,
                code: subject.code,
                color: subject.color,
                presentCount,
                totalPossibleClasses,
                percentage
            };
        });
    }, [attendanceRecords, students, subjects, selectedClass]);

    // Handle checkbox toggle
    const handleCheckboxToggle = (studentId, isChecked) => {
        const existingRecord = getAttendanceForStudent(studentId);
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const newStatus = isChecked ? 'Present' : 'Absent';

        if (existingRecord) {
            onUpdateAttendance({
                ...existingRecord,
                status: newStatus,
                markedAt: newStatus === 'Absent' ? '-' : timeString,
                markedBy: 'teacher'
            });
        } else {
            onUpdateAttendance({
                id: `A${Date.now()}-${studentId}`,
                studentId,
                date: selectedDate,
                status: newStatus,
                markedAt: newStatus === 'Absent' ? '-' : timeString,
                markedBy: 'teacher'
            });
        }
    };

    // Mark all present
    const handleMarkAllPresent = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        filteredStudents.forEach(student => {
            const existingRecord = getAttendanceForStudent(student.id);
            if (existingRecord) {
                onUpdateAttendance({
                    ...existingRecord,
                    status: 'Present',
                    markedAt: timeString,
                    markedBy: 'teacher'
                });
            } else {
                onUpdateAttendance({
                    id: `A${Date.now()}-${student.id}`,
                    studentId: student.id,
                    date: selectedDate,
                    status: 'Present',
                    markedAt: timeString,
                    markedBy: 'teacher'
                });
            }
        });
    };

    // Export to CSV
    const handleExport = () => {
        const csvContent = [
            ['Student ID', 'Name', 'Class', 'Status', 'Marked At', 'Marked By'],
            ...filteredStudents.map(student => {
                const attendance = getAttendanceForStudent(student.id);
                const className = classes.find(c => c.id === student.classId)?.name || 'N/A';
                return [
                    student.id,
                    student.name,
                    className,
                    attendance?.status || 'Not Marked',
                    attendance?.markedAt || '-',
                    attendance?.markedBy || '-'
                ];
            })
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance-${selectedDate}.csv`;
        a.click();
    };

    // Search filtered students
    const searchedStudents = filteredStudents.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Attendance Rate</div>
                        <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.percentage}%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stats.present} of {stats.total} present</div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Present</div>
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.present}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Students marked present</div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Absent</div>
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.absent}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Students absent</div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Late</div>
                        <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.late}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Students marked late</div>
                </div>
            </div>

            {/* Subject-wise Attendance Graph */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Overall Attendance by Subject</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Attendance percentage across all subjects</p>
                        </div>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="space-y-4">
                    {subjectAttendanceStats.length > 0 ? (
                        subjectAttendanceStats.map((subject) => (
                            <div key={subject.id} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: subject.color }}
                                        />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {subject.name}
                                        </span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            ({subject.code})
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {subject.presentCount} / {subject.totalPossibleClasses}
                                        </span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white min-w-[3rem] text-right">
                                            {subject.percentage}%
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                                    <div
                                        className="absolute inset-y-0 left-0 rounded-lg transition-all duration-500 ease-out flex items-center justify-end pr-3"
                                        style={{
                                            width: `${subject.percentage}%`,
                                            backgroundColor: subject.color,
                                            opacity: 0.9
                                        }}
                                    >
                                        {subject.percentage > 15 && (
                                            <span className="text-xs font-semibold text-white">
                                                {subject.percentage}%
                                            </span>
                                        )}
                                    </div>

                                    {/* Grid lines for better readability */}
                                    <div className="absolute inset-0 flex">
                                        {[25, 50, 75].map(mark => (
                                            <div
                                                key={mark}
                                                className="absolute top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700"
                                                style={{ left: `${mark}%` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <BarChart3 className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                            <p className="text-slate-500 dark:text-slate-400">No subject data available</p>
                        </div>
                    )}
                </div>

                {/* Legend */}
                {subjectAttendanceStats.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span>Excellent (≥90%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span>Good (75-89%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <span>Fair (60-74%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span>Poor (&lt;60%)</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
                        {/* Class Filter */}
                        <div className="relative">
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="pl-4 pr-10 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
                            >
                                <option value="all">All Classes</option>
                                {classes.map(cls => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name} - Section {cls.section}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>

                        {/* Date Picker */}
                        <div className="relative">
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search students..."
                                className="pl-10 pr-4 py-2 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleMarkAllPresent}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Mark All Present
                        </button>
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                    Student
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                    Class
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                    Present
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                    Absent
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                    POD
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                    Marked At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {searchedStudents.length > 0 ? (
                                searchedStudents.map((student) => {
                                    const attendance = getAttendanceForStudent(student.id);
                                    const className = classes.find(c => c.id === student.classId)?.name || 'N/A';
                                    const currentStatus = attendance?.status || 'Not Marked';

                                    const handleStatusChange = (status) => {
                                        const now = new Date();
                                        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                                        if (attendance) {
                                            onUpdateAttendance({
                                                ...attendance,
                                                status: status,
                                                markedAt: status === 'Absent' ? '-' : timeString,
                                                markedBy: 'teacher'
                                            });
                                        } else {
                                            onUpdateAttendance({
                                                id: `A${Date.now()}-${student.id}`,
                                                studentId: student.id,
                                                date: selectedDate,
                                                status: status,
                                                markedAt: status === 'Absent' ? '-' : timeString,
                                                markedBy: 'teacher'
                                            });
                                        }
                                    };

                                    return (
                                        <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400">
                                                        {student.avatar}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-slate-900 dark:text-white">{student.name}</div>
                                                        <div className="text-sm text-slate-500 dark:text-slate-400">{student.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {className}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.id}`}
                                                    checked={currentStatus === 'Present'}
                                                    onChange={() => handleStatusChange('Present')}
                                                    className="w-5 h-5 text-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.id}`}
                                                    checked={currentStatus === 'Absent'}
                                                    onChange={() => handleStatusChange('Absent')}
                                                    className="w-5 h-5 text-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.id}`}
                                                    checked={currentStatus === 'Late'}
                                                    onChange={() => handleStatusChange('Late')}
                                                    className="w-5 h-5 text-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${currentStatus === 'Present'
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                    : currentStatus === 'Absent'
                                                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                        : currentStatus === 'Late'
                                                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                                    }`}>
                                                    {currentStatus === 'Present' && <CheckCircle className="w-3 h-3" />}
                                                    {currentStatus === 'Absent' && <XCircle className="w-3 h-3" />}
                                                    {currentStatus === 'Late' && <Clock className="w-3 h-3" />}
                                                    {currentStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {attendance?.markedAt || '-'}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center">
                                        <Users className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                                        <p className="text-slate-500 dark:text-slate-400">No students found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AttendanceManagement;
