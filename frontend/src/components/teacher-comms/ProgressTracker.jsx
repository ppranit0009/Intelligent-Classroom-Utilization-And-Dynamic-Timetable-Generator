import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Award, Calendar, ChevronDown } from 'lucide-react';

/**
 * ProgressTracker Component
 * Visual student progress dashboard with charts
 */
export default function ProgressTracker({ students, progressData }) {
    const [selectedStudent, setSelectedStudent] = useState(students[0]?.id || null);
    const [timeRange, setTimeRange] = useState('6weeks');
    const [showStudentDropdown, setShowStudentDropdown] = useState(false);

    const currentStudent = students.find(s => s.id === selectedStudent);
    const studentProgress = progressData[selectedStudent];

    if (!studentProgress) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-slate-600 dark:text-slate-400">No progress data available</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Student Selector */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 relative">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Select Student
                        </label>
                        <button
                            onClick={() => setShowStudentDropdown(!showStudentDropdown)}
                            className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                    {currentStudent?.avatar || currentStudent?.name?.charAt(0)}
                                </div>
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {currentStudent?.name || 'Select a student'}
                                </span>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showStudentDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showStudentDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
                                {students.map((student) => (
                                    <button
                                        key={student.id}
                                        onClick={() => {
                                            setSelectedStudent(student.id);
                                            setShowStudentDropdown(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                            {student.avatar || student.name?.charAt(0)}
                                        </div>
                                        <span className="font-medium text-slate-900 dark:text-white">
                                            {student.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Time Range Filter */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Time Range
                        </label>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="6weeks">Last 6 Weeks</option>
                            <option value="month">Last Month</option>
                            <option value="semester">This Semester</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <Award className="w-6 h-6 opacity-80" />
                        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                            Average
                        </span>
                    </div>
                    <div className="text-3xl font-bold mb-1">
                        {studentProgress.stats.averageGrade}%
                    </div>
                    <div className="text-sm opacity-90">Overall Grade</div>
                </div>

                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-4 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <Calendar className="w-6 h-6 opacity-80" />
                        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                            Rate
                        </span>
                    </div>
                    <div className="text-3xl font-bold mb-1">
                        {studentProgress.stats.attendanceRate}%
                    </div>
                    <div className="text-sm opacity-90">Attendance</div>
                </div>

                <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl p-4 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-6 h-6 opacity-80" />
                        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                            Change
                        </span>
                    </div>
                    <div className="text-3xl font-bold mb-1">
                        {studentProgress.stats.improvement}
                    </div>
                    <div className="text-sm opacity-90">Improvement</div>
                </div>

                <div className={`
          bg-gradient-to-br rounded-xl p-4 text-white shadow-lg
          ${studentProgress.stats.trend === 'excellent' ? 'from-green-500 to-green-600' :
                        studentProgress.stats.trend === 'improving' ? 'from-indigo-500 to-indigo-600' :
                            'from-amber-500 to-amber-600'}
        `}>
                    <div className="flex items-center justify-between mb-2">
                        {studentProgress.stats.trend === 'improving' || studentProgress.stats.trend === 'excellent' ? (
                            <TrendingUp className="w-6 h-6 opacity-80" />
                        ) : (
                            <TrendingDown className="w-6 h-6 opacity-80" />
                        )}
                        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                            Status
                        </span>
                    </div>
                    <div className="text-2xl font-bold mb-1 capitalize">
                        {studentProgress.stats.trend}
                    </div>
                    <div className="text-sm opacity-90">Overall Trend</div>
                </div>
            </div>

            {/* Grade Trends Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Grade Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={studentProgress.grades}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="week"
                            stroke="#64748b"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            stroke="#64748b"
                            style={{ fontSize: '12px' }}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="math"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', r: 5 }}
                            name="Math"
                        />
                        <Line
                            type="monotone"
                            dataKey="science"
                            stroke="#14b8a6"
                            strokeWidth={3}
                            dot={{ fill: '#14b8a6', r: 5 }}
                            name="Science"
                        />
                        <Line
                            type="monotone"
                            dataKey="english"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            dot={{ fill: '#8b5cf6', r: 5 }}
                            name="English"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Attendance Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Attendance Patterns
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={studentProgress.attendance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="week"
                            stroke="#64748b"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            stroke="#64748b"
                            style={{ fontSize: '12px' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Legend />
                        <Bar dataKey="present" fill="#10b981" name="Present" />
                        <Bar dataKey="late" fill="#f59e0b" name="Late" />
                        <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
