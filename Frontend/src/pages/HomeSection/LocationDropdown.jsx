import React, { useState } from "react";
import { ArrowTrendingUpIcon, ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline";

const trendingLocations = [
  { value: "dubai", label: "Dubai" },
  { value: "mumbai", label: "Mumbai" },
  { value: "new-delhi-ncr", label: "Delhi NCR" },
  { value: "noida", label: "Noida" },
];

const allLocations = [
  { value: "new-delhi", label: "New Delhi" },
  { value: "gurgaon", label: "Gurgaon" },
  { value: "faridabad", label: "Faridabad" },
  { value: "greater-noida", label: "Greater Noida" },
];

const LocationDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Selected Button */}
      <button
        type="button"
        className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9C00] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-2 text-gray-700">
          <MapPinIcon className="h-5 w-5 text-gray-500" />
          {value
            ? [...trendingLocations, ...allLocations].find((loc) => loc.value === value)?.label
            : "Select Location"}
        </span>
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
          {/* Trending */}
          <div className="px-3 py-2 text-xs font-semibold text-[#164058]">Trending</div>
          {trendingLocations.map((loc) => (
            <div
              key={loc.value}
              className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                value === loc.value ? "bg-orange-50 text-[#FF9C00]" : "text-gray-700"
              }`}
              onClick={() => handleSelect(loc.value)}
            >
              <span>{loc.label}</span>
              <ArrowTrendingUpIcon className="h-5 w-5 text-[#FF9C00]" />
            </div>
          ))}

          {/* All */}
          <div className="px-3 py-2 text-xs font-semibold text-[#164058]">All Locations</div>
          {allLocations.map((loc) => (
            <div
              key={loc.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                value === loc.value ? "bg-orange-50 text-[#FF9C00]" : "text-gray-700"
              }`}
              onClick={() => handleSelect(loc.value)}
            >
              {loc.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
