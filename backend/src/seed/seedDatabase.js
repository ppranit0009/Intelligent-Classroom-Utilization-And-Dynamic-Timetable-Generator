// Database Seeding Script for TaskFlow Academy
// This script populates the database with comprehensive fake data

const mongoose = require('mongoose');
const { generateAllFakeData } = require('./fakeData');

// Import models
const User = require('../models/User');
const Subject = require('../models/Subject');
const Class = require('../models/Class');
const Room = require('../models/Room');
const Assignment = require('../models/Assignment');
const Schedule = require('../models/Schedule');

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow-academy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Clear existing data
const clearDatabase = async () => {
  console.log('Clearing existing data...');
  await User.deleteMany({});
  await Subject.deleteMany({});
  await Class.deleteMany({});
  await Room.deleteMany({});
  await Assignment.deleteMany({});
  await Schedule.deleteMany({});
  console.log('Database cleared successfully');
};

// Seed users (students, teachers, class teachers)
const seedUsers = async (students, teachers, classTeachers) => {
  console.log('Seeding users...');
  
  // Seed students
  const studentDocs = students.map(student => ({
    ...student,
    role: 'student',
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  
  await User.insertMany(studentDocs);
  console.log(`✅ Created ${studentDocs.length} students`);
  
  // Seed teachers
  const teacherDocs = teachers.map(teacher => ({
    ...teacher,
    role: 'teacher',
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  
  await User.insertMany(teacherDocs);
  console.log(`✅ Created ${teacherDocs.length} teachers`);
  
  // Seed class teachers
  const classTeacherDocs = classTeachers.map(ct => ({
    ...ct,
    role: 'classTeacher',
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  
  await User.insertMany(classTeacherDocs);
  console.log(`✅ Created ${classTeacherDocs.length} class teachers`);
  
  return [...studentDocs, ...teacherDocs, ...classTeacherDocs];
};

// Seed subjects
const seedSubjects = async (subjects) => {
  console.log('Seeding subjects...');
  
  const subjectDocs = subjects.map(subject => ({
    ...subject,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  
  await Subject.insertMany(subjectDocs);
  console.log(`✅ Created ${subjectDocs.length} subjects`);
  
  return subjectDocs;
};

// Seed rooms
const seedRooms = async (rooms) => {
  console.log('Seeding rooms...');
  
  const roomDocs = rooms.map(room => ({
    ...room,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  
  await Room.insertMany(roomDocs);
  console.log(`✅ Created ${roomDocs.length} rooms`);
  
  return roomDocs;
};

// Seed classes
const seedClasses = async (classes, users, subjects) => {
  console.log('Seeding classes...');
  
  const classDocs = classes.map(cls => {
    // Find class teacher
    const classTeacher = users.find(u => u.role === 'classTeacher' && u.classId === cls.id);
    
    // Find enrolled students
    const enrolledStudents = users
      .filter(u => u.role === 'student' && u.classId === cls.id)
      .map(s => s._id);
    
    // Map subject IDs
    const subjectIds = cls.subjects.map(subjId => {
      const subject = subjects.find(s => s.id === subjId);
      return subject ? subject._id : null;
    }).filter(Boolean);
    
    return {
      ...cls,
      teacher: classTeacher ? classTeacher._id : null,
      enrolledStudents,
      subjects: subjectIds,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });
  
  await Class.insertMany(classDocs);
  console.log(`✅ Created ${classDocs.length} classes`);
  
  return classDocs;
};

// Seed assignments
const seedAssignments = async (assignments, users, subjects, classes) => {
  console.log('Seeding assignments...');
  
  const assignmentDocs = assignments.map(assignment => {
    // Find teacher
    const teacher = users.find(u => u.id === assignment.teacher);
    
    // Find subject
    const subject = subjects.find(s => s.id === assignment.subject);
    
    // Find class
    const cls = classes.find(c => c.id === assignment.class);
    
    // Generate submissions
    const submissions = assignment.submissions.map(sub => {
      const student = users.find(u => u.id === sub.studentId);
      return {
        student: student ? student._id : null,
        submittedAt: new Date(sub.submittedAt),
        status: sub.status,
        score: sub.score,
        feedback: sub.feedback,
        attachments: []
      };
    });
    
    return {
      ...assignment,
      teacher: teacher ? teacher._id : null,
      subject: subject ? subject._id : null,
      class: cls ? cls._id : null,
      submissions,
      createdAt: new Date(assignment.assignedDate),
      updatedAt: new Date()
    };
  });
  
  await Assignment.insertMany(assignmentDocs);
  console.log(`✅ Created ${assignmentDocs.length} assignments`);
  
  return assignmentDocs;
};

// Seed schedules
const seedSchedules = async (schedules, users, subjects, classes, rooms) => {
  console.log('Seeding schedules...');
  
  const scheduleDocs = schedules.map(schedule => {
    // Find teacher
    const teacher = users.find(u => u.id === schedule.teacher);
    
    // Find subject
    const subject = subjects.find(s => s.id === schedule.subject);
    
    // Find class
    const cls = classes.find(c => c.id === schedule.class);
    
    // Find room
    const room = rooms.find(r => r.id === schedule.room);
    
    return {
      ...schedule,
      teacher: teacher ? teacher._id : null,
      subject: subject ? subject._id : null,
      class: cls ? cls._id : null,
      room: room ? room._id : null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });
  
  await Schedule.insertMany(scheduleDocs);
  console.log(`✅ Created ${scheduleDocs.length} schedules`);
  
  return scheduleDocs;
};

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await clearDatabase();
    
    // Generate fake data
    console.log('Generating fake data...');
    const fakeData = generateAllFakeData();
    
    // Seed data in correct order
    const users = await seedUsers(fakeData.students, fakeData.teachers, fakeData.classTeachers);
    const subjects = await seedSubjects(fakeData.subjects);
    const rooms = await seedRooms(fakeData.rooms);
    const classes = await seedClasses(fakeData.classes, users, subjects);
    const assignments = await seedAssignments(fakeData.assignments, users, subjects, classes);
    const schedules = await seedSchedules(fakeData.schedules, users, subjects, classes, rooms);
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Students: ${fakeData.students.length}`);
    console.log(`   Teachers: ${fakeData.teachers.length}`);
    console.log(`   Class Teachers: ${fakeData.classTeachers.length}`);
    console.log(`   Subjects: ${fakeData.subjects.length}`);
    console.log(`   Classes: ${fakeData.classes.length}`);
    console.log(`   Rooms: ${fakeData.rooms.length}`);
    console.log(`   Assignments: ${fakeData.assignments.length}`);
    console.log(`   Schedules: ${fakeData.schedules.length}`);
    console.log(`   Attendance Records: ${fakeData.attendanceRecords.length}`);
    
    console.log('\n🔑 Demo Credentials:');
    console.log('   Admin: PRANIT_ADMIN / pranit123');
    console.log('   Student: S1001 / 123');
    console.log('   Teacher: T2001 / 123');
    console.log('   Class Teacher: CT3001 / 123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

// Export for use in other files
module.exports = {
  seedDatabase,
  connectDB,
  clearDatabase,
  seedUsers,
  seedSubjects,
  seedRooms,
  seedClasses,
  seedAssignments,
  seedSchedules
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}
