import { createContext, useState, useCallback, useEffect } from "react";
import * as authApi from "../api/authApi";
import { TOKEN_STORAGE_KEY } from "../utils/constants";
import axiosInstance from "../api/axiosInstance";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get('/auth/me/');
          setUser(response.data); // response.data is the user object directly
        } catch (err) {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          setToken(null);
        }
      }
      setIsInitializing(false);
    };
    loadUser();
  }, [token]);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: loggedInUser, token: newToken } = await authApi.login(credentials);
      setUser(loggedInUser);
      setToken(newToken);
      return loggedInUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (details) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: newUser, token: newToken } = await authApi.signup(details);
      setUser(newUser);
      setToken(newToken);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
    setToken(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    isInitializing,
    error,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};