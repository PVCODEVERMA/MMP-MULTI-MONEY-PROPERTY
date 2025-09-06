import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SubAdminSidebar from './SubAdminSidebar';
import SubAdminHeader from './SubAdminHeader';
import SubAdminFooter from './SubadminFooter';


const SubAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <SubAdminSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'ml-0'
      }`}>
        {/* Header */}
        <SubAdminHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <SubAdminFooter />
      </div>
    </div>
  );
};

export default SubAdminLayout;
