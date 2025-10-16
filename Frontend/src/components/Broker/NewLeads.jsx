import React from "react";

const dummyNewLeads = [
  {
    id: 101,
    name: "Saurabh Jain",
    phone: "+91 9001122334",
    email: "saurabh@example.com",
    intent: "Medium",
    createdAt: "14 Oct 2025",
    source: "Website",
    remarks: "Requested callback",
  },
  {
    id: 102,
    name: "Neha Rawat",
    phone: "+91 9898989898",
    email: "neha@example.com",
    intent: "High",
    createdAt: "13 Oct 2025",
    source: "Whatsapp",
    remarks: "Interested in 3BHK flat",
  },
  {
    id: 103,
    name: "Ajay Gupta",
    phone: "+91 9911223344",
    email: "ajay@example.com",
    intent: "Low",
    createdAt: "13 Oct 2025",
    source: "Referral",
    remarks: "First enquiry",
  },
];

const NewLeads = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">New Leads</h2>
    <table className="min-w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th className="px-3 py-2 border">Name</th>
          <th className="px-3 py-2 border">Phone</th>
          <th className="px-3 py-2 border">Email</th>
          <th className="px-3 py-2 border">Intent</th>
          <th className="px-3 py-2 border">Source</th>
          <th className="px-3 py-2 border">Created At</th>
          <th className="px-3 py-2 border">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {dummyNewLeads.map((lead) => (
          <tr key={lead.id}>
            <td className="px-3 py-2 border">{lead.name}</td>
            <td className="px-3 py-2 border">{lead.phone}</td>
            <td className="px-3 py-2 border">{lead.email}</td>
            <td className="px-3 py-2 border">{lead.intent}</td>
            <td className="px-3 py-2 border">{lead.source}</td>
            <td className="px-3 py-2 border">{lead.createdAt}</td>
            <td className="px-3 py-2 border">{lead.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default NewLeads;
