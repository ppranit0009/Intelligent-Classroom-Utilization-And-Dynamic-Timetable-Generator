import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, TrendingUp, TrendingDown, AlertCircle, 
  BookOpen, Calendar, Target, Award, BarChart3, 
  Clock, CheckCircle, FileText, Eye, Bell, MessageSquare
} from 'lucide-react';
import { 
  getClassById, getClassPerformanceMetrics, getUpcomingAssessments, 
  getClassAnalytics, getClassResources, getClassCommunications 
} from '../data/classData';

const ClassAnalyticsDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('C101');
  const [classData, setClassData] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const data = getClassById(selectedClass);
    const metrics = getClassPerformanceMetrics(selectedClass);
    const analyticsData = getClassAnalytics(selectedClass);
    
    setClassData(data);
    setPerformanceMetrics(metrics);
    setAnalytics(analyticsData);
  }, [selectedClass]);

  const classes = [
    { id: 'C101', name: 'F.Y.BCA - Section A', subject: 'Computer Programming' },
    { id: 'C102', name: 'S.Y.BCA - Section B', subject: 'Mathematics' },
    { id: 'C103', name: 'T.Y.BCA - Section A', subject: 'Database Management' }
  ];

  if (!classData || !performanceMetrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Class Selector */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Class Analytics Dashboard</h2>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Class Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Students</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {performanceMetrics.overview.totalStudents}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Average GPA</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {performanceMetrics.overview.averageGPA}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Avg Attendance</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {performanceMetrics.overview.averageAttendance}%
                </p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Performance Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(performanceMetrics.distribution).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  key === 'excellent' ? 'bg-gradient-to-br from-emerald-500 to-green-600' :
                  key === 'good' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                  key === 'average' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                  'bg-gradient-to-br from-red-500 to-pink-600'
                }`}>
                  {value}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 capitalize">{key}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum Progress */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Curriculum Progress</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Current Module</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {performanceMetrics.curriculumProgress.currentModule}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Overall Progress</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {performanceMetrics.curriculumProgress.overallProgress}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${performanceMetrics.curriculumProgress.overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Analytics Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            {['overview', 'students', 'assessments', 'resources'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-b-2 border-transparent'
                }`}
              >
                {tab === 'overview' && <BarChart3 className="w-4 h-4 mr-2" />}
                {tab === 'students' && <Users className="w-4 h-4 mr-2" />}
                {tab === 'assessments' && <FileText className="w-4 h-4 mr-2" />}
                {tab === 'resources' && <BookOpen className="w-4 h-4 mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Engagement Metrics */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Engagement Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Total Downloads</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {analytics.engagement.totalDownloads}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Total Views</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {analytics.engagement.totalViews}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Submission Rate</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {analytics.engagement.assignmentSubmissionRate}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Trends */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Performance Trends</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Class Average</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {analytics.performance.classAverage}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Top Performer GPA</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {analytics.performance.topPerformerGPA}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Trend Direction</span>
                      <div className="flex items-center">
                        {analytics.performance.trendDirection === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                        ) : analytics.performance.trendDirection === 'down' ? (
                          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        ) : (
                          <Target className="w-4 h-4 text-amber-500 mr-1" />
                        )}
                        <span className="font-medium text-slate-900 dark:text-white capitalize">
                          {analytics.performance.trendDirection}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-6">
                {/* Top Performers */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Top Performers</h4>
                  <div className="space-y-3">
                    {performanceMetrics.topPerformers.map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              GPA: {student.gpa} | {student.percentage}%
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            student.trend === 'improving' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                            student.trend === 'stable' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                            'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {student.trend}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Students Needing Attention */}
                {performanceMetrics.needsAttention.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Students Needing Attention
                    </h4>
                    <div className="space-y-3">
                      {performanceMetrics.needsAttention.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-red-200 dark:border-red-800">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-bold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                GPA: {student.gpa} | Attendance: {student.attendance}%
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-red-600 dark:text-red-400">
                              {student.concerns.join(', ')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'assessments' && (
              <div className="space-y-6">
                {/* Upcoming Assessments */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Upcoming Assessments</h4>
                  <div className="space-y-3">
                    {analytics.alerts.upcomingAssessments > 0 ? (
                      getUpcomingAssessments(selectedClass).map((assessment) => (
                        <div key={assessment.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 dark:text-white">{assessment.title}</p>
                            <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(assessment.date).toLocaleDateString()}
                              </span>
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded text-xs">
                                {assessment.weight}% weight
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`px-3 py-1 rounded text-xs font-medium ${
                              new Date(assessment.date) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' 
                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            }`}>
                              {new Date(assessment.date) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) ? 'Soon' : 'Future'}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-slate-500 dark:text-slate-400">No upcoming assessments</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                {/* Class Resources */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Class Resources</h4>
                  <div className="space-y-3">
                    {getClassResources(selectedClass)?.materials?.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 dark:text-white">{resource.name}</p>
                            <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                              <span className="flex items-center">
                                <FileText className="w-4 h-4 mr-1" />
                                {resource.type}
                              </span>
                              <span>{resource.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                              <Eye className="w-4 h-4 mr-1" />
                              {resource.downloads || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassAnalyticsDashboard;
