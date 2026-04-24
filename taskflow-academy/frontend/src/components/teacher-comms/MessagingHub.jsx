import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, Star, AlertTriangle, Calendar } from 'lucide-react';
import { messageTemplates } from '../../store/mockReportsStore';

/**
 * MessagingHub Component
 * Professional messaging suite with templates
 */
export default function MessagingHub({ students, audience, onSendMessage }) {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(students[0] || null);
    const [customMessage, setCustomMessage] = useState('');
    const [sendStatus, setSendStatus] = useState(null);

    const handleTemplateSelect = (templateKey) => {
        const template = messageTemplates[templateKey];
        setSelectedTemplate(templateKey);

        // Populate with template content
        const templateText = template.templates[audience];
        const personalizedText = templateText
            .replace('[Student Name]', selectedStudent?.name || 'Student')
            .replace('[Subject]', 'your class')
            .replace('[Teacher Name]', 'Your Teacher');

        setCustomMessage(personalizedText);
    };

    const handleSend = () => {
        if (!customMessage.trim()) return;

        const message = {
            studentId: selectedStudent?.id,
            studentName: selectedStudent?.name,
            audience,
            template: selectedTemplate,
            content: customMessage,
            sentAt: new Date().toISOString()
        };

        onSendMessage(message);

        setSendStatus('sent');
        setTimeout(() => {
            setSendStatus(null);
            setCustomMessage('');
            setSelectedTemplate(null);
        }, 2000);
    };

    const getTemplateIcon = (key) => {
        switch (key) {
            case 'academicPraise':
                return <Star className="w-5 h-5" />;
            case 'behavioralConcern':
                return <AlertTriangle className="w-5 h-5" />;
            case 'meetingRequest':
                return <Calendar className="w-5 h-5" />;
            default:
                return <MessageSquare className="w-5 h-5" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Student Selector */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Send Message To
                </label>
                <select
                    value={selectedStudent?.id || ''}
                    onChange={(e) => {
                        const student = students.find(s => s.id === e.target.value);
                        setSelectedStudent(student);
                    }}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Template Selection */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Message Templates
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(messageTemplates).map(([key, template]) => (
                        <button
                            key={key}
                            onClick={() => handleTemplateSelect(key)}
                            className={`
                p-4 rounded-xl border-2 transition-all text-left
                ${selectedTemplate === key
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                                }
              `}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`
                  p-2 rounded-lg
                  ${template.category === 'positive'
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                        : template.category === 'concern'
                                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                    }
                `}>
                                    {getTemplateIcon(key)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-2xl">{template.icon}</span>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">
                                            {template.name}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 capitalize">
                                        {template.category}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Message Composer */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {selectedTemplate ? 'Customize Your Message' : 'Compose Message'}
                        </label>
                        {selectedTemplate && (
                            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                                Using Template: {messageTemplates[selectedTemplate].name}
                            </span>
                        )}
                    </div>
                </div>

                <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Select a template above or type your message here..."
                    className="w-full p-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none resize-none"
                    rows={12}
                />

                <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {sendStatus === 'sent' && (
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 animate-in fade-in">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Message sent successfully!</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={!customMessage.trim()}
                        className={`
              flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all
              ${!customMessage.trim()
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105'
                            }
            `}
                    >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                    </button>
                </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Communication Tips
                </h4>
                <ul className="text-sm text-indigo-800 dark:text-indigo-400 space-y-1">
                    <li>• Templates automatically adjust tone based on your selected audience (Student/Parent)</li>
                    <li>• Personalize templates with specific examples and details</li>
                    <li>• Keep messages clear, concise, and action-oriented</li>
                    <li>• Follow up on important communications within 48 hours</li>
                </ul>
            </div>
        </div>
    );
}
