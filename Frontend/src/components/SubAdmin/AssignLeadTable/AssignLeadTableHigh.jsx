import React, { useState, useEffect } from "react";
import api from "../../../lib/api"; 
import toast from "react-hot-toast";

const UserLeadsTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLeads, setUserLeads] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // ------------------------
  // Fetch all users on mount
  // ------------------------
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const res = await api.get("/users"); // API endpoint to fetch all users
        setUsers(res.data?.users || res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch users");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // ------------------------
  // Fetch leads for selected user
  // ------------------------
  useEffect(() => {
    if (!selectedUser) {
      setUserLeads([]);
      return;
    }

    const fetchLeads = async () => {
      setLoadingLeads(true);
      try {
        const res = await api.get(`/high-leads/user/${selectedUser._id}`); // Endpoint: assigned leads
        setUserLeads(res.data?.leads || res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch leads for this user");
      } finally {
        setLoadingLeads(false);
      }
    };

    fetchLeads();
  }, [selectedUser]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Leads</h2>

      {/* User selection dropdown */}
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Select User:</label>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <select
            value={selectedUser?._id || ""}
            onChange={(e) => {
              const user = users.find((u) => u._id === e.target.value);
              setSelectedUser(user);
            }}
            className="border px-3 py-2 rounded w-full md:w-1/2"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullName || user.name} ({user.email})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto mt-6">
        {loadingLeads ? (
          <p>Loading leads...</p>
        ) : userLeads.length === 0 ? (
          <p className="text-gray-500">No leads assigned to this user.</p>
        ) : (
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">WhatsApp</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Property Type</th>
              </tr>
            </thead>
            <tbody>
              {userLeads.map((lead) => (
                <tr key={lead._id} className="border-t">
                  <td className="px-4 py-2 border">{lead.name}</td>
                  <td className="px-4 py-2 border">{lead.phone}</td>
                  <td className="px-4 py-2 border">{lead.whatsappNumber}</td>
                  <td className="px-4 py-2 border">{lead.email}</td>
                  <td className="px-4 py-2 border">{lead.location}</td>
                  <td className="px-4 py-2 border">{lead.propertyType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserLeadsTable;
