import React, { useState, useEffect } from "react";
import { 
  MagnifyingGlassIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  UserCircleIcon,
  ClockIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon,
  TrashIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";
import { 
  StarIcon,
  ShieldCheckIcon 
} from "@heroicons/react/24/solid";

const NewLeads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [intentFilter, setIntentFilter] = useState("all");
  const [showAddLeadForm, setShowAddLeadForm] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    location: "",
    source: "Website",
    intent: "medium",
    notes: ""
  });

  // Mock new leads data - 10 unique entries
  const mockLeads = [
    {
      id: 1,
      name: "Rohit Sharma",
      phone: "+91 9811000001",
      email: "rohit.sharma@email.com",
      propertyType: "3 BHK Apartment",
      location: "Sector 45, Gurgaon",
      source: "Website",
      intent: "high",
      lastContact: "2024-01-15",
      notes: "Interested in ready-to-move properties. Prefers upper floors with good view.",
      assignedTo: "Self",
      createdAt: "2024-01-15T10:30:00",
      isNew: true
    },
    {
      id: 2,
      name: "Anjali Singh",
      phone: "+91 9811000002",
      email: "anjali.singh@email.com",
      propertyType: "2 BHK Villa",
      location: "Sector 50, Gurgaon",
      source: "Referral",
      intent: "medium",
      lastContact: "2024-01-15",
      notes: "Looking for gated community with security and amenities.",
      assignedTo: "Self",
      createdAt: "2024-01-15T14:20:00",
      isNew: true
    },
    {
      id: 3,
      name: "Amit Patel",
      phone: "+91 9811000003",
      email: "amit.patel@email.com",
      propertyType: "4 BHK Penthouse",
      location: "DLF Phase 5, Gurgaon",
      source: "Website",
      intent: "high",
      lastContact: "2024-01-15",
      notes: "NRI investor looking for luxury properties.",
      assignedTo: "Self",
      createdAt: "2024-01-15T09:15:00",
      isNew: true
    },
    {
      id: 4,
      name: "Priya Mehta",
      phone: "+91 9811000004",
      email: "priya.mehta@email.com",
      propertyType: "Office Space",
      location: "Cyber City, Gurgaon",
      source: "Website",
      intent: "low",
      lastContact: "2024-01-15",
      notes: "Commercial property inquiry for startup office.",
      assignedTo: "Self",
      createdAt: "2024-01-15T16:45:00",
      isNew: true
    },
    {
      id: 5,
      name: "Rajesh Khanna",
      phone: "+91 9811000005",
      email: "rajesh.khanna@email.com",
      propertyType: "4 BHK Villa",
      location: "DLF Phase 3, Gurgaon",
      source: "Referral",
      intent: "high",
      lastContact: "2024-01-15",
      notes: "NRI client - urgent requirement for family relocation.",
      assignedTo: "Self",
      createdAt: "2024-01-15T18:20:00",
      isNew: true
    },
    {
      id: 6,
      name: "Sunita Reddy",
      phone: "+91 9811000006",
      email: "sunita.reddy@email.com",
      propertyType: "2 BHK Apartment",
      location: "Sector 52, Gurgaon",
      source: "Social Media",
      intent: "medium",
      lastContact: "2024-01-15",
      notes: "First-time home buyer, needs guidance.",
      assignedTo: "Self",
      createdAt: "2024-01-15T19:10:00",
      isNew: true
    },
    {
      id: 7,
      name: "Amitabh Verma",
      phone: "+91 9811000007",
      email: "amitabh.verma@email.com",
      propertyType: "Penthouse",
      location: "Golf Course Road, Gurgaon",
      source: "Walk-in",
      intent: "high",
      lastContact: "2024-01-15",
      notes: "Luxury property seeker, budget not a constraint.",
      assignedTo: "Self",
      createdAt: "2024-01-15T20:30:00",
      isNew: true
    },
    {
      id: 8,
      name: "Neha Joshi",
      phone: "+91 9811000008",
      email: "neha.joshi@email.com",
      propertyType: "3 BHK Apartment",
      location: "Sector 46, Gurgaon",
      source: "Website",
      intent: "medium",
      lastContact: "2024-01-15",
      notes: "Working professional, needs property near metro.",
      assignedTo: "Self",
      createdAt: "2024-01-15T11:45:00",
      isNew: true
    },
    {
      id: 9,
      name: "Sanjay Mehta",
      phone: "+91 9811000009",
      email: "sanjay.mehta@email.com",
      propertyType: "3 BHK Penthouse",
      location: "Sector 48, Gurgaon",
      source: "Referral",
      intent: "high",
      lastContact: "2024-01-15",
      notes: "Wants property with city view and modern amenities.",
      assignedTo: "Self",
      createdAt: "2024-01-15T14:50:00",
      isNew: true
    },
    {
      id: 10,
      name: "Pooja Reddy",
      phone: "+91 9811000010",
      email: "pooja.reddy@email.com",
      propertyType: "2 BHK Villa",
      location: "Sector 51, Gurgaon",
      source: "Website",
      intent: "low",
      lastContact: "2024-01-15",
      notes: "Just exploring options, not urgent requirement.",
      assignedTo: "Self",
      createdAt: "2024-01-15T16:20:00",
      isNew: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search leads
  useEffect(() => {
    let filtered = leads;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.propertyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Source filter
    if (sourceFilter !== "all") {
      filtered = filtered.filter(lead => lead.source === sourceFilter);
    }

    // Intent filter
    if (intentFilter !== "all") {
      filtered = filtered.filter(lead => lead.intent === intentFilter);
    }

    setFilteredLeads(filtered);
  }, [leads, searchTerm, sourceFilter, intentFilter]);

  const getIntentBadge = (intent) => {
    const intentConfig = {
      high: { color: "bg-red-100 text-red-800", label: "High Intent" },
      medium: { color: "bg-yellow-100 text-yellow-800", label: "Medium Intent" },
      low: { color: "bg-blue-100 text-blue-800", label: "Low Intent" }
    };
    
    const config = intentConfig[intent] || intentConfig.medium;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getSourceBadge = (source) => {
    const sourceConfig = {
      Website: { color: "bg-green-100 text-green-800", icon: "🌐" },
      Referral: { color: "bg-purple-100 text-purple-800", icon: "👥" },
      "Social Media": { color: "bg-blue-100 text-blue-800", icon: "📱" },
      "Walk-in": { color: "bg-orange-100 text-orange-800", icon: "🚶" }
    };
    
    const config = sourceConfig[source] || { color: "bg-gray-100 text-gray-800", icon: "📞" };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {source}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    // Add new lead to the list
    const lead = {
      id: leads.length + 1,
      ...newLead,
      assignedTo: "Self",
      lastContact: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      isNew: true
    };
    
    setLeads([lead, ...leads]);
    setNewLead({
      name: "",
      phone: "",
      email: "",
      propertyType: "",
      location: "",
      source: "Website",
      intent: "medium",
      notes: ""
    });
    setShowAddLeadForm(false);
  };

  const handleContact = (leadId) => {
    // Update lead to mark as contacted (remove from new leads)
    setLeads(leads.filter(lead => lead.id !== leadId));
  };

  const handleDelete = (leadId) => {
    setLeads(leads.filter(lead => lead.id !== leadId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">New Leads</h1>
          <p className="text-gray-600">Fresh leads that need immediate attention</p>
        </div>
        <button
          onClick={() => setShowAddLeadForm(true)}
          className="bg-[#154056] text-white px-4 py-2 rounded-lg hover:bg-[#2c6b8a] transition-colors flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Lead
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total New Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserCircleIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Intent</p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter(lead => lead.intent === 'high').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <StarIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medium Intent</p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter(lead => lead.intent === 'medium').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Intent</p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter(lead => lead.intent === 'low').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ExclamationCircleIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search new leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
            >
              <option value="all">All Sources</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
              <option value="Walk-in">Walk-in</option>
            </select>

            <select
              value={intentFilter}
              onChange={(e) => setIntentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
            >
              <option value="all">All Intent</option>
              <option value="high">High Intent</option>
              <option value="medium">Medium Intent</option>
              <option value="low">Low Intent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAddLeadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Lead</h3>
            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={newLead.phone}
                  onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <input
                  type="text"
                  value={newLead.propertyType}
                  onChange={(e) => setNewLead({...newLead, propertyType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newLead.location}
                  onChange={(e) => setNewLead({...newLead, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select
                    value={newLead.source}
                    onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
                  >
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Walk-in">Walk-in</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Intent</label>
                  <select
                    value={newLead.intent}
                    onChange={(e) => setNewLead({...newLead, intent: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newLead.notes}
                  onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddLeadForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#154056] text-white rounded-lg hover:bg-[#2c6b8a]"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Lead Header */}
            <div className="bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{lead.name}</h3>
                  <p className="text-blue-100 text-sm">{lead.propertyType}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-200">
                    {formatDate(lead.createdAt)} at {formatTime(lead.createdAt)}
                  </div>
                  {lead.isNew && (
                    <span className="inline-block mt-1 bg-[#ff9c00] text-white text-xs px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Lead Details */}
            <div className="p-4">
              <div className="space-y-3">
                {/* Contact Info */}
                <div className="flex items-center text-sm text-gray-600">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  <span>{lead.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span>{lead.location}</span>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2">
                  {getIntentBadge(lead.intent)}
                  {getSourceBadge(lead.source)}
                </div>

                {/* Notes */}
                {lead.notes && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <strong>Notes:</strong> {lead.notes}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleContact(lead.id)}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                    title="Mark as Contacted"
                  >
                    <PhoneIcon className="h-4 w-4" />
                  </button>
                  <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  </button>
                  <button className="bg-[#154056] text-white p-2 rounded-lg hover:bg-[#2c6b8a] transition-colors">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(lead.id)}
                  className="text-red-500 hover:text-red-700 p-2 transition-colors"
                  title="Delete Lead"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredLeads.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <UserCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No new leads found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || sourceFilter !== "all" || intentFilter !== "all" 
              ? "Try changing your filters or search term"
              : "All new leads have been processed or no new leads available"
            }
          </p>
          <button
            onClick={() => setShowAddLeadForm(true)}
            className="mt-4 bg-[#154056] text-white px-4 py-2 rounded-lg hover:bg-[#2c6b8a] transition-colors"
          >
            Add Your First Lead
          </button>
        </div>
      )}
    </div>
  );
};

export default NewLeads;