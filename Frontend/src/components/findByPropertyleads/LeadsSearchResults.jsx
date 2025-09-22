import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaAngleRight, FaFilter } from "react-icons/fa6";
import { IoLocationSharp, IoClose } from "react-icons/io5";
import Slider from "react-slick";
import dummyProperties from "../findByPropertyleads/dummyProperties.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LeadsSearchResults = () => {
  const { location } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const intent = searchParams.get("intent") || "all";
  const [properties, setProperties] = useState([]);
  const [propertyType, setPropertyType] = useState("all");
  const [sortOption, setSortOption] = useState("Newest First");
  const [activeSlides, setActiveSlides] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    let results = dummyProperties.filter(
      (p) =>
        p.location &&
        `${p.location.city}, ${p.location.locality}`
          .toLowerCase()
          .includes(location.toLowerCase())
    );

    if (intent !== "all") {
      results = results.filter((p) => p.intent === intent);
    }

    if (propertyType !== "all") {
      results = results.filter((p) => p.propertyType === propertyType);
    }

    // Sorting logic
    if (sortOption === "Price: Low to High") {
      results.sort(
        (a, b) =>
          parseInt(a.price.replace(/\D/g, "")) -
          parseInt(b.price.replace(/\D/g, ""))
      );
    } else if (sortOption === "Price: High to Low") {
      results.sort(
        (a, b) =>
          parseInt(b.price.replace(/\D/g, "")) -
          parseInt(a.price.replace(/\D/g, ""))
      );
    } else if (sortOption === "Newest First") {
      results.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    }

    const grouped = {
      high: results.filter((p) => p.intent === "high"),
      medium: results.filter((p) => p.intent === "medium"),
      low: results.filter((p) => p.intent === "low"),
    };

    grouped.totalCount = results.length;
    setProperties(grouped);
    setCurrentPage(1);
  }, [location, intent, propertyType, sortOption]);

  const totalPages = Math.ceil((properties.totalCount || 0) / itemsPerPage);

  const getPaginatedData = () => {
    const allData = [
      ...(properties.high || []),
      ...(properties.medium || []),
      ...(properties.low || []),
    ];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allData.slice(startIndex, startIndex + itemsPerPage);
  };

  const paginatedData = getPaginatedData();

  const propertyTypes = [
    "all",
    ...new Set(dummyProperties.map((p) => p.propertyType)),
  ];

  // Responsive settings for the slider
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-20">
      {/* Breadcrumb */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6 md:my-10 gap-4">
        <p className="text-sm text-gray-500">
          <span className="flex items-center">
            <Link
              to="/home/leads"
              className="hover:underline hover:text-[#ff9c00] flex items-center"
            >
              Home
            </Link>
            <FaAngleRight className="mx-2" />
            <span className="truncate">Results for {location}</span>
          </span>
        </p>

        {/* Mobile filter toggle */}
        <div className="w-full flex items-center justify-between md:justify-start ">
         <p className="text-sm sm:hidden lg:hidden text-gray-500">
          <span className="flex sm:hidden items-center flex-wrap">
            <Link
              to="/home/leads"
              className="hover:underline hover:text-[#ff9c00] flex items-center"
            >
              Home
            </Link>
            <FaAngleRight className="mx-2" />
            <span className="truncate">Results for {location}</span>
          </span>
        </p>
        <button
          className="md:hidden flex items-center gap-2 bg-[#ff9c00] text-white px-4 py-2 rounded-lg"
          onClick={() => setShowMobileFilters(true)}
        >
          <FaFilter /> Filters
        </button>
        </div>

        {/* Filters - Desktop */}
        <div className="hidden md:flex flex-col md:flex-row items-center justify-center gap-4">
          
           
          <div className="flex items-center gap-2">
           
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Property Type:
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] cursor-pointer"
            >
              {propertyTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Sort by:
            </label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] cursor-pointer"
            >
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white p-6 overflow-y-auto">
          
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <IoClose size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type:
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00]"
                >
                  {propertyTypes.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by:
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00]"
                >
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              <button
                className="w-full bg-[#ff9c00] text-white py-2 rounded-md font-medium"
                onClick={() => setShowMobileFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <h2 className="text-md md:text-3xl lg:text-4xl font-bold text-[#ff9c00] text-center capitalize mt-5">
        Property listing <span className="text-[#154056]">{location}</span> Leads
      </h2>

      {/* Stats */}
      <p className="text-sm md:text-base text-gray-700 my-4 md:my-6 text-center">
        There are currently:{" "}
        <span className="font-semibold">({properties.totalCount || 0})</span>{" "}
        leads available in {location} &nbsp; ({intent})
      </p>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {paginatedData.length > 0 ? (
          paginatedData.map((property, index) => {
            const total = property.images?.length || 0;
            const current =
              activeSlides[property.id] !== undefined
                ? activeSlides[property.id] + 1
                : 1;

            return (
              <motion.div
                key={property.id}
                className="relative rounded-xl shadow-md bg-white overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => {
                  const city = property.location?.city?.toLowerCase();
                  navigate(`/home/leads/${city}/${property.id}`);
                }}
              >
                {/* Image Section */}
                <div className="relative w-full h-48 sm:h-56">
                  <Slider
                    {...sliderSettings}
                    beforeChange={(_, newIndex) => {
                      setActiveSlides((prev) => ({
                        ...prev,
                        [property.id]: newIndex,
                      }));
                    }}
                  >
                    {property.images?.map((img, i) => (
                      <div key={i} className="w-full h-48 sm:h-56">
                        <img
                          src={img}
                          alt={property.title || "Property image"}
                          className="w-full h-48 sm:h-56 object-cover"
                        />
                      </div>
                    ))}
                  </Slider>

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-[#ff9c00] text-white text-xs font-semibold px-2 py-1 rounded">
                      {property.propertyType}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {current}/{total} photos
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-2 left-2 bg-white text-[#ff9c00] font-bold text-sm p-2 sm:p-3 rounded shadow">
                    {property.price}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-3 sm:p-4">
                  <h4 className="font-bold line-clamp-2 text-[#154056] text-sm sm:text-base">
                    {property.title}
                  </h4>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-0.5 truncate">
                      <IoLocationSharp className="flex-shrink-0" />
                      <span className="truncate">
                        {property.location.city}, {property.location.locality}
                      </span>
                    </p>
                    <p className="text-xs font-bold text-[#ff9c00] whitespace-nowrap">
                      {property.postedOn === "today" ? "Today" : "Yesterday"}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-3 py-12 text-center">
            <p className="text-gray-500 text-lg">No properties match this filter.</p>
            <button
              onClick={() => {
                setPropertyType("all");
                setSortOption("Newest First");
              }}
              className="mt-4 bg-[#ff9c00] text-white px-6 py-2 rounded-md"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 md:mt-10 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-[#ff9c00] hover:text-white disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm rounded cursor-pointer ${
                currentPage === i + 1
                  ? "bg-[#ff9c00] text-white font-bold"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-[#ff9c00] hover:text-white disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadsSearchResults;