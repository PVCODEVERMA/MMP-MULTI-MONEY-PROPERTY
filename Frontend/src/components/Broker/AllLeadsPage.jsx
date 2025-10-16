import React from "react";

const dummyLeads = [
  {
    id: 1,
    name: "Pankaj Verma",
    phone: "+91 9876543210",
    email: "pankaj@example.com",
    PropertyType: "",
    Budget: "",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    phone: "+91 9123456780",
    email: "rahul@example.com",
    PropertyType: "",
    Budget: "",
  },
  {
    id: 3,
    name: "Anita Singh",
    phone: "+91 9988776655",
    email: "anita@example.com",
    PropertyType: "",
    Budget: "",
  },
];

const AllLeads = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Leads</h2>
      <input
        type="text"
        className="border border-gray-300 px-3 py-2 rounded mb-4 w-full"
        placeholder="Search by name, phone or email..."
        disabled
      />
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Phone</th>
            <th className="px-4 py-2 border-b text-left">Email</th>
            <th className="px-4 py-2 border-b text-left">PropertyType</th>
            <th className="px-4 py-2 border-b text-left">Budget</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyLeads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{lead.name}</td>
              <td className="px-4 py-2 border-b">{lead.phone}</td>
              <td className="px-4 py-2 border-b">{lead.email}</td>
              <td className="px-4 py-2 border-b">{lead.intent}</td>
              <td className="px-4 py-2 border-b">{lead.assignedTo}</td>
              <td className="px-4 py-2 border-b">{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllLeads;
