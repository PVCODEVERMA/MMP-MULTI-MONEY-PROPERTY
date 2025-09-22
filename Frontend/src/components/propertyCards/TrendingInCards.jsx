import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPinIcon } from "@heroicons/react/24/outline";

// images
import image01 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_01.avif";
import image02 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_02.avif";
import image03 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_03.avif";
import image04 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_04.avif";
import image05 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_05.avif";
import image06 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_06.avif";
import image07 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_07.avif";
import image08 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_08.avif";
import image09 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_09.avif";
import image10 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_10.avif";
import image11 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_11.avif";
import image12 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_12.avif";
import image13 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_13.avif";
import image14 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_14.avif";
import image15 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_15.avif";
import image16 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_16.avif";
import image17 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_17.avif";
import image18 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_18.avif";
import image19 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_19.avif";
import image20 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_20.avif";

// Dummy property data
const properties = [
  {
    id: 1,
    bhk: "2 BHK Flat",
    price: "₹45 Lac",
    location: "Budh Vihar, New Delhi",
    possession: "Ready to Move",
    images: 3,
    image: image01,
    postedBy: "Owner",
    postedTime: "Today",
    ownerName: "Rajesh Kumar",
  },
  {
    id: 2,
    bhk: "3 BHK Apartment",
    price: "₹67 Lac",
    location: "Indirapuram, Ghaziabad",
    possession: "Under Construction",
    images: 5,
    image: image02,
    postedBy: "Owner",
    postedTime: "Yesterday",
    ownerName: "Suman Sharma",
  },
  {
    id: 3,
    bhk: "1 BHK Studio",
    price: "₹25 Lac",
    location: "Noida Sector 62",
    possession: "Ready to Move",
    images: 2,
    image: image03,
    postedBy: "Owner",
    postedTime: "2 days ago",
    ownerName: "Mohit Verma",
  },
  {
    id: 4,
    bhk: "4 BHK Villa",
    price: "₹1.5 Cr",
    location: "Golf Course Road, Gurgaon",
    possession: "Ready to Move",
    images: 8,
    image: image04,
    postedBy: "Owner",
    postedTime: "3 days ago",
    ownerName: "Anita Singh",
  },
  {
    id: 5,
    bhk: "2 BHK Builder Floor",
    price: "₹38 Lac",
    location: "Dwarka Mor, New Delhi",
    possession: "Under Construction",
    images: 4,
    image: image05,
    postedBy: "Owner",
    postedTime: "4 days ago",
    ownerName: "Pooja Sharma",
  },
  {
    id: 6,
    bhk: "3 BHK Flat",
    price: "₹72 Lac",
    location: "Kaushambi, Ghaziabad",
    possession: "Ready to Move",
    images: 6,
    image: image06,
    postedBy: "Owner",
    postedTime: "5 days ago",
    ownerName: "Vikas Gupta",
  },
  {
    id: 7,
    bhk: "1 RK Apartment",
    price: "₹15 Lac",
    location: "Laxmi Nagar, Delhi",
    possession: "Ready to Move",
    images: 2,
    image: image07,
    postedBy: "Owner",
    postedTime: "6 days ago",
    ownerName: "Rohit Yadav",
  },
  {
    id: 8,
    bhk: "5 BHK Penthouse",
    price: "₹2.5 Cr",
    location: "Sector 50, Noida",
    possession: "Ready to Move",
    images: 10,
    image: image08,
    postedBy: "Owner",
    postedTime: "1 week ago",
    ownerName: "Neha Kapoor",
  },
  {
    id: 9,
    bhk: "2 BHK Flat",
    price: "₹52 Lac",
    location: "Vaishali, Ghaziabad",
    possession: "Under Construction",
    images: 5,
    image: image09,
    postedBy: "Owner",
    postedTime: "1 week ago",
    ownerName: "Arun Mehta",
  },
  {
    id: 10,
    bhk: "3 BHK Villa",
    price: "₹1.2 Cr",
    location: "South Extension, Delhi",
    possession: "Ready to Move",
    images: 7,
    image: image10,
    postedBy: "Owner",
    postedTime: "1 week ago",
    ownerName: "Deepak Malhotra",
  },
  {
    id: 11,
    bhk: "1 BHK Flat",
    price: "₹22 Lac",
    location: "Uttam Nagar, Delhi",
    possession: "Ready to Move",
    images: 3,
    image: image11,
    postedBy: "Owner",
    postedTime: "2 weeks ago",
    ownerName: "Karan Singh",
  },
  {
    id: 12,
    bhk: "2 BHK Flat",
    price: "₹48 Lac",
    location: "Raj Nagar Extension, Ghaziabad",
    possession: "Under Construction",
    images: 4,
    image: image12,
    postedBy: "Owner",
    postedTime: "2 weeks ago",
    ownerName: "Meena Rani",
  },
  {
    id: 13,
    bhk: "4 BHK Apartment",
    price: "₹1.3 Cr",
    location: "DLF Phase 3, Gurgaon",
    possession: "Ready to Move",
    images: 9,
    image: image13,
    postedBy: "Owner",
    postedTime: "2 weeks ago",
    ownerName: "Siddharth Jain",
  },
  {
    id: 14,
    bhk: "2 BHK Builder Floor",
    price: "₹36 Lac",
    location: "Burari, Delhi",
    possession: "Ready to Move",
    images: 3,
    image: image14,
    postedBy: "Owner",
    postedTime: "2 weeks ago",
    ownerName: "Ravi Kumar",
  },
  {
    id: 15,
    bhk: "3 BHK Flat",
    price: "₹85 Lac",
    location: "Sector 137, Noida",
    possession: "Under Construction",
    images: 6,
    image: image15,
    postedBy: "Owner",
    postedTime: "3 weeks ago",
    ownerName: "Pankaj Verma",
  },
  {
    id: 16,
    bhk: "1 BHK Studio",
    price: "₹20 Lac",
    location: "Khora Colony, Ghaziabad",
    possession: "Ready to Move",
    images: 2,
    image: image16,
    postedBy: "Owner",
    postedTime: "3 weeks ago",
    ownerName: "Sneha Patel",
  },
  {
    id: 17,
    bhk: "5 BHK Villa",
    price: "₹2.8 Cr",
    location: "Greater Kailash, Delhi",
    possession: "Ready to Move",
    images: 12,
    image: image17,
    postedBy: "Owner",
    postedTime: "3 weeks ago",
    ownerName: "Harpreet Kaur",
  },
  {
    id: 18,
    bhk: "2 BHK Flat",
    price: "₹55 Lac",
    location: "Patparganj, Delhi",
    possession: "Under Construction",
    images: 5,
    image: image18,
    postedBy: "Owner",
    postedTime: "3 weeks ago",
    ownerName: "Sameer Khan",
  },
  {
    id: 19,
    bhk: "3 BHK Apartment",
    price: "₹90 Lac",
    location: "Sector 82, Gurgaon",
    possession: "Ready to Move",
    images: 7,
    image: image19,
    postedBy: "Owner",
    postedTime: "1 month ago",
    ownerName: "Anjali Mishra",
  },
  {
    id: 20,
    bhk: "4 BHK Penthouse",
    price: "₹3 Cr",
    location: "Sector 150, Noida",
    possession: "Ready to Move",
    images: 15,
    image: image20,
    postedBy: "Owner",
    postedTime: "1 month ago",
    ownerName: "Ramesh Arora",
  },
];


const TrendingInCards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const cities = ["New Delhi", "Noida", "Gurgaon", "Faridabad", "Mumbai"];

  // Fade-in animation
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Typewriter Effect
  useEffect(() => {
    const currentCity = cities[currentCityIndex];

    const handleType = () => {
      if (isDeleting) {
        setDisplayText(currentCity.substring(0, displayText.length - 1));
        setTypingSpeed(75);
      } else {
        setDisplayText(currentCity.substring(0, displayText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayText === currentCity) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentCityIndex((prev) => (prev + 1) % cities.length);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentCityIndex, typingSpeed]);

  return (
    <div className="bg-[#F7F7F7]">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-6"
        >
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-2"
            style={{ color: "#164058" }}
          >
            Trending in{" "}
            <span className="text-[#FFA100] min-h-[2.5rem] inline-block">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>{" "}
            Leads
          </h2>
          <a
            href="#"
            className="hidden sm:inline-flex items-center text-sm font-medium text-[#164058] hover:text-[#FF9C00] gap-2"
          >
            View All Properties
            
          </a>
        </motion.div>

        {/* Mobile/Tablet → Horizontal scroll */}
        <div className="sm:hidden overflow-x-auto">
          <div className="flex gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Desktop Grid with Pagination */}
        <div className="hidden sm:block">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties
              .slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
              )
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 0))
              }
              disabled={currentPage === 0}
              className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-[#FF9C00] hover:text-white rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-[#FF9C00] hover:text-white rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable Card Component
const PropertyCard = ({ property }) => (
  <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group min-w-[280px] lg:min-w-0">
    <div className="relative h-48">
      <img
        src={property.image}
        alt={`${property.bhk} at ${property.location}`}
        className="w-full h-full object-cover cursor-pointer"
      />
      <span className="absolute top-2 left-2 bg-[#164057] bg-opacity-60 text-[#F7F7F7] text-xs px-2 py-1 rounded">
        {property.images} Photos
      </span>
      <a
        href={`/property/${property.id}`}
        className="absolute bottom-0 left-0 w-full bg-[#FF9C00] text-[#F7F7F7] text-center py-2 font-medium translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        View Details
      </a>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-[#164058] mb-1">
        {property.bhk}
      </h3>
      <p className="text-sm text-gray-600 mb-2">{property.price}</p>
      <div className="flex items-center text-sm text-[#164058] line-clamp-2">
        <span className="flex gap-2">
          <MapPinIcon className="h-4 w-4 mt-0.5 text-[#FF9C00]" />
          {property.location}
        </span>
      </div>
      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
        <span>By {property.postedBy}</span>
        <span>{property.postedTime}</span>
      </div>
    </div>
  </div>
);

export default TrendingInCards;