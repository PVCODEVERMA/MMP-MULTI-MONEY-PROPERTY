import React, { useState, useEffect } from 'react';
import {
  PhoneIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import {
  PhoneArrowUpRightIcon,
} from '@heroicons/react/24/solid';

const UpcomingCalls = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCall, setSelectedCall] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCalls = [
        {
          id: 1,
          leadName: 'Rohit Sharma',
          phone: '+91 9811000001',
          purpose: 'Property Discussion',
          scheduledTime: '2024-01-15T15:30:00',
          duration: '30 mins',
          priority: 'high',
          status: 'scheduled',
          notes: 'Interested in 2BHK in Sector 45',
        },
        {
          id: 2,
          leadName: 'Anjali Singh',
          phone: '+91 9811000002',
          purpose: 'Follow-up Call',
          scheduledTime: '2024-01-15T16:00:00',
          duration: '15 mins',
          priority: 'medium',
          status: 'scheduled',
          notes: 'Asked about rental properties',
        },
        {
          id: 3,
          leadName: 'Vikram Patel',
          phone: '+91 9811000003',
          purpose: 'Initial Consultation',
          scheduledTime: '2024-01-16T11:00:00',
          duration: '45 mins',
          priority: 'high',
          status: 'scheduled',
          notes: 'NRI investor, budget 2Cr',
        },
      ];
      setCalls(mockCalls);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCallNow = (call) => {
    console.log('Initiating call to:', call.leadName, call.phone);
    alert(`Calling ${call.leadName} at ${call.phone}`);
  };

  const handleCompleteCall = (callId) => {
    setCalls(prev => prev.map(call => 
      call.id === callId ? { ...call, status: 'completed' } : call
    ));
  };

  const handleReschedule = (callId) => {
    setSelectedCall(calls.find(call => call.id === callId));
    setShowModal(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded mb-4"></div>
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
            <PhoneIcon className="h-8 w-8 text-blue-600" />
            Upcoming Calls
          </h1>
          <p className="text-gray-600 mt-2">Manage your scheduled phone calls with leads and clients</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{calls.length}</div>
            <div className="text-sm text-gray-600">Total Calls</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {calls.filter(call => call.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">
              {calls.filter(call => call.status === 'scheduled').length}
            </div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-red-600">
              {calls.filter(call => call.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
        </div>

        {/* Calls List */}
        <div className="space-y-4">
          {calls.map((call) => (
            <div key={call.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Call Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{call.leadName}</h3>
                      <p className="text-gray-600">{call.phone}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(call.priority)}`}>
                      {call.priority}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>{formatDateTime(call.scheduledTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" />
                      <span>{call.duration}</span>
                    </div>
                    <div>
                      <span className="font-medium">Purpose:</span> {call.purpose}
                    </div>
                  </div>

                  {call.notes && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Notes:</span> {call.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCallNow(call)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <PhoneArrowUpRightIcon className="h-4 w-4" />
                    Call Now
                  </button>
                  
                  <button
                    onClick={() => handleCompleteCall(call.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Mark Complete"
                  >
                    <CheckCircleIcon className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={() => handleReschedule(call.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Reschedule"
                  >
                    <CalendarDaysIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {calls.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <PhoneIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming calls</h3>
            <p className="text-gray-600">You don't have any scheduled calls at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingCalls;