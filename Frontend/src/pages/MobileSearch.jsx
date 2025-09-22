import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
  ArrowLeftIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import LocationSelector from "../components/locationSelector/LocationSelector.jsx";
import TrendingInCards from "../components/propertyCards/TrendingInCards.jsx";
import FAQSection from "./FAQSection.jsx";
import PropertyTypesSection from "../components/propertyCards/PropertyTypesSection.jsx";

export default function MobileSearch() {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const initial = state?.initial || {};

  const [openFilters, setOpenFilters] = useState(false);
  const [data, setData] = useState({
    location: initial.location || "",
    propertyType: initial.propertyType || "",
    budget: initial.budget || "",
    searchQuery: initial.searchQuery || "",
    bhk: initial.bhk || "",
    area: initial.area || "",
    possession: initial.possession || "",
    postedBy: initial.postedBy || "",
    propertyAge: initial.propertyAge || "",
    month: initial.month || "",
  });

  useEffect(() => {
    if (!data.month) {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      setData((s) => ({ ...s, month: `${yyyy}-${mm}` }));
    }
  }, []);

  const goSearch = () => {
    navigate("/advanced-search", {
      state: {
        searchQuery: data.searchQuery || data.location,
        searchType: "buy",
        filters: data,
        fromSearch: true,
      },
    });
  };

  const clearAll = () =>
    setData({
      location: "",
      propertyType: "",
      budget: "",
      searchQuery: "",
      bhk: "",
      area: "",
      possession: "",
      postedBy: "",
      propertyAge: "",
      month: "",
    });

  // const handleGetStarted = () => navigate("/get-started");
  const handleBookDemo = () => navigate("/book-demo");

  return (
    <main className="min-h-screen  bg-[#F9FAFB] sm:hidden">
      {/* Header */}
      <header className="sticky top-32 z-10  bg-[#F7F7F7]">
        <div className=" px-2 py-2 flex items-center ml-6 ">
          <span onClick={() => navigate(-1)}>Home</span>
          <button
            onClick={() => navigate(-1)}
            className=" hover:bg-[#FF9C00] hover:border-[#FF9C00] transition-colors duration-200 cursor-pointer"
            aria-label="Back"
          >
            
           <div className="text-[#FF9C00]">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
           </div>
          </button>
           
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-4  space-y-4 mt-14">
        {/* Location Selector */}
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <LocationSelector
            selectedLocation={data.location}
            onLocationChange={(location) => setData({ ...data, location })}
            placeholder="Search city, locality, leads"
            autoFocus
          />

          {/* Search Input */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search Properties Leads..."
              className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9C00] text-gray-700 placeholder-gray-400"
              value={data.searchQuery}
              onChange={(e) =>
                setData({ ...data, searchQuery: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && goSearch()}
            />
            <button
              type="button"
              onClick={goSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF9C00] text-white p-2 rounded-lg shadow hover:bg-[#164058] transition-all duration-200"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Filters toggle */}
          <div className="flex justify-between gap-3 mt-4">
            <button
              onClick={handleBookDemo}
              className="relative group font-bold text-white bg-gradient-to-r from-[#164058] to-[#2D5F7E]  rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-amber-500 hover:text-white flex-1"
            >
              {/* Animated background */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF9C00] to-[#FFB74D] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              
              {/* Text */}
              <span className="relative z-10 flex items-center justify-center">
                Book a Demo
              </span>
            </button>

            <button
              type="button"
              onClick={() => setOpenFilters((v) => !v)}
              className="inline-flex items-center gap-2 text-[#164058] px-4 py-3 rounded-xl border border-gray-200 hover:border-[#FF9C00] bg-white transition-all duration-200 hover:shadow-sm"
              aria-expanded={openFilters}
              aria-controls="filters-panel"
            >
              <FunnelIcon className="w-5 h-5" />
              <span className="font-medium">
                {openFilters ? "Hide filters" : "Show filters"}
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible Filters */}
        <div
          id="filters-panel"
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            openFilters
              ? "max-h-[2000px] opacity-100 mt-3"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 space-y-4">
            {/* Month & Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month & Year
              </label>
              <div className="relative">
                <input
                  type="month"
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent"
                  value={data.month}
                  onChange={(e) => setData({ ...data, month: e.target.value })}
                />
                <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF9C00]" />
              </div>
            </div>

            {/* Property Type */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <HomeIcon className="absolute left-3 top-8 translate-y-1/2 w-5 h-5 text-[#FF9C00]" />
              <select
                className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent appearance-none"
                value={data.propertyType}
                onChange={(e) =>
                  setData({ ...data, propertyType: e.target.value })
                }
              >
                <option value="">Select Property Type</option>
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
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Budget */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <span className="absolute left-3  translate-y-1/2 font-bold text-[#FF9C00]">
                ₹
              </span>
              <select
                className="w-full pl-8 pr-8 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent appearance-none"
                value={data.budget}
                onChange={(e) => setData({ ...data, budget: e.target.value })}
              >
                <option value="">Select Budget Range</option>
                <option value="0-25">Under 25 Lakhs</option>
                <option value="25-50">25-50 Lakhs</option>
                <option value="50-75">50-75 Lakhs</option>
                <option value="75-100">75L-1 Crore</option>
                <option value="100-200">1-2 Crores</option>
                <option value="200-500">2-5 Crores</option>
                <option value="500+">5+ Crores</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Grid Filters */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Filters
                </label>
              </div>
              
              <div className="relative">
                <select
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent appearance-none"
                  value={data.bhk}
                  onChange={(e) => setData({ ...data, bhk: e.target.value })}
                >
                  <option value="">Any BHK</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="4+">4+ BHK</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent appearance-none"
                  value={data.area}
                  onChange={(e) => setData({ ...data, area: e.target.value })}
                >
                  <option value="">Any Area</option>
                  <option value="0-500">0-500 sq.ft</option>
                  <option value="500-1000">500-1000 sq.ft</option>
                  <option value="1000-1500">1000-1500 sq.ft</option>
                  <option value="1500-2000">1500-2000 sq.ft</option>
                  <option value="2000+">2000+ sq.ft</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent appearance-none"
                  value={data.possession}
                  onChange={(e) =>
                    setData({ ...data, possession: e.target.value })
                  }
                >
                  <option value="">Status....</option>
                  <option value="ready">Ready to Move</option>
                  <option value="construction">Under Construction</option>
                  <option value="upcoming">Upcoming</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent appearance-none"
                  value={data.postedBy}
                  onChange={(e) => setData({ ...data, postedBy: e.target.value })}
                >
                  <option value="">Posted By</option>
                  <option value="user">User</option>
                  <option value="builder">Builder</option>
                  <option value="broker">Broker</option>
                  
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <div className="relative col-span-2">
                <select
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent appearance-none"
                  value={data.propertyAge}
                  onChange={(e) =>
                    setData({ ...data, propertyAge: e.target.value })
                  }
                >
                  <option value="">Property Age</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-5">1-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={clearAll}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <XMarkIcon className="w-5 h-5" />
                Clear All
              </button>
              <button
                onClick={goSearch}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#FF9C00] to-[#FFB74D] text-white font-semibold hover:shadow-md transition-all duration-200"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Types Section */}
      <PropertyTypesSection />
      <TrendingInCards />
      <FAQSection />
    </main>
  );
}