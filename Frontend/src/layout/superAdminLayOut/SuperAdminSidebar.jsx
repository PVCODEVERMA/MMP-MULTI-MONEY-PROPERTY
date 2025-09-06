import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  HomeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  ShieldCheckIcon,
  XMarkIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

const SuperAdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/super-admin/dashboard',
      icon: HomeIcon,
      description: 'System Overview',
      badge: null
    },
    {
      name: 'User Management',
      href: '/super-admin/users',
      icon: UserGroupIcon,
      description: 'All Users',
      badge: '1,247'
    },
    {
      name: 'Companies',
      href: '/super-admin/companies',
      icon: BuildingOfficeIcon,
      description: 'Company Management',
      badge: '85'
    },
    {
      name: 'System Settings',
      href: '/super-admin/settings',
      icon: CogIcon,
      description: 'Configuration',
      badge: null
    },
    {
      name: 'Global Reports',
      href: '/super-admin/reports',
      icon: ChartBarIcon,
      description: 'Analytics & Reports',
      badge: null
    },
    {
      name: 'Package Management',
      href: '/super-admin/packages',
      icon: CubeIcon,
      description: 'Subscription Plans',
      badge: '12'
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Multi Money</h1>
              <p className="text-xs text-red-100">System Control</p>
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
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'S'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {user?.name || 'Super Admin'}
              </h3>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              <div className="flex items-center mt-1">
                <ShieldCheckIcon className="w-3 h-3 text-red-500 mr-1" />
                <span className="text-xs text-red-600 font-medium">Full System Access</span>
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
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <div className="flex items-center min-w-0 flex-1">
                  <IconComponent
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-500'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className={`font-medium truncate ${isActive ? 'text-white' : ''}`}>
                      {item.name}
                    </div>
                    <div className={`text-xs opacity-75 truncate ${
                      isActive ? 'text-red-100' : 'text-gray-500 group-hover:text-red-400'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </div>
                {item.badge && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
                    isActive 
                      ? 'bg-white text-red-600' 
                      : 'bg-red-100 text-red-600 group-hover:bg-red-500 group-hover:text-white'
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
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white text-center">
            <ShieldCheckIcon className="w-8 h-8 mx-auto mb-2" />
            <h4 className="font-semibold text-sm">System Administrator</h4>
            <p className="text-xs text-red-100 mt-1">
              Full Control & Oversight
            </p>
            <div className="mt-3 flex items-center justify-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                System Online
              </div>
              <div>v3.0</div>
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

export default SuperAdminSidebar;
