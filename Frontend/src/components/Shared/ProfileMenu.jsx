import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, User, LogOut, Settings, LayoutDashboard, CreditCard, Bell, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ProfileMenu = ({ closeMobile }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobProfile, setMobProfile] = useState(false);
  const profileRef = useRef(null);

  // Check if current route is broker dashboard
  const isBrokerDashboard = location.pathname === "/broker/dashboard";

  /* outside-click for desktop */
  useEffect(() => {
    const close = e => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (!isAuthenticated) {
    return (
      <Link 
        to="/login" 
        className="px-4 py-2 bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white rounded-lg hover:from-[#ff9c00] hover:to-[#ff7b00] transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        onClick={closeMobile}
      >
        Sign In / Join Free
      </Link>
    );
  }

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "My Dashboard",
      href: "/broker/dashboard",
      hide: isBrokerDashboard
    },
    {
      icon: User,
      label: "My Profile",
      href: "/home/leads/profile"
    },
    {
      icon: CreditCard,
      label: "Billing & Plans",
      href: "/broker/billing"
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/broker/notifications"
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/broker/settings"
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      href: "/broker/privacy"
    }
  ];

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
              src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=154056&color=ffffff&size=64`} 
              alt={user.fullName} 
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 hover:border-[#ff9c00] transition-colors shadow-sm" 
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="text-left">
            <p className="font-semibold text-gray-800 text-sm">Hi, {user.fullName?.split(' ')[0]}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
          
          <ChevronDown size={16} className={`duration-200 text-gray-500 ${profileOpen ? "rotate-180" : ""}`} />
        </button>
        
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 overflow-hidden">
            {/* User Info Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white">
              <div className="flex items-center gap-3">
                <img 
                  src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=ff9c00&color=ffffff&size=64`} 
                  alt={user.fullName} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/30" 
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">{user.fullName}</p>
                  <p className="text-white/80 text-sm truncate">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white/90 text-xs font-medium capitalize">{user.role}</span>
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
                      <Icon size={18} className="text-gray-600 group-hover:text-white" />
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
                  <LogOut size={18} className="text-red-600 group-hover:text-white" />
                </div>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Profile Menu */}
      <div className="lg:hidden border-t border-gray-200 mt-4 pt-4">
        <button 
          onClick={() => setMobProfile(!mobProfile)} 
          className="flex w-full justify-between items-center py-4 px-4 font-medium text-gray-700 hover:bg-orange-50 rounded-xl transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=154056&color=ffffff&size=64`} 
                alt={user.fullName} 
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-300" 
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">{user.fullName?.split(' ')[0]}</p>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
          <ChevronDown 
            size={20} 
            className={`duration-200 cursor-pointer text-gray-500 ${mobProfile ? "rotate-180" : ""}`} 
          />
        </button>
        
        {mobProfile && (
          <div className="px-4 space-y-3 bg-gray-50 rounded-xl mx-2 p-4 mt-2 border border-gray-200">
            {/* User Info */}
            <div className="space-y-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <img 
                  src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=ff9c00&color=ffffff&size=64`} 
                  alt={user.fullName} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#ff9c00]" 
                />
                <div className="flex-1">
                  <p className="text-gray-900 font-bold text-lg">{user.fullName}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  {user.phone && <p className="text-gray-600 text-sm">{user.phone}</p>}
                  {user.city && <p className="text-gray-600 text-sm">{user.city}</p>}
                  <div className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white shadow-sm">
                    {user.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                if (item.hide) return null;
                
                const Icon = item.icon;
                return (
                  <Link 
                    key={index}
                    to={item.href} 
                    onClick={() => { closeMobile?.(); setMobProfile(false); }}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white hover:bg-orange-50 text-gray-700 transition-all duration-200 border border-gray-200 hover:border-[#ff9c00] hover:shadow-md group"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#ff9c00] transition-colors">
                      <Icon size={20} className="text-gray-600 group-hover:text-white" />
                    </div>
                    <span className="font-medium text-gray-800 flex-1">{item.label}</span>
                    <div className="w-2 h-2 bg-[#ff9c00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                );
              })}
            </div>

            {/* Logout */}
            <button 
              onClick={() => { logout(); closeMobile?.(); setMobProfile(false); }} 
              className="flex items-center gap-4 w-full px-4 py-3 rounded-xl bg-white hover:bg-red-50 text-red-600 transition-all duration-200 border border-gray-200 hover:border-red-300 hover:shadow-md group mt-4"
            >
              <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-600 transition-colors">
                <LogOut size={20} className="text-red-600 group-hover:text-white" />
              </div>
              <span className="font-medium flex-1">Logout</span>
              <div className="w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        )}
      </div>

      {/* Tablet Profile Menu (md breakpoint) */}
      <div className="hidden md:block lg:hidden">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 border border-gray-200"
        >
          <div className="relative">
            <img 
              src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=154056&color=ffffff&size=64`} 
              alt={user.fullName} 
              className="w-9 h-9 rounded-full object-cover border-2 border-gray-300" 
            />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <ChevronDown size={16} className={`duration-200 text-gray-500 ${profileOpen ? "rotate-180" : ""}`} />
        </button>
        
        {profileOpen && (
          <div className="absolute right-4 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img 
                  src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=ff9c00&color=ffffff&size=64`} 
                  alt={user.fullName} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#ff9c00]" 
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 truncate">{user.fullName}</p>
                  <p className="text-gray-600 text-sm truncate">{user.email}</p>
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
                    <Icon size={18} className="text-gray-500 group-hover:text-[#ff9c00]" />
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
                <LogOut size={18} className="group-hover:text-red-700" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileMenu;