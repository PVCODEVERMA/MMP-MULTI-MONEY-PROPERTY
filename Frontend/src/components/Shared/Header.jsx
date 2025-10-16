// Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/componyLogos/logo.jpg";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaChevronUp, FaChevronDown, FaPhone } from "react-icons/fa";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import RegisterLeads from "../../pages/broker/RegisterLeads";

const QUICK_LINKS = [
  { label: "My Profile", href: "/my-profile" },
  { label: "My Enquiry", href: "/my-enquiry" },
  { label: "Post Property", href: "/post-property", badge: "NEW" },
  { label: "Property Purchase", href: "/property-purchase" },
  { label: "Compony Management", href: "/registerSubAdmin" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  const [isSignInOpen, setIsSignInOpen] = useState(false); 
  const [openLeadsModal, setOpenLeadsModal] = useState(false);

  const profileRef = useRef(null);
  const signInRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const normalizedRole = user?.role?.toLowerCase();

  const avatar = user?.profileImage
    ? user.profileImage
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.fullName || "User"
      )}&background=FF9C00&color=ffffff&size=40`;

  const mobileProfileItems = [
    { label: "MMP Prime", href: `/welcome` },
    { label: "My Activity", href: `/${normalizedRole}/my-activity` },
    {
      label: "Manage Properties",
      href: `/${normalizedRole}/manage-properties`,
    },
    { label: "My Enquiry", href: `/${normalizedRole}/manage-properties` },
    { label: "My Profile", href: `/${normalizedRole}/profile` },
    { label: "Settings", href: `/${normalizedRole}/settings` },
  ];

  const navItems = (() => {
    if (!isAuthenticated) {
      return [
        { name: "Home", href: "/", active: location.pathname === "/" },
        {
          name: "All Properties",
          href: "/:location?",
          // active: location.pathname.startsWith(""),
        },
        {
          name: "All Agents",
          href: "/all-agents",
          active: location.pathname === "/all-agents",
        },
        {
          name: "Contact",
          href: "/contact-property",
          active: location.pathname === "/contact-property",
        },
      ];
    }

    switch (normalizedRole) {
      case "superadmin":
        return [
          {
            name: "Dashboard",
            href: "/super-admin/dashboard",
            active: location.pathname.includes("/super-admin"),
          },
          { name: "Users", href: "/super-admin/users" },
          { name: "Companies", href: "/super-admin/companies" },
          { name: "Reports", href: "/super-admin/reports" },
          { name: "Settings", href: "/super-admin/settings" },
        ];
      case "subadmin":
        return [
          {
            name: "Dashboard",
            href: "/sub-admin/dashboard",
            active: location.pathname.includes("/sub-admin"),
          },
          { name: "Brokers", href: "/sub-admin/brokers" },
          { name: "Properties", href: "/sub-admin/properties" },
          { name: "Leads", href: "/sub-admin/leads" },
          { name: "Performance", href: "/sub-admin/performance" },
        ];
      case "broker":
        return [
          {
            name: "Dashboard",
            href: "/broker/dashboards",
            active: location.pathname.includes("/broker"),
          },
          { name: "Leads", href: "/broker/leads" },
          { name: "Properties", href: "/broker/submit-property" },
          { name: "Packages", href: "/broker/packages" },
          { name: "Reports", href: "/broker/reports" },
        ];
      default:
        return [
          { name: "Home", href: "/", active: location.pathname === "/" },
          {
            name: "All Properties",
            href: "/all-properties",
            active: location.pathname === "/all-properties",
          },
          { name: "All Agents", href: "/agents" },
          { name: "Contact", href: "/contact" },
        ];
    }
  })();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setIsProfileOpen(false);
      if (signInRef.current && !signInRef.current.contains(e.target))
        setIsSignInOpen(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target))
        setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Lock body scroll for mobile drawer
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed inset-x-0 top-0 z-40 bg-[#F7F7F7] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20 lg:h-20">
            {/* Logo */}
            <Link
              to={
                !isAuthenticated
                  ? "/"
                  : normalizedRole === "superadmin"
                  ? "/super-admin"
                  : normalizedRole === "subadmin"
                  ? "/sub-admin"
                  : normalizedRole === "broker"
                  ? "/broker"
                  : "/dashboard"
              }
              className="flex items-center cursor-pointer"
            >
              <img
                src={logo}
                alt="MMP Logo"
                className="h-16 w-28 lg:h-14 lg:w-24 object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map(({ name, href, active }) => (
                <Link
                  key={name}
                  to={href}
                  className={`px-4 py-2 rounded-lg font-medium text-[15px] transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[#ff9c00] text-white shadow-md"
                      : "text-slate-600 hover:text-[#ff9c00] hover:bg-orange-50"
                  }`}
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center space-x-3">
              {!isAuthenticated && (
                <button
                  onClick={() => setOpenLeadsModal(true)}
                  className="hidden lg:flex relative items-center gap-1 px-4 py-2 rounded-full text-white font-medium bg-[#144155] hover:bg-[#FF9C00] transition-all duration-300 shadow-md text-sm border-2 border-transparent hover:border-[#154056] animate-pulse cursor-pointer"
                >
                  <span className="text-sm">Get Leads</span>
                  <span className="absolute -top-1 -right-1 bg-[#FF9C00] text-[#164058] font-bold text-[10px] px-2 py-1 rounded-full shadow">
                    New
                  </span>
                </button>
              )}

              {/* Guest Sign-in */}
              {!isAuthenticated && (
                <div
                  className="hidden md:flex relative items-center cursor-pointer"
                  ref={signInRef}
                  onMouseEnter={() => setIsSignInOpen(true)}
                  onMouseLeave={() => setIsSignInOpen(false)}
                >
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <FaRegCircleUser className="text-slate-600 hover:text-[#ff9c00] h-7 w-7 transition-colors duration-200" />
                    {isSignInOpen ? (
                      <FaChevronUp className="h-3 w-3 text-orange-500 ml-1 transition-transform duration-200" />
                    ) : (
                      <FaChevronDown className="h-3 w-3 text-gray-500 ml-1 transition-transform duration-200" />
                    )}
                  </div>

                  <AnimatePresence>
                    {isSignInOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                      >
                        <section className="py-4 px-4">
                          <Link
                            to="/login"
                            className="block w-full mb-3 text-center bg-[#ff9c00] hover:bg-[#fba720] text-white font-medium py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                          >
                            Sign In
                          </Link>
                          <div className="text-center text-sm text-slate-600 mb-3">
                            <p>New to MMP ?</p>
                            <Link
                              to="/register"
                              className="text-[#ff9c00] font-semibold hover:underline cursor-pointer"
                            >
                              Sign Up
                            </Link>
                          </div>
                          <div className="h-px bg-gray-200 my-2" />
                          <h3 className="mb-2 text-xs font-semibold uppercase text-slate-400">
                            Quick Links
                          </h3>
                          {QUICK_LINKS.map(({ label, href, badge }) => (
                            <Link
                              key={label}
                              to={href}
                              className="flex items-center justify-between px-2 py-2 text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors duration-200 cursor-pointer"
                            >
                              {label}
                              {badge && (
                                <span className="text-[10px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded">
                                  {badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </section>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Authenticated Profile */}
              {isAuthenticated && (
                <div className="relative hidden md:block" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full ring-2 ring-orange-500/20 object-cover"
                    />
                    <svg
                      className={`w-4 h-4 text-[#ff9c00] font-extrabold transition-transform duration-200 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100 text-center">
                        <p className="text-[#154056] font-serif font-bold">
                          <span className="text-[#ff9c00] font-serif font-bold">
                            Hi,{" "}
                          </span>
                          {user.fullName}
                        </p>
                        
                      </div>
                      {mobileProfileItems.map(({ label, href }) => (
                        <Link
                          key={label}
                          to={href}
                          onClick={() => setIsProfileOpen(false)}
                          className="block px-4 py-2 text-sm font-bold text-[#154056] hover:text-[#ff9c00] hover:bg-orange-50 transition-colors duration-200 cursor-pointer"
                        >
                          {label}
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false); // close the dropdown
                        }}
                        className="w-full px-4 py-2 border-t border-gray-100 text-sm text-[#154056] font-bold hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Help Center */}
              <div
                className="relative hidden md:block cursor-pointer"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <button className="flex items-center cursor-pointer">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`transition-colors duration-200 ${
                      isOpen
                        ? "text-[#ff9c00]"
                        : "text-slate-600 hover:text-[#ff9c00]"
                    }`}
                  >
                    <path
                      d="M12 17h.01"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.09 9.5a2.91 2.91 0 115.82 0c0 2-3 2.5-3 4.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute -right-28 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50"
                    >
                      <h3 className="font-bold text-sm mb-2">Help Center</h3>
                      <p className="text-slate-500 text-xs">
                        Need assistance? Contact us via phone or chat.
                      </p>
                      <div className="mt-2 flex items-center gap-2 cursor-pointer">
                        <MdOutlinePhoneInTalk className="text-[#ff9c00] w-5 h-5" />
                        <span className="text-sm font-bold">
                          +91 85278 59176
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-[#ff9c00] hover:bg-orange-50 transition-colors duration-200 cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-transparent bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 bg-[#f7f7f7] w-80 shadow-2xl lg:hidden"
              ref={mobileMenuRef}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-[#F7F7F7]">
                <img src={logo} alt="MMP Logo" className="h-8 w-auto" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-600 hover:text-[#ff9c00] text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-50 transition-colors duration-200 cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {/* User Info (if authenticated) */}
              {isAuthenticated && (
                <div className="px-6 py-4 border-b border-gray-100 bg-orange-50">
                  <div className="flex items-center space-x-3">
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full ring-2 ring-orange-500/20 object-cover"
                    />
                    <div>
                      <p className="text-[#154056] font-bold text-sm">
                        <span className="text-[#ff9c00]">Hi, </span>
                        {user.fullName}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-1">
                  {/* Main Navigation */}
                  {navItems.map(({ name, href, active }) => (
                    <Link
                      key={name}
                      to={href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 cursor-pointer  ${
                        active
                          ? "bg-[#ff9c00] text-white shadow-md"
                          : "text-slate-700 hover:text-[#ff9c00] hover:bg-orange-50"
                      }`}
                    >
                      {name}
                    </Link>
                  ))}

                  {/* Get Leads Button for Mobile */}
                  {!isAuthenticated && (
                    <button
                      onClick={() => {
                        setOpenLeadsModal(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 mt-4 bg-[#144155] hover:bg-[#FF9C00] text-white font-medium rounded-lg transition-all duration-300 shadow-md cursor-pointer"
                    >
                      <span>Get Leads</span>
                      <span className="bg-[#FF9C00] text-[#164058] font-bold text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    </button>
                  )}

                  {/* Profile Links for Authenticated Users */}
                  {isAuthenticated && (
                    <>
                      <div className="border-t border-gray-200 my-3 pt-3">
                        <p className="px-4 text-xs font-semibold text-slate-400 uppercase mb-2">
                          My Account
                        </p>
                        {mobileProfileItems.map(({ label, href }) => (
                          <Link
                            key={label}
                            to={href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 hover:text-[#ff9c00] hover:bg-orange-50 rounded-lg transition-colors duration-200 cursor-pointer"
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-3 mt-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </>
                  )}

                  {/* Guest Links */}
                  {!isAuthenticated && (
                    <div className="border-t border-gray-200 my-3 pt-3">
                      <p className="px-4 text-xs font-semibold text-slate-400 uppercase mb-2">
                        Account
                      </p>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-[#ff9c00] hover:bg-orange-50 rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-[#ff9c00] hover:bg-orange-50 rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}

                  {/* Help Center Mobile */}
                  <div className="border-t border-gray-200 my-3 pt-3">
                    <div className="px-4 py-3">
                      <h3 className="font-bold text-sm mb-2 text-slate-700">
                        Help Center
                      </h3>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MdOutlinePhoneInTalk className="text-[#ff9c00] w-5 h-5" />
                        <span className="text-sm font-medium">
                          +91 5278 59176
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Leads Modal */}
      {openLeadsModal && (
        <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg relative p-6 mx-auto">
            <button
              onClick={() => setOpenLeadsModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-white hover:bg-[#ff9c00] rounded-full p-2 text-2xl transition-colors duration-200 cursor-pointer"
            >
              &times;
            </button>
            <RegisterLeads onClose={() => setOpenLeadsModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
