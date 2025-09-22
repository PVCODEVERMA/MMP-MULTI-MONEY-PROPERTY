import React, { useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

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

// 🏠 Dummy property data (20 items)
export const properties = [
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

const TopProjects = () => {
  // for desktop pagination (4 cards per page)
  const itemsPerPage = 4;
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="bg-[#F7F7F7]">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#164058]">
            Top Projects <span className="text-[#FF9C00]">MMP</span>
          </h2>
          <a
            href="#"
            className="hidden sm:inline-block text-sm font-medium text-[#164058] hover:text-[#FF9C00]"
          >
            View All Properties
          </a>
        </div>

        {/* 📱 Mobile Horizontal Scroll */}
        <div className="sm:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="min-w-[80%] bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0"
              >
                <div className="relative h-52">
                  <img
                    src={property.image}
                    alt={property.bhk}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                  <span className="absolute top-2 left-2 bg-amber-400 bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                    {property.images} Photos
                  </span>
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
                  <Link
                    to={`/property/${property.id}`}
                    className="block text-center w-full mt-4 bg-[#FF9C00] text-white py-2 rounded-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 💻 Desktop Grid */}
        <div className="hidden sm:block">
          <div className="relative">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties
                .slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage
                )
                .map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden group relative hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.bhk}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 bg-[#164057] bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                        {property.images} Photos
                      </span>
                      <div className="absolute inset-0 bg-transparent bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Link
                          to={`/property/${property.id}`}
                          className="bg-[#FF9C00] text-white px-4 py-2 rounded-md"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#164058] mb-1">
                        {property.bhk}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {property.price}
                      </p>
                      <div className="flex items-center text-sm text-[#164058] line-clamp-2">
                        <span className="flex gap-3">
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
                ))}
            </div>

            {/* Prev / Next Buttons */}
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
                className="absolute top-1/2 -left-10 transform -translate-y-1/2 bg-[#FF9C00] text-white hover:bg- hover:text-[#154058] shadow rounded-full cursor-pointer p-2 disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
              </button>
            )}

            {currentPage < totalPages - 1 && (
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                }
                disabled={currentPage === totalPages - 1}
                className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-[#FF9C00] text-white shadow rounded-full cursor-pointer hover:text-[#154058] p-2 disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Dots Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentPage ? "bg-[#FF9C00]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopProjects;
