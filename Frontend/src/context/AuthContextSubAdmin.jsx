import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../lib/api"; // Axios instance
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ------------------------
// Context & Hook
// ------------------------
const AuthContextSubAdmin = createContext();
export const useAuthSubAdmin = () => useContext(AuthContextSubAdmin);

// ------------------------
// Provider
// ------------------------
export const AuthProviderSubAdmin = ({ children }) => {
  const navigate = useNavigate();

  // ------------------------
  // State
  // ------------------------
  const [subAdmin, setSubAdmin] = useState(null);
  const [subAdminToken, setSubAdminToken] = useState(
    localStorage.getItem("subAdminToken") || null
  );
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // ------------------------
  // Axios interceptor for token
  // ------------------------
  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("subAdminToken");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (err) => Promise.reject(err)
    );
    return () => api.interceptors.request.eject(interceptor);
  }, []);

  // ------------------------
  // Fetch sub-admin profile
  // ------------------------
  const fetchSubAdminProfile = useCallback(async () => {
    if (!subAdminToken) return;
    setLoading(true);
    try {
      const res = await api.get("/subadmin/profile");
      setSubAdmin(res.data.subAdmin);
    } catch (err) {
      console.error("Profile fetch error:", err.response?.data || err.message);
      if (err.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  }, [subAdminToken]);

  // ------------------------
  // Login
  // ------------------------
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/subadmin/login", { email, password });

      if (res.data?.subAdmin?.role === "SubAdmin") {
        const token = res.data.accessToken;
        localStorage.setItem("subAdminToken", token);
        setSubAdminToken(token);
        setSubAdmin(res.data.subAdmin);
        toast.success("Login successful!");
        navigate("/subadmin-dashboard");
      } else {
        toast.error("Unauthorized role");
      }
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // Register
  // ------------------------
  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post("/subadmin/register", formData);
      toast.success("Registration successful!");
      return res.data;
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // Logout
  // ------------------------
  const logout = () => {
    localStorage.removeItem("subAdminToken");
    setSubAdmin(null);
    setSubAdminToken(null);
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 50);
  };

  // ------------------------
  // Get all users
  // ------------------------
  const getAllUsers = useCallback(async () => {
    if (!subAdminToken) return [];
    setLoading(true);
    try {
      const res = await api.get("/users/all-users", {
        headers: { Authorization: `Bearer ${subAdminToken}` },
      });
      const data = res.data?.users || res.data || [];
      setUsers(Array.isArray(data) ? data : []);
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch users");
      return [];
    } finally {
      setLoading(false);
    }
  }, [subAdminToken]);

  // ------------------------
  // Auto fetch profile on token change
  // ------------------------
  useEffect(() => {
    if (subAdminToken && !subAdmin) {
      fetchSubAdminProfile();
    }
  }, [subAdminToken, subAdmin, fetchSubAdminProfile]);

  return (
    <AuthContextSubAdmin.Provider
      value={{
        subAdmin,
        subAdminToken,
        loading,
        users,
        error,
        login,
        register,
        logout,
        fetchSubAdminProfile,
        getAllUsers,
        setSubAdmin,
        isAuthenticated: !!subAdmin,
      }}
    >
      {children}
    </AuthContextSubAdmin.Provider>
  );
};
