import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

const MediumLeadContext = createContext();

// Custom hook
export const useMediumLeads = () => useContext(MediumLeadContext);

export const MediumLeadProvider = ({ children }) => {
  const [mediumLeads, setMediumLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔐 Auth config (same as Low & High)
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
  // FETCH MEDIUM LEADS
  // =========================
  const fetchMediumLeads = async () => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.get("/medium", config);
      setMediumLeads(res.data?.leads || []);
    } catch (err) {
      console.error("❌ Fetch medium leads error:", err.message);
      toast.error(
        err.response?.data?.message || "Failed to fetch medium leads"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE MEDIUM LEAD
  // =========================
  const createMediumLead = async (data) => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.post("/medium", data, config);
      toast.success(res.data?.message || "Medium lead added successfully");
      fetchMediumLeads(); // 🔥 always sync from backend
    } catch (err) {
      console.error("❌ Create medium lead error:", err.message);
      toast.error(
        err.response?.data?.message || "Failed to create medium lead"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE MEDIUM LEAD
  // =========================
  const updateMediumLead = async (id, data) => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.put(`/medium/${id}`, data, config);
      toast.success(res.data?.message || "Medium lead updated successfully");
      fetchMediumLeads();
    } catch (err) {
      console.error("❌ Update medium lead error:", err.message);
      toast.error(
        err.response?.data?.message || "Failed to update medium lead"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE MEDIUM LEAD
  // =========================
  const deleteMediumLead = async (id) => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.delete(`/medium/${id}`, config);
      toast.success(res.data?.message || "Medium lead deleted successfully");
      fetchMediumLeads();
    } catch (err) {
      console.error("❌ Delete medium lead error:", err.message);
      toast.error(
        err.response?.data?.message || "Failed to delete medium lead"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD (SAFE)
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("superAdminToken");
    if (token) {
      fetchMediumLeads();
    }
  }, []);

  return (
    <MediumLeadContext.Provider
      value={{
        mediumLeads,
        loading,
        fetchMediumLeads,
        createMediumLead,
        updateMediumLead,
        deleteMediumLead,
      }}
    >
      {children}
    </MediumLeadContext.Provider>
  );
};
