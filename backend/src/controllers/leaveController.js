const Leave = require('../models/Leave');
const Teacher = require('../models/Teacher');
const Timetable = require('../models/Timetable');
const Notification = require('../models/Notification');

// AI-powered substitute analysis
const analyzeSubstitutes = async (leaveRequest) => {
    try {
        // Get affected lectures from timetable
        const affectedLectures = await Timetable.find({
            teacher: leaveRequest.teacherId,
            date: {
                $gte: new Date(leaveRequest.startDate),
                $lte: new Date(leaveRequest.endDate)
            }
        });

        // Get available teachers with matching subjects
        const subjects = [...new Set(affectedLectures.map(l => l.subject))];
        const availableTeachers = await Teacher.find({
            _id: { $ne: leaveRequest.teacherId },
            subjects: { $in: subjects },
            isAvailable: true
        });

        // Calculate confidence scores for each teacher
        const substituteSuggestions = availableTeachers.map(teacher => {
            const matchingLectures = affectedLectures.filter(lecture =>
                teacher.subjects.includes(lecture.subject)
            );

            const confidenceScore = calculateConfidenceScore(teacher, matchingLectures, affectedLectures);

            return {
                teacherId: teacher._id,
                teacherName: teacher.name,
                subjects: teacher.subjects,
                rating: teacher.rating || 4.0,
                workload: teacher.currentWorkload || 5,
                syllabusProgress: teacher.syllabusProgress || 80, // Default 80% if not set
                availability: calculateAvailability(teacher, leaveRequest),
                confidenceScore,
                affectedLectures: matchingLectures,
                recommendedAction: generateRecommendedAction(confidenceScore)
            };
        }).sort((a, b) => b.confidenceScore - a.confidenceScore);

        return {
            affectedLectures,
            substituteSuggestions,
            analysisSummary: {
                totalAffectedLectures: affectedLectures.length,
                availableSubstitutes: substituteSuggestions.length,
                highConfidenceMatches: substituteSuggestions.filter(s => s.confidenceScore >= 80).length,
                analysisTimestamp: new Date()
            }
        };

    } catch (error) {
        console.error('Error in AI substitute analysis:', error);
        throw error;
    }
};

const calculateConfidenceScore = (teacher, matchingLectures, allAffectedLectures) => {
    let score = 0;

    // Subject expertise match (30% weight)
    const subjectMatchRatio = matchingLectures.length / allAffectedLectures.length;
    score += subjectMatchRatio * 30;

    // Syllabus Lagging - Lower progress means HIGHER priority (30% weight)
    // If syllabus is 30%, (100-30)=70. 70/100 * 30 = 21 points
    const laggingScore = (100 - (teacher.syllabusProgress || 80)) / 100;
    score += laggingScore * 30;

    // Workload availability (20% weight)
    const workloadScore = Math.max(0, (10 - (teacher.currentWorkload || 5)) / 10) * 20;
    score += workloadScore;

    // Teacher rating (10% weight)
    const ratingScore = ((teacher.rating || 4.0) / 5) * 10;
    score += ratingScore;

    // Historical performance (10% weight)
    const performanceScore = teacher.substitutePerformance || 0.8;
    score += performanceScore * 10;

    return Math.min(100, Math.max(0, score));
};

const calculateAvailability = (teacher, leaveRequest) => {
    // Simulate availability calculation based on existing commitments
    const baseAvailability = 85;
    const workloadReduction = teacher.workload * 2;
    const randomVariation = Math.random() * 10 - 5;
    
    return Math.min(100, Math.max(0, baseAvailability - workloadReduction + randomVariation));
};

const generateRecommendedAction = (confidenceScore) => {
    if (confidenceScore >= 80) {
        return 'Highly Recommended - Excellent match and availability';
    } else if (confidenceScore >= 60) {
        return 'Recommended - Good match with minor scheduling adjustments';
    } else if (confidenceScore >= 40) {
        return 'Consider - May require additional support';
    } else {
        return 'Last Resort - Limited availability or expertise';
    }
};

// Submit leave request
const submitLeaveRequest = async (req, res) => {
    try {
        const {
            teacherId,
            teacherName,
            leaveType,
            startDate,
            endDate,
            reason,
            emergencyContact,
            alternateArrangements,
            priority,
            notifyAdmin,
            notifyHOD
        } = req.body;

        // Create leave request
        const leaveRequest = new Leave({
            teacherId,
            teacherName,
            leaveType,
            startDate,
            endDate,
            reason,
            emergencyContact,
            alternateArrangements,
            priority,
            status: 'pending',
            submittedAt: new Date(),
            submittedBy: req.user.id
        });

        await leaveRequest.save();

        // Perform AI analysis for substitutes
        const analysisResult = await analyzeSubstitutes(leaveRequest);
        leaveRequest.aiAnalysis = analysisResult;
        await leaveRequest.save();

        // Create notifications for substitute teachers
        if (analysisResult.substituteSuggestions.length > 0) {
            const notifications = analysisResult.substituteSuggestions.map(substitute => ({
                recipientId: substitute.teacherId,
                type: 'substitute_request',
                title: 'Substitute Teaching Request',
                message: `Dear ${substitute.teacherName}, you have been requested to substitute for ${teacherName} from ${startDate} to ${endDate}.`,
                priority: priority,
                leaveRequestId: leaveRequest._id,
                affectedLectures: substitute.affectedLectures,
                confidenceScore: substitute.confidenceScore,
                status: 'pending',
                createdAt: new Date()
            }));

            await Notification.insertMany(notifications);
        }

        // Notify admin and HOD if requested
        if (notifyAdmin || notifyHOD) {
            const adminNotification = {
                type: 'leave_request',
                title: 'New Leave Request',
                message: `${teacherName} has submitted a leave request from ${startDate} to ${endDate}.`,
                priority: priority,
                leaveRequestId: leaveRequest._id,
                status: 'pending',
                createdAt: new Date()
            };

            if (notifyAdmin) {
                adminNotification.recipientRole = 'admin';
                await Notification.create(adminNotification);
            }

            if (notifyHOD) {
                adminNotification.recipientRole = 'hod';
                await Notification.create(adminNotification);
            }
        }

        // Notify Class Teacher
        const classTeacherNotification = {
            type: 'leave_request_class_teacher',
            title: 'Subject Teacher Leave Alert',
            message: `Subject teacher ${teacherName} will be absent from ${startDate} to ${endDate}. The AI substitute system is currently assigning replacements for their lectures.`,
            priority: 'high',
            leaveRequestId: leaveRequest._id,
            status: 'pending',
            createdAt: new Date(),
            recipientRole: 'class_teacher' // Assuming a role or system exists to route to correct class teacher
        };
        await Notification.create(classTeacherNotification);

        // Global Alarm Notification
        const alarmNotification = {
            type: 'absence_alarm',
            title: `🚨 Absence Alarm: ${teacherName}`,
            message: `${teacherName} is marked ABSENT from ${startDate} to ${endDate}. Check your substitute dashboard for potential assignments.`,
            priority: 'urgent',
            leaveRequestId: leaveRequest._id,
            status: 'pending',
            createdAt: new Date(),
            recipientRole: 'all_teachers' // Broadcast to all teachers
        };
        await Notification.create(alarmNotification);

        res.status(201).json({
            success: true,
            message: 'Leave request submitted successfully',
            data: {
                leaveRequest,
                analysisResult
            }
        });

    } catch (error) {
        console.error('Error submitting leave request:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit leave request',
            error: error.message
        });
    }
};

// Get leave requests for a teacher
const getTeacherLeaveRequests = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { status, page = 1, limit = 10 } = req.query;

        const query = { teacherId };
        if (status && status !== 'all') {
            query.status = status;
        }

        const leaveRequests = await Leave.find(query)
            .sort({ submittedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('aiAnalysis.substituteSuggestions.teacherId', 'name email subjects rating');

        const total = await Leave.countDocuments(query);

        res.status(200).json({
            success: true,
            data: {
                leaveRequests,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });

    } catch (error) {
        console.error('Error fetching leave requests:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch leave requests',
            error: error.message
        });
    }
};

// Get all leave requests (for admin)
const getAllLeaveRequests = async (req, res) => {
    try {
        const { status, priority, department, page = 1, limit = 10 } = req.query;

        const query = {};
        if (status && status !== 'all') query.status = status;
        if (priority && priority !== 'all') query.priority = priority;
        if (department) query.department = department;

        const leaveRequests = await Leave.find(query)
            .sort({ submittedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('teacherId', 'name email department')
            .populate('approvedBy', 'name email')
            .populate('aiAnalysis.substituteSuggestions.teacherId', 'name email subjects rating');

        const total = await Leave.countDocuments(query);

        res.status(200).json({
            success: true,
            data: {
                leaveRequests,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });

    } catch (error) {
        console.error('Error fetching all leave requests:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch leave requests',
            error: error.message
        });
    }
};

// Approve/Reject leave request
const updateLeaveStatus = async (req, res) => {
    try {
        const { leaveId } = req.params;
        const { status, comments, substituteAssignments } = req.body;

        const leaveRequest = await Leave.findById(leaveId);
        if (!leaveRequest) {
            return res.status(404).json({
                success: false,
                message: 'Leave request not found'
            });
        }

        leaveRequest.status = status;
        leaveRequest.approvedBy = req.user.id;
        leaveRequest.approvedAt = new Date();
        leaveRequest.approvalComments = comments;

        if (substituteAssignments && substituteAssignments.length > 0) {
            leaveRequest.substituteAssignments = substituteAssignments;
            
            // Create notifications for assigned substitutes
            const substituteNotifications = substituteAssignments.map(assignment => ({
                recipientId: assignment.teacherId,
                type: 'substitute_assigned',
                title: 'Substitute Assignment Confirmed',
                message: `You have been assigned to substitute for ${leaveRequest.teacherName} from ${leaveRequest.startDate} to ${leaveRequest.endDate}.`,
                priority: 'high',
                leaveRequestId: leaveRequest._id,
                assignedLectures: assignment.lectures,
                status: 'confirmed',
                createdAt: new Date()
            }));

            await Notification.insertMany(substituteNotifications);
        }

        await leaveRequest.save();

        // Notify the original teacher
        await Notification.create({
            recipientId: leaveRequest.teacherId,
            type: status === 'approved' ? 'leave_approved' : 'leave_rejected',
            title: status === 'approved' ? 'Leave Request Approved' : 'Leave Request Rejected',
            message: `Your leave request from ${leaveRequest.startDate} to ${leaveRequest.endDate} has been ${status}.`,
            priority: 'medium',
            leaveRequestId: leaveRequest._id,
            status: 'read',
            createdAt: new Date()
        });

        res.status(200).json({
            success: true,
            message: `Leave request ${status} successfully`,
            data: leaveRequest
        });

    } catch (error) {
        console.error('Error updating leave status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update leave status',
            error: error.message
        });
    }
};

// Handle substitute response
const respondToSubstituteRequest = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const { response, message } = req.body;

        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        notification.status = response;
        notification.responseMessage = message;
        notification.respondedAt = new Date();
        notification.respondedBy = req.user.id;

        await notification.save();

        // Update leave request with substitute response
        await Leave.findByIdAndUpdate(
            notification.leaveRequestId,
            {
                $push: {
                    'substituteResponses': {
                        teacherId: req.user.id,
                        response: response,
                        message: message,
                        respondedAt: new Date()
                    }
                }
            }
        );

        // Notify admin about the response
        await Notification.create({
            type: 'substitute_response',
            title: `Substitute ${response}`,
            message: `${req.user.name} has ${response} the substitute request for leave ID ${notification.leaveRequestId}.`,
            priority: response === 'accepted' ? 'medium' : 'high',
            leaveRequestId: notification.leaveRequestId,
            status: 'pending',
            createdAt: new Date()
        });

        res.status(200).json({
            success: true,
            message: `Substitute request ${response} successfully`,
            data: notification
        });

    } catch (error) {
        console.error('Error responding to substitute request:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to respond to substitute request',
            error: error.message
        });
    }
};

// Get substitute notifications for a teacher
const getSubstituteNotifications = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { status, type, page = 1, limit = 10 } = req.query;

        const query = { recipientId: teacherId };
        if (status && status !== 'all') query.status = status;
        if (type && type !== 'all') query.type = type;

        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('leaveRequestId', 'teacherName startDate endDate reason');

        const total = await Notification.countDocuments(query);

        res.status(200).json({
            success: true,
            data: {
                notifications,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });

    } catch (error) {
        console.error('Error fetching substitute notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notifications',
            error: error.message
        });
    }
};

module.exports = {
    submitLeaveRequest,
    getTeacherLeaveRequests,
    getAllLeaveRequests,
    updateLeaveStatus,
    respondToSubstituteRequest,
    getSubstituteNotifications,
    analyzeSubstitutes
};
