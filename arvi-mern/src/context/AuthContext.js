import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('arvi_token');
      const savedUser = localStorage.getItem('arvi_user');

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          // Verify token still valid
          const response = await authAPI.getMe();
          setUser(response.data.data);
          localStorage.setItem('arvi_user', JSON.stringify(response.data.data));
        } catch (err) {
          console.warn('Token invalid, clearing auth');
          localStorage.removeItem('arvi_token');
          localStorage.removeItem('arvi_user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authAPI.login({ email, password });
      const { token, ...userData } = response.data.data;
      
      localStorage.setItem('arvi_token', token);
      localStorage.setItem('arvi_user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await authAPI.register({ name, email, password });
      const { token, ...userData } = response.data.data;
      
      localStorage.setItem('arvi_token', token);
      localStorage.setItem('arvi_user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('arvi_token');
    localStorage.removeItem('arvi_user');
    setUser(null);
  };

  const updateProfile = async (data) => {
    try {
      const response = await authAPI.updateProfile(data);
      const updatedUser = response.data.data;
      setUser(updatedUser);
      localStorage.setItem('arvi_user', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (err) {
      const message = err.response?.data?.message || 'Update failed';
      return { success: false, message };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
