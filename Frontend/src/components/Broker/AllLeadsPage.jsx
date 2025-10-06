import React, { useState, useEffect } from "react";
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  UserCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/24/outline";
import { 
  StarIcon,
  ShieldCheckIcon 
} from "@heroicons/react/24/solid";

const AllLeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedLead, setSelectedLead] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock leads data - 10 unique entries
  const mockLeads = [
    {
      id: 1,
      name: "Rohit Sharma",
      phone: "+91 9811000001",
      email: "rohit.sharma@email.com",
      propertyType: "3 BHK Apartment",
      location: "Sector 45, Gurgaon",
      intent: "high",
      lastContact: "2024-01-15",
      notes: "Interested in ready-to-move properties. Prefers upper floors with good view.",
      assignedTo: "Self",
      createdAt: "2024-01-15T10:30:00",
      source: "Website",
      priority: "high"
    },
    {
      id: 2,
      name: "Anjali Singh",
      phone: "+91 9811000002",
      email: "anjali.singh@email.com",
      propertyType: "2 BHK Villa",
      location: "Sector 50, Gurgaon",
      intent: "medium",
      lastContact: "2024-01-14",
      notes: "Looking for gated community with security and amenities.",
      assignedTo: "Self",
      createdAt: "2024-01-14T14:20:00",
      source: "Referral",
      priority: "medium"
    },
    {
      id: 3,
      name: "Amit Patel",
      phone: "+91 9811000003",
      email: "amit.patel@email.com",
      propertyType: "4 BHK Penthouse",
      location: "DLF Phase 5, Gurgaon",
      intent: "high",
      lastContact: "2024-01-13",
      notes: "NRI investor looking for luxury properties.",
      assignedTo: "Self",
      createdAt: "2024-01-13T09:15:00",
      source: "Website",
      priority: "high"
    },
    {
      id: 4,
      name: "Priya Verma",
      phone: "+91 9811000004",
      email: "priya.verma@email.com",
      propertyType: "2 BHK Apartment",
      location: "Sector 47, Gurgaon",
      intent: "high",
      lastContact: "2024-01-12",
      notes: "First-time home buyer. Very satisfied.",
      assignedTo: "Self",
      createdAt: "2024-01-10T16:45:00",
      source: "Walk-in",
      priority: "medium"
    },
    {
      id: 5,
      name: "Rajesh Kumar",
      phone: "+91 9811000005",
      email: "rajesh.kumar@email.com",
      propertyType: "3 BHK Villa",
      location: "Sector 52, Gurgaon",
      intent: "medium",
      lastContact: "2024-01-11",
      notes: "Wants property near metro station.",
      assignedTo: "Self",
      createdAt: "2024-01-09T11:20:00",
      source: "Website",
      priority: "medium"
    },
    {
      id: 6,
      name: "Sneha Gupta",
      phone: "+91 9811000006",
      email: "sneha.gupta@email.com",
      propertyType: "1 BHK Apartment",
      location: "Sector 49, Gurgaon",
      intent: "low",
      lastContact: "2024-01-10",
      notes: "Young professional looking for rental property.",
      assignedTo: "Self",
      createdAt: "2024-01-08T15:30:00",
      source: "Referral",
      priority: "low"
    },
    {
      id: 7,
      name: "Vikram Malhotra",
      phone: "+91 9811000007",
      email: "vikram.malhotra@email.com",
      propertyType: "5 BHK Duplex",
      location: "DLF Phase 4, Gurgaon",
      intent: "high",
      lastContact: "2024-01-09",
      notes: "Looking for large family home with garden.",
      assignedTo: "Self",
      createdAt: "2024-01-07T13:45:00",
      source: "Walk-in",
      priority: "high"
    },
    {
      id: 8,
      name: "Neha Joshi",
      phone: "+91 9811000008",
      email: "neha.joshi@email.com",
      propertyType: "2 BHK Apartment",
      location: "Sector 46, Gurgaon",
      intent: "medium",
      lastContact: "2024-01-08",
      notes: "Interested in properties with clubhouse access.",
      assignedTo: "Self",
      createdAt: "2024-01-06T10:15:00",
      source: "Website",
      priority: "medium"
    },
    {
      id: 9,
      name: "Sanjay Mehta",
      phone: "+91 9811000009",
      email: "sanjay.mehta@email.com",
      propertyType: "3 BHK Penthouse",
      location: "Sector 48, Gurgaon",
      intent: "high",
      lastContact: "2024-01-07",
      notes: "Wants property with city view and modern amenities.",
      assignedTo: "Self",
      createdAt: "2024-01-05T14:50:00",
      source: "Referral",
      priority: "high"
    },
    {
      id: 10,
      name: "Pooja Reddy",
      phone: "+91 9811000010",
      email: "pooja.reddy@email.com",
      propertyType: "2 BHK Villa",
      location: "Sector 51, Gurgaon",
      intent: "low",
      lastContact: "2024-01-06",
      notes: "Just exploring options, not urgent.",
      assignedTo: "Self",
      createdAt: "2024-01-04T16:20:00",
      source: "Website",
      priority: "low"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      setLoading(false);
    }, 1000);
  }, []);

  // Filters and search
  useEffect(() => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.propertyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(lead => lead.intent === statusFilter);
    }

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter, sortBy]);

  const getIntentBadge = (intent) => {
    const intentConfig = {
      high: { color: "bg-red-50 text-red-700 border border-red-200", label: "High Intent" },
      medium: { color: "bg-yellow-50 text-yellow-700 border border-yellow-200", label: "Medium Intent" },
      low: { color: "bg-blue-50 text-blue-700 border border-blue-200", label: "Low Intent" }
    };
    const config = intentConfig[intent] || intentConfig.medium;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: "bg-red-500", label: "High" },
      medium: { color: "bg-yellow-500", label: "Medium" },
      low: { color: "bg-green-500", label: "Low" }
    };
    const config = priorityConfig[priority] || priorityConfig.medium;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs text-white font-medium ${config.color}`}>
        {config.label}
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

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
       

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{leads.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <UserCircleIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">High Intent</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {leads.filter(lead => lead.intent === 'high').length}
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <StarIcon className="h-6 w-6 text-[#ff9c00]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">Medium Intent</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {leads.filter(lead => lead.intent === 'medium').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Intent</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {leads.filter(lead => lead.intent === 'low').length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <ChartBarIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1 relative w-full">
              <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads by name, phone, email, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-[#154056] focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div className="flex gap-3 w-full lg:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <FunnelIcon className="h-5 w-5 text-gray-600" />
                <span>Filters</span>
                {showFilters ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#154056] focus:border-transparent transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intent Level</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-transparent"
                >
                  <option value="all">All Intent</option>
                  <option value="high">High Intent</option>
                  <option value="medium">Medium Intent</option>
                  <option value="low">Low Intent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-transparent">
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-transparent">
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-transparent">
                  <option value="all">All Sources</option>
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="walk-in">Walk-in</option>
                </select>
              </div> */}
            </div>
          )}
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Lead Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Property & Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Intent & Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    onClick={() => handleViewDetails(lead)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white flex items-center justify-center font-semibold text-lg shadow-md">
                          {lead.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">{lead.name}</p>
                            {lead.intent === "high" && (
                              <ShieldCheckIcon className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <PhoneIcon className="h-3 w-3 mr-2" /> 
                            {lead.phone}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <EnvelopeIcon className="h-3 w-3 mr-2" /> 
                            {lead.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">{lead.propertyType}</p>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPinIcon className="h-3 w-3 mr-2" /> 
                        {lead.location}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getIntentBadge(lead.intent)}
                        {getPriorityBadge(lead.priority)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {formatDate(lead.lastContact)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(lead);
                          }}
                          className="text-[#154056] hover:text-[#ff9c00] p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
                          title="Call"
                        >
                          <PhoneIcon className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                          title="Message"
                        >
                          <ChatBubbleLeftRightIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-16">
              <UserCircleIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "Get started by adding your first lead to the system."}
              </p>
              <button className="mt-4 bg-[#154056] text-white px-6 py-2 rounded-lg hover:bg-[#2c6b8a] transition-colors duration-200">
                + Add New Lead
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllLeadsPage;