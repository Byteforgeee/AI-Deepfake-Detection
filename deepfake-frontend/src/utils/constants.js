export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  LOGOUT: "/auth/logout",
  UPLOAD: "/detect/upload",
  JOB_STATUS: (jobId) => `/detect/status/${jobId}`,
  RESULTS: (jobId) => `/detect/results/${jobId}`,
  REPORT: (jobId) => `/reports/${jobId}`,
};

export const TOKEN_STORAGE_KEY = "dfd_access_token";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 8;
