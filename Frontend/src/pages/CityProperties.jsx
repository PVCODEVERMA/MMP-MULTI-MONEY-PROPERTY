
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  HomeIcon,
  CurrencyRupeeIcon,
  StarIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const CityProperties = () => {
  const { cityName } = useParams();
  const [filters, setFilters] = useState({
    propertyType: 'all',
    priceRange: 'all',
    bhk: 'all',
    sortBy: 'newest'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock properties data for different cities
  const cityProperties = {
    mumbai: [
      {
        id: 1,
        name: "Lodha Park",
        area: "Lower Parel",
        price: "₹2.5Cr - 4.2Cr",
        priceValue: 25000000,
        type: "Apartment",
        bhk: "3 BHK",
        sqft: 1200,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
        featured: true,
        rating: 4.5,
        leads: 45,
        amenities: ["Swimming Pool", "Gym", "Parking"]
      },
      {
        id: 2,
        name: "Hiranandani Gardens",
        area: "Powai",
        price: "₹1.8Cr - 3.5Cr", 
        priceValue: 18000000,
        type: "Apartment",
        bhk: "2 BHK",
        sqft: 950,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400",
        featured: false,
        rating: 4.2,
        leads: 32,
        amenities: ["Garden", "Security", "Power Backup"]
      },
      {
        id: 3,
        name: "Oberoi Realty",
        area: "Goregaon East",
        price: "₹3.2Cr - 5.8Cr",
        priceValue: 32000000,
        type: "Apartment", 
        bhk: "4 BHK",
        sqft: 1800,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
        featured: true,
        rating: 4.7,
        leads: 28,
        amenities: ["Club House", "Swimming Pool", "Gym"]
      }
    ],
    delhi: [
      {
        id: 4,
        name: "DLF Capitol Greens",
        area: "Moti Nagar",
        price: "₹1.5Cr - 2.8Cr",
        priceValue: 15000000,
        type: "Apartment",
        bhk: "3 BHK", 
        sqft: 1100,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
        featured: true,
        rating: 4.3,
        leads: 38,
        amenities: ["Metro Connectivity", "Shopping Mall", "Schools"]
      }
    ],
    bangalore: [
      {
        id: 5,
        name: "Prestige Lakeside Habitat",
        area: "Whitefield",
        price: "₹85L - 1.6Cr",
        priceValue: 8500000,
        type: "Apartment",
        bhk: "2 BHK",
        sqft: 1050,
        image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=400",
        featured: false,
        rating: 4.4,
        leads: 42,
        amenities: ["Lake View", "Jogging Track", "Children's Play Area"]
      }
    ]
  };

  const currentCity = cityName?.toLowerCase() || 'mumbai';
  const properties = cityProperties[currentCity] || cityProperties.mumbai;

  const cityInfo = {
    mumbai: {
      fullName: "Mumbai",
      description: "India's financial capital with premium properties",
      avgPrice: "₹2.5Cr",
      totalProperties: 1240,
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600"
    },
    delhi: {
      fullName: "Delhi", 
      description: "National capital region with diverse housing options",
      avgPrice: "₹1.8Cr",
      totalProperties: 980,
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600"
    },
    bangalore: {
      fullName: "Bangalore",
      description: "IT hub with modern residential complexes",
      avgPrice: "₹1.2Cr", 
      totalProperties: 1560,
      image: "https://images.unsplash.com/photo-1596176530529-78163684f77a?w=600"
    }
  };

  const currentCityInfo = cityInfo[currentCity] || cityInfo.mumbai;

  const filterOptions = {
    propertyType: [
      { value: 'all', label: 'All Types' },
      { value: 'apartment', label: 'Apartment' },
      { value: 'villa', label: 'Villa' },
      { value: 'house', label: 'Independent House' }
    ],
    priceRange: [
      { value: 'all', label: 'All Prices' },
      { value: '0-1cr', label: 'Under ₹1Cr' },
      { value: '1-2cr', label: '₹1Cr - ₹2Cr' },
      { value: '2-5cr', label: '₹2Cr - ₹5Cr' },
      { value: '5cr+', label: 'Above ₹5Cr' }
    ],
    bhk: [
      { value: 'all', label: 'All BHK' },
      { value: '1', label: '1 BHK' },
      { value: '2', label: '2 BHK' },
      { value: '3', label: '3 BHK' },
      { value: '4+', label: '4+ BHK' }
    ],
    sortBy: [
      { value: 'newest', label: 'Newest First' },
      { value: 'price-low', label: 'Price: Low to High' },
      { value: 'price-high', label: 'Price: High to Low' },
      { value: 'rating', label: 'Highest Rated' }
    ]
  };

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img 
          src={property.image}
          alt={property.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {property.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <StarIcon className="w-4 h-4 mr-1" />
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {property.leads} leads
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPinIcon className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.area}, {currentCityInfo.fullName}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Type:</span>
            <span className="font-medium ml-2">{property.type}</span>
          </div>
          <div>
            <span className="text-gray-500">Size:</span>
            <span className="font-medium ml-2">{property.bhk}</span>
          </div>
          <div>
            <span className="text-gray-500">Area:</span>
            <span className="font-medium ml-2">{property.sqft} sq ft</span>
          </div>
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="font-medium">{property.rating}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-2xl font-bold text-green-600">{property.price}</p>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Link 
            to={`/property/${property.id}`}
            className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors text-center font-medium"
          >
            View Details
          </Link>
          <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors">
            <PhoneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* City Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentCityInfo.image})` }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Properties in {currentCityInfo.fullName}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {currentCityInfo.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{currentCityInfo.totalProperties}+</div>
              <div className="text-sm opacity-90">Properties Available</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{currentCityInfo.avgPrice}</div>
              <div className="text-sm opacity-90">Average Price</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm opacity-90">Verified Brokers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties, areas, or builders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(filterOptions).map(([key, options]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <select
                      value={filters[key]}
                      onChange={(e) => setFilters({...filters, [key]: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {properties.length} Properties Found
          </h2>
          <div className="flex items-center space-x-4">
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-500" />
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {filterOptions.sortBy.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
            Load More Properties
          </button>
        </div>

        {/* City Information */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            About Real Estate in {currentCityInfo.fullName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Market Overview</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                {currentCityInfo.fullName} offers diverse real estate opportunities with properties 
                ranging from luxury apartments to affordable housing. The city's strategic location 
                and excellent connectivity make it a preferred choice for homebuyers and investors.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Price per sq ft:</span>
                  <span className="font-semibold">₹12,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price Growth (YoY):</span>
                  <span className="font-semibold text-green-600">+8.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rental Yield:</span>
                  <span className="font-semibold">3.2%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Popular Areas</h4>
              <div className="grid grid-cols-2 gap-3">
                {['Lower Parel', 'Powai', 'Andheri East', 'Bandra West', 'Goregaon', 'Malad'].map((area, index) => (
                  <Link
                    key={index}
                    to={`/search?location=${area}`}
                    className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-center text-sm font-medium"
                  >
                    {area}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityProperties;
