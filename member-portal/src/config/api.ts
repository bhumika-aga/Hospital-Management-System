import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://hospital-management-system.onrender.com' 
    : 'http://localhost:8080');

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// API endpoints - Updated for monolithic backend
export const API_ENDPOINTS = {
  auth: {
    generateToken: '/auth/generate-token',
    health: '/auth/health',
  },
  treatment: {
    packages: '/IPTreatmentPackages',
    specialists: '/specialists',
  },
  timetable: {
    generateTimetable: '/IPTreatment/generateTimetable',
    treatments: '/treatments',
  },
  insurance: {
    initiateClaim: '/insurance/InitiateClaim',
    insurers: '/insurance/GetAllInsurerDetail',
    claims: '/insurance/claims',
  },
  swagger: {
    docs: '/swagger-ui.html',
  },
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;