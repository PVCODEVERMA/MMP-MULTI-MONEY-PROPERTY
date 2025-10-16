import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

const SubAdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        {/* Left Section */}
        <div className="flex items-center justify-center mb-3 md:mb-0 text-center md:text-left">
          <p className="flex items-center justify-center md:justify-start">
            © {currentYear} Multi Money Property. Made with 
            <HeartIcon className="w-4 h-4 text-red-500 mx-1" /> 
            for real estate professionals.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-center text-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            <a 
              href="/privacy" 
              className="hover:text-orange-600 transition-colors text-xs sm:text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="hover:text-orange-600 transition-colors text-xs sm:text-sm"
            >
              Terms of Service
            </a>
            <a 
              href="/support" 
              className="hover:text-orange-600 transition-colors text-xs sm:text-sm"
            >
              Support
            </a>
          </div>

          {/* System status */}
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 font-medium text-xs sm:text-sm">
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SubAdminFooter;
