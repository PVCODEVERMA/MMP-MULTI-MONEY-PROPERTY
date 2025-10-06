import React, { useState } from "react";
import {
  ChevronDownIcon,
  MapPinIcon,
  XMarkIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const LocationSelector = ({
  selectedLocation,
  onLocationChange,
  onClear,
  placeholder = "Select Location..",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const locations = {
    trending: [
      { name: "Delhi NCR" },
      { name: "Noida" },
      { name: "Gurgaon" },
      { name: "Mumbai" },
      { name: "Dubai" },
    ],
    popular: [
      { name: "Delhi", state: "Delhi", properties: "20,000+" },
      { name: "Bangalore", state: "Karnataka", properties: "18,000+" },
      { name: "Hyderabad", state: "Telangana", properties: "12,500+" },
    ],
  };

  const handleSelect = (loc) => {
    onLocationChange(loc.name || loc);
    setIsOpen(false);
    setSearchQuery("");
  };

  const filteredTrending = locations.trending.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredPopular = locations.popular.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className={`w-full pl-10 pr-10 py-2.5 rounded-full bg-white text-left text-gray-700 text-sm sm:text-base cursor-pointer border 
          ${selectedLocation || isOpen ? "border-orange-500" : "border-gray-300"}`}
      >
        <MapPinIcon className="absolute left-4 top-2.5 w-5 h-5 text-orange-500" />
        <span className={selectedLocation ? "text-gray-800" : "text-gray-500"}>
          {selectedLocation || placeholder}
        </span>
        {selectedLocation && (
          <XMarkIcon
            onClick={(e) => {
              e.stopPropagation();
              onClear?.();
            }}
            className="absolute right-10 top-3.5 w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer"
          />
        )}
        <ChevronDownIcon className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-transparent z-40"
              onClick={() => setIsOpen(false)}
            />
            {/* Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl mt-2 shadow-2xl max-h-96 overflow-y-auto no-scrollbar"
            >
              <div className="p-3">
                {/* Search Box */}
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city..."
                  className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 cursor-pointer"
                />

                {/* Trending */}
                {filteredTrending.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 px-2 font-medium">
                       Trending Locations
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {filteredTrending.map((t) => (
                        <button
                          key={t.name}
                          onClick={() => handleSelect(t)}
                          className="flex items-center justify-between text-sm px-3 py-2 rounded-lg bg-gray-50 hover:bg-orange-100 cursor-pointer"
                        >
                          <span>{t.name}</span>
                          <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular */}
                {filteredPopular.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2 px-2 font-medium">
                       Popular Cities
                    </p>
                    {filteredPopular.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => handleSelect(c)}
                        className="w-full text-left px-3 py-3 rounded-lg hover:bg-orange-50 cursor-pointer"
                      >
                        <div className="font-medium text-gray-800">{c.name}</div>
                        <div className="text-sm text-gray-500">
                          {c.state} • {c.properties}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationSelector;
