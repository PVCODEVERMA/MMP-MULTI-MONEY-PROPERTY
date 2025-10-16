import React from "react";

const dummyClosedLeads = [
  {
    id: 301,
    name: "Manoj Aggarwal",
    phone: "+91 9876512345",
    email: "manoj.aggarwal@example.com",
    intent: "High",
    property: "Villa",
    closedDate: "10 Oct 2025",
    value: "₹1.8 Crore",
    assignedTo: "Broker #101",
    remarks: "Deal closed successfully"
  },
  {
    id: 302,
    name: "Sneha Bansal",
    phone: "+91 9101122334",
    email: "sneha.bansal@example.com",
    intent: "Medium",
    property: "Apartment",
    closedDate: "12 Oct 2025",
    value: "₹75 Lakh",
    assignedTo: "Broker #102",
    remarks: "Full payment received"
  },
  {
    id: 303,
    name: "Rohit Dubey",
    phone: "+91 9922334455",
    email: "rohit.dubey@example.com",
    intent: "Low",
    property: "Plot",
    closedDate: "09 Oct 2025",
    value: "₹45 Lakh",
    assignedTo: "Broker #103",
    remarks: "Client satisfied"
  },
];

const ClosedLeads = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Closed Leads</h2>
    <table className="min-w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th className="px-3 py-2 border">Name</th>
          <th className="px-3 py-2 border">Phone</th>
          <th className="px-3 py-2 border">Email</th>
          <th className="px-3 py-2 border">Intent</th>
          <th className="px-3 py-2 border">Property</th>
          <th className="px-3 py-2 border">Closed Date</th>
          <th className="px-3 py-2 border">Value</th>
          <th className="px-3 py-2 border">Assigned To</th>
          <th className="px-3 py-2 border">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {dummyClosedLeads.map((lead) => (
          <tr key={lead.id}>
            <td className="px-3 py-2 border">{lead.name}</td>
            <td className="px-3 py-2 border">{lead.phone}</td>
            <td className="px-3 py-2 border">{lead.email}</td>
            <td className="px-3 py-2 border">{lead.intent}</td>
            <td className="px-3 py-2 border">{lead.property}</td>
            <td className="px-3 py-2 border">{lead.closedDate}</td>
            <td className="px-3 py-2 border">{lead.value}</td>
            <td className="px-3 py-2 border">{lead.assignedTo}</td>
            <td className="px-3 py-2 border">{lead.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ClosedLeads;
