// components/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FunnelIcon,
  MapIcon,
  ViewColumnsIcon,
  MapPinIcon,
  HeartIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  StarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // grid, list, map
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({});
  const [leadInteractions, setLeadInteractions] = useState({
    viewedProperties: [],
    contactedOwners: [],
    savedProperties: [],
    leadScore: 0
  });

  useEffect(() => {
    if (location.state?.results) {
      setResults(location.state.results);
      setFilters(location.state.filters || {});
    }
  }, [location.state]);

  // Track lead interactions
  const trackInteraction = (type, propertyId, score = 5) => {
    setLeadInteractions(prev => {
      const updated = { ...prev, leadScore: prev.leadScore + score };
      
      switch (type) {
        case 'view':
          updated.viewedProperties = [...prev.viewedProperties, propertyId];
          break;
        case 'contact':
          updated.contactedOwners = [...prev.contactedOwners, propertyId];
          break;
        case 'save':
          updated.savedProperties = [...prev.savedProperties, propertyId];
          break;
      }
      
      return updated;
    });
  };

  // Handle property contact
  const handleContact = (property, type) => {
    trackInteraction('contact', property.id, 15);
    
    // Check if user should be offered broker package
    if (leadInteractions.leadScore > 30) {
      navigate('/broker-packages', {
        state: {
          leadData: leadInteractions,
          interestedProperty: property,
          contactType: type
        }
      });
    } else {
      navigate('/contact-form', { state: { property, type } });
    }
  };

  // Sort functions
  const sortResults = (results, sortType) => {
    switch (sortType) {
      case 'price-low':
        return [...results].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...results].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...results].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      case 'area-large':
        return [...results].sort((a, b) => b.area - a.area);
      default:
        return results;
    }
  };

  const sortedResults = sortResults(results, sortBy);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {results.length} Properties Found
                {filters.searchQuery && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    in "{filters.searchQuery}"
                  </span>
                )}
              </h1>
              <p className="text-gray-600">
                Based on your search criteria • Lead Score: {leadInteractions.leadScore}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <ViewColumnsIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <MapIcon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="area-large">Largest Area First</option>
              </select>
              
              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FunnelIcon className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Score CTA */}
      {leadInteractions.leadScore > 20 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <strong>🎯 You're a hot lead!</strong> Your activity shows serious buying intent.
              Get broker access to contact owners directly and save brokerage fees.
            </div>
            <button
              onClick={() => navigate('/broker-packages')}
              className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Broker Access ₹999
            </button>
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-80"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Refine Your Search</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min Price"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* BHK Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">BHK Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((bhk) => (
                      <label key={bhk} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{bhk}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <div className="space-y-2">
                    {['Apartment', 'Independent House', 'Villa', 'Studio'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="space-y-2">
                    {['Parking', 'Gym', 'Swimming Pool', 'Garden', 'Security'].map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}

          {/* Results Grid/List */}
          <div className="flex-1">
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedResults.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                        onClick={() => {
                          trackInteraction('view', property.id);
                          navigate(`/property/${property.id}`);
                        }}
                      />
                      
                      <div className="absolute top-4 left-4">
                        {property.isFeatured && (
                          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mr-2">
                            FEATURED
                          </span>
                        )}
                        {property.isPremium && (
                          <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                            PREMIUM
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => trackInteraction('save', property.id, 3)}
                        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                      >
                        <HeartIcon className={`w-5 h-5 ${
                          leadInteractions.savedProperties.includes(property.id) 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-600'
                        }`} />
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 truncate">{property.title}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>

                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xl font-bold text-gray-800">{property.priceText}</span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {property.bhkText}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span>{property.areaText}</span>
                        <span className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" /> {property.postedDate}
                        </span>
                      </div>

                      {/* Lead Score Indicator */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-xs">
                          <div className={`w-2 h-2 rounded-full mr-1 ${
                            property.leadPriority === 'high' ? 'bg-green-500' : 
                            property.leadPriority === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-gray-500">
                            {property.leadPriority} priority
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <EyeIcon className="w-3 h-3 mr-1" />
                          {Math.floor(Math.random() * 50) + 10} views
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleContact(property, 'call')}
                          className="flex-1 bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                        >
                          <PhoneIcon className="w-4 h-4 inline mr-1" /> Call
                        </button>
                        <button
                          onClick={() => handleContact(property, 'chat')}
                          className="flex-1 bg-green-100 text-green-700 hover:bg-green-200 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                        >
                          <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-1" /> Chat
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="space-y-6">
                {sortedResults.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="flex">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-48 h-36 object-cover cursor-pointer"
                        onClick={() => {
                          trackInteraction('view', property.id);
                          navigate(`/property/${property.id}`);
                        }}
                      />
                      
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{property.title}</h3>
                          <button
                            onClick={() => trackInteraction('save', property.id, 3)}
                            className="p-2 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <HeartIcon className={`w-5 h-5 ${
                              leadInteractions.savedProperties.includes(property.id)
                                ? 'text-red-500 fill-current'
                                : 'text-gray-400'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-2xl font-bold text-gray-800">{property.priceText}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">BHK</span>
                            <div className="font-semibold">{property.bhkText}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Area</span>
                            <div className="font-semibold">{property.areaText}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Posted</span>
                            <div className="font-semibold">{property.postedDate}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-1 ${
                                property.leadPriority === 'high' ? 'bg-green-500' : 
                                property.leadPriority === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></div>
                              {property.leadPriority} priority
                            </div>
                            <div className="flex items-center">
                              <EyeIcon className="w-3 h-3 mr-1" />
                              {Math.floor(Math.random() * 50) + 10} views
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleContact(property, 'call')}
                              className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                            >
                              <PhoneIcon className="w-4 h-4 inline mr-1" /> Call
                            </button>
                            <button
                              onClick={() => handleContact(property, 'chat')}
                              className="bg-green-100 text-green-700 hover:bg-green-200 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                            >
                              <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-1" /> Chat
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {viewMode === 'map' && (
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600">Map View</h3>
                    <p className="text-gray-500">Interactive map showing all {results.length} properties</p>
                    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Load Map View
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
