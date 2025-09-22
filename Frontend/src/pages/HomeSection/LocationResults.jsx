import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import mockData from "./mockData.js";
import PropertyCard from "../HomeSection/PropertyCard.jsx";

const LocationResults = () => {
  const { state } = useLocation();
  const { locationSlug } = useParams();
  const navigate = useNavigate();

  const properties = mockData[locationSlug] || [];

  
  const hasPackage = (item) => item.postedBy !== "Broker"; 
  // Example: Broker = false, Owner = true

  const handleCardClick = (item) => {
    if (hasPackage(item)) {
      navigate(`/PropertyDetails/${item.id}`, { state: item });
    } else {
      navigate("/plans", { state: { from: locationSlug, property: item } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-[#164058] capitalize mb-6">
        Properties in {locationSlug.replace("-", " ")}
      </h1>

      {properties.length === 0 ? (
        <p className="text-gray-500">No properties found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => handleCardClick(item)}
            >
              <PropertyCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationResults;
