import { createContext, useState, useCallback } from "react";
import * as authApi from "../api/authApi";
import { TOKEN_STORAGE_KEY } from "../utils/constants";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: loggedInUser, token: newToken } = await authApi.login(credentials);
      localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
      setUser(loggedInUser);
      setToken(newToken);
      return loggedInUser;
    } catch (err) {
      setError(err.message || "Login failed");
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
      localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
      setUser(newUser);
      setToken(newToken);
      return newUser;
    } catch (err) {
      setError(err.message || "Signup failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
    setToken(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    isLoading,
    error,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
