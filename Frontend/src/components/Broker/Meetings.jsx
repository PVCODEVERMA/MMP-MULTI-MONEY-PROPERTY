import React, { useState, useEffect } from 'react';
import {
  CalendarDaysIcon,
  ClockIcon,
  UserCircleIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('upcoming'); // upcoming, completed, cancelled

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockMeetings = [
        {
          id: 1,
          title: 'Property Investment Discussion',
          clientName: 'Rajesh Kumar',
          company: 'Kumar Investments',
          phone: '+91 9811000004',
          email: 'rajesh@kumarinvestments.com',
          location: 'Office - Sector 44',
          scheduledDate: '2024-01-18',
          scheduledTime: '2:00 PM',
          duration: '1 hour',
          status: 'scheduled',
          purpose: 'Discuss commercial property investment',
          agenda: 'Review investment portfolio and new opportunities',
        },
        {
          id: 2,
          title: 'Builder Partnership Meeting',
          clientName: 'Sunita Sharma',
          company: 'Sharma Builders',
          phone: '+91 9811000005',
          email: 'sunita@sharmabuilders.com',
          location: 'Client Office - MG Road',
          scheduledDate: '2024-01-19',
          scheduledTime: '11:00 AM',
          duration: '2 hours',
          status: 'scheduled',
          purpose: 'Partnership discussion for new project',
          agenda: 'Discuss collaboration terms and project details',
        },
        {
          id: 3,
          title: 'Legal Documentation Review',
          clientName: 'Amit Verma',
          company: 'Verma & Associates',
          phone: '+91 9811000006',
          email: 'amit@vermalaw.com',
          location: 'Conference Room - Sector 45',
          scheduledDate: '2024-01-15',
          scheduledTime: '4:00 PM',
          duration: '1.5 hours',
          status: 'completed',
          purpose: 'Review property agreement documents',
          agenda: 'Finalize purchase agreement and legal terms',
        },
      ];
      setMeetings(mockMeetings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (meetingId, newStatus) => {
    setMeetings(prev => prev.map(meeting => 
      meeting.id === meetingId ? { ...meeting, status: newStatus } : meeting
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

  const filteredMeetings = meetings.filter(meeting => {
    if (view === 'upcoming') return meeting.status === 'scheduled';
    if (view === 'completed') return meeting.status === 'completed';
    if (view === 'cancelled') return meeting.status === 'cancelled';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded mb-4"></div>
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
            <CalendarDaysIcon className="h-8 w-8 text-purple-600" />
            Meetings
          </h1>
          <p className="text-gray-600 mt-2">Manage your business meetings and appointments</p>
        </div>

        {/* View Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'upcoming', label: 'Upcoming', count: meetings.filter(m => m.status === 'scheduled').length },
            { key: 'completed', label: 'Completed', count: meetings.filter(m => m.status === 'completed').length },
            { key: 'cancelled', label: 'Cancelled', count: meetings.filter(m => m.status === 'cancelled').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === tab.key
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                view === tab.key ? 'bg-purple-500' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Meetings List */}
        <div className="space-y-6">
          {filteredMeetings.map((meeting) => (
            <div key={meeting.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Meeting Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-xl mb-1">{meeting.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                        {meeting.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {/* Client Information */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <UserCircleIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{meeting.clientName}</div>
                          <div className="text-sm text-gray-600">{meeting.company}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <PhoneIcon className="h-4 w-4" />
                        <span>{meeting.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <EnvelopeIcon className="h-4 w-4" />
                        <span>{meeting.email}</span>
                      </div>
                    </div>

                    {/* Meeting Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Date:</span>
                        <span>{new Date(meeting.scheduledDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ClockIcon className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Time:</span>
                        <span>{meeting.scheduledTime} ({meeting.duration})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPinIcon className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Location:</span>
                        <span>{meeting.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Purpose and Agenda */}
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-sm text-gray-900">Purpose:</span>
                      <p className="text-sm text-gray-600 mt-1">{meeting.purpose}</p>
                    </div>
                    {meeting.agenda && (
                      <div>
                        <span className="font-medium text-sm text-gray-900">Agenda:</span>
                        <p className="text-sm text-gray-600 mt-1">{meeting.agenda}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  {meeting.status === 'scheduled' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(meeting.id, 'completed')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                        Complete
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(meeting.id, 'cancelled')}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        <XCircleIcon className="h-4 w-4" />
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMeetings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <CalendarDaysIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
            <p className="text-gray-600">No meetings match your current view.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meetings;