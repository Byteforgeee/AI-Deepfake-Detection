import axiosInstance from "./axiosInstance";
import { ENDPOINTS, TOKEN_STORAGE_KEY } from "../utils/constants";

const extractErrorMessage = (error) => {
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (typeof data === 'object') {
      if (data.non_field_errors) return data.non_field_errors.join(' ');
      for (const key in data) {
        if (Array.isArray(data[key])) {
          return `${key}: ${data[key].join(' ')}`;
        }
        if (typeof data[key] === 'string') return data[key];
      }
    }
    if (typeof data === 'string') return data;
  }
  return error.message || 'Request failed';
};

export const login = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.LOGIN, { email, password });
    const { access, refresh } = response.data;

    localStorage.setItem(TOKEN_STORAGE_KEY, access);
    localStorage.setItem('refresh_token', refresh);

    // Fetch user info from /me
    const userResponse = await axiosInstance.get(ENDPOINTS.ME);
    // The view returns the user object directly – NOT wrapped in a 'user' key
    return { user: userResponse.data, token: access };
  } catch (error) {
    if (error.response?.status === 401) {
      const err = new Error('Invalid email or password');
      err.code = 'INVALID_CREDENTIALS';
      throw err;
    }
    throw new Error(extractErrorMessage(error));
  }
};

export const signup = async ({ fullName, email, password }) => {
  try {
    const nameParts = fullName.split(' ');
    const first_name = nameParts[0] || '';
    const last_name = nameParts.slice(1).join(' ') || '';

    await axiosInstance.post(ENDPOINTS.REGISTER, {
      email,
      password,
      first_name,
      last_name,
    });

    // Auto-login after successful registration
    return login({ email, password });
  } catch (error) {
    if (error.response?.status === 400) {
      const data = error.response.data;
      if (data.email && data.email.includes('already exists')) {
        const err = new Error('Email already registered');
        err.code = 'DUPLICATE_EMAIL';
        throw err;
      }
    }
    throw new Error(extractErrorMessage(error));
  }
};

export const logout = async () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem('refresh_token');
  return { success: true };
};