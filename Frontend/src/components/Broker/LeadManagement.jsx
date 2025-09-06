// pages/broker/EnhancedLeadManagement.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShareIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
  StarIcon,
  EyeIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  BellIcon
} from "@heroicons/react/24/outline";

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [favoriteLeads, setFavoriteLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  
  // Subscription & Quota Management
  const [subscription, setSubscription] = useState({
    plan: "Standard",
    leadQuota: 100,
    usedLeads: 45,
    expiryDate: "2024-09-30",
    canReceiveLeads: true,
    dailyUpdateLimit: 10,
    updatesUsedToday: 3
  });

  const [leadNotes, setLeadNotes] = useState({});
  const [followUpReminders, setFollowUpReminders] = useState([]);

  // Auto Lead Reception based on Subscription
  useEffect(() => {
    const receiveNewLeads = () => {
      if (subscription.canReceiveLeads && subscription.usedLeads < subscription.leadQuota) {
        // Simulate receiving new leads
        const newLead = {
          id: Date.now(),
          customerName: `Customer ${Date.now()}`,
          email: `customer${Date.now()}@email.com`,
          phone: "+91 98765 43210",
          budget: "80L - 1.2Cr",
          location: "Mumbai, Maharashtra",
          propertyType: "Residential",
          bhk: "2-3 BHK",
          status: "new",
          priority: "high",
          source: "Website",
          receivedDate: new Date().toISOString().split('T')[0],
          lastContact: null,
          notes: "Auto-received lead based on subscription",
          leadScore: Math.floor(Math.random() * 40) + 60,
          followUpDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
        };
        
        setLeads(prev => [newLead, ...prev]);
        setSubscription(prev => ({ ...prev, usedLeads: prev.usedLeads + 1 }));
        
        // Show notification
        showLeadNotification(newLead);
      }
    };

    // Check for new leads every 30 seconds (in real app, use WebSocket)
    const interval = setInterval(receiveNewLeads, 30000);
    return () => clearInterval(interval);
  }, [subscription]);

  const showLeadNotification = (lead) => {
    if (Notification.permission === "granted") {
      new Notification(`New Lead Received!`, {
        body: `${lead.customerName} - ${lead.budget}`,
        icon: "/lead-icon.png"
      });
    }
  };

  // Request notification permission
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // 24-hour update limit based on plan
  const canUpdateLead = () => {
    const limits = {
      "Basic": 5,
      "Standard": 10,
      "Premium": 25
    };
    
    return subscription.updatesUsedToday < limits[subscription.plan];
  };

  const handleStatusUpdate = (leadId, newStatus) => {
    if (!canUpdateLead()) {
      alert(`Daily update limit reached! You can make ${subscription.dailyUpdateLimit} updates per day with your ${subscription.plan} plan.`);
      return;
    }

    setLeads(leads.map(lead => 
      lead.id === leadId ? { 
        ...lead, 
        status: newStatus, 
        lastContact: new Date().toISOString().split('T')[0] 
      } : lead
    ));
    
    setSubscription(prev => ({ 
      ...prev, 
      updatesUsedToday: prev.updatesUsedToday + 1 
    }));
  };

  // Favorites Management
  const toggleFavorite = (leadId) => {
    setFavoriteLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  // Notes Management
  const addNote = (leadId, note) => {
    setLeadNotes(prev => ({
      ...prev,
      [leadId]: [...(prev[leadId] || []), {
        id: Date.now(),
        note,
        timestamp: new Date().toISOString(),
        author: "Current User"
      }]
    }));
  };

  // Follow-up Reminders
  const addFollowUp = (leadId, reminderDate, reminderNote) => {
    setFollowUpReminders(prev => [...prev, {
      id: Date.now(),
      leadId,
      reminderDate,
      reminderNote,
      completed: false
    }]);
  };

  // Advanced Search & Filter
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm) ||
                         lead.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter;
    const isFavoriteFilter = statusFilter === "favorites" ? favoriteLeads.includes(lead.id) : true;
    
    return matchesSearch && matchesStatus && matchesPriority && isFavoriteFilter;
  });

  // Export Lead Data
  const exportLeads = (format) => {
    const exportData = filteredLeads.map(lead => ({
      Name: lead.customerName,
      Email: lead.email,
      Phone: lead.phone,
      Location: lead.location,
      Budget: lead.budget,
      Status: lead.status,
      'Lead Score': lead.leadScore,
      'Received Date': lead.receivedDate,
      'Last Contact': lead.lastContact || 'Not Contacted'
    }));

    if (format === 'csv') {
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
    }
  };

  return (
    <div className="space-y-6">
      {/* Subscription Status Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {subscription.plan} Plan Status
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Lead Quota:</span>
                <span className="ml-2 font-medium">{subscription.usedLeads}/{subscription.leadQuota}</span>
              </div>
              <div>
                <span className="text-gray-600">Daily Updates:</span>
                <span className="ml-2 font-medium">{subscription.updatesUsedToday}/{subscription.dailyUpdateLimit}</span>
              </div>
              <div>
                <span className="text-gray-600">Expires:</span>
                <span className="ml-2 font-medium">{subscription.expiryDate}</span>
              </div>
              <div>
                <span className="text-gray-600">Auto-Receive:</span>
                <span className={`ml-2 font-medium ${subscription.canReceiveLeads ? 'text-green-600' : 'text-red-600'}`}>
                  {subscription.canReceiveLeads ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((subscription.usedLeads / subscription.leadQuota) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Used</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                subscription.usedLeads / subscription.leadQuota > 0.8 
                  ? 'bg-red-500' 
                  : subscription.usedLeads / subscription.leadQuota > 0.6 
                    ? 'bg-yellow-500' 
                    : 'bg-blue-500'
              }`}
              style={{ width: `${(subscription.usedLeads / subscription.leadQuota) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Warnings */}
        {subscription.usedLeads / subscription.leadQuota > 0.8 && (
          <div className="mt-3 flex items-center text-red-600">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            <span className="text-sm">Lead quota running low! Consider upgrading your plan.</span>
          </div>
        )}

        {!canUpdateLead() && (
          <div className="mt-3 flex items-center text-orange-600">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            <span className="text-sm">Daily update limit reached. Resets in {24 - new Date().getHours()} hours.</span>
          </div>
        )}
      </div>

      {/* Header with Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Lead Management</h1>
            <p className="text-gray-600">Track and manage all your property leads</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => exportLeads('csv')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Export CSV
            </button>
            <button
              onClick={() => setShowCalendarModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads by name, email, phone, or location..."
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
              <option value="contacted">Contacted</option>
              <option value="interested">Interested</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed</option>
              <option value="lost">Lost</option>
              <option value="favorites">⭐ Favorites</option>
            </select>
          </div>
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <div className="text-sm text-gray-600 flex items-center justify-center">
            <span className="font-medium">{filteredLeads.length}</span>
            <span className="ml-1">leads found</span>
          </div>
        </div>
      </div>

      {/* Leads List with Enhanced Features */}
      <div className="space-y-4">
        {filteredLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{lead.customerName}</h3>
                      <button
                        onClick={() => toggleFavorite(lead.id)}
                        className={`ml-2 p-1 rounded ${
                          favoriteLeads.includes(lead.id) 
                            ? 'text-yellow-500' 
                            : 'text-gray-300 hover:text-yellow-500'
                        }`}
                      >
                        <HeartIcon className="h-5 w-5" fill={favoriteLeads.includes(lead.id) ? 'currentColor' : 'none'} />
                      </button>
                      {lead.status === 'new' && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full animate-pulse">
                          New
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <EnvelopeIcon className="h-4 w-4 mr-2" />
                        {lead.email}
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        {lead.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {lead.location}
                      </div>
                      <div className="flex items-center">
                        <CurrencyRupeeIcon className="h-4 w-4 mr-2" />
                        {lead.budget}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`text-sm font-medium px-2 py-1 rounded ${
                      lead.leadScore >= 80 ? 'bg-green-100 text-green-800' :
                      lead.leadScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Score: {lead.leadScore}
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      lead.priority === 'high' ? 'bg-red-100 text-red-800' :
                      lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      lead.status === 'new' ? 'bg-green-100 text-green-800' :
                      lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'qualified' ? 'bg-purple-100 text-purple-800' :
                      lead.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Lead Notes Preview */}
                {leadNotes[lead.id] && leadNotes[lead.id].length > 0 && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Latest Note:</span> {leadNotes[lead.id].slice(-1)[0].note}
                    </div>
                  </div>
                )}

                {/* Follow-up Reminder */}
                {followUpReminders.find(r => r.leadId === lead.id && !r.completed) && (
                  <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                    <div className="flex items-center text-sm text-yellow-800">
                      <BellIcon className="h-4 w-4 mr-2" />
                      <span>Follow-up reminder: {lead.followUpDate}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Received: {lead.receivedDate}</span>
                    {lead.lastContact && <span>Last Contact: {lead.lastContact}</span>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                      disabled={!canUpdateLead()}
                      className={`text-sm border border-gray-300 rounded px-2 py-1 ${
                        !canUpdateLead() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="interested">Interested</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                      <option value="lost">Lost</option>
                    </select>
                    
                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowNotesModal(true);
                      }}
                      className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                    >
                      Notes
                    </button>
                    
                    <button
                      onClick={() => handleViewLead(lead)}
                      className="p-2 text-gray-400 hover:text-blue-600"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    
                    <button className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                      Call
                    </button>
                    
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                      Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notes Modal */}
      {showNotesModal && selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowNotesModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Notes & Reminders - {selectedLead.customerName}
                </h3>
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Existing Notes */}
              <div className="mb-6 max-h-60 overflow-y-auto">
                <h4 className="font-medium text-gray-900 mb-3">Previous Notes</h4>
                {leadNotes[selectedLead.id]?.map((note) => (
                  <div key={note.id} className="mb-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      {new Date(note.timestamp).toLocaleString()} - {note.author}
                    </div>
                    <div className="text-gray-900">{note.note}</div>
                  </div>
                )) || <p className="text-gray-500 text-sm">No notes yet</p>}
              </div>

              {/* Add New Note */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Add New Note</h4>
                <textarea
                  id="newNote"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your note here..."
                />
              </div>

              {/* Follow-up Reminder */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Set Follow-up Reminder</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    id="reminderDate"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    id="reminderNote"
                    placeholder="Reminder note"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const noteText = document.getElementById('newNote').value;
                    const reminderDate = document.getElementById('reminderDate').value;
                    const reminderNote = document.getElementById('reminderNote').value;
                    
                    if (noteText.trim()) {
                      addNote(selectedLead.id, noteText.trim());
                    }
                    
                    if (reminderDate && reminderNote) {
                      addFollowUp(selectedLead.id, reminderDate, reminderNote);
                    }
                    
                    setShowNotesModal(false);
                  }}
                  className="px-4 py-2 bg-orange-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-600"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;
