
import React from "react";
import { Outlet } from "react-router-dom";

const LeadsInnerLayout = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg ">
      <h2 className="text-lg font-bold mb-4">Leads Inner Section</h2>
      {/* Yaha nested routes render honge */}
      <Outlet />
    </div>
  );
};

export default LeadsInnerLayout;
