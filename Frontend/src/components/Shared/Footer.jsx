import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} MMP Hybrid System. All rights reserved.</p>
        <div className="mt-4 md:mt-0 space-x-6">
          <a href="/terms" className="hover:text-white text-sm">Terms of Service</a>
          <a href="/privacy" className="hover:text-white text-sm">Privacy Policy</a>
          <a href="/contact" className="hover:text-white text-sm">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
