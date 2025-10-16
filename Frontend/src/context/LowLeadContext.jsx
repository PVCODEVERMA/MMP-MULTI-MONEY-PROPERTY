import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

const LowLeadContext = createContext();

export const LowLeadProvider = ({ children }) => {
  const [lowLeads, setLowLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Fetch all low leads
  const fetchLowLeads = async () => {
    setLoading(true);
    try {
      const res = await api.get("/low");
      setLowLeads(res.data.leads || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch low leads");
    } finally {
      setLoading(false);
    }
  };

  //  Create new low lead
  const createLowLead = async (data) => {
    try {
      const res = await api.post("/low", data);
      toast.success(res.data.message || "Lead added successfully");
      fetchLowLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create lead");
    }
  };

  //  Update low lead
  const updateLowLead = async (id, data) => {
    try {
      const res = await api.put(`/low/${id}`, data);
      toast.success(res.data.message || "Lead updated successfully");
      fetchLowLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update lead");
    }
  };

  //  Delete low lead
  const deleteLowLead = async (id) => {
    try {
      const res = await api.delete(`/low/${id}`);
      toast.success(res.data.message || "Lead deleted successfully");
      fetchLowLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete lead");
    }
  };

  useEffect(() => {
    fetchLowLeads();
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

//  Custom hook
export const useLowLeads = () => useContext(LowLeadContext);
