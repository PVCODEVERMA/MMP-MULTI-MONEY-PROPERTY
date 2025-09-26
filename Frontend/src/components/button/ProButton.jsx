import React from "react";
import { Link } from "react-router-dom";

const ProButton = () => {
  return (
    <Link to="/postPropertyFree" className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6">
      <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[#F7F7F7] font-medium bg-gradient-to-r from-[#FF9C00] to-[#FF9C00] hover:from-[#164058] hover:to-[#164058] transition-all duration-300 shadow-md cursor-pointer transform hover:scale-105 active:scale-95 text-sm sm:text-xs">
        <span className="whitespace-nowrap">Post property</span>
        <span className="bg-[#F7F7F7] text-[#FF9C00] text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
          FREE
        </span>
      </button>
    </Link>
  );
};

export default ProButton;

