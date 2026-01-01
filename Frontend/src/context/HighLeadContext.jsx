import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

// Context
const HighLeadContext = createContext();

// Provider
export const HighLeadProvider = ({ children }) => {
  const [highLeads, setHighLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔐 Get token safely
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
  // FETCH HIGH LEADS
  // =========================
  const fetchHighLeads = async () => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.get("/high", config);
      setHighLeads(res.data?.leads || []);
    } catch (err) {
      console.error("❌ Fetch high leads error:", err.message);
      toast.error(err.response?.data?.message || "Failed to fetch high leads");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE HIGH LEAD
  // =========================
  const createHighLead = async (data) => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.post("/high", data, config);
      toast.success(res.data?.message || "High lead created");
      fetchHighLeads();
    } catch (err) {
      console.error("❌ Create high lead error:", err.message);
      toast.error(err.response?.data?.message || "Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE HIGH LEAD
  // =========================
  const updateHighLead = async (id, data) => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.put(`/high/${id}`, data, config);
      toast.success(res.data?.message || "High lead updated");
      fetchHighLeads();
    } catch (err) {
      console.error("❌ Update high lead error:", err.message);
      toast.error(err.response?.data?.message || "Failed to update lead");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE HIGH LEAD
  // =========================
  const deleteHighLead = async (id) => {
    const config = getAuthConfig();
    if (!config) return;

    setLoading(true);
    try {
      const res = await api.delete(`/high/${id}`, config);
      toast.success(res.data?.message || "High lead deleted");
      fetchHighLeads();
    } catch (err) {
      console.error("❌ Delete high lead error:", err.message);
      toast.error(err.response?.data?.message || "Failed to delete lead");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ASSIGN HIGH LEAD
  // =========================
  const assignHighLead = async (id, assignedTo, assignedRole) => {
    const config = getAuthConfig();
    if (!config) return;

    if (!assignedTo || !assignedRole) {
      toast.error("Assigned user and role required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.put(
        `/high/${id}/assign`,
        { assignedTo, assignedRole },
        config
      );
      toast.success(res.data?.message || "Lead assigned");
      fetchHighLeads();
    } catch (err) {
      console.error("❌ Assign high lead error:", err.message);
      toast.error(err.response?.data?.message || "Failed to assign lead");
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
      fetchHighLeads();
    }
  }, []);

  return (
    <HighLeadContext.Provider
      value={{
        highLeads,
        loading,
        fetchHighLeads,
        createHighLead,
        updateHighLead,
        deleteHighLead,
        assignHighLead,
      }}
    >
      {children}
    </HighLeadContext.Provider>
  );
};

// Custom Hook
export const useHighLeads = () => useContext(HighLeadContext);
