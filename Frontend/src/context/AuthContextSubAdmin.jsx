
import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
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
  const [subAdmin, setSubAdmin] = useState(null);
  const [subAdminToken, setSubAdminToken] = useState(
    localStorage.getItem("subAdminToken")
  );
  
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ------------------------
  // Axios interceptor for attaching token
  // ------------------------
  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("subAdminToken");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => api.interceptors.request.eject(interceptor);
  }, []);

  // ------------------------
  // Fetch SubAdmin profile
  // ------------------------
let profileFetchTimeout;
const fetchSubAdminProfile = async () => {
  if (!subAdminToken) return;
  if (profileFetchTimeout) clearTimeout(profileFetchTimeout);

  profileFetchTimeout = setTimeout(async () => {
    try {
      const res = await api.get("/subadmin/profile");
      setSubAdmin(res.data.subAdmin);
    } catch (err) {
      console.error("Profile fetch error:", err.response?.data || err.message);
      if (err.response?.status === 401) logout();
    }
  }, 300); // 300ms delay
};


  // ------------------------
  // Login
  // ------------------------
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/subadmin/login", { email, password });

      if (res.data?.subAdmin?.role === "SubAdmin") {
        localStorage.setItem("subAdminToken", res.data.accessToken);
        setSubAdminToken(res.data.accessToken);
        setSubAdmin(res.data.subAdmin);
        toast.success("Login successful");
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
    setTimeout(() => {
    navigate("/");
  }, 50);
  };

    // Get all users (admin only)
    const getAllUsers = async () => {
       if (!subAdminToken) {
    console.warn(" No sub-admin token found. Skipping profile fetch.");
    return;
  }
      try {
        const res = await api.get("/users/all-users", {
          headers: { Authorization: `Bearer ${subAdminToken}` }
        });
        return res.data; 
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch users");
        throw err;
      }
    };
  // ------------------------
  // Auto fetch profile when token changes
  // ------------------------
 useEffect(() => {
  const token = localStorage.getItem("subAdminToken");
  if (token && !subAdmin) {
    
    fetchSubAdminProfile();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  return (
    <AuthContextSubAdmin.Provider
      value={{
        subAdmin,
        subAdminToken,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!subAdmin,
        fetchSubAdminProfile,
        setSubAdmin,
        getAllUsers
      }}
    >
      {children}
    </AuthContextSubAdmin.Provider>
  );
};
