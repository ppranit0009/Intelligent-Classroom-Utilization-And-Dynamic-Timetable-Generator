// Comprehensive Class Data for Teacher Profiles
// This file contains detailed class information for teacher dashboard and class teacher views

export const demoClasses = [
  {
    id: 'C101',
    name: 'F.Y.BCA - Section A',
    subject: 'Computer Programming',
    teacherId: 'T2001',
    teacherName: 'Dr. Sarah Chen',
    room: 'Lab-301',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '10:00 AM - 11:30 AM',
      duration: '90 minutes'
    },
    students: [
      'S1001', 'S1002', 'S1003', 'S1004', 'S1005'
    ],
    academic: {
      totalStudents: 5,
      averageGPA: 3.56,
      averageAttendance: 87.6,
      assignmentCompletionRate: 86.7,
      performanceDistribution: {
        excellent: 1,  // Diana (3.9+ GPA)
        good: 2,        // Alice, Charlie (3.3-3.9 GPA)
        average: 2,       // Bob, Eva (2.7-3.3 GPA)
        belowAverage: 0   // None below 2.7 GPA
      }
    },
    curriculum: {
      currentModule: 'Advanced JavaScript & React',
      progress: 65,
      modules: [
        {
          id: 'MOD001',
          name: 'JavaScript Fundamentals',
          status: 'completed',
          completionDate: '2024-02-15',
          averageScore: 82
        },
        {
          id: 'MOD002',
          name: 'Advanced JavaScript Concepts',
          status: 'completed',
          completionDate: '2024-03-01',
          averageScore: 78
        },
        {
          id: 'MOD003',
          name: 'React.js Introduction',
          status: 'in-progress',
          progress: 65,
          estimatedCompletion: '2024-04-15',
          currentScore: 75
        },
        {
          id: 'MOD004',
          name: 'State Management & Redux',
          status: 'upcoming',
          startDate: '2024-04-20',
          estimatedCompletion: '2024-05-10'
        }
      ]
    },
    performance: {
      monthlyTrends: [
        {
          month: 'January',
          averageScore: 78,
          attendance: 85,
          assignmentCompletion: 80
        },
        {
          month: 'February',
          averageScore: 82,
          attendance: 89,
          assignmentCompletion: 88
        },
        {
          month: 'March',
          averageScore: 80.4,
          attendance: 87.6,
          assignmentCompletion: 86.7
        }
      ],
      topPerformers: [
        {
          studentId: 'S1004',
          name: 'Diana Wilson',
          gpa: 3.9,
          percentage: 88,
          trend: 'improving'
        },
        {
          studentId: 'S1001',
          name: 'Alice Johnson',
          gpa: 3.8,
          percentage: 85,
          trend: 'stable'
        },
        {
          studentId: 'S1003',
          name: 'Charlie Davis',
          gpa: 3.5,
          percentage: 78,
          trend: 'improving'
        }
      ],
      needsAttention: [
        {
          studentId: 'S1002',
          name: 'Bob Smith',
          gpa: 3.2,
          percentage: 72,
          attendance: 78,
          concerns: ['Low attendance', 'Late submissions', 'Concept understanding gaps']
        }
      ],
      upcomingAssessments: [
        {
          id: 'ASSESS001',
          title: 'React Components Project',
          type: 'Practical',
          date: '2024-04-05',
          weight: 25,
          topics: ['Component Lifecycle', 'State Management', 'Props & Events']
        },
        {
          id: 'ASSESS002',
          title: 'JavaScript Advanced Concepts',
          type: 'Theory',
          date: '2024-04-10',
          weight: 15,
          topics: ['Closures', 'Promises', 'Async/Await']
        }
      ]
    },
    resources: {
      materials: [
        {
          id: 'RES001',
          name: 'JavaScript Complete Guide',
          type: 'PDF',
          size: '2.4 MB',
          uploadDate: '2024-02-01',
          downloads: 45
        },
        {
          id: 'RES002',
          name: 'React Tutorial Videos',
          type: 'Video',
          size: '156 MB',
          uploadDate: '2024-03-01',
          views: 128
        }
      ],
      assignments: [
        {
          id: 'ASS001',
          title: 'JavaScript Array Methods',
          dueDate: '2024-03-20',
          submitted: 5,
          pending: 0,
          averageScore: 82.4
        },
        {
          id: 'ASS002',
          title: 'React Component Design',
          dueDate: '2024-04-05',
          submitted: 2,
          pending: 3,
          averageScore: null
        }
      ]
    },
    communication: {
      announcements: [
        {
          id: 'ANN001',
          title: 'Mid-term Exam Schedule',
          date: '2024-03-25',
          type: 'important',
          message: 'Mid-term examinations will be held from April 15-20. Please prepare accordingly.'
        },
        {
          id: 'ANN002',
          title: 'Project Submission Guidelines',
          date: '2024-03-28',
          type: 'information',
          message: 'Final project submissions must include documentation and testing reports.'
        }
      ],
      parentMeetings: [
        {
          id: 'MEET001',
          date: '2024-03-20',
          type: 'parent-teacher',
          attendees: ['Dr. Sarah Chen', 'Mr. Robert Johnson', 'Mrs. Jennifer Smith'],
          summary: 'Discussed student progress and addressed concerns about assignment deadlines.'
        }
      ]
    }
  },
  {
    id: 'C102',
    name: 'S.Y.BCA - Section B',
    subject: 'Mathematics',
    teacherId: 'T2002',
    teacherName: 'Prof. James Miller',
    room: 'Room-205',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '2:00 PM - 3:30 PM',
      duration: '90 minutes'
    },
    students: [
      'S1006', 'S1007'
    ],
    academic: {
      totalStudents: 2,
      averageGPA: 3.65,
      averageAttendance: 91.5,
      assignmentCompletionRate: 100,
      performanceDistribution: {
        excellent: 1,  // Grace (3.7+ GPA)
        good: 1,        // Frank (3.3-3.9 GPA)
        average: 0,       // None in this range
        belowAverage: 0   // None below 2.7 GPA
      }
    },
    curriculum: {
      currentModule: 'Advanced Calculus',
      progress: 70,
      modules: [
        {
          id: 'MATH001',
          name: 'Differential Equations',
          status: 'completed',
          completionDate: '2024-02-20',
          averageScore: 85.5
        },
        {
          id: 'MATH002',
          name: 'Integration Techniques',
          status: 'completed',
          completionDate: '2024-03-10',
          averageScore: 90.5
        },
        {
          id: 'MATH003',
          name: 'Multivariable Calculus',
          status: 'in-progress',
          progress: 70,
          estimatedCompletion: '2024-04-20',
          currentScore: 78
        }
      ]
    },
    performance: {
      monthlyTrends: [
        {
          month: 'January',
          averageScore: 83,
          attendance: 90,
          assignmentCompletion: 100
        },
        {
          month: 'February',
          averageScore: 88,
          attendance: 92,
          assignmentCompletion: 100
        },
        {
          month: 'March',
          averageScore: 87.8,
          attendance: 91.5,
          assignmentCompletion: 100
        }
      ],
      topPerformers: [
        {
          studentId: 'S1007',
          name: 'Grace Lee',
          gpa: 3.7,
          percentage: 84,
          trend: 'excellent'
        },
        {
          studentId: 'S1006',
          name: 'Frank Thompson',
          gpa: 3.6,
          percentage: 82,
          trend: 'stable'
        }
      ],
      needsAttention: [],
      upcomingAssessments: [
        {
          id: 'MATH003',
          title: 'Calculus Final Exam',
          type: 'Theory',
          date: '2024-04-15',
          weight: 40,
          topics: ['Multivariable Functions', 'Partial Derivatives', 'Multiple Integrals']
        }
      ]
    },
    resources: {
      materials: [
        {
          id: 'MATH_RES001',
          name: 'Calculus Textbook PDF',
          type: 'PDF',
          size: '8.7 MB',
          uploadDate: '2024-01-15',
          downloads: 28
        },
        {
          id: 'MATH_RES002',
          name: 'Problem Solutions Video',
          type: 'Video',
          size: '234 MB',
          uploadDate: '2024-03-05',
          views: 67
        }
      ],
      assignments: [
        {
          id: 'MATH001',
          title: 'Differential Equations Set',
          dueDate: '2024-03-15',
          submitted: 2,
          pending: 0,
          averageScore: 87.8
        },
        {
          id: 'MATH002',
          title: 'Integration Practice Problems',
          dueDate: '2024-04-10',
          submitted: 1,
          pending: 1,
          averageScore: 90.5
        }
      ]
    },
    communication: {
      announcements: [
        {
          id: 'MATH_ANN001',
          title: 'Extra Tutorial Session',
          date: '2024-03-22',
          type: 'information',
          message: 'Additional tutorial session scheduled for April 5th at 3 PM for exam preparation.'
        }
      ],
      parentMeetings: [
        {
          id: 'MATH_MEET001',
          date: '2024-03-18',
          type: 'parent-teacher',
          attendees: ['Prof. James Miller', 'Mrs. Susan Lee'],
          summary: 'Discussed Grace\'s excellent performance and advanced placement opportunities.'
        }
      ]
    }
  },
  {
    id: 'C103',
    name: 'T.Y.BCA - Section A',
    subject: 'Database Management',
    teacherId: 'T2003',
    teacherName: 'Dr. Anita Sharma',
    room: 'Lab-402',
    schedule: {
      days: ['Monday', 'Thursday'],
      time: '11:00 AM - 12:30 PM',
      duration: '90 minutes'
    },
    students: [
      'S1008'
    ],
    academic: {
      totalStudents: 1,
      averageGPA: 3.3,
      averageAttendance: 82,
      assignmentCompletionRate: 90,
      performanceDistribution: {
        excellent: 0,  // None above 3.7 GPA
        good: 1,        // Henry (3.3-3.9 GPA)
        average: 0,       // None in this range
        belowAverage: 0   // None below 2.7 GPA
      }
    },
    curriculum: {
      currentModule: 'Advanced Database Systems',
      progress: 55,
      modules: [
        {
          id: 'DB001',
          name: 'SQL Fundamentals',
          status: 'completed',
          completionDate: '2024-02-10',
          averageScore: 79
        },
        {
          id: 'DB002',
          name: 'Database Design & Normalization',
          status: 'completed',
          completionDate: '2024-03-05',
          averageScore: 76.5
        },
        {
          id: 'DB003',
          name: 'NoSQL Databases',
          status: 'in-progress',
          progress: 55,
          estimatedCompletion: '2024-04-25',
          currentScore: 65
        }
      ]
    },
    performance: {
      monthlyTrends: [
        {
          month: 'January',
          averageScore: 77,
          attendance: 80,
          assignmentCompletion: 85
        },
        {
          month: 'February',
          averageScore: 79,
          attendance: 83,
          assignmentCompletion: 95
        },
        {
          month: 'March',
          averageScore: 78.3,
          attendance: 82,
          assignmentCompletion: 90
        }
      ],
      topPerformers: [
        {
          studentId: 'S1008',
          name: 'Henry Kumar',
          gpa: 3.3,
          percentage: 74,
          trend: 'improving'
        }
      ],
      needsAttention: [
        {
          studentId: 'S1008',
          name: 'Henry Kumar',
          gpa: 3.3,
          percentage: 74,
          attendance: 82,
          concerns: ['Struggling with NoSQL concepts', 'Needs additional practice']
        }
      ],
      upcomingAssessments: [
        {
          id: 'DB003',
          title: 'Database Systems Final Project',
          type: 'Practical',
          date: '2024-04-20',
          weight: 35,
          topics: ['Database Design', 'SQL Optimization', 'NoSQL Integration']
        }
      ]
    },
    resources: {
      materials: [
        {
          id: 'DB_RES001',
          name: 'Database Design Guide',
          type: 'PDF',
          size: '3.2 MB',
          uploadDate: '2024-02-01',
          downloads: 18
        },
        {
          id: 'DB_RES002',
          name: 'SQL Practice Exercises',
          type: 'Interactive',
          size: '1.8 MB',
          uploadDate: '2024-03-01',
          views: 45
        }
      ],
      assignments: [
        {
          id: 'DB001',
          title: 'Database Normalization Project',
          dueDate: '2024-03-20',
          submitted: 1,
          pending: 0,
          averageScore: 80
        },
        {
          id: 'DB002',
          title: 'NoSQL Implementation',
          dueDate: '2024-04-15',
          submitted: 0,
          pending: 1,
          averageScore: null
        }
      ]
    },
    communication: {
      announcements: [
        {
          id: 'DB_ANN001',
          title: 'Guest Lecture Schedule',
          date: '2024-03-25',
          type: 'information',
          message: 'Industry expert will conduct guest lecture on MongoDB on April 10th.'
        }
      ],
      parentMeetings: [
        {
          id: 'DB_MEET001',
          date: '2024-03-15',
          type: 'parent-teacher',
          attendees: ['Dr. Anita Sharma', 'Mr. Raj Kumar'],
          summary: 'Discussed Henry\'s progress and arranged for additional tutoring sessions.'
        }
      ]
    }
  }
];

// Helper functions for class data management
export const getClassById = (classId) => {
  return demoClasses.find(cls => cls.id === classId) || null;
};

export const getClassesByTeacher = (teacherId) => {
  return demoClasses.filter(cls => cls.teacherId === teacherId);
};

export const getClassPerformanceMetrics = (classId) => {
  const classData = getClassById(classId);
  if (!classData) return null;
  
  const {
    academic,
    performance,
    curriculum
  } = classData;
  
  return {
    overview: {
      totalStudents: academic.totalStudents,
      averageGPA: academic.averageGPA,
      averageAttendance: academic.averageAttendance,
      completionRate: academic.assignmentCompletionRate
    },
    distribution: academic.performanceDistribution,
    curriculumProgress: {
      currentModule: curriculum.currentModule,
      overallProgress: curriculum.progress,
      modulesCompleted: curriculum.modules.filter(m => m.status === 'completed').length,
      totalModules: curriculum.modules.length
    },
    trends: performance.monthlyTrends,
    alerts: {
      needsAttention: performance.needsAttention.length,
      upcomingAssessments: performance.upcomingAssessments.length,
      lowAttendance: academic.averageAttendance < 85,
      lowPerformance: academic.averageGPA < 3.0
    }
  };
};

export const getUpcomingAssessments = (classId, daysAhead = 7) => {
  const classData = getClassById(classId);
  if (!classData) return [];
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() + daysAhead);
  
  return classData.performance.upcomingAssessments.filter(assessment => 
    new Date(assessment.date) <= cutoffDate
  );
};

export const getClassResources = (classId) => {
  const classData = getClassById(classId);
  return classData ? classData.resources : null;
};

export const getClassCommunications = (classId) => {
  const classData = getClassById(classId);
  return classData ? classData.communication : null;
};

export const getStudentListByClass = (classId) => {
  const classData = getClassById(classId);
  return classData ? classData.students : [];
};

// Class analytics for dashboard
export const getClassAnalytics = (classId) => {
  const classData = getClassById(classId);
  if (!classData) return null;
  
  const { academic, performance, resources, communication } = classData;
  
  return {
    engagement: {
      totalDownloads: resources.materials.reduce((sum, m) => sum + m.downloads, 0),
      totalViews: resources.materials.reduce((sum, m) => sum + (m.views || 0), 0),
      assignmentSubmissionRate: academic.assignmentCompletionRate
    },
    performance: {
      classAverage: academic.averageGPA,
      topPerformerGPA: performance.topPerformers[0]?.gpa || 0,
      improvementNeeded: performance.needsAttention.length,
      trendDirection: performance.monthlyTrends.length >= 2 ? 
        (performance.monthlyTrends[performance.monthlyTrends.length - 1].averageScore > 
         performance.monthlyTrends[performance.monthlyTrends.length - 2].averageScore ? 'up' : 'down') : 'stable'
    },
    activity: {
      recentAnnouncements: communication.announcements.filter(a => 
        new Date(a.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length,
      parentMeetingsThisMonth: communication.parentMeetings.filter(m => 
        new Date(m.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ).length,
      upcomingAssessments: performance.upcomingAssessments.length
    }
  };
};
