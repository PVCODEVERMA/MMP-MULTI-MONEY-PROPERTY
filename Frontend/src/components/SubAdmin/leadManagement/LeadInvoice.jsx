import React from "react";

const LowLeadInvoice = () => {
  const leads = [
    {
      id: 1,
      name: "John Doe",
      phone: "+91 99999 99999",
      email: "john@example.com",
      location: "Delhi NCR",
      propertyType: "Apartment",
      planType: "High Intent",
      status: "Active",
      assignedTo: "Developer",
      lastInteraction: "2024-01-15",
      value: "₹75 Lakhs"
    },
    {
      id: 4,
      name: "Anita Desai",
      phone: "+91 66666 66666",
      email: "anita@example.com",
      location: "Hyderabad",
      propertyType: "Apartment",
      planType: "Low Intent",
      status: "Active",
      assignedTo: "Builder(Pankaj verma)",
      lastInteraction: "2024-01-12",
      value: "₹50 Lakhs"
    },
    {
      id: 7,
      name: "Arun Mehta",
      phone: "+91 33333 33333",
      email: "arun@example.com",
      location: "Chennai",
      propertyType: "Apartment",
      planType: "Low Intent",
      status: "Closed",
      assignedTo: "Channel Partner(Pankaj Verma)",
      lastInteraction: "2024-01-09",
      value: "₹65 Lakhs"
    },
    {
      id: 10,
      name: "Neha Gupta",
      phone: "+91 00000 00000",
      email: "neha@example.com",
      location: "Mumbai",
      propertyType: "Villa",
      planType: "Low Intent",
      status: "Active",
      assignedTo: "Broker(Pankaj)",
      lastInteraction: "2024-01-06",
      value: "₹1.5 Cr"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-[#ff9c00] bg-opacity-20 text-[#b37300]";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-10 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
     

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Lead Info</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Property Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Assigned To</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Interaction</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads
              .filter(lead => lead.planType === "Low Intent")
              .map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                      <div className="text-sm text-blue-600">{lead.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{lead.location}</td>
                  <td className="px-6 py-4">{lead.propertyType}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                        lead.status === "Active" ? "bg-[#ff9c00]" :
                        lead.status === "Pending" ? "bg-[#ff9c00]" : "bg-gray-500"
                      }`}></div>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{lead.assignedTo}</td>
                  <td className="px-6 py-4">{lead.lastInteraction}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{lead.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

   
    </div>
  );
};

export default LowLeadInvoice;
