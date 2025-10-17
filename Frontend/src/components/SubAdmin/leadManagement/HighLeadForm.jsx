import React, { useState } from "react";
import { useHighLeads } from "../../../context/HighLeadContext";
import { useAuthSubAdmin } from "../../../context/AuthContextSubAdmin"; 

const HighLeadForm = () => {
  const { highLeads, createHighLead, updateHighLead, deleteHighLead, assignHighLead} = useHighLeads();
  const { getAllUsers } = useAuthSubAdmin();
  

  const initialForm = {
    name: "",
    phone: "",
    whatsappNumber: "",
    email: "",
    location: "",
    propertyType: "",
    status: "new",
    reminder: "",
    bukitProperty: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [showPopup, setShowPopup] = useState(false);
  const [editId, setEditId] = useState(null);

  // States for Assign Lead feature
  
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [assignUsers, setAssignUsers] = useState([]);

  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [assignLeadId, setAssignLeadId] = useState(null);
  const [roleFilter, setRoleFilter] = useState("all");

  // Assign Lead Handler
  const handleAssign = async (lead) => {
  setShowAssignPopup(true);
  setAssignLeadId(lead._id);
  setAssignLoading(true);
  setAssignError("");
  setSelectedUser("");
  setRoleFilter("all");
  try {
    const data = await getAllUsers();
    console.log(data)
    const usersData = data?.users || data?.data?.users || data || [];
    setAssignUsers(Array.isArray(usersData) ? usersData : []);
  } catch (e) {
    setAssignError("Failed to load users for assignment.");
    setAssignUsers([]);
  }
  setAssignLoading(false);
};


const assignLeadToUser = async (leadId, userId) => {
  if (!leadId || !userId) return;

  if (window.confirm("Are you sure you want to assign this lead to this user?")) {
    try {
      // Find the role of the selected user
      const selectedUserObj = assignUsers.find(u => u._id === userId);
      const assignedRole = selectedUserObj?.role;

      // Call context API to assign lead
      await assignHighLead(leadId, userId, assignedRole);
      toast.success("Lead assigned successfully");
      setTimeout(() => setShowPopup(false), 800);

      // Remove assigned user from the list
      setAssignUsers(prev => prev.filter(u => u._id !== userId));

      // Reset selected user
      setSelectedUser("");

    } catch (err) {
      console.error("Assign Lead Error:", err);
      toast.error("Failed to assign lead");
    }
  }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateHighLead(editId, formData);
    } else {
      createHighLead(formData);
    }
    setFormData(initialForm);
    setShowPopup(false);
    setEditId(null);
  };

  const handleEdit = (lead) => {
    setFormData({
      name: lead.name,
      phone: lead.phone,
      whatsappNumber: lead.whatsappNumber,
      email: lead.email,
      location: lead.location,
      propertyType: lead.propertyType,
      status: lead.status,
      reminder: lead.reminder ? lead.reminder.split("T")[0] : "",
      bukitProperty: lead.bukitProperty,
    });
    setEditId(lead._id);
    setShowPopup(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "contacted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "sold":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-10 p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#154056]">High Intent Leads</h1>
        <button
          onClick={() => {
            setShowPopup(true);
            setFormData(initialForm);
            setEditId(null);
          }}
          className="bg-[#ff9c00] hover:bg-[#e68a00] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
        >
          Add High Lead
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {highLeads.map((lead) => (
          <div
            key={lead._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-[#154056] text-white p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold truncate">{lead.name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>
              </div>
              <p className="text-sm text-gray-200 mt-1 truncate">{lead.email}</p>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-5">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">{lead.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">{lead.whatsappNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">{lead.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">{lead.propertyType}</span>
              </div>
              {lead.reminder && (
                <div className="flex items-center space-x-2">
                  <div className="w-5">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">
                    {new Date(lead.reminder).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <div className="w-5">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">{lead.bukitProperty}</span>
              </div>
            </div>
            {/* Card Footer */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleAssign(lead)}
                  className="text-green-600 hover:text-green-800 font-medium text-sm transition-colors duration-200 cursor-pointer px-3 py-1 rounded-md hover:bg-green-50"
                >
                  Assign Lead
                </button>
                <button
                  onClick={() => handleEdit(lead)}
                  className="text-[#154056] hover:text-white font-medium text-sm transition-colors duration-200 cursor-pointer px-3 py-1 rounded-md hover:bg-[#154056] hover:bg-opacity-5"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this lead?")) {
                      deleteHighLead(lead._id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors duration-200 cursor-pointer px-3 py-1 rounded-md hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {highLeads.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-[#f7f7f7] rounded-2xl p-8 max-w-md mx-auto">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No leads found
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first high intent lead.
            </p>
            <button
              onClick={() => {
                setShowPopup(true);
                setFormData(initialForm);
                setEditId(null);
              }}
              className="bg-[#ff9c00] hover:bg-[#e68a00] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 cursor-pointer"
            >
              Add Your First Lead
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#154056]">
                {editId ? "Edit High Lead" : "Add High Lead"}
              </h2>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditId(null);
                }}
                className="text-[#ff9c00] hover:text-[#154056] text-xl cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all duration-200" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all duration-200" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                  <input type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="Enter WhatsApp number" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all duration-200" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all duration-200" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter location" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all duration-200" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <input type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} placeholder="Enter property type" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all duration-200" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reminder</label>
                  <input type="date" name="reminder" value={formData.reminder} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all duration-200" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Budget</label>
                  <input type="text" name="bukitProperty" value={formData.bukitProperty} onChange={handleChange} placeholder="Enter Property Budget" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all duration-200" required />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={() => { setShowPopup(false); setEditId(null); }} className="px-6 py-3 bg-gray-300 hover:text-white text-gray-700 rounded-lg font-semibold transition-all duration-200 cursor-pointer hover:bg-red-600">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-[#ff9c00] hover:bg-[#154056] text-white rounded-lg font-semibold transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg">{editId ? "Update Lead" : "Add Lead"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

     {/* Assign Lead Popup */}
      {showAssignPopup && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 text-center">Assign Lead</h2>
            {assignLoading ? (
              <div>Loading users...</div>
            ) : (
              <>
                <label className="block text-sm mb-2">Filter by Role</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full mb-7 border px-3 py-2 rounded cursor-pointer"
                >
                  <option value="all">All Roles</option>
                  <option value="developer">Developer</option>
                  <option value="builder">Builder</option>
                  <option value="broker">Broker</option>
                  <option value="channel-partner">Channel-Partner</option>
                  
                </select>
                
                <select
                  className="w-full mb-4 border px-3 py-2 rounded cursor-pointer"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Select a user</option>
                  {assignUsers
                    .filter(
                      (u) =>
                        roleFilter === "all" ||
                        (u.role && u.role.toLowerCase() === roleFilter) ||
                        (roleFilter === "user" &&
                          (!u.role ||
                            u.role.toLowerCase() === "customer" ||
                            u.role.toLowerCase() === "user"))
                    )
                    .map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.fullName || u.name || "Unknown"} ({u.email})
                      </option>
                    ))}
                </select>
                {assignError && <div className="text-red-600 mb-2">{assignError}</div>}
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setShowAssignPopup(false)} className="bg-gray-300 px-4 py-2 rounded cursor-pointer">
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      await assignLeadToUser(assignLeadId, selectedUser);
                      setShowAssignPopup(false);
                    }}
                    disabled={!selectedUser}
                    className="bg-[#ff9c00] text-white px-4 py-2 rounded cursor-pointer"
                  >
                    Assign to Post
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default HighLeadForm;
