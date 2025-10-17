import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BrokerHeader from '../../layout/brokerLayOut/BrokerHeader.jsx';
import BrokerSidebar from '../../layout/brokerLayOut/BrokerSidebar.jsx';
import BrokerFooter from '../../layout/brokerLayOut/BrokerFooter.jsx';

const BrokerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f7f7f7]">
      {/* Sidebar */}
      <BrokerSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        {/* Header */}
        <BrokerHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        {/* Page Content */}
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'
        }`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <BrokerFooter sidebarCollapsed={sidebarCollapsed} />
      </div>
    </div>
  );
};

export default BrokerLayout;