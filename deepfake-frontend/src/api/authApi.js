import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "../utils/constants";

// --- MOCK MODE ---
// Backend isn't ready yet, so these simulate network latency and return
// a shape identical to what Express/JWT will eventually send back.
// Swap the body of each function for the commented axios call when ready.
const MOCK_DELAY = 700;
const MOCK_USER = { id: "u_001", fullName: "Lalit Nath", email: "demo@dfd.app" };

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const login = async ({ email, password }) => {
  // return axiosInstance.post(ENDPOINTS.LOGIN, { email, password }).then((res) => res.data);

  await delay(MOCK_DELAY);
  if (email === "demo@dfd.app" && password === "password123") {
    return { user: MOCK_USER, token: "mock.jwt.token" };
  }
  const error = new Error("Invalid email or password");
  error.code = "INVALID_CREDENTIALS";
  throw error;
};

export const signup = async ({ fullName, email, password }) => {
  // return axiosInstance.post(ENDPOINTS.SIGNUP, { fullName, email, password }).then((res) => res.data);

  await delay(MOCK_DELAY);
  return { user: { id: "u_new", fullName, email }, token: "mock.jwt.token" };
};

export const logout = async () => {
  // return axiosInstance.post(ENDPOINTS.LOGOUT).then((res) => res.data);

  await delay(200);
  return { success: true };
};
