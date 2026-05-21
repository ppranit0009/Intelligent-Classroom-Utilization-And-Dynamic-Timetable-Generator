// Mock Reports Store - Placeholder for backend integration
export const mockReports = [
  {
    id: 1,
    studentId: 'STU001',
    title: 'Monthly Progress Report',
    content: 'Student is performing well...',
    date: '2024-01-15',
    status: 'completed'
  }
];

export const mockStudentProgress = {
  'STU001': {
    name: 'John Doe',
    progress: 85,
    attendance: 92,
    assignments: 88
  }
};

export const messageTemplates = {
  positive: [
    "Great job on your recent work!",
    "Keep up the excellent progress!",
    "Your dedication is showing wonderful results."
  ],
  constructive: [
    "Let's work together to improve in these areas.",
    "I have some suggestions for your next steps.",
    "Here's how we can enhance your learning experience."
  ],
  urgent: [
    "Please review this important feedback.",
    "Immediate attention required for this matter.",
    "Time-sensitive information regarding your progress."
  ]
};
