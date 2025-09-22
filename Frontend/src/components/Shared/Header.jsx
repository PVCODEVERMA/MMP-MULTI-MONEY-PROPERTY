import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import logo from "../../assets/componyLogos/logo.jpg";
import toast from "react-hot-toast";
import ProButton from "../button/ProButton.jsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoverTimer, setHoverTimer] = useState(null);
  const [hideTimer, setHideTimer] = useState(null);
  const profileRef = useRef(null);

  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      setIsMenuOpen(false);
      toast.success("Logout successful 👋", { position: "top-center" });
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
      });
      console.error("Logout error:", error);
    }
  };

  // Avatar
  const getAvatarUrl = () => {
    if (user?.profile?.avatar?.url) return user.profile.avatar.url;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User"
    )}&background=FF9C00&color=ffffff&size=40`;
  };

  // Dropdown hover delays
  const handleDropdownHover = (menuName) => {
    if (hoverTimer) clearTimeout(hoverTimer);
    if (hideTimer) clearTimeout(hideTimer);
    const timer = setTimeout(() => setOpenDropdown(menuName), 400);
    setHoverTimer(timer);
  };
  const handleDropdownLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => setOpenDropdown(null), 500);
    setHideTimer(timer);
  };
  const handleDropdownContentHover = () => {
    if (hideTimer) clearTimeout(hideTimer);
  };

  // Solutions dropdown data
  const solutionsDropdownGrid = [
    [
      {
        icon: "",
        title: "Real Estate Buyer Leads (India)",
        description:
          "Delhi, Noida, Gurgaon, Faridabad & Mumbai location‑based inquiries",
        href: "/solutions/real-estate-leads",
      },
      {
        icon: "",
        title: "City/Area Targeting",
        description: "Exclusive or shared leads by city, area, or project",
        href: "/solutions/location-leads",
      },
    ],
    [
      {
        icon: "",
        title: "Lead Distribution Engine",
        description:
          "Shared (up to 3) or Exclusive delivery with smart routing",
        href: "/solutions/lead-distribution",
      },
      {
        icon: "",
        title: "WhatsApp/Email Delivery",
        description:
          "Instant delivery via Interakt/Gupshup + Email + Broker Dashboard",
        href: "/solutions/lead-delivery",
      },
    ],
    [
      {
        icon: "",
        title: "Broker CRM Dashboard",
        description: "My Leads, status, downloads, analytics & performance",
        href: "/solutions/broker/dashboard/home",
      },
      {
        icon: "",
        title: "Packages & Wallet Billing",
        description:
          "Razorpay checkout, per‑lead wallet, GST invoices & reports",
        href: "/solutions/billing",
      },
    ],
    [
      {
        icon: "",
        title: "Lead Verification",
        description:
          "Duplicate checks, basic tele‑verification & quality scoring",
        href: "/solutions/lead-verification",
      },
      {
        icon: "",
        title: "Webhooks & Automation",
        description:
          "CRM webhooks, inactivity auto‑pause, SMS/alerts workflows",
        href: "/solutions/integrations",
      },
    ],
    [
      {
        icon: "",
        title: "Listings & SEO Pages",
        description:
          "Project, city & area pages, featured tags and blog traffic",
        href: "/solutions/listings-seo",
      },
      {
        icon: "",
        title: "Sales Scripts & Content",
        description: "Email/call scripts, landing pages and content support",
        href: "/solutions/content",
      },
    ],
  ];

  // Resources dropdown data
  const resourcesDropdownData = [
    {
      icon: "",
      title: "Help Center",
      description: "Guides and setup",
      href: "/resources/help-center",
    },
    {
      icon: "",
      title: "Testimonials",
      description: "Client stories",
      href: "/resources/testimonials",
    },
    {
      icon: "",
      title: "FAQ",
      description: "Common questions",
      href: "/resources/faq",
    },
    {
      icon: "",
      title: "Blog",
      description: "Latest articles",
      href: "/resources/blog",
    },
    {
      icon: "",
      title: "Demo",
      description: "Product videos",
      href: "/resources/demo",
    },
  ];

  // Dynamic navigation based on role
  const getNavItems = () => {
    if (!isAuthenticated || !user) {
      return [
        {
          name: "Pricing",
          href: "/plans",
          active: location.pathname === "/plans",
        },
        {
          name: "All Properties",
          href: "/all-properties",
          active: location.pathname === "/all-properties",
        },
        {
          name: "Solutions",
          href: "/",
          active: location.pathname === "/solutions",
          hasDropdown: true,
          dropdownType: "grid",
          dropdownData: solutionsDropdownGrid,
        },

        {
          name: "Contact",
          href: "/contact",
          active: location.pathname === "/contact",
        },
        {
          name: "Resources",
          href: "/",
          active: location.pathname === "/resources",
          hasDropdown: true,
          dropdownType: "list",
          dropdownData: resourcesDropdownData,
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
          { name: "Users", href: "/super-admin/users", active: false },
          { name: "Companies", href: "/super-admin/companies", active: false },
          { name: "Reports", href: "/super-admin/reports", active: false },
          { name: "Settings", href: "/super-admin/settings", active: false },
        ];
      case "subadmin":
        return [
          {
            name: "Dashboard",
            href: "/sub-admin/dashboard",
            active: location.pathname.includes("/sub-admin"),
          },
          { name: "Brokers", href: "/sub-admin/brokers", active: false },
          { name: "Properties", href: "/sub-admin/properties", active: false },
          { name: "Leads", href: "/sub-admin/leads", active: false },
          {
            name: "Performance",
            href: "/sub-admin/performance",
            active: false,
          },
        ];
      case "broker":
        return [
          {
            name: "Dashboard",
            href: "/broker/dashboards",
            active: location.pathname.includes("/broker"),
          },
          { name: "Leads", href: "/broker/leads", active: false },
          {
            name: "Properties",
            href: "/broker/submit-property",
            active: false,
          },
          { name: "Packages", href: "/broker/packages", active: false },
          { name: "Reports", href: "/broker/reports", active: false },
        ];
      default:
        return [
          {
            name: "Home",
            href: "/",
            active: location.pathname === "/dashboard",
          },
          { name: "About", href: "/about", active: false },
          {
            name: "Plans",
            href: "/plans",
            active: location.pathname === "/plans",
          },
          { name: "Contact", href: "/contact", active: false },
          { name: "Blog", href: "/", active: false },
        ];
    }
  };

  const navItems = getNavItems();

  if (loading) {
    return (
      <>
        {/* Top Offer Bar - Loading */}
        <div className="bg-[#FF9C00] text-white text-sm sm:text-base">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2">
              <div className="animate-pulse h-4 bg-[#FF9C00] rounded w-48" />
              <div className="animate-pulse h-6 bg-[#FF9C00] rounded w-20" />
            </div>
          </div>
        </div>

        <nav className="fixed top-8 left-0 right-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-18">
              <div className="flex items-center space-x-3">
                <img src={logo} className="h-16 w-35" alt="MMP Logo" />
              </div>
              <div className="animate-pulse flex space-x-4">
                <div className="h-8 w-20 bg-gray-200 rounded" />
                <div className="h-8 w-8 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
     

      {/* Main Nav */}
      <nav
        className={`fixed left-0 right-0 z-40 ${
          isScrolled
            ? "bg-[#F7F7F7] shadow-lg shadow-orange-500/5"
            : "bg-gradient-to-r from-[#F7F7F7] to-[#F7F7F7]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
          <div className="flex items-center justify-between h-24 lg:h-20.5">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group">
              <Link
                to={
                  isAuthenticated
                    ? user?.role === "superadmin"
                      ? "/super-admin"
                      : user?.role === "subadmin"
                      ? "/sub-admin"
                      : user?.role === "broker"
                      ? "/broker"
                      : "/dashboard"
                    : "/"
                }
                className="flex items-center"
              >
                <img src={logo} className="h-20 w-35 mt-1.5" alt="MMP Logo" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && handleDropdownHover(item.name)
                  }
                  onMouseLeave={() => item.hasDropdown && handleDropdownLeave()}
                >
                  <Link
                    to={item.href}
                    className={`relative px-4 py-2 rounded-lg font-medium text-[17px] group flex items-center gap-2 ${
                      item.active
                        ? "bg-gradient-to-r to-[#FE9C02] text-white shadow-lg shadow-orange-500/25"
                        : "text-slate-600 hover:text-orange-500 hover:bg-orange-50"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg
                        className={`w-4 h-4 ${
                          openDropdown === item.name ? "rotate-180" : ""
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
                    )}
                    {!item.active && !item.hasDropdown && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#FE9C02] scale-x-0 group-hover:scale-x-100 origin-left" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.hasDropdown && openDropdown === item.name && (
                    <div
                      className={`absolute top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-6 z-50 ${
                        item.dropdownType === "grid"
                          ? "w-[800px] left-1/2 transform -translate-x-1/2"
                          : "w-80 left-0"
                      }`}
                      onMouseEnter={handleDropdownContentHover}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {item.dropdownType === "grid" ? (
                        <div className="px-6 flex flex-col items-center">
                          <h3
                            className="text-xl md:text-2xl font-bold text-[#164058] mb-4 relative inline-block pb-2 
    after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 
    after:bg-gradient-to-r after:from-amber-400 after:to-orange-500 
    after:w-3/4 after:mx-auto text-center"
                          >
                            Our Solutions
                          </h3>
                          <div className="space-y-4">
                            {item.dropdownData.map((row, rowIndex) => (
                              <div
                                key={rowIndex}
                                className="grid grid-cols-2 gap-6"
                              >
                                {row.map((dropdownItem, colIndex) => (
                                  <Link
                                    key={`${rowIndex}-${colIndex}`}
                                    to={dropdownItem.href}
                                    className="flex items-start space-x-4 p-4 hover:bg-orange-50 rounded-lg group border border-transparent hover:border-[#FF9C00]"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    <span className="text-2xl mt-1">
                                      {dropdownItem.icon}
                                    </span>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-slate-800 group-hover:text-[#ff9c00] text-sm">
                                        {dropdownItem.title}
                                      </h4>
                                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                        {dropdownItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 px-4">
                          {item.dropdownData.map(
                            (dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownIndex}
                                to={dropdownItem.href}
                                className="flex items-start space-x-3 px-4 py-3 hover:bg-orange-50 rounded-lg group"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <span className="text-lg mt-0.5">
                                  {dropdownItem.icon}
                                </span>
                                <div>
                                  <h4 className="font-medium text-slate-800 group-hover:text-orange-600">
                                    {dropdownItem.title}
                                  </h4>
                                  <p className="text-sm text-slate-500 mt-1">
                                    {dropdownItem.description}
                                  </p>
                                </div>
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {!isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-slate-600 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <ProButton />
                </div>
              ) : (
                <div className="relative hidden md:block" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 group cursor-pointer "
                  >
                    <img
                      src={getAvatarUrl()}
                      alt={user?.name || "User"}
                      className="w-8 h-8 rounded-full ring-2 ring-orange-500/20 group-hover:ring-orange-500/40"
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-slate-700">
                        {user?.name}
                      </p>
                      <p className="text-xs text-orange-500 capitalize">
                        {user?.role}
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

                  {/* Profile Dropdown */}
                  <div
                    className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 ${
                      isProfileOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    <div className="px-4 py-3 border-b text-center border-gray-100 ">
                      <p className="font-medium text-slate-800 ">
                        {user?.name}
                      </p>
                      <p className="text-sm text-slate-500">{user?.email}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mt-1 capitalize">
                        {user?.role}
                      </span>
                    </div>

                    <div className="py-2 ">
                      {[
                        {
                          icon: "",
                          label: "My Profile",
                          href: `/${user?.role}/profile`,
                        },
                        {
                          icon: "",
                          label: "Settings",
                          href: `/${user?.role}/settings`,
                        },
                        {
                          icon: "",
                          label: "Analytics",
                          href: `/${user?.role}/analytics`,
                        },
                        {
                          icon: "",
                          label: "Billing",
                          href: `/${user?.role}/billing`,
                        },
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-600 hover:text-orange-500 hover:bg-orange-50"
                        >
                          <span className="text-base">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 py-2 ">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full cursor-pointer"
                      >
                        <span className="text-base">🚪</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-drawer"
                className="lg:hidden p-4 text-[#164057] hover:text-[#FF9C00] hover:bg-[#F7F7F7] rounded-lg"
              >
                <div className="w-5 h-5 relative">
                  <span
                    className={`absolute block w-full h-0.5 bg-current rounded-sm ${
                      isMenuOpen ? "top-2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute block w-full h-0.5 bg-current rounded-sm top-2 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute block w-full h-0.5 bg-current rounded-sm ${
                      isMenuOpen ? "top-2 -rotate-45" : "top-4"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer (fixed) */}
        <div
          id="mobile-drawer"
          className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto overscroll-contain ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 mt-8">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <img
                  src={getAvatarUrl()}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-slate-800">{user?.name}</p>
                  <p className="text-xs text-[#FF9C00] capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-[#FF9C00] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MMP</span>
                </div>
                <div>
                  <p className="font-medium text-slate-800">Guest User</p>
                  <p className="text-xs text-slate-500">Not signed in</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-[#FF9C00] rounded-full hover:bg-orange-50"
              aria-label="Close menu"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Drawer content: internal scroll only */}
          <div className="p-5 overflow-y-auto overscroll-contain h-full pb-24">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <div key={index}>
                  <div
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium cursor-pointer ${
                      item.active
                        ? "bg-gradient-to-r from-orange-500 to-[#FF9C00] text-white shadow-lg"
                        : "text-slate-600 hover:text-[#FF9C00] hover:bg-orange-50"
                    }`}
                    onClick={() => {
                      if (item.hasDropdown) {
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name
                        );
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    <Link
                      to={!item.hasDropdown ? item.href : "#"}
                      className="flex-1 flex items-center"
                      onClick={(e) => item.hasDropdown && e.preventDefault()}
                    >
                      <span className="ml-2">{item.name}</span>
                    </Link>

                    {item.hasDropdown ? (
                      <svg
                        className={`w-5 h-5 ${
                          openDropdown === item.name ? "rotate-180" : ""
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
                    ) : (
                      item.active && (
                        <svg
                          className="w-5 h-5 ml-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )
                    )}
                  </div>

                  {/* Mobile Dropdown */}
                  {item.hasDropdown && openDropdown === item.name && (
                    <div className="ml-4 mt-2 space-y-1">
                      {(item.dropdownType === "grid"
                        ? item.dropdownData.flat()
                        : item.dropdownData
                      ).map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setOpenDropdown(null);
                          }}
                          className="flex items-start px-3 py-2.5 rounded-lg hover:bg-orange-50 group"
                        >
                          <span className="text-sm mt-0.5 mr-3 flex-shrink-0 text-orange-500 group-hover:text-orange-600">
                            {dropdownItem.icon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {dropdownItem.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                              {dropdownItem.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Auth Section */}
            {!isAuthenticated ? (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign In
                  </Link>
                  {/* If needed, add Register button here */}
                </div>
              </div>
            ) : (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Account
                </h3>
                <div className="space-y-2">
                  <Link
                    to={`/${user?.role}/profile`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    My Profile
                  </Link>
                  <Link
                    to={`/${user?.role}/settings`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </Link>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Overlay (dim background) */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </nav>
    </>
  );
};

export default Header;
