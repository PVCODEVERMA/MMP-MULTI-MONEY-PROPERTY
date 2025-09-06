import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  UserCircleIcon,
  CubeIcon,
  CogIcon,
  MapPinIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const BrokerSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/broker/dashboard',
      icon: HomeIcon,
      description: 'Business Overview',
      badge: null
    },
    {
      name: 'My Leads',
      href: '/broker/leads',
      icon: DocumentTextIcon,
      description: 'Client Inquiries',
      badge: '24'
    },
    {
      name: 'Properties',
      href: '/broker/properties',
      icon: BuildingOfficeIcon,
      description: 'Submit & Manage',
      badge: '18'
    },
    {
      name: 'Packages',
      href: '/broker/packages',
      icon: CubeIcon,
      description: 'Plans & Billing',
      badge: 'Premium'
    },
    {
      name: 'Reports',
      href: '/broker/reports',
      icon: ChartBarIcon,
      description: 'Performance Analytics',
      badge: null
    },
    {
      name: 'Profile',
      href: '/broker/profile',
      icon: UserCircleIcon,
      description: 'Account Settings',
      badge: null
    }
  ];

  // Get user avatar URL
  const getAvatarUrl = () => {
    if (user?.profile?.avatar?.url) {
      return user.profile.avatar.url;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Broker')}&background=10B981&color=ffffff&size=100`;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Multi Money</h1>
              <p className="text-xs text-green-100">Broker Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-white hover:bg-white/20 rounded"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Broker Profile Section */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={getAvatarUrl()}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-green-500 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {user?.name || 'Real Estate Broker'}
              </h3>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              <div className="flex items-center mt-1">
                <StarIcon className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                <span className="text-xs text-gray-600">4.8 Rating</span>
                <span className="ml-2 text-xs text-green-600 font-medium">
                  {user?.profile?.experience || 2}+ years exp
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-3 space-y-1">
            {user?.phone && (
              <div className="flex items-center text-xs text-gray-600">
                <PhoneIcon className="w-3 h-3 mr-2" />
                <span>{user.phone}</span>
              </div>
            )}
            <div className="flex items-center text-xs text-gray-600">
              <EnvelopeIcon className="w-3 h-3 mr-2" />
              <span className="truncate">{user?.email}</span>
            </div>
            {user?.companyName && (
              <div className="flex items-center text-xs text-gray-600">
                <BuildingOfficeIcon className="w-3 h-3 mr-2" />
                <span className="truncate">{user.companyName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                <div className="flex items-center min-w-0 flex-1">
                  <IconComponent
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-500'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className={`font-medium truncate ${isActive ? 'text-white' : ''}`}>
                      {item.name}
                    </div>
                    <div className={`text-xs opacity-75 truncate ${
                      isActive ? 'text-green-100' : 'text-gray-500 group-hover:text-green-400'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </div>
                {item.badge && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
                    isActive 
                      ? 'bg-white text-green-600' 
                      : item.badge === 'Premium' 
                        ? 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white'
                        : 'bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Performance Summary */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="text-center">
              <BuildingOfficeIcon className="w-6 h-6 mx-auto mb-2" />
              <h4 className="font-semibold text-sm">This Month</h4>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="font-bold text-lg">7</div>
                  <div className="text-green-100">Deals Closed</div>
                </div>
                <div>
                  <div className="font-bold text-lg">₹2.4M</div>
                  <div className="text-green-100">Revenue</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1 animate-pulse"></div>
                  <span>24 Active Leads</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/broker/properties"
              className="flex items-center justify-center p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors text-xs font-medium"
            >
              <BuildingOfficeIcon className="w-4 h-4 mr-1" />
              Add Property
            </Link>
            <Link
              to="/broker/leads"
              className="flex items-center justify-center p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors text-xs font-medium"
            >
              <DocumentTextIcon className="w-4 h-4 mr-1" />
              View Leads
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default BrokerSidebar;
