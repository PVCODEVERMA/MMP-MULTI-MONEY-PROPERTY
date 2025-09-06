import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  TrophyIcon,
  CogIcon,
  MapPinIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const SubAdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/sub-admin/dashboard',
      icon: HomeIcon,
      description: 'Regional Overview',
      badge: null
    },
    {
      name: 'Brokers',
      href: '/sub-admin/brokers',
      icon: UserGroupIcon,
      description: 'Manage Team',
      badge: '45'
    },
    {
      name: 'Properties',
      href: '/sub-admin/properties',
      icon: BuildingOfficeIcon,
      description: 'Property Listings',
      badge: '342'
    },
    {
      name: 'Leads',
      href: '/sub-admin/leads',
      icon: DocumentTextIcon,
      description: 'Lead Distribution',
      badge: '24'
    },
    {
      name: 'Performance',
      href: '/sub-admin/performance',
      icon: TrophyIcon,
      description: 'Analytics & Reports',
      badge: null
    },
    {
      name: 'Analytics',
      href: '/sub-admin/analytics',
      icon: ChartBarIcon,
      description: 'Business Insights',
      badge: null
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Multi Money</h1>
              <p className="text-xs text-orange-100">Property Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-white hover:bg-white/20 rounded"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'S'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {user?.name || 'Sub Admin'}
              </h3>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              <div className="flex items-center mt-1">
                <MapPinIcon className="w-3 h-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">
                  {user?.territory || 'Mumbai Region'}
                </span>
              </div>
            </div>
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
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center min-w-0 flex-1">
                  <IconComponent
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className={`font-medium truncate ${isActive ? 'text-white' : ''}`}>
                      {item.name}
                    </div>
                    <div className={`text-xs opacity-75 truncate ${
                      isActive ? 'text-orange-100' : 'text-gray-500 group-hover:text-orange-400'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </div>
                {item.badge && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
                    isActive 
                      ? 'bg-white text-orange-600' 
                      : 'bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white text-center">
            <BuildingOfficeIcon className="w-8 h-8 mx-auto mb-2" />
            <h4 className="font-semibold text-sm">Regional Dashboard</h4>
            <p className="text-xs text-orange-100 mt-1">
              Managing {user?.territory || 'Mumbai'} Region
            </p>
            <div className="mt-3 flex items-center justify-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                Online
              </div>
              <div>v2.0</div>
            </div>
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

export default SubAdminSidebar;
