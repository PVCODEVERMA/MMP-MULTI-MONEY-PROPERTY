import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      key={item.id}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden group cursor-pointer"
      onClick={() => navigate(`/property/${item.id}`, { state: item })}
    >
      {/* First image */}
      <img
        src={item.images[0]}
        alt={item.bhk}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#164058]">{item.bhk}</h2>
        <p className="text-sm text-gray-500">
          {item.location} • {item.postedBy} ({item.ownerName})
        </p>
        <p className="text-xs text-gray-400">{item.postedTime}</p>
        <p className="text-orange-500 font-bold mt-2">{item.price}</p>
        <p className="text-sm text-gray-500">{item.images.length} Images</p>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <span className="bg-[#FF9C00] text-white px-4 py-2 rounded-lg">
          View Details
        </span>
      </div>
    </div>
  );
};

export default PropertyCard;
