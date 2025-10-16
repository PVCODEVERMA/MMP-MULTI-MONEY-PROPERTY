import React from "react";

const dummyFollowups = [
  {
    id: 201,
    name: "Amit Singh",
    phone: "+91 9111223344",
    email: "amit.singh@example.com",
    intent: "High",
    nextFollowUp: "15 Oct 2025",
    status: "Pending",
    remarks: "Needs price discussion",
    assignedTo: "Broker #101"
  },
  {
    id: 202,
    name: "Divya Patel",
    phone: "+91 9222334455",
    email: "divya.patel@example.com",
    intent: "Medium",
    nextFollowUp: "14 Oct 2025",
    status: "Scheduled",
    remarks: "Requested site visit",
    assignedTo: "Broker #102"
  },
  {
    id: 203,
    name: "Prakash Mehra",
    phone: "+91 9333445566",
    email: "prakash.mehra@example.com",
    intent: "Low",
    nextFollowUp: "16 Oct 2025",
    status: "Pending",
    remarks: "Wants more options",
    assignedTo: "Broker #103"
  },
];

const FollowupLeads = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Follow-up Leads</h2>
    <table className="min-w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th className="px-3 py-2 border">Name</th>
          <th className="px-3 py-2 border">Phone</th>
          <th className="px-3 py-2 border">Email</th>
          <th className="px-3 py-2 border">Intent</th>
          <th className="px-3 py-2 border">Next Follow-up</th>
          <th className="px-3 py-2 border">Status</th>
          <th className="px-3 py-2 border">Remarks</th>
          <th className="px-3 py-2 border">Assigned To</th>
        </tr>
      </thead>
      <tbody>
        {dummyFollowups.map((lead) => (
          <tr key={lead.id}>
            <td className="px-3 py-2 border">{lead.name}</td>
            <td className="px-3 py-2 border">{lead.phone}</td>
            <td className="px-3 py-2 border">{lead.email}</td>
            <td className="px-3 py-2 border">{lead.intent}</td>
            <td className="px-3 py-2 border">{lead.nextFollowUp}</td>
            <td className="px-3 py-2 border">{lead.status}</td>
            <td className="px-3 py-2 border">{lead.remarks}</td>
            <td className="px-3 py-2 border">{lead.assignedTo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FollowupLeads;
