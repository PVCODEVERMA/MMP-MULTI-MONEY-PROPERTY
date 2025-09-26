import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, User, Settings, HelpCircle, ChevronDown } from "lucide-react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  /* close on outside click */
  useEffect(() => {
    const close = (e) => {
      if (open && !menuRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 cursor-pointer"
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#FF9C00] to-[#ff6b00] flex items-center justify-center text-white shadow-lg">
          <User size={20} />
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-600 transition-transform duration-200 ${open ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in-50 slide-in-from-top-2">
          {/* Header section */}
          <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/30 rounded-t-2xl">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide text-center">Welcome back</p>
            <p className="text-lg font-bold text-[#154056] mt-1 text-center">name</p>
          
          </div>

          {/* Menu items */}
          <div className="py-2">
            <Link
              to="/home/leads/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 px-5 py-3 hover:bg-orange-50 transition-all duration-200 group"
            >
              <div className="h-9 w-9 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <User size={18} className="text-orange-600" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-[#154056]">My Profile</span>
                <p className="text-xs text-gray-500 mt-0.5">Manage your account</p>
              </div>
            </Link>
            <Link
              to="/home/leads/help"
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 px-5 py-3 hover:bg-purple-50 transition-all duration-200 group"
            >
              <div className="h-9 w-9 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <HelpCircle size={18} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-gray-900">Help & Support</span>
                <p className="text-xs text-gray-500 mt-0.5">Get help 24/7</p>
              </div>
            </Link>
          </div>

          {/* Logout section */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
            <button
              onClick={() => {
                console.log("logout");
                setOpen(false);
              }}
              className="flex w-full items-center gap-4 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group cursor-pointer"
            >
              <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <LogOut size={16} className="text-red-600" />
              </div>
              <span className="text-sm font-semibold">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}