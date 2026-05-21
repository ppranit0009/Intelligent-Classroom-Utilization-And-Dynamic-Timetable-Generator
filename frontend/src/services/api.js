const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add auth token if available
  const token = localStorage.getItem('taskflow-token');
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem('taskflow-token', response.token);
    }
    
    return response;
  },

  register: async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem('taskflow-token', response.token);
    }
    
    return response;
  },

  getProfile: async () => {
    return await apiRequest('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('taskflow-token');
  },
};

// Classes API
export const classesAPI = {
  getClasses: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/classes?${queryString}` : '/classes';
    return await apiRequest(endpoint);
  },

  joinClass: async (classCode) => {
    return await apiRequest('/classes/join', {
      method: 'POST',
      body: JSON.stringify({ classCode }),
    });
  },

  getEnrolledClasses: async () => {
    return await apiRequest('/classes/enrolled');
  },

  createClass: async (classData) => {
    return await apiRequest('/classes', {
      method: 'POST',
      body: JSON.stringify(classData),
    });
  },
};

// Users API
export const usersAPI = {
  getProfile: async () => {
    return await apiRequest('/users/profile');
  },

  updateProfile: async (profileData) => {
    return await apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Assignments API
export const assignmentsAPI = {
  getAssignments: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/assignments?${queryString}` : '/assignments';
    return await apiRequest(endpoint);
  },

  submitAssignment: async (assignmentData) => {
    return await apiRequest('/assignments/submit', {
      method: 'POST',
      body: JSON.stringify(assignmentData),
    });
  },

  gradeAssignment: async (assignmentId, gradeData) => {
    return await apiRequest(`/assignments/${assignmentId}/grade`, {
      method: 'PUT',
      body: JSON.stringify(gradeData),
    });
  },
};

// Attendance API
export const attendanceAPI = {
  getAttendance: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/attendance?${queryString}` : '/attendance';
    return await apiRequest(endpoint);
  },

  markAttendance: async (attendanceData) => {
    return await apiRequest('/attendance/mark', {
      method: 'POST',
      body: JSON.stringify(attendanceData),
    });
  },
};

export default apiRequest;
