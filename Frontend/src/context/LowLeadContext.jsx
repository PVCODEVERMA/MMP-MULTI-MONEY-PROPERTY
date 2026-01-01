import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

const LowLeadContext = createContext();

// Custom hook
export const useLowLeads = () => useContext(LowLeadContext);

export const LowLeadProvider = ({ children }) => {
  const [lowLeads, setLowLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔐 Auth config helper
  const getAuthConfig = () => {
    const token = localStorage.getItem("superAdminToken");
    if (!token) return null;

    return {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // =========================
  // FETCH LOW LEADS
  // =========================
  const fetchLowLeads = async () => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.get("/low", config);
      setLowLeads(res.data?.leads || []);
    } catch (err) {
      console.error("❌ Fetch low leads error:", err.message);
      toast.error(err.response?.data?.message || "Failed to fetch low leads");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE LOW LEAD
  // =========================
  const createLowLead = async (data) => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.post("/low", data, config);
      toast.success(res.data?.message || "Low lead added successfully");
      fetchLowLeads();
    } catch (err) {
      console.error("❌ Create low lead error:", err.message);
      toast.error(err.response?.data?.message || "Failed to create low lead");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE LOW LEAD
  // =========================
  const updateLowLead = async (id, data) => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.put(`/low/${id}`, data, config);
      toast.success(res.data?.message || "Low lead updated successfully");
      fetchLowLeads();
    } catch (err) {
      console.error("❌ Update low lead error:", err.message);
      toast.error(err.response?.data?.message || "Failed to update low lead");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE LOW LEAD
  // =========================
  const deleteLowLead = async (id) => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.delete(`/low/${id}`, config);
      toast.success(res.data?.message || "Low lead deleted successfully");
      fetchLowLeads();
    } catch (err) {
      console.error("❌ Delete low lead error:", err.message);
      toast.error(err.response?.data?.message || "Failed to delete low lead");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL FETCH (SAFE)
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("superAdminToken");
    if (token) {
      fetchLowLeads();
    }
  }, []);

  return (
    <LowLeadContext.Provider
      value={{
        lowLeads,
        loading,
        fetchLowLeads,
        createLowLead,
        updateLowLead,
        deleteLowLead,
      }}
    >
      {children}
    </LowLeadContext.Provider>
  );
};
