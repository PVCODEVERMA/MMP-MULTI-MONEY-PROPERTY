import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SuperAdminHeader from '../../layout/superAdminLayOut/SuperAdminHeader.jsx';
import SuperAdminSidebar from '../../layout/superAdminLayOut/SuperAdminSidebar.jsx';
import SuperAdminFooter from '../../layout/superAdminLayOut/SuperAdminFooter.jsx';

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <SuperAdminSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'ml-0'
      }`}>
        {/* Header */}
        <SuperAdminHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <SuperAdminFooter />
      </div>
    </div>
  );
};

export default SuperAdminLayout;
