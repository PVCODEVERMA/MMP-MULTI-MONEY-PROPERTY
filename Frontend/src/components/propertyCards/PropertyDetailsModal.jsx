
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  MapPinIcon,
  HomeIcon,
  CalendarIcon,
  UserIcon,
  ShieldCheckIcon,
  CurrencyRupeeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const PropertyDetailsModal = ({ isOpen, onClose, property }) => {
  if (!property) return null;

  const getPosterTypeColor = (type) => {
    switch (type) {
      case 'owner': return 'bg-green-100 text-green-700';
      case 'broker': return 'bg-blue-100 text-blue-700';
      case 'user': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Property Details</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Property Image */}
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden ">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-80 object-cover"
                    />
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {property.isFeatured && (
                        <span className="bg-[#FD9E06] text-white text-xs font-bold px-3 py-1 rounded-full">
                          ⭐ FEATURED
                        </span>
                      )}
                      {property.discount && (
                        <span className="bg-[#FD9E06] text-white text-xs font-bold px-3 py-1 rounded-full">
                          {property.discount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Property Info */}
                <div className="space-y-6">
                  {/* Title & Builder */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                    <p className="text-gray-600">by {property.builder}</p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="w-5 h-5 mr-3 text-[#FD9E06]" />
                    <span>{property.location}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-800">{property.price}</span>
                    {property.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">{property.originalPrice}</span>
                    )}
                  </div>

                  {/* Property Details Grid */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="text-center">
                      <HomeIcon className="w-6 h-6 mx-auto mb-2 text-[#FD9E06]" />
                      <div className="font-semibold text-gray-800">{property.bhk}</div>
                      <div className="text-sm text-gray-500">Bedrooms</div>
                    </div>
                    <div className="text-center">
                      <BuildingOfficeIcon className="w-6 h-6 mx-auto mb-2 text-[#FD9E06]" />
                      <div className="font-semibold text-gray-800">{property.area}</div>
                      <div className="text-sm text-gray-500">Built-up Area</div>
                    </div>
                    <div className="text-center">
                      <CalendarIcon className="w-6 h-6 mx-auto mb-2 text-[#FD9E06]" />
                      <div className="font-semibold text-gray-800">{property.possession}</div>
                      <div className="text-sm text-gray-500">Possession</div>
                    </div>
                    <div className="text-center">
                      <UserIcon className="w-6 h-6 mx-auto mb-2 text-[#FD9E06]" />
                      <div className="font-semibold text-gray-800">{property.posterName}</div>
                      <div className="text-sm text-gray-500">Posted by</div>
                    </div>
                  </div>

                  {/* Posted By Info */}
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">Posted By</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPosterTypeColor(property.posterType)}`}>
                        {property.posterType?.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{property.posterName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Posted:</span>
                        <span className="font-medium">{property.postedDate}</span>
                      </div>
                      {property.posterCompany && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Company:</span>
                          <span className="font-medium">{property.posterCompany}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <button className="w-full py-3 px-4 bg-[#FD9E06] hover:bg-[#FD9E06] text-white font-semibold rounded-xl transition-colors">
                        Get Started
                      </button>
                      <button className="w-full py-3 px-4 border-2 border-[#FD9E06] text-[#FD9E06] hover:bg-orange-50 font-semibold rounded-xl transition-colors">
                        Book a Demo
                      </button>
                    </div>
                  </div>

                  {/* Verification Status */}
                  {property.isVerified && (
                    <div className="flex items-center justify-center p-3 bg-green-50 rounded-xl">
                      <ShieldCheckIcon className="w-5 h-5 text-[#FD9E06] mr-2" />
                      <span className="text-[#FD9E06] font-medium">✅ Verified Property</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PropertyDetailsModal;
