const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const Teacher = require('../../models/Teacher');
const Leave = require('../../models/Leave');
const Notification = require('../../models/Notification');
const Timetable = require('../../models/Timetable');

describe('Leave Management System', () => {
    let testTeacher, testAdmin, authToken, adminToken;
    let testTimetableEntries = [];

    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/taskflow-test');
    });

    beforeEach(async () => {
        // Clean up database
        await Leave.deleteMany({});
        await Notification.deleteMany({});
        await Timetable.deleteMany({});
        await Teacher.deleteMany({});

        // Create test teacher
        testTeacher = await Teacher.create({
            name: 'John Doe',
            email: 'john@test.com',
            subjects: ['Mathematics', 'Physics'],
            isAvailable: true,
            rating: 4.5,
            currentWorkload: 5
        });

        // Create test admin
        const adminResponse = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Admin User',
                email: 'admin@test.com',
                password: 'password123',
                role: 'admin'
            });

        adminToken = adminResponse.body.token;

        // Get teacher auth token
        const teacherResponse = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'john@test.com',
                password: 'password123'
            });

        authToken = teacherResponse.body.token;

        // Create test timetable entries
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        testTimetableEntries = await Timetable.create([
            {
                teacher: testTeacher._id,
                subject: 'Mathematics',
                class: '10A',
                room: '101',
                day: 'Monday',
                time: '9:00-10:00',
                startTime: '09:00',
                endTime: '10:00',
                date: tomorrow,
                semester: 'Fall',
                academicYear: '2024'
            },
            {
                teacher: testTeacher._id,
                subject: 'Physics',
                class: '10A',
                room: '102',
                day: 'Monday',
                time: '10:00-11:00',
                startTime: '10:00',
                endTime: '11:00',
                date: tomorrow,
                semester: 'Fall',
                academicYear: '2024'
            }
        ]);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /api/leave/request', () => {
        it('should submit a new leave request', async () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dayAfter = new Date(tomorrow);
            dayAfter.setDate(dayAfter.getDate() + 1);

            const leaveData = {
                teacherId: testTeacher._id,
                teacherName: 'John Doe',
                leaveType: 'sick',
                startDate: tomorrow.toISOString().split('T')[0],
                endDate: dayAfter.toISOString().split('T')[0],
                reason: 'Medical emergency',
                emergencyContact: 'Jane Doe - 555-0123',
                alternateArrangements: 'Assignments posted online',
                priority: 'high',
                notifyAdmin: true,
                notifyHOD: true
            };

            const response = await request(app)
                .post('/api/leave/request')
                .set('Authorization', `Bearer ${authToken}`)
                .send(leaveData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data.leaveRequest.status).toBe('pending');
            expect(response.body.data.analysisResult).toBeDefined();
            expect(response.body.data.analysisResult.affectedLectures).toHaveLength(2);
        });

        it('should validate required fields', async () => {
            const response = await request(app)
                .post('/api/leave/request')
                .set('Authorization', `Bearer ${authToken}`)
                .send({})
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/leave/teacher/:teacherId', () => {
        beforeEach(async () => {
            await Leave.create({
                teacherId: testTeacher._id,
                teacherName: 'John Doe',
                leaveType: 'personal',
                startDate: new Date(),
                endDate: new Date(),
                reason: 'Personal matter',
                status: 'pending'
            });
        });

        it('should get teacher leave requests', async () => {
            const response = await request(app)
                .get(`/api/leave/teacher/${testTeacher._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.leaveRequests).toHaveLength(1);
            expect(response.body.data.pagination).toBeDefined();
        });
    });

    describe('PUT /api/leave/:leaveId/status', () => {
        let leaveRequest;

        beforeEach(async () => {
            leaveRequest = await Leave.create({
                teacherId: testTeacher._id,
                teacherName: 'John Doe',
                leaveType: 'sick',
                startDate: new Date(),
                endDate: new Date(),
                reason: 'Medical emergency',
                status: 'pending'
            });
        });

        it('should approve leave request', async () => {
            const response = await request(app)
                .put(`/api/leave/${leaveRequest._id}/status`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    status: 'approved',
                    comments: 'Approved after medical verification',
                    substituteAssignments: [{
                        teacherId: testTeacher._id,
                        teacherName: 'Jane Smith',
                        lectures: testTimetableEntries.map(entry => ({
                            day: entry.day,
                            time: entry.time,
                            subject: entry.subject,
                            class: entry.class
                        }))
                    }]
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.status).toBe('approved');
        });
    });

    describe('AI Substitute Analysis', () => {
        it('should analyze substitutes correctly', async () => {
            // Create available substitute teachers
            const substituteTeacher = await Teacher.create({
                name: 'Jane Smith',
                email: 'jane@test.com',
                subjects: ['Mathematics'],
                isAvailable: true,
                rating: 4.8,
                currentWorkload: 3
            });

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const leaveData = {
                teacherId: testTeacher._id,
                teacherName: 'John Doe',
                leaveType: 'sick',
                startDate: tomorrow.toISOString().split('T')[0],
                endDate: tomorrow.toISOString().split('T')[0],
                reason: 'Medical emergency',
                priority: 'high'
            };

            const response = await request(app)
                .post('/api/leave/request')
                .set('Authorization', `Bearer ${authToken}`)
                .send(leaveData)
                .expect(201);

            const analysisResult = response.body.data.analysisResult;
            expect(analysisResult.substituteSuggestions).toBeDefined();
            expect(analysisResult.analysisSummary.totalAffectedLectures).toBeGreaterThan(0);
            expect(analysisResult.analysisSummary.availableSubstitutes).toBeGreaterThan(0);
        });
    });

    describe('Notification System', () => {
        it('should create notifications for substitute requests', async () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            await request(app)
                .post('/api/leave/request')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    teacherId: testTeacher._id,
                    teacherName: 'John Doe',
                    leaveType: 'sick',
                    startDate: tomorrow.toISOString().split('T')[0],
                    endDate: tomorrow.toISOString().split('T')[0],
                    reason: 'Medical emergency',
                    priority: 'high'
                })
                .expect(201);

            const notifications = await Notification.find({
                type: 'substitute_request'
            });

            expect(notifications.length).toBeGreaterThan(0);
        });

        it('should get substitute notifications for teacher', async () => {
            await Notification.create({
                recipientId: testTeacher._id,
                type: 'substitute_request',
                title: 'Substitute Request',
                message: 'Test notification',
                priority: 'high',
                status: 'pending'
            });

            const response = await request(app)
                .get(`/api/leave/notifications/${testTeacher._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.notifications).toHaveLength(1);
        });
    });

    describe('POST /api/leave/respond/:notificationId', () => {
        let notification;

        beforeEach(async () => {
            notification = await Notification.create({
                recipientId: testTeacher._id,
                type: 'substitute_request',
                title: 'Substitute Request',
                message: 'Test notification',
                priority: 'high',
                status: 'pending'
            });
        });

        it('should respond to substitute request', async () => {
            const response = await request(app)
                .post(`/api/leave/respond/${notification._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    response: 'accepted',
                    message: 'I am available to substitute'
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.status).toBe('accepted');
        });
    });
});

describe('Leave Management Integration Tests', () => {
    let testTeacher, authToken;

    beforeAll(async () => {
        testTeacher = await Teacher.create({
            name: 'Integration Teacher',
            email: 'integration@test.com',
            subjects: ['Mathematics'],
            isAvailable: true,
            rating: 4.0
        });

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'integration@test.com',
                password: 'password123'
            });

        authToken = response.body.token;
    });

    it('should handle complete leave workflow', async () => {
        // 1. Submit leave request
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const leaveResponse = await request(app)
            .post('/api/leave/request')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                teacherId: testTeacher._id,
                teacherName: 'Integration Teacher',
                leaveType: 'personal',
                startDate: tomorrow.toISOString().split('T')[0],
                endDate: tomorrow.toISOString().split('T')[0],
                reason: 'Personal emergency',
                priority: 'medium'
            })
            .expect(201);

        expect(leaveResponse.body.success).toBe(true);

        // 2. Check notifications created
        const notifications = await Notification.find({
            type: 'substitute_request'
        });
        expect(notifications.length).toBeGreaterThan(0);

        // 3. Get teacher's leave history
        const historyResponse = await request(app)
            .get(`/api/leave/teacher/${testTeacher._id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);

        expect(historyResponse.body.data.leaveRequests).toHaveLength(1);

        // 4. Verify AI analysis was performed
        const leaveRequest = historyResponse.body.data.leaveRequests[0];
        expect(leaveRequest.aiAnalysis).toBeDefined();
        expect(leaveRequest.aiAnalysis.analysisSummary).toBeDefined();
    });
});
