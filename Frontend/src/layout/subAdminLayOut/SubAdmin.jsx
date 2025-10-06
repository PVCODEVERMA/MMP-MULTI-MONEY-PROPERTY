import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SubAdminSidebar from "./SubAdminSidebar";
import SubAdminHeader from "./SubAdminHeader";
import SubAdminFooter from "./SubAdminFooter";
import { useAuthSubAdmin } from "../../context/AuthContextSubAdmin";

const SubAdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { subAdmin } = useAuthSubAdmin();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <SubAdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <SubAdminHeader
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        
          <Outlet />
       

        <SubAdminFooter />
      </div>
    </div>
  );
};

export default SubAdminLayout;
