import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  UsersIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { to: "/broker/dashboard", label: "Dashboard", icon: HomeIcon },
  { to: "/broker/profile", label: "Profile", icon: UserIcon },
  { to: "/broker/leads", label: "Leads", icon: UsersIcon },
  { to: "/broker/performanceData", label: "Performance", icon: ChartBarIcon },
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
        <h1 className="text-2xl font-bold text-gray-800">Broker Panel</h1>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 font-semibold">{user?.name || "Broker User"}</span>
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg uppercase">
          {user?.name?.charAt(0) || "B"}
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
      © {new Date().getFullYear()} Broker Portal. All rights reserved.
    </footer>
  );
}

function Sidebar({ isCollapsed, location }) {
  return (
    <nav 
      className={`bg-gray-800 text-gray-200 pt-6 space-y-1 fixed top-16 bottom-10 overflow-y-auto transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {!isCollapsed && (
        <h2 className="text-xl font-semibold text-white text-center"></h2>
      )}
      
      {navItems.map(({ to, label, icon: Icon }) => {
        const isActive = location.pathname === to;
        
        return (
          <NavLink
            to={to}
            key={to}
            className={({ isActive: active }) =>
              `flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 group ${
                active 
                  ? "bg-blue-600 text-white font-medium" 
                  : "hover:bg-gray-700 text-gray-300"
              }`
            }
          >
            <Icon
              className={`w-6 h-6 transition-all duration-200 ease-in-out ${
                isActive 
                  ? "text-white" 
                  : "text-blue-300"
              } group-hover:text-white flex-shrink-0`}
            />
            {!isCollapsed && (
              <span className="group-hover:text-white transition-colors">
                {label}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default function BrokerLayout() {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header 
        user={{ name: "Broker User" }} 
        toggleSidebar={toggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      
      <div className="flex flex-1 pt-9">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          location={location}
        />
        
        <main 
          className={`flex-grow min-h-[calc(100vh-4rem)] overflow-auto transition-all duration-300 ${
            isSidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <Outlet />
        </main>
      </div>

      <Footer isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
}