import React from "react";
import { useParams } from "react-router-dom";
import { properties } from "../propertyCards/TopProjects";


const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-red-500 font-semibold">
        Property not found.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={property.image}
        alt={property.bhk}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />
      <h2 className="text-2xl font-bold text-[#164058] mb-2">{property.bhk}</h2>
      <p className="text-lg text-gray-600 mb-2">{property.price}</p>
      <p className="text-sm text-gray-700 mb-2"> {property.location}</p>
      <p className="text-sm text-gray-700 mb-2">Possession: {property.possession}</p>
      <p className="text-sm text-gray-700 mb-2">Posted By: {property.ownerName}</p>
      <p className="text-sm text-gray-500">Posted: {property.postedTime}</p>
    </div>
  );
};

export default PropertyDetails;
