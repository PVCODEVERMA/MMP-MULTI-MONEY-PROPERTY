import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  PhoneIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";


import pv from "../../assets/OurCustomersImg/pv.jpg"
const navLinks = [
  { to: "/plans", label: "Pricing" },
  { to: "/ourCustomers", label: "Our Customers" },
  { to: "/projectsListing", label: "Resources" },
  { to: "/broker/dashboard", label: "Dashboard" },
  { to: "/lead-form", label: "Contact" },
  { to: "/signup", label: "Signup" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [phoneHover, setPhoneHover] = useState(false);
  const location = useLocation();

  // Mock user data with profile image
  const user = {
    name: "Rajesh Kumar",
    role: "Broker",
    phone: "+91 98765 43210",
    email: "rajesh@example.com",
    profileImage:
      pv,
  };

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Branding */}
          <Link
            to="/"
            className="font-extrabold text-2xl flex items-center gap-2"
          >
            <span
              className="bg-white text-blue-700 rounded px-2 py-1 font-black tracking-tight shadow"
              style={{ letterSpacing: "-1.5px" }}
            >
              MMP
            </span>
            Portal
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center font-medium">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`transition px-3 py-2 rounded 
                  ${
                    isActive(to)
                      ? "bg-white text-blue-700 font-bold shadow"
                      : "hover:bg-blue-600 hover:text-white/90"
                  }`}
              >
                {label}
              </Link>
            ))}

            {/* Enhanced Phone Number UI */}
            <div
              className="ml-4 relative"
              onMouseEnter={() => setPhoneHover(true)}
              onMouseLeave={() => setPhoneHover(false)}
            >
              <a
                href="tel:+918888888888"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-300 group shadow-md"
              >
                <div className="relative">
                  <PhoneIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  {phoneHover && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium transition-all duration-300">
                  +91 88888 88888
                </span>
              </a>

              {/* Call Now Tooltip */}
              {phoneHover && (
                <div className="absolute top-full right-0 mt-2 bg-white text-blue-700 px-3 py-1 rounded-md shadow-lg text-xs font-semibold animate-bounce">
                  Call Now!
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-white transform rotate-45"></div>
                </div>
              )}
            </div>

            {/* Admin Icon */}
            <Link
              to="/admin/dashboard"
              className="ml-4 p-2 rounded-full hover:bg-blue-600 transition flex items-center"
            >
              Admin
            </Link>

            {/* Broker Profile with Image */}
            <div className="relative ml-4">
              <button
                className="flex items-center gap-2 hover:bg-blue-600 p-1 rounded-full transition cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                  {/* User Info Section */}
                  <div className="px-4 py-3 text-center border-b border-gray-100 flex items-center gap-3">
                    <div>
                      <div className="px-4 py-3 text-center border-b border-gray-100 flex flex-col items-center justify-center">
                        <p className="font-semibold text-gray-900">
                          {user.name} <a href="">{user.role}</a>
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/broker/dashboard"
                      className="flex items-center px-4 py-2 text-sm hover:bg-blue-50 text-gray-700 group"
                      onClick={() => setProfileOpen(false)}
                    >
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-600 group-hover:bg-blue-700"></div>
                      </div>
                      Dashboard
                    </Link>

                    <Link
                      to="/myprofile"
                      className="flex items-center px-4 py-2 text-sm hover:bg-blue-50 text-gray-700 group"
                      onClick={() => setProfileOpen(false)}
                    >
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                      </div>
                      My Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm hover:bg-blue-50 text-gray-700 group"
                      onClick={() => setProfileOpen(false)}
                    >
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        <AdjustmentsHorizontalIcon className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                      </div>
                      Settings
                    </Link>
                  </div>

                  {/* Logout Section */}
                  <div className="py-2 border-t border-gray-100">
                    <Link
                      to="/logout"
                      className="flex items-center px-4 py-2 text-sm hover:bg-red-50 text-red-600 group"
                      onClick={() => setProfileOpen(false)}
                    >
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        <ArrowRightOnRectangleIcon className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                      </div>
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            {/* Enhanced Phone icon for mobile */}
            <a
              href="tel:+918888888888"
              className="relative p-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-md"
            >
              <PhoneIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </a>

            <button
              className="flex items-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 border-t border-blue-600">
          <div className="flex flex-col gap-2 px-4 py-3">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block px-3 py-2 rounded 
                  ${
                    isActive(to)
                      ? "bg-white text-blue-700 font-bold"
                      : "hover:bg-blue-600 hover:text-white/90"
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {/* Admin Link for Mobile */}
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-2 px-3 py-2 rounded 
                ${
                  isActive("/admin")
                    ? "bg-white text-blue-700 font-bold"
                    : "hover:bg-blue-600 hover:text-white/90"
                }`}
              onClick={() => setMenuOpen(false)}
            >
              <UserIcon className="w-5 h-5" />
              Admin Panel
            </Link>
            <Link
              to="/settings"
              className={`flex items-center gap-2 px-3 py-2 rounded 
                ${
                  isActive("/admin")
                    ? "bg-white text-blue-700 font-bold"
                    : "hover:bg-blue-600 hover:text-white/90"
                }`}
              onClick={() => setMenuOpen(false)}
            >
              <Cog6ToothIcon className="w-5 h-5" />
              Settings
            </Link>
          
            <Link
              to="/logout"
              className="flex items-center gap-2 px-3 py-2 rounded mt-2 pt-3 border-t border-blue-600 hover:bg-blue-600 text-red-100"
              onClick={() => setMenuOpen(false)}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Logout
            </Link>

            {/* Enhanced Phone Number for Mobile */}
            <div className="flex flex-col gap-2 px-3 py-3 mt-2 pt-4 border-t border-blue-600">
              <p className="text-sm text-blue-200 font-medium mb-1">
                Need help? Call us:
              </p>
              <a
                href="tel:+918888888888"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg transition-all duration-300 shadow-md w-full"
              >
                <PhoneIcon className="w-5 h-5" />
                <span className="font-semibold">+91 88888 88888</span>
              </a>
              <p className="text-xs text-blue-300 mt-1">
                Available 9AM - 6PM, Mon-Sat
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
