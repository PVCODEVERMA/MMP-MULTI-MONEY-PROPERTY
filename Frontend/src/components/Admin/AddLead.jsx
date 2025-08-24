import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

const initialLeads = [
  { id: 1, name: "Jay Mehta", phone: "9123456789", city: "Ahmedabad", status: "New" },
  { id: 2, name: "Riya Kothari", phone: "9887766554", city: "Surat", status: "Contacted" },
  { id: 3, name: "Rohan Shah", phone: "9977554433", city: "Vadodara", status: "Converted" },
];

export default function AddLead() {
  const [leads, setLeads] = useState(initialLeads);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", city: "", status: "New" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setForm({ name: "", phone: "", city: "", status: "New" });
    setEditing(null);
  };

  const handleEdit = (lead) => {
    setEditing(lead.id);
    setForm({ name: lead.name, phone: lead.phone, city: lead.city, status: lead.status });
  };

  const handleSave = () => {
    if (form.name && form.phone && form.city) {
      if (editing) {
        // Edit existing
        setLeads((prev) =>
          prev.map((l) =>
            l.id === editing ? { ...l, ...form } : l
          )
        );
        setEditing(null);
      } else {
        // Add new
        setLeads((prev) => [
          ...prev,
          { id: Date.now(), ...form }
        ]);
      }
      setForm({ name: "", phone: "", city: "", status: "New" });
    }
  };

  const handleDelete = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
    if (editing === id) setEditing(null);
  };

  return (
    <section className=" mx-auto mt-10 bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <PlusIcon className="w-6 h-6 mr-2 text-indigo-500" />
        Manage Leads (Add, Edit, Delete)
      </h2>

      {/* Add/Edit Form */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg border">
        <div className="grid md:grid-cols-4 gap-4 mb-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-2 rounded font-semibold transition"
          >
            {editing ? "Save Changes" : "Add Lead"}
          </button>
          {editing && (
            <button
              onClick={handleAdd}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded font-semibold transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Lead List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">City</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className={`border-b transition group ${editing === lead.id ? "bg-blue-50" : ""}`}
              >
                <td className="py-2 px-4">{lead.name}</td>
                <td className="py-2 px-4">{lead.phone}</td>
                <td className="py-2 px-4">{lead.city}</td>
                <td className={`py-2 px-4 ${lead.status === "Converted" ? "text-green-600 font-semibold" :
                  lead.status === "Contacted" ? "text-orange-500 font-semibold" : ""}`}>
                  {lead.status}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    title="Edit"
                    onClick={() => handleEdit(lead)}
                    className="p-1 rounded hover:bg-blue-50 transition"
                  >
                    <PencilSquareIcon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition" />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDelete(lead.id)}
                    className="p-1 rounded hover:bg-red-50 transition"
                  >
                    <TrashIcon className="w-5 h-5 text-red-500 group-hover:scale-110 transition" />
                  </button>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-8">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
