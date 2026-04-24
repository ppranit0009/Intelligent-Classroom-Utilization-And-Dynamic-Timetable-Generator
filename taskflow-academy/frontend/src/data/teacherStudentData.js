// Comprehensive Student Data for Teacher Profiles
// This file contains detailed student information for teacher dashboard and profiles

export const teacherStudentData = {
  // Computer Programming Class Students
  'SUB001': [
    {
      id: 'S1001',
      name: 'Alice Johnson',
      email: 'alice.johnson@taskflow.academy',
      rollNumber: 'BCA101',
      avatar: 'AJ',
      profileImage: '/api/placeholder/user/alice.jpg',
      phone: '+91 98765 43210',
      parentContact: {
        name: 'Mr. Robert Johnson',
        phone: '+91 98765 43211',
        email: 'robert.johnson@email.com'
      },
      academic: {
        gpa: 3.8,
        percentage: 85,
        attendance: 92,
        assignments: {
          total: 15,
          submitted: 14,
          pending: 1,
          averageScore: 88
        }
      },
      performance: {
        strengths: ['Problem Solving', 'Algorithm Design', 'Code Quality'],
        weaknesses: ['Documentation', 'Time Management'],
        recentTrend: 'improving',
        lastAssessmentScore: 92
      },
      behavior: {
        participation: 'excellent',
        collaboration: 'good',
        punctuality: 'excellent',
        overallConduct: 'outstanding'
      },
      skills: [
        { name: 'JavaScript', level: 85, lastAssessed: '2024-03-15' },
        { name: 'Python', level: 78, lastAssessed: '2024-03-10' },
        { name: 'Data Structures', level: 82, lastAssessed: '2024-03-05' },
        { name: 'Web Development', level: 88, lastAssessed: '2024-03-20' }
      ],
      recentSubmissions: [
        {
          id: 'ASS001',
          title: 'JavaScript Array Methods',
          submittedDate: '2024-03-20',
          score: 95,
          status: 'graded',
          feedback: 'Excellent implementation of array methods. Great use of functional programming concepts.',
          lateSubmission: false
        },
        {
          id: 'ASS002',
          title: 'Python Data Structures',
          submittedDate: '2024-03-18',
          score: 82,
          status: 'graded',
          feedback: 'Good understanding of data structures. Need to work on time complexity analysis.',
          lateSubmission: false
        },
        {
          id: 'ASS003',
          title: 'React Components',
          submittedDate: '2024-03-22',
          score: 88,
          status: 'graded',
          feedback: 'Strong component design. Consider optimizing re-renders.',
          lateSubmission: true
        }
      ],
      notes: [
        {
          date: '2024-03-20',
          type: 'positive',
          content: 'Showed exceptional problem-solving skills in class discussion',
          teacher: 'Dr. Sarah Chen'
        },
        {
          date: '2024-03-15',
          type: 'concern',
          content: 'Submitted assignment 2 days late - needs improvement in time management',
          teacher: 'Dr. Sarah Chen'
        }
      ]
    },
    {
      id: 'S1002',
      name: 'Bob Smith',
      email: 'bob.smith@taskflow.academy',
      rollNumber: 'BCA102',
      avatar: 'BS',
      profileImage: '/api/placeholder/user/bob.jpg',
      phone: '+91 98765 43211',
      parentContact: {
        name: 'Mrs. Jennifer Smith',
        phone: '+91 98765 43212',
        email: 'jennifer.smith@email.com'
      },
      academic: {
        gpa: 3.2,
        percentage: 72,
        attendance: 78,
        assignments: {
          total: 15,
          submitted: 12,
          pending: 3,
          averageScore: 75
        }
      },
      performance: {
        strengths: ['Practical Implementation', 'Debugging'],
        weaknesses: ['Theory Concepts', 'Algorithm Design'],
        recentTrend: 'stable',
        lastAssessmentScore: 76
      },
      behavior: {
        participation: 'average',
        collaboration: 'excellent',
        punctuality: 'good',
        overallConduct: 'good'
      },
      skills: [
        { name: 'JavaScript', level: 72, lastAssessed: '2024-03-15' },
        { name: 'Python', level: 68, lastAssessed: '2024-03-10' },
        { name: 'Data Structures', level: 70, lastAssessed: '2024-03-05' },
        { name: 'Web Development', level: 75, lastAssessed: '2024-03-20' }
      ],
      recentSubmissions: [
        {
          id: 'ASS004',
          title: 'JavaScript Array Methods',
          submittedDate: '2024-03-21',
          score: 72,
          status: 'graded',
          feedback: 'Basic implementation completed. Need to explore advanced methods.',
          lateSubmission: false
        },
        {
          id: 'ASS005',
          title: 'Python Data Structures',
          submittedDate: '2024-03-19',
          score: 68,
          status: 'graded',
          feedback: 'Struggled with complex data structures. Additional practice recommended.',
          lateSubmission: true
        }
      ],
      notes: [
        {
          date: '2024-03-18',
          type: 'concern',
          content: 'Needs additional help with algorithm complexity topics',
          teacher: 'Dr. Sarah Chen'
        },
        {
          date: '2024-03-10',
          type: 'positive',
          content: 'Excellent teamwork during group project',
          teacher: 'Dr. Sarah Chen'
        }
      ]
    },
    {
      id: 'S1003',
      name: 'Charlie Davis',
      email: 'charlie.davis@taskflow.academy',
      rollNumber: 'BCA103',
      avatar: 'CD',
      profileImage: '/api/placeholder/user/charlie.jpg',
      phone: '+91 98765 43213',
      parentContact: {
        name: 'Mr. Michael Davis',
        phone: '+91 98765 43214',
        email: 'michael.davis@email.com'
      },
      academic: {
        gpa: 3.5,
        percentage: 78,
        attendance: 88,
        assignments: {
          total: 15,
          submitted: 13,
          pending: 2,
          averageScore: 80
        }
      },
      performance: {
        strengths: ['Creative Problem Solving', 'UI/UX Design', 'Code Optimization'],
        weaknesses: ['Testing', 'Documentation'],
        recentTrend: 'improving',
        lastAssessmentScore: 84
      },
      behavior: {
        participation: 'good',
        collaboration: 'excellent',
        punctuality: 'excellent',
        overallConduct: 'very good'
      },
      skills: [
        { name: 'JavaScript', level: 80, lastAssessed: '2024-03-15' },
        { name: 'Python', level: 75, lastAssessed: '2024-03-10' },
        { name: 'Data Structures', level: 78, lastAssessed: '2024-03-05' },
        { name: 'Web Development', level: 85, lastAssessed: '2024-03-20' }
      ],
      recentSubmissions: [
        {
          id: 'ASS006',
          title: 'JavaScript Array Methods',
          submittedDate: '2024-03-19',
          score: 85,
          status: 'graded',
          feedback: 'Creative solutions! Good use of modern JavaScript features.',
          lateSubmission: false
        },
        {
          id: 'ASS007',
          title: 'React Components',
          submittedDate: '2024-03-22',
          score: 82,
          status: 'graded',
          feedback: 'Well-designed components. Focus on accessibility improvements.',
          lateSubmission: false
        }
      ],
      notes: [
        {
          date: '2024-03-20',
          type: 'positive',
          content: 'Outstanding creative approach to problem-solving exercise',
          teacher: 'Dr. Sarah Chen'
        }
      ]
    },
    {
      id: 'S1004',
      name: 'Diana Wilson',
      email: 'diana.wilson@taskflow.academy',
      rollNumber: 'BCA104',
      avatar: 'DW',
      profileImage: '/api/placeholder/user/diana.jpg',
      phone: '+91 98765 43214',
      parentContact: {
        name: 'Mrs. Patricia Wilson',
        phone: '+91 98765 43215',
        email: 'patricia.wilson@email.com'
      },
      academic: {
        gpa: 3.9,
        percentage: 88,
        attendance: 95,
        assignments: {
          total: 15,
          submitted: 15,
          pending: 0,
          averageScore: 91
        }
      },
      performance: {
        strengths: ['Algorithm Design', 'Code Quality', 'Testing', 'Documentation'],
        weaknesses: ['Public Speaking'],
        recentTrend: 'excellent',
        lastAssessmentScore: 94
      },
      behavior: {
        participation: 'excellent',
        collaboration: 'excellent',
        punctuality: 'excellent',
        overallConduct: 'outstanding'
      },
      skills: [
        { name: 'JavaScript', level: 92, lastAssessed: '2024-03-15' },
        { name: 'Python', level: 88, lastAssessed: '2024-03-10' },
        { name: 'Data Structures', level: 90, lastAssessed: '2024-03-05' },
        { name: 'Web Development', level: 91, lastAssessed: '2024-03-20' }
      ],
      recentSubmissions: [
        {
          id: 'ASS008',
          title: 'JavaScript Array Methods',
          submittedDate: '2024-03-18',
          score: 96,
          status: 'graded',
          feedback: 'Perfect implementation! Exceptional code quality and documentation.',
          lateSubmission: false
        },
        {
          id: 'ASS009',
          title: 'Python Data Structures',
          submittedDate: '2024-03-17',
          score: 90,
          status: 'graded',
          feedback: 'Excellent understanding of complex data structures and algorithms.',
          lateSubmission: false
        }
      ],
      notes: [
        {
          date: '2024-03-22',
          type: 'positive',
          content: 'Helped classmates understand difficult concepts - great leadership',
          teacher: 'Dr. Sarah Chen'
        },
        {
          date: '2024-03-15',
          type: 'achievement',
          content: 'Achieved highest score in mid-term examination',
          teacher: 'Dr. Sarah Chen'
        }
      ]
    },
    {
      id: 'S1005',
      name: 'Eva Martinez',
      email: 'eva.martinez@taskflow.academy',
      rollNumber: 'BCA105',
      avatar: 'EM',
      profileImage: '/api/placeholder/user/eva.jpg',
      phone: '+91 98765 43215',
      parentContact: {
        name: 'Mr. Carlos Martinez',
        phone: '+91 98765 43216',
        email: 'carlos.martinez@email.com'
      },
      academic: {
        gpa: 3.4,
        percentage: 76,
        attendance: 85,
        assignments: {
          total: 15,
          submitted: 13,
          pending: 2,
          averageScore: 78
        }
      },
      performance: {
        strengths: ['Database Design', 'Backend Development', 'Problem Analysis'],
        weaknesses: ['Frontend Design', 'Real-time Communication'],
        recentTrend: 'stable',
        lastAssessmentScore: 79
      },
      behavior: {
        participation: 'good',
        collaboration: 'good',
        punctuality: 'good',
        overallConduct: 'good'
      },
      skills: [
        { name: 'JavaScript', level: 76, lastAssessed: '2024-03-15' },
        { name: 'Python', level: 80, lastAssessed: '2024-03-10' },
        { name: 'Data Structures', level: 74, lastAssessed: '2024-03-05' },
        { name: 'Web Development', level: 72, lastAssessed: '2024-03-20' }
      ],
      recentSubmissions: [
        {
          id: 'ASS010',
          title: 'JavaScript Array Methods',
          submittedDate: '2024-03-20',
          score: 78,
          status: 'graded',
          feedback: 'Good implementation. Focus on edge cases and error handling.',
          lateSubmission: false
        },
        {
          id: 'ASS011',
          title: 'Python Data Structures',
          submittedDate: '2024-03-21',
          score: 80,
          status: 'graded',
          feedback: 'Solid understanding of database concepts and SQL queries.',
          lateSubmission: false
        }
      ],
      notes: [
        {
          date: '2024-03-18',
          type: 'improvement',
          content: 'Needs to participate more in class discussions',
          teacher: 'Dr. Sarah Chen'
        }
      ]
    }
  ],

  // Mathematics Class Students
  'SUB002': [
    {
      id: 'S1006',
      name: 'Frank Thompson',
      email: 'frank.thompson@taskflow.academy',
      rollNumber: 'BCA106',
      avatar: 'FT',
      profileImage: '/api/placeholder/user/frank.jpg',
      phone: '+91 98765 43216',
      parentContact: {
        name: 'Mr. David Thompson',
        phone: '+91 98765 43217',
        email: 'david.thompson@email.com'
      },
      academic: {
        gpa: 3.6,
        percentage: 82,
        attendance: 90,
        assignments: {
          total: 12,
          submitted: 12,
          pending: 0,
          averageScore: 85
        }
      },
      performance: {
        strengths: ['Calculus', 'Linear Algebra', 'Statistical Analysis'],
        weaknesses: ['Geometry', 'Proof Writing'],
        recentTrend: 'improving',
        lastAssessmentScore: 87
      },
      behavior: {
        participation: 'excellent',
        collaboration: 'good',
        punctuality: 'excellent',
        overallConduct: 'very good'
      },
      skills: [
        { name: 'Calculus', level: 88, lastAssessed: '2024-03-12' },
        { name: 'Linear Algebra', level: 85, lastAssessed: '2024-03-08' },
        { name: 'Statistics', level: 82, lastAssessed: '2024-03-15' },
        { name: 'Discrete Mathematics', level: 79, lastAssessed: '2024-03-10' }
      ],
      recentSubmissions: [
        {
          id: 'MATH001',
          title: 'Differential Equations',
          submittedDate: '2024-03-19',
          score: 89,
          status: 'graded',
          feedback: 'Excellent problem-solving approach. Clear step-by-step solutions.',
          lateSubmission: false
        }
      ],
      notes: [
        {
          date: '2024-03-20',
          type: 'positive',
          content: 'Outstanding performance in calculus quiz',
          teacher: 'Prof. James Miller'
        }
      ]
    },
    {
      id: 'S1007',
      name: 'Grace Lee',
      email: 'grace.lee@taskflow.academy',
      rollNumber: 'BCA107',
      avatar: 'GL',
      profileImage: '/api/placeholder/user/grace.jpg',
      phone: '+91 98765 43217',
      parentContact: {
        name: 'Mrs. Susan Lee',
        phone: '+91 98765 43218',
        email: 'susan.lee@email.com'
      },
      academic: {
        gpa: 3.7,
        percentage: 84,
        attendance: 93,
        assignments: {
          total: 12,
          submitted: 11,
          pending: 1,
          averageScore: 86
        }
      },
      performance: {
        strengths: ['Problem Solving', 'Mathematical Reasoning', 'Attention to Detail'],
        weaknesses: ['Speed in Complex Problems'],
        recentTrend: 'excellent',
        lastAssessmentScore: 90
      },
      behavior: {
        participation: 'excellent',
        collaboration: 'excellent',
        punctuality: 'excellent',
        overallConduct: 'outstanding'
      },
      skills: [
        { name: 'Calculus', level: 90, lastAssessed: '2024-03-12' },
        { name: 'Linear Algebra', level: 87, lastAssessed: '2024-03-08' },
        { name: 'Statistics', level: 85, lastAssessed: '2024-03-15' },
        { name: 'Discrete Mathematics', level: 82, lastAssessed: '2024-03-10' }
      ],
      recentSubmissions: [
        {
          id: 'MATH002',
          title: 'Integration Techniques',
          submittedDate: '2024-03-18',
          score: 92,
          status: 'graded',
          feedback: 'Perfect integration methods! Exceptional mathematical clarity.',
          lateSubmission: false
        }
      ],
      notes: [
        {
          date: '2024-03-22',
          type: 'achievement',
          content: 'Scored highest in class on advanced calculus test',
          teacher: 'Prof. James Miller'
        }
      ]
    }
  ],

  // Database Management Class Students
  'SUB003': [
    {
      id: 'S1008',
      name: 'Henry Kumar',
      email: 'henry.kumar@taskflow.academy',
      rollNumber: 'BCA108',
      avatar: 'HK',
      profileImage: '/api/placeholder/user/henry.jpg',
      phone: '+91 98765 43218',
      parentContact: {
        name: 'Mr. Raj Kumar',
        phone: '+91 98765 43219',
        email: 'raj.kumar@email.com'
      },
      academic: {
        gpa: 3.3,
        percentage: 74,
        attendance: 82,
        assignments: {
          total: 10,
          submitted: 9,
          pending: 1,
          averageScore: 76
        }
      },
      performance: {
        strengths: ['SQL Queries', 'Database Design', 'Normalization'],
        weaknesses: ['NoSQL', 'Performance Optimization'],
        recentTrend: 'improving',
        lastAssessmentScore: 78
      },
      behavior: {
        participation: 'good',
        collaboration: 'excellent',
        punctuality: 'good',
        overallConduct: 'good'
      },
      skills: [
        { name: 'SQL', level: 82, lastAssessed: '2024-03-14' },
        { name: 'Database Design', level: 78, lastAssessed: '2024-03-10' },
        { name: 'Normalization', level: 75, lastAssessed: '2024-03-12' },
        { name: 'NoSQL', level: 65, lastAssessed: '2024-03-16' }
      ],
      recentSubmissions: [
        {
          id: 'DB001',
          title: 'Database Normalization',
          submittedDate: '2024-03-20',
          score: 80,
          status: 'graded',
          feedback: 'Good understanding of normalization concepts. Practice more complex scenarios.',
          lateSubmission: false
        }
      ],
      notes: [
        {
          date: '2024-03-18',
          type: 'positive',
          content: 'Excellent database design for class project',
          teacher: 'Dr. Anita Sharma'
        }
      ]
    }
  ]
};

// Helper functions to get student data
export const getStudentsBySubject = (subjectId) => {
  return teacherStudentData[subjectId] || [];
};

export const getStudentById = (studentId) => {
  for (const subjectId in teacherStudentData) {
    const student = teacherStudentData[subjectId].find(s => s.id === studentId);
    if (student) return student;
  }
  return null;
};

export const getStudentPerformanceSummary = (subjectId) => {
  const students = teacherStudentData[subjectId] || [];
  
  if (students.length === 0) return null;
  
  const totalGPA = students.reduce((sum, s) => sum + s.academic.gpa, 0);
  const totalAttendance = students.reduce((sum, s) => sum + s.academic.attendance, 0);
  const totalAssignments = students.reduce((sum, s) => sum + s.academic.assignments.total, 0);
  const totalSubmitted = students.reduce((sum, s) => sum + s.academic.assignments.submitted, 0);
  
  return {
    totalStudents: students.length,
    averageGPA: (totalGPA / students.length).toFixed(2),
    averageAttendance: Math.round(totalAttendance / students.length),
    assignmentCompletionRate: Math.round((totalSubmitted / totalAssignments) * 100),
    performanceDistribution: {
      excellent: students.filter(s => s.academic.gpa >= 3.7).length,
      good: students.filter(s => s.academic.gpa >= 3.3 && s.academic.gpa < 3.7).length,
      average: students.filter(s => s.academic.gpa >= 2.7 && s.academic.gpa < 3.3).length,
      belowAverage: students.filter(s => s.academic.gpa < 2.7).length
    },
    topPerformers: students
      .sort((a, b) => b.academic.gpa - a.academic.gpa)
      .slice(0, 3)
      .map(s => ({
        id: s.id,
        name: s.name,
        gpa: s.academic.gpa,
        percentage: s.academic.percentage
      })),
    needsAttention: students.filter(s => s.academic.attendance < 80 || s.academic.gpa < 2.7)
  };
};

export const getRecentSubmissions = (subjectId, limit = 10) => {
  const students = teacherStudentData[subjectId] || [];
  const allSubmissions = [];
  
  students.forEach(student => {
    student.recentSubmissions.forEach(submission => {
      allSubmissions.push({
        ...submission,
        studentId: student.id,
        studentName: student.name,
        studentAvatar: student.avatar
      });
    });
  });
  
  return allSubmissions
    .sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate))
    .slice(0, limit);
};

export const getStudentNotes = (subjectId, studentId) => {
  const student = getStudentById(studentId);
  return student ? student.notes : [];
};
