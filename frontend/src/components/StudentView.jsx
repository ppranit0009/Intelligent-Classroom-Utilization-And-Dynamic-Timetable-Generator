import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, CheckCircle, Clock, BarChart3, BrainCircuit, Sparkles, X, ChevronRight, Linkedin, MessageSquare, Calendar, BookOpen, User, GraduationCap, AlertCircle, Users, LogOut, Moon, Sun, Eye, Settings, Home, Bell, AlertTriangle, Zap } from 'lucide-react';
import FocusZone from './FocusZone';
import StudentProfile from './StudentProfile';
import AttendanceMarker from './AttendanceMarker';
import AssignmentDashboard from './AssignmentDashboard';
import NoticeBoardSimple from './NoticeBoardSimple';
import JoinClassPage from './JoinClassPage';
import EmergencyTimetable, { EMERGENCY_TIMETABLE_KEY } from './EmergencyTimetable';
// Data will be fetched from backend API

const StudentView = ({ user, attendanceRecords, subjects = [], assignments = [], notices = [] }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    email: user?.email || '',
    recoveryNumber: '',
    linkedinProfile: ''
  });
  const [errors, setErrors] = useState({});
  
  // Class joining state
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('taskflow-studentActiveTab');
    return saved || 'overview';
  });
  const [showJoinClassPage, setShowJoinClassPage] = useState(false);
  const [hasEmergencyTimetable, setHasEmergencyTimetable] = useState(false);
  const [joinClassCode, setJoinClassCode] = useState('');
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock available classes (in real app, this would come from backend)
  const [availableClasses] = useState([
    {
      id: 'C101',
      name: 'Mathematics 101',
      grade: 'Grade 10',
      section: 'A',
      teacher: 'Ms. Sarah Johnson',
      description: 'Advanced mathematics covering algebra, geometry, and trigonometry',
      roomNumber: 'Room 201',
      schedule: 'Mon-Wed-Fri 9:00 AM - 10:30 AM',
      currentStudents: 25,
      maxStudents: 40,
      classCode: 'MATH101',
      status: 'active'
    },
    {
      id: 'C102',
      name: 'Physics 101',
      grade: 'Grade 10',
      section: 'B',
      teacher: 'Mr. David Chen',
      description: 'Introduction to physics with hands-on experiments',
      roomNumber: 'Room 305',
      schedule: 'Tue-Thu 11:00 AM - 12:30 PM',
      currentStudents: 18,
      maxStudents: 35,
      classCode: 'PHYS101',
      status: 'active'
    },
    {
      id: 'C103',
      name: 'Chemistry Lab',
      grade: 'Grade 11',
      section: 'A',
      teacher: 'Dr. Emily Rodriguez',
      description: 'Chemistry fundamentals with laboratory experiments',
      roomNumber: 'Lab 102',
      schedule: 'Mon-Wed 2:00 PM - 4:00 PM',
      currentStudents: 22,
      maxStudents: 30,
      classCode: 'CHEM101',
      status: 'active'
    }
  ]);
  
  // Poll localStorage for emergency timetable every 5 seconds
  useEffect(() => {
    const check = () => {
      const stored = localStorage.getItem(EMERGENCY_TIMETABLE_KEY);
      setHasEmergencyTimetable(!!stored);
    };
    check();
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'joinClass', label: 'Join Class', icon: Plus },
    { id: 'myClasses', label: 'My Classes', icon: BookOpen },
    { id: 'notices', label: 'Notices', icon: Bell },
    { id: 'emergencyTimetable', label: 'Emergency Timetable', icon: AlertTriangle, emergency: true },
    ...(enrolledClasses.length > 0 ? [
      { id: 'assignments', label: 'Assignments', icon: FileText },
      { id: 'attendance', label: 'Attendance', icon: Clock }
    ] : [])
  ];

  // Check if profile is complete on component mount
  useEffect(() => {
    // In a real app, you would check this from the user's profile data
    const isProfileComplete = localStorage.getItem('isProfileComplete') === 'true';
    if (!isProfileComplete) {
      setShowProfileModal(true);
    }
  }, []);

  // Save activeTab to localStorage
  useEffect(() => {
    localStorage.setItem('taskflow-studentActiveTab', activeTab);
  }, [activeTab]);

  
  const validateForm = () => {
    const newErrors = {};

    if (!profileData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!profileData.recoveryNumber) {
      newErrors.recoveryNumber = 'Recovery number is required';
    } else if (!/^\d{10}$/.test(profileData.recoveryNumber)) {
      newErrors.recoveryNumber = 'Please enter a valid 10-digit number';
    }

    if (!profileData.linkedinProfile) {
      newErrors.linkedinProfile = 'LinkedIn profile is required';
    } else if (!/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-z0-9_-]+\/?$/i.test(profileData.linkedinProfile)) {
      newErrors.linkedinProfile = 'Please enter a valid LinkedIn profile URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Class joining functions
  const handleJoinClass = () => {
    const classToJoin = availableClasses.find(c => c.classCode === joinClassCode.toUpperCase());
    
    if (classToJoin) {
      if (classToJoin.currentStudents >= classToJoin.maxStudents) {
        alert('This class is already full!');
        return;
      }
      
      if (enrolledClasses.find(c => c.id === classToJoin.id)) {
        alert('You are already enrolled in this class!');
        return;
      }
      
      setEnrolledClasses([...enrolledClasses, { ...classToJoin, enrolledAt: new Date().toISOString() }]);
      setJoinClassCode('');
      alert(`Successfully joined ${classToJoin.name}!`);
    } else {
      alert('Invalid class code. Please check and try again.');
    }
  };

  const handleLeaveClass = (classId) => {
    const classToLeave = enrolledClasses.find(c => c.id === classId);
    if (classToLeave && window.confirm(`Are you sure you want to leave ${classToLeave.name}?`)) {
      setEnrolledClasses(enrolledClasses.filter(c => c.id !== classId));
    }
  };

  const filteredAvailableClasses = availableClasses.filter(c => 
    !enrolledClasses.find(ec => ec.id === c.id) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.classCode.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle class joined from dedicated page
  const handleClassJoinedFromPage = (joinedClass) => {
    setEnrolledClasses([...enrolledClasses, joinedClass]);
    setShowJoinClassPage(false);
    setActiveTab('myClasses');
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would save this to your backend
      localStorage.setItem('isProfileComplete', 'true');
      setShowProfileModal(false);
      // You might want to update the user's profile in your state/context here
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);



  const handleUploadClick = (assignment) => {
    setActiveAssignment(assignment);
    setShowUploadModal(true);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShowUploadModal(false);
          setIsUploading(false);
          // In a real app, we'd update state here
        }, 500);
      }
    }, 100);
  };

  // Don't render the main content if profile is not complete
  if (showProfileModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Complete Your Profile</h2>
            <button
              onClick={() => { }}
              className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
              disabled={true}
              title="Please complete your profile to continue"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Please complete your profile to access all features. This information helps us keep your account secure.
          </p>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className={`pl-10 w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="recoveryNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Recovery Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="tel"
                  id="recoveryNumber"
                  name="recoveryNumber"
                  value={profileData.recoveryNumber}
                  onChange={handleInputChange}
                  className={`pl-10 w-full rounded-lg border ${errors.recoveryNumber ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="1234567890"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">We'll use this to help you recover your account if needed</p>
              {errors.recoveryNumber && <p className="mt-1 text-sm text-red-500">{errors.recoveryNumber}</p>}
            </div>

            <div>
              <label htmlFor="linkedinProfile" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="url"
                  id="linkedinProfile"
                  name="linkedinProfile"
                  value={profileData.linkedinProfile}
                  onChange={handleInputChange}
                  className={`pl-10 w-full rounded-lg border ${errors.linkedinProfile ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              {errors.linkedinProfile && <p className="mt-1 text-sm text-red-500">{errors.linkedinProfile}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Complete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Render profile completion modal if needed
  if (showProfileModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Complete Your Profile</h2>
          </div>

          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Please complete your profile to access all features. This information helps us keep your account secure.
          </p>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className={`pl-10 w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="recoveryNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Recovery Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="tel"
                  id="recoveryNumber"
                  name="recoveryNumber"
                  value={profileData.recoveryNumber}
                  onChange={handleInputChange}
                  className={`pl-10 w-full rounded-lg border ${errors.recoveryNumber ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="1234567890"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">We'll use this to help you recover your account if needed</p>
              {errors.recoveryNumber && <p className="mt-1 text-sm text-red-500">{errors.recoveryNumber}</p>}
            </div>

            <div>
              <label htmlFor="linkedinProfile" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="url"
                  id="linkedinProfile"
                  name="linkedinProfile"
                  value={profileData.linkedinProfile}
                  onChange={handleInputChange}
                  className={`pl-10 w-full rounded-lg border ${errors.linkedinProfile ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              {errors.linkedinProfile && <p className="mt-1 text-sm text-red-500">{errors.linkedinProfile}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Complete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Main dashboard view
  console.log('Rendering StudentView - showJoinClassPage:', showJoinClassPage, 'activeTab:', activeTab);
  return (
    <>
      {showJoinClassPage ? (
        <JoinClassPage
          user={user}
          onClassJoined={handleClassJoinedFromPage}
          onNavigateBack={() => {
                  setShowJoinClassPage(false);
                  setActiveTab('overview'); // Reset to overview when navigating back
                }}
        />
      ) : (
        <div className="space-y-6 p-4 md:p-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
                <p className="text-blue-100 text-lg">Welcome back, {user?.name || 'Student'}!</p>
                <p className="text-blue-200 text-sm mt-1">Student ID: {user?.id || 'STU001'}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <GraduationCap className="w-12 h-12 mx-auto mb-2" />
                <p className="text-2xl font-bold">{enrolledClasses.length}</p>
                <p className="text-sm text-blue-100">Enrolled Classes</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-wrap gap-1 lg:gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'joinClass') {
                      setShowJoinClassPage(true);
                      setActiveTab('joinClass');
                    } else {
                      setShowJoinClassPage(false);
                      setActiveTab(tab.id);
                    }
                  }}
                  className={`
                    relative flex items-center gap-1.5 lg:gap-2 px-2 lg:px-4 py-2 lg:py-3 rounded-lg font-medium text-xs lg:text-sm transition-all whitespace-nowrap
                    ${activeTab === tab.id
                      ? tab.emergency
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                      : tab.emergency && hasEmergencyTimetable
                        ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 animate-pulse'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  <tab.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.emergency && hasEmergencyTimetable && activeTab !== tab.id && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                  )}
                </button>
              ))}
            </div>
          </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Enrolled Classes</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{enrolledClasses.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending Tasks</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{enrolledClasses.length > 0 ? '12' : '0'}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Attendance</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{enrolledClasses.length > 0 ? '92%' : 'N/A'}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Progress</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{enrolledClasses.length > 0 ? '85%' : 'N/A'}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Join Class Call to Action */}
          {enrolledClasses.length === 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 text-center">
              <div className="max-w-2xl mx-auto">
                <BookOpen className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Join Your First Class to Get Started
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                  You need to join at least one class to access assignments, attendance, and other features.
                </p>
                <button
                  onClick={() => setShowJoinClassPage(true)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg font-semibold text-lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Join Your First Class
                </button>
              </div>
            </div>
          )}

          {/* Recent Classes */}
          {enrolledClasses.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-500" />
                My Classes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledClasses.map((classItem) => (
                  <div key={classItem.id} className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{classItem.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{classItem.teacher}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{classItem.schedule}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-bold">
                        {classItem.grade}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Users className="w-4 h-4" />
                        <span>{classItem.currentStudents}/{classItem.maxStudents} students</span>
                      </div>
                      <button
                        onClick={() => handleLeaveClass(classItem.id)}
                        className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                      >
                        Leave Class
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'joinClass' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Plus className="w-6 h-6 text-blue-500" />
            Join New Class
          </h3>
          
          {/* Quick Join Section */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Join with Class Code</h4>
            <div className="flex gap-4">
              <input
                type="text"
                value={joinClassCode}
                onChange={(e) => setJoinClassCode(e.target.value)}
                placeholder="Enter class code (e.g., MATH101)"
                className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-center text-lg"
                maxLength={10}
              />
              <button
                onClick={handleJoinClass}
                disabled={!joinClassCode}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg font-semibold"
              >
                Join Class
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
              Get the class code from your teacher to join their class
            </p>
          </div>

          {/* Search and Browse Classes */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Browse Available Classes</h4>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by class name, teacher, or code..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {filteredAvailableClasses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAvailableClasses.map((classItem) => (
                  <div key={classItem.id} className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white">{classItem.name}</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{classItem.teacher}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{classItem.schedule}</p>
                      </div>
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold">
                        {classItem.classCode}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {classItem.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Users className="w-4 h-4" />
                        <span>{classItem.currentStudents}/{classItem.maxStudents}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <BookOpen className="w-4 h-4" />
                        <span>{classItem.grade}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setJoinClassCode(classItem.classCode);
                        handleJoinClass();
                      }}
                      disabled={classItem.currentStudents >= classItem.maxStudents}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                    >
                      {classItem.currentStudents >= classItem.maxStudents ? 'Class Full' : 'Join Class'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  {searchQuery ? 'No classes found matching your search' : 'No available classes at the moment'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'myClasses' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            My Enrolled Classes
          </h3>
          
          {enrolledClasses.length > 0 ? (
            <div className="space-y-6">
              {enrolledClasses.map((classItem) => (
                <div key={classItem.id} className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{classItem.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">Teacher:</span> {classItem.teacher}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">Schedule:</span> {classItem.schedule}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">Room:</span> {classItem.roomNumber}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">Grade:</span> {classItem.grade}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">Section:</span> {classItem.section}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">Class Code:</span> <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{classItem.classCode}</span>
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        {classItem.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Users className="w-4 h-4" />
                            <span>{classItem.currentStudents}/{classItem.maxStudents} students</span>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">Enrolled:</span> {new Date(classItem.enrolledAt).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          onClick={() => handleLeaveClass(classItem.id)}
                          className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                        >
                          Leave Class
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">You haven't joined any classes yet</p>
              <button
                onClick={() => setActiveTab('joinClass')}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
              >
                Browse Classes
              </button>
            </div>
          )}
        </div>
      )}

      {/* Keep existing components for other tabs */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <AssignmentDashboard
            assignments={assignments}
            subjects={subjects}
            user={user}
            submissions={submissions}
          />
        </div>
      )}

      {activeTab === 'attendance' && (
        <AttendanceMarker
          user={user}
          attendanceRecords={attendanceRecords || []}
          subjects={subjects}
        />
      )}

      {activeTab === 'notices' && (
        <NoticeBoardSimple userRole="student" />
      )}

      {activeTab === 'emergencyTimetable' && (
        <div className="space-y-4">
          {/* Emergency Timetable Header */}
          <div className={`rounded-2xl p-6 text-white shadow-xl ${
            hasEmergencyTimetable
              ? 'bg-gradient-to-r from-red-600 to-orange-600'
              : 'bg-gradient-to-r from-slate-600 to-slate-700'
          }`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                {hasEmergencyTimetable
                  ? <AlertTriangle className="w-8 h-8 animate-pulse" />
                  : <Zap className="w-8 h-8" />
                }
              </div>
              <div>
                <h2 className="text-2xl font-bold">Emergency Timetable</h2>
                <p className={`text-sm mt-1 ${
                  hasEmergencyTimetable ? 'text-red-100' : 'text-slate-300'
                }`}>
                  {hasEmergencyTimetable
                    ? '🚨 An active emergency schedule has been published by the AI Agent. Review your updated classes below.'
                    : 'All teachers are present. Your regular timetable is in effect. This section will auto-update if any teacher is absent.'}
                </p>
              </div>
            </div>
          </div>
          <EmergencyTimetable userRole="student" />
        </div>
      )}

        </div>
      )}
    </>
  );
};

export default StudentView;
