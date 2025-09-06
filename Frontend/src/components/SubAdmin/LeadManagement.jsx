// pages/sub-admin/LeadManagement.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShareIcon,
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XMarkIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  ArrowPathIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  ChartBarIcon,
  StarIcon,
  BellIcon,
  ShieldCheckIcon,
  UserPlusIcon
} from "@heroicons/react/24/outline";

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [brokerFilter, setBrokerFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showLeadDetailsModal, setShowLeadDetailsModal] = useState(false);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [bulkAction, setBulkAction] = useState("");

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockLeads = [
        {
          id: 1,
          customerName: "Rahul Sharma",
          email: "rahul.sharma@gmail.com",
          phone: "+91 98765 43210",
          budget: "80L - 1.2Cr",
          location: "Mumbai, Maharashtra",
          propertyType: "Residential",
          bhk: "2-3 BHK",
          status: "new",
          priority: "high",
          source: "Website",
          receivedDate: "2024-08-29",
          assignedBroker: null,
          brokerId: null,
          leadScore: 85,
          verified: false,
          notes: "Looking for apartment near office in Bandra",
          followUpDate: "2024-08-30",
          lastActivity: "2024-08-29",
          tags: ["Hot Lead", "First Time Buyer"]
        },
        {
          id: 2,
          customerName: "Priya Patel",
          email: "priya.patel@gmail.com",
          phone: "+91 87654 32109",
          budget: "60L - 90L",
          location: "Pune, Maharashtra",
          propertyType: "Residential",
          bhk: "2 BHK",
          status: "assigned",
          priority: "medium",
          source: "Referral",
          receivedDate: "2024-08-28",
          assignedBroker: "Rajesh Kumar",
          brokerId: 1,
          assignedDate: "2024-08-29",
          leadScore: 72,
          verified: true,
          notes: "Interested in ready possession properties",
          followUpDate: "2024-08-31",
          lastActivity: "2024-08-29",
          tags: ["Referral", "Ready Buyer"]
        },
        {
          id: 3,
          customerName: "Amit Kumar",
          email: "amit.kumar@gmail.com",
          phone: "+91 76543 21098",
          budget: "1Cr - 1.5Cr",
          location: "Bangalore, Karnataka",
          propertyType: "Commercial",
          bhk: "Office Space",
          status: "contacted",
          priority: "high",
          source: "Social Media",
          receivedDate: "2024-08-27",
          assignedBroker: "Sneha Patel",
          brokerId: 2,
          assignedDate: "2024-08-28",
          leadScore: 91,
          verified: true,
          notes: "Looking for commercial office space in tech park",
          followUpDate: "2024-09-01",
          lastActivity: "2024-08-29",
          tags: ["Commercial", "High Value"]
        },
        {
          id: 4,
          customerName: "Neha Singh",
          email: "neha.singh@gmail.com",
          phone: "+91 65432 10987",
          budget: "45L - 60L",
          location: "Delhi, NCR",
          propertyType: "Residential",
          bhk: "1-2 BHK",
          status: "qualified",
          priority: "medium",
          source: "Cold Call",
          receivedDate: "2024-08-26",
          assignedBroker: "Amit Singh",
          brokerId: 3,
          assignedDate: "2024-08-27",
          leadScore: 68,
          verified: false,
          notes: "First time buyer, needs guidance",
          followUpDate: "2024-08-30",
          lastActivity: "2024-08-28",
          tags: ["First Timer", "Budget Conscious"]
        }
      ];

      const mockBrokers = [
        {
          id: 1,
          name: "Rajesh Kumar",
          email: "rajesh.kumar@gmail.com",
          phone: "+91 98765 43210",
          location: "Mumbai, Maharashtra",
          specialization: "Luxury Properties",
          activeLeads: 15,
          maxCapacity: 25,
          successRate: 85,
          totalDeals: 156,
          rating: 4.8,
          status: "active"
        },
        {
          id: 2,
          name: "Sneha Patel",
          email: "sneha.patel@gmail.com",
          phone: "+91 87654 32109",
          location: "Pune, Maharashtra",
          specialization: "Commercial Properties",
          activeLeads: 12,
          maxCapacity: 20,
          successRate: 78,
          totalDeals: 89,
          rating: 4.6,
          status: "active"
        },
        {
          id: 3,
          name: "Amit Singh",
          email: "amit.singh@gmail.com",
          phone: "+91 76543 21098",
          location: "Delhi, NCR",
          specialization: "Residential",
          activeLeads: 18,
          maxCapacity: 25,
          successRate: 72,
          totalDeals: 67,
          rating: 4.3,
          status: "active"
        }
      ];
      
      setLeads(mockLeads);
      setBrokers(mockBrokers);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm) ||
                         lead.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
    const matchesBroker = brokerFilter === "all" || lead.brokerId?.toString() === brokerFilter;
    const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesSource && matchesBroker && matchesPriority;
  });

  // Get unique sources
  const sources = [...new Set(leads.map(lead => lead.source))];

  // Lead operations
  const handleAssignLead = (leadId, brokerId, notes = "") => {
    const broker = brokers.find(b => b.id === parseInt(brokerId));
    if (!broker) return;

    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            status: "assigned",
            assignedBroker: broker.name,
            brokerId: broker.id,
            assignedDate: new Date().toISOString().split('T')[0],
            lastActivity: new Date().toISOString().split('T')[0],
            notes: notes || lead.notes
          }
        : lead
    ));

    alert(`Lead assigned to ${broker.name} successfully!`);
  };

  const handleVerifyLead = (leadId, verified, verificationNotes = "") => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            verified,
            verificationNotes,
            lastActivity: new Date().toISOString().split('T')[0]
          }
        : lead
    ));

    alert(`Lead ${verified ? 'verified' : 'rejected'} successfully!`);
  };

  const handleStatusUpdate = (leadId, newStatus) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            status: newStatus,
            lastActivity: new Date().toISOString().split('T')[0]
          }
        : lead
    ));
  };

  const handleBulkAction = () => {
    let updatedLeads = [...leads];
    
    selectedLeads.forEach(leadId => {
      const leadIndex = updatedLeads.findIndex(lead => lead.id === leadId);
      if (leadIndex !== -1) {
        switch (bulkAction) {
          case "verify":
            updatedLeads[leadIndex] = { ...updatedLeads[leadIndex], verified: true };
            break;
          case "reject":
            updatedLeads[leadIndex] = { ...updatedLeads[leadIndex], verified: false };
            break;
          case "assign":
            // This would open another modal to select broker
            break;
          case "priority-high":
            updatedLeads[leadIndex] = { ...updatedLeads[leadIndex], priority: "high" };
            break;
          case "priority-medium":
            updatedLeads[leadIndex] = { ...updatedLeads[leadIndex], priority: "medium" };
            break;
          case "priority-low":
            updatedLeads[leadIndex] = { ...updatedLeads[leadIndex], priority: "low" };
            break;
        }
      }
    });

    setLeads(updatedLeads);
    setSelectedLeads([]);
    setShowBulkActionModal(false);
    setBulkAction("");
    alert(`Bulk action completed for ${selectedLeads.length} leads!`);
  };

  // Export functionality
  const exportLeads = (format) => {
    const exportData = filteredLeads.map(lead => ({
      'Customer Name': lead.customerName,
      'Email': lead.email,
      'Phone': lead.phone,
      'Location': lead.location,
      'Budget': lead.budget,
      'Property Type': lead.propertyType,
      'Status': lead.status,
      'Priority': lead.priority,
      'Source': lead.source,
      'Assigned Broker': lead.assignedBroker || 'Unassigned',
      'Lead Score': lead.leadScore,
      'Verified': lead.verified ? 'Yes' : 'No',
      'Received Date': lead.receivedDate,
      'Last Activity': lead.lastActivity
    }));

    const csvContent = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Badge components
  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { color: "bg-blue-100 text-blue-800", label: "New" },
      assigned: { color: "bg-yellow-100 text-yellow-800", label: "Assigned" },
      contacted: { color: "bg-purple-100 text-purple-800", label: "Contacted" },
      qualified: { color: "bg-green-100 text-green-800", label: "Qualified" },
      closed: { color: "bg-gray-100 text-gray-800", label: "Closed" },
      lost: { color: "bg-red-100 text-red-800", label: "Lost" }
    };
    
    const config = statusConfig[status] || statusConfig.new;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: "bg-red-100 text-red-800", label: "High" },
      medium: { color: "bg-yellow-100 text-yellow-800", label: "Medium" },
      low: { color: "bg-gray-100 text-gray-800", label: "Low" }
    };
    
    const config = priorityConfig[priority] || priorityConfig.medium;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Lead Management</h1>
            <p className="text-gray-600">Monitor and manage leads assigned to your brokers</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => exportLeads('csv')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowBulkActionModal(true)}
              disabled={selectedLeads.length === 0}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors disabled:opacity-50"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Bulk Action ({selectedLeads.length})
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShareIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{leads.length}</div>
              <div className="text-sm text-gray-600">Total Leads</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.status === 'new').length}
              </div>
              <div className="text-sm text-gray-600">New Leads</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.verified).length}
              </div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.assignedBroker).length}
              </div>
              <div className="text-sm text-gray-600">Assigned</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <StarIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.priority === 'high').length}
              </div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="assigned">Assigned</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          
          <div>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Sources</option>
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={brokerFilter}
              onChange={(e) => setBrokerFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Brokers</option>
              <option value="">Unassigned</option>
              {brokers.map(broker => (
                <option key={broker.id} value={broker.id}>{broker.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Bulk Selection Actions */}
        {selectedLeads.length > 0 && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-orange-800">
                {selectedLeads.length} lead{selectedLeads.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="px-3 py-1 border border-orange-300 rounded text-sm"
                >
                  <option value="">Select Action</option>
                  <option value="verify">Verify Leads</option>
                  <option value="reject">Reject Leads</option>
                  <option value="priority-high">Set High Priority</option>
                  <option value="priority-medium">Set Medium Priority</option>
                  <option value="priority-low">Set Low Priority</option>
                </select>
                <button
                  onClick={() => setShowBulkActionModal(true)}
                  disabled={!bulkAction}
                  className="px-4 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 disabled:opacity-50"
                >
                  Apply
                </button>
                <button
                  onClick={() => setSelectedLeads([])}
                  className="px-4 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLeads(filteredLeads.map(lead => lead.id));
                      } else {
                        setSelectedLeads([]);
                      }
                    }}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Broker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeads([...selectedLeads, lead.id]);
                        } else {
                          setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                        }
                      }}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        {lead.customerName}
                        {lead.priority === 'high' && (
                          <StarIcon className="h-4 w-4 text-red-500 ml-1" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <EnvelopeIcon className="h-3 w-3 mr-1" />
                        {lead.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <PhoneIcon className="h-3 w-3 mr-1" />
                        {lead.phone}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.propertyType}</div>
                      <div className="text-sm text-gray-500">{lead.bhk}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        {lead.location}
                      </div>
                      <div className="text-sm text-green-600 flex items-center">
                        <CurrencyRupeeIcon className="h-3 w-3 mr-1" />
                        {lead.budget}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                      >
                        <option value="new">New</option>
                        <option value="assigned">Assigned</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                        <option value="lost">Lost</option>
                      </select>
                      {getPriorityBadge(lead.priority)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lead.assignedBroker ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lead.assignedBroker}</div>
                        <div className="text-sm text-gray-500">Assigned: {lead.assignedDate}</div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowAssignModal(true);
                        }}
                        className="text-orange-600 hover:text-orange-900 text-sm font-medium"
                      >
                        Assign Broker
                      </button>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {lead.verified ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowVerifyModal(true);
                          }}
                          className="text-orange-600 hover:text-orange-900 text-sm font-medium"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`text-sm font-medium mr-2 ${
                        lead.leadScore >= 80 ? 'text-green-600' :
                        lead.leadScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {lead.leadScore}
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            lead.leadScore >= 80 ? 'bg-green-500' :
                            lead.leadScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${lead.leadScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowLeadDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowAssignModal(true);
                        }}
                        className="text-orange-600 hover:text-orange-900"
                        title="Assign/Reassign"
                      >
                        <UserPlusIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowVerifyModal(true);
                        }}
                        className="text-green-600 hover:text-green-900"
                        title="Verify Lead"
                      >
                        <ShieldCheckIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <ShareIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>

      {/* Assign Lead Modal */}
      <AnimatePresence>
        {showAssignModal && selectedLead && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowAssignModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedLead.assignedBroker ? 'Reassign' : 'Assign'} Lead
                  </h3>
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Lead Details</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">
                        <div><strong>Customer:</strong> {selectedLead.customerName}</div>
                        <div><strong>Budget:</strong> {selectedLead.budget}</div>
                        <div><strong>Location:</strong> {selectedLead.location}</div>
                        <div><strong>Property Type:</strong> {selectedLead.propertyType}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Broker
                    </label>
                    <select
                      id="brokerSelect"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      defaultValue={selectedLead.brokerId || ""}
                    >
                      <option value="">Select a broker</option>
                      {brokers.map(broker => (
                        <option key={broker.id} value={broker.id}>
                          {broker.name} - {broker.location} ({broker.activeLeads}/{broker.maxCapacity})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignment Notes
                    </label>
                    <textarea
                      id="assignmentNotes"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Add any notes for the broker..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const brokerId = document.getElementById('brokerSelect').value;
                      const notes = document.getElementById('assignmentNotes').value;
                      
                      if (brokerId) {
                        handleAssignLead(selectedLead.id, brokerId, notes);
                        setShowAssignModal(false);
                      } else {
                        alert('Please select a broker');
                      }
                    }}
                    className="px-4 py-2 bg-orange-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-600"
                  >
                    Assign Lead
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Verify Lead Modal */}
      <AnimatePresence>
        {showVerifyModal && selectedLead && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowVerifyModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Verify Lead</h3>
                  <button
                    onClick={() => setShowVerifyModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Lead Information</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Customer:</strong> {selectedLead.customerName}</div>
                      <div><strong>Email:</strong> {selectedLead.email}</div>
                      <div><strong>Phone:</strong> {selectedLead.phone}</div>
                      <div><strong>Budget:</strong> {selectedLead.budget}</div>
                      <div><strong>Source:</strong> {selectedLead.source}</div>
                      <div><strong>Lead Score:</strong> {selectedLead.leadScore}</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Notes
                    </label>
                    <textarea
                      id="verificationNotes"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Add verification notes..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowVerifyModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const notes = document.getElementById('verificationNotes').value;
                      handleVerifyLead(selectedLead.id, false, notes);
                      setShowVerifyModal(false);
                    }}
                    className="px-4 py-2 bg-red-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      const notes = document.getElementById('verificationNotes').value;
                      handleVerifyLead(selectedLead.id, true, notes);
                      setShowVerifyModal(false);
                    }}
                    className="px-4 py-2 bg-green-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-600"
                  >
                    Verify
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Bulk Action Confirmation Modal */}
      <AnimatePresence>
        {showBulkActionModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowBulkActionModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Confirm Bulk Action
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to apply <strong>{bulkAction}</strong> to {selectedLeads.length} selected leads?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleBulkAction}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowBulkActionModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadManagement;
