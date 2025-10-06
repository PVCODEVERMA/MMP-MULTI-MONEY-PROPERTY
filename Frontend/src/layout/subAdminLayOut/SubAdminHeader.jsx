import React, { useState, useRef, useEffect } from "react";
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronDownIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuthSubAdmin } from "../../context/AuthContextSubAdmin.jsx";

const SubAdminHeader = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { subAdmin, logout, fetchSubAdminProfile } = useAuthSubAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Dummy notifications
  const notifications = [
    {
      id: 1,
      title: "New Broker Registration",
      message: "John joined your team",
      time: "5m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Property Review",
      message: "3 new properties pending approval",
      time: "1h ago",
      unread: false,
    },
    {
      id: 3,
      title: "Lead Assigned",
      message: "New lead assigned to Broker Rahul",
      time: "2h ago",
      unread: true,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Fetch profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        await fetchSubAdminProfile();
      } catch (err) {
        console.error("Failed to load sub-admin profile:", err);
      }
    };
    loadProfile();
  }, [fetchSubAdminProfile]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target))
        setNotificationsOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Profile info
  const displayName = subAdmin?.fullName || subAdmin?.name || "SubAdmin";
  const email = subAdmin?.email || "";
  const roleLabel = subAdmin?.role || "SubAdmin";
  const profileImage = subAdmin?.profileImage;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left: Sidebar Toggle + Search */}
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 text-gray-600 hover:text-orange-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search brokers, leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition cursor-pointer "
          >
            <BellIcon className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium ">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-96 overflow-y-auto z-50  no-scrollbar">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <p className="text-xs text-orange-600 mt-1">
                    {unreadCount} unread
                  </p>
                )}
              </div>
              <div className="py-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                      n.unread
                        ? "bg-orange-50 border-l-4 border-orange-500"
                        : ""
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {n.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 px-4 py-2">
                <button className="text-xs text-orange-600 hover:text-orange-500 font-medium cursor-pointer">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center text-white font-semibold">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                displayName.charAt(0).toUpperCase()
              )}
            </div>
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform  cursor-pointer${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100 text-center">
                <p className="text-sm text-[#154056] font-bold">
                  Hi, {displayName}
                </p>
                <p className="text-xs text-gray-500">{email}</p>
                <div className="flex justify-center mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {roleLabel}
                  </span>
                </div>
              </div>
              <div className="py-2">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 cursor-pointer">
                  <UserCircleIcon className="h-4 w-4 mr-3 text-gray-400" />
                  View Profile
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 cursor-pointer">
                  <CogIcon className="h-4 w-4 mr-3 text-gray-400" />
                  Settings
                </button>
                <div className="border-t border-gray-100 my-2"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-orange-50 cursor-pointer"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3 " />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default SubAdminHeader;
