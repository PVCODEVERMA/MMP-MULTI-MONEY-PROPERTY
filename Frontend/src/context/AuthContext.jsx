import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      
      // Don't redirect if we're already on auth pages
      if (!window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/register') &&
          !window.location.pathname.includes('/forgot-password')) {
        toast.error('Session expired. Please login again.');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  // Role-based route mapping
  const getRoleRoute = (role) => {
    const routes = {
      superadmin: '/super-admin',
      subadmin: '/sub-admin',
      broker: '/broker',
      user: '/dashboard'
    };
    return routes[role] || '/dashboard';
  };

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        try {
          // Verify token is still valid
          const response = await api.get('/auth/me');
          if (response.data.success) {
            setUser(response.data.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
          }
        } catch (verifyError) {
          console.log('Token verification failed:', verifyError.message);
          // If token verification fails, user can still use the app with cached data
          // but they might need to re-login for protected actions
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  // Clear all auth data
  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  // Login function with enhanced error handling
  const login = async (email, password) => {
    setAuthLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { user, token, refreshToken } = response.data.data;
        
        // Store auth data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        
        setUser(user);
        setIsAuthenticated(true);
        
        console.log(` User logged in: ${user.email} (${user.role})`);
        toast.success(response.data.message || `Welcome back, ${user.name}!`);
        
        return { 
          success: true, 
          message: response.data.message,
          data: { user, token, defaultRoute: getRoleRoute(user.role) }
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { 
        success: false, 
        message: errorMessage,
        errors: error.response?.data?.errors || []
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Register function with role support
  const register = async (formData) => {
    setAuthLoading(true);
    setError(null);
    
    try {
      // Determine content type based on formData
      const headers = formData instanceof FormData 
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' };
      
      const response = await api.post('/auth/register', formData, { headers });
      
      if (response.data.success) {
        const { user, token, refreshToken } = response.data.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        
        setUser(user);
        setIsAuthenticated(true);
        
        console.log(`✅ User registered: ${user.email} (${user.role})`);
        toast.success(response.data.message || `Welcome, ${user.name}!`);
        
        return { 
          success: true, 
          message: response.data.message,
          data: { user, token, defaultRoute: getRoleRoute(user.role) }
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { 
        success: false, 
        message: errorMessage,
        errors: error.response?.data?.errors || []
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Register broker function
  const registerBroker = async (formData) => {
    setAuthLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth/register-broker', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        const { user, token, refreshToken } = response.data.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        
        setUser(user);
        setIsAuthenticated(true);
        
        console.log(`✅ Broker registered: ${user.email}`);
        toast.success(response.data.message || `Welcome, Broker ${user.name}!`);
        
        return { 
          success: true, 
          message: response.data.message,
          data: { user, token, defaultRoute: '/broker' }
        };
      }
    } catch (error) {
      console.error('Broker registration error:', error);
      const errorMessage = error.response?.data?.message || 'Broker registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { 
        success: false, 
        message: errorMessage,
        errors: error.response?.data?.errors || []
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (formData) => {
    setAuthLoading(true);
    setError(null);
    
    try {
      const headers = formData instanceof FormData 
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' };
      
      const response = await api.put('/users/profile', formData, { headers });
      
      if (response.data.success) {
        const updatedUser = response.data.data.user;
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        toast.success('Profile updated successfully!');
        
        return { 
          success: true, 
          message: response.data.message,
          data: { user: updatedUser }
        };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error.response?.data?.message || 'Profile update failed.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { 
        success: false, 
        message: errorMessage,
        errors: error.response?.data?.errors || []
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setAuthLoading(true);
    
    try {
      await api.post('/auth/logout');
      console.log('✅ User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if server request fails
    } finally {
      clearAuthData();
      setAuthLoading(false);
      toast.success('Logged out successfully!');
    }
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    setAuthLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth/forgot-password', { email });
      
      toast.success(response.data.message || 'Password reset instructions sent to your email.');
      
      return { 
        success: true, 
        message: response.data.message,
        data: response.data.data 
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send reset email. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token, password) => {
    setAuthLoading(true);
    setError(null);
    
    try {
      const response = await api.put(`/auth/reset-password/${token}`, { password });
      
      if (response.data.success) {
        const { user, token: newToken, refreshToken } = response.data.data;
        
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(user));
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        
        setUser(user);
        setIsAuthenticated(true);
        
        toast.success('Password reset successful! You are now logged in.');
        
        return { 
          success: true, 
          message: response.data.message,
          data: { user, token: newToken, defaultRoute: getRoleRoute(user.role) }
        };
      }
    } catch (error) {
      console.error('Reset password error:', error);
      const errorMessage = error.response?.data?.message || 'Password reset failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Change password (for authenticated users)
  const changePassword = async (currentPassword, newPassword) => {
    setAuthLoading(true);
    setError(null);
    
    try {
      const response = await api.put('/auth/update-password', {
        currentPassword,
        newPassword
      });
      
      if (response.data.success) {
        toast.success('Password changed successfully!');
        
        return { 
          success: true, 
          message: response.data.message 
        };
      }
    } catch (error) {
      console.error('Change password error:', error);
      const errorMessage = error.response?.data?.message || 'Password change failed.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await api.post('/auth/refresh-token', { refreshToken });
      
      if (response.data.success) {
        const { token, refreshToken: newRefreshToken } = response.data.data;
        
        localStorage.setItem('token', token);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }
        
        return { success: true, token };
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearAuthData();
      return { success: false };
    }
  };

  // Verify email
  const verifyEmail = async (token) => {
    setAuthLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      
      if (response.data.success && user) {
        // Update user's email verification status
        const updatedUser = { ...user, isEmailVerified: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast.success('Email verified successfully!');
      }
      
      return { 
        success: true, 
        message: response.data.message 
      };
    } catch (error) {
      console.error('Email verification error:', error);
      const errorMessage = error.response?.data?.message || 'Email verification failed.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Resend email verification
  const resendEmailVerification = async () => {
    setAuthLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth/resend-verification');
      
      toast.success(response.data.message || 'Verification email sent successfully!');
      
      return { 
        success: true, 
        message: response.data.message 
      };
    } catch (error) {
      console.error('Resend verification error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send verification email.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  // Check if user has permission
  const hasPermission = (permission) => {
    return user?.permissions?.[permission] === true;
  };

  // Get user's role-based dashboard URL
  const getDashboardUrl = () => {
    return user ? getRoleRoute(user.role) : '/login';
  };

  const value = {
    // State
    user,
    loading,
    isAuthenticated,
    authLoading,
    error,
    
    // Auth functions
    login,
    register,
    registerBroker,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    refreshToken,
    verifyEmail,
    resendEmailVerification,
    updateProfile,
    checkAuth,
    
    // Utility functions
    hasRole,
    hasAnyRole,
    hasPermission,
    getDashboardUrl,
    getRoleRoute,
    clearAuthData,
    
    // API instance for other components
    api
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
