import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, LogOut, Menu, X, Settings, HelpCircle } from "lucide-react";
import logo from "../../assets/componyLogos/logo.jpg";

const FindByLeadsHeader = () => {
  const [desktopProductOpen, setDesktopProductOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here
  };

  return (
    <header className="bg-[#f7f7f7] fixed top-0 left-0 w-full z-50 transition-colors duration-300">
      <div className="container mx-auto flex justify-between sm:justify-around items-center px-4 py-3">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center">
          <button
            className="md:hidden mr-4 text-[#ff9c00] cursor-pointer transition-transform hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

          <Link to="/findByLeads" className="flex items-center gap-2">
            <img
              src={logo}
              className="h-16 w-auto transition-transform hover:scale-105"
              alt="MMP Logo"
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-8 font-medium items-center">
          {/* Products Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setDesktopProductOpen(true)}
            onMouseLeave={() => setDesktopProductOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[#FF9C00] transition-colors duration-200 py-2 cursor-pointer">
              Products{" "}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  desktopProductOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute left-0 top-full bg-white shadow-lg rounded-md w-56 border border-gray-100 z-50 transition-all duration-300 origin-top ${
                desktopProductOpen
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0"
              }`}
            >
              <Link
                to="/leads"
                className="block px-4 py-3 hover:bg-[#f7f7f7] transition-colors duration-200"
              >
                Real Estate Leads
              </Link>
              <Link
                to="/agents"
                className="block px-4 py-3 hover:bg-[#f7f7f7] transition-colors duration-200"
              >
                Professional for Agents
              </Link>
              <Link
                to="/teams"
                className="block px-4 py-3 hover:bg-[#f7f7f7] transition-colors duration-200"
              >
                Market Leader Teams
              </Link>
            </div>
          </div>

          <Link to="/plans" className="hover:text-[#FF9C00] py-2">
            Pricing
          </Link>

          {/* Solutions */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#FF9C00] py-2 cursor-pointer">
              Solutions{" "}
              <ChevronDown
                size={16}
                className="transition-transform duration-200 group-hover:rotate-180"
              />
            </button>
            <div className="absolute left-0 top-full bg-white shadow-lg rounded-md w-64 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
              <Link
                to="/solutions/lead-distribution"
                className="block px-4 py-3 hover:bg-[#f7f7f7]"
              >
                Lead Distribution Engine
              </Link>
              <Link
                to="/solutions/lead-delivery"
                className="block px-4 py-3 hover:bg-[#f7f7f7]"
              >
                WhatsApp/Email Delivery
              </Link>
              <Link
                to="/solutions/broker/dashboard/home"
                className="block px-4 py-3 hover:bg-[#f7f7f7]"
              >
                Broker CRM Dashboard
              </Link>
              <Link
                to="/solutions/billing"
                className="block px-4 py-3 hover:bg-[#f7f7f7]"
              >
                Packages & Billing
              </Link>
            </div>
          </div>

          <Link to="/contact" className="hover:text-[#FF9C00] py-2">
            Customer Center
          </Link>
          <Link to="/about" className="hover:text-[#FF9C00] py-2">
            About
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center gap-2 hover:opacity-80 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#FF9C00] to-[#ff6b00] flex items-center justify-center text-white font-semibold">
                <User className="h-6 w-6" />
              </div>
              <span className="hidden md:block text-gray-700">
                Broker Name
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute -right-5 mt-5 bg-white shadow-xl rounded-xl w-56 border border-gray-200 z-50 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-[#FF9C00] to-[#ff6b00] text-white">
                  <p className="font-semibold">Broker Name</p>
                  <p className="text-xs opacity-80">Premium Account</p>
                </div>

                <div className="p-2">
                  <Link
                    to="/broker/profile"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100"
                  >
                    <User size={18} /> My Profile
                  </Link>
                  <Link
                    to="/broker/settings"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100"
                  >
                    <Settings size={18} /> Settings
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100"
                  >
                    <HelpCircle size={18} /> Help & Support
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto transition-all duration-300">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <Link to="/broker/dashboard/home" className="flex items-center gap-2">
                <img src={logo} className="h-12 w-auto" alt="MMP Logo" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* User Profile Section in Mobile Menu */}
            <div className="flex items-center gap-3 p-4 mb-4 bg-gray-50 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FF9C00] to-[#ff6b00] flex items-center justify-center text-white font-semibold">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Broker Name</p>
                <p className="text-xs text-gray-500">Premium Account</p>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {/* Products Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between w-full py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                >
                  <span>Products</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      mobileProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileProductsOpen && (
                  <div className="pl-6 mt-1 space-y-1">
                    <Link
                      to="/leads"
                      className="block py-2 px-4 rounded-lg hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Real Estate Leads
                    </Link>
                    <Link
                      to="/agents"
                      className="block py-2 px-4 rounded-lg hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Professional for Agents
                    </Link>
                    <Link
                      to="/teams"
                      className="block py-2 px-4 rounded-lg hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Market Leader Teams
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/plans"
                className="block py-3 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>

              {/* Solutions Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between w-full py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      mobileSolutionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileSolutionsOpen && (
                  <div className="pl-6 mt-1 space-y-1">
                    <Link
                      to="/solutions/lead-distribution"
                      className="block py-2 px-4 rounded-lg hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Lead Distribution Engine
                    </Link>
                    <Link
                      to="/solutions/lead-delivery"
                      className="block py-2 px-4 rounded-lg hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      WhatsApp/Email Delivery
                    </Link>
                    <Link
                      to="/solutions/broker/dashboard/home"
                      className="block py-2 px-4 rounded-lg hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Broker CRM Dashboard
                    </Link>
                    <Link
                      to="/solutions/billing"
                      className="block py-2 px-4 rounded-lg hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Packages & Billing
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="block py-3 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Customer Center
              </Link>

              <Link
                to="/about"
                className="block py-3 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              
              {/* Profile Links in Mobile Menu */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Link
                  to="/broker/profile"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} /> My Profile
                </Link>
                <Link
                  to="/broker/settings"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings size={18} /> Settings
                </Link>
                <Link
                  to="/help"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HelpCircle size={18} /> Help & Support
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full py-3 px-4 text-red-500 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default FindByLeadsHeader;