import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  UserIcon,
  Cog6ToothIcon,
  HomeIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const BrokerHeader = ({ sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [quickStats, setQuickStats] = useState({
    activeLeads: 24,
    totalProperties: 18,
    pendingTasks: 7,
  });

  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const profileRef = useRef(null);

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
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Check if current route is broker dashboard
  const isBrokerDashboard = location.pathname === "/broker/dashboard";

  const menuItems = [
    {
      icon: HomeIcon,
      label: "My Dashboard",
      href: "/broker/dashboard",
      hide: isBrokerDashboard
    },
    {
      icon: UserIcon,
      label: "My Profile",
      href: "/home/leads/profile"
    },
    {
      icon: CreditCardIcon,
      label: "Billing & Plans",
      href: "/broker/billing"
    },
    {
      icon: BellIcon,
      label: "Notifications",
      href: "/broker/notifications"
    },
    {
      icon: Cog6ToothIcon,
      label: "Settings",
      href: "/broker/settings"
    },
    {
      icon: ShieldCheckIcon,
      label: "Privacy & Security",
      href: "/broker/privacy"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setMobileSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile Search Component
  const MobileSearch = () => (
    <div className="lg:hidden fixed inset-0 bg-white z-50 p-4">
      <div className="flex items-center space-x-3 mb-4">
        <button
          onClick={() => setMobileSearchOpen(false)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900">Search</h3>
      </div>
      
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search leads, properties, contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent bg-gray-50 text-lg"
          autoFocus
        />
      </div>

      {/* Recent Searches */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Searches</h4>
        <div className="space-y-2">
          {["3BHK Mumbai", "Commercial Property", "Luxury Villa"].map((search, index) => (
            <button
              key={index}
              className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => setSearchQuery(search)}
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Profile Menu Component
  const ProfileMenuComponent = () => {
    if (!isAuthenticated) {
      return (
        <Link 
          to="/login" 
          className="px-4 py-2 bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white rounded-lg hover:from-[#ff9c00] hover:to-[#ff7b00] transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          Sign In
        </Link>
      );
    }

    return (
      <>
        {/* Desktop Profile Menu */}
        <div ref={profileRef} className="relative hidden lg:block">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 border border-gray-200 hover:border-[#ff9c00] hover:shadow-md"
          >
            <div className="relative">
              <img 
                src={user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=154056&color=ffffff&size=64`} 
                alt={user?.fullName} 
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 hover:border-[#ff9c00] transition-colors shadow-sm" 
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="text-left">
              <p className="font-semibold text-gray-800 text-sm">Hi, {user?.fullName?.split(' ')[0]}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            
            <ChevronDownIcon className={`h-4 w-4 duration-200 text-gray-500 ${profileOpen ? "rotate-180" : ""}`} />
          </button>
          
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 overflow-hidden">
              {/* User Info Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white">
                <div className="flex items-center gap-3">
                  <img 
                    src={user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=ff9c00&color=ffffff&size=64`} 
                    alt={user?.fullName} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30" 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{user?.fullName}</p>
                    <p className="text-white/80 text-sm truncate">{user?.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white/90 text-xs font-medium capitalize">{user?.role}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => {
                  if (item.hide) return null;
                  
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={index}
                      to={item.href} 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg hover:bg-orange-50 text-gray-700 transition-all duration-200 group hover:translate-x-1"
                    >
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#ff9c00] group-hover:text-white transition-colors">
                        <Icon className="h-4 w-4 text-gray-600 group-hover:text-white" />
                      </div>
                      <span className="font-medium text-gray-800 group-hover:text-[#154056]">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 pt-2">
                <button 
                  onClick={() => { logout(); setProfileOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 mx-2 rounded-lg hover:bg-red-50 text-red-600 transition-all duration-200 group cursor-pointer"
                >
                  <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-600 transition-colors">
                    <ArrowRightOnRectangleIcon className="h-4 w-4 text-red-600 group-hover:text-white" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Profile Button - Simple version */}
        <div className="lg:hidden">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 border border-gray-200 cursor-pointer"
          >
            <div className="relative">
              <img 
                src={user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=154056&color=ffffff&size=64`} 
                alt={user?.fullName} 
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-300" 
              />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </button>

          {/* Mobile Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-4 top-16 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img 
                    src={user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=ff9c00&color=ffffff&size=64`} 
                    alt={user?.fullName} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#ff9c00]" 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 truncate">{user?.fullName}</p>
                    <p className="text-gray-600 text-sm truncate">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => {
                  if (item.hide) return null;
                  
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={index}
                      to={item.href} 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors group"
                    >
                      <Icon className="h-4 w-4 text-gray-500 group-hover:text-[#ff9c00]" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 pt-2">
                <button 
                  onClick={() => { logout(); setProfileOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 mx-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors group cursor-pointer"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 group-hover:text-red-700" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {/* Mobile Search Overlay */}
      {mobileSearchOpen && <MobileSearch />}

      <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 z-40 sticky top-0">
        {/* Left Section - Mobile Menu Button and Logo */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#ff9c00] hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bars3Icon className="h-6 w-6 cursor-pointer" />
          </button>

          {/* Desktop Toggle Button - Hidden on mobile */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-2 text-gray-600 hover:text-[#ff9c00] hover:bg-gray-100 rounded-lg transition-colors"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronDoubleRightIcon className="h-5 w-5" />
            ) : (
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            )}
          </button>

          {/* Desktop Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex items-center flex-1 max-w-lg">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads, properties, contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* Quick Stats - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-4 lg:space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-green-600">Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#154056] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{quickStats.activeLeads}</span>
              </div>
              <span>
                <span className="font-semibold text-gray-900">
                  {quickStats.activeLeads}
                </span>{" "}
                Leads
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#ff9c00] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{quickStats.totalProperties}</span>
              </div>
              <span>
                <span className="font-semibold text-gray-900">
                  {quickStats.totalProperties}
                </span>{" "}
                Properties
              </span>
            </div>
          </div>

          {/* Mobile Search Button - Visible only on mobile */}
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#ff9c00] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          {/* Notifications - Hidden on mobile */}
          <div className="hidden lg:block relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-gray-600 hover:text-[#ff9c00] hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#154056] to-[#2c6b8a]">
                  <h3 className="text-lg font-semibold text-white">
                    Notifications
                  </h3>
                  <span className="text-white text-sm">{unreadCount} unread</span>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-l-4 ${
                        notification.priority === 'high' 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-[#ff9c00] bg-orange-50'
                      } ${notification.unread ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-150`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${
                              notification.unread ? "text-gray-900" : "text-gray-600"
                            }`}>
                              {notification.title}
                            </p>
                            <span className="text-xs text-gray-400">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-[#154056] hover:text-[#ff9c00] font-medium cursor-pointer">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Notifications Icon - Simple version */}
          <div className="lg:hidden relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-gray-600 hover:text-[#ff9c00] hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Profile Menu - Integrated directly */}
          <ProfileMenuComponent />
        </div>
      </header>
    </>
  );
};

export default BrokerHeader;