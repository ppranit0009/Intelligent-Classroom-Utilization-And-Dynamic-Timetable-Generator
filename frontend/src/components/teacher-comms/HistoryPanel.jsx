import React, { useState } from 'react';
import { Search, Calendar, User, Users, ChevronDown, ChevronUp, Download } from 'lucide-react';

/**
 * HistoryPanel Component
 * Searchable vault of past reports
 */
export default function HistoryPanel({ reports }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterAudience, setFilterAudience] = useState('all');
    const [expandedId, setExpandedId] = useState(null);

    // Filter reports
    const filteredReports = reports.filter(report => {
        const matchesSearch =
            report.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.subject?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesAudience =
            filterAudience === 'all' || report.audience === filterAudience;

        return matchesSearch && matchesAudience;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="space-y-4">
            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search Input */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by student name, content, or subject..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Audience Filter */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterAudience('all')}
                            className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${filterAudience === 'all'
                                    ? 'bg-slate-600 text-white shadow-lg'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }
              `}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterAudience('student')}
                            className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                ${filterAudience === 'student'
                                    ? 'bg-teal-500 text-white shadow-lg'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }
              `}
                        >
                            <User className="w-4 h-4" />
                            Student
                        </button>
                        <button
                            onClick={() => setFilterAudience('parent')}
                            className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                ${filterAudience === 'parent'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }
              `}
                        >
                            <Users className="w-4 h-4" />
                            Parent
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-slate-600 dark:text-slate-400">
                Showing {filteredReports.length} of {reports.length} reports
            </div>

            {/* Reports List */}
            <div className="space-y-3">
                {filteredReports.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 text-center">
                        <Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-600 dark:text-slate-400">No reports found</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                            Try adjusting your search or filters
                        </p>
                    </div>
                ) : (
                    filteredReports.map((report) => (
                        <div
                            key={report.id}
                            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            {/* Report Header */}
                            <div
                                onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
                                className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                                {report.studentName}
                                            </h3>

                                            {/* Audience Badge */}
                                            <span className={`
                        px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5
                        ${report.audience === 'student'
                                                    ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
                                                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                }
                      `}>
                                                {report.audience === 'student' ? (
                                                    <User className="w-3 h-3" />
                                                ) : (
                                                    <Users className="w-3 h-3" />
                                                )}
                                                {report.audience === 'student' ? 'Student' : 'Parent'}
                                            </span>
                                        </div>

                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                            {report.subject}
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(report.createdAt)}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`
                          w-2 h-2 rounded-full
                          ${report.status === 'sent' ? 'bg-green-500' : 'bg-yellow-500'}
                        `} />
                                                {report.status === 'sent' ? 'Sent' : 'Draft'}
                                            </div>
                                        </div>
                                    </div>

                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                                        {expandedId === report.id ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {expandedId === report.id && (
                                <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 p-4 animate-in slide-in-from-top-2 fade-in duration-200">
                                    <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
                                        <pre className="whitespace-pre-wrap font-sans text-slate-700 dark:text-slate-300 text-sm">
                                            {report.content}
                                        </pre>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                                        <div className="text-xs text-slate-500 dark:text-slate-500">
                                            Report ID: {report.id}
                                        </div>

                                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                            <Download className="w-4 h-4" />
                                            Export
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
