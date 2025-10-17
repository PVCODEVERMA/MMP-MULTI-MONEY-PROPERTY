import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  TrophyIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const SubAdminSidebar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  // const { user } = useAuth();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/subadmin-dashboard/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Property Management",
      icon: BuildingOfficeIcon,
      subItems: [
        { name: "All Properties", href: "/subadmin-dashboard/properties" },
        { name: "Add / Edit Property", href: "/subadmin-dashboard/properties/add" },
        { name: "Attach Leads to Properties", href: "/subadmin-dashboard/properties/attach-leads" },
        { name: "Property Availability & Status", href: "/subadmin-dashboard/properties/status" },
      ],
    },
    {
      name: "MMP Management",
      href: "/subadmin-dashboard/platform-management",
      icon: TrophyIcon,
    },
    {
      name: "Customers",
      icon: UserCircleIcon,
      subItems: [
        { name: "All User", href: "/subadmin-dashboard/all-user" },
        { name: "Starter User", href: "/subadmin-dashboard/starter-user" },
        { name: "Growth User", href: "/subadmin-dashboard/growth-user" },
        { name: "Custom User", href: "/subadmin-dashboard/custom-user" },
        { name: "Activate Users", href: "/subadmin-dashboard/activate-users" },
        { name: "New User", href: "/subadmin-dashboard/new-users" },
       
      ],
    },
    {
      name: "Lead High",
      icon: DocumentTextIcon,
      subItems: [
        { name: "Add New High", href: "/subadmin-dashboard/high" },
        { name: "Lead Invoice", href: "/subadmin-dashboard/lead-invoice" },
        { name: "Assign Lead Table", href: "/subadmin-dashboard/assign-lead-table" },
        { name: "Track Actions", href: "/subadmin-dashboard/track-actions-high" },
        { name: "Close or Lose Lead", href: "/subadmin-dashboard/close-lose-high" },
        { name: "Generate Reports", href: "/subadmin-dashboard/generate-reports-high" },
      ],
    },
    {
      name: "Lead Medium",
      icon: DocumentTextIcon,
      subItems: [
        { name: "Add New Medium", href: "/subadmin-dashboard/medium" },
        { name: "Lead Invoice", href: "/subadmin-dashboard/lead-invoice-medium" },
        { name: "Assign Lead Table", href: "/subadmin-dashboard/assign-lead-table-medium" },
        { name: "Track Actions", href: "/subadmin-dashboard/track-actions-medium" },
        { name: "Close or Lose Lead", href: "/subadmin-dashboard/close-lose-medium" },
        { name: "Generate Reports", href: "/subadmin-dashboard/generate-reports-medium" },
      ],
    },
    {
      name: "Lead Low",
      icon: DocumentTextIcon,
      subItems: [
        { name: "Add New Low", href: "/subadmin-dashboard/low" },
        { name: "Lead Invoice", href: "/subadmin-dashboard/lead-invoice-low" },
        { name: "Assign Lead Table", href: "/subadmin-dashboard/assign-lead-table-low" },
        { name: "Track Actions", href: "/subadmin-dashboard/track-actions-low" },
        { name: "Close or Lose Lead", href: "/subadmin-dashboard/close-lose-low" },
        { name: "Generate Reports", href: "/subadmin-dashboard/generate-reports-low" },
      ],
    },
    
  ];

  // Check if any subitem is active for a given navigation item
  const isAnySubItemActive = (subItems) => {
    return subItems?.some((sub) => {
      // Exact match for pathname
      if (location.pathname === sub.href) return true;
      
      // Handle cases where the current path might be a child of the subitem href
      if (sub.href !== "/" && location.pathname.startsWith(sub.href)) {
        // Make sure it's not just a partial match (e.g., /properties should not match /property)
        const nextChar = location.pathname[sub.href.length];
        return !nextChar || nextChar === '/' || nextChar === '?';
      }
      
      return false;
    });
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? "w-20" : "w-64"} flex flex-col`}
    >
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-center h-16 bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white shadow-md">
        <div className="flex items-center space-x-3">
          <BuildingOfficeIcon className="w-6 h-6 flex-shrink-0" />
          {!sidebarCollapsed && (
            <div className="leading-tight">
              <h1 className="text-[15px] font-semibold tracking-wide">Multi Money</h1>
              <p className="text-[11px] text-blue-100">Property Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || 
                            (item.subItems && isAnySubItemActive(item.subItems));
            const isDropdownOpen = openDropdown === item.name;

            return (
              <li key={item.name} className="mb-1">
                {/* Main Menu Item */}
                {item.subItems ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer group
                      ${
                        isActive
                          ? "bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white shadow-md"
                          : "text-gray-700 hover:bg-blue-50 hover:text-[#154056]"
                      }`}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`h-5 w-5 flex-shrink-0 ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-[#154056]"
                        }`}
                      />
                      {!sidebarCollapsed && (
                        <span className="text-[13.5px] font-medium tracking-wide text-left">
                          {item.name}
                        </span>
                      )}
                    </div>
                    {!sidebarCollapsed && (
                      <motion.div 
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDownIcon 
                          className={`h-4 w-4 flex-shrink-0 ${
                            isActive ? "text-white" : "text-gray-400"
                          }`} 
                        />
                      </motion.div>
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white shadow-md"
                          : "text-gray-700 hover:bg-blue-50 hover:text-[#154056]"
                      }`}
                  >
                    <Icon
                      className={`h-5 w-5 flex-shrink-0 ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-[#154056]"
                      }`}
                    />
                    {!sidebarCollapsed && (
                      <span className="ml-2.5 text-[13.5px] font-medium truncate tracking-wide">
                        {item.name}
                      </span>
                    )}
                  </Link>
                )}

                {/* Submenu Items */}
                <AnimatePresence>
                  {isDropdownOpen && !sidebarCollapsed && item.subItems && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-8 mt-1 space-y-1"
                      role="menu"
                    >
                      {item.subItems.map((sub) => {
                        const isSubActive = location.pathname === sub.href || 
                                          (sub.href !== "/" && location.pathname.startsWith(sub.href));
                        return (
                          <li key={sub.name}>
                            <Link
                              to={sub.href}
                              className={`block px-2 py-1.5 text-[12.5px] rounded-md transition-all ${
                                isSubActive
                                  ? "bg-blue-100 text-[#154056] font-semibold"
                                  : "text-gray-600 hover:text-[#154056] hover:bg-blue-50"
                              }`}
                              role="menuitem"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SubAdminSidebar;