import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  UserPlusIcon,
  GiftIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: HomeIcon },
  { to: "/admin/brokers", label: "Brokers", icon: UsersIcon },
  { to: "/admin/addLead", label: "Add", icon: UserPlusIcon },
  { to: "/admin/packages", label: "Packages", icon: GiftIcon },
  { to: "/admin/reports", label: "Reports", icon: ChartBarIcon },
];

function Header({ user, toggleSidebar, isSidebarCollapsed }) {
  return (
    <header className="w-full bg-white shadow-md flex justify-between items-center px-6 py-3 fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isSidebarCollapsed ? (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          ) : (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          )}
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 font-semibold">{user?.name || "Admin User"}</span>
        <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg uppercase">
          {user?.name?.charAt(0) || "A"}
        </div>
      </div>
    </header>
  );
}

function Footer({ isSidebarCollapsed }) {
  return (
    <footer 
      className={`bg-gray-900 text-gray-300 fixed bottom-0 p-4 text-center text-sm transition-all duration-300 ${
        isSidebarCollapsed ? "left-16" : "left-64"
      } right-0`}
    >
      © {new Date().getFullYear()} MMP Hybrid System. All rights reserved.
    </footer>
  );
}

function Sidebar({ isCollapsed, clickedIndex, setClickedIndex, location }) {
  return (
    <nav 
      className={`bg-gray-900 text-gray-200 p-6 space-y-1 fixed top-16 bottom-10 overflow-y-auto transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {navItems.map(({ to, label, icon: Icon }, idx) => {
        const isActive = location.pathname === to;
        const isZoom = clickedIndex === idx;
        
        return (
          <NavLink
            to={to}
            key={to}
            className={({ isActive: active }) =>
              `flex items-center gap-3 px-5 py-3 rounded transition-all duration-200 group ${
                active || isZoom 
                  ? "bg-gray-700 font-bold scale-105" 
                  : "hover:bg-gray-800"
              } ${isZoom ? "scale-110" : "scale-100"}`
            }
            onClick={() => {
              setClickedIndex(idx);
              setTimeout(() => setClickedIndex(null), 180);
            }}
            style={{ willChange: "transform" }}
          >
            <Icon
              className={`w-6 h-6 transition-all duration-200 ease-in-out ${
                isActive || isZoom 
                  ? "scale-125 text-white" 
                  : "scale-100 text-indigo-300"
              } group-hover:scale-110 flex-shrink-0`}
            />
            {!isCollapsed && (
              <span
                className={`transition-all duration-200 ${
                  isActive || isZoom ? "scale-110" : "scale-100"
                } group-hover:scale-105 whitespace-nowrap`}
              >
                {label}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default function AdminLayout() {
  const location = useLocation();
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header 
        user={{ name: "Admin User" }} 
        toggleSidebar={toggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      
      <div className="flex flex-1 pt-16">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          clickedIndex={clickedIndex}
          setClickedIndex={setClickedIndex}
          location={location}
        />
        
        <main 
          className={`flex-grow p-8 min-h-[calc(100vh-4rem)] overflow-auto transition-all duration-300 ${
            isSidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <div className="pt-4">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
}