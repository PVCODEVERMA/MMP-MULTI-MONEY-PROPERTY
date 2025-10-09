import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ActionButtons from "../actionButtons/ActionButtons.jsx";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

// Import images
import Plot from "../../assets/typesOfProperties/plot-for-sale.png";
import House from "../../assets/typesOfProperties/House.webp";
import FarmHouseLand from "../../assets/typesOfProperties/farm-house-1.png";
import FlatApartment from "../../assets/typesOfProperties/apartments.webp";
import IndependentVilla from "../../assets/typesOfProperties/villa.webp";
import Penthouse from "../../assets/typesOfProperties/Penthouse.webp";
import Bungalow from "../../assets/typesOfProperties/Bungalow.webp";

const PropertyTypesSection = ({ handleGetStarted, handleBookDemo }) => {
  const navigate = useNavigate();

  const propertyTypes = [
    { id: "plot", name: "Plot", image: Plot, count: "296 Properties" },
    // { id: "house", name: "House", image: performance, count: "130 Properties" },
    {
      id: "farmhouse",
      name: "Farm House/Land",
      image: FarmHouseLand,
      count: "78 Properties",
    },
    {
      id: "apartment",
      name: "Flat/Apartment",
      image: FlatApartment,
      count: "76 Properties",
    },
    {
      id: "villa",
      name: "Independent Villa",
      image: IndependentVilla,
      count: "26 Properties",
    },
    {
      id: "penthouse",
      name: "Penthouse",
      image: Penthouse,
      count: "18 Properties",
    },
    {
      id: "bungalow",
      name: "Bungalow",
      image: Bungalow,
      count: "12 Properties",
    },
  ];

  // keen-slider config
  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(max-width: 640px)": {
        // mobile
        slides: { perView: 1.3, spacing: 12 },
      },
      "(min-width: 641px) and (max-width: 1023px)": {
        // tablet
        slides: { perView: 3, spacing: 16 },
      },
      "(min-width: 1024px)": {
        // large screens
        slides: { perView: 5, spacing: 20 },
      },
    },
    slides: { perView: 1, spacing: 12 },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
      <div className="bg-[#f7f7f7] rounded-2xl  p-4 sm:p-6 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <h3 className="text-lg sm:text-2xl font-bold text-[#164057]">
            Let's Explore The Different Types Of Properties
          </h3>
          <div className="hidden sm:block">
            <ActionButtons
              secondaryText="Book Demo"
              onSecondaryClick={handleBookDemo}
              size="small"
            />
          </div>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {propertyTypes.map((type) => (
            <Link
              key={type.id}
              to={`/all-properties?propertyType=${type.id}`}
              className="keen-slider__slide bg-white flex flex-col items-center justify-center p-3 sm:p-4 border border-[#FF9C00] rounded-xl hover:shadow-md transition-all text-center group cursor-pointer"
            >
              <img
                src={type.image}
                alt={type.name}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain mb-2"
              />
              <div className="font-medium text-[#164056] group-hover:text-[#FF9C00] text-xs sm:text-lg">
                {type.name}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                {type.count}
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation Arrows - visible only on lg+ */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="hidden lg:flex absolute left-2 top-40 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-[#FF9c00] hover:text-white cursor-pointer"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => instanceRef.current?.next()}
          className="hidden lg:flex absolute right-2 top-40 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-[#FF9C00] hover:text-white cursor-pointer"
        >
          <FaChevronRight />
        </button>

        {/* Mobile buttons */}
        <div className="mt-4 sm:hidden">
          <ActionButtons
            primaryText="Get Started"
            secondaryText="Book Demo"
            onPrimaryClick={handleGetStarted}
            onSecondaryClick={handleBookDemo}
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyTypesSection;
