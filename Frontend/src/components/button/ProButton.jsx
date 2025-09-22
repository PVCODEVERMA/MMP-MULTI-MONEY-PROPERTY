import React from "react";
import { Link } from "react-router-dom";

const ProButton = () => {
  return (
    <Link to="/postPropertyFree">
      <button className="flex items-center gap-2 px-6 py-2 rounded-full text-[#F7F7F7] font-medium bg-gradient-to-r from-[#FF9C00] to-[#FF9C00] hover:from-[#164058] hover:to-[#164058] transition-all shadow-md cursor-pointer">
        Post property
        <span className="bg-[#F7F7F7] ml-0.5 text-[#FF9C00] text-xs font-bold px-2 py-0.5 rounded-full">
          FREE
        </span>
      </button>
    </Link>
  );
};

export default ProButton;
