import React from 'react';
import { 
  HeartIcon, 
  BuildingOfficeIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext.jsx';

const BrokerFooter = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();
  const currentTime = new Date().toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="px-6 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          
          {/* Left Section - Broker Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <BuildingOfficeIcon className="w-4 h-4 text-green-500 mr-2" />
              <span className="font-medium text-gray-900">
                © {currentYear} Multi Money Property
              </span>
            </div>
            
            <div className="flex items-center">
              <HeartIcon className="w-4 h-4 text-red-500 mr-1" />
              <span>Made for real estate professionals</span>
            </div>

            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 text-blue-500 mr-2" />
              <span>Last active: {currentTime}</span>
            </div>
          </div>

          {/* Right Section - Links and Status */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
            
            {/* Quick Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="/broker/help" 
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Help Center
              </a>
              <a 
                href="/broker/support" 
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Support
              </a>
              <a 
                href="/broker/terms" 
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Terms
              </a>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-600 font-medium text-xs">Broker Portal: Active</span>
              </div>
              
              <div className="flex items-center">
                <ShieldCheckIcon className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium text-xs">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer with Broker Stats */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border-t border-green-200 px-6 py-3">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
          
          {/* Broker Performance Summary */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center text-green-700">
              <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
              <span className="font-medium">4.8 Rating</span>
            </div>
            
            <div className="flex items-center text-green-700">
              <BuildingOfficeIcon className="w-4 h-4 mr-1" />
              <span className="font-medium">18 Active Properties</span>
            </div>
            
            <div className="flex items-center text-green-700">
              <span className="font-medium">24 Active Leads</span>
            </div>
            
            <div className="flex items-center text-green-700">
              <span className="font-medium">85% Success Rate</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {user?.phone && (
              <div className="flex items-center">
                <PhoneIcon className="w-4 h-4 text-green-500 mr-1" />
                <span>{user.phone}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <EnvelopeIcon className="w-4 h-4 text-green-500 mr-1" />
              <span>{user?.email}</span>
            </div>

            {user?.profile?.locationCoverage && user.profile.locationCoverage.length > 0 && (
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 text-green-500 mr-1" />
                <span>{user.profile.locationCoverage[0]}</span>
                {user.profile.locationCoverage.length > 1 && (
                  <span className="ml-1">+{user.profile.locationCoverage.length - 1}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-green-600 text-white px-6 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="flex items-center space-x-4">
            <span>Broker ID: {user?.id || 'MMP' + Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
            <span>•</span>
            <span>License: Valid</span>
            <span>•</span>
            <span>Platform Version: 3.0</span>
          </div>
          
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <span>Powered by Multi Money Property</span>
            <BuildingOfficeIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BrokerFooter;
