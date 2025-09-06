
import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  TrophyIcon,
  UsersIcon,
  CheckCircleIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const BrokerDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Mock brokers data
  const brokers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      photo: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=f97316&color=fff&size=150",
      rating: 4.8,
      reviews: 234,
      experience: 8,
      city: "Mumbai",
      area: "Lower Parel, Worli, Prabhadevi",
      specialization: ["Residential", "Commercial"],
      phone: "+91 9876543210",
      email: "rajesh@example.com",
      company: "Elite Properties Mumbai",
      verified: true,
      propertiesSold: 156,
      totalDeals: "₹45 Cr",
      languages: ["Hindi", "English", "Marathi"],
      description: "Experienced real estate professional specializing in luxury properties in South Mumbai.",
      achievements: [
        "Top Performer 2024",
        "Customer Choice Award",
        "50+ Successful Deals"
      ],
      responseTime: "15 mins",
      available: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      photo: "https://ui-avatars.com/api/?name=Priya+Sharma&background=3b82f6&color=fff&size=150",
      rating: 4.6,
      reviews: 189,
      experience: 6,
      city: "Delhi",
      area: "Connaught Place, Khan Market, Karol Bagh",
      specialization: ["Residential", "Investment"],
      phone: "+91 9123456789",
      email: "priya@example.com", 
      company: "Prime Realty Delhi",
      verified: true,
      propertiesSold: 124,
      totalDeals: "₹32 Cr",
      languages: ["Hindi", "English", "Punjabi"],
      description: "Specializes in residential properties and investment opportunities in Central Delhi.",
      achievements: [
        "Rising Star 2024",
        "Quick Response Award",
        "Client Satisfaction 95%"
      ],
      responseTime: "12 mins",
      available: true
    },
    {
      id: 3,
      name: "Amit Patel",
      photo: "https://ui-avatars.com/api/?name=Amit+Patel&background=10b981&color=fff&size=150",
      rating: 4.7,
      reviews: 267,
      experience: 10,
      city: "Ahmedabad",
      area: "Satellite, Vastrapur, Bodakdev",
      specialization: ["Residential", "Villa"],
      phone: "+91 8877665544",
      email: "amit@example.com",
      company: "Gujarat Properties Hub",
      verified: true,
      propertiesSold: 203,
      totalDeals: "₹58 Cr",
      languages: ["Gujarati", "Hindi", "English"],
      description: "Expert in residential properties and luxury villas across Ahmedabad's premium locations.",
      achievements: [
        "Platinum Agent 2024",
        "Most Trusted Broker",
        "200+ Happy Families"
      ],
      responseTime: "8 mins",
      available: false
    },
    {
      id: 4,
      name: "Sneha Gupta",
      photo: "https://ui-avatars.com/api/?name=Sneha+Gupta&background=ec4899&color=fff&size=150",
      rating: 4.5,
      reviews: 156,
      experience: 5,
      city: "Bangalore",
      area: "Whitefield, Electronic City, Koramangala",
      specialization: ["Residential", "IT Hub Properties"],
      phone: "+91 7766554433",
      email: "sneha@example.com",
      company: "TechCity Realty",
      verified: true,
      propertiesSold: 98,
      totalDeals: "₹28 Cr",
      languages: ["English", "Hindi", "Kannada"],
      description: "Focused on IT corridor properties and modern residential complexes for tech professionals.",
      achievements: [
        "Tech Professional's Choice",
        "Fast Track Closer",
        "Digital Marketing Expert"
      ],
      responseTime: "20 mins",
      available: true
    },
    {
      id: 5,
      name: "Vikram Singh",
      photo: "https://ui-avatars.com/api/?name=Vikram+Singh&background=8b5cf6&color=fff&size=150",
      rating: 4.9,
      reviews: 312,
      experience: 12,
      city: "Gurgaon",
      area: "Sector 56, Golf Course Road, Cyber City",
      specialization: ["Luxury", "Commercial", "Investment"],
      phone: "+91 9988776655",
      email: "vikram@example.com",
      company: "Luxury Homes Gurgaon",
      verified: true,
      propertiesSold: 278,
      totalDeals: "₹89 Cr",
      languages: ["Hindi", "English", "Punjabi"],
      description: "Luxury property specialist with extensive experience in high-end residential and commercial deals.",
      achievements: [
        "Luxury Specialist Award",
        "Million Dollar Club",
        "Industry Excellence 2024"
      ],
      responseTime: "5 mins",
      available: true
    }
  ];

  const cities = ["All Cities", "Mumbai", "Delhi", "Bangalore", "Ahmedabad", "Gurgaon", "Pune", "Chennai"];
  const specializations = ["All Specializations", "Residential", "Commercial", "Luxury", "Investment", "Villa"];

  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         broker.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         broker.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || broker.city === selectedCity;
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                 broker.specialization.includes(selectedSpecialization);
    return matchesSearch && matchesCity && matchesSpecialization;
  });

  const BrokerCard = ({ broker }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <img
            src={broker.photo}
            alt={broker.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <div className="flex items-center">
              <h3 className="text-xl font-bold text-gray-900">{broker.name}</h3>
              {broker.verified && (
                <CheckCircleIcon className="w-5 h-5 text-green-500 ml-2" />
              )}
            </div>
            <div className="flex items-center mt-1">
              <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold text-gray-900 ml-1">{broker.rating}</span>
              <span className="text-gray-500 text-sm ml-1">({broker.reviews} reviews)</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            broker.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {broker.available ? 'Available' : 'Busy'}
          </div>
          <div className="text-xs text-gray-500 mt-1">Response: {broker.responseTime}</div>
        </div>
      </div>

      {/* Details */}
      <div className="mb-4">
        <div className="flex items-center text-gray-600 mb-2">
          <MapPinIcon className="w-4 h-4 mr-2" />
          <span className="text-sm">{broker.area}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <BuildingOfficeIcon className="w-4 h-4 mr-2" />
          <span className="text-sm">{broker.company}</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{broker.description}</p>
      </div>

      {/* Specializations */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {broker.specialization.map((spec, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{broker.experience}</div>
          <div className="text-xs text-gray-500">Years Exp.</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{broker.propertiesSold}</div>
          <div className="text-xs text-gray-500">Properties</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{broker.totalDeals}</div>
          <div className="text-xs text-gray-500">Total Deals</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Achievements</h4>
        <div className="space-y-1">
          {broker.achievements.slice(0, 2).map((achievement, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <TrophyIcon className="w-4 h-4 text-yellow-500 mr-2" />
              {achievement}
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Languages</h4>
        <div className="flex flex-wrap gap-1">
          {broker.languages.map((lang, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Actions */}
      <div className="flex gap-3">
        <a
          href={`tel:${broker.phone}`}
          className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center font-medium"
        >
          <PhoneIcon className="w-4 h-4 mr-2" />
          Call Now
        </a>
        <a
          href={`mailto:${broker.email}`}
          className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center font-medium"
        >
          <EnvelopeIcon className="w-4 h-4 mr-2" />
          Email
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Broker</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Connect with verified real estate professionals who understand your needs 
            and deliver exceptional results.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, area, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Cities</option>
                {cities.slice(1).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Specializations</option>
                {specializations.slice(1).map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="deals">Most Deals</option>
                <option value="response">Fastest Response</option>
              </select>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredBrokers.length} Brokers Found
          </h2>
          <div className="text-sm text-gray-500">
            Showing verified professionals in your area
          </div>
        </div>

        {/* Brokers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredBrokers.map(broker => (
            <BrokerCard key={broker.id} broker={broker} />
          ))}
        </div>

        {/* No Results */}
        {filteredBrokers.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No brokers found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('all');
                setSelectedSpecialization('all');
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Join as Broker CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Are You a Real Estate Professional?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join our network of verified brokers and start receiving quality leads in your area.
          </p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Join as Broker
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrokerDirectory;
