import React from 'react';
import { Bell } from 'lucide-react';

const NoticeBoardSimple = ({ userRole = 'student' }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Notice Board</h2>
            <p className="text-indigo-100 text-sm">Stay updated with important announcements</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-slate-600 dark:text-slate-400">Notice Board is loading...</p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Role: {userRole}</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoardSimple;
