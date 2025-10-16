import React from "react";

const dummyLostLeads = [
  {
    id: 401,
    name: "Vikas Sharma",
    phone: "+91 9988771122",
    email: "vikas.sharma@example.com",
    intent: "High",
    property: "Apartment",
    lostDate: "10 Oct 2025",
    assignedTo: "Broker #101",
    reason: "Budget mismatch",
    remarks: "Looking for a lower price"
  },
  {
    id: 402,
    name: "Pooja Saini",
    phone: "+91 9112233445",
    email: "pooja.saini@example.com",
    intent: "Medium",
    property: "Villa",
    lostDate: "11 Oct 2025",
    assignedTo: "Broker #103",
    reason: "Location not preferred",
    remarks: "Prefers Noida location"
  },
  {
    id: 403,
    name: "Sandeep Jha",
    phone: "+91 9877612340",
    email: "sandeep.jha@example.com",
    intent: "Low",
    property: "Plot",
    lostDate: "08 Oct 2025",
    assignedTo: "Broker #102",
    reason: "No response",
    remarks: "Stopped taking calls"
  },
];

const LostLeads = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Lost Leads</h2>
    <table className="min-w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th className="px-3 py-2 border">Name</th>
          <th className="px-3 py-2 border">Phone</th>
          <th className="px-3 py-2 border">Email</th>
          <th className="px-3 py-2 border">Intent</th>
          <th className="px-3 py-2 border">Property</th>
          <th className="px-3 py-2 border">Lost Date</th>
          <th className="px-3 py-2 border">Assigned To</th>
          <th className="px-3 py-2 border">Reason</th>
          <th className="px-3 py-2 border">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {dummyLostLeads.map((lead) => (
          <tr key={lead.id}>
            <td className="px-3 py-2 border">{lead.name}</td>
            <td className="px-3 py-2 border">{lead.phone}</td>
            <td className="px-3 py-2 border">{lead.email}</td>
            <td className="px-3 py-2 border">{lead.intent}</td>
            <td className="px-3 py-2 border">{lead.property}</td>
            <td className="px-3 py-2 border">{lead.lostDate}</td>
            <td className="px-3 py-2 border">{lead.assignedTo}</td>
            <td className="px-3 py-2 border">{lead.reason}</td>
            <td className="px-3 py-2 border">{lead.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LostLeads;
