import React from "react";

const dummyNewLeads = [
  {
    id: 101,
    name: "Saurabh Jain",
    phone: "+91 9001122334",
    email: "saurabh@gmail.com",
    createdAt: "14 Oct 2025",
  },
  {
    id: 102,
    name: "Neha Rawat",
    phone: "+91 9898989898",
    email: "neha@gmail.com",
    createdAt: "13 Oct 2025",
  },
  {
    id: 103,
    name: "Ajay Gupta",
    phone: "+91 9911223344",
    email: "ajay@gmail.com",
    createdAt: "13 Oct 2025",
  },
];

const NewLeads = () => (
  <div className="p-4 lg:p-6">
    {/* Header */}
    <div className="mb-4 lg:mb-6">
      <h2 className="text-xl lg:text-2xl font-bold text-[#154045]">New Leads</h2>
      <p className="text-gray-600 text-sm lg:text-base">Recently added low intent leads</p>
    </div>

    {/* Desktop Table */}
    <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#f7f7f7]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#154045] border-b">Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#154045] border-b">Phone</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#154045] border-b">Email</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#154045] border-b">Created At</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-[#154045] border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {dummyNewLeads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center">
                 
                  <span className="font-medium text-[#154045]">{lead.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700">{lead.phone}</td>
              <td className="px-6 py-4">
                <span className="text-gray-700 truncate block max-w-xs">{lead.email}</span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {lead.createdAt}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-[#ff9c00] text-white text-xs font-medium rounded-lg hover:bg-[#e68a00] transition-colors">
                    Contact
                  </button>
                 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards */}
    <div className="lg:hidden space-y-4">
      {dummyNewLeads.map((lead) => (
        <div key={lead.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#ff9c00] bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-medium text-[#154045]">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-[#154045]">{lead.name}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                  {lead.createdAt}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <span className="text-gray-500 w-16">Phone:</span>
              <span className="text-gray-700">{lead.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-500 w-16">Email:</span>
              <span className="text-gray-700 truncate">{lead.email}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="flex-1 px-3 py-2 bg-[#ff9c00] text-white text-sm font-medium rounded-lg hover:bg-[#e68a00] transition-colors text-center">
              Contact
            </button>
            <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors text-center">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Empty State (if needed) */}
    {dummyNewLeads.length === 0 && (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📝</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No New Leads</h3>
        <p className="text-gray-600">New low intent leads will appear here as they come in.</p>
      </div>
    )}
  </div>
);

export default NewLeads;