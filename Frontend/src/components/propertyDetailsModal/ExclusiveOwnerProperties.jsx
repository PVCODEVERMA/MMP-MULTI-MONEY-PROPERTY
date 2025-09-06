import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon ,
} from "@heroicons/react/24/outline";

const ExclusiveOwnerProperties = ({ 
  handleGetStarted, 
  handleBookDemo,
  reduceMotion 
}) => {
  const navigate = useNavigate();
  const [hoveredProperty, setHoveredProperty] = useState(null);

  // Delhi Owner Properties Data with additional owner and time info
  const ownerProperties = [
    {
      id: 1,
      bhk: "2 BHK Flat",
      price: "₹45 Lac",
      location: "Budh Vihar, New Delhi",
      possession: "Ready to Move",
      images: 3,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      postedBy: "Owner",
      postedTime: "Today",
      ownerName: "Rajesh Kumar",
    },
    {
      id: 2,
      bhk: "3 BHK Flat",
      price: "₹12 Cr",
      location: "Gulmohar Enclave Gulmohar Park, New Delhi",
      possession: "Ready to Move",
      images: 20,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      postedBy: "Broker",
      postedTime: "Yesterday",
      ownerName: "Sunil Properties",
    },
    {
      id: 3,
      bhk: "3 BHK Flat",
      price: "₹12 Cr",
      location: "Gulmohar Enclave Gulmohar Park, New Delhi",
      possession: "Ready to Move",
      images: 20,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      postedBy: "Owner",
      postedTime: "2 days ago",
      ownerName: "Priya Sharma",
    },
    {
      id: 4,
      bhk: "3 BHK Flat",
      price: "₹1.75 Cr",
      location: "Vikaspuri, New Delhi",
      possession: "Ready to Move",
      images: 17,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      postedBy: "User",
      postedTime: "3 days ago",
      ownerName: "Amit Verma",
    },
    {
      id: 5,
      bhk: "4 BHK Flat",
      price: "₹2.8 Cr",
      location: "Greater Kailash, New Delhi",
      possession: "Ready to Move",
      images: 15,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      postedBy: "Owner",
      postedTime: "Just now",
      ownerName: "Vikram Singh",
    },
  ];

  const handleViewDetails = (propertyId) => {
    navigate(`/property-details/${propertyId}`);
  };

  const handleSeeAllProperties = () => {
    navigate("/exclusive-owner-properties");
  };

  const scrollLeft = () => {
    const container = document.getElementById('properties-container');
    container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.getElementById('properties-container');
    container.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Function to get badge color based on post type
  const getBadgeColor = (type) => {
    switch(type) {
      case "Owner": return "bg-green-100 text-green-800";
      case "Broker": return "bg-blue-100 text-blue-800";
      case "User": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 sm:mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Exclusive Owner Properties in New Delhi
          </h2>
          <div className="w-12 sm:w-16 h-1 rounded mt-2" style={{ backgroundColor: "#FF9C00" }} />
        </div>
        
        {/* See All Properties Button - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleSeeAllProperties}
            className="flex items-center gap-2 px-4 py-2 text-[#FF9C00] hover:text-[#164058] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF9C00] cursor-pointer"
          >
            <span>See all Properties</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Properties Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute -left-24 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF9C00] hidden md:block"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={scrollRight}
          className="absolute -right-24 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF9C00] hidden md:block"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-600" />
        </button>

        {/* Properties Grid */}
        <div 
          id="properties-container"
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {ownerProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reduceMotion ? 0 : index * 0.1,
                duration: reduceMotion ? 0 : 0.3,
              }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer flex-shrink-0 w-80 relative"
              style={{ scrollSnapAlign: 'start' }}
              onClick={() => handleViewDetails(property.id)}
              onMouseEnter={() => setHoveredProperty(property.id)}
              onMouseLeave={() => setHoveredProperty(null)}
            >
              {/* Property Image */}
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.bhk}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />

                {/* Image Count */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-[#164058] bg-opacity-60 text-white text-xs font-medium px-2 py-1 rounded flex items-center">
                    📷 {property.images}
                  </span>
                </div>

                {/* Posted by badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getBadgeColor(property.postedBy)}`}>
                    {property.postedBy}
                  </span>
                </div>

                {/* Posted time */}
                <div className="absolute top-3 right-3">
                  <span className="bg-black bg-opacity-60 text-white text-xs font-medium px-2 py-1 rounded">
                    {property.postedTime}
                  </span>
                </div>

                {/* View Details Overlay Button - Hidden by default, shown on hover */}
                <div className={`absolute inset-0 bg-transparent bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${hoveredProperty === property.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(property.id);
                    }}
                    className="px-6 py-3 bg-[#FF9C00] hover:bg-[#FF9C00] text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#D32F2F] cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-4">
                {/* Owner Name */}
                <div className="mb-2">
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="font-medium  text-[#164058]">{property.ownerName}</span>
                  </p>
                </div>

                {/* BHK Type */}
                 <div className=" mb-3 sm:mb-4">
                <div className="flex gap-8">
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                      {property.price}
                    </span>
                    {property.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        {property.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 mt-1 text-xs sm:text-sm text-gray-600">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                      {property.bhk}
                    </span>
                    <span>{property.area}</span>
                  </div>
                </div>
              </div>

                {/* Location */}
                <div className="mb-2">
                  <p className="text-sm text-[#164058] line-clamp-2">
                    <div className="flex gap-1 ">
                    <MapPinIcon  className="h-4 w-4 mt-1 text-[#FF9C00]"/>
                    {property.location}
                    </div>
                    
                  </p>
                </div>

                

                {/* View Details Button - Mobile Only */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(property.id);
                  }}
                  className="w-full px-4 py-3 bg-[#FF9C00] hover:bg-[#FF9C00] text-[#7F7F7F] rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#D32F2F] md:hidden"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="mt-6 md:hidden">
        {/* See All Properties Button - Mobile */}
        <button
          onClick={handleSeeAllProperties}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[#FF9C00] hover:text-[#164058] border border-[#FF9C00] hover:border-[#164058] rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF9C00] cursor-pointer"
        >
          <span>See all Properties</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ExclusiveOwnerProperties;