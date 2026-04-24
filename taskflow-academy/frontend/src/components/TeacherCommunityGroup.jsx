import React, { useState } from 'react';
import { Users, MessageCircle, Calendar, Award, TrendingUp, Star } from 'lucide-react';

const TeacherCommunityGroup = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      role: 'Math Teacher',
      content: 'Great strategies for teaching algebra to visual learners!',
      likes: 12,
      comments: 5,
      timestamp: '2 hours ago',
      category: 'Teaching Tips'
    },
    {
      id: 2,
      author: 'Mike Chen',
      role: 'Science Teacher',
      content: 'New lab experiment ideas for chemistry class',
      likes: 8,
      comments: 3,
      timestamp: '4 hours ago',
      category: 'Resources'
    }
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Teacher Workshop',
      date: '2024-01-25',
      time: '3:00 PM',
      attendees: 15,
      type: 'workshop'
    },
    {
      id: 2,
      title: 'Department Meeting',
      date: '2024-01-26',
      time: '10:00 AM',
      attendees: 8,
      type: 'meeting'
    }
  ]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-500" />
          Teacher Community
        </h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
          Create Post
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('discussions')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'discussions'
              ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Discussions
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'events'
              ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4 inline mr-2" />
          Events
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'resources'
              ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4 inline mr-2" />
          Resources
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'discussions' && (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{post.author}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{post.role}</p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{post.timestamp}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-3">{post.content}</p>
                <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                  <button className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400">
                    <Star className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white">{event.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    event.type === 'workshop' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Teaching Resources</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Share and discover teaching materials, lesson plans, and best practices
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Browse Resources
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCommunityGroup;
