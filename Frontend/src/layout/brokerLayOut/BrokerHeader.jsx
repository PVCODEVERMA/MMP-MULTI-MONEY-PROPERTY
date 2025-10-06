import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronDownIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  EyeIcon,
  PhoneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const BrokerHeader = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [quickStats, setQuickStats] = useState({
    activeLeads: 0,
    totalProperties: 0,
    pendingTasks: 0,
  });

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Enhanced notifications with different types
  const notifications = [
    {
      id: 1,
      title: "New Lead Assigned",
      message: "Rohit Sharma interested in 3BHK apartment in Gurgaon",
      time: "5m ago",
      unread: true,
      type: "lead",
      priority: "high",
    },
    {
      id: 2,
      title: "Property Approved",
      message: "Your Mumbai luxury apartment listing has been approved",
      time: "1h ago",
      unread: true,
      type: "property",
      priority: "medium",
    },
    {
      id: 3,
      title: "Package Expiring",
      message: "Growth Plan expires in 3 days - Renew now",
      time: "2h ago",
      unread: false,
      type: "system",
      priority: "high",
    },
    {
      id: 4,
      title: "Site Visit Scheduled",
      message: "Site visit confirmed for tomorrow at 3 PM",
      time: "3h ago",
      unread: false,
      type: "task",
      priority: "medium",
    },
  ];

  // Mock stats data - replace with actual API
  useEffect(() => {
    setTimeout(() => {
      setQuickStats({
        activeLeads: 24,
        totalProperties: 18,
        pendingTasks: 7,
      });
    }, 500);
  }, []);

  const avatar = user?.profileImage
    ? user.profileImage
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.fullName || "User"
      )}&background=FF9C00&color=ffffff&size=40`;

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "lead":
        return <UserCircleIcon className="h-4 w-4 text-blue-500" />;
      case "property":
        return <BuildingOfficeIcon className="h-4 w-4 text-green-500" />;
      case "task":
        return <CheckCircleIcon className="h-4 w-4 text-orange-500" />;
      default:
        return <BellIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50";
      case "medium":
        return "border-orange-500 bg-orange-50";
      default:
        return "border-blue-500 bg-blue-50";
    }
  };

  const markAllAsRead = () => {
    // Implement mark all as read functionality
    console.log("Mark all as read");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-end px-6 z-10 sticky top-0">
      {/* Left Section */}
      
      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Quick Stats */}
        <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-green-600">Online</span>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-4 w-4 text-[#154056]" />
            <span>
              <span className="font-semibold text-gray-900">
                {quickStats.activeLeads}
              </span>{" "}
              Active Leads
            </span>
          </div> */}
          <div className="flex items-center space-x-2">
            <BuildingOfficeIcon className="h-4 w-4 text-[#ff9c00]" />
            <span>
              <span className="font-semibold text-gray-900">
                {quickStats.totalProperties}
              </span>{" "}
              Properties
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="h-4 w-4 text-purple-500" />
            <span>
              <span className="font-semibold text-gray-900">
                {quickStats.pendingTasks}
              </span>{" "}
              Pending
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <BellIcon className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden">
              {/* Notifications Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications
                </h3>
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-[#154056] hover:text-[#ff9c00] font-medium"
                >
                  Mark all as read
                </button>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 ${getPriorityColor(
                      notification.priority
                    )} ${
                      notification.unread ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition-colors duration-150  `}
                  >
                    <div className="flex items-start space-x-3 ">
                      <div className="flex-shrink-0 mt-1 ">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between ">
                          <p
                            className={`text-sm font-medium ${
                              notification.unread
                                ? "text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <span className="text-xs text-gray-400">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        {notification.unread && (
                          <div className="flex items-center mt-2 space-x-2 ">
                            <button className="text-xs text-[#154056] hover:text-[#ff9c00] font-medium">
                              View Details
                            </button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">
                              Dismiss
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notifications Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <button className="w-full text-center text-sm text-[#154056] hover:text-[#ff9c00] font-medium">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <img
              src={avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full ring-2 ring-orange-500/20 object-cover"
            />

            <ChevronDownIcon
              className={`h-4 w-4 transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden">
              {/* Profile Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white text-center">
                <p className="text-sm font-semibold truncate">
                  {user?.fullName || "Broker"}
                </p>
                <p className="text-xs text-blue-100 truncate">
                  {user?.email || "broker@example.com"}
                </p>
                <div className="flex items-center justify-center mt-2">
                  <BuildingOfficeIcon className="w-3 h-3 text-green-300 mr-1" />
                  <span className="inline-flex items-center  px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Real Estate Broker
                  </span>
                </div>
              </div>

              {/* Profile Menu */}
              <div className="py-2">
                <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                  <UserCircleIcon className="h-4 w-4 mr-3 text-gray-400" />
                  <span>My Profile</span>
                </button>
                <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                  <CogIcon className="h-4 w-4 mr-3 text-gray-400" />
                  <span>Account Settings</span>
                </button>
                <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                  <EyeIcon className="h-4 w-4 mr-3 text-gray-400" />
                  <span>View Dashboard</span>
                </button>

                <div className="border-t border-gray-100 my-2"></div>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default BrokerHeader;
