import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  HomeIcon,
  BuildingOfficeIcon,
  HomeModernIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import CountUp from "../../shadcnComponent/CountUp";

const EnhancedCardsSection = ({ handleGetStarted, handleBookDemo }) => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const cities = ["New Delhi", "Noida", "Gurgaon", "Faridabad", "Mumbai"];

  const cards = [
    {
      title: 12974,
      subtitle: "Top Properties",
      description: "Zero brokerage  Direct contact",
      gradient: "linear-gradient(135deg, #FF9C00 0%, #e88a00 100%)",
      icon: HomeIcon,
      route: "/properties",
      details: {
        heading: "Explore top Listed Properties",
        content:
          "Browse thousands of direct-owner listed properties with no brokerage fees.",
      },
    },
    {
      title: 204,
      subtitle: "New Projects",
      description: "Pre-launch  Under construction",
      gradient: "linear-gradient(135deg, #164058 0%, #0d2a3a 100%)",
      icon: BuildingOfficeIcon,
      route: "/projects",
      details: {
        heading: "Latest New Projects",
        content:
          "Find the newest housing projects and investment opportunities.",
      },
    },
    {
      title: 3638,
      subtitle: "Budget Homes",
      description: "Affordable First-time buyers",
      gradient: "linear-gradient(135deg, #164058 0%, #FF9C00 100%)",
      icon: HomeModernIcon,
      route: "/budget-homes",
      details: {
        heading: "Affordable Housing Options",
        content:
          "Perfect homes for first-time buyers starting at low budget ranges.",
      },
    },
  ];

  // Typewriter effect
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        <div className="flex-1">
          {/* Section Title */}
          <div className="mb-6 sm:mb-8">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-2"
              style={{ color: "#164058" }}
            >
              We've got properties in{" "}
              <span className="text-[#FFA100] min-h-[2.5rem] inline-block">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>{" "}
              for everyone
            </h2>
            <div
              className="w-12 sm:w-16 h-1 rounded"
              style={{ backgroundColor: "#FF9C00" }}
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {cards.map((card, index) => {
              const CardIcon = card.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={reduceMotion ? {} : { scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group min-h-[200px] sm:min-h-[240px]"
                  style={{ background: card.gradient }}
                >
                  <div className="absolute inset-0 bg-[#164058] bg-opacity-10 group-hover:bg-opacity-20 transition-all" />
                  <div className="relative p-4 sm:p-6 md:p-8 text-white h-full flex flex-col justify-between">
                    <div className="mb-4 sm:mb-6">
                      <div className="text-3xl text-center sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                        <CountUp
                          from={0}
                          to={card.title}
                          separator=","
                          direction="up"
                          duration={1}
                          className="count-up-text"
                        />
                      </div>
                      <div className="text-base text-center sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">
                        {card.subtitle}
                      </div>
                      <div className="text-xs text-center sm:text-sm opacity-90">
                        {card.description}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            navigate(card.route, { state: card.details })
                          }
                          className="relative flex items-center gap-3 px-10 py-4 group overflow-hidden rounded-full border border-[#FAA111] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                          <span className="absolute inset-0 rounded-full bg-[#FAA111] h-12 top-1.5 w-12 transition-all duration-300 group-hover:w-full group-hover:h-full"></span>
                          <span className="relative text-[#F7F7F7] font-bold text-lg tracking-wide">
                            Explore
                          </span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 13 10"
                            className="relative ml-2 stroke-[#F7F7F7] mt-0.5 stroke-2 transition-transform duration-300 -translate-x-1 group-hover:translate-x-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                          </svg>
                        </button>
                      </div>

                      
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 opacity-20 group-hover:opacity-30 transition-opacity">
                    <CardIcon className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-white" />
                  </div>
                </motion.div>
              );
            })}

            {/* Contest Card */}
            <motion.div
              whileHover={reduceMotion ? {} : { scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group min-h-[200px] sm:min-h-[240px]"
              style={{
                background: "linear-gradient(135deg, #FF9C00 0%, #164058 100%)",
              }}
            >
              <div className="absolute inset-0 bg-[#164058] bg-opacity-10 group-hover:bg-opacity-20 transition-all" />
              <div className="relative p-4 sm:p-6 text-[#F7F7F7] h-full flex flex-col justify-between">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="text-base sm:text-lg font-bold mb-1 sm:mb-2">
                    Share your
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#F8A317] mb-1 sm:mb-2">
                    #PataBadloLifeBadlo
                  </div>
                  <div className="text-base sm:text-lg font-bold mb-1 sm:mb-2">
                    story and <span className="text-[#F8A317]">WIN</span>
                  </div>
                  <div className="text-xs sm:text-sm mb-3 sm:mb-4">
                    vouchers worth{" "}
                    <span className="font-bold text-lg sm:text-xl">₹5000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    className="w-full text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-bold transition-all hover:scale-105 min-h-[44px]"
                    style={{ backgroundColor: "#164058" }}
                  >
                    🎁 Participate Now
                  </button>
                  <div className="flex justify-center ">
                    <button
                      onClick={handleGetStarted}
                      className="bg-[#FD9E06] bg-opacity-10 hover:bg-opacity-20 text-white   sm:px-3 py-4 w-36 rounded-lg  hover:bg-white hover:text-[#ff9c00] sm:text-sm font-bold text-2xl transition-all min-h-[40px] cursor-pointer"
                    >
                      Get Started
                    </button>
                  
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-50 group-hover:animate-bounce">
                <GiftIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#F8A317]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCardsSection;
