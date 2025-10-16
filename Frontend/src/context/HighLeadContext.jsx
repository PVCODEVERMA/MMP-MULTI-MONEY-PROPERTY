import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

const HighLeadContext = createContext();

export const HighLeadProvider = ({ children }) => {
  const [highLeads, setHighLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all High Intent leads
  const fetchHighLeads = async () => {
    setLoading(true);
    try {
      const res = await api.get("/high"); 
      setHighLeads(res.data.leads || []);
    } catch (err) {
      console.error("Fetch high leads error:", err);
      toast.error(err.response?.data?.message || "Failed to fetch high leads");
    } finally {
      setLoading(false);
    }
  };

  // Create a High Intent lead
  const createHighLead = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/high", data); 
      toast.success(res.data.message || "Lead added successfully");
      fetchHighLeads();
    } catch (err) {
      console.error("Create high lead error:", err);
      toast.error(err.response?.data?.message || "Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  // Update a High Intent lead
  const updateHighLead = async (id, data) => {
    setLoading(true);
    try {
      const res = await api.put(`/high/${id}`, data); 
      toast.success(res.data.message || "Lead updated successfully");
      fetchHighLeads();
    } catch (err) {
      console.error("Update high lead error:", err);
      toast.error(err.response?.data?.message || "Failed to update lead");
    } finally {
      setLoading(false);
    }
  };

  // Delete a High Intent lead
  const deleteHighLead = async (id) => {
    setLoading(true);
    try {
      const res = await api.delete(`/high/${id}`); // fixed API path
      toast.success(res.data.message || "Lead deleted successfully");
      fetchHighLeads();
    } catch (err) {
      console.error("Delete high lead error:", err);
      toast.error(err.response?.data?.message || "Failed to delete lead");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighLeads();
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
      }}
    >
      {children}
    </HighLeadContext.Provider>
  );
};

// Custom hook
export const useHighLeads = () => useContext(HighLeadContext);
