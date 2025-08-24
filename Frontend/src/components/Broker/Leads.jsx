import React, { useState } from "react";

const dummyLeads = [
  { id: 1, name: "Amit Jain", phone: "9888321110", status: "New", project: "Godrej Greens" },
  { id: 2, name: "Ria Singh", phone: "9123456789", status: "Contacted", project: "DLF Park" },
  { id: 3, name: "Rahul Sharma", phone: "9876543210", status: "Converted", project: "Sobha Elite" },
  { id: 4, name: "Meera Patel", phone: "9123456789", status: "Invalid", project: "Brigade Metropolis" },
];

export default function BrokerLeads() {
  const [leads, setLeads] = useState(dummyLeads);

  const markVerified = (id) => {
    alert(`Marking lead ID ${id} as verified (dummy)`);
    // Optionally update leads state or call API here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">My Leads</h1>
      {leads.length === 0 ? (
        <div className="text-gray-500">No leads found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow border border-gray-300">
            <thead className="bg-blue-100">
              <tr>
                <th className="text-left p-3 border-b border-gray-200">Name</th>
                <th className="text-left p-3 border-b border-gray-200">Phone</th>
                <th className="text-left p-3 border-b border-gray-200">Status</th>
                <th className="text-left p-3 border-b border-gray-200">Project</th>
                <th className="text-left p-3 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-blue-50">
                  <td className="p-3 border-b border-gray-200">{lead.name}</td>
                  <td className="p-3 border-b border-gray-200">{lead.phone}</td>
                  <td className="p-3 border-b border-gray-200">{lead.status}</td>
                  <td className="p-3 border-b border-gray-200">{lead.project}</td>
                  <td className="p-3 border-b border-gray-200 space-x-4">
                    <button
                      onClick={() => markVerified(lead.id)}
                      className="text-green-600 hover:underline font-semibold"
                    >
                      Mark Verified
                    </button>
                    {/* You may add Download or other buttons here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
