import React, { useState, useEffect } from 'react';
import {
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const SiteVisits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockVisits = [
        {
          id: 1,
          leadName: 'Rohit Sharma',
          phone: '+91 9811000001',
          property: '2BHK Apartment, Sector 45',
          address: 'Sector 45, Gurgaon',
          scheduledDate: '2024-01-16',
          scheduledTime: '10:00 AM',
          duration: '1 hour',
          status: 'scheduled',
          type: 'buyer',
          notes: 'First time visit, interested in ready-to-move',
        },
        {
          id: 2,
          leadName: 'Anjali Singh',
          phone: '+91 9811000002',
          property: '1BHK Rental, Sector 50',
          address: 'Sector 50, Gurgaon',
          scheduledDate: '2024-01-17',
          scheduledTime: '3:00 PM',
          duration: '45 mins',
          status: 'scheduled',
          type: 'renter',
          notes: 'Looking for furnished apartment',
        },
        {
          id: 3,
          leadName: 'Vikram Patel',
          phone: '+91 9811000003',
          property: '3BHK Villa, DLF Phase 3',
          address: 'DLF Phase 3, Gurgaon',
          scheduledDate: '2024-01-15',
          scheduledTime: '11:30 AM',
          duration: '2 hours',
          status: 'completed',
          type: 'investor',
          notes: 'NRI investor, budget 2Cr',
        },
      ];
      setVisits(mockVisits);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (visitId, newStatus) => {
    setVisits(prev => prev.map(visit => 
      visit.id === visitId ? { ...visit, status: newStatus } : visit
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'buyer': return 'bg-purple-100 text-purple-800';
      case 'renter': return 'bg-orange-100 text-orange-800';
      case 'investor': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVisits = visits.filter(visit => 
    filter === 'all' || visit.status === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MapPinIcon className="h-8 w-8 text-green-600" />
            Site Visits
          </h1>
          <p className="text-gray-600 mt-2">Manage your property site visits and appointments</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'scheduled', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Visits List */}
        <div className="space-y-4">
          {filteredVisits.map((visit) => (
            <div key={visit.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Visit Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <UserCircleIcon className="h-12 w-12 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{visit.leadName}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(visit.status)}`}>
                          {visit.status}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(visit.type)}`}>
                          {visit.type}
                        </span>
                      </div>
                      <p className="text-gray-600 flex items-center gap-2">
                        <PhoneIcon className="h-4 w-4" />
                        {visit.phone}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{visit.property}</div>
                        <div className="text-gray-500">{visit.address}</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span>{new Date(visit.scheduledDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        <span>{visit.scheduledTime} ({visit.duration})</span>
                      </div>
                    </div>
                  </div>

                  {visit.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Notes:</span> {visit.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {visit.status === 'scheduled' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(visit.id, 'completed')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                        Complete
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(visit.id, 'cancelled')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Cancel Visit"
                      >
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVisits.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <MapPinIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No site visits found</h3>
            <p className="text-gray-600">No site visits match your current filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteVisits;