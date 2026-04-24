import React, { useState } from 'react';
import { User, X, BookOpen, Clock, CheckCircle } from 'lucide-react';

const StudentProfile = ({ isOpen, onClose, submissions, assignments, user }) => {
  const [expandedItemId, setExpandedItemId] = useState(null);

  if (!isOpen || !user) return null;

  // Filter submissions for the logged-in user
  const userSubmissions = submissions.filter(s => s.studentId === user.id);

  // Calculate stats based on filtered submissions
  const totalSubmissions = userSubmissions.length;
  const gradedSubmissions = userSubmissions.filter(s => s.status === 'Graded').length;
  const pendingSubmissions = userSubmissions.filter(s => s.status === 'Pending').length;

  // Calculate average grade
  const grades = userSubmissions
    .filter(s => s.grade !== '-')
    .map(s => parseInt(s.grade.split('/')[0]));
  const averageGrade = grades.length > 0
    ? Math.round(grades.reduce((a, b) => a + b, 0) / grades.length)
    : 0;

  const toggleExpand = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end pointer-events-none">
      <div
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity pointer-events-auto"
        onClick={onClose}
      />
      <div className="relative h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out pointer-events-auto border-l border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <User className="w-5 h-5 mr-2 text-indigo-500" />
            Student Profile
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="p-6 flex flex-col items-center border-b border-slate-100 dark:border-slate-800">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-indigo-500/30">
            {user.avatar || 'U'}
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h3>
          <p className="text-slate-500 dark:text-slate-400">Computer Science • Year 3</p>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
            ID: {user.id}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Submitted</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalSubmissions}</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Avg. Grade</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{averageGrade}%</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
            <p className="text-sm text-amber-600 dark:text-amber-400 mb-1">Pending Review</p>
            <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{pendingSubmissions}</p>
          </div>
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30">
            <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">Completed</p>
            <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{gradedSubmissions}</p>
          </div>
        </div>

        {/* Recent Activity / Detailed Stats */}
        <div className="flex-1 overflow-y-auto p-6 pt-0 space-y-6">

          {/* Activities Remaining */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-indigo-500" />
              Activities Remaining
            </h4>
            {assignments && assignments.length > 0 ? (
              <div className="space-y-3">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors cursor-pointer"
                    onClick={() => toggleExpand(`assign-${assignment.id}`)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-slate-900 dark:text-white line-clamp-1">{assignment.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${assignment.urgency === 'high'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                        {assignment.deadline}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{assignment.course}</p>

                    {/* Expanded Details */}
                    {expandedItemId === `assign-${assignment.id}` && assignment.description && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/50 text-xs text-slate-600 dark:text-slate-300 animate-in fade-in slide-in-from-top-1">
                        <p className="font-semibold mb-1">Description:</p>
                        {assignment.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">No remaining activities.</p>
            )}
          </div>

          {/* Assignments Submitted */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
              Assignments Submitted
            </h4>
            {userSubmissions.length > 0 ? (
              <div className="space-y-3">
                {userSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => toggleExpand(`sub-${sub.id}`)}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm text-slate-900 dark:text-white line-clamp-1">{sub.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${sub.status === 'Graded' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' :
                        sub.status === 'Late' ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400' :
                          'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                        {sub.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                      <span>{sub.date}</span>
                      {sub.grade !== '-' && <span className="font-semibold text-slate-700 dark:text-slate-300">{sub.grade}</span>}
                    </div>

                    {/* Expanded Details */}
                    {expandedItemId === `sub-${sub.id}` && sub.feedback && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/50 text-xs text-slate-600 dark:text-slate-300 animate-in fade-in slide-in-from-top-1">
                        <p className="font-semibold mb-1 text-emerald-600 dark:text-emerald-400">Feedback:</p>
                        {sub.feedback}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">No submissions yet.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
