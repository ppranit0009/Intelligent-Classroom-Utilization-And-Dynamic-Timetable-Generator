// Demo Credentials for TaskFlow Academy
// This file contains all the login credentials for easy demonstration

export const demoCredentials = {
  // Admin Account
  admin: {
    id: 'PRANIT_ADMIN',
    username: 'PRANIT_ADMIN',
    password: 'pranit123',
    name: 'Pranit Patil',
    email: 'admin@taskflow.academy',
    role: 'admin',
    description: 'System Administrator with full access to all features',
    permissions: {
      canManageUsers: true,
      canManageClasses: true,
      canManageSystem: true,
      canViewReports: true,
      canDeleteData: true,
      canManageSettings: true,
      canManageSchedule: true
    },
    features: [
      'User Management',
      'Class Management', 
      'Schedule Manager',
      'System Reports',
      'Activity Logs',
      'Database Management',
      'Settings Configuration'
    ]
  },

  // Student Accounts
  students: [
    {
      id: 'S1001',
      username: 'S1001',
      password: '123',
      name: 'Alice Johnson',
      email: 'alice.johnson@taskflow.academy',
      role: 'student',
      class: 'C101 (BCA First Year A)',
      description: 'High-performing student with excellent attendance',
      features: [
        'View Assignments',
        'Submit Work',
        'Check Grades',
        'View Attendance',
        'Class Schedule',
        'Student Profile',
        'Notice Board',
        'Progress Tracking'
      ],
      quickStats: {
        attendance: '92%',
        gpa: '3.8',
        assignments: '3 pending',
        progress: '85%'
      }
    },
    {
      id: 'S1002',
      username: 'S1002',
      password: '123',
      name: 'Bob Smith',
      email: 'bob.smith@taskflow.academy',
      role: 'student',
      class: 'C101 (BCA First Year A)',
      description: 'Top-performing student with perfect attendance',
      features: [
        'View Assignments',
        'Submit Work',
        'Check Grades',
        'View Attendance',
        'Class Schedule',
        'Student Profile',
        'Notice Board',
        'Progress Tracking'
      ],
      quickStats: {
        attendance: '95%',
        gpa: '3.9',
        assignments: '2 pending',
        progress: '92%'
      }
    },
    {
      id: 'S1003',
      username: 'S1003',
      password: '123',
      name: 'Carol Davis',
      email: 'carol.davis@taskflow.academy',
      role: 'student',
      class: 'C102 (BCA Second Year B)',
      description: 'Diligent student with good academic performance',
      features: [
        'View Assignments',
        'Submit Work',
        'Check Grades',
        'View Attendance',
        'Class Schedule',
        'Student Profile',
        'Notice Board',
        'Progress Tracking'
      ],
      quickStats: {
        attendance: '88%',
        gpa: '3.5',
        assignments: '4 pending',
        progress: '78%'
      }
    },
    {
      id: 'S1004',
      username: 'S1004',
      password: '123',
      name: 'David Wilson',
      email: 'david.wilson@taskflow.academy',
      role: 'student',
      class: 'C102 (BCA Second Year B)',
      description: 'Active student with strong technical skills',
      features: [
        'View Assignments',
        'Submit Work',
        'Check Grades',
        'View Attendance',
        'Class Schedule',
        'Student Profile',
        'Notice Board',
        'Progress Tracking'
      ],
      quickStats: {
        attendance: '94%',
        gpa: '3.7',
        assignments: '3 pending',
        progress: '88%'
      }
    },
    {
      id: 'S1005',
      username: 'S1005',
      password: '123',
      name: 'Emma Brown',
      email: 'emma.brown@taskflow.academy',
      role: 'student',
      class: 'C103 (BCA Third Year A)',
      description: 'Final year student with excellent project work',
      features: [
        'View Assignments',
        'Submit Work',
        'Check Grades',
        'View Attendance',
        'Class Schedule',
        'Student Profile',
        'Notice Board',
        'Progress Tracking'
      ],
      quickStats: {
        attendance: '96%',
        gpa: '3.9',
        assignments: '5 pending',
        progress: '91%'
      }
    }
  ],

  // Teacher Accounts
  teachers: [
    {
      id: 'T2001',
      username: 'T2001',
      password: '123',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@taskflow.academy',
      role: 'teacher',
      department: 'Computer Science',
      subjects: ['Mathematics I', 'Data Structures'],
      classes: ['C101', 'C102'],
      description: 'Experienced professor specializing in AI and Data Structures',
      features: [
        'Create Assignments',
        'Grade Submissions',
        'Mark Attendance',
        'View Class Schedule',
        'Teacher Profile',
        'Student Progress',
        'Assignment Dashboard',
        'Communication Tools'
      ],
      quickStats: {
        experience: '15 years',
        students: '83',
        assignments: '8 active',
        rating: '4.8/5'
      }
    },
    {
      id: 'T2002',
      username: 'T2002',
      password: '123',
      name: 'Prof. David Chen',
      email: 'david.chen@taskflow.academy',
      role: 'teacher',
      department: 'Computer Science',
      subjects: ['Computer Programming', 'Database Management'],
      classes: ['C101', 'C103'],
      description: 'Software engineering expert with industry experience',
      features: [
        'Create Assignments',
        'Grade Submissions',
        'Mark Attendance',
        'View Class Schedule',
        'Teacher Profile',
        'Student Progress',
        'Assignment Dashboard',
        'Communication Tools'
      ],
      quickStats: {
        experience: '12 years',
        students: '87',
        assignments: '6 active',
        rating: '4.6/5'
      }
    },
    {
      id: 'T2003',
      username: 'T2003',
      password: '123',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@taskflow.academy',
      role: 'teacher',
      department: 'Physics',
      subjects: ['Digital Electronics'],
      classes: ['C101', 'C202'],
      description: 'Physics professor with research background in quantum mechanics',
      features: [
        'Create Assignments',
        'Grade Submissions',
        'Mark Attendance',
        'View Class Schedule',
        'Teacher Profile',
        'Student Progress',
        'Assignment Dashboard',
        'Communication Tools'
      ],
      quickStats: {
        experience: '18 years',
        students: '77',
        assignments: '4 active',
        rating: '4.9/5'
      }
    }
  ],

  // Class Teacher Accounts
  classTeachers: [
    {
      id: 'CT3001',
      username: 'CT3001',
      password: '123',
      name: 'Dr. Amanda White',
      email: 'amanda.white@taskflow.academy',
      role: 'classTeacher',
      class: 'C101 (BCA First Year A)',
      department: 'Administration',
      description: 'Dedicated class teacher with strong student management skills',
      features: [
        'Class Management',
        'Student Attendance',
        'Progress Reports',
        'Parent Communication',
        'Class Schedule',
        'Teacher Coordination',
        'Event Management',
        'Discipline Management'
      ],
      quickStats: {
        experience: '20 years',
        students: '45',
        parentMeetings: '12',
        classRating: '4.7/5'
      }
    },
    {
      id: 'CT3002',
      username: 'CT3002',
      password: '123',
      name: 'Prof. Benjamin Lee',
      email: 'benjamin.lee@taskflow.academy',
      role: 'classTeacher',
      class: 'C102 (BCA Second Year B)',
      department: 'Administration',
      description: 'Experienced class teacher focusing on student development',
      features: [
        'Class Management',
        'Student Attendance',
        'Progress Reports',
        'Parent Communication',
        'Class Schedule',
        'Teacher Coordination',
        'Event Management',
        'Discipline Management'
      ],
      quickStats: {
        experience: '16 years',
        students: '38',
        parentMeetings: '8',
        classRating: '4.5/5'
      }
    }
  ]
};

// Quick login credentials for demo purposes
export const quickLoginCredentials = [
  { role: 'Admin', username: 'PRANIT_ADMIN', password: 'pranit123', description: 'Full system access' },
  { role: 'Student', username: 'S1001', password: '123', description: 'Alice Johnson - High performer' },
  { role: 'Student', username: 'S1002', password: '123', description: 'Bob Smith - Top student' },
  { role: 'Teacher', username: 'T2001', password: '123', description: 'Dr. Sarah Johnson - CS Professor' },
  { role: 'Teacher', username: 'T2002', password: '123', description: 'Prof. David Chen - Programming Expert' },
  { role: 'Class Teacher', username: 'CT3001', password: '123', description: 'Dr. Amanda White - Class Manager' },
  { role: 'Class Teacher', username: 'CT3002', password: '123', description: 'Prof. Benjamin Lee - Class Coordinator' }
];

// Feature showcase by role
export const featureShowcase = {
  admin: {
    title: 'Administrator Dashboard',
    features: [
      'Complete user management (students, teachers, class teachers)',
      'Class and subject management',
      'Advanced scheduling system with conflict detection',
      'System analytics and reports',
      'Activity logs and monitoring',
      'Database management and backup',
      'Settings and configuration',
      'Export functionality for reports and timetables'
    ],
    demoScenarios: [
      'Create and manage user accounts',
      'Set up class schedules and detect conflicts',
      'Generate system performance reports',
      'Manage academic calendar and events'
    ]
  },
  student: {
    title: 'Student Portal',
    features: [
      'Personal dashboard with progress tracking',
      'Assignment submission and grading view',
      'Attendance records and statistics',
      'Class timetable and schedule',
      'Grade reports and academic performance',
      'Notice board and announcements',
      'Profile management',
      'Communication with teachers'
    ],
    demoScenarios: [
      'Submit assignments and view grades',
      'Check attendance and class schedule',
      'View academic progress and reports',
      'Access study materials and resources'
    ]
  },
  teacher: {
    title: 'Teacher Dashboard',
    features: [
      'Class management and student lists',
      'Assignment creation and grading',
      'Attendance marking and tracking',
      'Teaching schedule and timetable',
      'Student progress monitoring',
      'Assignment dashboard',
      'Communication tools',
      'Resource sharing'
    ],
    demoScenarios: [
      'Create and grade assignments',
      'Mark daily attendance',
      'Monitor student performance',
      'Manage class resources'
    ]
  },
  classTeacher: {
    title: 'Class Teacher Portal',
    features: [
      'Complete class overview and management',
      'Student attendance and discipline',
      'Progress reports and analytics',
      'Parent communication tools',
      'Teacher coordination and scheduling',
      'Event management',
      'Class performance metrics',
      'Report generation'
    ],
    demoScenarios: [
      'Manage class attendance and discipline',
      'Generate progress reports',
      'Schedule parent-teacher meetings',
      'Coordinate with subject teachers'
    ]
  }
};

// Demo scenarios for presentation
export const demoScenarios = {
  scheduling: {
    title: 'Smart Scheduling System',
    description: 'Demonstrate the intelligent scheduling algorithm',
    steps: [
      'Login as Admin (PRANIT_ADMIN)',
      'Click "Schedule Manager" button',
      'Configure scheduling constraints',
      'Generate automatic schedule',
      'Detect and resolve conflicts',
      'Export final timetable'
    ]
  },
  assignmentFlow: {
    title: 'Complete Assignment Workflow',
    description: 'Show the end-to-end assignment process',
    steps: [
      'Teacher creates assignment',
      'Students receive notifications',
      'Students submit work',
      'Teacher grades submissions',
      'Students view grades and feedback',
      'Class teacher monitors progress'
    ]
  },
  attendanceManagement: {
    title: 'Attendance Management System',
    description: 'Demonstrate comprehensive attendance tracking',
    steps: [
      'Teacher marks daily attendance',
      'System generates attendance reports',
      'Class teacher monitors class attendance',
      'Parents receive attendance alerts',
      'Admin views attendance analytics'
    ]
  },
  parentCommunication: {
    title: 'Parent Communication Portal',
    description: 'Show communication between school and parents',
    steps: [
      'Class teacher schedules parent meeting',
      'Parents receive notifications',
      'Progress reports shared with parents',
      'Attendance alerts sent to parents',
      'Parent feedback collection'
    ]
  }
};

export default demoCredentials;
