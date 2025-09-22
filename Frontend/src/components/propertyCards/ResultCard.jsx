// src/components/propertyCards/ResultCard.jsx
import React from "react";
export default function ResultCard({ title, price, tag, location, thumb }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="relative">
        <img src={thumb} alt={title} className="h-40 w-full object-cover" />
        <span className="absolute top-2 left-2 bg-[#FF9C00] text-white text-xs px-2 py-1 rounded">
          {price}
        </span>
        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
          {tag}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold leading-snug line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{location}</p>
      </div>
    </div>
  );
}
