import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  MapPinIcon,
  UserIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const PropertyDetails = () => {
  const { state: property } = useLocation(); 
  const navigate = useNavigate();

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>No property details available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[#164058] font-medium hover:underline"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-lg font-bold text-[#164058]">
            {property.bhk} in {property.location}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {property.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Property ${idx}`}
                className="w-full h-60 object-cover rounded-xl"
              />
            ))}
          </div>

          {/* Basic Details */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#164058]">
              {property.bhk}
            </h2>
            <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-[#FF9C00]" />
                {property.location}
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-[#FF9C00]" />
                {property.postedBy} ({property.ownerName})
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#FF9C00]" />
                {property.postedTime}
              </div>
              <div className="flex items-center gap-2">
                <PhotoIcon className="w-5 h-5 text-[#FF9C00]" />
                {property.images?.length} Images
              </div>
            </div>
            <p className="text-2xl font-bold text-orange-500">
              ₹ {property.price}
            </p>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-[#164058] mb-3">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {property.description ||
                "No detailed description available for this property."}
            </p>
          </div>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-[#164058] mb-3">
                Features
              </h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-600 text-sm">
                {property.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2"
                  >
                     {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Contact Section */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-[#164058] mb-4">
              Contact Details
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Posted By:</span> {property.postedBy}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Name:</span> {property.ownerName}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Phone:</span>{" "}
              {property.contact || "Not Available"}
            </p>
            <button className="w-full mt-4 bg-[#FF9C00] text-white py-3 rounded-lg font-semibold hover:bg-[#164058] transition">
              Contact Now
            </button>
          </div>

          {/* Price Section */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-[#164058] mb-3">
              Price Details
            </h3>
            <p className="text-2xl font-bold text-orange-500 mb-2">
              ₹ {property.price}
            </p>
            <p className="text-gray-500 text-sm">
              (Negotiable: {property.negotiable ? "Yes" : "No"})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
