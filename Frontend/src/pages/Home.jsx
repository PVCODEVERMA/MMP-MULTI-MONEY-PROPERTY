import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  PlayIcon, 
  PauseIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  StarIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

// Sample data for projects
const projects = [
  { 
    id: 1, 
    name: "Godrej Greens", 
    city: "Ahmedabad", 
    area: "Prahlad Nagar",
    priceRange: "₹60L - 1.2Cr", 
    description: "Luxury apartments with modern amenities and green spaces",
    photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    sponsored: false,
    leads: 42
  },
  { 
    id: 2, 
    name: "DLF Park", 
    city: "Gurgaon", 
    area: "Sector 56",
    priceRange: "₹80L - 2.0Cr", 
    description: "Premium residential complex with world-class facilities",
    photo: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    sponsored: true,
    leads: 38
  },
  { 
    id: 3, 
    name: "Sobha Elite", 
    city: "Bangalore", 
    area: "Whitefield",
    priceRange: "₹1Cr - 3Cr", 
    description: "Elegant living spaces with panoramic city views",
    photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    sponsored: false,
    leads: 56
  },
  { 
    id: 4, 
    name: "Prestige Lakeside", 
    city: "Chennai", 
    area: "OMR",
    priceRange: "₹90L - 2.5Cr", 
    description: "Waterfront residences with exclusive clubhouse",
    photo: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    sponsored: true,
    leads: 29
  },
  { 
    id: 5, 
    name: "Lodha Bellissimo", 
    city: "Mumbai", 
    area: "Lower Parel",
    priceRange: "₹1.5Cr - 4Cr", 
    description: "Ultra-luxury towers with concierge services",
    photo: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    sponsored: true,
    leads: 67
  }
];

// Free listings data
const freeListings = [
  { 
    id: 6, 
    name: "Amanora Park", 
    city: "Pune", 
    area: "Hadapsar",
    priceRange: "₹50L - 90L", 
    description: "Affordable homes with community amenities",
    photo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    sponsored: false,
    leads: 18
  },
  { 
    id: 7, 
    name: "Brigade Metropolis", 
    city: "Bangalore", 
    area: "Mahadevapura",
    priceRange: "₹85L - 1.5Cr", 
    description: "Modern apartments with convenient access to IT hubs",
    photo: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    sponsored: false,
    leads: 22
  }
];

// City data
const cities = [
  { name: "Mumbai", count: 124, image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
  { name: "Delhi", count: 98, image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
  { name: "Bangalore", count: 156, image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
  { name: "Chennai", count: 76, image: "https://images.unsplash.com/photo-1532664189809-02133fee698d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
  { name: "Hyderabad", count: 89, image: "https://images.unsplash.com/photo-1590649880760-2d4b0f523de7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
  { name: "Ahmedabad", count: 64, image: "https://images.unsplash.com/photo-1564501049416-2c36b7720350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" }
];

// Carousel Component
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full absolute inset-0"
          style={{
            backgroundImage: `url(${projects[currentIndex].photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Welcome to MMP Hybrid Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8"
          >
            Verified real estate leads, seamless payments, and easy broker management
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg flex items-center justify-center mx-auto transition-all hover:scale-105"
          >
            Explore Properties <ArrowRightIcon className="ml-2 h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Project Info Card */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute left-8 bottom-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-2xl max-w-md"
      >
        <div className="flex items-center mb-2">
          {projects[currentIndex].featured && (
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center mr-2">
              <StarIcon className="h-3 w-3 mr-1" /> Featured
            </span>
          )}
          {projects[currentIndex].sponsored && (
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Sponsored
            </span>
          )}
        </div>
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">
          {projects[currentIndex].name}
        </h2>
        <div className="flex items-center text-indigo-700 mb-2">
          <MapPinIcon className="h-4 w-4 mr-1" />
          {projects[currentIndex].area}, {projects[currentIndex].city}
        </div>
        <p className="text-gray-600 mb-4">{projects[currentIndex].description}</p>
        <p className="text-green-600 font-semibold text-xl mb-4">
          {projects[currentIndex].priceRange}
        </p>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Request Information
        </button>
      </motion.div>

      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
      >
        <ChevronLeftIcon className="h-6 w-6 text-indigo-900" />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
      >
        <ChevronRightIcon className="h-6 w-6 text-indigo-900" />
      </button>

      {/* Play/Pause Button */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute right-4 top-4 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
      >
        {isPlaying ? (
          <PauseIcon className="h-6 w-6 text-indigo-900" />
        ) : (
          <PlayIcon className="h-6 w-6 text-indigo-900" />
        )}
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Lead Form Component
const LeadForm = ({ project }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in ${project.name}`
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert(`Thank you for your interest in ${project.name}! We'll contact you soon.`);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-indigo-900 mb-4">Request Information</h3>
      <p className="text-gray-600 mb-6">Get more details about this property</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Submit Request
        </button>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          By submitting this form, you agree to our Privacy Policy
        </p>
      </form>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, featured = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer h-full flex flex-col"
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
        <div className="absolute bottom-3 left-3">
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {project.leads} leads
          </span>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-indigo-900">{project.name}</h3>
        <div className="flex items-center text-indigo-700 mb-2">
          <MapPinIcon className="h-4 w-4 mr-1" />
          {project.area}, {project.city}
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{project.description}</p>
        <p className="text-green-600 font-semibold text-lg mb-4">{project.priceRange}</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full">
          Contact Now
        </button>
      </div>
    </motion.div>
  );
};

// City Page Component
const CityPage = ({ cityName }) => {
  const cityProjects = projects.filter(project => project.city === cityName);
  const allCityListings = [...cityProjects, ...freeListings.filter(listing => listing.city === cityName)];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Properties in {cityName}</h1>
          <p className="text-gray-600">Discover the best properties in {cityName}</p>
        </div>
        
        {/* Featured Listings */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
            <StarIcon className="h-6 w-6 mr-2 text-amber-500" /> Featured Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cityProjects.map(project => (
              <ProjectCard key={project.id} project={project} featured={true} />
            ))}
          </div>
        </div>
        
        {/* Free Listings */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-800 mb-6">Other Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freeListings
              .filter(listing => listing.city === cityName)
              .map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Page Component
export default function Home() {
  const [activeTab, setActiveTab] = useState('featured');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Carousel />
      
      {/* Cities Section */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">
          Explore Properties by City
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {cities.map(city => (
            <motion.div
              key={city.name}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            >
              <img 
                src={city.image} 
                alt={city.name} 
                className="w-full h-24 object-cover" 
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-indigo-900">{city.name}</h3>
                <p className="text-sm text-gray-600">{city.count} properties</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Tabs for Featured vs All */}
        <div className="bg-white rounded-xl shadow-sm p-2 flex mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('featured')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'featured' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-600 hover:text-indigo-700'
            }`}
          >
            Featured Properties
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-600 hover:text-indigo-700'
            }`}
          >
            All Properties
          </button>
        </div>
        
        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === 'featured' ? projects : [...projects, ...freeListings])
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          }
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who found their perfect home through MMP Hybrid Portal
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-indigo-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-all flex items-center justify-center">
              Browse Properties <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
            <button className="bg-transparent border border-white hover:bg-indigo-800 text-white font-bold py-3 px-8 rounded-full text-lg transition-all">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Example of how to use the CityPage component
// You would typically have this in a separate route
const MumbaiPage = () => <CityPage cityName="Mumbai" />;