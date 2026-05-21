import React from 'react';
import { Users, UserCircle } from 'lucide-react';
import { getToneGuidelines } from '../../services/aiPromptService';

/**
 * AudienceToggle Component
 * Allows switching between Student and Parent audiences
 */
export default function AudienceToggle({ audience, onAudienceChange }) {
    const guidelines = getToneGuidelines(audience);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Report Audience
                </label>

                {/* Toggle Switch */}
                <div className="relative inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1">
                    <button
                        onClick={() => onAudienceChange('student')}
                        className={`
              relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${audience === 'student'
                                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }
            `}
                    >
                        <div className="flex items-center gap-2">
                            <UserCircle className="w-4 h-4" />
                            <span>Student</span>
                        </div>
                    </button>

                    <button
                        onClick={() => onAudienceChange('parent')}
                        className={`
              relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${audience === 'parent'
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }
            `}
                    >
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Parent</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Tone Guidelines */}
            <div className="mt-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-2">
                    <div className={`
            mt-0.5 w-2 h-2 rounded-full flex-shrink-0
            ${audience === 'student' ? 'bg-teal-500' : 'bg-blue-500'}
          `} />
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Tone:
                            </span>
                            <span className={`
                text-xs font-bold
                ${audience === 'student' ? 'text-teal-600 dark:text-teal-400' : 'text-blue-600 dark:text-blue-400'}
              `}>
                                {guidelines.style}
                            </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                            {guidelines.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
