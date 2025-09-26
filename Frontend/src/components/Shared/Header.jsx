import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";
import logo from "../../assets/componyLogos/logo.jpg";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import RegisterLeads from "../../pages/broker/RegisterLeads.jsx";

/* ---------- Static menu data (mobile + guest dropdown) ---------- */
const QUICK_LINKS = [
  { label: "Post Property", href: "/post-property", badge: "NEW" },
  { label: "MMP Prime", href: "/home/leads" },
  { label: "My Profile", href: "/my-profile" },
];

export default function Header() {
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

  const avatar =
    user?.profile?.avatar?.url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User"
    )}&background=FF9C00&color=ffffff&size=40`;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful 👋", { position: "top-center" });
      navigate("/login");
    } catch {
      toast.error("Logout failed, please try again.", {
        position: "top-center",
      });
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const close = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (signInRef.current && !signInRef.current.contains(e.target)) {
        setIsSignInOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  // Dynamic nav items based on auth
  const navItems = (() => {
    if (!isAuthenticated) {
      return [
        { name: "Home", href: "/", active: location.pathname === "/" },
        {
          name: "All Properties",
          href: "/all-properties",
          active: location.pathname === "/all-properties",
        },
        {
          name: "All Agents",
          href: "/agents",
          active: location.pathname === "/agents",
        },
        {
          name: "Contact",
          href: "/contact-property",
          active: location.pathname === "/contact-property",
        },
      ];
    }
    switch (user.role) {
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
            name: "Plans",
            href: "/plans",
            active: location.pathname === "/plans",
          },
          { name: "All Agents", href: "/agents" },
          { name: "Contact", href: "/contact" },
        ];
    }
  })();

  // Mobile menu profile dropdown items
  const mobileProfileItems = [
    { label: "My Profile", href: `/${user?.role}/profile` },
    { label: "Settings", href: `/${user?.role}/settings` },
    { label: "Billing", href: `/${user?.role}/billing` },
  ];

  return (
    <>
      {/* ---------- Top nav ---------- */}
      <nav className="fixed inset-x-0 z-40 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-24 lg:h-20">
            {/* Logo */}
            <Link
              to={
                isAuthenticated
                  ? user.role === "superadmin"
                    ? "/super-admin"
                    : user.role === "subadmin"
                    ? "/sub-admin"
                    : user.role === "broker"
                    ? "/broker"
                    : "/dashboard"
                  : "/"
              }
              className="flex items-center"
            >
              <img src={logo} alt="MMP Logo" className="h-20 w-35 mt-1.5" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map(({ name, href, active }) => (
                <Link
                  key={name}
                  to={href}
                  className={`px-4 py-2 rounded-lg font-medium text-[17px] ${
                    active
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-slate-600 hover:text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              {!isAuthenticated && (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="relative" ref={signInRef}>
                    <div
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={() => setIsSignInOpen(!isSignInOpen)}
                    >
                      <button className="text-slate-600 hover:text-orange-500 font-medium cursor-pointer">
                        Dropdown
                      </button>
                      <IoIosArrowDropdownCircle className="text-orange-500" />
                    </div>

                    {isSignInOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                        <section className="py-4">
                          <h3 className="px-4 mb-2 text-xs font-semibold uppercase text-slate-400">
                            Quick Links
                          </h3>
                          {QUICK_LINKS.map(({ label, href, badge }) => (
                            <Link
                              key={label}
                              to={href}
                              className="flex items-center justify-between px-4 py-2 text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-600"
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

                        <div className="h-px bg-gray-100" />

                        <div className="p-4 border-t border-gray-100">
                          <Link
                            to="/login"
                            className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg"
                          >
                            Sign In
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Find By Leads button */}
             
              <div className="z-40  gap-1 p-2 hidden lg:flex">
                <button
                  onClick={() => setOpenLeadsModal(true)}
                  className="relative flex items-center gap-1 px-3 py-3 rounded-full text-[#F7F7F7] font-medium bg-[#151056] hover:bg-[#FF9C00] transition-all duration-200 shadow-md cursor-pointer transform hover:scale-105 text-[10px] border-2 border-transparent hover:border-[#FF9C00] animate-pulse"
                >
                  <span className="text-sm">Find By Leads</span>
                  <span className="absolute -top-1 -right-1 bg-[#FF9C00] text-[#151056] font-bold text-2xl px-2 py-[1px] text-[8px] rounded-full shadow">
                    New
                  </span>
                </button>
              </div>

              {/* Profile */}
              {isAuthenticated && (
                <div className="relative hidden md:block" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full ring-2 ring-orange-500/20"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-700">
                        {user.name}
                      </p>
                      <p className="text-xs text-orange-500 capitalize">
                        {user.role}
                      </p>
                    </div>
                    <svg
                      className={`w-4 h-4 text-slate-400 ${
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
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                      <div className="px-4 py-3 border-b border-gray-100 text-center">
                        <p className="font-medium text-slate-800">
                          {user.name}
                        </p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                      {mobileProfileItems.map(({ label, href }) => (
                        <Link
                          key={label}
                          to={href}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex px-4 py-2 text-sm text-slate-600 hover:text-orange-500 hover:bg-orange-50"
                        >
                          {label}
                        </Link>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="flex w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                className="lg:hidden p-4 text-[#164057] hover:text-[#FF9C00] hover:bg-[#F7F7F7] rounded-lg"
              >
                <div className="w-5 h-5 relative">
                  <span
                    className={`absolute w-full h-0.5 bg-current transition-transform ${
                      isMenuOpen ? "top-2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute w-full h-0.5 bg-current top-2 transition-opacity ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute w-full h-0.5 bg-current transition-transform ${
                      isMenuOpen ? "top-2 -rotate-45" : "top-4"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ---------- Mobile Menu ---------- */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed inset-0 z-30 bg-white transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-24 pb-6 px-6 overflow-y-auto">
            {/* User Info (if authenticated) */}
            {isAuthenticated && (
              <div className="flex items-center space-x-4 p-4 mb-6 bg-gray-50 rounded-lg">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full ring-2 ring-orange-500/20"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-slate-800 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-orange-500 capitalize">
                    {user.role}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Mobile Navigation Links */}
            <nav className="flex-1 space-y-2">
              {navItems.map(({ name, href, active }) => (
                <Link
                  key={name}
                  to={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                    active
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {name}
                </Link>
              ))}

              {/* Quick Links for Guest Users */}
              {!isAuthenticated && (
                <>
                  <div className="px-4 pt-6 pb-2">
                    <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wide">
                      Quick Links
                    </h3>
                  </div>
                  {QUICK_LINKS.map(({ label, href, badge }) => (
                    <Link
                      key={label}
                      to={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <span>{label}</span>
                      {badge && (
                        <span className="text-xs font-bold bg-orange-500 text-white px-2 py-1 rounded">
                          {badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </>
              )}

              {/* Profile Links for Authenticated Users */}
              {isAuthenticated && (
                <>
                  <div className="px-4 pt-6 pb-2">
                    <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wide">
                      Account
                    </h3>
                  </div>
                  {mobileProfileItems.map(({ label, href }) => (
                    <Link
                      key={label}
                      to={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      {label}
                    </Link>
                  ))}
                </>
              )}
            </nav>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              {/* Find By Leads Button (Mobile) */}
              <button
                onClick={() => {
                  setOpenLeadsModal(true);
                  setIsMenuOpen(false);
                }}
                className="w-full relative flex items-center justify-center gap-2 px-4 py-3 rounded-full text-white font-medium bg-[#151056] hover:bg-[#FF9C00] transition-all duration-200 shadow-md"
              >
                <span className="text-base">Find By Leads</span>
                <span className="absolute -top-1 -right-1 bg-[#FF9C00] text-[#151056] font-bold text-xs px-2 py-1 rounded-full shadow">
                  New
                </span>
              </button>

              {/* Auth Buttons */}
              {!isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium py-3 rounded-lg"
                  >
                    Create Account
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-center bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-20 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>

      {/* ---------- Leads Modal ---------- */}
      {openLeadsModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg relative p-6">
            <button
              onClick={() => setOpenLeadsModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-white hover:bg-[#ff9c00] rounded-full p-2 text-2xl cursor-pointer"
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
