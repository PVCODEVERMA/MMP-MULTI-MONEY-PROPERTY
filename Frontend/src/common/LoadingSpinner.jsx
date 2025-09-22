
import React from "react";
import logo from "../assets/componyLogos/logo.jpg"; 

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="relative">
        {/* Outer circle */}
        <div className="h-20 w-20 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
        
        {/* Logo inside */}
        <img
          src={logo}
          alt="MMP Logo"
          className="absolute inset-0 m-auto h-10 w-10 rounded-full object-contain"
        />
      </div>
      <p className="mt-4 text-gray-600 font-medium animate-pulse">{message}</p>
    </div>
  );
}
