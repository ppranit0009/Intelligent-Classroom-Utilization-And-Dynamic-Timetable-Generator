import React, { useState, useMemo } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle2, Filter, BookOpen, Upload } from 'lucide-react';

const AssignmentDashboard = ({ assignments, subjects, user, submissions }) => {
    const [activeFilter, setActiveFilter] = useState('all'); // all, pending, dueToday, overdue, submitted

    // Get today's date for comparison
    const today = new Date().toISOString().split('T')[0];

    // Calculate assignment status
    const getAssignmentStatus = (assignment) => {
        const dueDate = assignment.dueDate;
        const isSubmitted = submissions?.some(sub =>
            sub.studentId === user.id &&
            sub.title === assignment.title
        );

        if (isSubmitted) return 'submitted';
        if (dueDate < today) return 'overdue';
        if (dueDate === today) return 'dueToday';
        return 'pending';
    };

    // Filter and categorize assignments
    const categorizedAssignments = useMemo(() => {
        const all = assignments.map(assignment => ({
            ...assignment,
            status: getAssignmentStatus(assignment),
            subject: subjects.find(s => s.id === assignment.subjectId)
        }));

        return {
            all,
            pending: all.filter(a => a.status === 'pending'),
            dueToday: all.filter(a => a.status === 'dueToday'),
            overdue: all.filter(a => a.status === 'overdue'),
            submitted: all.filter(a => a.status === 'submitted')
        };
    }, [assignments, subjects, user.id, submissions, today]);

    // Get filtered assignments
    const filteredAssignments = categorizedAssignments[activeFilter];

    // Group by subject
    const groupedBySubject = useMemo(() => {
        const grouped = {};
        filteredAssignments.forEach(assignment => {
            const subjectName = assignment.subject?.name || 'Other';
            if (!grouped[subjectName]) {
                grouped[subjectName] = [];
            }
            grouped[subjectName].push(assignment);
        });
        return grouped;
    }, [filteredAssignments]);

    // Get urgency color
    const getUrgencyColor = (status) => {
        switch (status) {
            case 'overdue':
                return 'border-red-500 bg-red-50 dark:bg-red-900/20';
            case 'dueToday':
                return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
            case 'submitted':
                return 'border-green-500 bg-green-50 dark:bg-green-900/20';
            default:
                return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            overdue: { text: 'Overdue', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: AlertCircle },
            dueToday: { text: 'Due Today', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', icon: Clock },
            pending: { text: 'Pending', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Calendar },
            submitted: { text: 'Submitted', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle2 }
        };

        const badge = badges[status];
        const Icon = badge.icon;

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${badge.color}`}>
                <Icon className="w-3 h-3" />
                {badge.text}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Assignments</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Track and manage your coursework
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="px-3 py-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <div className="text-xs text-red-600 dark:text-red-400">Overdue</div>
                        <div className="text-lg font-bold text-red-700 dark:text-red-300">{categorizedAssignments.overdue.length}</div>
                    </div>
                    <div className="px-3 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <div className="text-xs text-orange-600 dark:text-orange-400">Due Today</div>
                        <div className="text-lg font-bold text-orange-700 dark:text-orange-300">{categorizedAssignments.dueToday.length}</div>
                    </div>
                    <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <div className="text-xs text-blue-600 dark:text-blue-400">Pending</div>
                        <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{categorizedAssignments.pending.length}</div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-4">
                {[
                    { key: 'all', label: 'All', count: categorizedAssignments.all.length },
                    { key: 'dueToday', label: 'Due Today', count: categorizedAssignments.dueToday.length },
                    { key: 'pending', label: 'Pending', count: categorizedAssignments.pending.length },
                    { key: 'overdue', label: 'Overdue', count: categorizedAssignments.overdue.length },
                    { key: 'submitted', label: 'Submitted', count: categorizedAssignments.submitted.length }
                ].map(filter => (
                    <button
                        key={filter.key}
                        onClick={() => setActiveFilter(filter.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === filter.key
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        {filter.label} ({filter.count})
                    </button>
                ))}
            </div>

            {/* Assignments List - Grouped by Subject */}
            <div className="space-y-6">
                {Object.keys(groupedBySubject).length > 0 ? (
                    Object.entries(groupedBySubject).map(([subjectName, subjectAssignments]) => {
                        const subject = subjects.find(s => s.name === subjectName);

                        return (
                            <div key={subjectName} className="space-y-3">
                                {/* Subject Header */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-1 h-8 rounded-full"
                                        style={{ backgroundColor: subject?.color || '#6B7280' }}
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{subjectName}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{subject?.code || ''}</p>
                                    </div>
                                    <div className="ml-auto text-sm text-slate-500 dark:text-slate-400">
                                        {subjectAssignments.length} assignment{subjectAssignments.length !== 1 ? 's' : ''}
                                    </div>
                                </div>

                                {/* Assignment Cards */}
                                <div className="grid gap-3">
                                    {subjectAssignments.map(assignment => (
                                        <div
                                            key={assignment.id}
                                            className={`border-l-4 rounded-lg p-4 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow ${getUrgencyColor(assignment.status)}`}
                                        >
                                            <div className="flex flex-col sm:flex-row justify-between gap-3">
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <h4 className="font-semibold text-slate-900 dark:text-white">{assignment.title}</h4>
                                                        {getStatusBadge(assignment.status)}
                                                    </div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                                        {assignment.description}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-4 h-4" />
                                                            <span>Due: {assignment.deadline}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <BookOpen className="w-4 h-4" />
                                                            <span>{assignment.course}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {assignment.status !== 'submitted' && (
                                                    <div className="flex items-center">
                                                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                                                            <Upload className="w-4 h-4" />
                                                            Submit
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12">
                        <CheckCircle2 className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                            {activeFilter === 'submitted'
                                ? 'No submitted assignments yet'
                                : activeFilter === 'overdue'
                                    ? 'No overdue assignments - Great job!'
                                    : activeFilter === 'dueToday'
                                        ? 'No assignments due today'
                                        : 'No assignments found'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignmentDashboard;
