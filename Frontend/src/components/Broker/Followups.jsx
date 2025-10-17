import React, { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import {
  PhoneArrowUpRightIcon,
  EnvelopeOpenIcon,
} from '@heroicons/react/24/solid';

// Followup Lead Card Component
const FollowupLeadCard = ({ lead, onStatusUpdate, onFollowup }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <UserCircleIcon className="h-10 w-10 text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{lead.name}</h3>
            <p className="text-xs text-gray-600">{lead.phone}</p>
            <p className="text-xs text-gray-500">{lead.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.followupStatus)}`}>
            {lead.followupStatus}
          </span>
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(lead.priority)}`}></div>
        </div>
      </div>

      {/* Lead Details */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
        <div>
          <span className="font-medium">Property:</span> {lead.propertyType}
        </div>
        <div>
          <span className="font-medium">Location:</span> {lead.location}
        </div>
        <div>
          <span className="font-medium">Budget:</span> {lead.budget}
        </div>
        <div>
          <span className="font-medium">Source:</span> {lead.source}
        </div>
      </div>

      {/* Followup Information */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
          <div className="flex items-center space-x-1">
            <ClockIcon className="h-4 w-4" />
            <span>Last followup: {lead.lastFollowup}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CalendarDaysIcon className="h-4 w-4" />
            <span>Next: {lead.nextFollowup}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <button
              onClick={() => onFollowup(lead, 'call')}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Call"
            >
              <PhoneArrowUpRightIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onFollowup(lead, 'email')}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Email"
            >
              <EnvelopeOpenIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onFollowup(lead, 'sms')}
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="SMS"
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setShowActions(!showActions)}
            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700"
          >
            <span>Actions</span>
            {showActions ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
          </button>
        </div>

        {/* Expanded Actions */}
        {showActions && (
          <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => onStatusUpdate(lead.id, 'completed')}
              className="flex items-center justify-center space-x-1 px-2 py-1.5 bg-green-50 text-green-700 rounded text-xs hover:bg-green-100 transition-colors"
            >
              <CheckCircleIcon className="h-4 w-4" />
              <span>Complete</span>
            </button>
            <button
              onClick={() => onStatusUpdate(lead.id, 'pending')}
              className="flex items-center justify-center space-x-1 px-2 py-1.5 bg-yellow-50 text-yellow-700 rounded text-xs hover:bg-yellow-100 transition-colors"
            >
              <ClockIcon className="h-4 w-4" />
              <span>Pending</span>
            </button>
            <button
              onClick={() => onStatusUpdate(lead.id, 'scheduled')}
              className="flex items-center justify-center space-x-1 px-2 py-1.5 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100 transition-colors"
            >
              <CalendarDaysIcon className="h-4 w-4" />
              <span>Reschedule</span>
            </button>
            <button
              onClick={() => onStatusUpdate(lead.id, 'overdue')}
              className="flex items-center justify-center space-x-1 px-2 py-1.5 bg-red-50 text-red-700 rounded text-xs hover:bg-red-100 transition-colors"
            >
              <XCircleIcon className="h-4 w-4" />
              <span>Overdue</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Filter Component
const FollowupFilters = ({ filters, onFilterChange, onSortChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort */}
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent"
            value={filters.sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="nextFollowup">Next Followup</option>
            <option value="priority">Priority</option>
            <option value="lastFollowup">Last Followup</option>
            <option value="name">Name</option>
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters 
                ? 'bg-[#ff9c00] text-white border-[#ff9c00]' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FunnelIcon className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent"
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent"
              value={filters.priority}
              onChange={(e) => onFilterChange('priority', e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent"
              value={filters.source}
              onChange={(e) => onFilterChange('source', e.target.value)}
            >
              <option value="all">All Sources</option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="walkin">Walk-in</option>
              <option value="social">Social Media</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Followup Date</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent"
              value={filters.dateRange}
              onChange={(e) => onFilterChange('dateRange', e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="thisWeek">This Week</option>
              <option value="nextWeek">Next Week</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// Stats Component
const FollowupStats = ({ leads }) => {
  const stats = {
    total: leads.length,
    pending: leads.filter(lead => lead.followupStatus === 'pending').length,
    overdue: leads.filter(lead => lead.followupStatus === 'overdue').length,
    scheduled: leads.filter(lead => lead.followupStatus === 'scheduled').length,
    highPriority: leads.filter(lead => lead.priority === 'high').length,
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        <div className="text-sm text-gray-600">Total Leads</div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
        <div className="text-sm text-gray-600">Pending</div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
        <div className="text-sm text-gray-600">Overdue</div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
        <div className="text-sm text-gray-600">Scheduled</div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
        <div className="text-sm text-gray-600">High Priority</div>
      </div>
    </div>
  );
};

// Main FollowupLeads Component
const FollowupLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    source: 'all',
    dateRange: 'all',
    sortBy: 'nextFollowup',
  });

  // Mock data for followup leads
  useEffect(() => {
    const fetchFollowupLeads = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const mockLeads = [
          {
            id: 1,
            name: 'Rohit Sharma',
            phone: '+91 9811000001',
            email: 'rohit.sharma@email.com',
            propertyType: '2BHK Apartment',
            location: 'Sector 45, Gurgaon',
            budget: '₹75L - ₹90L',
            source: 'website',
            priority: 'high',
            followupStatus: 'pending',
            lastFollowup: '2 days ago',
            nextFollowup: 'Today, 3:00 PM',
            notes: 'Interested in ready-to-move properties',
          },
          {
            id: 2,
            name: 'Anjali Singh',
            phone: '+91 9811000002',
            email: 'anjali.singh@email.com',
            propertyType: '1BHK Rental',
            location: 'Sector 50, Gurgaon',
            budget: '₹15K - ₹20K/month',
            source: 'referral',
            priority: 'medium',
            followupStatus: 'scheduled',
            lastFollowup: '1 day ago',
            nextFollowup: 'Tomorrow, 11:00 AM',
            notes: 'Looking for furnished apartment',
          },
          {
            id: 3,
            name: 'Vikram Patel',
            phone: '+91 9811000003',
            email: 'vikram.patel@email.com',
            propertyType: 'Studio Apartment',
            location: 'Sector 52, Gurgaon',
            budget: '₹45L - ₹55L',
            source: 'website',
            priority: 'high',
            followupStatus: 'overdue',
            lastFollowup: '5 days ago',
            nextFollowup: 'Yesterday, 2:00 PM',
            notes: 'Urgent requirement',
          },
          {
            id: 4,
            name: 'Priya Mehta',
            phone: '+91 9811000004',
            email: 'priya.mehta@email.com',
            propertyType: '1BHK Purchase',
            location: 'Cyber City',
            budget: '₹60L - ₹70L',
            source: 'walkin',
            priority: 'low',
            followupStatus: 'completed',
            lastFollowup: '3 hours ago',
            nextFollowup: 'Next week',
            notes: 'Site visit scheduled',
          },
          {
            id: 5,
            name: 'Amit Kumar',
            phone: '+91 9811000005',
            email: 'amit.kumar@email.com',
            propertyType: '3BHK Villa',
            location: 'DLF Phase 3',
            budget: '₹1.2Cr - ₹1.5Cr',
            source: 'social',
            priority: 'medium',
            followupStatus: 'pending',
            lastFollowup: '1 week ago',
            nextFollowup: 'Today, 5:00 PM',
            notes: 'NRI investor',
          },
        ];

        setLeads(mockLeads);
        setLoading(false);
      }, 1000);
    };

    fetchFollowupLeads();
  }, []);

  // Filter and sort leads
  const filteredAndSortedLeads = leads
    .filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.phone.includes(filters.search) ||
        lead.email.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || lead.followupStatus === filters.status;
      const matchesPriority = filters.priority === 'all' || lead.priority === filters.priority;
      const matchesSource = filters.source === 'all' || lead.source === filters.source;

      return matchesSearch && matchesStatus && matchesPriority && matchesSource;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'name':
          return a.name.localeCompare(b.name);
        case 'lastFollowup':
          return new Date(b.lastFollowup) - new Date(a.lastFollowup);
        case 'nextFollowup':
        default:
          return new Date(a.nextFollowup) - new Date(b.nextFollowup);
      }
    });

  // Handle status updates
  const handleStatusUpdate = (leadId, newStatus) => {
    setLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.id === leadId ? { ...lead, followupStatus: newStatus } : lead
      )
    );
  };

  // Handle followup actions
  const handleFollowup = (lead, type) => {
    // In a real app, this would integrate with phone/email/SMS services
    console.log(`Initiating ${type} followup for:`, lead.name);
    
    // Update last followup time
    handleStatusUpdate(lead.id, 'completed');
    
    // Show success message (you can replace this with a toast notification)
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} followup initiated for ${lead.name}`);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Handle sort changes
  const handleSortChange = (sortBy) => {
    setFilters(prev => ({
      ...prev,
      sortBy
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-20 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Lead Follow-ups</h1>
        <p className="text-gray-600 mt-2">Manage and track your lead follow-up activities</p>
      </div>

      {/* Stats */}
      <FollowupStats leads={leads} />

      {/* Filters */}
      <FollowupFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      {/* Leads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAndSortedLeads.map(lead => (
          <FollowupLeadCard
            key={lead.id}
            lead={lead}
            onStatusUpdate={handleStatusUpdate}
            onFollowup={handleFollowup}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedLeads.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <UserCircleIcon className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default FollowupLeads;