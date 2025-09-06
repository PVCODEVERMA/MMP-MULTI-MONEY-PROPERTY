import React, { useState } from "react";
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const LocationSelector = ({
  selectedLocation,
  onLocationChange,
  placeholder = "Select Location",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const locations = {
    popular: [
      { name: "Mumbai", state: "Maharashtra", properties: "25,000+" },
      { name: "Delhi", state: "Delhi", properties: "20,000+" },
      { name: "Bangalore", state: "Karnataka", properties: "18,000+" },
      { name: "Hyderabad", state: "Telangana", properties: "12,500+" },
      { name: "Chennai", state: "Tamil Nadu", properties: "10,000+" },
      { name: "Pune", state: "Maharashtra", properties: "15,000+" },
      { name: "Gurgaon", state: "Haryana", properties: "12,000+" },
      { name: "Noida", state: "Uttar Pradesh", properties: "8,500+" },
    ],
    states: [
      {
        name: "Maharashtra",
        cities: ["Mumbai", "Pune", "Nashik", "Nagpur", "Aurangabad"],
      },
      {
        name: "Karnataka",
        cities: ["Bangalore", "Mysore", "Hubli", "Mangalore"],
      },
      {
        name: "Haryana",
        cities: ["Gurgaon", "Faridabad", "Panipat", "Rohtak"],
      },
      {
        name: "Uttar Pradesh",
        cities: ["Noida", "Lucknow", "Kanpur", "Agra", "Varanasi"],
      },
    ],
  };

  const handleLocationSelect = (location) => {
    onLocationChange(location.name || location);
    setIsOpen(false);
    setSearchQuery("");
  };

  // Filter locations based on search
  const filteredPopular = locations.popular.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredStates = locations.states.map((state) => ({
    ...state,
    cities: state.cities.filter((city) =>
      city.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl bg-white text-left text-gray-700 text-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
      >
        <MapPinIcon className="absolute left-4 top-4 w-5 h-5 text-orange-500" />
        <span className={selectedLocation ? "text-gray-800" : "text-gray-500"}>
          {selectedLocation || placeholder}
        </span>
        <ChevronDownIcon className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-40 w-full bg-white border border-gray-200 rounded-xl mt-2 shadow-2xl max-h-96 overflow-y-auto"
            >
              <div className="p-3">
                {/* Search Input */}
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Search city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Popular Cities */}
                {filteredPopular.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 px-2 font-medium">
                      Popular Cities
                    </p>
                    {filteredPopular.map((location, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left px-3 py-3 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                        onClick={() => handleLocationSelect(location)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">
                              {location.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {location.state} • {location.properties}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* States & Cities */}
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-500 mb-2 px-2 font-medium">
                    Browse by State
                  </p>
                  {filteredStates.map(
                    (state, idx) =>
                      state.cities.length > 0 && (
                        <div key={idx} className="mb-3">
                          <div className="font-medium text-gray-700 px-3 py-1 text-sm">
                            {state.name}
                          </div>
                          <div className="grid grid-cols-2 gap-1 px-3">
                            {state.cities.map((city, cityIdx) => (
                              <button
                                key={cityIdx}
                                onClick={() => handleLocationSelect(city)}
                                className="text-xs bg-gray-50 hover:bg-orange-100 text-gray-600 hover:text-orange-600 px-2 py-1 rounded transition-colors text-left cursor-pointer"
                              >
                                {city}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                  )}
                </div>

                {/* If nothing matches */}
                {filteredPopular.length === 0 &&
                  filteredStates.every((s) => s.cities.length === 0) && (
                    <p className="text-center text-gray-400 text-sm py-4">
                      No results found
                    </p>
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
