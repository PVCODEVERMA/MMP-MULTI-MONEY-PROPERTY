import React, { useState, useEffect } from "react";
import axios from "../../lib/api";
import { useAuthSubAdmin } from "../../context/AuthContextSubAdmin";
import toast from "react-hot-toast";

const ALLOWED_ROLES = [
  "Developer", "Builder", "Broker", "Channel-Partner"
];

const LeadForm = ({ selectedPlan }) => {
  const { getAllUsers } = useAuthSubAdmin();
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    email: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      const allUsers = data?.users || [];
      setUsers(allUsers);
    };
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Only show users with allowed roles
    const filtered = users.filter(
      u => ALLOWED_ROLES.includes(u.role)
    );
    if (selectedRole) {
      setFilteredUsers(filtered.filter(u => u.role === selectedRole));
    } else {
      setFilteredUsers([]);
    }
    setSelectedEmail("");
    setFormData({ name: "", phone: "", location: "", email: "" });
  }, [selectedRole, users]);

  useEffect(() => {
    if (selectedEmail) {
      const user = filteredUsers.find(u => u.email === selectedEmail);
      if (user) {
        setFormData({
          name: user.fullName || user.name || "",
          phone: user.phone || "",
          location: user.city || "",
          email: user.email || "",
        });
      }
    }
  }, [selectedEmail, filteredUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, planType: selectedPlan, role: selectedRole };
      await axios.post("/api/leads", payload);
      toast.success("Lead submitted successfully!");
      setSelectedRole("");
      setSelectedEmail("");
      setFormData({ name: "", phone: "", location: "", email: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow-md space-y-3">
      {/* Step 1: Select Role */}
      <label className="block font-medium mb-2">Select Role</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={selectedRole}
        onChange={e => setSelectedRole(e.target.value)}
        required
      >
        <option value="">Choose Role</option>
        {ALLOWED_ROLES.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>

      {/* Step 2: Select Email */}
      {selectedRole && (
        <>
          <label className="block font-medium mb-2">Select Email</label>
          <select
            className="w-full border p-2 rounded mb-4"
            value={selectedEmail}
            onChange={e => setSelectedEmail(e.target.value)}
            required
          >
            <option value="">Email</option>
            {filteredUsers.map(u => (
              <option key={u.email} value={u.email}>
                {u.email} ({u.fullName || u.name})
              </option>
            ))}
          </select>
        </>
      )}

   
      {selectedEmail && (
        <>
          <input
            name="name"
            placeholder="[translate:Name]"
            value={formData.name}
            readOnly
            className="w-full border p-2 rounded mb-2"
          />
          <input
            name="phone"
            placeholder="[translate:Phone No]"
            value={formData.phone}
            readOnly
            className="w-full border p-2 rounded mb-2"
          />
          <input
            name="location"
            placeholder="[translate:Location]"
            value={formData.location}
            readOnly
            className="w-full border p-2 rounded mb-2"
          />
          <input
            name="email"
            placeholder="[translate:Email]"
            value={formData.email}
            readOnly
            className="w-full border p-2 rounded mb-2"
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
            Submit Lead
          </button>
        </>
      )}
    </form>
  );
};

export default LeadForm;
