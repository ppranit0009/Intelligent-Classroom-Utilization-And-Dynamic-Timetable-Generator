import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, Users, MapPin, AlertTriangle, CheckCircle, Plus,
  Settings, Download, Upload, RefreshCw, Save, X, Edit, Trash2,
  Filter, Search, ChevronDown, ChevronRight, Grid, List, Eye,
  Bell, Zap, Target, TrendingUp, BarChart3, Activity
} from 'lucide-react';

const ScheduleManager = ({ user }) => {
  const [activeTab, setActiveTab] = useState('constraints');
  const [schedules, setSchedules] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [showConstraintsModal, setShowConstraintsModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDay, setFilterDay] = useState('all');

  // Constraints state
  const [constraints, setConstraints] = useState({
    semester: 'Fall',
    year: new Date().getFullYear(),
    subjects: [],
    teachers: [],
    rooms: [],
    timePreferences: {
      startTimes: ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00'],
      endTimes: ['09:30', '11:00', '12:30', '14:30', '16:00', '17:30'],
      breakTimes: ['12:30-13:00']
    },
    rules: {
      maxConsecutiveHours: 3,
      minGapBetweenClasses: 30,
      preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      avoidDays: ['Saturday', 'Sunday']
    }
  });

  // Mock data for demonstration
  const [mockSubjects] = useState([
    { id: 'SUB001', name: 'Mathematics', code: 'MATH101', credits: 4, weeklyHours: { lecture: 3, lab: 1 } },
    { id: 'SUB002', name: 'Physics', code: 'PHY101', credits: 4, weeklyHours: { lecture: 2, lab: 2 } },
    { id: 'SUB003', name: 'Computer Science', code: 'CS101', credits: 3, weeklyHours: { lecture: 2, lab: 1 } },
    { id: 'SUB004', name: 'Chemistry', code: 'CHEM101', credits: 4, weeklyHours: { lecture: 2, lab: 2 } },
    { id: 'SUB005', name: 'English', code: 'ENG101', credits: 2, weeklyHours: { lecture: 2, lab: 0 } }
  ]);

  const [mockTeachers] = useState([
    { id: 'T001', name: 'Dr. Sarah Johnson', subjects: ['SUB001', 'SUB005'], availability: 'full' },
    { id: 'T002', name: 'Prof. David Chen', subjects: ['SUB002', 'SUB003'], availability: 'full' },
    { id: 'T003', name: 'Dr. Emily Rodriguez', subjects: ['SUB004'], availability: 'part-time' },
    { id: 'T004', name: 'Prof. Michael Brown', subjects: ['SUB001', 'SUB002'], availability: 'full' }
  ]);

  const [mockRooms] = useState([
    { id: 'R001', name: 'Room 101', type: 'classroom', capacity: 50, building: 'Main Building', floor: 1 },
    { id: 'R002', name: 'Lab 201', type: 'lab', capacity: 30, building: 'Science Block', floor: 2 },
    { id: 'R003', name: 'Lecture Hall A', type: 'lecture hall', capacity: 150, building: 'Main Building', floor: 1 },
    { id: 'R004', name: 'Computer Lab 301', type: 'computer lab', capacity: 40, building: 'Engineering Block', floor: 3 },
    { id: 'R005', name: 'Seminar Room 102', type: 'seminar room', capacity: 25, building: 'Main Building', floor: 1 }
  ]);

  const [mockSchedules] = useState([
    {
      id: 'SCH001',
      subject: mockSubjects[0],
      teacher: mockTeachers[0],
      room: mockRooms[0],
      dayOfWeek: 'Monday',
      startTime: '09:30',
      endTime: '11:00',
      type: 'lecture',
      status: 'active'
    },
    {
      id: 'SCH002',
      subject: mockSubjects[1],
      teacher: mockTeachers[1],
      room: mockRooms[1],
      dayOfWeek: 'Monday',
      startTime: '11:00',
      endTime: '12:30',
      type: 'lab',
      status: 'active'
    },
    {
      id: 'SCH003',
      subject: mockSubjects[2],
      teacher: mockTeachers[1],
      room: mockRooms[3],
      dayOfWeek: 'Tuesday',
      startTime: '14:30',
      endTime: '16:00',
      type: 'lab',
      status: 'active'
    }
  ]);

  useEffect(() => {
    setSchedules(mockSchedules);
  }, []);

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleGenerateSchedule = async () => {
    setLoading(true);
    setNotification({ type: 'info', message: 'Generating optimal schedule...' });
    
    // Simulate API call
    setTimeout(() => {
      const newSchedule = {
        id: `SCH${Date.now()}`,
        subject: mockSubjects[Math.floor(Math.random() * mockSubjects.length)],
        teacher: mockTeachers[Math.floor(Math.random() * mockTeachers.length)],
        room: mockRooms[Math.floor(Math.random() * mockRooms.length)],
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][Math.floor(Math.random() * 5)],
        startTime: constraints.timePreferences.startTimes[Math.floor(Math.random() * constraints.timePreferences.startTimes.length)],
        endTime: constraints.timePreferences.endTimes[Math.floor(Math.random() * constraints.timePreferences.endTimes.length)],
        type: 'lecture',
        status: 'active'
      };
      
      setSchedules([...schedules, newSchedule]);
      setLoading(false);
      setNotification({ type: 'success', message: 'Schedule generated successfully!' });
    }, 2000);
  };

  const handleDetectConflicts = async () => {
    setLoading(true);
    setNotification({ type: 'info', message: 'Detecting conflicts...' });
    
    // Simulate conflict detection
    setTimeout(() => {
      const detectedConflicts = [
        {
          type: 'teacher_conflict',
          message: 'Dr. Sarah Johnson has overlapping classes on Monday 09:30-11:00',
          severity: 'high',
          schedules: ['SCH001', 'SCH004']
        },
        {
          type: 'room_conflict',
          message: 'Room 101 is double booked on Tuesday 14:30-16:00',
          severity: 'medium',
          schedules: ['SCH003', 'SCH005']
        }
      ];
      
      setConflicts(detectedConflicts);
      setShowConflictModal(true);
      setLoading(false);
      setNotification({ type: 'warning', message: `Found ${detectedConflicts.length} conflicts` });
    }, 1500);
  };

  const handleExportTimetable = () => {
    setNotification({ type: 'success', message: 'Timetable exported successfully!' });
  };

  const handleSaveConstraints = () => {
    setNotification({ type: 'success', message: 'Constraints saved successfully!' });
    setShowConstraintsModal(false);
  };

  const tabs = [
    { id: 'constraints', label: 'Constraints', icon: Settings },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'conflicts', label: 'Conflicts', icon: AlertTriangle },
    { id: 'timetable', label: 'Timetable', icon: Grid }
  ];

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         schedule.teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         schedule.room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDay = filterDay === 'all' || schedule.dayOfWeek === filterDay;
    return matchesSearch && matchesDay;
  });

  const ConflictModal = () => (
    <AnimatePresence>
      {showConflictModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowConflictModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                Schedule Conflicts
              </h3>
              <button
                onClick={() => setShowConflictModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              {conflicts.map((conflict, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    conflict.severity === 'high'
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-900 dark:text-red-200'
                      : 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 text-orange-900 dark:text-orange-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{conflict.message}</p>
                      <p className="text-sm opacity-80 mt-1">Type: {conflict.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConflictModal(false)}
                className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setNotification({ type: 'info', message: 'Resolving conflicts...' });
                  setShowConflictModal(false);
                }}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Auto-Resolve
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const ConstraintsModal = () => (
    <AnimatePresence>
      {showConstraintsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowConstraintsModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-500" />
                Scheduling Constraints
              </h3>
              <button
                onClick={() => setShowConstraintsModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Settings */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 dark:text-white">Basic Settings</h4>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Semester
                  </label>
                  <select
                    value={constraints.semester}
                    onChange={(e) => setConstraints({...constraints, semester: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Winter">Winter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    value={constraints.year}
                    onChange={(e) => setConstraints({...constraints, year: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Time Preferences */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 dark:text-white">Time Preferences</h4>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Preferred Start Times
                  </label>
                  <div className="space-y-2">
                    {constraints.timePreferences.startTimes.map((time, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => {
                            const newTimes = [...constraints.timePreferences.startTimes];
                            newTimes[index] = e.target.value;
                            setConstraints({
                              ...constraints,
                              timePreferences: {
                                ...constraints.timePreferences,
                                startTimes: newTimes
                              }
                            });
                          }}
                          className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                        <button
                          onClick={() => {
                            const newTimes = constraints.timePreferences.startTimes.filter((_, i) => i !== index);
                            setConstraints({
                              ...constraints,
                              timePreferences: {
                                ...constraints.timePreferences,
                                startTimes: newTimes
                              }
                            });
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setConstraints({
                          ...constraints,
                          timePreferences: {
                            ...constraints.timePreferences,
                            startTimes: [...constraints.timePreferences.startTimes, '09:00']
                          }
                        });
                      }}
                      className="w-full px-3 py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                    >
                      <Plus className="w-4 h-4 inline mr-2" />
                      Add Start Time
                    </button>
                  </div>
                </div>
              </div>

              {/* Rules */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 dark:text-white">Scheduling Rules</h4>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Max Consecutive Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={constraints.rules.maxConsecutiveHours}
                    onChange={(e) => setConstraints({
                      ...constraints,
                      rules: {
                        ...constraints.rules,
                        maxConsecutiveHours: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Min Gap Between Classes (minutes)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    step="15"
                    value={constraints.rules.minGapBetweenClasses}
                    onChange={(e) => setConstraints({
                      ...constraints,
                      rules: {
                        ...constraints.rules,
                        minGapBetweenClasses: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Resources */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 dark:text-white">Resources</h4>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Available Subjects
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {mockSubjects.map(subject => (
                      <label key={subject.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={constraints.subjects.includes(subject.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setConstraints({...constraints, subjects: [...constraints.subjects, subject.id]});
                            } else {
                              setConstraints({...constraints, subjects: constraints.subjects.filter(id => id !== subject.id)});
                            }
                          }}
                          className="rounded border-slate-300 dark:border-slate-600"
                        />
                        <span className="text-sm">{subject.name} ({subject.code})</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConstraintsModal(false)}
                className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveConstraints}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Constraints
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-6">
      {/* Notification Display */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border ${
          notification.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' :
          notification.type === 'warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
          notification.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' :
          'bg-blue-50 text-blue-700 border-blue-200'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
            {notification.type === 'error' && <X className="w-5 h-5" />}
            {notification.type === 'info' && <Bell className="w-5 h-5" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Schedule Manager</h1>
            <p className="text-blue-100 text-lg">Intelligent Timetable Management System</p>
            <p className="text-blue-200 text-sm mt-1">Algorithmic scheduling with conflict detection</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <p className="text-xl font-bold">{schedules.length}</p>
              <p className="text-sm text-blue-100">Schedules</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
              <p className="text-xl font-bold">{conflicts.length}</p>
              <p className="text-sm text-blue-100">Conflicts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setShowConstraintsModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Configure Constraints
        </button>
        <button
          onClick={handleGenerateSchedule}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Zap className="w-4 h-4" />
          {loading ? 'Generating...' : 'Auto Generate'}
        </button>
        <button
          onClick={handleDetectConflicts}
          disabled={loading}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <AlertTriangle className="w-4 h-4" />
          {loading ? 'Detecting...' : 'Detect Conflicts'}
        </button>
        <button
          onClick={handleExportTimetable}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Timetable
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'constraints' && (
          <motion.div
            key="constraints"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-purple-500" />
                Current Constraints
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Basic Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Semester:</span>
                      <span className="font-medium">{constraints.semester}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Year:</span>
                      <span className="font-medium">{constraints.year}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Time Preferences</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Start Times:</span>
                      <span className="font-medium">{constraints.timePreferences.startTimes.length} options</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Max Hours:</span>
                      <span className="font-medium">{constraints.rules.maxConsecutiveHours}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Resources</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Subjects:</span>
                      <span className="font-medium">{constraints.subjects.length} selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Teachers:</span>
                      <span className="font-medium">{constraints.teachers.length} available</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowConstraintsModal(true)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Edit Constraints
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'schedule' && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Search and Filter */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px] relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search schedules..."
                    className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <select
                  value={filterDay}
                  onChange={(e) => setFilterDay(e.target.value)}
                  className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="all">All Days</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Schedule Grid/List */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-500" />
                Generated Schedules ({filteredSchedules.length})
              </h3>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">{schedule.subject.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{schedule.subject.code}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          schedule.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {schedule.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">{schedule.teacher.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">{schedule.room.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">
                            {schedule.dayOfWeek} {schedule.startTime}-{schedule.endTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => setSelectedSchedule(schedule)}
                          className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="w-3 h-3 inline mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => setNotification({ type: 'info', message: 'Edit schedule' })}
                          className="flex-1 px-3 py-1 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <Edit className="w-3 h-3 inline mr-1" />
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Subject</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Teacher</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Room</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Day & Time</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSchedules.map((schedule) => (
                        <tr key={schedule.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-slate-900 dark:text-white">{schedule.subject.name}</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">{schedule.subject.code}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{schedule.teacher.name}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{schedule.room.name}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                            {schedule.dayOfWeek} {schedule.startTime}-{schedule.endTime}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              schedule.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {schedule.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedSchedule(schedule)}
                                className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setNotification({ type: 'info', message: 'Edit schedule' })}
                                className="p-1 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'conflicts' && (
          <motion.div
            key="conflicts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  Conflict Detection
                </h3>
                <button
                  onClick={handleDetectConflicts}
                  disabled={loading}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Scanning...' : 'Scan for Conflicts'}
                </button>
              </div>

              {conflicts.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Conflicts Found</h4>
                  <p className="text-slate-600 dark:text-slate-400">Your schedule is conflict-free!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {conflicts.map((conflict, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        conflict.severity === 'high'
                          ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                          : 'bg-orange-50 dark:bg-orange-900/20 border-orange-500'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white">{conflict.message}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                            <span>Type: {conflict.type}</span>
                            <span>Severity: {conflict.severity}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setNotification({ type: 'info', message: 'Resolving conflict...' })}
                          className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'timetable' && (
          <motion.div
            key="timetable"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <TimetableView schedules={schedules} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <ConflictModal />
      <ConstraintsModal />
    </div>
  );
};

const TimetableView = ({ schedules }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '08:00-09:30', '09:30-11:00', '11:00-12:30', '13:00-14:30', '14:30-16:00', '16:00-17:30'
  ];

  const getScheduleForSlot = (day, timeSlot) => {
    const [startTime, endTime] = timeSlot.split('-');
    return schedules.find(schedule => 
      schedule.dayOfWeek === day && 
      schedule.startTime === startTime && 
      schedule.endTime === endTime
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Grid className="w-6 h-6 text-green-500" />
          Timetable View
        </h3>
        <button
          onClick={() => setNotification({ type: 'success', message: 'Timetable exported!' })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-left font-medium text-slate-900 dark:text-white">
                Time / Day
              </th>
              {days.map(day => (
                <th key={day} className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-center font-medium text-slate-900 dark:text-white">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(timeSlot => (
              <tr key={timeSlot}>
                <td className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 font-medium text-slate-900 dark:text-white">
                  {timeSlot}
                </td>
                {days.map(day => {
                  const schedule = getScheduleForSlot(day, timeSlot);
                  return (
                    <td key={`${day}-${timeSlot}`} className="border border-slate-200 dark:border-slate-700 p-2 align-top">
                      {schedule ? (
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-2 h-full min-h-[60px]">
                          <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            {schedule.subject.code}
                          </div>
                          <div className="text-xs text-blue-700 dark:text-blue-300">
                            {schedule.room.name}
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            {schedule.teacher.name.split(' ')[0]}
                          </div>
                        </div>
                      ) : (
                        <div className="h-full min-h-[60px] bg-slate-50 dark:bg-slate-800/50 rounded-lg"></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleManager;
