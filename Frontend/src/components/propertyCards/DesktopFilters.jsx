
// src/components/filters/DesktopFilters.jsx
import React from "react";
export default function DesktopFilters({ open }) {
  if (!open) return null;
  return (
    <div className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto p-6 text-gray-500 text-sm">
        {/* replace with real controls */}
        <p>Advanced filter panel (dummy)</p>
      </div>
    </div>
  );
}
