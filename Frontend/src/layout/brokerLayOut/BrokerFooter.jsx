import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

const BrokerFooter = ({ sidebarCollapsed }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" sticky bg-gradient-to-r from-[#154056] to-[#2c6b8a] text-white transition-all duration-300">
      <div className="px-4 sm:px-6 py-4 sm:py-3">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 max-w-7xl mx-auto">
          
         {/* Left Section - Hidden on Mobile */}
          <div className="hidden sm:flex items-center justify-center lg:justify-start w-full lg:w-auto order-2 lg:order-1">
            <p className="flex items-center text-xs sm:text-sm text-center lg:text-left text-blue-100">
              © {currentYear} Multi Money Property. Made with 
              <HeartIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#ff9c00] mx-1" /> 
              for real estate professionals.
            </p>
          </div>

          {/* Right Section - Links */}
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-center w-full lg:w-auto order-1 lg:order-2">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
              <a 
                href="/privacy" 
                className="text-blue-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium hover:underline whitespace-nowrap"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="text-blue-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium hover:underline whitespace-nowrap"
              >
                Terms of Service
              </a>
              <a 
                href="/support" 
                className="text-blue-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium hover:underline whitespace-nowrap"
              >
                Support
              </a>
              <a 
                href="/contact" 
                className="text-blue-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium hover:underline whitespace-nowrap"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        
       
        

       
      </div>
    </footer>
  );
};

export default BrokerFooter;