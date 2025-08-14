import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints - Updated for monolithic backend
export const API_ENDPOINTS = {
  auth: {
    base: `${API_BASE_URL}:8080`,
    generateToken: '/auth/generate-token',
    health: '/auth/health',
  },
  treatment: {
    base: `${API_BASE_URL}:8080`,
    packages: '/IPTreatmentPackages',
    specialists: '/specialists',
  },
  timetable: {
    base: `${API_BASE_URL}:8080`,
    generateTimetable: '/IPTreatment/generateTimetable',
    treatments: '/treatments',
  },
  insurance: {
    base: `${API_BASE_URL}:8080`,
    initiateClaim: '/insurance/InitiateClaim',
    insurers: '/insurance/GetAllInsurerDetail',
    claims: '/insurance/claims',
  },
  swagger: {
    base: `${API_BASE_URL}:8080`,
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