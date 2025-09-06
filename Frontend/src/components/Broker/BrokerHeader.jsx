import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, UPLOADS_BASE_URL } from "../../context/AuthContext";
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  UserIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

const BrokerHeader = ({ onSidebarToggle, sidebarOpen, sidebarCollapsed, user }) => {
  const { logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Lead Assigned",
      message: "You have a new lead from Mumbai - Premium Villa",
      time: "2 minutes ago",
      type: "success",
      unread: true
    },
    {
      id: 2,
      title: "Package Expiring Soon",
      message: "Your Standard package expires in 5 days",
      time: "1 hour ago", 
      type: "warning",
      unread: true
    },
    {
      id: 3,
      title: "Property Approved",
      message: "Your property listing 'Luxury Apartment' has been approved",
      time: "3 hours ago",
      type: "info",
      unread: false
    }
  ]);

  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  const navigation = [
    { name: "Dashboard", href: "/broker/dashboard" },
    { name: "Profile", href: "/broker/profile" },
    { name: "Lead Management", href: "/broker/leads" },
    { name: "Packages", href: "/broker/packages" },
    { name: "Reports", href: "/broker/reports" },
    { name: "Submit Property", href: "/broker/submit-property" }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'k') {
          event.preventDefault();
          document.querySelector('input[placeholder*="Search"]')?.focus();
        }
      }
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const currentPageName = navigation.find(nav => nav.href === location.pathname)?.name || "Broker Dashboard";
  const unreadNotifications = notifications.filter(n => n.unread).length;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error('Logout failed:', error);
      navigate("/login");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http')) return avatarPath;
    return `${UPLOADS_BASE_URL}/${avatarPath}`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      navigate(`/broker/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 z-10">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Side - Menu Toggle & Page Title */}
        <div className="flex items-center">
          <button
            onClick={onSidebarToggle}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl p-2 transition-colors"
            title="Toggle sidebar (Ctrl+B)"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <div className="ml-4">
            <h1 className="text-xl font-bold text-gray-900">
              {currentPageName}
            </h1>
            <div className="text-sm text-gray-500">
              Welcome back, {user?.firstName} {user?.lastName}
            </div>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Search leads, properties... (Ctrl+K)"
            />
          </form>
        </div>

        {/* Right Side - Actions & User Menu */}
        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="hidden xl:flex items-center space-x-6 text-sm border-r border-gray-200 pr-4">
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Online
            </div>
            <div className="text-gray-600 flex items-center">
              <TrophyIcon className="w-4 h-4 mr-1" />
              <span className="font-medium">12</span> Active Leads
            </div>
            <div className="text-gray-600 flex items-center">
              <CurrencyDollarIcon className="w-4 h-4 mr-1" />
              <span className="font-medium">₹45K</span> This Month
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <BellIcon className="h-6 w-6" />
              {unreadNotifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                >
                  {unreadNotifications}
                </motion.span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      {unreadNotifications > 0 && (
                        <span className="text-xs text-orange-600 font-medium">
                          {unreadNotifications} unread
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                          notification.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 text-center border-t border-gray-100">
                    <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {user?.avatar ? (
                <img
                  src={getAvatarUrl(user.avatar)}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-green-600" />
                </div>
              )}
              <span className="hidden md:block text-sm font-medium max-w-32 truncate">
                {user?.firstName} {user?.lastName}
              </span>
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${
                userMenuOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* User Dropdown Menu */}
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
                >
                  {/* User Info */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                      {user?.avatar ? (
                        <img
                          src={getAvatarUrl(user.avatar)}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <UserIcon className="h-8 w-8 text-green-600" />
                        </div>
                      )}
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-semibold text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{user?.email}</div>
                        <div className="flex items-center mt-1">
                          <TrophyIcon className="w-3 h-3 text-green-500 mr-1" />
                          <p className="text-xs text-green-600 font-medium">{user?.role}</p>
                        </div>
                        {user?.territory && (
                          <div className="flex items-center mt-1">
                            <MapPinIcon className="w-3 h-3 text-gray-500 mr-1" />
                            <p className="text-xs text-gray-500">{user.territory}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate("/broker/profile");
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserCircleIcon className="h-4 w-4 mr-3 text-gray-400" />
                      <div className="text-left">
                        <div className="font-medium">Profile Settings</div>
                        <div className="text-xs text-gray-500">Manage your broker profile</div>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <CogIcon className="h-4 w-4 mr-3 text-gray-400" />
                      <div className="text-left">
                        <div className="font-medium">Account Settings</div>
                        <div className="text-xs text-gray-500">Preferences and security</div>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <QuestionMarkCircleIcon className="h-4 w-4 mr-3 text-gray-400" />
                      <div className="text-left">
                        <div className="font-medium">Help & Support</div>
                        <div className="text-xs text-gray-500">Get assistance and tutorials</div>
                      </div>
                    </button>
                  </div>
                  
                  <div className="py-2 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Logout</div>
                        <div className="text-xs text-red-400">Sign out of your account</div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-6 py-3 border-t border-gray-200">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Search leads, properties..."
          />
        </form>
      </div>
    </header>
  );
};

export default BrokerHeader;
