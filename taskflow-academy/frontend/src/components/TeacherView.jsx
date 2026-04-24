import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, FileText, CheckCircle, Clock, BarChart3, BrainCircuit, Sparkles, X, ChevronRight, Linkedin, MessageSquare, Calendar } from 'lucide-react';
import TeacherCommunications from './teacher-comms/TeacherCommunications';
import CreateAssignmentModal from './CreateAssignmentModal';
import AttendanceManagement from './AttendanceManagement';
import NoticeBoardSimple from './NoticeBoardSimple';
import ClassAnalyticsDashboard from './ClassAnalyticsDashboard';
import { getClassById, getClassPerformanceMetrics, getUpcomingAssessments, getClassAnalytics } from '../data/classData';
// Data will be fetched from backend API

const TeacherView = ({ user, attendanceRecords, onUpdateAttendance, subjects = [], notices = [], showCreateModal, setShowCreateModal }) => {
  // Initialize state from localStorage or defaults
  const [activeView, setActiveView] = useState(() => {
    const saved = localStorage.getItem('taskflow-activeView');
    return saved || 'queue';
  });
  const [selectedSubmission, setSelectedSubmission] = useState(() => {
    const saved = localStorage.getItem('taskflow-selectedSubmission');
    return saved ? JSON.parse(saved) : null;
  });
  const [aiSummary, setAiSummary] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => {
    const saved = localStorage.getItem('taskflow-searchQuery');
    return saved || '';
  });
  const [showSearch, setShowSearch] = useState(false);
  const [showChart, setShowChart] = useState(() => {
    const saved = localStorage.getItem('taskflow-showChart');
    return saved === 'true';
  });
  const [isHoveringSearch, setIsHoveringSearch] = useState(false);
  const [isHoveringChart, setIsHoveringChart] = useState(false);
  const [createdAssignments, setCreatedAssignments] = useState(() => {
    const saved = localStorage.getItem('taskflow-createdAssignments');
    return saved ? JSON.parse(saved) : [];
  });

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('taskflow-activeView', activeView);
  }, [activeView]);

  useEffect(() => {
    if (selectedSubmission) {
      localStorage.setItem('taskflow-selectedSubmission', JSON.stringify(selectedSubmission));
    } else {
      localStorage.removeItem('taskflow-selectedSubmission');
    }
  }, [selectedSubmission]);

  useEffect(() => {
    localStorage.setItem('taskflow-searchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('taskflow-showChart', showChart.toString());
  }, [showChart]);

  useEffect(() => {
    localStorage.setItem('taskflow-createdAssignments', JSON.stringify(createdAssignments));
  }, [createdAssignments]);

  const stats = [
    { label: 'Total Submissions', value: '142', change: '+12%', icon: FileText, color: 'indigo' },
    { label: 'Graded', value: '118', change: '83%', icon: CheckCircle, color: 'emerald' },
    { label: 'Pending Review', value: '24', change: '-5', icon: Clock, color: 'amber' },
  ];

  const reviewQueue = [
    {
      id: 1,
      student: 'Alex Johnson',
      assignment: 'Advanced React Patterns',
      date: '2 hours ago',
      status: 'Pending',
      avatar: 'AJ',
      linkedin: 'https://linkedin.com/in/alexjohnson'
    },
    {
      id: 2,
      student: 'Sarah Smith',
      assignment: 'Database Schema Design',
      date: '5 hours ago',
      status: 'Pending',
      avatar: 'SS',
      linkedin: 'https://linkedin.com/in/sarahsmith'
    },
    {
      id: 3,
      student: 'Mike Brown',
      assignment: 'API Integration',
      date: '1 day ago',
      status: 'Late',
      avatar: 'MB',
      linkedin: 'https://linkedin.com/in/mikebrown'
    },
    {
      id: 4,
      student: 'Emily Davis',
      assignment: 'UI/UX Principles',
      date: '1 day ago',
      status: 'Pending',
      avatar: 'ED',
      linkedin: 'https://linkedin.com/in/emilydavis'
    },
  ];

  const filteredQueue = reviewQueue.filter(
    item =>
      item.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateAiSummary = () => {
    setIsGeneratingAi(true);
    setAiSummary('');
    // Mock AI delay
    setTimeout(() => {
      setAiSummary("The student demonstrates a strong understanding of component composition and hook usage. Code structure is clean, though error handling in the API fetch logic could be more robust. Overall, the implementation meets all core requirements with excellent attention to accessibility.");
      setIsGeneratingAi(false);
    }, 1500);
  };

  const handleCreateAssignment = (newAssignment) => {
    setCreatedAssignments(prev => [newAssignment, ...prev]);
    // You could also show a success notification here
    console.log('New assignment created:', newAssignment);
  };

  // Animation variants for smooth transitions
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="space-y-8">
      {/* View Toggle Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView('queue')}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all
              ${activeView === 'queue'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }
            `}
          >
            <FileText className="w-5 h-5" />
            <span>Review Queue</span>
          </button>
          <button
            onClick={() => setActiveView('communications')}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all
              ${activeView === 'communications'
                ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }
            `}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Communications Hub</span>
          </button>
          <button
            onClick={() => setActiveView('attendance')}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all
              ${activeView === 'attendance'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }
            `}
          >
            <Calendar className="w-5 h-5" />
            <span>Attendance</span>
          </button>
          <button
            onClick={() => setActiveView('class-analytics')}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all
              ${activeView === 'class-analytics'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }
            `}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Class Analytics</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'communications' ? (
          <TeacherCommunications students={students} />
        ) : activeView === 'attendance' ? (
          <motion.div
            key="attendance"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <AttendanceManagement
              attendanceRecords={attendanceRecords || []}
              students={students}
              classes={classes}
              subjects={subjects}
              onUpdateAttendance={onUpdateAttendance}
            />
          </motion.div>
        ) : activeView === 'class-analytics' ? (
          <motion.div
            key="class-analytics"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ClassAnalyticsDashboard />
          </motion.div>
        ) : (
          <motion.div
            key="review-queue"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent dark:from-slate-800/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

                  <div className="relative flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        {stat.label}
                      </p>
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {stat.value}
                      </h3>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${stat.change.startsWith('+')
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                        {stat.change.startsWith('+') && (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        )}
                        <span>{stat.change}</span>
                        {stat.change.includes('%') && <span className="opacity-70">vs last week</span>}
                      </div>
                    </div>

                    {/* Icon with gradient background */}
                    <div className={`relative p-4 rounded-2xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 dark:from-${stat.color}-900/40 dark:to-${stat.color}-800/40 text-${stat.color}-600 dark:text-${stat.color}-400 shadow-lg shadow-${stat.color}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Main Content: Review Queue */}
              <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {showChart ? 'Analytics Dashboard' : 'Review Queue'}
                  </h2>
                  <div className="flex items-center space-x-2">
                    {!showChart && (
                      <>
                        {showSearch ? (
                          <div className="relative">
                            <div className="relative overflow-hidden">
                              <div
                                className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 transform origin-left scale-x-100 transition-transform duration-500 ease-out"
                                style={{ zIndex: -1 }}
                              />
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search submissions..."
                                className="pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                                autoFocus
                                style={{
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                  transformOrigin: 'right center',
                                  animation: 'slideIn 0.3s ease-out forwards',
                                }}
                              />
                              <Search
                                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300"
                                style={{
                                  transform: `translateY(-50%) ${searchQuery ? 'scale(1.2)' : 'scale(1)'}`,
                                  color: searchQuery ? '#6366f1' : ''
                                }}
                              />
                              <button
                                onClick={() => {
                                  setShowSearch(false);
                                  setSearchQuery('');
                                }}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-200 hover:scale-125 active:scale-95"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                            <button
                              onClick={() => setShowSearch(true)}
                              onMouseEnter={() => setIsHoveringSearch(true)}
                              onMouseLeave={() => setIsHoveringSearch(false)}
                              className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 transform hover:scale-110 active:scale-95"
                            >
                              <div className="relative">
                                <Search
                                  className="w-5 h-5 transition-transform duration-300"
                                  style={{
                                    transform: isHoveringSearch ? 'rotate(-10deg) scale(1.2)' : 'rotate(0) scale(1)'
                                  }}
                                />
                                <span
                                  className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full opacity-0 transition-all duration-300"
                                  style={{
                                    opacity: isHoveringSearch ? 1 : 0,
                                    transform: isHoveringSearch ? 'scale(1.5)' : 'scale(0)'
                                  }}
                                />
                              </div>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                    <div className="relative">
                      <button
                        onClick={() => setShowChart(!showChart)}
                        onMouseEnter={() => setIsHoveringChart(true)}
                        onMouseLeave={() => setIsHoveringChart(false)}
                        className={`p-2 transition-all duration-300 transform ${showChart ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                      >
                        <div className="relative">
                          <BarChart3
                            className="w-5 h-5 transition-all duration-300"
                            style={{
                              transform: isHoveringChart || showChart ? 'scale(1.2)' : 'scale(1)',
                              color: showChart ? '#6366f1' : ''
                            }}
                          />
                          {showChart && (
                            <span
                              className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"
                              style={{
                                animation: 'pulse 2s infinite'
                              }}
                            />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                {showChart ? (
                  <div className="p-6 animate-fadeIn">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Submission Analytics</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <select className="text-sm bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>This Week</option>
                            <option>Last Week</option>
                            <option>This Month</option>
                            <option>All Time</option>
                          </select>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Submissions</p>
                              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">142</p>
                              <p className="text-xs text-emerald-500 flex items-center mt-1">
                                <span className="inline-block w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-emerald-500 mr-1"></span>
                                +12% from last week
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                              <FileText className="w-6 h-6" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Graded</p>
                              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">118</p>
                              <p className="text-xs text-emerald-500 flex items-center mt-1">
                                <span className="inline-block w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-emerald-500 mr-1"></span>
                                83% completion
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                              <CheckCircle className="w-6 h-6" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Review</p>
                              <p className="text-2xl font-bold text-amber-500 dark:text-amber-400 mt-1">24</p>
                              <p className="text-xs text-amber-500 flex items-center mt-1">
                                <span className="inline-block w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-amber-500 mr-1"></span>
                                5 new today
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                              <Clock className="w-6 h-6" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Grading Time</p>
                              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">2.3d</p>
                              <p className="text-xs text-red-500 flex items-center mt-1">
                                <span className="inline-block w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-red-500 mr-1"></span>
                                +0.5d from avg.
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                              <BarChart3 className="w-6 h-6" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Charts Section */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Submission Trend */}
                        <div className="bg-white/80 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                          <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Submission Trend</h4>
                          <div className="h-64 flex items-center justify-center">
                            <div className="w-full">
                              <div className="flex justify-between text-xs text-slate-400 mb-2 px-1">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                              </div>
                              <div className="flex items-end h-32 gap-1">
                                {[5, 8, 12, 9, 15, 7, 10].map((height, i) => (
                                  <div key={i} className="flex-1 flex flex-col items-center">
                                    <div
                                      className="w-full bg-gradient-to-t from-indigo-500 to-blue-400 rounded-t-sm"
                                      style={{ height: `${height * 5}px` }}
                                    ></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Assignment Distribution */}
                        <div className="bg-white/80 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                          <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Assignment Distribution</h4>
                          <div className="h-64 flex items-center justify-center">
                            <div className="relative w-32 h-32">
                              <div className="absolute inset-0 rounded-full border-8 border-indigo-100 dark:border-indigo-900/30"></div>
                              <div className="absolute inset-0 rounded-full border-8 border-indigo-200 dark:border-indigo-800/50" style={{ clipPath: 'inset(0 50% 0 0)' }}></div>
                              <div className="absolute inset-0 rounded-full border-8 border-indigo-300 dark:border-indigo-700/70" style={{ clipPath: 'inset(0 0 0 50%)' }}></div>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">142</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Total</span>
                              </div>
                            </div>
                            <div className="ml-8 space-y-3">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                                <span className="text-sm text-slate-600 dark:text-slate-300">React (42)</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-indigo-400 mr-2"></div>
                                <span className="text-sm text-slate-600 dark:text-slate-300">Database (38)</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-indigo-300 mr-2"></div>
                                <span className="text-sm text-slate-600 dark:text-slate-300">UI/UX (32)</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-indigo-200 mr-2"></div>
                                <span className="text-sm text-slate-600 dark:text-slate-300">Other (30)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                    {filteredQueue.length > 0 ? (
                      filteredQueue.map((item, index) => (
                        <div
                          key={item.id}
                          className={`group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${selectedSubmission?.id === item.id
                            ? 'bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 border-indigo-300 dark:border-indigo-700 shadow-lg shadow-indigo-500/20'
                            : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-xl hover:shadow-indigo-500/10'
                            }`}
                          onClick={() => {
                            setSelectedSubmission(item);
                            setAiSummary('');
                          }}
                          style={{
                            animation: `fadeInUp 0.3s ease-out ${index * 0.05}s backwards`
                          }}
                        >
                          {/* Gradient accent bar */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${selectedSubmission?.id === item.id
                            ? 'bg-gradient-to-b from-indigo-500 to-violet-500'
                            : 'bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 group-hover:from-indigo-400 group-hover:to-violet-400'
                            }`} />

                          {/* Hover glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="relative p-6 flex items-center justify-between">
                            <div className="flex items-center space-x-4 flex-1">
                              {/* Avatar with gradient ring */}
                              <div className="relative">
                                <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300`} />
                                <div className={`relative w-14 h-14 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 ${selectedSubmission?.id === item.id
                                  ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30'
                                  : 'bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 group-hover:from-indigo-100 group-hover:to-violet-100 dark:group-hover:from-indigo-900/50 dark:group-hover:to-violet-900/50'
                                  }`}>
                                  {item.avatar}
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className={`font-bold text-lg transition-colors ${selectedSubmission?.id === item.id
                                    ? 'text-indigo-900 dark:text-indigo-100'
                                    : 'text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                                    }`}>
                                    {item.student}
                                  </h4>
                                  <a
                                    href={item.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-500 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110"
                                    onClick={(e) => e.stopPropagation()}
                                    title="View LinkedIn Profile"
                                  >
                                    <Linkedin className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                                <p className="text-base text-slate-600 dark:text-slate-400 truncate">
                                  {item.assignment}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 ml-4">
                              {/* Time badge */}
                              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                                <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                  {item.date}
                                </span>
                              </div>

                              {/* Status badge with glow */}
                              <div className="relative">
                                {item.status === 'Late' && (
                                  <div className="absolute inset-0 bg-red-500 blur-md opacity-30 animate-pulse" />
                                )}
                                <span className={`relative px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-200 ${item.status === 'Late'
                                  ? 'bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border-red-300 dark:from-red-900/30 dark:to-orange-900/30 dark:text-red-300 dark:border-red-700 shadow-lg shadow-red-500/20'
                                  : 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-300 dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-300 dark:border-amber-700 shadow-lg shadow-amber-500/20'
                                  }`}>
                                  {item.status}
                                </span>
                              </div>

                              {/* Arrow indicator */}
                              <ChevronRight className={`w-5 h-5 transition-all duration-300 ${selectedSubmission?.id === item.id
                                ? 'text-indigo-500 translate-x-1'
                                : 'text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1'
                                }`} />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                          <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                          No submissions found matching your search.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              
              {/* Right Panel: Actions & Details */}
              <div className="lg:col-span-1 space-y-10">
                
                
                {/* Selected Submission Review Panel */}
                {(() => {
                  // Auto-select first submission if none is selected
                  if (!selectedSubmission && filteredQueue.length > 0) {
                    setSelectedSubmission(filteredQueue[0]);
                  }
                  return selectedSubmission || (filteredQueue.length > 0 ? filteredQueue[0] : null);
                })() && (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl animate-in slide-in-from-right-4 duration-300">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-indigo-500" />
                      Grading: {(selectedSubmission || filteredQueue[0])?.student}
                    </h3>

                    <div className="space-y-5 mb-8">
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide font-semibold block mb-1">Assignment</span>
                          <span className="font-bold text-base">{(selectedSubmission || filteredQueue[0])?.assignment}</span>
                        </div>
                        <a
                          href={(selectedSubmission || filteredQueue[0])?.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl text-sm text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all border border-blue-200 dark:border-blue-800 font-medium hover:scale-[1.02] transform"
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          View {(selectedSubmission || filteredQueue[0])?.student?.split(' ')[0]}'s LinkedIn Profile
                        </a>
                      </div>

                      {/* AI Insight Button */}
                      <div className="relative">
                        <button
                          onClick={handleGenerateAiSummary}
                          disabled={isGeneratingAi}
                          className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all flex items-center justify-center disabled:opacity-70 transform hover:scale-[1.02]"
                        >
                          {isGeneratingAi ? (
                            <>
                              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                              Analyzing Submission...
                            </>
                          ) : (
                            <>
                              <BrainCircuit className="w-4 h-4 mr-2" />
                              Generate AI Summary
                            </>
                          )}
                        </button>

                        {aiSummary && (
                          <div className="mt-4 p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed animate-in fade-in duration-500 shadow-lg">
                            <div className="flex items-start">
                              <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-emerald-500 flex-shrink-0" />
                              <p>{aiSummary}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Grade (0-100)</label>
                        <input type="number" className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 py-3 px-4 text-lg font-medium" placeholder="e.g. 95" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Feedback</label>
                        <textarea className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 h-24 resize-none" placeholder="Enter detailed feedback..."></textarea>
                      </div>
                      <button className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
                        Submit Grade
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notice Board */}
            <div className="mt-8">
              <NoticeBoardSimple userRole="teacher" />
            </div>

            {/* Create Assignment Modal */}
            <CreateAssignmentModal
              isOpen={showCreateModal}
              onClose={() => setShowCreateModal(false)}
              onCreateAssignment={handleCreateAssignment}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherView;
