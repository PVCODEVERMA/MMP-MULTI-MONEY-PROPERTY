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
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Sample images (replace with your actual imports)
import lands01 from "../assets/home-img/Lands01.avif";
import lands02 from "../assets/home-img/Lands02.avif";
import lands03 from "../assets/home-img/Lands03.avif";
import lands04 from "../assets/home-img/Lands04.avif";
import lands05 from "../assets/home-img/Lands04.avif";
import lands06 from "../assets/home-img/Lands05.avif";
import lands07 from "../assets/home-img/Lands06.avif";

import mumbai from "../assets/projectListing/Mumbai.avif";
import delhi from "../assets/projectListing/Delhi.jpg";
import bangalore from "../assets/projectListing/Bangalore.avif";
import chennai from "../assets/projectListing/Chennai.avif";
import hyderabad from "../assets/projectListing/Hadapsar.avif";
import ahmedabad from "../assets/projectListing/Ahmedabad.avif";
import StatsSection from "./ReviewsSection";
import HappyBrokersSection from "./HappyBrokersSection";
import TrustBadgesSection from "./TrustBadgesSection";
import SuccessStoriesSection from "./SuccessStoriesSection";

// Sample data for projects
const projects = [
  {
    id: 1,
    name: "Godrej Greens",
    city: "Ahmedabad",
    area: "Prahlad Nagar",
    priceRange: "₹60L - 1.2Cr",
    description: "Luxury apartments with modern amenities and green spaces",
    photo: lands01,
    featured: true,
    sponsored: false,
    leads: 42,
  },
  {
    id: 2,
    name: "DLF Park",
    city: "Gurgaon",
    area: "Sector 56",
    priceRange: "₹80L - 2.0Cr",
    description: "Premium residential complex with world-class facilities",
    photo: lands02,
    featured: true,
    sponsored: true,
    leads: 38,
  },
  {
    id: 3,
    name: "Sobha Elite",
    city: "Bangalore",
    area: "Whitefield",
    priceRange: "₹1Cr - 3Cr",
    description: "Elegant living spaces with panoramic city views",
    photo: lands03,
    featured: true,
    sponsored: false,
    leads: 56,
  },
  {
    id: 4,
    name: "Prestige Lakeside",
    city: "Chennai",
    area: "OMR",
    priceRange: "₹90L - 2.5Cr",
    description: "Waterfront residences with exclusive clubhouse",
    photo: lands04,
    featured: true,
    sponsored: true,
    leads: 29,
  },
  {
    id: 5,
    name: "Lodha Bellissimo",
    city: "Mumbai",
    area: "Lower Parel",
    priceRange: "₹1.5Cr - 4Cr",
    description: "Ultra-luxury towers with concierge services",
    photo: lands05,
    featured: true,
    sponsored: true,
    leads: 67,
  },
  {
    id: 6,
    name: "Lodha Bellissimo",
    city: "Mumbai",
    area: "Lower Parel",
    priceRange: "₹1.5Cr - 4Cr",
    description: "Ultra-luxury towers with concierge services",
    photo: lands05,
    featured: true,
    sponsored: true,
    leads: 67,
  },
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
    photo: lands06,
    featured: false,
    sponsored: false,
    leads: 18,
  },
  {
    id: 7,
    name: "Brigade Metropolis",
    city: "Bangalore",
    area: "Mahadevapura",
    priceRange: "₹85L - 1.5Cr",
    description: "Modern apartments with convenient access to IT hubs",
    photo: lands07,
    featured: false,
    sponsored: false,
    leads: 22,
  },
];

// City data
const cities = [
  { name: "Mumbai", count: 124, image: mumbai },
  { name: "Delhi", count: 98, image: delhi },
  { name: "Bangalore", count: 156, image: bangalore },
  { name: "Chennai", count: 76, image: chennai },
  { name: "Hyderabad", count: 89, image: hyderabad },
  { name: "Ahmedabad", count: 64, image: ahmedabad },
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
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
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
        >
          <img
            src={projects[currentIndex].photo}
            alt={projects[currentIndex].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-transparent bg-opacity-40"></div>
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
            Verified real estate leads, seamless payments, and easy broker
            management
          </motion.p>
          <Link to="/projectsListing">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg flex items-center justify-center mx-auto transition-all hover:scale-105 cursor-pointer"
            >
              Explore Properties <ArrowRightIcon className="ml-2 h-5 w-5" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Project Info Card - Responsive positioning */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute left-4 right-4 md:left-8 bottom-4 md:bottom-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-2xl max-w-md mx-auto md:mx-0"
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
        <h2 className="text-xl md:text-2xl font-bold text-indigo-900 mb-2">
          {projects[currentIndex].name}
        </h2>
        <div className="flex items-center text-indigo-700 mb-2">
          <MapPinIcon className="h-4 w-4 mr-1" />
          {projects[currentIndex].area}, {projects[currentIndex].city}
        </div>
        <p className="text-gray-600 text-sm md:text-base mb-4">
          {projects[currentIndex].description}
        </p>
        <p className="text-green-600 font-semibold text-lg md:text-xl mb-4">
          {projects[currentIndex].priceRange}
        </p>
        <Link to="/lead-form">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer">
            Request Information
          </button>
        </Link>
      </motion.div>

      {/* Navigation Arrows - Responsive positioning */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
      >
        <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6 text-indigo-900 cursor-pointer" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
      >
        <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6 text-indigo-900 cursor-pointer" />
      </button>

      {/* Play/Pause Button - Responsive positioning */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute right-2 md:right-4 top-2 md:top-4 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
      >
        {isPlaying ? (
          <PauseIcon className="h-5 w-5 md:h-6 md:w-6 text-indigo-900" />
        ) : (
          <PlayIcon className="h-5 w-5 md:h-6 md:w-6 text-indigo-900" />
        )}
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
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
        <h3 className="text-xl font-bold mb-2 text-indigo-900">
          {project.name}
        </h3>
        <div className="flex items-center text-indigo-700 mb-2">
          <MapPinIcon className="h-4 w-4 mr-1" />
          {project.area}, {project.city}
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {project.description}
        </p>
        <p className="text-green-600 font-semibold text-lg mb-4">
          {project.priceRange}
        </p>
        <Link to="/lead-form">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full">
            Contact Now
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

// Home Page Component
export default function Home() {
  const [activeTab, setActiveTab] = useState("featured");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Carousel />

      {/* Cities Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8 md:mb-12">
          Explore Properties by City LeadsGorilla Today…
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 mb-12 md:mb-16">
          {cities.map((city) => (
            <motion.div
              key={city.name}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-20 md:h-24 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="font-semibold text-indigo-900 text-sm md:text-base">
                  {city.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {city.count} properties
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs for Featured vs All */}
        <div className="bg-white rounded-xl shadow-sm p-2 flex mb-6 md:mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("featured")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors text-sm md:text-base cursor-pointer ${
              activeTab === "featured"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:text-indigo-700"
            }`}
          >
            Featured Properties
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors text-sm md:text-base cursor-pointer ${
              activeTab === "all"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:text-indigo-700"
            }`}
          >
            All Properties
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {(activeTab === "featured"
            ? projects
            : [...projects, ...freeListings]
          ).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <StatsSection />
      <HappyBrokersSection />
      <StatsSection />
      <TrustBadgesSection />
      <SuccessStoriesSection />

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who found their perfect home
            through MMP Hybrid Portal
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <button className="bg-white text-indigo-900 hover:bg-gray-100 font-bold py-2 md:py-3 px-6 md:px-8 rounded-full text-base md:text-lg transition-all flex items-center justify-center">
              Browse Properties{" "}
              <ArrowRightIcon className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button className="bg-transparent border border-white hover:bg-indigo-800 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-full text-base md:text-lg transition-all">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
