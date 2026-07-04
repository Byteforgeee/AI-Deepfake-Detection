// src/utils/constants.js

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const TOKEN_STORAGE_KEY = 'access_token';  // match Django's JWT access token

export const ENDPOINTS = {
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register/',
  LOGOUT: '/auth/logout/',  // optional, not yet implemented in Django
  ME: '/auth/me/',
};

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;