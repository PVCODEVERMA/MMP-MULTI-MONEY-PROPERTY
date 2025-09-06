import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, UPLOADS_BASE_URL } from "../context/AuthContext";
import {
  HomeIcon,
  UserIcon,
  ShareIcon,
  CreditCardIcon,
  ChartBarIcon,
  PlusIcon,
  XMarkIcon,
  WalletIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOffice2Icon,
  UserCircleIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  TrophyIcon
} from "@heroicons/react/24/outline";

const BrokerSidebar = ({ isOpen, isCollapsed, onToggle, onCollapse, user }) => {
  const location = useLocation();
  const [leadsData, setLeadsData] = useState({
    remaining: 45,
    total: 100
  });

  const navigation = [
    {
      name: "Dashboard",
      href: "/broker/dashboard",
      icon: HomeIcon,
      description: "Overview & metrics",
      badge: null
    },
    {
      name: "Profile",
      href: "/broker/profile", 
      icon: UserIcon,
      description: "Manage your profile",
      badge: null
    },
    {
      name: "Lead Management",
      href: "/broker/leads",
      icon: ShareIcon,
      description: "Manage your leads",
      badge: leadsData.remaining > 0 ? leadsData.remaining.toString() : null
    },
    {
      name: "Packages",
      href: "/broker/packages",
      icon: CreditCardIcon,
      description: "Purchase packages",
      badge: null
    },
    {
      name: "Reports",
      href: "/broker/reports",
      icon: ChartBarIcon,
      description: "Performance reports",
      badge: null
    },
    {
      name: "Submit Property",
      href: "/broker/submit-property",
      icon: PlusIcon,
      description: "Add new property",
      badge: null
    }
  ];

  // Simulate fetching leads data (replace with real API call)
  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        // In real app, make API call to get broker's current package info
        // const response = await fetch(`/api/broker/package-info`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const data = await response.json();
        // setLeadsData(data.leads);
        
        // For now, using mock data
        setLeadsData({ remaining: 45, total: 100 });
      } catch (error) {
        console.error('Error fetching leads data:', error);
      }
    };

    if (user) {
      fetchLeadsData();
    }
  }, [user]);

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http')) return avatarPath;
    return `${UPLOADS_BASE_URL}/${avatarPath}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed inset-y-0 left-0 z-50 ${
            isCollapsed ? "w-16" : "w-72"
          } bg-gradient-to-b from-green-900 via-green-800 to-green-900 shadow-2xl transition-all duration-300`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 bg-green-900 border-b border-green-700">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <WalletIcon className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && (
                <div className="ml-3">
                  <span className="text-white font-bold text-lg">Multi Money</span>
                  <div className="text-orange-400 text-xs font-medium">Broker Panel</div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Collapse Toggle */}
              <button
                onClick={onCollapse}
                className="hidden lg:block text-gray-300 hover:text-white p-1 rounded-lg hover:bg-green-700 transition-colors"
                title={isCollapsed ? "Expand Sidebar (Ctrl+J)" : "Collapse Sidebar (Ctrl+J)"}
              >
                <motion.div
                  animate={{ rotate: isCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isCollapsed ? (
                    <ChevronRightIcon className="h-5 w-5" />
                  ) : (
                    <ChevronLeftIcon className="h-5 w-5" />
                  )}
                </motion.div>
              </button>
              
              {/* Mobile Close Button */}
              <button
                onClick={onToggle}
                className="lg:hidden text-gray-300 hover:text-white p-1 rounded-lg hover:bg-green-700 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Broker Info Panel */}
          {!isCollapsed && user && (
            <div className="px-4 py-4 border-b border-green-700">
              <div className="flex items-center">
                <div className="relative">
                  {user.avatar ? (
                    <img
                      src={getAvatarUrl(user.avatar)}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 shadow-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center border-2 border-green-500">
                      <UserIcon className="w-8 h-8 text-green-300" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-green-900"></div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-white font-medium text-sm">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-green-300 text-xs">Standard Plan</div>
                  {user.territory && (
                    <div className="flex items-center mt-1">
                      <MapPinIcon className="w-3 h-3 text-green-300 mr-1" />
                      <span className="text-xs text-green-300">{user.territory}</span>
                    </div>
                  )}
                  {user.commission && (
                    <div className="flex items-center mt-1">
                      <CurrencyDollarIcon className="w-3 h-3 text-orange-400 mr-1" />
                      <span className="text-xs text-orange-400">{user.commission}% Commission</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-3 bg-green-800 rounded-lg p-3">
                <div className="flex justify-between items-center text-xs text-green-200">
                  <span>Leads Remaining</span>
                  <span>{leadsData.remaining}/{leadsData.total}</span>
                </div>
                <div className="w-full bg-green-700 rounded-full h-1.5 mt-2">
                  <motion.div 
                    className="bg-orange-500 h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(leadsData.remaining / leadsData.total) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
                <div className="flex justify-between items-center text-xs text-green-300 mt-2">
                  <span>Active Leads: 12</span>
                  <span>Converted: 8</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="mt-4 px-2 space-y-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-800">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-105 ${
                      isCollapsed ? "justify-center px-2" : ""
                    } ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                        : "text-gray-300 hover:bg-green-700 hover:text-white"
                    }`}
                    title={isCollapsed ? item.name : ""}
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <item.icon
                        className={`h-5 w-5 flex-shrink-0 ${
                          isCollapsed ? "mx-auto" : "mr-3"
                        } ${
                          isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                        }`}
                      />
                      {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">{item.name}</div>
                          <div className={`text-xs opacity-75 truncate ${
                            isActive ? "text-orange-100" : "text-green-400 group-hover:text-green-300"
                          }`}>
                            {item.description}
                          </div>
                        </div>
                      )}
                    </div>
                    {item.badge && !isCollapsed && (
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        isActive 
                          ? "bg-white text-orange-600" 
                          : "bg-orange-500 text-white"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 bg-green-900 border-t border-green-700">
            {isCollapsed ? (
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <BuildingOffice2Icon className="w-4 h-4 text-green-300" />
              </div>
            ) : (
              <div className="text-xs text-center space-y-1">
                <div className="font-medium text-green-400">Multi Money Property</div>
                <div className="text-green-500">Broker Dashboard v2.0</div>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs">Online</span>
                </div>
                <div className="text-orange-400 text-xs mt-1">
                  © 2024 All rights reserved
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrokerSidebar;
