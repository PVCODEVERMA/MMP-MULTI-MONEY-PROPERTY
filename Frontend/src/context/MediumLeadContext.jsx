import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

const MediumLeadContext = createContext();

export const MediumLeadProvider = ({ children }) => {
  const [mediumLeads, setMediumLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all Medium Intent leads
  const fetchMediumLeads = async () => {
    setLoading(true);
    try {
      const res = await api.get("/medium"); // API path matches your route
      setMediumLeads(res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch medium leads");
    } finally {
      setLoading(false);
    }
  };

  // Create a Medium Intent lead
  const createMediumLead = async (data) => {
    try {
      const res = await api.post("/medium", data);
      setMediumLeads(prev => [res.data, ...prev]); // Add new lead to state
      toast.success(res.data.message || "Lead added successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create lead");
    }
  };

  // Update a Medium Intent lead
  const updateMediumLead = async (id, data) => {
    try {
      const res = await api.put(`/medium/${id}`, data);
      setMediumLeads(prev =>
        prev.map(lead => (lead._id === id ? res.data : lead))
      ); // Update state directly
      toast.success(res.data.message || "Lead updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update lead");
    }
  };

  // Delete a Medium Intent lead
  const deleteMediumLead = async (id) => {
    try {
      await api.delete(`/medium/${id}`);
      setMediumLeads(prev => prev.filter(lead => lead._id !== id)); // Remove from state
      toast.success("Lead deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete lead");
    }
  };

  useEffect(() => {
    fetchMediumLeads();
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

// Custom hook
export const useMediumLeads = () => useContext(MediumLeadContext);
