import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { 
  DocumentTextIcon, 
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PhoneIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const BrokerDashboard = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Broker Statistics
  const brokerStats = [
    {
      title: 'Active Leads',
      value: '24',
      change: '+6%',
      trend: 'up',
      icon: DocumentTextIcon,
      color: 'blue'
    },
    {
      title: 'Properties Listed',
      value: '18',
      change: '+3%',
      trend: 'up',
      icon: BuildingOfficeIcon,
      color: 'green'
    },
    {
      title: 'This Month Deals',
      value: '7',
      change: '+40%',
      trend: 'up',
      icon: ChartBarIcon,
      color: 'purple'
    },
    {
      title: 'Total Commission',
      value: '₹2.4M',
      change: '+25%',
      trend: 'up',
      icon: CurrencyRupeeIcon,
      color: 'emerald'
    }
  ];

  const recentLeads = [
    {
      name: 'Rajesh Kumar',
      property: '3BHK Apartment in Bandra',
      budget: '₹2.5Cr',
      time: '2 hours ago',
      status: 'hot',
      phone: '+91 98765 43210'
    },
    {
      name: 'Priya Sharma',
      property: '2BHK Villa in Juhu',
      budget: '₹1.8Cr',
      time: '5 hours ago',
      status: 'warm',
      phone: '+91 98765 43211'
    },
    {
      name: 'Amit Gupta',
      property: 'Office Space in BKC',
      budget: '₹5Cr',
      time: '1 day ago',
      status: 'cold',
      phone: '+91 98765 43212'
    }
  ];

  const recentProperties = [
    {
      title: 'Luxury 4BHK Penthouse',
      location: 'Worli, Mumbai',
      price: '₹8.5Cr',
      status: 'approved',
      views: 234,
      image: '/api/placeholder/300/200'
    },
    {
      title: '3BHK Sea View Apartment',
      location: 'Marine Drive, Mumbai',
      price: '₹6.2Cr',
      status: 'pending',
      views: 156,
      image: '/api/placeholder/300/200'
    },
    {
      title: 'Commercial Office Space',
      location: 'Andheri East, Mumbai',
      price: '₹12Cr',
      status: 'approved',
      views: 89,
      image: '/api/placeholder/300/200'
    }
  ];

  const upcomingSchedule = [
    {
      time: '10:00 AM',
      title: 'Site Visit with Mr. Sharma',
      location: 'Bandra West Property',
      type: 'meeting'
    },
    {
      time: '2:30 PM',
      title: 'Client Call - Property Discussion',
      location: 'Phone Call',
      type: 'call'
    },
    {
      time: '4:00 PM',
      title: 'Property Documentation',
      location: 'Office',
      type: 'work'
    }
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-yellow-100 text-yellow-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {getGreeting()}, {user?.name}! 🏠
            </h1>
            <p className="text-green-100 text-lg">
              Ready to close some deals today? You have 24 active leads waiting.
            </p>
            <div className="mt-3 flex items-center space-x-4">
              <div className="inline-flex items-center px-3 py-1 bg-green-500/30 rounded-full text-sm">
                <StarIcon className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                4.8 Broker Rating
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-green-500/30 rounded-full text-sm">
                <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                {user?.profile?.experience || 2}+ Years Experience
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-green-100 text-sm">Today</div>
            <div className="font-semibold text-lg">
              {currentTime.toLocaleDateString('en-IN', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-green-100 text-sm">
              {currentTime.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {brokerStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-3">
                    {stat.trend === 'up' ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                  <IconComponent className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2 text-green-500" />
            Recent Leads
          </h2>
          <div className="space-y-4">
            {recentLeads.map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{lead.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{lead.property}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-green-600">{lead.budget}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">{lead.time}</span>
                      <button className="text-green-600 hover:text-green-700">
                        <PhoneIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-green-600 hover:text-green-700 font-medium text-sm">
              View All Leads →
            </button>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
            Today's Schedule
          </h2>
          <div className="space-y-4">
            {upcomingSchedule.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 w-12 text-xs font-medium text-gray-600 mt-1">
                  {item.time}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.location}</p>
                </div>
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.type === 'meeting' ? 'bg-green-500' :
                  item.type === 'call' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BuildingOfficeIcon className="h-5 w-5 mr-2 text-green-500" />
          My Recent Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProperties.map((property, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <BuildingOfficeIcon className="h-12 w-12 text-gray-400" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(property.status)}`}>
                    {property.status.toUpperCase()}
                  </span>
                  <div className="flex items-center text-gray-400">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    <span className="text-xs">{property.views}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-green-600">{property.price}</span>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add New Property', icon: BuildingOfficeIcon, color: 'green', href: '/broker/properties' },
            { label: 'View Active Leads', icon: DocumentTextIcon, color: 'blue', href: '/broker/leads' },
            { label: 'Buy Package', icon: ChartBarIcon, color: 'purple', href: '/broker/packages' },
            { label: 'Performance Report', icon: CurrencyRupeeIcon, color: 'orange', href: '/broker/reports' }
          ].map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={() => window.location.href = action.href}
                className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all text-left group"
              >
                <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`h-6 w-6 text-${action.color}-600`} />
                </div>
                <div className="text-sm font-medium text-gray-900">{action.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;
