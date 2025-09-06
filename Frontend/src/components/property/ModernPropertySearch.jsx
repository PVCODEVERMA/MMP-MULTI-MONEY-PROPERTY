import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  HeartIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { projectsData, cities, propertyTypes } from '../../data/projectsData.js';

const ModernPropertySearch = () => {
  const [projects, setProjects] = useState(projectsData);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: "all",
    type: "all",
    priceMin: "",
    priceMax: "", 
    bedrooms: "any",
    sort: "newest"
  });

  // Search and filter logic (same as before but cleaner)
  useEffect(() => {
    let result = projects;
    
    if (searchQuery) {
      result = result.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.area.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.city !== "all") {
      result = result.filter(project => project.city === filters.city);
    }
    
    if (filters.type !== "all") {
      result = result.filter(project => project.type === filters.type);
    }
    
    if (filters.bedrooms !== "any") {
      const numBedrooms = parseInt(filters.bedrooms);
      result = result.filter(project => project.bedrooms >= numBedrooms);
    }
    
    // Sort logic
    if (filters.sort === "newest") {
      result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filters.sort === "price-low") {
      result = [...result].sort((a, b) => {
        const aPrice = parseInt(a.priceRange.match(/\d+/)[0]);
        const bPrice = parseInt(b.priceRange.match(/\d+/)[0]);
        return aPrice - bPrice;
      });
    }
    
    setFilteredProjects(result);
  }, [searchQuery, filters, projects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Search Section */}
      <div className="relative bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Find Your Perfect Property
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover premium properties across India with our modern search experience
            </p>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location, project name, or developer..."
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-0 focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                  Search Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and View Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters {showFilters && <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full ml-2">Active</span>}
            </button>
            
            <select
              value={filters.sort}
              onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              <span className="font-semibold text-indigo-600">{filteredProjects.length}</span> properties found
            </span>
            
            <div className="flex bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select
                    value={filters.city}
                    onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Types</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="any">Any</option>
                    <option value="1">1+ BHK</option>
                    <option value="2">2+ BHK</option>
                    <option value="3">3+ BHK</option>
                    <option value="4">4+ BHK</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFilters({
                        city: "all",
                        type: "all", 
                        priceMin: "",
                        priceMax: "",
                        bedrooms: "any",
                        sort: "newest"
                      });
                      setSearchQuery("");
                    }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Property Results */}
        {filteredProjects.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
          }>
            {filteredProjects.map(project => (
              <PropertyCard 
                key={project.id} 
                project={project} 
                viewMode={viewMode} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto h-32 w-32 text-gray-300 mb-4">
              <MagnifyingGlassIcon className="h-full w-full" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setFilters({
                  city: "all",
                  type: "all",
                  priceMin: "",
                  priceMax: "",
                  bedrooms: "any", 
                  sort: "newest"
                });
                setSearchQuery("");
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Property Card Component
const PropertyCard = ({ project, viewMode }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
        viewMode === 'list' ? 'flex' : 'flex flex-col'
      }`}
    >
      <div className={`relative ${viewMode === 'list' ? 'w-80 flex-shrink-0' : ''}`}>
        <img 
          src={project.photo} 
          alt={project.name} 
          className={`object-cover ${viewMode === 'list' ? 'w-full h-48' : 'w-full h-56'}`}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {project.featured && (
            <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center shadow-sm">
              <StarIcon className="h-3 w-3 mr-1" /> Featured
            </span>
          )}
          {project.sponsored && (
            <span className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              Sponsored
            </span>
          )}
        </div>
        
        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <HeartIcon 
            className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>
        
        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
          </span>
        </div>
      </div>
      
      <div className={`p-6 flex-grow flex flex-col ${viewMode === 'list' ? 'justify-between' : ''}`}>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
          <div className="flex items-center text-gray-600 mb-3">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{project.area}, {project.city}</span>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        </div>
        
        {/* Property Details */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <div className="font-semibold text-gray-900">{project.bedrooms}</div>
            <div className="text-xs text-gray-500">Bedrooms</div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <div className="font-semibold text-gray-900">{project.bathrooms}</div>
            <div className="text-xs text-gray-500">Bathrooms</div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <div className="font-semibold text-gray-900">{project.size}</div>
            <div className="text-xs text-gray-500">Size</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div>
            <p className="text-2xl font-bold text-indigo-600">{project.priceRange}</p>
            <p className="text-xs text-gray-500">{project.leads} leads</p>
          </div>
          
          <Link 
            to={project.hasSubscriptionPlans 
              ? `/subscription-plans/${project.id}` 
              : `/land-plans/${project.id}`
            }
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernPropertySearch;
