import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  MapPinIcon,
  HomeIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  ShareIcon,
  HeartIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";

import image01 from "../../assets/PropertyDetails/photo_01.avif"
import image02 from "../../assets/PropertyDetails/photo_02.avif"
import image03 from "../../assets/PropertyDetails/photo_03.avif"
import image04 from "../../assets/PropertyDetails/photo_04.avif"


import image21 from "../../assets/PropertyDetails/photo_21.avif"
import image22 from "../../assets/PropertyDetails/photo_22.avif"

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);


  // Sample property data
  const propertyData = {
    1: {
      id: 1,
      bhk: "2 BHK Flat",
      price: "₹45 Lac",
      location: "Budh Vihar, New Delhi",
      possession: "Ready to Move",
      images: [
        image01,
        image02,
        image03,
        image04
      ],
      details: {
        area: "850 sq.ft",
        facing: "East",
        floor: "3rd Floor",
        totalFloors: "5",
        parking: "1 Car",
        furnished: "Semi-Furnished",
        age: "5 years",
        bathroom: "2",
        balcony: "2",
      },
      amenities: [
        "Gym", "Swimming Pool", "Garden", "Security", "Power Backup", 
        "Lift", "Car Parking", "Playground"
      ],
      description: "This beautiful 2 BHK apartment in Budh Vihar offers modern amenities and excellent connectivity. The property features spacious rooms, good ventilation, and is ready to move in. Located in a peaceful neighborhood with easy access to markets, schools, and hospitals.",
      owner: {
        name: "Rajesh Kumar",
        type: "Owner",
        phone: "+91 98765 43210",
        email: "rajesh.kumar@email.com",
        verified: true,
      }
    },
    2: {
      id: 2,
      bhk: "3 BHK Flat",
      price: "₹12 Cr",
      location: "Gulmohar Enclave Gulmohar Park, New Delhi",
      possession: "Ready to Move",
      images: [
        image21,
        image22
      ],
      details: {
        area: "1850 sq.ft",
        facing: "North",
        floor: "2nd Floor",
        totalFloors: "4",
        parking: "2 Cars",
        furnished: "Fully Furnished",
        age: "2 years",
        bathroom: "3",
        balcony: "2",
      },
      amenities: [
        "Gym", "Swimming Pool", "Garden", "Security", "Power Backup", 
        "Lift", "Car Parking", "Club House", "Tennis Court"
      ],
      description: "Premium 3 BHK apartment in the heart of Gulmohar Park. This property offers luxury living with modern amenities and excellent location connectivity. The apartment features high-quality finishes, spacious rooms, and a beautiful view of the surrounding area.",
      owner: {
        name: "Priya Sharma",
        type: "Owner",
        phone: "+91 98765 43211",
        email: "priya.sharma@email.com",
        verified: true,
      }
    },
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProperty = propertyData[id];
      if (foundProperty) {
        setProperty(foundProperty);
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9C00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#FF9C00] text-white rounded-lg hover:bg-[#164058] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#FF9C00] transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-[#FF9C00] transition-colors">
                <ShareIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                <HeartIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 relative">
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.bhk}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation arrows */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <ArrowLeftIcon className="w-5 h-5 text-gray-700 rotate-180" />
                    </button>
                  </>
                )}
                
                {/* Image count and expand button */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <span className="bg-[#164057] bg-opacity-60 text-white text-sm px-3 py-1 rounded-full">
                    {currentImageIndex + 1} / {property.images.length}
                  </span>
                  <button 
                    onClick={() => setIsImageModalOpen(true)}
                    className="bg-[#164057] bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition-colors"
                  >
                    <ArrowsPointingOutIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Thumbnail gallery */}
              {property.images.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? 'border-[#FF9C00]' : 'border-transparent'}`}
                      >
                        <img
                          src={image}
                          alt={`Property ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{property.bhk}</h1>
                <p className="text-2xl font-bold text-[#FF9C00] mt-2 md:mt-0">{property.price}</p>
              </div>
              
              <div className="flex items-center text-gray-600 mb-6">
                <MapPinIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{property.location}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <HomeIcon className="w-6 h-6 mx-auto mb-2 text-[#FF9C00]" />
                  <p className="text-sm text-gray-600">Area</p>
                  <p className="font-semibold">{property.details.area}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <CalendarIcon className="w-6 h-6 mx-auto mb-2 text-[#FF9C00]" />
                  <p className="text-sm text-gray-600">Possession</p>
                  <p className="font-semibold">{property.possession}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <UserIcon className="w-6 h-6 mx-auto mb-2 text-[#FF9C00]" />
                  <p className="text-sm text-gray-600">Floor</p>
                  <p className="font-semibold">{property.details.floor}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <CurrencyRupeeIcon className="w-6 h-6 mx-auto mb-2 text-[#FF9C00]" />
                  <p className="text-sm text-gray-600">Furnishing</p>
                  <p className="font-semibold">{property.details.furnished}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Facing:</span>
                    <span className="font-medium">{property.details.facing}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Parking:</span>
                    <span className="font-medium">{property.details.parking}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{property.details.age}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Bathrooms:</span>
                    <span className="font-medium">{property.details.bathroom}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Balconies:</span>
                    <span className="font-medium">{property.details.balcony}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Total Floors:</span>
                    <span className="font-medium">{property.details.totalFloors}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center py-2">
                      <div className="w-2 h-2 bg-[#FF9C00] rounded-full mr-3"></div>
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Owner Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Owner</h3>
              
              <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#FF9C00] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {property.owner.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{property.owner.name}</p>
                  <p className="text-sm text-gray-600">{property.owner.type}</p>
                  {property.owner.verified && (
                    <p className="text-xs text-green-600 flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                      Verified
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href={`tel:${property.owner.phone}`}
                  className=" w-full text-center flex items-center justify-center gap-2 px-4 py-3 bg-[#FF9C00] text-white rounded-lg hover:bg-[#164058] transition-colors"
                >
                  <PhoneIcon className="w-5 h-5" />
                  <span>Call Now</span>
                </a>
                
                <a
                  href={`mailto:${property.owner.email}`}
                  className=" w-full text-center flex items-center justify-center gap-2 px-4 py-3 border border-[#FF9C00] text-[#FF9C00] rounded-lg hover:bg-[#FF9C00] hover:text-white transition-colors"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Price Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Price</span>
                  <span className="font-semibold">{property.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Registration</span>
                  <span className="font-semibold">₹2 Lac</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Brokerage</span>
                  <span className="font-semibold text-green-600">₹0 (Owner)</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Cost</span>
                  <span>{property.price.includes('Cr') ? 
                    `₹${(parseFloat(property.price.split('₹')[1].split(' ')[0]) + 0.02).toFixed(2)} Cr` : 
                    `₹${parseInt(property.price.split('₹')[1].split(' ')[0]) + 2} Lac`}
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 px-4 py-3 bg-[#164058] text-white rounded-lg hover:bg-[#FF9C00] transition-colors font-medium">
                Schedule Site Visit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-100 transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-100 transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6 rotate-180" />
          </button>
          
          <div className="max-w-4xl w-full h-full flex items-center justify-center">
            <img
              src={property.images[currentImageIndex]}
              alt={property.bhk}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;