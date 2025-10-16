import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ProfileMenu = ({ closeMobile }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobProfile, setMobProfile] = useState(false);
  const profileRef = useRef(null);

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
        className="px-4 py-2 hover:text-[#FF9C00] hover:bg-gray-100 rounded-lg transition-colors font-medium"
        onClick={closeMobile}
      >
        Sign In / Join Free
      </Link>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div ref={profileRef} className="relative hidden md:block">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200"
        >
          <div className="relative">
            <img 
              src={user.profileImage || "/default-avatar.png"} 
              alt={user.fullName} 
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-300 hover:border-[#FF9C00] transition-colors" 
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <span className="font-medium text-gray-800">Hi, {user.fullName}</span>
          <ChevronDown size={14} className={`duration-200 text-gray-500 ${profileOpen ? "rotate-180" : ""}`} />
        </button>
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-200 p-0 z-50 overflow-hidden">
            {/* Menu Items */}
            <div className="p-2 border-t border-gray-100">
              <Link to="/broker/dashboard" onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors group">
                <User size={18} className="text-gray-500 group-hover:text-[#FF9C00]" />
                <span className="font-medium">Leads Dashboard</span>
              </Link>
              <Link to="/home/leads/profile" onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors group">
                <User size={18} className="text-gray-500 group-hover:text-[#FF9C00]" />
                <span className="font-medium">My Profile</span>
              </Link>
              <Link to="/settings" onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors group">
                <Settings size={18} className="text-gray-500 group-hover:text-[#FF9C00]" />
                <span className="font-medium">Settings</span>
              </Link>
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-gray-100">
              <button onClick={() => { logout(); setProfileOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors group cursor-pointer">
                <LogOut size={18} className="group-hover:text-red-700" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden border-t border-gray-200 mt-4 pt-4">
        <button onClick={() => setMobProfile(!mobProfile)} 
          className="flex w-full justify-between items-center py-4 font-medium text-gray-700 hover:bg-orange-50 rounded-lg px-4">
          <div className="flex items-center gap-3">
            <img 
              src={user.profileImage || "/default-avatar.png"} 
              alt={user.fullName} 
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300" 
            />
            <span>My Account</span>
          </div>
          <ChevronDown size={18} className={`duration-200 cursor-pointer ${mobProfile?"rotate-180":""}`} />
        </button>
        
        {mobProfile && (
          <div className="pl-6 space-y-4 bg-gray-50 rounded-lg mx-4 p-4">
            {/* User Info */}
            <div className="space-y-2">
              <p className="text-gray-900 font-bold text-lg">{user.fullName}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
              {user.phone && <p className="text-gray-600 text-sm">{user.phone}</p>}
              {user.city && <p className="text-gray-600 text-sm"> {user.city}</p>}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                {user.role}
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              <Link to="/dashboardAll" onClick={closeMobile} 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors group">
                <LayoutDashboard size={18} className="text-gray-500 group-hover:text-[#FF9C00]" />
                <span className="font-medium">My Dashboard</span>
              </Link>
              <Link to="/profile" onClick={closeMobile} className="flex items-center gap-3 py-3 text-gray-700 hover:text-[#FF9C00] transition-colors">
                <User size={18} />
                <span>My Profile</span>
              </Link>
              <Link to="/settings" onClick={closeMobile} className="flex items-center gap-3 py-3 text-gray-700 hover:text-[#FF9C00] transition-colors">
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </div>

            {/* Logout */}
            <button onClick={() => { logout(); closeMobile(); }} 
              className="flex items-center gap-3 w-full py-3 text-red-600 hover:text-red-700 transition-colors font-medium">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileMenu;
