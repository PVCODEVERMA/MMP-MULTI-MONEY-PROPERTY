import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StarIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { BuildingStorefrontIcon, UserGroupIcon, BuildingOfficeIcon, HomeModernIcon } from "@heroicons/react/24/outline";

export default function AgentsDirectory() {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - Real Indian real estate agents
  useEffect(() => {
    const mockAgents = [
      {
        id: 1,
        name: "Rajesh Kumar",
        type: "broker",
        company: "Rajesh Properties",
        experience: "8 years",
        location: "Delhi",
        rating: 4.8,
        totalReviews: 127,
        propertiesListed: 45,
        specialties: ["Residential", "Commercial", "Luxury Homes"],
        languages: ["Hindi", "English", "Punjabi"],
        contact: {
          phone: "+91 98765 43210",
          email: "rajesh@rajeshproperties.com",
          address: "Connaught Place, Delhi"
        },
        about: "Experienced real estate broker with 8+ years in Delhi property market. Specialized in residential and commercial properties.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        verified: true,
        responseTime: "Within 2 hours"
      },
      {
        id: 2,
        name: "Priya Sharma",
        type: "builder",
        company: "Sharma Builders & Developers",
        experience: "12 years",
        location: "Mumbai",
        rating: 4.9,
        totalReviews: 89,
        propertiesListed: 23,
        specialties: ["Luxury Apartments", "Commercial Complexes"],
        languages: ["Hindi", "English", "Marathi"],
        contact: {
          phone: "+91 87654 32109",
          email: "priya@sharmabuilders.com",
          address: "Bandra West, Mumbai"
        },
        about: "Leading builder and developer in Mumbai with 12+ years experience. Known for quality construction and timely delivery.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
        verified: true,
        responseTime: "Within 1 hour"
      },
      {
        id: 3,
        name: "Amit Patel",
        type: "channel-partner",
        company: "Property Solutions India",
        experience: "6 years",
        location: "Bangalore",
        rating: 4.7,
        totalReviews: 156,
        propertiesListed: 67,
        specialties: ["IT Parks", "Startup Offices", "Residential"],
        languages: ["Hindi", "English", "Kannada"],
        contact: {
          phone: "+91 76543 21098",
          email: "amit@propertyindia.com",
          address: "Koramangala, Bangalore"
        },
        about: "Channel partner specializing in IT corridor properties. Strong network in Bangalore real estate market.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        verified: true,
        responseTime: "Within 30 minutes"
      },
      {
        id: 4,
        name: "Sunil Gupta",
        type: "developer",
        company: "Gupta Infrastructure",
        experience: "15 years",
        location: "Gurgaon",
        rating: 4.6,
        totalReviews: 203,
        propertiesListed: 34,
        specialties: ["Township Projects", "Commercial Hubs"],
        languages: ["Hindi", "English"],
        contact: {
          phone: "+91 65432 10987",
          email: "sunil@guptainfra.com",
          address: "DLF Phase 3, Gurgaon"
        },
        about: "Real estate developer with 15+ years experience in developing integrated townships and commercial hubs.",
        image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400",
        verified: true,
        responseTime: "Within 4 hours"
      },
      {
        id: 5,
        name: "Neha Singh",
        type: "broker",
        company: "Neha Realty Services",
        experience: "5 years",
        location: "Pune",
        rating: 4.5,
        totalReviews: 78,
        propertiesListed: 32,
        specialties: ["Residential", "Villas", "Plots"],
        languages: ["Hindi", "English", "Marathi"],
        contact: {
          phone: "+91 54321 09876",
          email: "neha@neharealty.com",
          address: "Koregaon Park, Pune"
        },
        about: "Young and dynamic real estate broker with excellent customer service and deep knowledge of Pune market.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        verified: false,
        responseTime: "Within 1 hour"
      },
      {
        id: 6,
        name: "Vikram Mehta",
        type: "builder",
        company: "Mehta Constructions",
        experience: "10 years",
        location: "Hyderabad",
        rating: 4.4,
        totalReviews: 92,
        propertiesListed: 28,
        specialties: ["Affordable Housing", "Gated Communities"],
        languages: ["Hindi", "English", "Telugu"],
        contact: {
          phone: "+91 43210 98765",
          email: "vikram@mehtaconstructions.com",
          address: "Gachibowli, Hyderabad"
        },
        about: "Builder focused on affordable housing projects and gated communities in Hyderabad.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        verified: true,
        responseTime: "Within 3 hours"
      }
    ];

    setAgents(mockAgents);
    setFilteredAgents(mockAgents);
  }, []);

  // Filter agents based on search and filters
  useEffect(() => {
    let filtered = agents;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(agent => agent.type === selectedType);
    }

    // Location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter(agent => agent.location === selectedLocation);
    }

    setFilteredAgents(filtered);
  }, [searchTerm, selectedType, selectedLocation, agents]);

  const getTypeIcon = (type) => {
    const icons = {
      broker: UserGroupIcon,
      builder: BuildingOfficeIcon,
      developer: HomeModernIcon,
      "channel-partner": BuildingStorefrontIcon
    };
    return icons[type] || UserGroupIcon;
  };

  const getTypeLabel = (type) => {
    const labels = {
      broker: "Property Broker",
      builder: "Builder",
      developer: "Developer",
      "channel-partner": "Channel Partner"
    };
    return labels[type] || "Real Estate Professional";
  };

  const getLocations = () => {
    return [...new Set(agents.map(agent => agent.location))];
  };

  const viewAgentDetails = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Find <span className="text-[#ff9c00]">Real Estate Agents</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with verified brokers, builders, developers, and channel partners across India
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Search by name, location, company, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all"
              />
            </div>
            
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all"
            >
              <option value="all">All Types</option>
              <option value="broker">Broker</option>
              <option value="builder">Builder</option>
              <option value="developer">Developer</option>
              <option value="channel-partner">Channel Partner</option>
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all"
            >
              <option value="all">All Locations</option>
              {getLocations().map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-[#ff9c00]">{filteredAgents.length}</span> agents
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => {
            const TypeIcon = getTypeIcon(agent.type);
            return (
              <div 
                key="" 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                // onClick={() => viewAgentDetails(agent)}
              >
                {/* Agent Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start space-x-4">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#ff9c00]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                        {agent.verified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{agent.company}</p>
                      <div className="flex items-center mt-1">
                        <TypeIcon className="w-4 h-4 text-[#ff9c00] mr-1" />
                        <span className="text-sm text-gray-500">{getTypeLabel(agent.type)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Details */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span className="ml-1 font-semibold text-gray-900">{agent.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{agent.totalReviews} reviews</span>
                    </div>
                    <span className="text-sm text-gray-500">{agent.experience}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">{agent.location}</span>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.specialties.slice(0, 3).map((specialty, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-[#ff9c00] text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {agent.specialties.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{agent.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-center border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-lg font-bold text-[#ff9c00]">{agent.propertiesListed}</p>
                      <p className="text-xs text-gray-500">Properties</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#ff9c00]">{agent.responseTime}</p>
                      <p className="text-xs text-gray-500">Response Time</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#ff9c00]">{agent.rating}/5</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
                setSelectedLocation("all");
              }}
              className="bg-[#ff9c00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ff7b00] transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Agent Details Modal */}
      {showModal && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedAgent.image}
                    alt={selectedAgent.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#ff9c00]"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedAgent.name}</h2>
                    <p className="text-gray-600">{selectedAgent.company}</p>
                    <div className="flex items-center mt-1">
                      {React.createElement(getTypeIcon(selectedAgent.type), { 
                        className: "w-5 h-5 text-[#ff9c00] mr-2" 
                      })}
                      <span className="text-gray-500">{getTypeLabel(selectedAgent.type)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Rating and Experience */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="ml-2 font-semibold text-gray-900">{selectedAgent.rating}/5</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{selectedAgent.totalReviews} reviews</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">{selectedAgent.experience}</p>
                  <p className="text-sm text-gray-600 mt-1">Experience</p>
                </div>
              </div>

              {/* About */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600">{selectedAgent.about}</p>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <PhoneIcon className="w-5 h-5 mr-3 text-[#ff9c00]" />
                    <span>{selectedAgent.contact.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <EnvelopeIcon className="w-5 h-5 mr-3 text-[#ff9c00]" />
                    <span>{selectedAgent.contact.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="w-5 h-5 mr-3 text-[#ff9c00]" />
                    <span>{selectedAgent.contact.address}</span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.languages.map((language, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-[#ff9c00] text-white py-3 rounded-lg font-semibold hover:bg-[#ff7b00] transition-all">
                  Contact Now
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all">
                  View Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}