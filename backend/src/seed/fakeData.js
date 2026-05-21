// Comprehensive Fake Data Generator for TaskFlow Academy
// This file contains realistic demo data for all user roles and features

const faker = require('faker');

// Generate realistic student data
const generateStudents = (count = 50) => {
  const students = [];
  const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eva', 'Frank', 'Grace', 'Henry', 'Isla', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Ruby', 'Sam', 'Tina'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const studentId = `S${String(1000 + i).padStart(4, '0')}`;
    
    students.push({
      id: studentId,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@taskflow.academy`,
      password: '123',
      phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      classId: ['C101', 'C102', 'C103', 'C201', 'C202'][Math.floor(Math.random() * 5)],
      grade: ['F.Y.BCA', 'S.Y.BCA', 'T.Y.BCA', 'F.Y.B.Com', 'B.Sc.IT'][Math.floor(Math.random() * 5)],
      section: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
      rollNumber: Math.floor(Math.random() * 100) + 1,
      progress: Math.floor(Math.random() * 40) + 60, // 60-100%
      status: ['On Track', 'Ahead', 'Needs Attention'][Math.floor(Math.random() * 3)],
      avatar: firstName.substring(0, 1) + lastName.substring(0, 1),
      role: 'student',
      attendancePercentage: Math.floor(Math.random() * 30) + 70, // 70-100%
      gpa: (Math.random() * 2 + 2).toFixed(2), // 2.0-4.0
      lastActive: ['Just now', '5 min ago', '1 hour ago', '2 hours ago', 'Yesterday'][Math.floor(Math.random() * 5)],
      enrolledSubjects: generateRandomSubjects(),
      parentContact: {
        name: `Mr./Mrs. ${lastName}`,
        phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `parent${i}@email.com`
      }
    });
  }
  
  return students;
};

// Generate realistic teacher data
const generateTeachers = (count = 15) => {
  const teachers = [];
  const teacherNames = [
    { first: 'Dr. Sarah', last: 'Johnson', dept: 'Computer Science', expertise: ['AI', 'Machine Learning', 'Data Structures'] },
    { first: 'Prof. David', last: 'Chen', dept: 'Mathematics', expertise: ['Calculus', 'Linear Algebra', 'Statistics'] },
    { first: 'Dr. Emily', last: 'Rodriguez', dept: 'Physics', expertise: ['Quantum Mechanics', 'Thermodynamics', 'Electromagnetism'] },
    { first: 'Prof. Michael', last: 'Brown', dept: 'Chemistry', expertise: ['Organic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'] },
    { first: 'Dr. Lisa', last: 'Anderson', dept: 'English', expertise: ['Literature', 'Creative Writing', 'Grammar'] },
    { first: 'Prof. James', last: 'Wilson', dept: 'Commerce', expertise: ['Accounting', 'Business Studies', 'Economics'] },
    { first: 'Dr. Maria', last: 'Garcia', dept: 'Computer Science', expertise: ['Web Development', 'Database Systems', 'Software Engineering'] },
    { first: 'Prof. Robert', last: 'Taylor', dept: 'Mathematics', expertise: ['Discrete Mathematics', 'Graph Theory', 'Number Theory'] },
    { first: 'Dr. Jennifer', last: 'Martinez', dept: 'Physics', expertise: ['Astrophysics', 'Mechanics', 'Optics'] },
    { first: 'Prof. William', last: 'Hernandez', dept: 'Chemistry', expertise: ['Inorganic Chemistry', 'Biochemistry', 'Environmental Chemistry'] }
  ];
  
  for (let i = 0; i < count && i < teacherNames.length; i++) {
    const teacher = teacherNames[i];
    const teacherId = `T${String(2000 + i).padStart(4, '0')}`;
    
    teachers.push({
      id: teacherId,
      name: `${teacher.first} ${teacher.last}`,
      email: `${teacher.first.toLowerCase()}.${teacher.last.toLowerCase()}@taskflow.academy`,
      password: '123',
      phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      department: teacher.dept,
      avatar: teacher.first.split(' ')[1].substring(0, 1) + teacher.last.substring(0, 1),
      role: 'teacher',
      subjects: generateTeacherSubjects(teacher.expertise),
      qualification: ['Ph.D', 'M.Tech', 'M.Sc', 'M.Com'][Math.floor(Math.random() * 4)],
      experience: Math.floor(Math.random() * 20) + 5, // 5-25 years
      specialization: teacher.expertise.join(', '),
      availability: ['full-time', 'part-time'][Math.floor(Math.random() * 2)],
      officeHours: generateOfficeHours(),
      researchInterests: teacher.expertise.slice(0, 2),
      publications: Math.floor(Math.random() * 50) + 10,
      rating: (Math.random() * 2 + 3).toFixed(1) // 3.0-5.0
    });
  }
  
  return teachers;
};

// Generate class teacher data
const generateClassTeachers = (count = 5) => {
  const classTeachers = [];
  const classTeacherNames = [
    { name: 'Dr. Amanda White', classId: 'C101', grade: 'F.Y.BCA', section: 'A' },
    { name: 'Prof. Benjamin Lee', classId: 'C102', grade: 'S.Y.BCA', section: 'B' },
    { name: 'Dr. Catherine King', classId: 'C103', grade: 'T.Y.BCA', section: 'A' },
    { name: 'Prof. Daniel Adams', classId: 'C201', grade: 'F.Y.B.Com', section: 'C' },
    { name: 'Dr. Elizabeth Hill', classId: 'C202', grade: 'B.Sc.IT', section: 'B' }
  ];
  
  for (let i = 0; i < count && i < classTeacherNames.length; i++) {
    const ct = classTeacherNames[i];
    const ctId = `CT${String(3000 + i).padStart(4, '0')}`;
    
    classTeachers.push({
      id: ctId,
      name: ct.name,
      email: `class.teacher${i + 1}@taskflow.academy`,
      password: '123',
      phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      classId: ct.classId,
      department: 'Administration',
      avatar: ct.name.split(' ').map(n => n[0]).join(''),
      role: 'classTeacher',
      permissions: {
        viewAllSubjects: true,
        markAttendance: true,
        viewTeacherActivity: true,
        generateReports: true,
        contactParents: true,
        approveAssignments: true,
        manageClassSchedule: true
      },
      qualification: ['M.Ed', 'Ph.D', 'M.Phil'][Math.floor(Math.random() * 3)],
      experience: Math.floor(Math.random() * 15) + 10, // 10-25 years
      totalStudentsManaged: Math.floor(Math.random() * 50) + 30,
      parentMeetingsScheduled: Math.floor(Math.random() * 20) + 5,
      classPerformanceRating: (Math.random() * 2 + 3).toFixed(1)
    });
  }
  
  return classTeachers;
};

// Generate subjects data
const generateSubjects = () => {
  return [
    {
      id: 'SUB001',
      name: 'Mathematics I',
      code: 'MATH101',
      department: 'Mathematics',
      credits: 4,
      semester: 1,
      type: 'core',
      weeklyHours: { lecture: 3, lab: 1, tutorial: 0 },
      maxStudents: 60,
      description: 'Fundamental concepts of calculus, algebra, and trigonometry',
      prerequisites: [],
      offeredSemesters: ['Fall', 'Spring']
    },
    {
      id: 'SUB002',
      name: 'Computer Programming',
      code: 'CS101',
      department: 'Computer Science',
      credits: 4,
      semester: 1,
      type: 'core',
      weeklyHours: { lecture: 2, lab: 2, tutorial: 0 },
      maxStudents: 40,
      description: 'Introduction to programming concepts and problem-solving',
      prerequisites: [],
      offeredSemesters: ['Fall', 'Spring']
    },
    {
      id: 'SUB003',
      name: 'Digital Electronics',
      code: 'CS102',
      department: 'Computer Science',
      credits: 3,
      semester: 1,
      type: 'core',
      weeklyHours: { lecture: 2, lab: 1, tutorial: 0 },
      maxStudents: 35,
      description: 'Basic concepts of digital circuits and logic design',
      prerequisites: [],
      offeredSemesters: ['Fall']
    },
    {
      id: 'SUB004',
      name: 'Business Communication',
      code: 'ENG101',
      department: 'English',
      credits: 2,
      semester: 1,
      type: 'core',
      weeklyHours: { lecture: 2, lab: 0, tutorial: 0 },
      maxStudents: 80,
      description: 'Professional communication skills and business writing',
      prerequisites: [],
      offeredSemesters: ['Fall', 'Spring']
    },
    {
      id: 'SUB005',
      name: 'Data Structures',
      code: 'CS201',
      department: 'Computer Science',
      credits: 4,
      semester: 2,
      type: 'core',
      weeklyHours: { lecture: 3, lab: 1, tutorial: 0 },
      maxStudents: 40,
      description: 'Advanced data structures and algorithms',
      prerequisites: ['SUB002'],
      offeredSemesters: ['Spring']
    },
    {
      id: 'SUB006',
      name: 'Database Management',
      code: 'CS202',
      department: 'Computer Science',
      credits: 3,
      semester: 2,
      type: 'core',
      weeklyHours: { lecture: 2, lab: 1, tutorial: 0 },
      maxStudents: 35,
      description: 'Database design, SQL, and database administration',
      prerequisites: ['SUB002'],
      offeredSemesters: ['Spring']
    },
    {
      id: 'SUB007',
      name: 'Web Development',
      code: 'CS203',
      department: 'Computer Science',
      credits: 3,
      semester: 2,
      type: 'elective',
      weeklyHours: { lecture: 1, lab: 2, tutorial: 0 },
      maxStudents: 30,
      description: 'HTML, CSS, JavaScript and modern web frameworks',
      prerequisites: ['SUB002'],
      offeredSemesters: ['Spring']
    },
    {
      id: 'SUB008',
      name: 'Accounting Principles',
      code: 'ACC101',
      department: 'Commerce',
      credits: 4,
      semester: 1,
      type: 'core',
      weeklyHours: { lecture: 3, lab: 0, tutorial: 1 },
      maxStudents: 60,
      description: 'Fundamental accounting principles and practices',
      prerequisites: [],
      offeredSemesters: ['Fall', 'Spring']
    },
    {
      id: 'SUB009',
      name: 'Business Economics',
      code: 'ECO101',
      department: 'Commerce',
      credits: 3,
      semester: 1,
      type: 'core',
      weeklyHours: { lecture: 3, lab: 0, tutorial: 0 },
      maxStudents: 80,
      description: 'Micro and macro economics for business',
      prerequisites: [],
      offeredSemesters: ['Fall']
    },
    {
      id: 'SUB010',
      name: 'Organizational Behavior',
      code: 'MGT101',
      department: 'Commerce',
      credits: 2,
      semester: 2,
      type: 'core',
      weeklyHours: { lecture: 2, lab: 0, tutorial: 0 },
      maxStudents: 60,
      description: 'Human behavior in organizations and management principles',
      prerequisites: [],
      offeredSemesters: ['Spring']
    }
  ];
};

// Generate classes data
const generateClasses = () => {
  return [
    {
      id: 'C101',
      name: 'BCA First Year A',
      code: 'BCA-FY-A',
      grade: 'F.Y.BCA',
      section: 'A',
      description: 'First year Bachelor of Computer Applications, Section A',
      roomNumber: 'Room 101',
      schedule: 'Mon-Fri 8:00 AM - 3:00 PM',
      currentStudents: 45,
      maxStudents: 60,
      subjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
      status: 'active',
      enrolledStudents: [],
      assignments: [],
      classTeacher: 'CT3001',
      academicYear: '2024-25',
      semester: 'Fall',
      timetable: generateClassTimetable('C101')
    },
    {
      id: 'C102',
      name: 'BCA Second Year B',
      code: 'BCA-SY-B',
      grade: 'S.Y.BCA',
      section: 'B',
      description: 'Second year Bachelor of Computer Applications, Section B',
      roomNumber: 'Room 102',
      schedule: 'Mon-Fri 9:00 AM - 4:00 PM',
      currentStudents: 38,
      maxStudents: 50,
      subjects: ['SUB005', 'SUB006', 'SUB007'],
      status: 'active',
      enrolledStudents: [],
      assignments: [],
      classTeacher: 'CT3002',
      academicYear: '2024-25',
      semester: 'Fall',
      timetable: generateClassTimetable('C102')
    },
    {
      id: 'C103',
      name: 'BCA Third Year A',
      code: 'BCA-TY-A',
      grade: 'T.Y.BCA',
      section: 'A',
      description: 'Third year Bachelor of Computer Applications, Section A',
      roomNumber: 'Room 201',
      schedule: 'Mon-Fri 8:30 AM - 3:30 PM',
      currentStudents: 42,
      maxStudents: 55,
      subjects: ['SUB005', 'SUB006', 'SUB007'],
      status: 'active',
      enrolledStudents: [],
      assignments: [],
      classTeacher: 'CT3003',
      academicYear: '2024-25',
      semester: 'Fall',
      timetable: generateClassTimetable('C103')
    },
    {
      id: 'C201',
      name: 'B.Com First Year C',
      code: 'BCom-FY-C',
      grade: 'F.Y.B.Com',
      section: 'C',
      description: 'First year Bachelor of Commerce, Section C',
      roomNumber: 'Room 301',
      schedule: 'Mon-Fri 9:00 AM - 4:00 PM',
      currentStudents: 52,
      maxStudents: 70,
      subjects: ['SUB008', 'SUB009', 'SUB010'],
      status: 'active',
      enrolledStudents: [],
      assignments: [],
      classTeacher: 'CT3004',
      academicYear: '2024-25',
      semester: 'Fall',
      timetable: generateClassTimetable('C201')
    },
    {
      id: 'C202',
      name: 'B.Sc.IT First Year B',
      code: 'BScIT-FY-B',
      grade: 'B.Sc.IT',
      section: 'B',
      description: 'First year Bachelor of Science in Information Technology, Section B',
      roomNumber: 'Room 401',
      schedule: 'Mon-Fry 8:00 AM - 2:30 PM',
      currentStudents: 35,
      maxStudents: 45,
      subjects: ['SUB001', 'SUB002', 'SUB003'],
      status: 'active',
      enrolledStudents: [],
      assignments: [],
      classTeacher: 'CT3005',
      academicYear: '2024-25',
      semester: 'Fall',
      timetable: generateClassTimetable('C202')
    }
  ];
};

// Generate rooms data
const generateRooms = () => {
  return [
    {
      id: 'R001',
      name: 'Room 101',
      number: '101',
      building: 'Main Building',
      floor: 1,
      capacity: 50,
      type: 'classroom',
      equipment: ['projector', 'whiteboard', 'air conditioning', 'internet'],
      accessibility: {
        wheelchairAccessible: true,
        hasRamp: true,
        hasElevator: true
      },
      availability: generateRoomAvailability(),
      status: 'available'
    },
    {
      id: 'R002',
      name: 'Computer Lab 201',
      number: '201',
      building: 'Science Block',
      floor: 2,
      capacity: 40,
      type: 'computer lab',
      equipment: ['computer', 'projector', 'smart board', 'internet', 'air conditioning'],
      accessibility: {
        wheelchairAccessible: true,
        hasRamp: false,
        hasElevator: true
      },
      availability: generateRoomAvailability(),
      status: 'available'
    },
    {
      id: 'R003',
      name: 'Lecture Hall A',
      number: 'LHA',
      building: 'Main Building',
      floor: 1,
      capacity: 150,
      type: 'lecture hall',
      equipment: ['projector', 'sound system', 'smart board', 'air conditioning', 'internet'],
      accessibility: {
        wheelchairAccessible: true,
        hasRamp: true,
        hasElevator: true
      },
      availability: generateRoomAvailability(),
      status: 'available'
    },
    {
      id: 'R004',
      name: 'Chemistry Lab 301',
      number: '301',
      building: 'Science Block',
      floor: 3,
      capacity: 30,
      type: 'lab',
      equipment: ['lab equipment', 'fume hood', 'safety shower', 'internet'],
      accessibility: {
        wheelchairAccessible: false,
        hasRamp: false,
        hasElevator: true
      },
      availability: generateRoomAvailability(),
      status: 'available'
    },
    {
      id: 'R005',
      name: 'Seminar Room 102',
      number: '102',
      building: 'Main Building',
      floor: 1,
      capacity: 25,
      type: 'seminar room',
      equipment: ['projector', 'whiteboard', 'air conditioning', 'internet'],
      accessibility: {
        wheelchairAccessible: true,
        hasRamp: true,
        hasElevator: true
      },
      availability: generateRoomAvailability(),
      status: 'available'
    }
  ];
};

// Generate assignments data
const generateAssignments = () => {
  const assignments = [];
  const assignmentTypes = ['homework', 'project', 'quiz', 'exam', 'lab report'];
  const statuses = ['pending', 'submitted', 'graded', 'overdue'];
  
  for (let i = 0; i < 30; i++) {
    const subjectId = `SUB${String(Math.floor(Math.random() * 10) + 1).padStart(3, '0')}`;
    const classId = ['C101', 'C102', 'C103', 'C201', 'C202'][Math.floor(Math.random() * 5)];
    
    assignments.push({
      id: `ASS${String(1000 + i).padStart(4, '0')}`,
      title: generateAssignmentTitle(subjectId),
      description: generateAssignmentDescription(),
      subject: subjectId,
      class: classId,
      teacher: `T${String(2000 + Math.floor(Math.random() * 10)).padStart(4, '0')}`,
      type: assignmentTypes[Math.floor(Math.random() * assignmentTypes.length)],
      maxMarks: Math.floor(Math.random() * 50) + 50, // 50-100
      dueDate: generateRandomDate(),
      assignedDate: generateRandomDate(-30, -1),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      submissions: generateSubmissions(classId),
      attachments: generateAttachments(),
      instructions: generateInstructions(),
      rubric: generateRubric()
    });
  }
  
  return assignments;
};

// Helper functions
const generateRandomSubjects = () => {
  const allSubjects = ['SUB001', 'SUB002', 'SUB003', 'SUB004', 'SUB005', 'SUB006', 'SUB007', 'SUB008', 'SUB009', 'SUB010'];
  const numSubjects = Math.floor(Math.random() * 4) + 3; // 3-6 subjects
  return allSubjects.sort(() => 0.5 - Math.random()).slice(0, numSubjects);
};

const generateTeacherSubjects = (expertise) => {
  const subjectMap = {
    'AI': 'SUB005',
    'Machine Learning': 'SUB005',
    'Data Structures': 'SUB005',
    'Calculus': 'SUB001',
    'Linear Algebra': 'SUB001',
    'Statistics': 'SUB001',
    'Web Development': 'SUB007',
    'Database Systems': 'SUB006',
    'Software Engineering': 'SUB007',
    'Accounting': 'SUB008',
    'Business Studies': 'SUB010',
    'Economics': 'SUB009'
  };
  
  return expertise.map(exp => subjectMap[exp]).filter(Boolean).slice(0, 3);
};

const generateOfficeHours = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = [];
  
  for (let i = 0; i < 3; i++) {
    hours.push({
      day: days[Math.floor(Math.random() * days.length)],
      time: `${Math.floor(Math.random() * 2) + 10}:00 - ${Math.floor(Math.random() * 2) + 14}:00`
    });
  }
  
  return hours;
};

const generateRoomAvailability = () => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const availability = {};
  
  days.forEach(day => {
    availability[day] = {
      available: day !== 'saturday' && day !== 'sunday',
      blockedTimes: Math.random() > 0.7 ? [generateRandomTimeRange()] : []
    };
  });
  
  return availability;
};

const generateClassTimetable = (classId) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['08:00-09:30', '09:30-11:00', '11:00-12:30', '13:00-14:30', '14:30-16:00'];
  const timetable = {};
  
  days.forEach(day => {
    timetable[day] = [];
    timeSlots.forEach(slot => {
      if (Math.random() > 0.3) { // 70% chance of having a class
        timetable[day].push({
          time: slot,
          subject: `SUB${String(Math.floor(Math.random() * 10) + 1).padStart(3, '0')}`,
          teacher: `T${String(2000 + Math.floor(Math.random() * 10)).padStart(4, '0')}`,
          room: `R00${Math.floor(Math.random() * 5) + 1}`
        });
      }
    });
  });
  
  return timetable;
};

const generateAssignmentTitle = (subjectId) => {
  const titles = {
    'SUB001': ['Calculus Problem Set', 'Algebra Quiz', 'Trigonometry Project'],
    'SUB002': ['Programming Assignment', 'Algorithm Design', 'Code Review'],
    'SUB003': ['Digital Circuit Design', 'Logic Gates Lab', 'Boolean Algebra'],
    'SUB004': ['Business Letter Writing', 'Presentation Skills', 'Report Writing'],
    'SUB005': ['Data Structure Implementation', 'Algorithm Analysis', 'Tree Traversal'],
    'SUB006': ['Database Design Project', 'SQL Query Practice', 'Normalization Exercise'],
    'SUB007': ['Web Development Project', 'JavaScript Application', 'CSS Design'],
    'SUB008': ['Financial Statements', 'Cost Accounting', 'Tax Calculation'],
    'SUB009': ['Market Analysis', 'Supply and Demand', 'Economic Models'],
    'SUB010': ['Team Management', 'Leadership Case Study', 'Organizational Analysis']
  };
  
  const subjectTitles = titles[subjectId] || ['General Assignment', 'Project Work', 'Case Study'];
  return subjectTitles[Math.floor(Math.random() * subjectTitles.length)];
};

const generateAssignmentDescription = () => {
  const descriptions = [
    'Complete all exercises from the textbook and submit your solutions.',
    'Work in groups of 3-4 to complete this comprehensive project.',
    'Research the given topic and prepare a detailed presentation.',
    'Solve all problems and show your work clearly.',
    'Design and implement the solution following best practices.',
    'Analyze the case study and provide your recommendations.',
    'Complete the lab experiment and submit your findings.',
    'Write a comprehensive report on the assigned topic.'
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const generateSubmissions = (classId) => {
  const numSubmissions = Math.floor(Math.random() * 30) + 20; // 20-50 submissions
  const submissions = [];
  
  for (let i = 0; i < numSubmissions; i++) {
    submissions.push({
      studentId: `S${String(1000 + i).padStart(4, '0')}`,
      submittedAt: generateRandomDate(-7, 0),
      status: ['submitted', 'late', 'graded'][Math.floor(Math.random() * 3)],
      score: Math.floor(Math.random() * 40) + 60, // 60-100
      feedback: generateFeedback()
    });
  }
  
  return submissions;
};

const generateAttachments = () => {
  const fileTypes = ['pdf', 'docx', 'pptx', 'xlsx', 'zip'];
  const numFiles = Math.floor(Math.random() * 3) + 1;
  
  return Array.from({ length: numFiles }, (_, i) => ({
    name: `document_${i + 1}.${fileTypes[Math.floor(Math.random() * fileTypes.length)]}`,
    size: Math.floor(Math.random() * 5000) + 100, // 100-5100 KB
    uploadedAt: new Date().toISOString()
  }));
};

const generateInstructions = () => {
  return [
    'Please read all instructions carefully before starting.',
    'Submit your work before the deadline to avoid penalties.',
    'Ensure your name and student ID are clearly visible.',
    'Follow the formatting guidelines provided in class.',
    'Contact me if you have any questions or concerns.'
  ];
};

const generateRubric = () => {
  return {
    criteria: ['Content', 'Organization', 'Grammar', 'Creativity', 'Technical Skills'],
    maxPoints: [25, 20, 15, 20, 20],
    description: 'Your work will be evaluated based on the following criteria'
  };
};

const generateFeedback = () => {
  const feedbacks = [
    'Excellent work! Clear understanding of concepts.',
    'Good effort, but needs improvement in some areas.',
    'Well organized and presented effectively.',
    'Creative approach to problem-solving.',
    'Needs more detail and examples.',
    'Great analysis and critical thinking skills.',
    'Presentation could be more polished.',
    'Technical implementation is solid.'
  ];
  
  return feedbacks[Math.floor(Math.random() * feedbacks.length)];
};

const generateRandomDate = (daysOffset = 0, daysRange = 30) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset + Math.floor(Math.random() * daysRange));
  return date.toISOString().split('T')[0];
};

const generateRandomTimeRange = () => {
  const startHour = Math.floor(Math.random() * 8) + 8; // 8-16
  const endHour = startHour + Math.floor(Math.random() * 3) + 1; // 1-3 hours later
  return `${startHour}:00-${endHour}:00`;
};

// Generate attendance records
const generateAttendanceRecords = () => {
  const records = [];
  const students = generateStudents(20);
  const dates = generateRecentDates(30);
  
  students.forEach(student => {
    dates.forEach(date => {
      records.push({
        studentId: student.id,
        date: date,
        status: ['present', 'absent', 'late'][Math.floor(Math.random() * 3)],
        markedBy: `T${String(2000 + Math.floor(Math.random() * 10)).padStart(4, '0')}`,
        markedAt: new Date(date + 'T' + Math.floor(Math.random() * 12 + 8).toString().padStart(2, '0') + ':00:00'),
        remarks: Math.random() > 0.8 ? ['Sick', 'Late by 10 mins', 'Medical emergency', 'Family emergency'][Math.floor(Math.random() * 4)] : null
      });
    });
  });
  
  return records;
};

const generateRecentDates = (days) => {
  const dates = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Skip weekends
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date.toISOString().split('T')[0]);
    }
  }
  
  return dates;
};

// Generate schedule data
const generateSchedules = () => {
  const schedules = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    { start: '08:00', end: '09:30' },
    { start: '09:30', end: '11:00' },
    { start: '11:00', end: '12:30' },
    { start: '13:00', end: '14:30' },
    { start: '14:30', end: '16:00' },
    { start: '16:00', end: '17:30' }
  ];
  
  days.forEach(day => {
    timeSlots.forEach(slot => {
      if (Math.random() > 0.2) { // 80% chance of having a class
        schedules.push({
          id: `SCH${String(schedules.length + 1).padStart(4, '0')}`,
          subject: `SUB${String(Math.floor(Math.random() * 10) + 1).padStart(3, '0')}`,
          teacher: `T${String(2000 + Math.floor(Math.random() * 10)).padStart(4, '0')}`,
          class: ['C101', 'C102', 'C103', 'C201', 'C202'][Math.floor(Math.random() * 5)],
          room: `R00${Math.floor(Math.random() * 5) + 1}`,
          dayOfWeek: day,
          startTime: slot.start,
          endTime: slot.end,
          semester: 'Fall',
          year: 2024,
          type: ['lecture', 'lab', 'tutorial'][Math.floor(Math.random() * 3)],
          status: 'active',
          color: generateRandomColor()
        });
      }
    });
  });
  
  return schedules;
};

const generateRandomColor = () => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Main export function
module.exports = {
  generateStudents,
  generateTeachers,
  generateClassTeachers,
  generateSubjects,
  generateClasses,
  generateRooms,
  generateAssignments,
  generateAttendanceRecords,
  generateSchedules,
  
  // Complete dataset
  generateAllFakeData: () => ({
    students: generateStudents(50),
    teachers: generateTeachers(10),
    classTeachers: generateClassTeachers(5),
    subjects: generateSubjects(),
    classes: generateClasses(),
    rooms: generateRooms(),
    assignments: generateAssignments(),
    attendanceRecords: generateAttendanceRecords(),
    schedules: generateSchedules()
  })
};
