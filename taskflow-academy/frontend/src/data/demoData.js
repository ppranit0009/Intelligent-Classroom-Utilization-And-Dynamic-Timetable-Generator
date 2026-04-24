// Frontend Demo Data for TaskFlow Academy
// This file contains comprehensive demo data for immediate frontend demonstration

// Student Demo Data
export const demoStudents = [
  {
    id: 'S1001',
    name: 'Alice Johnson',
    email: 'alice.johnson@taskflow.academy',
    password: '123',
    classId: 'C101',
    grade: 'F.Y.BCA',
    section: 'A',
    rollNumber: 1,
    progress: 85,
    status: 'On Track',
    avatar: 'AJ',
    role: 'student',
    attendancePercentage: 92,
    gpa: '3.8',
    lastActive: '2 hours ago',
    enrolledSubjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
    parentContact: {
      name: 'Mr. Johnson',
      phone: '+15551234567',
      email: 'johnson.parent@email.com'
    },
    assignments: [
      { id: 'ASS1001', title: 'Mathematics Problem Set', subject: 'Mathematics I', dueDate: '2024-03-15', status: 'submitted', score: 88 },
      { id: 'ASS1002', title: 'Programming Assignment', subject: 'Computer Programming', dueDate: '2024-03-18', status: 'pending', score: null },
      { id: 'ASS1003', title: 'Digital Lab Report', subject: 'Digital Electronics', dueDate: '2024-03-20', status: 'graded', score: 92 }
    ],
    attendance: [
      { date: '2024-03-10', status: 'present', markedBy: 'T2001' },
      { date: '2024-03-11', status: 'present', markedBy: 'T2002' },
      { date: '2024-03-12', status: 'late', markedBy: 'T2003', remarks: 'Late by 10 mins' },
      { date: '2024-03-13', status: 'present', markedBy: 'T2001' },
      { date: '2024-03-14', status: 'absent', markedBy: 'T2002', remarks: 'Sick' }
    ]
  },
  {
    id: 'S1002',
    name: 'Bob Smith',
    email: 'bob.smith@taskflow.academy',
    password: '123',
    classId: 'C101',
    grade: 'F.Y.BCA',
    section: 'A',
    rollNumber: 2,
    progress: 92,
    status: 'Ahead',
    avatar: 'BS',
    role: 'student',
    attendancePercentage: 95,
    gpa: '3.9',
    lastActive: '1 hour ago',
    enrolledSubjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
    parentContact: {
      name: 'Mrs. Smith',
      phone: '+15551234568',
      email: 'smith.parent@email.com'
    }
  },
  {
    id: 'S1003',
    name: 'Carol Davis',
    email: 'carol.davis@taskflow.academy',
    password: '123',
    classId: 'C102',
    grade: 'S.Y.BCA',
    section: 'B',
    rollNumber: 1,
    progress: 78,
    status: 'On Track',
    avatar: 'CD',
    role: 'student',
    attendancePercentage: 88,
    gpa: '3.5',
    lastActive: '5 hours ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mr. Davis',
      phone: '+15551234569',
      email: 'davis.parent@email.com'
    }
  },
  {
    id: 'S1004',
    name: 'David Wilson',
    email: 'david.wilson@taskflow.academy',
    password: '123',
    classId: 'C102',
    grade: 'S.Y.BCA',
    section: 'B',
    rollNumber: 2,
    progress: 88,
    status: 'Ahead',
    avatar: 'DW',
    role: 'student',
    attendancePercentage: 94,
    gpa: '3.7',
    lastActive: 'Just now',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mrs. Wilson',
      phone: '+15551234570',
      email: 'wilson.parent@email.com'
    }
  },
  {
    id: 'S1005',
    name: 'Emma Brown',
    email: 'emma.brown@taskflow.academy',
    password: '123',
    classId: 'C103',
    grade: 'T.Y.BCA',
    section: 'A',
    rollNumber: 1,
    progress: 91,
    status: 'Ahead',
    avatar: 'EB',
    role: 'student',
    attendancePercentage: 96,
    gpa: '3.9',
    lastActive: '3 hours ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mr. Brown',
      phone: '+15551234571',
      email: 'brown.parent@email.com'
    }
  },
  {
    id: 'S1006',
    name: 'Michael Lee',
    email: 'michael.lee@taskflow.academy',
    password: '123',
    classId: 'C101',
    grade: 'F.Y.BCA',
    section: 'A',
    rollNumber: 3,
    progress: 72,
    status: 'At Risk',
    avatar: 'ML',
    role: 'student',
    attendancePercentage: 78,
    gpa: '2.6',
    lastActive: '2 days ago',
    enrolledSubjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
    parentContact: {
      name: 'Mrs. Lee',
      phone: '+15551234572',
      email: 'lee.parent@email.com'
    }
  },
  {
    id: 'S1007',
    name: 'Sophia Martinez',
    email: 'sophia.martinez@taskflow.academy',
    password: '123',
    classId: 'C101',
    grade: 'F.Y.BCA',
    section: 'A',
    rollNumber: 4,
    progress: 88,
    status: 'On Track',
    avatar: 'SM',
    role: 'student',
    attendancePercentage: 91,
    gpa: '3.6',
    lastActive: '4 hours ago',
    enrolledSubjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
    parentContact: {
      name: 'Mr. Martinez',
      phone: '+15551234573',
      email: 'martinez.parent@email.com'
    }
  },
  {
    id: 'S1008',
    name: 'James Anderson',
    email: 'james.anderson@taskflow.academy',
    password: '123',
    classId: 'C102',
    grade: 'S.Y.BCA',
    section: 'B',
    rollNumber: 3,
    progress: 95,
    status: 'Ahead',
    avatar: 'JA',
    role: 'student',
    attendancePercentage: 98,
    gpa: '3.9',
    lastActive: '30 minutes ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mr. Anderson',
      phone: '+15551234574',
      email: 'anderson.parent@email.com'
    }
  },
  {
    id: 'S1009',
    name: 'Olivia Taylor',
    email: 'olivia.taylor@taskflow.academy',
    password: '123',
    classId: 'C102',
    grade: 'S.Y.BCA',
    section: 'B',
    rollNumber: 4,
    progress: 81,
    status: 'On Track',
    avatar: 'OT',
    role: 'student',
    attendancePercentage: 85,
    gpa: '3.4',
    lastActive: '6 hours ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mrs. Taylor',
      phone: '+15551234575',
      email: 'taylor.parent@email.com'
    }
  },
  {
    id: 'S1010',
    name: 'William Thomas',
    email: 'william.thomas@taskflow.academy',
    password: '123',
    classId: 'C103',
    grade: 'T.Y.BCA',
    section: 'A',
    rollNumber: 2,
    progress: 76,
    status: 'On Track',
    avatar: 'WT',
    role: 'student',
    attendancePercentage: 82,
    gpa: '3.1',
    lastActive: '1 day ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mr. Thomas',
      phone: '+15551234576',
      email: 'thomas.parent@email.com'
    }
  },
  {
    id: 'S1011',
    name: 'Isabella Jackson',
    email: 'isabella.jackson@taskflow.academy',
    password: '123',
    classId: 'C103',
    grade: 'T.Y.BCA',
    section: 'A',
    rollNumber: 3,
    progress: 89,
    status: 'On Track',
    avatar: 'IJ',
    role: 'student',
    attendancePercentage: 93,
    gpa: '3.7',
    lastActive: '2 hours ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mrs. Jackson',
      phone: '+15551234577',
      email: 'jackson.parent@email.com'
    }
  },
  {
    id: 'S1012',
    name: 'Ethan White',
    email: 'ethan.white@taskflow.academy',
    password: '123',
    classId: 'C101',
    grade: 'F.Y.BCA',
    section: 'A',
    rollNumber: 5,
    progress: 68,
    status: 'At Risk',
    avatar: 'EW',
    role: 'student',
    attendancePercentage: 75,
    gpa: '2.4',
    lastActive: '3 days ago',
    enrolledSubjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
    parentContact: {
      name: 'Mr. White',
      phone: '+15551234578',
      email: 'white.parent@email.com'
    }
  },
  {
    id: 'S1013',
    name: 'Mia Harris',
    email: 'mia.harris@taskflow.academy',
    password: '123',
    classId: 'C102',
    grade: 'S.Y.BCA',
    section: 'B',
    rollNumber: 5,
    progress: 94,
    status: 'Ahead',
    avatar: 'MH',
    role: 'student',
    attendancePercentage: 97,
    gpa: '3.8',
    lastActive: '1 hour ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mrs. Harris',
      phone: '+15551234579',
      email: 'harris.parent@email.com'
    }
  },
  {
    id: 'S1014',
    name: 'Noah Martin',
    email: 'noah.martin@taskflow.academy',
    password: '123',
    classId: 'C103',
    grade: 'T.Y.BCA',
    section: 'A',
    rollNumber: 4,
    progress: 83,
    status: 'On Track',
    avatar: 'NM',
    role: 'student',
    attendancePercentage: 88,
    gpa: '3.5',
    lastActive: '5 hours ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mr. Martin',
      phone: '+15551234580',
      email: 'martin.parent@email.com'
    }
  },
  {
    id: 'S1015',
    name: 'Ava Thompson',
    email: 'ava.thompson@taskflow.academy',
    password: '123',
    classId: 'C101',
    grade: 'F.Y.BCA',
    section: 'A',
    rollNumber: 6,
    progress: 90,
    status: 'Ahead',
    avatar: 'AT',
    role: 'student',
    attendancePercentage: 95,
    gpa: '3.8',
    lastActive: '45 minutes ago',
    enrolledSubjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
    parentContact: {
      name: 'Mrs. Thompson',
      phone: '+15551234581',
      email: 'thompson.parent@email.com'
    }
  },
  {
    id: 'S1016',
    name: 'Lucas Garcia',
    email: 'lucas.garcia@taskflow.academy',
    password: '123',
    classId: 'C102',
    grade: 'S.Y.BCA',
    section: 'B',
    rollNumber: 6,
    progress: 79,
    status: 'On Track',
    avatar: 'LG',
    role: 'student',
    attendancePercentage: 84,
    gpa: '3.2',
    lastActive: '7 hours ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mr. Garcia',
      phone: '+15551234582',
      email: 'garcia.parent@email.com'
    }
  },
  {
    id: 'S1017',
    name: 'Charlotte Robinson',
    email: 'charlotte.robinson@taskflow.academy',
    password: '123',
    classId: 'C103',
    grade: 'T.Y.BCA',
    section: 'A',
    rollNumber: 5,
    progress: 87,
    status: 'On Track',
    avatar: 'CR',
    role: 'student',
    attendancePercentage: 90,
    gpa: '3.6',
    lastActive: '3 hours ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mrs. Robinson',
      phone: '+15551234583',
      email: 'robinson.parent@email.com'
    }
  },
  {
    id: 'S1018',
    name: 'Henry Clark',
    email: 'henry.clark@taskflow.academy',
    password: '123',
    classId: 'C101',
    grade: 'F.Y.BCA',
    section: 'A',
    rollNumber: 7,
    progress: 73,
    status: 'At Risk',
    avatar: 'HC',
    role: 'student',
    attendancePercentage: 76,
    gpa: '2.7',
    lastActive: '4 days ago',
    enrolledSubjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
    parentContact: {
      name: 'Mr. Clark',
      phone: '+15551234584',
      email: 'clark.parent@email.com'
    }
  },
  {
    id: 'S1019',
    name: 'Amelia Rodriguez',
    email: 'amelia.rodriguez@taskflow.academy',
    password: '123',
    classId: 'C102',
    grade: 'S.Y.BCA',
    section: 'B',
    rollNumber: 7,
    progress: 92,
    status: 'Ahead',
    avatar: 'AR',
    role: 'student',
    attendancePercentage: 96,
    gpa: '3.9',
    lastActive: '15 minutes ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mrs. Rodriguez',
      phone: '+15551234585',
      email: 'rodriguez.parent@email.com'
    }
  },
  {
    id: 'S1020',
    name: 'Benjamin Lewis',
    email: 'benjamin.lewis@taskflow.academy',
    password: '123',
    classId: 'C103',
    grade: 'T.Y.BCA',
    section: 'A',
    rollNumber: 6,
    progress: 85,
    status: 'On Track',
    avatar: 'BL',
    role: 'student',
    attendancePercentage: 89,
    gpa: '3.5',
    lastActive: '2 hours ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mr. Lewis',
      phone: '+15551234586',
      email: 'lewis.parent@email.com'
    }
  },
  {
    id: 'S1021',
    name: 'Harper Walker',
    email: 'harper.walker@taskflow.academy',
    password: '123',
    classId: 'C101',
    grade: 'F.Y.BCA',
    section: 'A',
    rollNumber: 8,
    progress: 77,
    status: 'On Track',
    avatar: 'HW',
    role: 'student',
    attendancePercentage: 83,
    gpa: '3.3',
    lastActive: '1 day ago',
    enrolledSubjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
    parentContact: {
      name: 'Mrs. Walker',
      phone: '+15551234587',
      email: 'walker.parent@email.com'
    }
  },
  {
    id: 'S1022',
    name: 'Evelyn Hall',
    email: 'evelyn.hall@taskflow.academy',
    password: '123',
    classId: 'C102',
    grade: 'S.Y.BCA',
    section: 'B',
    rollNumber: 8,
    progress: 86,
    status: 'On Track',
    avatar: 'EH',
    role: 'student',
    attendancePercentage: 92,
    gpa: '3.6',
    lastActive: '4 hours ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mr. Hall',
      phone: '+15551234588',
      email: 'hall.parent@email.com'
    }
  },
  {
    id: 'S1023',
    name: 'Alexander Young',
    email: 'alexander.young@taskflow.academy',
    password: '123',
    classId: 'C103',
    grade: 'T.Y.BCA',
    section: 'A',
    rollNumber: 7,
    progress: 91,
    status: 'Ahead',
    avatar: 'AY',
    role: 'student',
    attendancePercentage: 94,
    gpa: '3.8',
    lastActive: '1 hour ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mr. Young',
      phone: '+15551234589',
      email: 'young.parent@email.com'
    }
  },
  {
    id: 'S1024',
    name: 'Abigail King',
    email: 'abigail.king@taskflow.academy',
    password: '123',
    classId: 'C101',
    grade: 'F.Y.BCA',
    section: 'A',
    rollNumber: 9,
    progress: 82,
    status: 'On Track',
    avatar: 'AK',
    role: 'student',
    attendancePercentage: 87,
    gpa: '3.4',
    lastActive: '3 hours ago',
    enrolledSubjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
    parentContact: {
      name: 'Mrs. King',
      phone: '+15551234590',
      email: 'king.parent@email.com'
    }
  },
  {
    id: 'S1025',
    name: 'Daniel Wright',
    email: 'daniel.wright@taskflow.academy',
    password: '123',
    classId: 'C102',
    grade: 'S.Y.BCA',
    section: 'B',
    rollNumber: 9,
    progress: 74,
    status: 'At Risk',
    avatar: 'DW',
    role: 'student',
    attendancePercentage: 79,
    gpa: '2.8',
    lastActive: '2 days ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mr. Wright',
      phone: '+15551234591',
      email: 'wright.parent@email.com'
    }
  },
  {
    id: 'S1026',
    name: 'Emily Scott',
    email: 'emily.scott@taskflow.academy',
    password: '123',
    classId: 'C103',
    grade: 'T.Y.BCA',
    section: 'A',
    rollNumber: 8,
    progress: 88,
    status: 'On Track',
    avatar: 'ES',
    role: 'student',
    attendancePercentage: 91,
    gpa: '3.7',
    lastActive: '30 minutes ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mrs. Scott',
      phone: '+15551234592',
      email: 'scott.parent@email.com'
    }
  },
  {
    id: 'S1027',
    name: 'Joseph Green',
    email: 'joseph.green@taskflow.academy',
    password: '123',
    classId: 'C101',
    grade: 'F.Y.BCA',
    section: 'A',
    rollNumber: 10,
    progress: 69,
    status: 'At Risk',
    avatar: 'JG',
    role: 'student',
    attendancePercentage: 74,
    gpa: '2.5',
    lastActive: '5 days ago',
    enrolledSubjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
    parentContact: {
      name: 'Mr. Green',
      phone: '+15551234593',
      email: 'green.parent@email.com'
    }
  },
  {
    id: 'S1028',
    name: 'Madison Baker',
    email: 'madison.baker@taskflow.academy',
    password: '123',
    classId: 'C102',
    grade: 'S.Y.BCA',
    section: 'B',
    rollNumber: 10,
    progress: 93,
    status: 'Ahead',
    avatar: 'MB',
    role: 'student',
    attendancePercentage: 95,
    gpa: '3.8',
    lastActive: '1 hour ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mrs. Baker',
      phone: '+15551234594',
      email: 'baker.parent@email.com'
    }
  },
  {
    id: 'S1029',
    name: 'Andrew Adams',
    email: 'andrew.adams@taskflow.academy',
    password: '123',
    classId: 'C103',
    grade: 'T.Y.BCA',
    section: 'A',
    rollNumber: 9,
    progress: 80,
    status: 'On Track',
    avatar: 'AA',
    role: 'student',
    attendancePercentage: 86,
    gpa: '3.3',
    lastActive: '6 hours ago',
    enrolledSubjects: ['SUB005', 'SUB006', 'SUB007'],
    parentContact: {
      name: 'Mr. Adams',
      phone: '+15551234595',
      email: 'adams.parent@email.com'
    }
  },
  {
    id: 'S1030',
    name: 'Elizabeth Nelson',
    email: 'elizabeth.nelson@taskflow.academy',
    password: '123',
    classId: 'C101',
    grade: 'F.Y.BCA',
    section: 'A',
    rollNumber: 11,
    progress: 84,
    status: 'On Track',
    avatar: 'EN',
    role: 'student',
    attendancePercentage: 88,
    gpa: '3.5',
    lastActive: '2 hours ago',
    enrolledSubjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
    parentContact: {
      name: 'Mrs. Nelson',
      phone: '+15551234596',
      email: 'nelson.parent@email.com'
    }
  }
];

// Teacher Demo Data
export const demoTeachers = [
  {
    id: 'T2001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@taskflow.academy',
    password: '123',
    phone: '+15559876543',
    department: 'Computer Science',
    avatar: 'SJ',
    role: 'teacher',
    subjects: ['SUB001', 'SUB005'],
    qualification: 'Ph.D',
    experience: 15,
    specialization: 'AI, Machine Learning, Data Structures',
    availability: 'full-time',
    officeHours: [
      { day: 'Monday', time: '10:00 - 12:00' },
      { day: 'Wednesday', time: '14:00 - 16:00' },
      { day: 'Friday', time: '11:00 - 13:00' }
    ],
    researchInterests: ['Artificial Intelligence', 'Machine Learning'],
    publications: 45,
    rating: '4.8',
    classes: ['C101', 'C102'],
    assignments: [
      { id: 'ASS2001', title: 'Calculus Problem Set', class: 'C101', dueDate: '2024-03-15', submissions: 45, graded: 40 },
      { id: 'ASS2002', title: 'Data Structure Project', class: 'C102', dueDate: '2024-03-18', submissions: 38, graded: 35 }
    ],
    schedule: [
      { day: 'Monday', time: '09:30-11:00', subject: 'Mathematics I', class: 'C101', room: 'R001' },
      { day: 'Tuesday', time: '14:30-16:00', subject: 'Data Structures', class: 'C102', room: 'R002' },
      { day: 'Thursday', time: '11:00-12:30', subject: 'Mathematics I', class: 'C101', room: 'R001' }
    ]
  },
  {
    id: 'T2002',
    name: 'Prof. David Chen',
    email: 'david.chen@taskflow.academy',
    password: '123',
    phone: '+15559876544',
    department: 'Computer Science',
    avatar: 'DC',
    role: 'teacher',
    subjects: ['SUB002', 'SUB006'],
    qualification: 'M.Tech',
    experience: 12,
    specialization: 'Web Development, Database Systems, Software Engineering',
    availability: 'full-time',
    officeHours: [
      { day: 'Tuesday', time: '13:00 - 15:00' },
      { day: 'Thursday', time: '10:00 - 12:00' }
    ],
    researchInterests: ['Web Development', 'Database Systems'],
    publications: 32,
    rating: '4.6',
    classes: ['C101', 'C103'],
    assignments: [
      { id: 'ASS2003', title: 'Programming Assignment', class: 'C101', dueDate: '2024-03-18', submissions: 45, graded: 42 },
      { id: 'ASS2004', title: 'Database Design Project', class: 'C103', dueDate: '2024-03-20', submissions: 42, graded: 38 }
    ]
  },
  {
    id: 'T2003',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@taskflow.academy',
    password: '123',
    phone: '+15559876545',
    department: 'Physics',
    avatar: 'ER',
    role: 'teacher',
    subjects: ['SUB003'],
    qualification: 'Ph.D',
    experience: 18,
    specialization: 'Quantum Mechanics, Thermodynamics, Electromagnetism',
    availability: 'part-time',
    officeHours: [
      { day: 'Monday', time: '14:00 - 16:00' },
      { day: 'Wednesday', time: '10:00 - 12:00' }
    ],
    researchInterests: ['Quantum Mechanics', 'Thermodynamics'],
    publications: 58,
    rating: '4.9',
    classes: ['C101', 'C202'],
    assignments: [
      { id: 'ASS2005', title: 'Digital Circuit Design', class: 'C101', dueDate: '2024-03-20', submissions: 45, graded: 40 }
    ]
  }
];

// Class Teacher Demo Data
export const demoClassTeachers = [
  {
    id: 'CT3001',
    name: 'Dr. Amanda White',
    email: 'amanda.white@taskflow.academy',
    password: '123',
    phone: '+15559876546',
    classId: 'C101',
    department: 'Administration',
    avatar: 'AW',
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
    qualification: 'M.Ed',
    experience: 20,
    totalStudentsManaged: 45,
    parentMeetingsScheduled: 12,
    classPerformanceRating: '4.7',
    class: {
      id: 'C101',
      name: 'BCA First Year A',
      grade: 'F.Y.BCA',
      section: 'A',
      currentStudents: 45,
      maxStudents: 60,
      subjects: ['SUB001', 'SUB002', 'SUB003', 'SUB004'],
      teachers: ['T2001', 'T2002', 'T2003'],
      attendanceRate: 92,
      averageGPA: 3.6,
      upcomingEvents: [
        { date: '2024-03-25', title: 'Parent-Teacher Meeting', type: 'meeting' },
        { date: '2024-03-28', title: 'Class Test', type: 'exam' },
        { date: '2024-04-02', title: 'Industrial Visit', type: 'event' }
      ]
    }
  },
  {
    id: 'CT3002',
    name: 'Prof. Benjamin Lee',
    email: 'benjamin.lee@taskflow.academy',
    password: '123',
    phone: '+15559876547',
    classId: 'C102',
    department: 'Administration',
    avatar: 'BL',
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
    qualification: 'Ph.D',
    experience: 16,
    totalStudentsManaged: 38,
    parentMeetingsScheduled: 8,
    classPerformanceRating: '4.5',
    class: {
      id: 'C102',
      name: 'BCA Second Year B',
      grade: 'S.Y.BCA',
      section: 'B',
      currentStudents: 38,
      maxStudents: 50,
      subjects: ['SUB005', 'SUB006', 'SUB007'],
      teachers: ['T2001', 'T2002'],
      attendanceRate: 89,
      averageGPA: 3.4,
      upcomingEvents: [
        { date: '2024-03-26', title: 'Project Presentation', type: 'presentation' },
        { date: '2024-03-30', title: 'Mock Interview', type: 'event' }
      ]
    }
  }
];

// Subject Demo Data
export const demoSubjects = [
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
    offeredSemesters: ['Fall', 'Spring'],
    teacher: 'T2001',
    enrolledStudents: 45,
    syllabus: [
      'Unit 1: Calculus Fundamentals',
      'Unit 2: Linear Algebra',
      'Unit 3: Differential Equations',
      'Unit 4: Probability and Statistics'
    ],
    resources: [
      { type: 'textbook', title: 'Mathematics for Engineers', author: 'John Doe' },
      { type: 'video', title: 'Calculus Video Lectures', url: 'https://example.com' },
      { type: 'notes', title: 'Study Notes', url: 'https://example.com' }
    ]
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
    offeredSemesters: ['Fall', 'Spring'],
    teacher: 'T2002',
    enrolledStudents: 45,
    syllabus: [
      'Unit 1: Introduction to Programming',
      'Unit 2: Control Structures',
      'Unit 3: Functions and Arrays',
      'Unit 4: Object-Oriented Programming'
    ],
    resources: [
      { type: 'textbook', title: 'Programming Fundamentals', author: 'Jane Smith' },
      { type: 'video', title: 'Programming Tutorials', url: 'https://example.com' },
      { type: 'lab', title: 'Programming Lab Manual', url: 'https://example.com' }
    ]
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
    offeredSemesters: ['Fall'],
    teacher: 'T2003',
    enrolledStudents: 45,
    syllabus: [
      'Unit 1: Number Systems and Codes',
      'Unit 2: Logic Gates',
      'Unit 3: Combinational Circuits',
      'Unit 4: Sequential Circuits'
    ]
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
    offeredSemesters: ['Fall', 'Spring'],
    enrolledStudents: 45,
    syllabus: [
      'Unit 1: Business Writing Skills',
      'Unit 2: Presentation Skills',
      'Unit 3: Corporate Communication',
      'Unit 4: Digital Communication'
    ]
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
    offeredSemesters: ['Spring'],
    teacher: 'T2001',
    enrolledStudents: 80,
    syllabus: [
      'Unit 1: Arrays and Linked Lists',
      'Unit 2: Stacks and Queues',
      'Unit 3: Trees and Graphs',
      'Unit 4: Sorting and Searching Algorithms'
    ]
  }
];

// Class Demo Data
export const demoClasses = [
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
    enrolledStudents: ['S1001', 'S1002'],
    assignments: [],
    classTeacher: 'CT3001',
    academicYear: '2024-25',
    semester: 'Fall',
    teachers: ['T2001', 'T2002', 'T2003'],
    attendanceRate: 92,
    averageGPA: 3.6,
    performanceMetrics: {
      topPerformers: 15,
      averagePerformers: 25,
      needsImprovement: 5
    },
    upcomingEvents: [
      { date: '2024-03-25', title: 'Parent-Teacher Meeting', type: 'meeting' },
      { date: '2024-03-28', title: 'Mid-term Examination', type: 'exam' },
      { date: '2024-04-02', title: 'Industrial Visit', type: 'event' }
    ]
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
    enrolledStudents: ['S1003', 'S1004'],
    assignments: [],
    classTeacher: 'CT3002',
    academicYear: '2024-25',
    semester: 'Fall',
    teachers: ['T2001', 'T2002'],
    attendanceRate: 89,
    averageGPA: 3.4,
    performanceMetrics: {
      topPerformers: 12,
      averagePerformers: 20,
      needsImprovement: 6
    }
  }
];

// Assignment Demo Data
export const demoAssignments = [
  {
    id: 'ASS1001',
    title: 'Mathematics Problem Set',
    description: 'Complete all exercises from Chapter 3 and submit your solutions with proper working.',
    subject: 'SUB001',
    subjectName: 'Mathematics I',
    class: 'C101',
    className: 'BCA First Year A',
    teacher: 'T2001',
    teacherName: 'Dr. Sarah Johnson',
    type: 'homework',
    maxMarks: 100,
    dueDate: '2024-03-15',
    assignedDate: '2024-03-08',
    status: 'submitted',
    submissions: 45,
    graded: 40,
    averageScore: 85,
    attachments: [
      { name: 'problem_set.pdf', size: 1024, type: 'pdf' },
      { name: 'answer_key.pdf', size: 512, type: 'pdf' }
    ],
    instructions: [
      'Show all working steps clearly',
      'Use proper mathematical notation',
      'Submit in PDF format only',
      'Late submissions will lose 10% per day'
    ],
    rubric: {
      criteria: ['Accuracy', 'Methodology', 'Presentation', 'Completeness'],
      maxPoints: [25, 25, 20, 30]
    }
  },
  {
    id: 'ASS1002',
    title: 'Programming Assignment',
    description: 'Design and implement a student management system using object-oriented programming concepts.',
    subject: 'SUB002',
    subjectName: 'Computer Programming',
    class: 'C101',
    className: 'BCA First Year A',
    teacher: 'T2002',
    teacherName: 'Prof. David Chen',
    type: 'project',
    maxMarks: 100,
    dueDate: '2024-03-18',
    assignedDate: '2024-03-10',
    status: 'pending',
    submissions: 35,
    graded: 20,
    averageScore: 78,
    attachments: [
      { name: 'requirements.pdf', size: 2048, type: 'pdf' },
      { name: 'starter_code.zip', size: 5120, type: 'zip' }
    ],
    instructions: [
      'Follow proper OOP principles',
      'Include error handling',
      'Add proper documentation',
      'Submit source code and executable'
    ]
  },
  {
    id: 'ASS1003',
    title: 'Digital Lab Report',
    description: 'Complete the digital circuit experiment and submit a comprehensive lab report.',
    subject: 'SUB003',
    subjectName: 'Digital Electronics',
    class: 'C101',
    className: 'BCA First Year A',
    teacher: 'T2003',
    teacherName: 'Dr. Emily Rodriguez',
    type: 'lab report',
    maxMarks: 50,
    dueDate: '2024-03-20',
    assignedDate: '2024-03-12',
    status: 'graded',
    submissions: 45,
    graded: 45,
    averageScore: 88,
    attachments: [
      { name: 'lab_manual.pdf', size: 1536, type: 'pdf' },
      { name: 'experiment_sheet.pdf', size: 768, type: 'pdf' }
    ]
  }
];

// Schedule Demo Data
export const demoSchedules = [
  {
    id: 'SCH001',
    subject: 'SUB001',
    subjectName: 'Mathematics I',
    teacher: 'T2001',
    teacherName: 'Dr. Sarah Johnson',
    class: 'C101',
    className: 'BCA First Year A',
    room: 'R001',
    roomName: 'Room 101',
    dayOfWeek: 'Monday',
    startTime: '09:30',
    endTime: '11:00',
    semester: 'Fall',
    year: 2024,
    type: 'lecture',
    status: 'active',
    color: '#3B82F6'
  },
  {
    id: 'SCH002',
    subject: 'SUB002',
    subjectName: 'Computer Programming',
    teacher: 'T2002',
    teacherName: 'Prof. David Chen',
    class: 'C101',
    className: 'BCA First Year A',
    room: 'R002',
    roomName: 'Computer Lab 201',
    dayOfWeek: 'Monday',
    startTime: '11:00',
    endTime: '12:30',
    semester: 'Fall',
    year: 2024,
    type: 'lab',
    status: 'active',
    color: '#10B981'
  },
  {
    id: 'SCH003',
    subject: 'SUB005',
    subjectName: 'Data Structures',
    teacher: 'T2001',
    teacherName: 'Dr. Sarah Johnson',
    class: 'C102',
    className: 'BCA Second Year B',
    room: 'R002',
    roomName: 'Computer Lab 201',
    dayOfWeek: 'Tuesday',
    startTime: '14:30',
    endTime: '16:00',
    semester: 'Fall',
    year: 2024,
    type: 'lab',
    status: 'active',
    color: '#F59E0B'
  },
  {
    id: 'SCH004',
    subject: 'SUB003',
    subjectName: 'Digital Electronics',
    teacher: 'T2003',
    teacherName: 'Dr. Emily Rodriguez',
    class: 'C101',
    className: 'BCA First Year A',
    room: 'R004',
    roomName: 'Chemistry Lab 301',
    dayOfWeek: 'Wednesday',
    startTime: '13:00',
    endTime: '14:30',
    semester: 'Fall',
    year: 2024,
    type: 'lab',
    status: 'active',
    color: '#EF4444'
  },
  {
    id: 'SCH005',
    subject: 'SUB001',
    subjectName: 'Mathematics I',
    teacher: 'T2001',
    teacherName: 'Dr. Sarah Johnson',
    class: 'C101',
    className: 'BCA First Year A',
    room: 'R001',
    roomName: 'Room 101',
    dayOfWeek: 'Thursday',
    startTime: '11:00',
    endTime: '12:30',
    semester: 'Fall',
    year: 2024,
    type: 'lecture',
    status: 'active',
    color: '#3B82F6'
  }
];

// Room Demo Data
export const demoRooms = [
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
    availability: {
      monday: { available: true, blockedTimes: [] },
      tuesday: { available: true, blockedTimes: [] },
      wednesday: { available: true, blockedTimes: [] },
      thursday: { available: true, blockedTimes: [] },
      friday: { available: true, blockedTimes: [] },
      saturday: { available: false, blockedTimes: [] },
      sunday: { available: false, blockedTimes: [] }
    },
    status: 'available',
    currentSchedule: [
      { day: 'Monday', time: '09:30-11:00', class: 'C101', subject: 'Mathematics I' },
      { day: 'Thursday', time: '11:00-12:30', class: 'C101', subject: 'Mathematics I' }
    ]
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
    availability: {
      monday: { available: true, blockedTimes: [] },
      tuesday: { available: true, blockedTimes: [] },
      wednesday: { available: true, blockedTimes: [] },
      thursday: { available: true, blockedTimes: [] },
      friday: { available: true, blockedTimes: [] },
      saturday: { available: false, blockedTimes: [] },
      sunday: { available: false, blockedTimes: [] }
    },
    status: 'available',
    currentSchedule: [
      { day: 'Monday', time: '11:00-12:30', class: 'C101', subject: 'Computer Programming' },
      { day: 'Tuesday', time: '14:30-16:00', class: 'C102', subject: 'Data Structures' }
    ]
  }
];

// Attendance Demo Data
export const demoAttendance = [
  {
    id: 'ATT001',
    studentId: 'S1001',
    studentName: 'Alice Johnson',
    classId: 'C101',
    date: '2024-03-10',
    status: 'present',
    markedBy: 'T2001',
    markedByName: 'Dr. Sarah Johnson',
    markedAt: '2024-03-10T09:05:00',
    remarks: null
  },
  {
    id: 'ATT002',
    studentId: 'S1001',
    studentName: 'Alice Johnson',
    classId: 'C101',
    date: '2024-03-11',
    status: 'present',
    markedBy: 'T2002',
    markedByName: 'Prof. David Chen',
    markedAt: '2024-03-11T09:03:00',
    remarks: null
  },
  {
    id: 'ATT003',
    studentId: 'S1001',
    studentName: 'Alice Johnson',
    classId: 'C101',
    date: '2024-03-12',
    status: 'late',
    markedBy: 'T2003',
    markedByName: 'Dr. Emily Rodriguez',
    markedAt: '2024-03-12T09:15:00',
    remarks: 'Late by 10 mins'
  },
  {
    id: 'ATT004',
    studentId: 'S1001',
    studentName: 'Alice Johnson',
    classId: 'C101',
    date: '2024-03-13',
    status: 'present',
    markedBy: 'T2001',
    markedByName: 'Dr. Sarah Johnson',
    markedAt: '2024-03-13T09:02:00',
    remarks: null
  },
  {
    id: 'ATT005',
    studentId: 'S1001',
    studentName: 'Alice Johnson',
    classId: 'C101',
    date: '2024-03-14',
    status: 'absent',
    markedBy: 'T2002',
    markedByName: 'Prof. David Chen',
    markedAt: '2024-03-14T09:10:00',
    remarks: 'Sick'
  }
];

// Export all demo data
export const demoData = {
  students: demoStudents,
  teachers: demoTeachers,
  classTeachers: demoClassTeachers,
  subjects: demoSubjects,
  classes: demoClasses,
  assignments: demoAssignments,
  schedules: demoSchedules,
  rooms: demoRooms,
  attendance: demoAttendance
};

// Helper function to get user by role and ID
export const getUserById = (role, id) => {
  switch (role) {
    case 'student':
      return demoStudents.find(s => s.id === id);
    case 'teacher':
      return demoTeachers.find(t => t.id === id);
    case 'classTeacher':
      return demoClassTeachers.find(ct => ct.id === id);
    case 'admin':
      return {
        id: 'PRANIT_ADMIN',
        name: 'Pranit Patil',
        email: 'admin@taskflow.academy',
        role: 'admin',
        permissions: {
          canManageUsers: true,
          canManageClasses: true,
          canManageSystem: true,
          canViewReports: true,
          canDeleteData: true,
          canManageSettings: true
        }
      };
    default:
      return null;
  }
};

// Helper function to get class by ID
export const getClassById = (classId) => {
  return demoClasses.find(c => c.id === classId);
};

// Helper function to get subject by ID
export const getSubjectById = (subjectId) => {
  return demoSubjects.find(s => s.id === subjectId);
};

// Helper function to get assignments by class
export const getAssignmentsByClass = (classId) => {
  return demoAssignments.filter(a => a.class === classId);
};

// Helper function to get schedules by class
export const getSchedulesByClass = (classId) => {
  return demoSchedules.filter(s => s.class === classId);
};

// Helper function to get attendance by student
export const getAttendanceByStudent = (studentId) => {
  return demoAttendance.filter(a => a.studentId === studentId);
};
