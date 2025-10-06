import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  TrophyIcon,
  MapPinIcon,
  UserPlusIcon, 
  UsersIcon
  
} from "@heroicons/react/24/outline";

import { FaUsersBetweenLines } from "react-icons/fa6";

const SubAdminSidebar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { user } = useAuth();
  const location = useLocation();

 const navigation = [
  { name: "Leads", href: "/subadmin-dashboard/leads", icon: UserPlusIcon },
  { name: "New Leads", href: "/subadmin-dashboard/new-leads", icon: UsersIcon },
  { name: "Dashboard", href: "/subadmin-dashboard/dashboard", icon: HomeIcon },
  { name: "Brokers", href: "/subadmin-dashboard/brokers", icon: UserGroupIcon },
  { name: "Properties", href: "/subadmin-dashboard/properties", icon: BuildingOfficeIcon },
  { name: "Leads", href: "/subadmin-dashboard/leads", icon: DocumentTextIcon },
  { name: "Performance", href: "/subadmin-dashboard/performance", icon: TrophyIcon },
  { name: "Analytics", href: "/subadmin-dashboard/analytics", icon: ChartBarIcon },
];


  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg border-r border-gray-200 transform transition-all duration-300 ease-in-out 
      ${sidebarCollapsed ? "w-20" : "w-64"} lg:translate-x-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-center h-16 bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] text-white">
        <div className="flex items-center space-x-3">
          <BuildingOfficeIcon className="w-6 h-6" />
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-lg font-bold leading-tight">Multi Money</h1>
              <p className="text-xs text-orange-100">Property Portal</p>
            </div>
          )}
        </div>
      </div>

      

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-3 rounded-lg mb-1 transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] text-white"
                  : "text-gray-700 hover:bg-orange-50 hover:text-[#ff9c00]"
              }`}
            >
              <Icon
                className={`h-5 w-5 flex-shrink-0 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-orange-600"
                }`}
              />
              {!sidebarCollapsed && (
                <span className="ml-3 font-medium truncate">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SubAdminSidebar;
