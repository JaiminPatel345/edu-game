// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // User Profile
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
    UPLOAD_AVATAR: '/profile/avatar',
    DELETE: '/profile',
  },
  
  // Student specific
  STUDENT: {
    PROFILE: '/student/profile',
    UPLOAD_RESUME: '/student/resume',
    AUTO_FILL: '/student/auto-fill',
    DASHBOARD_STATS: '/student/dashboard',
    SKILL_GAPS: '/student/skill-gaps',
    LEARNING_RESOURCES: '/student/learning-resources',
    MOCK_INTERVIEWS: '/student/mock-interviews',
  },
  
  // Opportunities
  OPPORTUNITIES: {
    LIST: '/opportunities',
    GET: (id: string) => `/opportunities/${id}`,
    APPLY: (id: string) => `/opportunities/${id}/apply`,
    SEARCH: '/opportunities/search',
    FILTER: '/opportunities/filter',
  },
  
  // Applications
  APPLICATIONS: {
    LIST: '/applications',
    GET: (id: string) => `/applications/${id}`,
    UPDATE_STATUS: (id: string) => `/applications/${id}/status`,
    WITHDRAW: (id: string) => `/applications/${id}/withdraw`,
  },
  
  // Analytics
  ANALYTICS: {
    INDUSTRY_DEMAND: '/analytics/industry-demand',
    PEER_SUCCESS: '/analytics/peer-success',
    MARKET_TRENDS: '/analytics/market-trends',
    COMPANY_TRANSPARENCY: '/analytics/company-transparency',
  },
  
  // Faculty/Teacher
  FACULTY: {
    DASHBOARD: '/faculty/dashboard',
    STUDENTS: '/faculty/students',
    PLACEMENTS: '/faculty/placements',
    ANALYTICS: '/faculty/analytics',
  },
  
  // Company/Recruiter
  COMPANY: {
    DASHBOARD: '/company/dashboard',
    POST_JOB: '/company/jobs',
    APPLICATIONS: '/company/applications',
    STUDENTS: '/company/students',
  },
};