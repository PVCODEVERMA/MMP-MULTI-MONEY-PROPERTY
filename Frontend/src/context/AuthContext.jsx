
import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api"; 
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  const [loading, setLoading] = useState(true);

  

  // Fetch logged-in user profile
  const fetchUser = async () => {
    
    if (!accessToken) {
      setLoading(false);
      
      return;
    }
    try {
      const { data } = await api.get("/users/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      setUser(data.user);        
    } catch (err) {
      console.error("Error fetching user profile:", err.response?.data || err.message);
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
      
    }
  };

  useEffect(() => {
    
    fetchUser();
  }, [accessToken]);

  // Handle login
  const login = async (formData) => {
    
    try {
      const res = await api.post("/users/login", formData);
      

      if (res.data.accessToken) {
        setAccessToken(res.data.accessToken);
        localStorage.setItem("accessToken", res.data.accessToken);
       
      }
      if (res.data.user) {
        setUser(res.data.user);
        
      }

      toast.success("Login successful!");
      return res.data;
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // Handle register
  const register = async (formData) => {
   
    try {
      const res = await api.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      

      if (res.data.accessToken) {
        setAccessToken(res.data.accessToken);
        localStorage.setItem("accessToken", res.data.accessToken);
        
      }
      if (res.data.user) {
        setUser(res.data.user);
        
      }

      // toast.success("Registration successful!");
      return res.data;
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Registration failed");
      throw err;
    }
  };

  // Handle logout
  const logout = async () => {
    try {
      await api.post("/users/logout");
      Navigate("/");
    } catch (err) {
      console.error("Logout API error:", err.response?.data || err.message);
    }
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    console.log("User and token removed from state and localStorage");
    toast.success("Logged out successfully!");
  };


  // New: Handle upgradeUserPlan API call
  const upgradeUserPlan = async ({ plan, addOns, role }) => {
    try {
      const res = await api.post(
        "/users/upgrade",
        { plan, addOns, role },
        { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials: true }
      );
      // Update user context with new role and plan from backend
      if (res.data.user) {
        setUser((prev) => ({ ...prev, ...res.data.user }));
      }
      toast.success("Account upgraded successfully");
      return res.data;
    } catch (err) {
      toast.error("Upgrade failed: " + (err.response?.data?.message || err.message));
      throw err;
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        login,
        register,
        logout,
        upgradeUserPlan,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

