import React from "react";
import ActionButtons from "../actionButtons/ActionButtons.jsx";


import SlidebarImg01 from "../../assets/phome_Image/RightSidebar/SlidebarImg_01.avif";
import SlidebarImg02 from "../../assets/phome_Image/RightSidebar/SlidebarImg_02.avif";
import SlidebarImg03 from "../../assets/phome_Image/RightSidebar/SlidebarImg_03.avif";
import SlidebarImg04 from "../../assets/phome_Image/RightSidebar/SlidebarImg_04.avif";
import ImageSlider from "./ImageSlider.jsx";

const RightSidebar = ({ handleGetStarted, handleBookDemo }) => {
  const sliderImages = [
    SlidebarImg01,
    SlidebarImg02,
    SlidebarImg03,
    SlidebarImg04,
  ];

  return (
    <div className="lg:w-80 space-y-4 sm:space-y-6">
      {/* Interior Ad */}
      <div
        className="rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #FF9C00 0%, #f4a623 100%)",
        }}
      >
        <div
          className="absolute top-0 right-0 text-[#F7F7F7] px-3 sm:px-4 py-2 rounded-bl-xl font-bold text-sm sm:text-lg"
          style={{ backgroundColor: "#164058" }}
        >
          Save 40%
        </div>

        <div className="mb-4 mt-2 sm:mb-6" style={{ color: "#164058" }}>
          <h3 className="text-white font-bold mb-1 sm:mb-2">
            Fresh Leads. More Deals.
          </h3>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
            Top Brands
          </h3>
         
        </div>

        {/*  Image Slider Component */}
        <div className="mb-4 sm:mb-6">
          <ImageSlider images={sliderImages} interval={3000} />
        </div>

        <div className="space-y-2 sm:space-y-3">
          <button
            className="relative flex items-center justify-center w-full py-1 sm:py-1 md:py-1 px-4 sm:px-6 rounded-full font-bold text-[#F7F7F7] min-h-[44px] cursor-pointer transition-all duration-500 ease-in-out shadow-lg hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: "#164058" }}
          >
            <span className="mr-4">Check Offers</span>
            <span className="relative">
              <svg
                width="33"
                height="43"
                viewBox="0 0 66 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform scale-75 transition-all duration-500 group-hover:translate-x-6"
              >
                <g id="arrow">
                  <path
                    d="M40.1544 3.89485L43.9763 0.139297C44.1708 -0.0518421 44.4826 -0.0518571 44.6772 0.139263L65.6916 20.7848C66.0856 21.1719 66.0912 21.805 65.7041 22.199L44.6771 42.8608C44.4826 43.0519 44.1708 43.0519 43.9763 42.8609L40.1545 39.107C39.9575 38.9134 39.9547 38.5969 40.1482 38.3999L56.9938 21.8568C57.1908 21.6633 57.1937 21.3467 57.0002 21.1497L40.1545 4.60825C39.9575 4.41478 39.9546 4.09821 40.1481 3.90117Z"
                    fill="white"
                    className="transition-colors duration-500 group-hover:fill-[#FD9E06]"
                  />
                </g>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* CTA Card */}
      <div className="bg-[#F7F7F7] rounded-2xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
          Ready to Get Started? 🚀
        </h3>
        <p className="text-gray-600 text-center mb-4 sm:mb-6 text-sm sm:text-base">
          Join thousands of satisfied customers who found their dream properties
          with us.
        </p>
        <ActionButtons
          secondaryText="Schedule Demo"
          onSecondaryClick={handleBookDemo}
          variant="vertical"
        />
      </div>
    </div>
  );
};

export default RightSidebar;
