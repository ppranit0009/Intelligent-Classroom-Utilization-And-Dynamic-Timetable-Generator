# Teacher Leave Management System with AI-Powered Substitute Arrangements

## Overview

This comprehensive leave management system allows teachers to apply for leave and automatically analyzes timetables to find optimal substitute teachers using AI algorithms. The system ensures no lecture time is wasted and provides intelligent recommendations for substitute arrangements.

## Features

### 🎯 Core Features
- **Leave Application**: Teachers can submit detailed leave requests with multiple leave types
- **AI-Powered Analysis**: Intelligent timetable analysis to find affected lectures
- **Smart Substitute Matching**: AI algorithm matches available teachers based on subject expertise, workload, and ratings
- **Real-time Notifications**: Automatic notifications to substitute teachers and administrators
- **Comprehensive Dashboard**: Full overview of leave history, requests, and substitute management

### 🤖 AI Analysis Features
- **Confidence Scoring**: Each substitute recommendation includes a confidence score (0-100%)
- **Multi-factor Matching**: Considers subject expertise, availability, workload, and historical performance
- **Intelligent Recommendations**: Provides actionable recommendations for each substitute candidate
- **Affected Lecture Analysis**: Automatically identifies all lectures that need coverage

### 📊 Notification System
- **Multi-channel Notifications**: Email, SMS, and in-app notifications
- **Priority-based Alerts**: Different notification levels for urgent vs. regular requests
- **Response Tracking**: Track substitute acceptances/declines in real-time
- **Automated Follow-ups**: System sends reminders for pending responses

## System Architecture

### Frontend Components

#### 1. TeacherLeaveManagement.jsx
- **Location**: `frontend/src/components/TeacherLeaveManagement.jsx`
- **Purpose**: Main interface for teachers to apply for leave and manage requests
- **Key Features**:
  - Leave application form with validation
  - AI-powered substitute suggestions modal
  - Leave history tracking
  - Real-time status updates

#### 2. SubstituteNotificationSystem.jsx
- **Location**: `frontend/src/components/SubstituteNotificationSystem.jsx`
- **Purpose**: Notification center for substitute teachers
- **Key Features**:
  - Filtered notification views
  - Detailed notification modals
  - Quick accept/decline actions
  - AI analysis results display

#### 3. ClassTeacherView.jsx (Updated)
- **Location**: `frontend/src/components/ClassTeacherView.jsx`
- **Changes**: Added leave management tab integration
- **Purpose**: Main dashboard with leave management access

### Backend Components

#### 1. Leave Controller
- **Location**: `backend/src/controllers/leaveController.js`
- **Purpose**: Core business logic for leave management
- **Key Functions**:
  - `submitLeaveRequest()`: Process new leave applications
  - `analyzeSubstitutes()`: AI-powered substitute analysis
  - `updateLeaveStatus()`: Approve/reject leave requests
  - `respondToSubstituteRequest()`: Handle substitute responses

#### 2. Database Models

##### Leave Model
- **Location**: `backend/src/models/Leave.js`
- **Purpose**: Store leave requests and AI analysis results
- **Key Fields**:
  - Teacher information and leave details
  - AI analysis results with substitute suggestions
  - Status tracking and approval workflow
  - Substitute assignments and responses

##### Notification Model
- **Location**: `backend/src/models/Notification.js`
- **Purpose**: Manage all system notifications
- **Key Features**:
  - Multi-type notifications (substitute requests, approvals, etc.)
  - Priority levels and expiration
  - Response tracking
  - Automated cleanup

##### Timetable Model
- **Location**: `backend/src/models/Timetable.js`
- **Purpose**: Store schedule information for AI analysis
- **Key Features**:
  - Teacher schedules and lecture details
  - Substitute assignment tracking
  - Availability checking methods

#### 3. API Routes
- **Location**: `backend/src/routes/leave.js`
- **Endpoints**:
  - `POST /api/leave/request` - Submit leave request
  - `GET /api/leave/teacher/:teacherId` - Get teacher's leave history
  - `GET /api/leave/all` - Get all leave requests (admin)
  - `PUT /api/leave/:leaveId/status` - Update leave status
  - `POST /api/leave/respond/:notificationId` - Respond to substitute request
  - `GET /api/leave/notifications/:teacherId` - Get notifications

## AI Algorithm Details

### Confidence Score Calculation

The AI calculates confidence scores using multiple factors:

```javascript
// Subject expertise match (40% weight)
const subjectMatchRatio = matchingLectures.length / allAffectedLectures.length;
score += subjectMatchRatio * 40;

// Teacher rating (20% weight)
const ratingScore = (teacher.rating / 5) * 20;
score += ratingScore;

// Workload availability (25% weight)
const workloadScore = Math.max(0, (10 - teacher.workload) / 10) * 25;
score += workloadScore;

// Historical performance (15% weight)
const performanceScore = teacher.substitutePerformance || 0.8;
score += performanceScore * 15;
```

### Recommendation Logic

- **80-100%**: Highly Recommended - Excellent match and availability
- **60-79%**: Recommended - Good match with minor scheduling adjustments
- **40-59%**: Consider - May require additional support
- **0-39%**: Last Resort - Limited availability or expertise

## Workflow Process

### 1. Leave Application
1. Teacher fills out leave application form
2. System validates input and required fields
3. Leave request is saved to database
4. AI analysis is triggered automatically

### 2. AI Analysis
1. System queries timetable for affected lectures
2. Finds available teachers with matching subjects
3. Calculates confidence scores for each candidate
4. Generates substitute recommendations
5. Creates notifications for top candidates

### 3. Substitute Notification
1. Qualified substitutes receive notifications
2. Teachers can view details and affected lectures
3. Quick accept/decline actions available
4. Responses are tracked in real-time

### 4. Approval Workflow
1. Administrators review leave requests and substitute responses
2. Can approve/reject with comments
3. System assigns substitutes based on responses
4. All parties are notified of final decisions

## Testing

### Comprehensive Test Suite
- **Location**: `backend/src/tests/leaveManagement.test.js`
- **Coverage**:
  - Leave request submission
  - AI substitute analysis
  - Notification creation and delivery
  - Approval workflows
  - Integration tests for complete workflow

### Running Tests
```bash
cd backend
npm test
```

## Installation & Setup

### Backend Setup
1. Install dependencies:
```bash
cd backend
npm install
```

2. Update environment variables:
```bash
cp .env.example .env
# Edit .env with your database and configuration
```

3. Start development server:
```bash
npm run dev
```

### Frontend Setup
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm start
```

## API Usage Examples

### Submit Leave Request
```javascript
POST /api/leave/request
{
  "teacherId": "teacher_id",
  "teacherName": "John Doe",
  "leaveType": "sick",
  "startDate": "2024-01-15",
  "endDate": "2024-01-16",
  "reason": "Medical emergency",
  "priority": "high",
  "notifyAdmin": true,
  "notifyHOD": true
}
```

### Get AI Analysis Results
```javascript
// Response includes:
{
  "analysisResult": {
    "affectedLectures": [...],
    "substituteSuggestions": [
      {
        "teacherName": "Jane Smith",
        "confidenceScore": 85,
        "recommendedAction": "Highly Recommended",
        "affectedLectures": [...]
      }
    ],
    "analysisSummary": {
      "totalAffectedLectures": 3,
      "availableSubstitutes": 2,
      "highConfidenceMatches": 1
    }
  }
}
```

## Security Features

- **Authentication**: All endpoints require valid JWT tokens
- **Authorization**: Role-based access control (teacher, admin, HOD)
- **Input Validation**: Comprehensive validation for all inputs
- **File Upload Security**: Secure file handling with type and size limits
- **Rate Limiting**: API rate limiting to prevent abuse

## Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexes
- **Caching**: AI analysis results cached for performance
- **Pagination**: Large datasets paginated for better performance
- **Background Processing**: AI analysis runs asynchronously

## Future Enhancements

### Planned Features
- **Calendar Integration**: Sync with external calendar systems
- **Mobile App**: Native mobile application for notifications
- **Advanced AI**: Machine learning for improved substitute matching
- **Analytics Dashboard**: Comprehensive reporting and analytics
- **Auto-assignment**: Automatic substitute assignment based on preferences

### Scalability
- **Microservices**: Split into microservices for better scalability
- **Message Queue**: Use RabbitMQ/Kafka for async processing
- **Load Balancing**: Multiple server instances with load balancing
- **Database Sharding**: Horizontal scaling for large datasets

## Support & Maintenance

### Monitoring
- Application performance monitoring
- Error tracking and alerting
- Database performance metrics
- API usage analytics

### Backup & Recovery
- Automated database backups
- Disaster recovery procedures
- Data retention policies
- Audit logging

## Conclusion

This leave management system provides a comprehensive solution for managing teacher absences with intelligent substitute arrangements. The AI-powered analysis ensures optimal matching while the notification system keeps all stakeholders informed in real-time. The system is designed to be scalable, secure, and user-friendly.

The modular architecture allows for easy extension and customization, while the comprehensive test suite ensures reliability and maintainability.
