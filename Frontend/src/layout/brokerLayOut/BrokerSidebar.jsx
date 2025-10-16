import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  MegaphoneIcon,
  WalletIcon,
  Cog6ToothIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";


const BrokerSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const navigation = [
    {
      name: "Dashboard Overview",
      href: "/broker/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Lead Management",
      icon: DocumentTextIcon,
      subItems: [
       { name: "latest leads", href: "/broker/leads/new" },
        { name: "All Leads", href: "/broker/leads/all" },
        // { name: "Follow-up Leads", href: "/broker/leads/followups" },
        // { name: "Closed Leads", href: "/broker/leads/closed" },
        // { name: "Lost Leads", href: "/broker/leads/lost" },
        
      ],
    },
    // {
    //   name: "Property Management",
    //   icon: BuildingOfficeIcon,
    //   subItems: [
    //     { name: "All Properties", href: "/broker/properties/all" },
    //     { name: "Available Properties", href: "/broker/properties/available" },
    //     { name: "Booked / Sold", href: "/broker/properties/sold" },
    //     { name: "Add New Property", href: "/broker/properties/add" },
    //     { name: "Attach Leads to Property", href: "/broker/properties/attach-leads" },
    //   ],
    // },
    {
      name: "Contacts / Clients",
      icon: UserGroupIcon,
      subItems: [
        { name: "All Contacts", href: "/broker/contacts/all" },
        { name: "Buyers", href: "/broker/contacts/buyers" },
        { name: "Investors", href: "/broker/contacts/investors" },
      ],
    },
    {
      name: "Tasks & Follow-ups",
      icon: DocumentTextIcon,
      subItems: [
        { name: "Upcoming Calls", href: "/broker/tasks/calls" },
        { name: "Site Visits", href: "/broker/tasks/visits" },
        { name: "Meetings", href: "/broker/tasks/meetings" },
        { name: "Missed Follow-ups", href: "/broker/tasks/missed" },
      ],
    },
    {
      name: "Reports & Analytics",
      icon: ChartBarIcon,
      subItems: [
        { name: "Conversion Rate Report", href: "/broker/reports/conversion" },
        { name: "Revenue Report", href: "/broker/reports/revenue" },
      ],
    },

    {
      name: "Wallet / Billing",
      icon: WalletIcon,
      subItems: [
        { name: "Recharge Wallet", href: "/broker/wallet/recharge" },
        { name: "Transaction History", href: "/broker/wallet/history" },
        { name: "Plan Upgrades / Subscriptions", href: "/home/leads/plans" },
      ],
    },
    {
      name: "Settings",
      icon: Cog6ToothIcon,
      subItems: [
        { name: "Profile Settings", href: "/broker/settings/profile" },
        // { name: "Team Roles & Permissions", href: "/broker/settings/roles" },
        { name: "Notifications", href: "/broker/settings/notifications" },
        // { name: "Integrations (CRM, WhatsApp, etc.)", href: "/broker/settings/integrations" },
      ],
    },
    {
    name: "Back to Home",
    href: "/home/leads",
    icon: HomeIcon,
  }
  ];

  const getAvatarUrl = () => {
    if (user?.profile?.avatar?.url) return user.profile.avatar.url;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "Broker"
    )}&background=154056&color=ffffff&size=100`;
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white  border-gray-200  transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        ${collapsed ? "w-20" : "w-64"} lg:translate-x-0 lg:static lg:inset-0`}
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold">Multi Money</h1>
                <p className="text-xs text-blue-100">Broker Portal</p>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 hover:bg-white/20 rounded"
            >
              {collapsed ? "→" : "←"}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-white/20 rounded"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto cursor-pointer">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <div key={item.name}>
                {!item.subItems ? (
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white shadow-lg"
                        : "text-gray-700 hover:bg-orange-100 hover:text-[#ff9c00]"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 flex-shrink-0 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center justify-between w-full p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-[#ff9c00] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-gray-400" />
                        {!collapsed && <span>{item.name}</span>}
                      </div>
                      {!collapsed &&
                        (openDropdown === item.name ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4" />
                        ))}
                    </button>

                    {openDropdown === item.name && !collapsed && (
                      <div className="ml-9 mt-1 space-y-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className={`block px-2 py-1.5 text-sm rounded-md cursor-pointer ${
                              location.pathname === sub.href
                                ? "bg-blue-100 text-[#154056] font-medium"
                                : "text-gray-600 hover:text-[#154056] hover:bg-blue-50"
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

      {/* Overlay for mobile */}
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
