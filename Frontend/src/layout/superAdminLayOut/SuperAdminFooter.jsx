import React from 'react';
import { HeartIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

const SuperAdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <p className="flex items-center">
            © {currentYear} Multi Money Property. Made with 
            <HeartIcon className="w-4 h-4 text-red-500 mx-1" /> 
            for real estate excellence.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6 mt-2 md:mt-0">
          <a 
            href="/admin/logs" 
            className="hover:text-red-600 transition-colors"
          >
            System Logs
          </a>
          <a 
            href="/admin/security" 
            className="hover:text-red-600 transition-colors"
          >
            Security Center
          </a>
          <a 
            href="/admin/support" 
            className="hover:text-red-600 transition-colors"
          >
            Admin Support
          </a>
          <div className="flex items-center space-x-2">
            <ShieldCheckIcon className="w-4 h-4 text-red-500" />
            <span className="text-red-600 font-medium">Admin Panel: Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SuperAdminFooter;
