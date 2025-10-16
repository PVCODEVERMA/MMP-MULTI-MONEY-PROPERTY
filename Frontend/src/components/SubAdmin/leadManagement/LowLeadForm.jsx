import React, { useState, useEffect } from "react";
import { useLowLeads } from "../../../context/LowLeadContext";
import toast from "react-hot-toast";

const LowLeadForm = () => {
  const { lowLeads, loading, createLowLead, updateLowLead, deleteLowLead } =
    useLowLeads();

  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [editLeadId, setEditLeadId] = useState(null);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ---------------- CREATE OR UPDATE LEAD ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editLeadId) {
        await updateLowLead(editLeadId, formData);
      } else {
        await createLowLead(formData);
      }
      setFormData({ name: "", phone: "", email: "" });
      setShowFormPopup(false);
      setEditLeadId(null);
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------- DELETE LEAD ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteLowLead(id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete lead");
    }
  };

  // ---------------- EDIT LEAD ----------------
  const handleEdit = (lead) => {
    setFormData({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
    });
    setEditLeadId(lead._id);
    setShowFormPopup(true);
  };

  // ---------------- UI ----------------
  return (
    <div className="max-w-7xl mt-10 mb-10 p-4">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Low Intent Leads</h1>
          <p className="text-gray-600 mt-2">
            Manage and track all low intent leads
          </p>
        </div>
        <button
          onClick={() => {
            setShowFormPopup(true);
            setEditLeadId(null);
            setFormData({ name: "", phone: "", email: "" });
          }}
          className="bg-gradient-to-r from-[#154056] to-[#1e5a7a] hover:from-[#ff9c00] hover:to-[#ff9c00] text-white font-semibold py-3 px-6 rounded-lg shadow-lg cursor-pointer"
        >
          Add Low Intent Lead
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-[#154056] to-[#1e5a7a] p-6 text-white">
          <h2 className="text-xl font-bold">All Low Intent Leads</h2>
          <p className="text-blue-100 mt-1">Total {lowLeads.length} leads</p>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff9c00]"></div>
            </div>
          ) : lowLeads.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">{lead.name}</td>
                    <td className="px-6 py-4">{lead.phone}</td>
                    <td className="px-6 py-4">{lead.email}</td>
                    <td className="px-6 py-4">
                      {lead.status === "new" && (
                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                          New
                        </span>
                      )}
                      {lead.status === "contacted" && (
                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Contacted
                        </span>
                      )}
                      {lead.status === "sold" && (
                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                          Sold
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleEdit(lead)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-6">
              No leads found. Add your first low intent lead!
            </p>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {showFormPopup && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editLeadId ? "Edit Low Intent Lead" : "Add Low Intent Lead"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowFormPopup(false);
                    setEditLeadId(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#154056] to-[#1e5a7a] text-white cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LowLeadForm;
