import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  WalletIcon,
  Cog6ToothIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Bars3Icon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";


const BrokerSidebar = ({ sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
      setTimeout(() => setOpenDropdown(openDropdown === name ? null : name), 300);
    } else {
      setOpenDropdown(openDropdown === name ? null : name);
    }
  };

  const navigation = [
  {
    name: "Dashboard",
    href: "/broker/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Lead Management",
    icon: DocumentTextIcon,
    subItems: [
      { name: "Latest Leads", href: "/broker/leads/new" },
      { name: "All Leads", href: "/broker/leads/all" },
      { name: "Follow-up Leads", href: "/broker/leads/followups" },
    ],
  },
    {
    name: "Tasks & Activities",
    icon: ClipboardDocumentListIcon,
    subItems: [
      { name: "Upcoming Calls", href: "/broker/tasks/calls" },
      { name: "Meetings", href: "/broker/tasks/meetings" },
      { name: "All Tasks", href: "/broker/tasks/all" },
    ],
  },
  {
    name: "Contacts & Clients",
    icon: UserGroupIcon,
    subItems: [
      { name: "All Contacts", href: "/broker/contacts/all" },
      { name: "Buyers", href: "/broker/contacts/buyers" },

    ],
  },
  {
    name: "Properties",
    icon: BuildingOfficeIcon,
    subItems: [
      { name: "Add New Property", href: "/broker/properties/add" },
      { name: "My Listings", href: "/broker/property/listings" },
      { name: "Site Visits", href: "/broker/tasks/visits" },
    ],
  },

  {
    name: "Analytics & Reports",
    icon: ChartBarIcon,
    href: "/broker/analytics/performance",
  },
  {
    name: "Wallet & Billing",
    icon: WalletIcon,
    subItems: [
      // { name: "Wallet Balance", href: "/broker/wallet/balance" },
      { name: "Recharge Wallet", href: "/broker/wallet/recharge" },
      { name: "Transaction History", href: "/broker/wallet/transactions" },
      { name: "Billing & Invoices", href: "/broker/wallet/invoices" },
      { name: "Upgrade Plan", href: "/home/leads/plans" },
    ],
  },
  {
    name: "Settings",
    icon: Cog6ToothIcon,
    subItems: [
      { name: "Profile Settings", href: "/broker/settings/profile" },
      { name: "Notification Preferences", href: "/broker/settings/notifications" },
    ],
  },
  {
    name: "Back to Main Site",
    href: "/home/leads",
    icon: HomeIcon,
  }
];

  // Mobile menu component
  const MobileMenu = () => (
    <div className="lg:hidden">
      {/* Mobile Navigation Menu */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-[#154056]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#154056] to-[#2c6b8a] border-b border-[#2c6b8a]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <BuildingOfficeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Multi Money Property</h1>
                
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-white cursor-pointer" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)] no-scrollbar ">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <div key={item.name} className="border-b border-[#2c6b8a] pb-2 last:border-b-0 cursor-pointer">
                  {!hasSubItems ? (
                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#ff9c00] text-white shadow-lg"
                          : "text-white hover:bg-[#2c6b8a]"
                      }`}
                    >
                      <Icon className="h-6 w-6 flex-shrink-0" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex items-center justify-between w-full p-3 rounded-lg text-white hover:bg-[#2c6b8a] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        {openDropdown === item.name ? (
                          <ChevronDownIcon className="h-5 w-5" />
                        ) : (
                          <ChevronRightIcon className="h-5 w-5" />
                        )}
                      </button>

                      {openDropdown === item.name && (
                        <div className="ml-4 mt-2 space-y-2 border-l-2 border-[#ff9c00] pl-4">
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              onClick={() => setSidebarOpen(false)}
                              className={`block px-3 py-2.5 rounded-lg transition-colors ${
                                location.pathname === sub.href
                                  ? "bg-[#ff9c00] text-white font-medium"
                                  : "text-blue-100 hover:bg-[#2c6b8a] hover:text-white"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );

  // Desktop sidebar component
  const DesktopSidebar = () => (
    <div className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-40 bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ${
      sidebarCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Multi Money</h1>
              <p className="text-xs text-blue-100">Broker Portal</p>
            </div>
          </div>
        )}
        
        {sidebarCollapsed && (
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
            <BuildingOfficeIcon className="w-6 h-6  cursor-pointer" />
          </div>
        )}
        
        {!sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title="Collapse sidebar"
          >
            <ChevronDoubleLeftIcon className="h-5 w-5 cursor-pointer" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          const hasSubItems = item.subItems && item.subItems.length > 0;

          if (sidebarCollapsed) {
            // Collapsed state - icons only with tooltip
            return (
              <div key={item.name} className="relative group">
                {!hasSubItems ? (
                  <Link
                    to={item.href}
                    className={`flex items-center justify-center p-3 rounded-xl transition-all duration-200  cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white shadow-lg cursor-pointer"
                        : "text-gray-700 hover:bg-[#ff9c00] hover:text-white cursor-pointer"
                    }`}
                    title={item.name}
                  >
                    <Icon className="h-6 w-6 flex-shrink-0" />
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center justify-center w-full p-3 rounded-lg transition-colors cursor-pointer ${
                      openDropdown === item.name
                        ? "bg-[#ff9c00] text-white"
                        : "text-gray-700 hover:bg-[#ff9c00] hover:text-white"
                    }`}
                    title={item.name}
                  >
                    <Icon className="h-6 w-6" />
                  </button>
                )}
                
                {/* Tooltip for collapsed state */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                  {item.name}
                </div>
              </div>
            );
          }

          // Expanded state
          return (
            <div key={item.name}>
              {!hasSubItems ? (
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white shadow-lg"
                      : "text-gray-700 hover:bg-[#ff9c00] hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-[#ff9c00] hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {openDropdown === item.name ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4" />
                    )}
                  </button>

                  {openDropdown === item.name && (
                    <div className="ml-9 mt-1 space-y-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className={`block px-3 py-2.5 text-sm rounded-lg transition-colors ${
                            location.pathname === sub.href
                              ? "bg-[#154056] text-white font-medium"
                              : "text-gray-600 hover:bg-[#ff9c00] hover:text-white"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse/Expand Button at Bottom */}
      {sidebarCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="flex items-center justify-center w-full p-2 text-gray-600 hover:text-[#ff9c00] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            title="Expand sidebar"
          >
            <ChevronDoubleRightIcon className="h-5 w-5 cursor-pointer" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <MobileMenu />
      <DesktopSidebar />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default BrokerSidebar;