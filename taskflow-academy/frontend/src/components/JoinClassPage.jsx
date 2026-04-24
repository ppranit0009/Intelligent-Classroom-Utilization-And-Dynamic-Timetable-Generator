import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, Plus, Search, GraduationCap, CheckCircle, 
  AlertCircle, Clock, Calendar, MapPin, UserCheck, X, ArrowRight
} from 'lucide-react';

const JoinClassPage = ({ user, onClassJoined, onNavigateBack }) => {
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [joinedClass, setJoinedClass] = useState(null);
  const [error, setError] = useState('');
  const [recentClasses, setRecentClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock available classes (in real app, this would come from backend)
  const [availableClasses] = useState([
    {
      id: 'C101',
      name: 'Mathematics 101',
      grade: 'F.Y.BCA',
      section: 'A',
      teacher: 'Ms. Sarah Johnson',
      description: 'Advanced mathematics covering algebra, geometry, and trigonometry',
      roomNumber: 'Room 201',
      schedule: 'Mon-Wed-Fri 9:00 AM - 10:30 AM',
      currentStudents: 25,
      maxStudents: 40,
      classCode: 'MATH101',
      status: 'active',
      subjects: ['Algebra', 'Geometry', 'Trigonometry']
    },
    {
      id: 'C102',
      name: 'Physics 101',
      grade: 'S.Y.BCA',
      section: 'B',
      teacher: 'Mr. David Chen',
      description: 'Introduction to physics with hands-on experiments',
      roomNumber: 'Room 305',
      schedule: 'Tue-Thu 11:00 AM - 12:30 PM',
      currentStudents: 18,
      maxStudents: 35,
      classCode: 'PHYS101',
      status: 'active',
      subjects: ['Mechanics', 'Thermodynamics', 'Waves']
    },
    {
      id: 'C103',
      name: 'Chemistry Lab',
      grade: 'T.Y.BCA',
      section: 'A',
      teacher: 'Dr. Emily Rodriguez',
      description: 'Chemistry fundamentals with laboratory experiments',
      roomNumber: 'Lab 102',
      schedule: 'Mon-Wed 2:00 PM - 4:00 PM',
      currentStudents: 22,
      maxStudents: 30,
      classCode: 'CHEM101',
      status: 'active',
      subjects: ['Organic Chemistry', 'Inorganic Chemistry', 'Lab Techniques']
    },
    {
      id: 'C104',
      name: 'English Literature',
      grade: 'F.Y.B.Com',
      section: 'B',
      teacher: 'Mrs. Patricia Williams',
      description: 'Comprehensive study of classic and contemporary literature',
      roomNumber: 'Room 150',
      schedule: 'Mon-Tue-Thu 10:00 AM - 11:30 AM',
      currentStudents: 28,
      maxStudents: 35,
      classCode: 'ENG101',
      status: 'active',
      subjects: ['Poetry', 'Fiction', 'Drama']
    },
    {
      id: 'C105',
      name: 'Computer Science',
      grade: 'B.Sc.IT',
      section: 'A',
      teacher: 'Prof. James Mitchell',
      description: 'Programming fundamentals and software development',
      roomNumber: 'Computer Lab 3',
      schedule: 'Wed-Fri 1:00 PM - 3:00 PM',
      currentStudents: 15,
      maxStudents: 25,
      classCode: 'CS101',
      status: 'active',
      subjects: ['JavaScript', 'Python', 'Web Development']
    }
  ]);

  // Load recently joined classes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentlyJoinedClasses');
    if (saved) {
      setRecentClasses(JSON.parse(saved));
    }
  }, []);

  const handleJoinClass = async () => {
    if (!joinCode.trim()) {
      setError('Please enter a class code');
      return;
    }

    setIsJoining(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const classToJoin = availableClasses.find(c => 
        c.classCode.toLowerCase() === joinCode.trim().toLowerCase()
      );

      if (classToJoin) {
        if (classToJoin.currentStudents >= classToJoin.maxStudents) {
          setError('This class is already full!');
          setIsJoining(false);
          return;
        }

        // Check if already joined
        const alreadyJoined = recentClasses.find(c => c.id === classToJoin.id);
        if (alreadyJoined) {
          setError('You have already joined this class!');
          setIsJoining(false);
          return;
        }

        const joinedClassData = {
          ...classToJoin,
          joinedAt: new Date().toISOString(),
          joinCodeUsed: joinCode.trim().toUpperCase()
        };

        setJoinedClass(joinedClassData);
        
        // Add to recent classes
        const updatedRecent = [joinedClassData, ...recentClasses.slice(0, 4)];
        setRecentClasses(updatedRecent);
        localStorage.setItem('recentlyJoinedClasses', JSON.stringify(updatedRecent));

        // Notify parent component
        if (onClassJoined) {
          onClassJoined(joinedClassData);
        }

        setJoinCode('');
        setIsJoining(false);
      } else {
        setError('Invalid class code. Please check and try again.');
        setIsJoining(false);
      }
    }, 1500);
  };

  const handleQuickJoin = (classItem) => {
    setJoinCode(classItem.classCode);
    setTimeout(() => handleJoinClass(), 100);
  };

  const filteredClasses = availableClasses.filter(c => 
    !recentClasses.find(rc => rc.id === c.id) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.classCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <button
            onClick={onNavigateBack}
            className="mb-6 flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Dashboard
          </button>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Join a Class
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Enter your class code to join your new classroom. Get the code from your teacher to get started.
          </p>
        </div>

        {/* Success Message */}
        {joinedClass && (
          <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                  Successfully joined {joinedClass.name}!
                </h3>
                <p className="text-emerald-700 dark:text-emerald-300">
                  {joinedClass.grade} - Section {joinedClass.section}
                </p>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                  You can now access all class materials and assignments.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Join Section */}
        <div className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Plus className="w-6 h-6" />
                Quick Join with Class Code
              </h2>
              <p className="text-blue-100">
                Enter the 6-character code provided by your teacher
              </p>
            </div>
            
            <div className="p-8">
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={joinCode}
                      onChange={(e) => {
                        setJoinCode(e.target.value.toUpperCase());
                        setError('');
                      }}
                      placeholder="Enter class code (e.g., MATH101)"
                      className="w-full px-6 py-4 text-2xl font-mono border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-center transition-all"
                      maxLength={10}
                      disabled={isJoining}
                    />
                    {joinCode && (
                      <button
                        onClick={() => setJoinCode('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleJoinClass}
                    disabled={!joinCode.trim() || isJoining}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg font-semibold text-lg min-w-[140px] flex items-center justify-center gap-2"
                  >
                    {isJoining ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Joining...
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-5 h-5" />
                        Join Class
                      </>
                    )}
                  </button>
                </div>
                
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recently Joined Classes */}
        {recentClasses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              Recently Joined Classes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentClasses.map((classItem) => (
                <div key={classItem.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">{classItem.name}</h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{classItem.teacher}</p>
                      <div className="mt-2">
                        <span className="px-2 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-xs font-bold shadow">
                          {classItem.grade}
                        </span>
                        <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">Section {classItem.section}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{classItem.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{classItem.roomNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{classItem.currentStudents}/{classItem.maxStudents} students</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">
                    Joined on {new Date(classItem.joinedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Browse Available Classes */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <Search className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            Browse Available Classes
          </h2>
          
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by class name, teacher, subject, or code..."
                className="w-full pl-12 pr-6 py-4 text-lg border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {filteredClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredClasses.map((classItem) => (
                <div key={classItem.id} className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{classItem.name}</h3>
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-bold shadow-lg">
                          {classItem.grade}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">{classItem.teacher}</p>
                      <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-500">
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded font-mono">
                          {classItem.classCode}
                        </span>
                        <span>Section {classItem.section}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      classItem.currentStudents >= classItem.maxStudents * 0.8
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {classItem.currentStudents >= classItem.maxStudents * 0.8 ? 'Almost Full' : 'Available'}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                    {classItem.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>{classItem.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4" />
                      <span>{classItem.roomNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Users className="w-4 h-4" />
                      <span>{classItem.currentStudents}/{classItem.maxStudents} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <BookOpen className="w-4 h-4" />
                      <span>{classItem.subjects.length} subjects</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Subjects:</p>
                    <div className="flex flex-wrap gap-2">
                      {classItem.subjects.map((subject, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleQuickJoin(classItem)}
                    disabled={classItem.currentStudents >= classItem.maxStudents}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
                  >
                    {classItem.currentStudents >= classItem.maxStudents ? (
                      <>
                        <AlertCircle className="w-5 h-5" />
                        Class Full
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Join Class
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-20 h-20 text-slate-300 dark:text-slate-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {searchQuery ? 'No classes found' : 'No available classes'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {searchQuery 
                  ? 'Try adjusting your search terms or browse all available classes.'
                  : 'Check back later for new classes or contact your teacher for class codes.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinClassPage;
