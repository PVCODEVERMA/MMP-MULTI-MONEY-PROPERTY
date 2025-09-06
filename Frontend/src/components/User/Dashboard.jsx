import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { 
  PlusIcon,
  BuildingOfficeIcon,
  EyeIcon,
  DocumentTextIcon,
  BellIcon,
  HomeIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import PropertySubmissionForm from './PropertySubmissionForm.jsx';

const Dashboard = () => {
  const { user } = useAuth();
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [userProperties, setUserProperties] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample user properties data
  const sampleProperties = [
    {
      id: 1,
      title: '2BHK Apartment in Bandra West',
      type: 'apartment',
      price: 15000000,
      location: 'Bandra West, Mumbai',
      status: 'pending',
      submittedAt: new Date('2025-09-01'),
      views: 45,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: '3BHK Villa with Garden',
      type: 'villa',
      price: 25000000,
      location: 'Juhu, Mumbai',
      status: 'approved',
      submittedAt: new Date('2025-08-28'),
      views: 128,
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Office Space in BKC',
      type: 'office',
      price: 50000000,
      location: 'Bandra Kurla Complex, Mumbai',
      status: 'rejected',
      submittedAt: new Date('2025-08-25'),
      views: 23,
      image: '/api/placeholder/300/200',
      rejectionReason: 'Incomplete documentation'
    }
  ];

  // Sample notifications
  const sampleNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Property Approved!',
      message: 'Your 3BHK Villa has been approved and is now live',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Documentation Required',
      message: 'Please upload missing documents for your BKC office property',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Inquiry',
      message: 'Someone is interested in your Bandra apartment',
      time: '2 days ago',
      read: true
    }
  ];

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      // Simulate API calls
      setTimeout(() => {
        setUserProperties(sampleProperties);
        setNotifications(sampleNotifications);
        setLoading(false);
        
        // Show welcome notification
        toast.success(`Welcome back, ${user?.name}! 🏠`, {
          duration: 4000,
          position: 'top-right'
        });
      }, 1000);
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handlePropertySubmission = (propertyData) => {
    // Add new property to the list
    const newProperty = {
      id: Date.now(),
      ...propertyData,
      status: 'pending',
      submittedAt: new Date(),
      views: 0
    };

    setUserProperties(prev => [newProperty, ...prev]);
    setShowPropertyForm(false);
    
    // Show success notification
    toast.success('Property submitted successfully! 🎉', {
      duration: 5000,
      position: 'top-right'
    });

    // Add notification
    const newNotification = {
      id: Date.now(),
      type: 'success',
      title: 'Property Submitted',
      message: `Your ${propertyData.type} property has been submitted for review`,
      time: 'Just now',
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Manage your properties and track their performance
              </p>
            </div>
            <div className="text-right">
              <div className="text-blue-100 text-sm">Your Properties</div>
              <div className="font-bold text-3xl">{userProperties.length}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => setShowPropertyForm(true)}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PlusIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Submit Property</h3>
            <p className="text-sm text-gray-600">List your property for sale or rent</p>
          </button>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">My Properties</h3>
            <p className="text-2xl font-bold text-blue-600">{userProperties.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <EyeIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Total Views</h3>
            <p className="text-2xl font-bold text-purple-600">
              {userProperties.reduce((sum, prop) => sum + prop.views, 0)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <BellIcon className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Notifications</h3>
            <p className="text-2xl font-bold text-orange-600">{unreadNotifications}</p>
            {unreadNotifications > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadNotifications}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Properties List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Your Properties</h2>
              <button
                onClick={() => setShowPropertyForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Property
              </button>
            </div>

            {userProperties.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
                <BuildingOfficeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Yet</h3>
                <p className="text-gray-600 mb-4">Start by submitting your first property</p>
                <button
                  onClick={() => setShowPropertyForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Submit Property
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(property.status)}`}>
                            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <HomeIcon className="h-4 w-4 mr-1" />
                            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {property.location}
                          </div>
                          <div className="flex items-center">
                            <EyeIcon className="h-4 w-4 mr-1" />
                            {property.views} views
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(property.price)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Submitted {property.submittedAt.toLocaleDateString()}
                          </div>
                        </div>

                        {property.status === 'rejected' && property.rejectionReason && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">
                              <strong>Rejection Reason:</strong> {property.rejectionReason}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
                {unreadNotifications > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {unreadNotifications} new
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 transition-colors ${
                      !notification.read 
                        ? 'bg-blue-50 border-l-blue-500' 
                        : 'bg-gray-50 border-l-gray-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {notifications.length === 0 && (
                <div className="text-center py-8">
                  <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No notifications yet</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Approved Properties</span>
                  <span className="font-semibold text-green-600">
                    {userProperties.filter(p => p.status === 'approved').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending Review</span>
                  <span className="font-semibold text-yellow-600">
                    {userProperties.filter(p => p.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Value</span>
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(userProperties.reduce((sum, p) => sum + p.price, 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Submission Modal */}
      {showPropertyForm && (
        <PropertySubmissionForm
          onClose={() => setShowPropertyForm(false)}
          onSubmit={handlePropertySubmission}
        />
      )}
    </div>
  );
};

export default Dashboard;
