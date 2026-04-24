import React, { useState } from 'react';
import { Sparkles, Loader2, Send, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { refineReport } from '../../services/aiPromptService';

/**
 * ReportForm Component
 * Dual-mode report editor with AI refinement
 */
export default function ReportForm({ audience, selectedStudent, onSave }) {
    const [rawText, setRawText] = useState('');
    const [refinedText, setRefinedText] = useState('');
    const [isRefining, setIsRefining] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    const handleAIRefine = async () => {
        if (!rawText.trim()) {
            return;
        }

        setIsRefining(true);

        // Simulate AI processing delay
        setTimeout(() => {
            const result = refineReport(rawText, audience, selectedStudent);

            if (result.success) {
                setRefinedText(result.refinedText);
                setShowComparison(true);
            }

            setIsRefining(false);
        }, 1200);
    };

    const handleSave = (sendNow = false) => {
        const contentToSave = refinedText || rawText;

        if (!contentToSave.trim()) {
            return;
        }

        const report = {
            studentId: selectedStudent?.id,
            studentName: selectedStudent?.name || 'Unknown Student',
            audience,
            subject: sendNow ? 'Progress Report' : 'Draft Report',
            content: contentToSave,
            status: sendNow ? 'sent' : 'draft'
        };

        onSave(report);

        setSaveStatus(sendNow ? 'sent' : 'saved');
        setTimeout(() => {
            setSaveStatus(null);
            setRawText('');
            setRefinedText('');
            setShowComparison(false);
        }, 2000);
    };

    const wordCount = (refinedText || rawText).split(/\s+/).filter(w => w.length > 0).length;

    return (
        <div className="space-y-4">
            {/* Student Selector Info */}
            {selectedStudent && (
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                            {selectedStudent.avatar || selectedStudent.name?.charAt(0)}
                        </div>
                        <div>
                            <div className="font-semibold text-slate-900 dark:text-white">
                                {selectedStudent.name}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                Writing report for {audience === 'student' ? 'student' : 'parent/guardian'}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Manual Input Area */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Your Notes
                        </label>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            {rawText.split(/\s+/).filter(w => w.length > 0).length} words
                        </span>
                    </div>
                </div>

                <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Type your raw notes here... (e.g., 'Alex did well in math but was late twice')"
                    className="w-full p-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none resize-none"
                    rows={6}
                />

                <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        Raw notes • Will be refined by AI
                    </div>

                    <button
                        onClick={handleAIRefine}
                        disabled={!rawText.trim() || isRefining}
                        className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${!rawText.trim() || isRefining
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105'
                            }
            `}
                    >
                        {isRefining ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Refining...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                <span>AI Refine</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* AI Refined Output */}
            {showComparison && refinedText && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-violet-200 dark:border-violet-800 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 px-4 py-3 border-b border-violet-200 dark:border-violet-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                                <label className="text-sm font-semibold text-violet-900 dark:text-violet-300">
                                    AI-Refined Report
                                </label>
                            </div>
                            <span className="text-xs text-violet-600 dark:text-violet-400">
                                {refinedText.split(/\s+/).filter(w => w.length > 0).length} words
                            </span>
                        </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-slate-900">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <pre className="whitespace-pre-wrap font-sans text-slate-700 dark:text-slate-300">
                                {refinedText}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    {saveStatus === 'saved' && (
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 animate-in fade-in">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Saved as draft</span>
                        </div>
                    )}
                    {saveStatus === 'sent' && (
                        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 animate-in fade-in">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Report sent!</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleSave(false)}
                        disabled={!rawText.trim() && !refinedText.trim()}
                        className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${!rawText.trim() && !refinedText.trim()
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                : 'bg-slate-600 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600'
                            }
            `}
                    >
                        <Save className="w-4 h-4" />
                        <span>Save Draft</span>
                    </button>

                    <button
                        onClick={() => handleSave(true)}
                        disabled={!rawText.trim() && !refinedText.trim()}
                        className={`
              flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm transition-all
              ${!rawText.trim() && !refinedText.trim()
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105'
                            }
            `}
                    >
                        <Send className="w-4 h-4" />
                        <span>Send Report</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
