// pages/sub-admin/LeadDistribution.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShareIcon,
  UserGroupIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

const LeadDistribution = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      customerName: "Rahul Verma",
      email: "rahul.verma@gmail.com",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      propertyType: "Residential",
      budget: "50L - 1Cr",
      requirements: "Looking for 2-3 BHK apartment near office",
      receivedDate: "2024-08-29",
      priority: "high",
      status: "pending",
      assignedBroker: null,
      leadScore: 85
    },
    {
      id: 2,
      customerName: "Priya Singh",
      email: "priya.singh@gmail.com",
      phone: "+91 87654 32109",
      location: "Delhi, NCR",
      propertyType: "Commercial",
      budget: "2Cr - 5Cr",
      requirements: "Office space for IT company, 10000 sq ft",
      receivedDate: "2024-08-29",
      priority: "high",
      status: "assigned",
      assignedBroker: "Rajesh Kumar",
      leadScore: 92
    },
    {
      id: 3,
      customerName: "Amit Patel",
      email: "amit.patel@gmail.com",
      phone: "+91 76543 21098",
      location: "Bangalore, Karnataka",
      propertyType: "Residential",
      budget: "80L - 1.5Cr",
      requirements: "Villa or independent house with garden",
      receivedDate: "2024-08-28",
      priority: "medium",
      status: "assigned",
      assignedBroker: "Priya Sharma",
      leadScore: 78
    }
  ]);

  const [brokers, setBrokers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Mumbai, Maharashtra",
      specialization: "Residential",
      rating: 4.8,
      activeLeads: 12,
      capacity: 20,
      performance: "excellent"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Delhi, NCR",
      specialization: "Commercial",
      rating: 4.6,
      activeLeads: 8,
      capacity: 15,
      performance: "good"
    },
    {
      id: 3,
      name: "Amit Singh",
      location: "Bangalore, Karnataka",
      specialization: "Luxury",
      rating: 4.4,
      activeLeads: 6,
      capacity: 18,
      performance: "good"
    },
    {
      id: 4,
      name: "Sneha Patel",
      location: "Pune, Maharashtra",
      specialization: "Residential",
      rating: 4.2,
      activeLeads: 15,
      capacity: 25,
      performance: "average"
    }
  ]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [autoDistribute, setAutoDistribute] = useState(true);

  const getStatusBadge = (status) => {
    const classes = {
      pending: "bg-yellow-100 text-yellow-800",
      assigned: "bg-green-100 text-green-800",
      contacted: "bg-blue-100 text-blue-800",
      converted: "bg-purple-100 text-purple-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const classes = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[priority]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const getPerformanceBadge = (performance) => {
    const classes = {
      excellent: "bg-green-100 text-green-800",
      good: "bg-blue-100 text-blue-800",
      average: "bg-yellow-100 text-yellow-800",
      poor: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[performance]}`}>
        {performance.charAt(0).toUpperCase() + performance.slice(1)}
      </span>
    );
  };

  const handleAssignLead = (leadId, brokerId) => {
    const broker = brokers.find(b => b.id === brokerId);
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: 'assigned', assignedBroker: broker.name } : lead
    ));
    setBrokers(brokers.map(b => 
      b.id === brokerId ? { ...b, activeLeads: b.activeLeads + 1 } : b
    ));
    setShowAssignModal(false);
  };

  const handleAutoDistribute = () => {
    const pendingLeads = leads.filter(lead => lead.status === 'pending');
    let updatedLeads = [...leads];
    let updatedBrokers = [...brokers];

    pendingLeads.forEach(lead => {
      // Find best broker based on location, specialization, and capacity
      const availableBrokers = updatedBrokers.filter(broker => 
        broker.activeLeads < broker.capacity &&
        broker.location.includes(lead.location.split(',')[1]?.trim() || '') &&
        (broker.specialization.toLowerCase() === lead.propertyType.toLowerCase() ||
         broker.specialization === 'All')
      );

      if (availableBrokers.length > 0) {
        // Sort by performance and current load
        const bestBroker = availableBrokers.sort((a, b) => {
          const scoreA = a.rating * (1 - a.activeLeads / a.capacity);
          const scoreB = b.rating * (1 - b.activeLeads / b.capacity);
          return scoreB - scoreA;
        })[0];

        updatedLeads = updatedLeads.map(l => 
          l.id === lead.id ? { ...l, status: 'assigned', assignedBroker: bestBroker.name } : l
        );
        updatedBrokers = updatedBrokers.map(b => 
          b.id === bestBroker.id ? { ...b, activeLeads: b.activeLeads + 1 } : b
        );
      }
    });

    setLeads(updatedLeads);
    setBrokers(updatedBrokers);
  };

  const getLeadScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Lead Distribution</h1>
            <p className="text-gray-600">Assign leads to brokers based on their expertise and availability</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={autoDistribute}
                onChange={(e) => setAutoDistribute(e.target.checked)}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Auto Distribute</label>
            </div>
            <button
              onClick={handleAutoDistribute}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              Auto Distribute Pending
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending Assignment</div>
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
              <div className="text-sm text-gray-600">Assigned Today</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {brokers.filter(b => b.activeLeads < b.capacity).length}
              </div>
              <div className="text-sm text-gray-600">Available Brokers</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShareIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{leads.length}</div>
              <div className="text-sm text-gray-600">Total Leads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
          {leads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{lead.customerName}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-4 w-4 mr-1" />
                      {lead.email}
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 mr-1" />
                      {lead.phone}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {lead.location}
                    </div>
                    <div className="flex items-center">
                      <HomeIcon className="h-4 w-4 mr-1" />
                      {lead.propertyType}
                    </div>
                    <div className="flex items-center">
                      <CurrencyRupeeIcon className="h-4 w-4 mr-1" />
                      {lead.budget}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`text-sm font-medium ${getLeadScoreColor(lead.leadScore)}`}>
                    Score: {lead.leadScore}
                  </div>
                  {getPriorityBadge(lead.priority)}
                  {getStatusBadge(lead.status)}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{lead.requirements}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Received: {lead.receivedDate}</span>
                  {lead.assignedBroker && <span>Assigned to: {lead.assignedBroker}</span>}
                </div>
                {lead.status === 'pending' && (
                  <button
                    onClick={() => {
                      setSelectedLead(lead);
                      setShowAssignModal(true);
                    }}
                    className="px-3 py-1 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Assign Broker
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Broker Availability */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Broker Availability</h3>
          {brokers.map((broker, index) => (
            <motion.div
              key={broker.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{broker.name}</h4>
                {getPerformanceBadge(broker.performance)}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <div>{broker.location}</div>
                <div>Specialization: {broker.specialization}</div>
                <div>Rating: ★ {broker.rating}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {broker.activeLeads}/{broker.capacity} leads
                </span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${(broker.activeLeads / broker.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowAssignModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Assign Lead to Broker</h3>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Lead Details</h4>
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <div><strong>Customer:</strong> {selectedLead.customerName}</div>
                  <div><strong>Location:</strong> {selectedLead.location}</div>
                  <div><strong>Property Type:</strong> {selectedLead.propertyType}</div>
                  <div><strong>Budget:</strong> {selectedLead.budget}</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Available Brokers</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {brokers.filter(b => b.activeLeads < b.capacity).map((broker) => (
                    <div
                      key={broker.id}
                      className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleAssignLead(selectedLead.id, broker.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{broker.name}</div>
                          <div className="text-sm text-gray-600">{broker.location}</div>
                          <div className="text-sm text-gray-600">★ {broker.rating} • {broker.specialization}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {broker.activeLeads}/{broker.capacity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadDistribution;
