# Intelligent Classroom Utilization And Dynamic Timetable Generator

A comprehensive school management system that combines intelligent classroom utilization tracking with dynamic timetable generation capabilities. This project provides a complete solution for educational institutions to optimize resource allocation and streamline academic scheduling.

## 🚀 Features

### Core Functionality
- **Multi-Role Authentication System** - Support for Students, Teachers, Class Teachers, and Administrators
- **Intelligent Attendance Management** - Real-time attendance tracking with comprehensive analytics
- **Dynamic Timetable Generation** - Automated scheduling based on classroom availability and teacher preferences
- **Classroom Utilization Optimization** - Smart allocation of classrooms based on capacity, equipment, and usage patterns
- **Real-time Dashboard Analytics** - Comprehensive insights into school operations

### User Roles & Capabilities

#### 👨‍🎓 Student Portal
- Personal dashboard with academic progress tracking
- Attendance history and statistics
- Assignment submission and tracking
- Timetable viewing with real-time updates
- Notices and circulars management

#### 👨‍🏫 Teacher Portal
- Class management and student monitoring
- Attendance marking and management
- Assignment creation and grading
- Subject-wise analytics
- Communication tools for student engagement

#### 👩‍🏫 Class Teacher Dashboard
- Complete class oversight and management
- Multi-subject teacher coordination
- Student performance tracking
- Parent communication tools
- Class creation and management

#### 🏫 Administrator Panel
- System-wide user management
- Classroom resource allocation
- Timetable generation and optimization
- Comprehensive reporting and analytics
- System configuration and settings

## 🛠️ Technology Stack

### Frontend Technologies
- **React 19.2.0** - Modern UI framework with hooks and concurrent features
- **Vite 7.3.2** - Fast development build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework for rapid UI development
- **Framer Motion 12.27.0** - Production-ready motion library for React
- **Lucide React 0.562.0** - Beautiful & consistent icon toolkit
- **Recharts 3.6.0** - Composable charting library for React

### Development Tools
- **ESLint 9.39.1** - JavaScript linting utility
- **PostCSS 8.5.6** - CSS transformation tool
- **Autoprefixer 10.4.23** - CSS vendor prefixing

## 📁 Project Structure

```
Intelligent-Classroom-Utilization-And-Dynamic-Timetable-Generator/
├── taskflow-academy/                 # React Application
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/           # React components
│   │   │   │   ├── AttendanceManagement.jsx
│   │   │   │   ├── ClassTeacherView.jsx
│   │   │   │   ├── StudentView.jsx
│   │   │   │   ├── TeacherView.jsx
│   │   │   │   ├── AdminView.jsx
│   │   │   │   └── ...
│   │   │   ├── services/            # API services
│   │   │   ├── store/              # State management
│   │   │   ├── App.jsx             # Main application component
│   │   │   └── main.jsx            # Application entry point
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.js
│   └── backend/                    # Backend API (placeholder)
├── index.html                      # Static HTML Dashboard
├── assets/                         # Static assets
├── docs/                          # Documentation
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Intelligent-Classroom-Utilization-And-Dynamic-Timetable-Generator.git
   cd Intelligent-Classroom-Utilization-And-Dynamic-Timetable-Generator
   ```

2. **Install dependencies**
   ```bash
   cd taskflow-academy/frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - React App: http://localhost:5173
   - Static Dashboard: http://localhost:8080 (run `python -m http.server 8080`)

### Build for Production
```bash
npm run build
```

## 🔐 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Student | S1001 | 123 |
| Teacher | T2001 | 123 |
| Class Teacher | CT3001 | 123 |
| Administrator | PRANIT_ADMIN | pranit123 |

## 🎯 Key Features Explained

### Intelligent Classroom Utilization
- **Real-time tracking** of classroom occupancy and usage patterns
- **Smart allocation** based on class size, equipment requirements, and accessibility needs
- **Predictive analytics** for optimal resource planning
- **Conflict resolution** for overlapping scheduling requests

### Dynamic Timetable Generation
- **Algorithm-based scheduling** considering multiple constraints
- **Teacher preference integration** for subject assignments
- **Classroom optimization** based on capacity and location
- **Automatic conflict detection** and resolution suggestions

### Attendance Management System
- **Biometric and RFID integration** ready
- **Real-time analytics** with visual dashboards
- **Automated reporting** for parents and administration
- **Pattern recognition** for identifying attendance trends

## 📊 Analytics & Reporting

- **Student Performance Analytics** - Track academic progress and identify at-risk students
- **Teacher Performance Metrics** - Monitor teaching effectiveness and student engagement
- **Resource Utilization Reports** - Optimize classroom and equipment usage
- **Attendance Analytics** - Comprehensive attendance tracking with trend analysis
- **Financial Reporting** - Budget tracking and resource cost analysis

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the `taskflow-academy/frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=TaskFlow Academy
VITE_VERSION=1.0.0
```

### Customization Options
- **Theme Configuration** - Modify colors and branding in `tailwind.config.js`
- **Role Permissions** - Customize user roles and permissions in `App.jsx`
- **Academic Structure** - Modify class sections and subjects in configuration files

## 🤝 Contributing

We welcome contributions from the community! Here's how you can contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Add appropriate comments and documentation
- Test your changes thoroughly
- Update the README if needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide Icons** - For the beautiful icon set
- **Framer Motion** - For the smooth animations

## 📞 Contact & Support

For support, questions, or contributions:

- **Email**: support@taskflow-academy.com
- **GitHub Issues**: [Create an issue](https://github.com/your-username/Intelligent-Classroom-Utilization-And-Dynamic-Timetable-Generator/issues)
- **Discussions**: [Join our GitHub Discussions](https://github.com/your-username/Intelligent-Classroom-Utilization-And-Dynamic-Timetable-Generator/discussions)

## 🔮 Future Roadmap

### Phase 2 Features
- [ ] **Mobile Application** - React Native mobile app for iOS and Android
- [ ] **Advanced AI Integration** - Machine learning for predictive analytics
- [ ] **Video Conferencing Integration** - Virtual classroom capabilities
- [ ] **Biometric Attendance** - Face recognition and fingerprint scanning
- [ ] **Multi-language Support** - Internationalization and localization

### Phase 3 Features
- [ ] **Learning Management System** - Complete LMS integration
- [ ] **Parent Portal** - Dedicated parent engagement platform
- [ ] **Financial Management** - Fee collection and financial reporting
- [ ] **Library Management** - Integrated library system
- [ ] **Transport Management** - School bus tracking and management

---

**Built with ❤️ for the education community**
