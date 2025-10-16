import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BrokerHeader from '../../layout/brokerLayOut/BrokerHeader.jsx';
import BrokerSidebar from '../../layout/brokerLayOut/BrokerSidebar.jsx';
import BrokerFooter from '../../layout/brokerLayOut/BrokerFooter.jsx';

const BrokerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <BrokerSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'ml-62'}`}>
        {/* Header */}
        <BrokerHeader />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <BrokerFooter />
      </div>
    </div>
  );
};

export default BrokerLayout;
