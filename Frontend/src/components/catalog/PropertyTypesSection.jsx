
import React, { useState } from "react";

const propertyTypes = {
  Residential: [
    "Apartment",
    "Townhouse",
    "Villa Compound",
    "Land",
    "Building",
    "Villa",
    "Penthouse",
    "Hotel Apartment",
    "Floor",
  ],
  Commercial: [
    "Office",
    "Warehouse",
    "Villa",
    "Land",
    "Building",
    "Industrial Land",
    "Showroom",
    "Shop",
    "Labour Camp",
    "Bulk Unit",
    "Floor",
    "Factory",
    "Mixed Use Land",
    "Other Commercial",
  ],
};

export default function PropertyTypesSection() {
  const [activeCategory, setActiveCategory] = useState("Residential");

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4 mt-4">
      {/* Category Tabs */}
      <div className="flex gap-4 mb-4">
        {Object.keys(propertyTypes).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeCategory === category
                ? "bg-[#164058] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Property Type Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {propertyTypes[activeCategory].map((type) => (
          <div
            key={type}
            className="p-3 bg-gray-50 border rounded-lg text-sm font-medium text-gray-800 cursor-pointer hover:bg-[#FF9C00] hover:text-white transition"
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}
