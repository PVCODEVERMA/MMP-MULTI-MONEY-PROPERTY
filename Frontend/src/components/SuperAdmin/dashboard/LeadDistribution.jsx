
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShareIcon,
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  PlusIcon,
  CogIcon,
  ChartBarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CurrencyRupeeIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  Bars3Icon
} from "@heroicons/react/24/outline";

const LeadDistribution = () => {
  const [leads, setLeads] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showBulkAssignModal, setShowBulkAssignModal] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState("");
  const [distributionRules, setDistributionRules] = useState([]);

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
          status: "unassigned",
          priority: "high",
          source: "Website",
          receivedDate: "2024-08-29",
          leadScore: 85,
          assignedBroker: null,
          notes: "Looking for apartment near office in Bandra"
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
          leadScore: 72,
          assignedBroker: "Rajesh Kumar",
          brokerId: 1,
          assignedDate: "2024-08-29",
          notes: "Interested in ready possession properties"
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
          status: "pending",
          priority: "high",
          source: "Social Media",
          receivedDate: "2024-08-27",
          leadScore: 91,
          assignedBroker: null,
          notes: "Looking for commercial office space"
        }
      ];

      const mockBrokers = [
        {
          id: 1,
          name: "Rajesh Kumar",
          email: "rajesh.kumar@gmail.com",
          location: "Mumbai, Maharashtra",
          specialization: "Luxury Properties",
          activeLeads: 15,
          maxCapacity: 25,
          successRate: 85,
          avgResponseTime: "2.5 hours",
          totalDeals: 156,
          rating: 4.8,
          status: "active"
        },
        {
          id: 2,
          name: "Priya Sharma",
          email: "priya.sharma@gmail.com",
          location: "Delhi, NCR",
          specialization: "Commercial Properties",
          activeLeads: 8,
          maxCapacity: 20,
          successRate: 78,
          avgResponseTime: "1.8 hours",
          totalDeals: 89,
          rating: 4.6,
          status: "active"
        },
        {
          id: 3,
          name: "Amit Singh",
          email: "amit.singh@gmail.com",
          location: "Bangalore, Karnataka",
          specialization: "Residential",
          activeLeads: 22,
          maxCapacity: 25,
          successRate: 72,
          avgResponseTime: "3.2 hours",
          totalDeals: 67,
          rating: 4.3,
          status: "busy"
        }
      ];

      const mockRules = [
        {
          id: 1,
          name: "Location Based Assignment",
          criteria: "Location matches broker location",
          priority: 1,
          active: true,
          assignedCount: 245
        },
        {
          id: 2,
          name: "Specialization Match",
          criteria: "Property type matches broker specialization",
          priority: 2,
          active: true,
          assignedCount: 189
        },
        {
          id: 3,
          name: "Workload Balance",
          criteria: "Assign to broker with lowest active leads",
          priority: 3,
          active: true,
          assignedCount: 156
        }
      ];

      setLeads(mockLeads);
      setBrokers(mockBrokers);
      setDistributionRules(mockRules);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesLocation = locationFilter === "all" || lead.location.includes(locationFilter);
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Get available locations
  const locations = [...new Set(leads.map(lead => lead.location.split(',')[1]?.trim()).filter(Boolean))];

  // Lead assignment
  const handleAssignLead = (leadId, brokerId) => {
    const broker = brokers.find(b => b.id === parseInt(brokerId));
    if (!broker) return;

    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            status: "assigned",
            assignedBroker: broker.name,
            brokerId: broker.id,
            assignedDate: new Date().toISOString().split('T')[0]
          }
        : lead
    ));

    // Update broker's active leads count
    setBrokers(brokers.map(b => 
      b.id === parseInt(brokerId)
        ? { ...b, activeLeads: b.activeLeads + 1 }
        : b
    ));

    alert(`Lead assigned to ${broker.name} successfully!`);
  };

  // Bulk assignment
  const handleBulkAssign = () => {
    if (!selectedBroker || selectedLeads.length === 0) return;

    const broker = brokers.find(b => b.id === parseInt(selectedBroker));
    if (!broker) return;

    setLeads(leads.map(lead => 
      selectedLeads.includes(lead.id)
        ? { 
            ...lead, 
            status: "assigned",
            assignedBroker: broker.name,
            brokerId: broker.id,
            assignedDate: new Date().toISOString().split('T')[0]
          }
        : lead
    ));

    // Update broker's active leads count
    setBrokers(brokers.map(b => 
      b.id === parseInt(selectedBroker)
        ? { ...b, activeLeads: b.activeLeads + selectedLeads.length }
        : b
    ));

    setSelectedLeads([]);
    setShowBulkAssignModal(false);
    setSelectedBroker("");
    alert(`${selectedLeads.length} leads assigned to ${broker.name} successfully!`);
  };

  // Auto distribute based on rules
  const handleAutoDistribute = () => {
    const unassignedLeads = leads.filter(lead => lead.status === "unassigned");
    let assignedCount = 0;

    const updatedLeads = leads.map(lead => {
      if (lead.status !== "unassigned") return lead;

      // Find best broker based on rules
      const availableBrokers = brokers.filter(broker => 
        broker.status === "active" && broker.activeLeads < broker.maxCapacity
      );

      if (availableBrokers.length === 0) return lead;

      // Rule 1: Location match
      let bestBroker = availableBrokers.find(broker => 
        lead.location.includes(broker.location.split(',')[1]?.trim())
      );

      // Rule 2: Specialization match
      if (!bestBroker) {
        bestBroker = availableBrokers.find(broker => 
          broker.specialization.toLowerCase().includes(lead.propertyType.toLowerCase())
        );
      }

      // Rule 3: Workload balance (lowest active leads)
      if (!bestBroker) {
        bestBroker = availableBrokers.sort((a, b) => a.activeLeads - b.activeLeads)[0];
      }

      if (bestBroker) {
        assignedCount++;
        return {
          ...lead,
          status: "assigned",
          assignedBroker: bestBroker.name,
          brokerId: bestBroker.id,
          assignedDate: new Date().toISOString().split('T')[0]
        };
      }

      return lead;
    });

    setLeads(updatedLeads);
    alert(`Auto-distributed ${assignedCount} leads successfully!`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      unassigned: { color: "bg-gray-100 text-gray-800", label: "Unassigned" },
      assigned: { color: "bg-green-100 text-green-800", label: "Assigned" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      contacted: { color: "bg-blue-100 text-blue-800", label: "Contacted" }
    };
    
    const config = statusConfig[status] || statusConfig.unassigned;
    
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Lead Distribution</h1>
            <p className="text-gray-600">Manage and distribute leads to brokers efficiently</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowRulesModal(true)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <CogIcon className="h-5 w-5 mr-2" />
              Rules
            </button>
            <button
              onClick={handleAutoDistribute}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Auto Distribute
            </button>
            <button
              onClick={() => setShowBulkAssignModal(true)}
              disabled={selectedLeads.length === 0}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors disabled:opacity-50"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              Bulk Assign ({selectedLeads.length})
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.status === 'unassigned').length}
              </div>
              <div className="text-sm text-gray-600">Unassigned</div>
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
                {leads.filter(l => l.status === 'assigned').length}
              </div>
              <div className="text-sm text-gray-600">Assigned</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {brokers.filter(b => b.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Brokers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <option value="unassigned">Unassigned</option>
              <option value="assigned">Assigned</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
            </select>
          </div>
          
          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Broker Capacity Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Broker Capacity Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {brokers.map(broker => (
            <div key={broker.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{broker.name}</h4>
                  <p className="text-sm text-gray-600">{broker.location}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  broker.status === 'active' ? 'bg-green-100 text-green-800' :
                  broker.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {broker.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Leads:</span>
                  <span className="font-medium">{broker.activeLeads}/{broker.maxCapacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      (broker.activeLeads / broker.maxCapacity) > 0.8 ? 'bg-red-500' :
                      (broker.activeLeads / broker.maxCapacity) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(broker.activeLeads / broker.maxCapacity) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Success Rate: {broker.successRate}%</span>
                  <span>Rating: {broker.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
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
                      <div className="text-sm font-medium text-gray-900">{lead.customerName}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.propertyType} - {lead.bhk}</div>
                      <div className="text-sm text-gray-500">{lead.location}</div>
                      <div className="text-sm text-green-600">{lead.budget}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {getStatusBadge(lead.status)}
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
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAssignLead(lead.id, e.target.value);
                          }
                        }}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                        defaultValue=""
                      >
                        <option value="">Assign Broker</option>
                        {brokers
                          .filter(broker => broker.status === 'active' && broker.activeLeads < broker.maxCapacity)
                          .map(broker => (
                            <option key={broker.id} value={broker.id}>
                              {broker.name} ({broker.activeLeads}/{broker.maxCapacity})
                            </option>
                          ))
                        }
                      </select>
                    )}
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
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Assignment Modal */}
      <AnimatePresence>
        {showBulkAssignModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowBulkAssignModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Bulk Assign Leads</h3>
                  <button
                    onClick={() => setShowBulkAssignModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      Assign {selectedLeads.length} selected leads to:
                    </p>
                    <select
                      value={selectedBroker}
                      onChange={(e) => setSelectedBroker(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select Broker</option>
                      {brokers
                        .filter(broker => broker.status === 'active')
                        .map(broker => (
                          <option key={broker.id} value={broker.id}>
                            {broker.name} - {broker.location} ({broker.activeLeads}/{broker.maxCapacity})
                          </option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowBulkAssignModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBulkAssign}
                    disabled={!selectedBroker}
                    className="px-4 py-2 bg-orange-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
                  >
                    Assign Leads
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Distribution Rules Modal */}
      <AnimatePresence>
        {showRulesModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowRulesModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Distribution Rules</h3>
                  <button
                    onClick={() => setShowRulesModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {distributionRules.map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{rule.name}</h4>
                        <p className="text-sm text-gray-600">{rule.criteria}</p>
                        <p className="text-xs text-gray-500">Assigned: {rule.assignedCount} leads</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">Priority: {rule.priority}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rule.active}
                            onChange={(e) => {
                              setDistributionRules(distributionRules.map(r => 
                                r.id === rule.id ? { ...r, active: e.target.checked } : r
                              ));
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowRulesModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
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

export default LeadDistribution;
