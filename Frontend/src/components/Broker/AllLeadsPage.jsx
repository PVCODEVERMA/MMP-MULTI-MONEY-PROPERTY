import React, { useState } from "react";

const dummyLeads = [
  {
    id: 1,
    name: "Pankaj Verma",
    phone: "+91 9876543210",
    email: "pankaj@gmail.com",
    status: "pending",
    callCount: 3,
    lastCallTime: "2 hours ago",
    nextFollowUp: "Tomorrow, 10:00 AM",
    notes: "Interested in 3BHK apartment in Gurgaon. Budget: 1.2 Cr",
    source: "Website",
    createdAt: "15 Oct 2025",
    propertyType: "3BHK Apartment",
    budget: "1.2 Cr",
    location: "Gurgaon"
  },
  {
    id: 2,
    name: "Rahul Sharma",
    phone: "+91 9123456780",
    email: "rahul@gmail.com",
    status: "not_interested",
    callCount: 1,
    lastCallTime: "1 day ago",
    nextFollowUp: "Not scheduled",
    notes: "Found property too expensive. Not interested anymore.",
    source: "Referral",
    createdAt: "14 Oct 2025",
    propertyType: "2BHK Flat",
    budget: "80 Lakhs",
    location: "Noida"
  },
  {
    id: 3,
    name: "Anita Singh",
    phone: "+91 9988776655",
    email: "anita@gmail.com",
    status: "closed",
    callCount: 5,
    lastCallTime: "30 minutes ago",
    nextFollowUp: "Completed",
    notes: "Successfully closed deal for 2BHK in Noida. Payment received.",
    source: "Website",
    createdAt: "10 Oct 2025",
    propertyType: "2BHK Apartment",
    budget: "75 Lakhs",
    location: "Noida"
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    phone: "+91 8899776655",
    email: "rajesh@gmail.com",
    status: "pending",
    callCount: 2,
    lastCallTime: "4 hours ago",
    nextFollowUp: "Today, 4:00 PM",
    notes: "Waiting for bank approval. Will confirm by evening.",
    source: "Walk-in",
    createdAt: "13 Oct 2025",
    propertyType: "4BHK Villa",
    budget: "2.5 Cr",
    location: "Greater Noida"
  }
];

const statusConfig = {
  pending: { 
    label: "Pending", 
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: ""
  },
  not_interested: { 
    label: "Not Interested", 
    color: "bg-red-100 text-red-800 border-red-200",
    icon: ""
  },
  closed: { 
    label: "Closed", 
    color: "bg-green-100 text-green-800 border-green-200",
    icon: ""
  },
  follow_up: { 
    label: "Follow Up", 
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: ""
  }
};

const AllLeads = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const handleCallClick = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsAppClick = (phone) => {
    window.open(`https://wa.me/${phone.replace('+', '')}`, '_blank');
  };

  const handleViewNotes = (lead) => {
    setSelectedLead(lead);
    setShowNotesModal(true);
  };

  const filteredLeads = filterStatus === "all" 
    ? dummyLeads 
    : dummyLeads.filter(lead => lead.status === filterStatus);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#154056] mb-2">All Leads</h2>
        <p className="text-gray-600">Manage and track all your leads in one place</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="text-xl font-bold text-[#154056]">{dummyLeads.length}</div>
          <div className="text-sm text-gray-500 mt-1">Total Leads</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="text-xl font-bold text-[#ff9c00]">
            {dummyLeads.filter(lead => lead.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Pending</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="text-xl font-bold text-green-600">
            {dummyLeads.filter(lead => lead.status === 'closed').length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Closed</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="text-xl font-bold text-red-600">
            {dummyLeads.filter(lead => lead.status === 'not_interested').length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Not Interested</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === "all" 
              ? "bg-[#154056] text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          All Leads
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === "pending" 
              ? "bg-yellow-500 text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilterStatus("closed")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === "closed" 
              ? "bg-green-500 text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Closed
        </button>
        <button
          onClick={() => setFilterStatus("not_interested")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === "not_interested" 
              ? "bg-red-500 text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Not Interested
        </button>
      </div>

      {/* Leads Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            {/* Header with Avatar and Status */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center flex-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#ff9c00] to-[#ff7b00] rounded-full flex items-center justify-center mr-3">
                  <span className="text-base font-bold text-white">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#154056] text-lg truncate">{lead.name}</h3>
                  <div className="flex items-center mt-1 space-x-2">
                    {getStatusBadge(lead.status)}
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {lead.source}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className=" mb-3">
              <div className="bg-blue-50 rounded-lg p-2">
                <div className="text-xs text-[#154056] mb-1">Property Type</div>
                <div className="text-sm font-medium text-blue-700 truncate">{lead.propertyType}</div>
              </div>
            
            </div>

            {/* Location */}
            <div className="bg-gray-50 rounded-lg p-2 mb-3">
              <div className="text-xs text-gray-600 mb-1"> Preferred Location</div>
              <div className="text-sm font-medium text-gray-700">{lead.location}</div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-xs text-gray-600 mb-1"> Phone</div>
                <div className="text-sm font-medium text-[#154056] truncate">{lead.phone}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-xs text-gray-600 mb-1"> Email</div>
                <div className="text-sm font-medium text-[#154056] truncate">{lead.email}</div>
              </div>
            </div>

            {/* Call Activity */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-green-50 rounded-lg p-2">
                <div className="text-xs text-green-600 mb-1"> Call Count</div>
                <div className="text-sm font-bold text-green-700">{lead.callCount} calls</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-2">
                <div className="text-xs text-orange-600 mb-1"> Last Call</div>
                <div className="text-sm font-medium text-orange-700">{lead.lastCallTime}</div>
              </div>
            </div>

            {/* Next Follow-up */}
            <div className="bg-gradient-to-r from-[#154056] to-[#2c6b8a] rounded-lg p-3 mb-3">
              <div className="text-xs text-white/80 mb-1"> Next Follow-up</div>
              <div className="text-sm font-semibold text-white">{lead.nextFollowUp}</div>
            </div>

            {/* Notes Preview */}
            <div className="mb-4">
              <div className="text-xs text-gray-600 mb-2 flex items-center justify-between">
                <span> Notes</span>
                <button
                  onClick={() => handleViewNotes(lead)}
                  className="text-[#ff9c00] hover:text-[#e68a00] text-xs font-medium cursor-pointer"
                >
                  View Full
                </button>
              </div>
              <div className="text-sm text-gray-700 line-clamp-2 bg-gray-50 rounded-lg p-3">
                {lead.notes}
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
              <span>Lead ID: #{lead.id}</span>
              <span>Created: {lead.createdAt}</span>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleCallClick(lead.phone)}
                className="flex-1 px-3 py-2.5 bg-[#ff9c00] text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors text-center flex items-center justify-center"
              >
          
                Call Now
              </button>
             
              <button
                onClick={() => handleViewNotes(lead)}
                className="px-3 py-2.5 bg-[#154056] text-white text-sm font-semibold rounded-lg hover:bg-[#0f2d3a] transition-colors text-center flex items-center justify-center cursor-pointer"
              >
             
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Notes Modal */}
      {showNotesModal && selectedLead && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#154056]">Lead Details</h3>
              <button
                onClick={() => setShowNotesModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff9c00] to-[#ff7b00] rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {selectedLead.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#154056]">{selectedLead.name}</p>
                  <p className="text-sm text-gray-600">{selectedLead.email}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Notes</label>
                <p className="text-gray-700 mt-1 bg-gray-50 rounded-lg p-3">{selectedLead.notes}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedLead.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Call Count</label>
                  <p className="text-gray-700 mt-1 font-semibold">{selectedLead.callCount} calls</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Property Type</label>
                  <p className="text-gray-700 mt-1">{selectedLead.propertyType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Budget</label>
                  <p className="text-gray-700 mt-1">{selectedLead.budget}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <p className="text-gray-700 mt-1">{selectedLead.location}</p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNotesModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleCallClick(selectedLead.phone)}
                className="flex-1 px-4 py-2 bg-[#ff9c00] text-white rounded-lg hover:bg-[#e68a00] transition-colors cursor-pointer"
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredLeads.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#ff9c00] to-[#ff7b00] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">📝</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Leads Found</h3>
          <p className="text-gray-600 mb-4">No leads match your current filter.</p>
          <button
            onClick={() => setFilterStatus("all")}
            className="px-6 py-2.5 bg-[#154056] text-white font-medium rounded-lg hover:bg-[#0f2d3a] transition-colors"
          >
            Show All Leads
          </button>
        </div>
      )}
    </div>
  );
};

export default AllLeads;