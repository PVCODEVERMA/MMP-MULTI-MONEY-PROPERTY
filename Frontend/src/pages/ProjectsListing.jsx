import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPinIcon,
  StarIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  ArrowTopRightOnSquareIcon 
} from "@heroicons/react/24/outline";

import ahmedabaadImag from "../assets/projectListing/Ahmedabad.avif";
import bangaloreImag from "../assets/projectListing/Bangalore.avif";
import bangaloreImag02 from "../assets/projectListing/Bangalore02.avif";
import chennaiImag from "../assets/projectListing/chennai.avif";
import hadapsarImag from "../assets/projectListing/Hadapsar.avif";
import mumbaiImag from "../assets/projectListing/mumbai.avif";
import gurgaonImg from "../assets/projectListing/Gurgaon.avif";
import { Link } from "react-router-dom";

// Sample data for projects
const projectsData = [
  { 
    id: 1, 
    name: "Godrej Greens", 
    city: "Ahmedabad", 
    area: "Prahlad Nagar",
    priceRange: "₹60L - 1.2Cr", 
    description: "Luxury apartments with modern amenities and green spaces",
    photo: ahmedabaadImag,
    type: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    size: "1200 sq ft",
    featured: true,
    sponsored: false,
    leads: 42,
    date: "2023-10-15"
  },
  { 
    id: 2, 
    name: "DLF Park", 
    city: "Gurgaon", 
    area: "Sector 56",
    priceRange: "₹80L - 2.0Cr", 
    description: "Premium residential complex with world-class facilities",
    photo: gurgaonImg,
    type: "villa",
    bedrooms: 4,
    bathrooms: 3,
    size: "2400 sq ft",
    featured: true,
    sponsored: true,
    leads: 38,
    date: "2023-11-05"
  },
  { 
    id: 3, 
    name: "Sobha Elite", 
    city: "Bangalore", 
    area: "Whitefield",
    priceRange: "₹1Cr - 3Cr", 
    description: "Elegant living spaces with panoramic city views",
    photo: bangaloreImag,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: "1100 sq ft",
    featured: true,
    sponsored: false,
    leads: 56,
    date: "2023-09-22"
  },
  { 
    id: 4, 
    name: "Prestige Lakeside", 
    city: "Chennai", 
    area: "OMR",
    priceRange: "₹90L - 2.5Cr", 
    description: "Waterfront residences with exclusive clubhouse",
    photo: chennaiImag,
    type: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    size: "1350 sq ft",
    featured: true,
    sponsored: true,
    leads: 29,
    date: "2023-10-30"
  },
  { 
    id: 5, 
    name: "Lodha Bellissimo", 
    city: "Mumbai", 
    area: "Lower Parel",
    priceRange: "₹1.5Cr - 4Cr", 
    description: "Ultra-luxury towers with concierge services",
    photo: mumbaiImag,
    type: "penthouse",
    bedrooms: 5,
    bathrooms: 4,
    size: "3200 sq ft",
    featured: true,
    sponsored: true,
    leads: 67,
    date: "2023-11-12"
  },
  { 
    id: 6, 
    name: "Amanora Park", 
    city: "Pune", 
    area: "Hadapsar",
    priceRange: "₹50L - 90L", 
    description: "Affordable homes with community amenities",
    photo: "",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: "950 sq ft",
    featured: false,
    sponsored: false,
    leads: 18,
    date: "2023-08-17"
  },
  { 
    id: 7, 
    name: "Brigade Metropolis", 
    city: "Bangalore", 
    area: "Mahadevapura",
    priceRange: "₹85L - 1.5Cr", 
    description: "Modern apartments with convenient access to IT hubs",
    photo: bangaloreImag02,
    type: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    size: "1250 sq ft",
    featured: false,
    sponsored: false,
    leads: 22,
    date: "2023-09-05"
  },
  { 
    id: 8, 
    name: "Mahindra Windchimes", 
    city: "Chennai", 
    area: "Anna Nagar",
    priceRange: "₹75L - 1.8Cr", 
    description: "Eco-friendly homes with ample ventilation",
    photo: hadapsarImag,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: "1150 sq ft",
    featured: false,
    sponsored: false,
    leads: 15,
    date: "2023-07-28"
  }
];

// Extract unique cities and property types for filters
const cities = [...new Set(projectsData.map(project => project.city))];
const propertyTypes = [...new Set(projectsData.map(project => project.type))];

// Move getPropertyTypeIcon function outside the component so it can be used by both components
const getPropertyTypeIcon = (type) => {
  switch(type) {
    case "apartment": return <BuildingOfficeIcon className="h-5 w-5" />;
    case "villa": return <HomeIcon className="h-5 w-5" />;
    case "penthouse": return <BuildingStorefrontIcon className="h-5 w-5" />;
    default: return <HomeIcon className="h-5 w-5" />;
  }
};

const ProjectsListing = () => {
  const [projects, setProjects] = useState(projectsData);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    city: "all",
    type: "all",
    minPrice: "",
    maxPrice: "",
    bedrooms: "any",
    sort: "newest"
  });
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters and search
  useEffect(() => {
    let result = projects;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.area.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply city filter
    if (filters.city !== "all") {
      result = result.filter(project => project.city === filters.city);
    }
    
    // Apply property type filter
    if (filters.type !== "all") {
      result = result.filter(project => project.type === filters.type);
    }
    
    // Apply bedrooms filter
    if (filters.bedrooms !== "any") {
      const numBedrooms = parseInt(filters.bedrooms);
      result = result.filter(project => project.bedrooms >= numBedrooms);
    }
    
    // Apply sorting
    if (filters.sort === "newest") {
      result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filters.sort === "price-low") {
      result = [...result].sort((a, b) => {
        const aPrice = parseInt(a.priceRange.match(/\d+/)[0]);
        const bPrice = parseInt(b.priceRange.match(/\d+/)[0]);
        return aPrice - bPrice;
      });
    } else if (filters.sort === "price-high") {
      result = [...result].sort((a, b) => {
        const aPrice = parseInt(a.priceRange.match(/\d+/)[0]);
        const bPrice = parseInt(b.priceRange.match(/\d+/)[0]);
        return bPrice - aPrice;
      });
    } else if (filters.sort === "popular") {
      result = [...result].sort((a, b) => b.leads - a.leads);
    }
    
    setFilteredProjects(result);
  }, [searchQuery, filters, projects]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      city: "all",
      type: "all",
      minPrice: "",
      maxPrice: "",
      bedrooms: "any",
      sort: "newest"
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Find Your Dream Property</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our curated selection of premium properties across India's top cities
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by project, city or area..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg transition-colors"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                Filters
              </button>
              
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
          
          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">All Types</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <select
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="any">Any</option>
                    <option value="1">1+ Bedroom</option>
                    <option value="2">2+ Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProjects.length}</span> properties
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Sort by:</span>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              className="border-0 text-sm focus:ring-0"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
        
        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} getPropertyTypeIcon={getPropertyTypeIcon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-300">
              <HomeIcon className="h-full w-full" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, getPropertyTypeIcon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer h-full flex flex-col"
    >
      <div className="relative">
        <img 
          src={project.photo} 
          alt={project.name} 
          className="w-full h-48 object-cover" 
        />
        <div className="absolute top-3 left-3 flex space-x-2">
          {project.featured && (
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
              <StarIcon className="h-3 w-3 mr-1" /> Featured
            </span>
          )}
          {project.sponsored && (
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Sponsored
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
            {getPropertyTypeIcon(project.type)}
            <span className="ml-1">{project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {project.leads} leads
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-indigo-900">{project.name}</h3>
        <div className="flex items-center text-indigo-700 mb-2">
          <MapPinIcon className="h-4 w-4 mr-1" />
          {project.area}, {project.city}
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{project.description}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-100 rounded-lg">
            <div className="font-semibold">{project.bedrooms}</div>
            <div className="text-xs text-gray-500">Bedrooms</div>
          </div>
          <div className="text-center p-2 bg-gray-100 rounded-lg">
            <div className="font-semibold">{project.bathrooms}</div>
            <div className="text-xs text-gray-500">Bathrooms</div>
          </div>
          <div className="text-center p-2 bg-gray-100 rounded-lg">
            <div className="font-semibold">{project.size}</div>
            <div className="text-xs text-gray-500">Size</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <p className="text-green-600 font-semibold text-lg">{project.priceRange}</p>
          
          <Link 
            to={`/projectDetailsView/${project.id}`}
            className="hidden md:flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            View Details
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsListing;