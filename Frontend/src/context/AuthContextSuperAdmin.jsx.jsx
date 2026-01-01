import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Create context
const AuthContextSuperAdmin = createContext();

// Provider
export function AuthProviderSuperAdmin({ children }) {
  const [superAdmin, setSuperAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //  Utility: Normalize role
  const normalizeRole = (role) =>
    role ? role.toString().trim().toLowerCase().replace(/[_-]/g, "") : "";

  // Fetch profile if token exists
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const token = localStorage.getItem("superAdminToken");
  //     try {
  //       const res = await api.get("/superadmin/profile", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       const backendRole = normalizeRole(res.data?.superAdmin?.role);
  //       if (backendRole === "superadmin") {
  //         setSuperAdmin(res.data.superAdmin);
  //       } else {
  //         toast.error("Unauthorized role. Logging out...");
  //         logout();
  //       }
  //     } catch (err) {
  //       console.error("🚨 Profile fetch error:", err.response?.data || err.message);
  //       toast.error(err.response?.data?.message || "Failed to fetch profile");
  //       logout();
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  useEffect(() => {
  const token = localStorage.getItem("superAdminToken");
  if (!token) {
    setLoading(false);
    return;
  }

  const fetchProfile = async () => {
    try {
      const res = await api.get("/superadmin/profile", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuperAdmin(res.data.superAdmin);
    } catch (err) {
      console.error("Profile fetch failed");
      localStorage.removeItem("superAdminToken");
      setSuperAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []); // ✅ empty dependency


  //  Login handler
  const login = async (email, password) => {
    try {
      const res = await api.post("/superadmin/login", { email, password });

      const backendRole = normalizeRole(res.data?.superAdmin?.role);
      if (res.data?.accessToken && backendRole === "superadmin") {

        localStorage.setItem("superAdminToken", res.data.accessToken);
        setSuperAdmin(res.data.superAdmin);
        return res.data;
      } else {
        toast.error("Forbidden: role mismatch");
        throw new Error("Forbidden: role mismatch");
      }
    } catch (err) {
      console.error("🚨 Login failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  //  Register handler
  const register = async (formData) => {
    try {
      const res = await api.post("/superadmin/register", formData);
      toast.success("SuperAdmin registered successfully!");
      return res.data;
    } catch (err) {
      console.error("🚨 Register failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Registration failed");
      throw err;
    }
  };

  //  Logout handler
  const logout = () => {
    localStorage.removeItem("superAdminToken");
    setSuperAdmin(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContextSuperAdmin.Provider
      value={{ superAdmin, loading, login, logout, register }}
    >
      {children}
    </AuthContextSuperAdmin.Provider>
  );
}

// Hook for easy usage
export const useAuthSuperAdmin = () => useContext(AuthContextSuperAdmin);
