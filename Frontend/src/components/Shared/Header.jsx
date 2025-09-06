import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import logo from "../../assets/componyLogos/logo.jpg";
import toast from "react-hot-toast";

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [hoverTimer, hideTimer]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      setIsMenuOpen(false);
      toast.success("Logout successful 👋", {
        position: "top-center",
      });
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
      });
      console.error("Logout error:", error);
    }
  };

  // Generate avatar URL if user doesn't have one
  const getAvatarUrl = () => {
    if (user?.profile?.avatar?.url) {
      return user.profile.avatar.url;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User"
    )}&background=FF9C00&color=ffffff&size=40`;
  };

  // Handle dropdown hover with delay
  const handleDropdownHover = (menuName) => {
    // Clear any existing timers
    if (hoverTimer) clearTimeout(hoverTimer);
    if (hideTimer) clearTimeout(hideTimer);

    // Set timer to show dropdown after 400ms
    const timer = setTimeout(() => {
      setOpenDropdown(menuName);
    }, 400);
    setHoverTimer(timer);
  };

  // Handle dropdown mouse leave with delay
  const handleDropdownLeave = () => {
    // Clear hover timer
    if (hoverTimer) clearTimeout(hoverTimer);

    // Set timer to hide dropdown after 500ms
    const timer = setTimeout(() => {
      setOpenDropdown(null);
    }, 500);
    setHideTimer(timer);
  };

  // Keep dropdown open when hovering over dropdown content
  const handleDropdownContentHover = () => {
    if (hideTimer) clearTimeout(hideTimer);
  };

  // Solutions dropdown data organized in grid (2 columns)
  const solutionsDropdownGrid = [
    [
      {
        icon: "👥",
        title: "US Consumer Leads",
        description: "More than 20 Million Leads",
        href: "/solutions/consumer-leads",
      },
      {
        icon: "💬",
        title: "Social Media Leads",
        description: "Millions of leads",
        href: "/solutions/social-media-leads",
      },
    ],
    [
      {
        icon: "🏢",
        title: "US Business Leads",
        description: "More than 14 million leads",
        href: "/solutions/business-leads",
      },
      {
        icon: "📱",
        title: "Bulk Phone Number Lookup",
        description: "Validate Phone Numbers in real time",
        href: "/solutions/phone-lookup",
      },
    ],
    [
      {
        icon: "🎯",
        title: "US Targeted Sales Lead List",
        description: "More than 5 million leads",
        href: "/solutions/targeted-leads",
      },
      {
        icon: "✉️",
        title: "Email List Verification",
        description: "Verify Emails and enrich your campaign",
        href: "/solutions/email-verification",
      },
    ],
    [
      {
        icon: "🔒",
        title: "US Exclusive Leads",
        description: "You are the only one receiving your leads",
        href: "/solutions/exclusive-leads",
      },
      {
        icon: "📝",
        title: "Sales Script Generator",
        description: "Create Email and Calling Scripts in a minute",
        href: "/solutions/script-generator",
      },
    ],
    [
      {
        icon: "🌍",
        title: "Global Lead Generation Services",
        description:
          "More than 5 million B2B and B2C leads from Canada, Australia, UK, Europe, and India",
        href: "/solutions/global-leads",
      },
      {
        icon: "📄",
        title: "Guest Posts Services",
        description:
          "Unleash the true potential of your website through the power of guest posts",
        href: "/solutions/guest-posts",
      },
    ],
  ];

  // Resources dropdown data
  const resourcesDropdownData = [
    {
      icon: "💡",
      title: "Help Center",
      description: "View leadscampus tutorials",
      href: "/resources/help-center",
    },
    {
      icon: "⭐",
      title: "Testimonials",
      description: "What our client's think",
      href: "/resources/testimonials",
    },
    {
      icon: "❓",
      title: "FAQ",
      description: "A list of common Q&As",
      href: "/resources/faq",
    },
    {
      icon: "📚",
      title: "Blog",
      description: "Latest articles from Leadscampus",
      href: "/resources/blog",
    },
    {
      icon: "🎥",
      title: "Demo",
      description: "View demo tutorial videos",
      href: "/resources/demo",
    },
  ];

  // Dynamic navigation items based on user role
  const getNavItems = () => {
    if (!isAuthenticated || !user) {
      return [
        {
          name: "Pricing",
          href: "/plans",
          active: location.pathname === "/plans",
        },
        {
          name: "Our Customers",
          href: "/our-customers",
          active: location.pathname === "/about",
        },
        {
          name: "Solutions",
          href: "/solutions",
          active: location.pathname === "/solutions",
          hasDropdown: true,
          dropdownType: "grid",
          dropdownData: solutionsDropdownGrid,
        },
        {
          name: "CRM Features",
          href: "/crm-features",
          active: location.pathname === "/crm-features",
        },
        {
          name: "Contact",
          href: "/contact",
          active: location.pathname === "/contact",
        },
        {
          name: "Resources",
          href: "/resources",
          active: location.pathname === "/resources",
          hasDropdown: true,
          dropdownType: "list",
          dropdownData: resourcesDropdownData,
        },
      ];
    }

    const baseItems = [];

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
            href: "/broker/dashboard",
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

  // Show loading state
  if (loading) {
    return (
      <>
        {/* Top Offer Bar - Loading State */}
        <div className="bg-[#FF9C00] text-white text-sm sm:text-base">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2">
              <div className="animate-pulse h-4 bg-[#FF9C00] rounded w-48"></div>
              <div className="animate-pulse h-6 bg-[#FF9C00] rounded w-20"></div>
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
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      {/* Custom Styles for animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-slide-in-right {
          animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Top Offer Bar */}
      <div className="bg-[#FF9C00] text-white text-sm sm:text-base fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4">
          <div className="flex items-center justify-center sm:justify-center gap-4 py-2">
            <p className="font-medium">
              🏡 Leads Discount <span className="font-bold">20% OFF</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="bg-white text-[#164058] font-semibold px-2 py-1 rounded-md text-xs sm:text-sm">
                LEADS20
              </span>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText("LEADS20");
                   toast.success("Coupon code copied: LEADS20", {
                   position: "top-center",
                   });

                  } catch {
                    toast.error("Failed to copy", { position: "top-center" });
                  }
                }}
                className="underline text-xs sm:text-sm hover:opacity-90 cursor-pointer"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F7F7F7] backdrop-blur-md shadow-lg shadow-orange-500/5"
            : "bg-gradient-to-r from-[#F7F7F7] to-[#F7F7F7]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 lg:h-20.5">
            {/* Logo Section */}
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
                    className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group flex items-center gap-1 ${
                      item.active
                        ? "bg-gradient-to-r to-[#FE9C02] text-white shadow-lg shadow-orange-500/25"
                        : "text-slate-600 hover:text-orange-500 hover:bg-orange-50"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
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
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#FE9C02] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    )}
                  </Link>

                  {/* Dropdown Menu */}

                  {item.hasDropdown && openDropdown === item.name && (
                    <div
                      className={`absolute top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-6 animate-slide-down z-50 ${
                        item.dropdownType === "grid"
                          ? "w-[800px] left-1/2 transform -translate-x-1/2" 
                          : "w-80 left-0" 
                      }`}
                      onMouseEnter={handleDropdownContentHover}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {item.dropdownType === "grid" ? (
                        // Grid Layout for Solutions (Already centered)
                        <div className="px-6">
                          <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
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
                                    className="flex items-start space-x-4 p-4 hover:bg-orange-50 rounded-lg transition-all duration-200 group border border-transparent hover:border-orange-200"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    <span className="text-2xl mt-1 group-hover:scale-110 transition-transform duration-200">
                                      {dropdownItem.icon}
                                    </span>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors duration-200 text-sm">
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
                        // List Layout for Resources (remains left-aligned)
                        <div className="space-y-2 px-4">
                          {item.dropdownData.map(
                            (dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownIndex}
                                to={dropdownItem.href}
                                className="flex items-start space-x-3 px-4 py-3 hover:bg-orange-50 rounded-lg transition-colors duration-200 group"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform duration-200">
                                  {dropdownItem.icon}
                                </span>
                                <div>
                                  <h4 className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors duration-200">
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
              {/* Authentication Section */}
              {!isAuthenticated ? (
                // Guest Navigation
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-slate-600 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-[#FE9C02] to-[#FE9C02] text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-[#164058] hover:to-[#164058] transition-all duration-300 shadow-lg shadow-orange-500/25"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                // Authenticated User Profile
                <div className="relative hidden md:block" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 group cursor-pointer "
                  >
                    <img
                      src={getAvatarUrl()}
                      alt={user?.name || "User"}
                      className="w-8 h-8 rounded-full ring-2 ring-orange-500/20 group-hover:ring-orange-500/40 transition-all duration-300"
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
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
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

                  {/* Profile Dropdown Menu */}
                  <div
                    className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-300  ${
                      isProfileOpen
                        ? "opacity-100 visible translate-y-0 animate-slide-down"
                        : "opacity-0 invisible translate-y-2"
                    }`}
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b text-center border-gray-100 ">
                      <p className="font-medium text-slate-800 ">
                        {user?.name}
                      </p>
                      <p className="text-sm text-slate-500">{user?.email}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mt-1 capitalize">
                        {user?.role}
                      </span>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2 ">
                      {[
                        {
                          icon: "👤",
                          label: "My Profile",
                          href: `/${user?.role}/profile`,
                        },
                        {
                          icon: "⚙️",
                          label: "Settings",
                          href: `/${user?.role}/settings`,
                        },
                        {
                          icon: "📊",
                          label: "Analytics",
                          href: `/${user?.role}/analytics`,
                        },
                        {
                          icon: "💳",
                          label: "Billing",
                          href: `/${user?.role}/billing`,
                        },
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
                        >
                          <span className="text-base">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 py-2 ">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full transition-all duration-200 cursor-pointer"
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
                className="lg:hidden p-2 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-300"
              >
                <div className="w-5 h-5 relative">
                  <span
                    className={`absolute block w-full h-0.5 bg-current rounded-sm transition-all duration-300 ${
                      isMenuOpen ? "top-2 rotate-45" : "top-0"
                    }`}
                  ></span>
                  <span
                    className={`absolute block w-full h-0.5 bg-current rounded-sm transition-all duration-300 top-2 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`absolute block w-full h-0.5 bg-current rounded-sm transition-all duration-300 ${
                      isMenuOpen ? "top-2 -rotate-45" : "top-4"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
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
                  <p className="text-xs text-orange-500 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
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
              className="p-2 text-slate-400 hover:text-orange-500 rounded-full hover:bg-orange-50 transition-colors duration-200"
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

          {/* Navigation Items */}
          <div className="p-5 overflow-y-auto h-full pb-24">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <div key={index}>
                  <div
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                      item.active
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                        : "text-slate-600 hover:text-orange-500 hover:bg-orange-50"
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
                        className={`w-5 h-5 transition-transform duration-200 ${
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
                      {item.dropdownType === "grid"
                        ? // Flatten grid for mobile
                          item.dropdownData
                            .flat()
                            .map((dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownIndex}
                                to={dropdownItem.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                              >
                                <span className="text-sm">
                                  {dropdownItem.icon}
                                </span>
                                <div>
                                  <p className="text-sm font-medium text-slate-700">
                                    {dropdownItem.title}
                                  </p>
                                  <p className="text-xs text-slate-500 truncate">
                                    {dropdownItem.description}
                                  </p>
                                </div>
                              </Link>
                            ))
                        : item.dropdownData.map(
                            (dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownIndex}
                                to={dropdownItem.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                              >
                                <span className="text-sm">
                                  {dropdownItem.icon}
                                </span>
                                <div>
                                  <p className="text-sm font-medium text-slate-700">
                                    {dropdownItem.title}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {dropdownItem.description}
                                  </p>
                                </div>
                              </Link>
                            )
                          )}
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
                    className="flex items-center px-4 py-3 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all duration-200"
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
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow-lg"
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
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    Get Started
                  </Link>
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
                    className="flex items-center px-4 py-3 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all duration-200"
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
                    className="flex items-center px-4 py-3 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all duration-200"
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
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
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

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </nav>
    </>
  );
};

export default Header;
