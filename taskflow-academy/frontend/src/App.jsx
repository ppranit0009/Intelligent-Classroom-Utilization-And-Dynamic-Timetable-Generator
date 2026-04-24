import React, { useState, useEffect } from 'react';
import { Moon, Sun, GraduationCap, LogOut, Lock, User, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import StudentView from './components/StudentView';
import TeacherView from './components/TeacherView';
import ClassTeacherView from './components/ClassTeacherView';
import AdminView from './components/AdminView';
import StudentProfile from './components/StudentProfile';
import TeacherProfile from './components/TeacherProfile';
import RegistrationForm from './components/RegistrationForm';
// Data will be fetched from backend API

function App() {
  // Initialize state from localStorage or defaults
  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem('taskflow-role');
    return saved || 'student';
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('taskflow-darkMode');
    return saved === 'true';
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('taskflow-isLoggedIn');
    return saved === 'true';
  });
  const [activeUser, setActiveUser] = useState(() => {
    const saved = localStorage.getItem('taskflow-activeUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [notification, setNotification] = useState(null);

  // State for data management (will be fetched from API)
  const [studentList, setStudentList] = useState([
    {
      id: 'S1001',
      name: 'Alice Johnson',
      email: 'alice.j@taskflow.academy',
      classId: 'C101',
      progress: 85,
      status: 'On Track',
      avatar: 'AJ',
      role: 'student'
    },
    {
      id: 'S1002',
      name: 'Bob Smith',
      email: 'bob.s@taskflow.academy',
      classId: 'C101',
      progress: 92,
      status: 'Ahead',
      avatar: 'BS',
      role: 'student'
    },
    {
      id: 'S1003',
      name: 'Carol Davis',
      email: 'carol.d@taskflow.academy',
      classId: 'C102',
      progress: 78,
      status: 'On Track',
      avatar: 'CD',
      role: 'student'
    },
    {
      id: 'S1004',
      name: 'David Wilson',
      email: 'david.w@taskflow.academy',
      classId: 'C102',
      progress: 88,
      status: 'Ahead',
      avatar: 'DW',
      role: 'student'
    }
  ]);
  
  // Mock subjects for testing
  const [mockSubjects] = useState([
    { id: 'SUB001', name: 'Mathematics', code: 'MATH' },
    { id: 'SUB002', name: 'Physics', code: 'PHY' },
    { id: 'SUB003', name: 'Chemistry', code: 'CHEM' },
    { id: 'SUB004', name: 'Biology', code: 'BIO' },
    { id: 'SUB005', name: 'Computer Science', code: 'CS' }
  ]);
  const [teacherList, setTeacherList] = useState([
    {
      id: 'T2001',
      name: 'Sarah Johnson',
      email: 'sarah.j@taskflow.academy',
      password: '123',
      department: 'Mathematics',
      avatar: 'SJ',
      role: 'teacher',
      subjects: ['SUB001', 'SUB005']
    },
    {
      id: 'T2002',
      name: 'David Chen',
      email: 'david.c@taskflow.academy',
      password: '123',
      department: 'Physics',
      avatar: 'DC',
      role: 'teacher',
      subjects: ['SUB002', 'SUB005']
    }
  ]);
  const [classTeacherList, setClassTeacherList] = useState([
    {
      id: 'CT3001',
      name: 'Michael Brown',
      email: 'michael.b@taskflow.academy',
      password: '123',
      classId: 'C101',
      department: 'Administration',
      avatar: 'MB',
      role: 'classTeacher',
      permissions: {
        viewAllSubjects: true,
        markAttendance: true,
        viewTeacherActivity: true,
        generateReports: true,
        contactParents: true
      }
    },
    {
      id: 'CT3002',
      name: 'Emily Davis',
      email: 'emily.d@taskflow.academy',
      password: '123',
      classId: 'C102',
      department: 'Administration',
      avatar: 'ED',
      role: 'classTeacher',
      permissions: {
        viewAllSubjects: true,
        markAttendance: true,
        viewTeacherActivity: true,
        generateReports: true,
        contactParents: true
      }
    }
  ]);

  // Registration View State
  const [isRegistering, setIsRegistering] = useState(false);

  // Attendance State
  const [attendanceList, setAttendanceList] = useState([]);

  // Create Assignment State
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('taskflow-darkMode', darkMode.toString());
  }, [darkMode]);

  // Save role to localStorage
  useEffect(() => {
    localStorage.setItem('taskflow-role', role);
  }, [role]);

  // Save login state to localStorage
  useEffect(() => {
    localStorage.setItem('taskflow-isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  // Save active user to localStorage
  useEffect(() => {
    if (activeUser) {
      localStorage.setItem('taskflow-activeUser', JSON.stringify(activeUser));
    } else {
      localStorage.removeItem('taskflow-activeUser');
    }
  }, [activeUser]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Handle Registration
  const handleRegister = (formData) => {
    const isStudent = formData.role === 'student';
    const isClassTeacher = formData.role === 'classTeacher';
    // Remove admin registration - only exclusive admin login
    const list = isStudent ? studentList : isClassTeacher ? classTeacherList : teacherList;
    const prefix = isStudent ? 'S' : isClassTeacher ? 'CT' : 'T';
    const baseId = isStudent ? 1000 : isClassTeacher ? 3000 : 2000;

    // Generate simple ID: prefix + (baseId + length + 1)
    // Finding max ID to be safe
    const maxIdNum = list.reduce((max, user) => {
      const num = parseInt(user.id.replace(prefix, ''));
      return num > max ? num : max;
    }, baseId);

    const newId = `${prefix}${maxIdNum + 1}`;

    const newUser = {
      id: newId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      ...formData.role === 'student' ? {
        classId: 'C101', // Default class
        progress: 0,
        status: 'On Track',
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        lastActive: 'Just now'
      } : formData.role === 'classTeacher' ? {
        classId: 'C101', // Default assigned class
        department: 'Administration',
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        role: 'Class Teacher',
        permissions: {
          viewAllSubjects: true,
          markAttendance: true,
          viewTeacherActivity: true,
          generateReports: true,
          contactParents: true
        }
      } : {
        department: 'General',
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
      }
    };

    if (isStudent) {
      setStudentList([...studentList, newUser]);
    } else if (isClassTeacher) {
      setClassTeacherList([...classTeacherList, newUser]);
    } else {
      setTeacherList([...teacherList, newUser]);
    }

    return { success: true, id: newId };
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both User ID and password');
      return;
    }

    // Check for whitespace issues
    const cleanUsername = username.trim();
    // In a real app, we would hash the password. For now, we accept '123' or the registered password.
    const cleanPassword = password.trim();

    // Search in Students, Teachers, Class Teachers
    const student = studentList.find(s => s.id === cleanUsername);
    const teacher = teacherList.find(t => t.id === cleanUsername);
    const classTeacher = classTeacherList.find(ct => ct.id === cleanUsername);

    // Exclusive admin login - only for you (PRANIT_ADMIN)
    const isAdmin = cleanUsername === 'PRANIT_ADMIN' && cleanPassword === 'pranit123';

    if (isAdmin) {
      setRole('admin');
      setActiveUser({
        id: 'PRANIT_ADMIN',
        name: 'Pranit Patil',
        email: 'admin@taskflow.academy',
        role: 'admin',
        status: 'active',
        permissions: {
          canManageUsers: true,
          canManageClasses: true,
          canManageSystem: true,
          canViewReports: true,
          canDeleteData: true,
          canManageSettings: true
        }
      });
      setIsLoggedIn(true);
      setError('');
      setUsername('');
      setPassword('');
      setNotification({
        type: 'success',
        message: 'Welcome back, System Administrator!'
      });
      return;
    }

    // Check student login
    if (student && (cleanPassword === '123' || cleanPassword === student.password)) {
      setRole('student');
      setActiveUser(student);
      setIsLoggedIn(true);
      setError('');
      setUsername('');
      setPassword('');
      setNotification({
        type: 'success',
        message: `Welcome back, ${student.name}!`
      });
      return;
    }

    // Check teacher login
    if (teacher && (cleanPassword === '123' || cleanPassword === teacher.password)) {
      setRole('teacher');
      setActiveUser(teacher);
      setIsLoggedIn(true);
      setError('');
      setUsername('');
      setPassword('');
      setNotification({
        type: 'success',
        message: `Welcome back, ${teacher.name}!`
      });
      return;
    }

    // Check class teacher login
    if (classTeacher && (cleanPassword === '123' || cleanPassword === classTeacher.password)) {
      setRole('classTeacher');
      setActiveUser(classTeacher);
      setIsLoggedIn(true);
      setError('');
      setUsername('');
      setPassword('');
      setNotification({
        type: 'success',
        message: `Welcome back, ${classTeacher.name}!`
      });
      return;
    }

    // Not found
    console.log(`Failed login attempt: ID=${cleanUsername}`); // Debugging
    setError('User ID not found or incorrect password.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setActiveUser(null);
    setUsername('');
    setPassword('');
    setError('');
    setShowProfile(false);
  };

  // Handle Update Attendance (for teachers)
  const handleUpdateAttendance = (updatedRecord) => {
    // Check if record exists
    const existingIndex = attendanceList.findIndex(r => r.id === updatedRecord.id);

    if (existingIndex >= 0) {
      // Update existing record
      setAttendanceList(prev =>
        prev.map(record =>
          record.id === updatedRecord.id ? updatedRecord : record
        )
      );
    } else {
      // Add new record
      setAttendanceList(prev => [...prev, updatedRecord]);
    }

    setNotification({
      type: 'success',
      message: 'Attendance updated successfully!'
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors px-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md backdrop-blur-sm">

          {isRegistering ? (
            <RegistrationForm
              onRegister={handleRegister}
              onBackToLogin={() => setIsRegistering(false)}
            />
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="bg-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
                  <GraduationCap className="text-white w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">TaskFlow Academy</h1>
                <p className="text-slate-500 dark:text-slate-400">Sign in to your account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="flex items-center p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">User ID</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="e.g. S1001 or T2001"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform active:scale-[0.98] mt-2"
                >
                  Sign In
                </button>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    Don't have an account?
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsRegistering(true)}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    Create Account
                  </button>
                </div>

                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                  <p className="font-semibold mb-1">Demo Credentials:</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Student: <strong>S1001 / 123</strong></span>
                      <span>Teacher: <strong>T2001 / 123</strong></span>
                    </div>
                    <div className="flex justify-between">
                      <span>Class Teacher: <strong>CT3001 / 123</strong></span>
                      <span>Admin: <strong>PRANIT_ADMIN / pranit123</strong></span>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors ${showProfile ? 'overflow-hidden' : ''}`}>
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-[9999] animate-in slide-in-from-top-5 fade-in duration-300">
          <div className={`flex items-center p-5 rounded-2xl shadow-2xl backdrop-blur-md border-2 min-w-[320px] ${notification.type === 'success'
            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 shadow-emerald-500/30'
            : 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/40 dark:to-orange-900/40 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 shadow-red-500/30'
            }`}>
            {notification.type === 'success' ? (
              <div className="p-2 rounded-full bg-emerald-500 mr-4">
                <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
              </div>
            ) : (
              <div className="p-2 rounded-full bg-red-500 mr-4">
                <AlertCircle className="w-6 h-6 text-white flex-shrink-0" />
              </div>
            )}
            <span className="font-bold text-base">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="bg-indigo-600 p-2 rounded-lg mr-3">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                TaskFlow Academy
              </span>
              <span className="ml-4 px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 capitalize">
                {role} View
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {role === 'teacher' && (
                <button
                  onClick={() => setShowCreateAssignmentModal(true)}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Assignment
                </button>
              )}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setShowProfile(true)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors relative group"
                title="View Profile"
              >
                <User className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white dark:ring-slate-900 bg-red-400"></span>
              </button>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {role === 'admin' ? (
          <AdminView
            user={activeUser}
            onLogout={handleLogout}
          />
        ) : role === 'student' ? (
          <StudentView
            user={activeUser}
            attendanceRecords={attendanceList}
            subjects={[]}
            assignments={[]}
            notices={[]}
          />
        ) : role === 'classTeacher' ? (
          <ClassTeacherView
            user={activeUser}
            students={studentList}
            teachers={teacherList}
            subjects={mockSubjects}
            attendanceRecords={attendanceList}
            assignments={[]}
            submissions={[]}
            onUpdateAttendance={handleUpdateAttendance}
            classes={[]}
            notices={[]}
          />
        ) : (
          <TeacherView
            user={activeUser}
            attendanceRecords={attendanceList}
            onUpdateAttendance={handleUpdateAttendance}
            subjects={[]}
            notices={[]}
            showCreateModal={showCreateAssignmentModal}
            setShowCreateModal={setShowCreateAssignmentModal}
          />
        )}
      </main>

      {/* Profile Modals - Passing dynamic lists if needed, but profiles usually show CURRENT user data or specific lists */}
      {role === 'student' ? (
        <StudentProfile
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
          assignments={[]}
          submissions={[]}
          user={activeUser}
        />
      ) : role === 'classTeacher' ? (
        <TeacherProfile
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
          students={studentList}
          classes={[]}
          assignments={[]}
          submissions={[]}
          user={activeUser}
        />
      ) : (
        <TeacherProfile
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
          students={studentList}
          classes={[]}
          assignments={[]}
          submissions={[]}
          user={activeUser}
        />
      )}
    </div>
  );
}

export default App;
