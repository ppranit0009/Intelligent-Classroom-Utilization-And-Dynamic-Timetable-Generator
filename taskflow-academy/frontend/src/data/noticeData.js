// Comprehensive Notice Data for TaskFlow Academy
// This file contains realistic notices for all user roles and categories

export const noticeCategories = [
  { id: 'academic', name: 'Academic', color: 'blue', icon: 'BookOpen' },
  { id: 'events', name: 'Events', color: 'purple', icon: 'Calendar' },
  { id: 'examinations', name: 'Examinations', color: 'red', icon: 'FileText' },
  { id: 'holidays', name: 'Holidays', color: 'green', icon: 'Home' },
  { id: 'sports', name: 'Sports', color: 'orange', icon: 'Target' },
  { id: 'placements', name: 'Placements', color: 'indigo', icon: 'Briefcase' },
  { id: 'library', name: 'Library', color: 'yellow', icon: 'Book' },
  { id: 'maintenance', name: 'Maintenance', color: 'gray', icon: 'Tool' },
  { id: 'general', name: 'General', color: 'slate', icon: 'Bell' }
];

export const noticePriorities = [
  { id: 'urgent', name: 'Urgent', color: 'red', level: 1 },
  { id: 'high', name: 'High', color: 'orange', level: 2 },
  { id: 'medium', name: 'Medium', color: 'yellow', level: 3 },
  { id: 'low', name: 'Low', color: 'green', level: 4 }
];

export const noticeAudiences = [
  { id: 'all', name: 'All Users', description: 'Visible to everyone' },
  { id: 'students', name: 'Students Only', description: 'Visible to students only' },
  { id: 'teachers', name: 'Teachers Only', description: 'Visible to teachers only' },
  { id: 'classTeachers', name: 'Class Teachers Only', description: 'Visible to class teachers only' },
  { id: 'admin', name: 'Admin Only', description: 'Visible to administrators only' },
  { id: 'faculty', name: 'Faculty', description: 'Visible to teachers and class teachers' },
  { id: 'specific', name: 'Specific Classes', description: 'Visible to selected classes only' }
];

export const demoNotices = [
  // Academic Notices
  {
    id: 'N001',
    title: 'Mid-Term Examination Schedule Released',
    content: 'The mid-term examination schedule for Fall 2024 has been released. Please check your respective class timetables for detailed examination dates and times. Students are advised to start preparing well in advance and clear any dues before the examination period.',
    category: 'academic',
    priority: 'high',
    audience: 'all',
    author: 'PRANIT_ADMIN',
    authorName: 'Pranit Patil',
    authorRole: 'Administrator',
    postedDate: '2024-03-10',
    expiryDate: '2024-03-25',
    attachments: [
      { name: 'Mid-Term Schedule.pdf', size: 245760, type: 'application/pdf' },
      { name: 'Exam Guidelines.pdf', size: 153600, type: 'application/pdf' }
    ],
    tags: ['exams', 'mid-term', 'schedule', 'important'],
    viewCount: 156,
    isPinned: true,
    allowComments: true,
    comments: [
      { id: 'C001', author: 'T2001', authorName: 'Dr. Sarah Johnson', content: 'Thank you for the detailed schedule. Please ensure all students are informed.', date: '2024-03-10T10:30:00' },
      { id: 'C002', author: 'S1001', authorName: 'Alice Johnson', content: 'Is there any change in the exam pattern this semester?', date: '2024-03-10T14:15:00' }
    ]
  },
  {
    id: 'N002',
    title: 'New Course Registration Open for Spring 2025',
    content: 'Registration for elective courses for Spring 2025 semester is now open. Students can register through the student portal until March 30th. Please consult your academic advisors before making course selections. Limited seats are available for popular courses.',
    category: 'academic',
    priority: 'medium',
    audience: 'students',
    author: 'CT3001',
    authorName: 'Dr. Amanda White',
    authorRole: 'Class Teacher',
    postedDate: '2024-03-12',
    expiryDate: '2024-03-30',
    attachments: [
      { name: 'Course Catalog 2025.pdf', size: 512000, type: 'application/pdf' },
      { name: 'Registration Guide.pdf', size: 204800, type: 'application/pdf' }
    ],
    tags: ['registration', 'spring-2025', 'electives', 'courses'],
    viewCount: 89,
    isPinned: false,
    allowComments: true
  },
  {
    id: 'N003',
    title: 'Faculty Development Workshop on Modern Teaching Methods',
    content: 'A comprehensive workshop on modern teaching methodologies and educational technology will be conducted on March 20th, 2024. All faculty members are requested to attend. The workshop will cover interactive learning techniques, assessment strategies, and digital tools for effective teaching.',
    category: 'academic',
    priority: 'medium',
    audience: 'faculty',
    author: 'PRANIT_ADMIN',
    authorName: 'Pranit Patil',
    authorRole: 'Administrator',
    postedDate: '2024-03-08',
    expiryDate: '2024-03-20',
    attachments: [
      { name: 'Workshop Agenda.pdf', size: 102400, type: 'application/pdf' },
      { name: 'Registration Form.docx', size: 51200, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    ],
    tags: ['workshop', 'faculty', 'development', 'teaching'],
    viewCount: 45,
    isPinned: false,
    allowComments: true
  },

  // Event Notices
  {
    id: 'N004',
    title: 'Annual Tech Fest "Innovate 2024" - Call for Participants',
    content: 'The annual tech fest "Innovate 2024" will be held on April 15-16, 2024. Students are invited to participate in various technical competitions, project exhibitions, and coding challenges. Exciting prizes and certificates will be awarded to winners. Last date for registration is March 25th.',
    category: 'events',
    priority: 'high',
    audience: 'all',
    author: 'T2002',
    authorName: 'Prof. David Chen',
    authorRole: 'Teacher',
    postedDate: '2024-03-11',
    expiryDate: '2024-03-25',
    attachments: [
      { name: 'Tech Fest Brochure.pdf', size: 307200, type: 'application/pdf' },
      { name: 'Event Schedule.pdf', size: 153600, type: 'application/pdf' },
      { name: 'Registration Form.pdf', size: 76800, type: 'application/pdf' }
    ],
    tags: ['tech-fest', 'innovate-2024', 'competition', 'events'],
    viewCount: 234,
    isPinned: true,
    allowComments: true,
    comments: [
      { id: 'C003', author: 'S1002', authorName: 'Bob Smith', content: 'This sounds exciting! Can we form teams for the coding challenge?', date: '2024-03-11T16:45:00' },
      { id: 'C004', author: 'CT3002', authorName: 'Prof. Benjamin Lee', content: 'All students from my class are encouraged to participate. Great opportunity for skill development!', date: '2024-03-12T09:20:00' }
    ]
  },
  {
    id: 'N005',
    title: 'Cultural Festival "Spring Harmony 2024"',
    content: 'The annual cultural festival "Spring Harmony 2024" is scheduled for March 28-29, 2024. Events include music performances, dance competitions, drama, and art exhibitions. Students interested in participating should contact the cultural committee by March 20th.',
    category: 'events',
    priority: 'medium',
    audience: 'all',
    author: 'CT3001',
    authorName: 'Dr. Amanda White',
    authorRole: 'Class Teacher',
    postedDate: '2024-03-09',
    expiryDate: '2024-03-28',
    attachments: [
      { name: 'Cultural Events List.pdf', size: 128000, type: 'application/pdf' },
      { name: 'Participation Form.docx', size: 61440, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    ],
    tags: ['cultural', 'festival', 'spring-harmony', 'music', 'dance'],
    viewCount: 178,
    isPinned: false,
    allowComments: true
  },

  // Examination Notices
  {
    id: 'N006',
    title: 'Practical Examination Dates Announced',
    content: 'Practical examinations for all computer science courses will be conducted from March 25-30, 2024. Students should prepare their lab journals and complete all pending assignments before the practical exams. Lab schedules will be posted on department notice boards.',
    category: 'examinations',
    priority: 'high',
    audience: 'students',
    author: 'T2002',
    authorName: 'Prof. David Chen',
    authorRole: 'Teacher',
    postedDate: '2024-03-13',
    expiryDate: '2024-03-30',
    attachments: [
      { name: 'Practical Exam Schedule.pdf', size: 97280, type: 'application/pdf' },
      { name: 'Lab Requirements.pdf', size: 65536, type: 'application/pdf' }
    ],
    tags: ['practical-exams', 'lab', 'computer-science', 'schedule'],
    viewCount: 92,
    isPinned: true,
    allowComments: true
  },
  {
    id: 'N007',
    title: 'Assignment Submission Guidelines Updated',
    content: 'New guidelines for assignment submission have been implemented. All assignments must be submitted through the student portal in PDF format only. Late submissions will incur a penalty of 10% per day. Plagiarism checks will be strictly enforced.',
    category: 'examinations',
    priority: 'medium',
    audience: 'students',
    author: 'T2001',
    authorName: 'Dr. Sarah Johnson',
    authorRole: 'Teacher',
    postedDate: '2024-03-07',
    expiryDate: '2024-04-07',
    attachments: [
      { name: 'Submission Guidelines.pdf', size: 81920, type: 'application/pdf' },
      { name: 'Plagiarism Policy.pdf', size: 57344, type: 'application/pdf' }
    ],
    tags: ['assignments', 'guidelines', 'submission', 'plagiarism'],
    viewCount: 145,
    isPinned: false,
    allowComments: true
  },

  // Holiday Notices
  {
    id: 'N008',
    title: 'Spring Break Schedule 2024',
    content: 'The institute will observe spring break from March 29 to April 7, 2024. All classes and administrative offices will remain closed during this period. Regular classes will resume from April 8, 2024. Students are requested to complete all pending assignments before the break.',
    category: 'holidays',
    priority: 'medium',
    audience: 'all',
    author: 'PRANIT_ADMIN',
    authorName: 'Pranit Patil',
    authorRole: 'Administrator',
    postedDate: '2024-03-05',
    expiryDate: '2024-04-07',
    attachments: [
      { name: 'Holiday Calendar 2024.pdf', size: 163840, type: 'application/pdf' }
    ],
    tags: ['spring-break', 'holidays', 'march-2024', 'april-2024'],
    viewCount: 267,
    isPinned: true,
    allowComments: true
  },
  {
    id: 'N009',
    title: 'Weekend Classes for Additional Topics',
    content: 'Special weekend classes will be conducted on Saturdays in March 2024 for additional topics and doubt clearing sessions. Attendance is mandatory for students with less than 75% attendance. Schedule will be shared by respective class teachers.',
    category: 'holidays',
    priority: 'low',
    audience: 'students',
    author: 'CT3002',
    authorName: 'Prof. Benjamin Lee',
    authorRole: 'Class Teacher',
    postedDate: '2024-03-06',
    expiryDate: '2024-03-30',
    tags: ['weekend-classes', 'additional-topics', 'doubt-clearing'],
    viewCount: 78,
    isPinned: false,
    allowComments: true
  },

  // Sports Notices
  {
    id: 'N010',
    title: 'Inter-College Basketball Tournament',
    content: 'Our college will host the inter-college basketball tournament from March 22-24, 2024. Students interested in participating should register with the sports department by March 18th. Practice sessions will be conducted daily from 4:00 PM to 6:00 PM.',
    category: 'sports',
    priority: 'medium',
    audience: 'all',
    author: 'T2003',
    authorName: 'Dr. Emily Rodriguez',
    authorRole: 'Teacher',
    postedDate: '2024-03-04',
    expiryDate: '2024-03-24',
    attachments: [
      { name: 'Tournament Rules.pdf', size: 73728, type: 'application/pdf' },
      { name: 'Registration Form.pdf', size: 49152, type: 'application/pdf' }
    ],
    tags: ['basketball', 'tournament', 'sports', 'inter-college'],
    viewCount: 134,
    isPinned: false,
    allowComments: true
  },
  {
    id: 'N011',
    title: 'Annual Sports Meet 2024 - Registration Open',
    content: 'The annual sports meet will be held on April 5-6, 2024. Events include athletics, badminton, table tennis, chess, and carrom. Students can register for multiple events. Last date for registration is March 28th.',
    category: 'sports',
    priority: 'medium',
    audience: 'all',
    author: 'PRANIT_ADMIN',
    authorName: 'Pranit Patil',
    authorRole: 'Administrator',
    postedDate: '2024-03-01',
    expiryDate: '2024-03-28',
    attachments: [
      { name: 'Sports Meet Events.pdf', size: 122880, type: 'application/pdf' },
      { name: 'Registration Details.pdf', size: 81920, type: 'application/pdf' }
    ],
    tags: ['sports-meet', 'athletics', 'registration', 'annual-event'],
    viewCount: 189,
    isPinned: false,
    allowComments: true
  },

  // Placement Notices
  {
    id: 'N012',
    title: 'Campus Recruitment Drive - Tech Companies',
    content: 'Major tech companies including Google, Microsoft, and Amazon will be visiting our campus for recruitment on April 10-12, 2024. Final year students with 70% and above are eligible to apply. Resume submission deadline is March 25th.',
    category: 'placements',
    priority: 'high',
    audience: 'students',
    author: 'PRANIT_ADMIN',
    authorName: 'Pranit Patil',
    authorRole: 'Administrator',
    postedDate: '2024-03-02',
    expiryDate: '2024-03-25',
    attachments: [
      { name: 'Company List.pdf', size: 98304, type: 'application/pdf' },
      { name: 'Eligibility Criteria.pdf', size: 65536, type: 'application/pdf' },
      { name: 'Resume Template.docx', size: 45056, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    ],
    tags: ['placements', 'recruitment', 'tech-companies', 'campus-drive'],
    viewCount: 412,
    isPinned: true,
    allowComments: true,
    comments: [
      { id: 'C005', author: 'S1003', authorName: 'Carol Davis', content: 'What is the dress code for the interviews?', date: '2024-03-02T11:30:00' },
      { id: 'C006', author: 'S1004', authorName: 'David Wilson', content: 'Are pre-final year students eligible for internships?', date: '2024-03-02T15:45:00' }
    ]
  },
  {
    id: 'N013',
    title: 'Workshop on Resume Building and Interview Skills',
    content: 'A specialized workshop on resume building and interview skills will be conducted on March 18, 2024. Industry experts will provide insights on current recruitment trends and interview techniques. Open to all students, especially final year students.',
    category: 'placements',
    priority: 'medium',
    audience: 'students',
    author: 'CT3001',
    authorName: 'Dr. Amanda White',
    authorRole: 'Class Teacher',
    postedDate: '2024-03-03',
    expiryDate: '2024-03-18',
    attachments: [
      { name: 'Workshop Schedule.pdf', size: 73728, type: 'application/pdf' },
      { name: 'Preparation Tips.pdf', size: 57344, type: 'application/pdf' }
    ],
    tags: ['workshop', 'resume', 'interview-skills', 'placement'],
    viewCount: 156,
    isPinned: false,
    allowComments: true
  },

  // Library Notices
  {
    id: 'N014',
    title: 'Library Hours Extended During Exam Period',
    content: 'Library hours will be extended during the examination period from March 20-30, 2024. The library will remain open from 8:00 AM to 10:00 PM on all days including weekends. Additional study materials and reference books will be available.',
    category: 'library',
    priority: 'medium',
    audience: 'all',
    author: 'PRANIT_ADMIN',
    authorName: 'Pranit Patil',
    authorRole: 'Administrator',
    postedDate: '2024-03-14',
    expiryDate: '2024-03-30',
    attachments: [
      { name: 'Extended Hours Schedule.pdf', size: 40960, type: 'application/pdf' },
      { name: 'Available Resources.pdf', size: 65536, type: 'application/pdf' }
    ],
    tags: ['library', 'extended-hours', 'exams', 'study-materials'],
    viewCount: 98,
    isPinned: false,
    allowComments: true
  },
  {
    id: 'N015',
    title: 'New Books Added to Computer Science Section',
    content: 'New books on machine learning, artificial intelligence, and cloud computing have been added to the library. Students and faculty can access these books from March 15, 2024. A list of new arrivals is available at the library circulation desk.',
    category: 'library',
    priority: 'low',
    audience: 'faculty',
    author: 'PRANIT_ADMIN',
    authorName: 'Pranit Patil',
    authorRole: 'Administrator',
    postedDate: '2024-03-13',
    expiryDate: '2024-04-13',
    attachments: [
      { name: 'New Arrivals List.pdf', size: 53248, type: 'application/pdf' }
    ],
    tags: ['new-books', 'computer-science', 'library', 'resources'],
    viewCount: 34,
    isPinned: false,
    allowComments: true
  },

  // Maintenance Notices
  {
    id: 'N016',
    title: 'Server Maintenance - System Downtime',
    content: 'Essential server maintenance will be performed on March 23, 2024, from 2:00 AM to 6:00 AM. During this period, the student portal, online services, and internet connectivity will be temporarily unavailable. Please plan your activities accordingly.',
    category: 'maintenance',
    priority: 'high',
    audience: 'all',
    author: 'PRANIT_ADMIN',
    authorName: 'Pranit Patil',
    authorRole: 'Administrator',
    postedDate: '2024-03-15',
    expiryDate: '2024-03-23',
    tags: ['maintenance', 'server', 'downtime', 'system'],
    viewCount: 289,
    isPinned: true,
    allowComments: true
  },
  {
    id: 'N017',
    title: 'Lab Equipment Maintenance Schedule',
    content: 'Routine maintenance of computer lab equipment will be conducted on March 20, 2024. Lab 201 and Lab 202 will be closed for the day. Students with practical sessions scheduled on this day will be informed of alternative arrangements.',
    category: 'maintenance',
    priority: 'medium',
    audience: 'students',
    author: 'T2002',
    authorName: 'Prof. David Chen',
    authorRole: 'Teacher',
    postedDate: '2024-03-12',
    expiryDate: '2024-03-20',
    tags: ['maintenance', 'lab', 'equipment', 'computer-lab'],
    viewCount: 67,
    isPinned: false,
    allowComments: true
  },

  // General Notices
  {
    id: 'N018',
    title: 'Welcome to New Students - Orientation Program',
    content: 'A comprehensive orientation program for new students will be conducted on March 25, 2024. The program includes campus tour, introduction to facilities, academic guidelines, and interaction with faculty. All new students are required to attend.',
    category: 'general',
    priority: 'medium',
    audience: 'students',
    author: 'CT3001',
    authorName: 'Dr. Amanda White',
    authorRole: 'Class Teacher',
    postedDate: '2024-03-10',
    expiryDate: '2024-03-25',
    attachments: [
      { name: 'Orientation Schedule.pdf', size: 86016, type: 'application/pdf' },
      { name: 'Campus Map.pdf', size: 204800, type: 'application/pdf' }
    ],
    tags: ['orientation', 'new-students', 'welcome', 'campus-tour'],
    viewCount: 123,
    isPinned: false,
    allowComments: true
  },
  {
    id: 'N019',
    title: 'Fee Payment Reminder - Last Date March 31',
    content: 'This is a reminder that the last date for fee payment for the current semester is March 31, 2024. Late payment will attract a penalty of 5% per week. Students are requested to clear their dues to avoid inconvenience.',
    category: 'general',
    priority: 'high',
    audience: 'students',
    author: 'PRANIT_ADMIN',
    authorName: 'Pranit Patil',
    authorRole: 'Administrator',
    postedDate: '2024-03-14',
    expiryDate: '2024-03-31',
    attachments: [
      { name: 'Fee Structure.pdf', size: 73728, type: 'application/pdf' },
      { name: 'Payment Methods.pdf', size: 49152, type: 'application/pdf' }
    ],
    tags: ['fee-payment', 'deadline', 'reminder', 'penalty'],
    viewCount: 198,
    isPinned: true,
    allowComments: true
  },
  {
    id: 'N020',
    title: 'COVID-19 Safety Guidelines Update',
    content: 'Updated COVID-19 safety guidelines have been issued. All students and staff are requested to follow the protocols including wearing masks in common areas, maintaining social distance, and regular hand sanitization. Vaccination certificates must be updated.',
    category: 'general',
    priority: 'medium',
    audience: 'all',
    author: 'PRANIT_ADMIN',
    authorName: 'Pranit Patil',
    authorRole: 'Administrator',
    postedDate: '2024-03-08',
    expiryDate: '2024-04-08',
    attachments: [
      { name: 'Safety Guidelines.pdf', size: 65536, type: 'application/pdf' },
      { name: 'Health Protocol.pdf', size: 40960, type: 'application/pdf' }
    ],
    tags: ['covid-19', 'safety', 'health', 'guidelines'],
    viewCount: 145,
    isPinned: false,
    allowComments: true
  }
];

// Helper functions for notice management
export const getNoticesByAudience = (userRole, userClass = null) => {
  const audienceMap = {
    'admin': ['admin', 'all'],
    'student': ['students', 'all'],
    'teacher': ['teachers', 'faculty', 'all'],
    'classTeacher': ['classTeachers', 'faculty', 'all']
  };

  const allowedAudiences = audienceMap[userRole] || ['all'];
  
  return demoNotices.filter(notice => 
    allowedAudiences.includes(notice.audience) || notice.audience === 'all'
  );
};

export const getNoticesByCategory = (category) => {
  return demoNotices.filter(notice => notice.category === category);
};

export const getNoticesByPriority = (priority) => {
  return demoNotices.filter(notice => notice.priority === priority);
};

export const getPinnedNotices = () => {
  return demoNotices.filter(notice => notice.isPinned).sort((a, b) => {
    const priorityOrder = { urgent: 1, high: 2, medium: 3, low: 4 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

export const getRecentNotices = (limit = 10) => {
  return demoNotices
    .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
    .slice(0, limit);
};

export const getExpiringSoonNotices = (days = 7) => {
  const today = new Date();
  const expiryDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
  
  return demoNotices.filter(notice => {
    const noticeExpiryDate = new Date(notice.expiryDate);
    return noticeExpiryDate <= expiryDate && noticeExpiryDate >= today;
  });
};

export const searchNotices = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return demoNotices.filter(notice => 
    notice.title.toLowerCase().includes(lowercaseQuery) ||
    notice.content.toLowerCase().includes(lowercaseQuery) ||
    notice.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getNoticeStats = () => {
  const stats = {
    total: demoNotices.length,
    byCategory: {},
    byPriority: {},
    byAudience: {},
    pinned: demoNotices.filter(n => n.isPinned).length,
    expiringSoon: getExpiringSoonNotices(7).length,
    recent: getRecentNotices(7).length
  };

  // Count by category
  noticeCategories.forEach(cat => {
    stats.byCategory[cat.id] = demoNotices.filter(n => n.category === cat.id).length;
  });

  // Count by priority
  noticePriorities.forEach(pri => {
    stats.byPriority[pri.id] = demoNotices.filter(n => n.priority === pri.id).length;
  });

  // Count by audience
  noticeAudiences.forEach(aud => {
    stats.byAudience[aud.id] = demoNotices.filter(n => n.audience === aud.id).length;
  });

  return stats;
};

export default {
  noticeCategories,
  noticePriorities,
  noticeAudiences,
  demoNotices,
  getNoticesByAudience,
  getNoticesByCategory,
  getNoticesByPriority,
  getPinnedNotices,
  getRecentNotices,
  getExpiringSoonNotices,
  searchNotices,
  getNoticeStats
};
