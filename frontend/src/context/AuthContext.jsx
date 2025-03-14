import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Set default headers for all axios requests
          axios.defaults.headers.common['x-auth-token'] = token;
          
          // Get user data
          const res = await axios.get('http://localhost:5001/api/users/me');
          
          setUser(res.data);
          setIsAuthenticated(true);
          setError(null);
        } catch (err) {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['x-auth-token'];
          setError(err.response?.data?.message || 'Authentication error');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      
      const res = await axios.post('http://localhost:5001/api/auth/register', formData);
      
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      
      // Get user data
      const userRes = await axios.get('http://localhost:5001/api/users/me');
      
      setUser(userRes.data);
      setIsAuthenticated(true);
      setError(null);
      setLoading(false);
      
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      
      // Get user data
      const userRes = await axios.get('http://localhost:5001/api/users/me');
      
      setUser(userRes.data);
      setIsAuthenticated(true);
      setError(null);
      setLoading(false);
      
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Authentication failed');
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      
      const res = await axios.put('http://localhost:5001/api/users/profile', userData);
      
      setUser(res.data);
      setError(null);
      setLoading(false);
      
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Update failed');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
