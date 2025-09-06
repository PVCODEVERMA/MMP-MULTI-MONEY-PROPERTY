import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

const SubAdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <p className="flex items-center">
            © {currentYear} Multi Money Property. Made with 
            <HeartIcon className="w-4 h-4 text-red-500 mx-1" /> 
            for real estate professionals.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6 mt-2 md:mt-0">
          <a 
            href="/privacy" 
            className="hover:text-orange-600 transition-colors"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms" 
            className="hover:text-orange-600 transition-colors"
          >
            Terms of Service
          </a>
          <a 
            href="/support" 
            className="hover:text-orange-600 transition-colors"
          >
            Support
          </a>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 font-medium">System Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SubAdminFooter;
