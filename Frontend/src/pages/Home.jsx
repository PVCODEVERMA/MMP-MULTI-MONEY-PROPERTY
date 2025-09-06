import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  GiftIcon,
  ChevronDownIcon,
  FunnelIcon,
  BuildingOfficeIcon,
  HomeModernIcon,
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import LocationSelector from "../components/locationSelector/LocationSelector.jsx";
import PropertyDetailsModal from "../components/propertyDetailsModal/PropertyDetailsModal.jsx";
import ActionButtons from "../components/actionButtons/ActionButtons.jsx";
import BlurText from "../shadcnComponent/BlurText.jsx";
import ExclusiveOwnerProperties from "../components/propertyDetailsModal/ExclusiveOwnerProperties.jsx";
import MainContentSection from "../components/contentHomeSection/MainContentSection.jsx";

const Home = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [activeTab, setActiveTab] = useState("Buy");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    budget: "",
    searchQuery: "",
    bhk: "",
    area: "",
    possession: "",
    postedBy: "",
    propertyAge: "",
    date: "",
    time: "",
  });

  // Modal States
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);

  // Lock body scroll when modals are open
  useEffect(() => {
    const shouldLock = showAdvancedFilters || isPropertyModalOpen;
    if (shouldLock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showAdvancedFilters, isPropertyModalOpen]);

  // Property types with icons
  const propertyTypes = [
    { id: "apartment", name: "Apartment", icon: "🏢", count: "50,000+" },
    { id: "villa", name: "Villa", icon: "🏡", count: "12,000+" },
    { id: "plot", name: "Plot", icon: "🌿", count: "8,000+" },
    { id: "office", name: "Office", icon: "🏢", count: "5,000+" },
    { id: "shop", name: "Shop", icon: "🏪", count: "3,000+" },
    { id: "warehouse", name: "Warehouse", icon: "🏭", count: "2,000+" },
  ];

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  const handleSearch = () => {
    console.log("Search Data:", searchData);
    navigate("/subscription-plans", {
      state: {
        searchQuery: searchData.searchQuery || searchData.location,
        searchType: activeTab.toLowerCase(),
        filters: searchData,
        fromSearch: true,
      },
    });
  };

  const handleGetStarted = () => {
    navigate("/get-started");
  };

  const handleBookDemo = () => {
    navigate("/book-demo");
  };

  const clearSearch = () => {
    setSearchData({
      location: "",
      propertyType: "",
      budget: "",
      searchQuery: "",
      bhk: "",
      area: "",
      possession: "",
      postedBy: "",
      propertyAge: "",
      date: "",
      time: "",
    });
  };

  // Get current date and time for default values
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().slice(0, 5);
    return { date, time };
  };

  useEffect(() => {
    const { date, time } = getCurrentDateTime();
    setSearchData((prev) => ({
      ...prev,
      date: prev.date || date,
      time: prev.time || time,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Enhanced Header Section */}
      <div className="bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Title Section */}
          <div className="text-center pt-12 sm:pt-16 pb-6 sm:pb-8 relative">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl mt-8 sm:mt-14 sm:ml-30 font-bold text-center">
              <div className="text-center">
                <BlurText
                  text="Get Fresh Buyer Inquiries, Straight to Your Dashboard."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold"
                  style={{ color: "#FF9C00" }}
                />
              </div>
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto mt-5 sm:mt-8 leading-relaxed text-gray-600 px-4">
              MMP helps brokers & builders in Delhi NCR close more deals with{" "}
              <span className="font-bold">
                location-based leads, property listings, and full transparency.
              </span>
            </p>

            {/* Hero Action Buttons */}
            <div className="mt-6 sm:mt-8 flex justify-center px-4">
              <ActionButtons
                primaryText="Get Started Today"
                onPrimaryClick={handleGetStarted}
                size="medium"
              />
            </div>
          </div>

          {/* Enhanced Search Bar - Mobile First */}
          <div className="pb-6 sm:pb-8">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              className="max-w-7xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
                {/* Search Form - Stack on Mobile, Row on Desktop */}
                <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 items-stretch">
                  {/* Location Selector */}
                  <div className="w-full lg:flex-1">
                    <LocationSelector
                      selectedLocation={searchData.location}
                      onLocationChange={(location) =>
                        setSearchData({ ...searchData, location })
                      }
                      placeholder="location.."
                    />
                  </div>

                  {/* Property Type Selector */}
                  <div className="w-full lg:w-48 relative cursor-pointer">
                    <HomeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500 z-10 pointer-events-none" />
                    <select
                      className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl appearance-none bg-white text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[44px] cursor-pointer"
                      value={searchData.propertyType}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          propertyType: e.target.value,
                        })
                      }
                    >
                      <option value="">Property Type</option>
                      <option value="1-bhk">1 BHK</option>
                      <option value="2-bhk">2 BHK</option>
                      <option value="3-bhk">3 BHK</option>
                      <option value="4-bhk">4+ BHK</option>
                      <option value="villa">Villa</option>
                      <option value="plot">Plot</option>
                      <option value="commercial">Commercial</option>
                      <option value="office">Office Space</option>
                      <option value="shop">Shop/Retail</option>
                      <option value="warehouse">Warehouse</option>
                    </select>
                    <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Budget Selector */}
                  <div className="w-full lg:w-48 relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg font-bold text-orange-500 z-10">
                      ₹
                    </span>
                    <select
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl appearance-none bg-white text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[44px] cursor-pointer"
                      value={searchData.budget}
                      onChange={(e) =>
                        setSearchData({ ...searchData, budget: e.target.value })
                      }
                    >
                      <option value="">Budget</option>
                      <option value="0-25">Under 25 Lakhs</option>
                      <option value="25-50">25-50 Lakhs</option>
                      <option value="50-75">50-75 Lakhs</option>
                      <option value="75-100">75L-1 Crore</option>
                      <option value="100-200">1-2 Crores</option>
                      <option value="200-500">2-5 Crores</option>
                      <option value="500+">5+ Crores</option>
                    </select>
                    <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Date Input */}
                  <div className="w-full lg:w-48 relative">
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 text-base min-h-[44px] cursor-pointer"
                      value={searchData.date}
                      onChange={(e) =>
                        setSearchData({ ...searchData, date: e.target.value })
                      }
                    />
                    <CalendarDaysIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500 z-10 pointer-events-none" />
                  </div>

                  {/* Search Input - Only Search Icon */}
                  <div className="w-full lg:w-64 relative">
                    <input
                      type="text"
                      placeholder="Search Properties Leads.."
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 text-base min-h-[44px]"
                      value={searchData.searchQuery || ""}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          searchQuery: e.target.value,
                        })
                      }
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <MagnifyingGlassIcon
                      onClick={handleSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white bg-[#FF9C00] p-1.5 rounded-md cursor-pointer hover:bg-[#164058] transition"
                    />
                  </div>

                  {/* Search & Filter Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 lg:gap-0 w-full lg:w-auto">
                    {/* Filters Button */}
                    <div className="w-full sm:flex-1 lg:w-auto">
                      <button
                        onClick={() => setShowAdvancedFilters(true)}
                        className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-600 hover:border-[#144157] hover:text-white transition-colors focus:outline-none hover:bg-[#144157] focus:ring-2 focus:ring-white min-h-[44px] cursor-pointer"
                      >
                        <FunnelIcon className="w-5 h-5" />
                        <span>Filters</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Advanced Filters (Hidden on Mobile) */}
                <AnimatePresence>
                  {showAdvancedFilters && (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduceMotion ? false : { opacity: 0, height: 0 }}
                      className="hidden md:block mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {/* BHK Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            BHK Type
                          </label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px] cursor-pointer"
                            value={searchData.bhk}
                            onChange={(e) =>
                              setSearchData({
                                ...searchData,
                                bhk: e.target.value,
                              })
                            }
                          >
                            <option value="">Any BHK</option>
                            <option value="1">1 BHK</option>
                            <option value="2">2 BHK</option>
                            <option value="3">3 BHK</option>
                            <option value="4">4 BHK</option>
                            <option value="4+">4+ BHK</option>
                          </select>
                        </div>

                        {/* Area Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Area (sq.ft)
                          </label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px] cursor-pointer"
                            value={searchData.area}
                            onChange={(e) =>
                              setSearchData({
                                ...searchData,
                                area: e.target.value,
                              })
                            }
                          >
                            <option value="">Any Area</option>
                            <option value="0-500">0-500 sq.ft</option>
                            <option value="500-1000">500-1000 sq.ft</option>
                            <option value="1000-1500">1000-1500 sq.ft</option>
                            <option value="1500-2000">1500-2000 sq.ft</option>
                            <option value="2000+">2000+ sq.ft</option>
                          </select>
                        </div>

                        {/* Possession Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Possession
                          </label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px] cursor-pointer"
                            value={searchData.possession}
                            onChange={(e) =>
                              setSearchData({
                                ...searchData,
                                possession: e.target.value,
                              })
                            }
                          >
                            <option value="">Any</option>
                            <option value="ready">Ready to Move</option>
                            <option value="construction">
                              Under Construction
                            </option>
                            <option value="upcoming">Upcoming</option>
                          </select>
                        </div>

                        {/* Posted By Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Posted By
                          </label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px] cursor-pointer"
                            value={searchData.postedBy}
                            onChange={(e) =>
                              setSearchData({
                                ...searchData,
                                postedBy: e.target.value,
                              })
                            }
                          >
                            <option value="">Anyone</option>
                            <option value="owner">Owner</option>
                            <option value="broker">Broker</option>
                            <option value="user">User</option>
                          </select>
                        </div>

                        {/* Property Age Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Property Age
                          </label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px] cursor-pointer"
                            value={searchData.propertyAge}
                            onChange={(e) =>
                              setSearchData({
                                ...searchData,
                                propertyAge: e.target.value,
                              })
                            }
                          >
                            <option value="">Any Age</option>
                            <option value="0-1">0-1 years</option>
                            <option value="1-5">1-5 years</option>
                            <option value="5-10">5-10 years</option>
                            <option value="10+">10+ years</option>
                          </select>
                        </div>

                        {/* Apply Filters Button */}
                        <div className="flex items-end">
                          <button
                            onClick={() => {
                              handleSearch();
                              setShowAdvancedFilters(false);
                            }}
                            className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px] cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setShowAdvancedFilters(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Bottom Sheet */}
            <motion.div
              className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white rounded-t-2xl p-4 shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: reduceMotion ? false : "spring",
                stiffness: 260,
                damping: 28,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Date & Time Fields in Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px]"
                    value={searchData.date}
                    onChange={(e) =>
                      setSearchData({ ...searchData, date: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px]"
                    value={searchData.time}
                    onChange={(e) =>
                      setSearchData({ ...searchData, time: e.target.value })
                    }
                  />
                </div>

                {/* BHK Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BHK Type
                  </label>
                  <select
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px]"
                    value={searchData.bhk}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        bhk: e.target.value,
                      })
                    }
                  >
                    <option value="">Any BHK</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="4+">4+ BHK</option>
                  </select>
                </div>

                {/* Area Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (sq.ft)
                  </label>
                  <select
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px]"
                    value={searchData.area}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        area: e.target.value,
                      })
                    }
                  >
                    <option value="">Any Area</option>
                    <option value="0-500">0-500 sq.ft</option>
                    <option value="500-1000">500-1000 sq.ft</option>
                    <option value="1000-1500">1000-1500 sq.ft</option>
                    <option value="1500-2000">1500-2000 sq.ft</option>
                    <option value="2000+">2000+ sq.ft</option>
                  </select>
                </div>

                {/* Possession Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Possession
                  </label>
                  <select
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px]"
                    value={searchData.possession}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        possession: e.target.value,
                      })
                    }
                  >
                    <option value="">Any</option>
                    <option value="ready">Ready to Move</option>
                    <option value="construction">Under Construction</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>

                {/* Posted By Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posted By
                  </label>
                  <select
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px]"
                    value={searchData.postedBy}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        postedBy: e.target.value,
                      })
                    }
                  >
                    <option value="">Anyone</option>
                    <option value="owner">Owner</option>
                    <option value="broker">Broker</option>
                    <option value="user">User</option>
                  </select>
                </div>

                {/* Property Age Filter */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Age
                  </label>
                  <select
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px]"
                    value={searchData.propertyAge}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        propertyAge: e.target.value,
                      })
                    }
                  >
                    <option value="">Any Age</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-5">1-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    clearSearch();
                    setShowAdvancedFilters(false);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px] font-medium"
                >
                  Clear All
                </button>
                <button
                  onClick={() => {
                    handleSearch();
                    setShowAdvancedFilters(false);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px] font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Property Types Quick Access */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-4 mb-6 sm:mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              Browse by Property Type
            </h3>
            <div className="hidden sm:block">
              <ActionButtons
                primaryText="Get Started"
                secondaryText="Book Demo"
                onPrimaryClick={handleGetStarted}
                onSecondaryClick={handleBookDemo}
                size="small"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {propertyTypes.map((type, index) => (
              <motion.button
                key={type.id}
                whileHover={reduceMotion ? {} : { scale: 1.05 }}
                whileTap={reduceMotion ? {} : { scale: 0.95 }}
                className="p-3 sm:p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-md transition-all text-center group focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[80px] sm:min-h-[100px] cursor-pointer"
                onClick={() =>
                  navigate("/subscription-plans", {
                    state: { propertyType: type.id },
                  })
                }
              >
                <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">
                  {type.icon}
                </div>
                <div className="font-medium text-gray-700 group-hover:text-orange-600 text-xs sm:text-sm">
                  {type.name}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                  {type.count}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-4 sm:hidden">
            <ActionButtons
              primaryText="Get Started"
              secondaryText="Book Demo"
              onPrimaryClick={handleGetStarted}
              onSecondaryClick={handleBookDemo}
              size="small"
            />
          </div>
        </div>
      </div>

      <ExclusiveOwnerProperties
        handleGetStarted={handleGetStarted}
        handleBookDemo={handleBookDemo}
        reduceMotion={reduceMotion}
      />
       {/* Main Content Section - Enhanced Cards + Sidebar */}
      <MainContentSection
        handleGetStarted={handleGetStarted}
        handleBookDemo={handleBookDemo}
      />

      {/* Property Details Modal */}
      <PropertyDetailsModal
        isOpen={isPropertyModalOpen}
        onClose={() => setIsPropertyModalOpen(false)}
        property={selectedProperty}
      />
    </div>
  );
};

export default Home;
