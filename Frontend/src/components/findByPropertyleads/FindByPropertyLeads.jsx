
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import LocationSelector from "../locationSelector/LocationSelector.jsx";
import BlurText          from "../../shadcnComponent/BlurText.jsx";
import Ads               from "../ctaSection/Ads.jsx";
import WhyMMPSection     from "./WhyMMPSection.jsx";
import ProblemsSection   from "./ProblemsSection.jsx";
import HowItWorksSection from "./HowItWorksSection.jsx";
import KeyFeaturesSection from "./KeyFeaturesSection.jsx";
import PlansCarousel      from "../PlansSection/PlansCarousel.jsx";
import toast, { Toaster } from "react-hot-toast";



export default function FindByPropertyLeads() {
  const navigate = useNavigate();

  /* ---------------- form state ---------------- */
  const [form, setForm] = useState({ location: "", intent: "" });

  /* ---------------- type-writer ---------------- */
  const cities = ["New Delhi", "Noida", "Gurgaon", "Faridabad", "Mumbai", "Dubai"];
  const [displayText, setDisplayText] = useState("");
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

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

  /* ---------------- search handler ---------------- */
  const handleSearch = () => {
    if (!form.location || !form.intent) {
    toast.error("Please select both Location and Intent Leads..");
    return;
  }

    /* -------- CHANGE: route to new split-screen explorer -------- */
    navigate({
    pathname: "/home/leads/lock",                
    search:
      `?location=${encodeURIComponent(form.location)}` +
      `&intent=${form.intent}`,
  });
  };

  /* ---------------- JSX ---------------- */
  return (
    <>
      {/* Hero */}
      <div className="bg-[#F7F7F7] pt-20">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left">
            <h1 className="property-hero-title font-bold leading-snug">
              <BlurText
                text="Get Fresh Buyer Inquiries, Straight to Your Dashboard"
                delay={150}
                animateBy="words"
                direction="top"
                style={{ color: "#FF9C00" }}
              />
            </h1>
            <p className="mt-5 text-[#164057] text-base sm:text-lg leading-relaxed">
              MMP helps brokers and builders in{" "}
              <span className="text-[#FFA100]">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>{" "}
              close more deals with location-based leads.
            </p>
          </div>

          <div className="hidden sm:block mt-8 sm:mt-0 sm:ml-8">
            <Ads />
          </div>
        </div>
      </div>

      {/* Search bar */}
      <section className="bg-[#f7f7f7]">
        <div className="max-w-3xl mx-auto px-10 pb-1">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-2 flex flex-col md:flex-row items-stretch">
            <div className="flex-1 p-2">
              <LocationSelector
                selectedLocation={form.location}
                onLocationChange={(loc) => setForm({ ...form, location: loc })}
                onClear={() => setForm({ ...form, location: "" })}
                className="rounded-lg"
              />
            </div>

            <div className="border-t md:border-t-0 px-2 py-2 mt-2 md:py-0">
              <select
                value={form.intent}
                onChange={(e) => setForm({ ...form, intent: e.target.value })}
                className="w-full md:w-40 px-4 py-3 bg-transparent outline-none text-sm text-gray-700 cursor-pointer rounded-lg"
              >
                <option value="">Intent level</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="px-2 mt-2">
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 w-full bg-[#ff9c00] hover:bg-[#154057] text-white text-sm font-semibold px-6 py-3 rounded-xl transition cursor-pointer"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing sections */}
      <WhyMMPSection />
      <ProblemsSection />
      <HowItWorksSection />
      <KeyFeaturesSection />
      <PlansCarousel />

      

        {/* Property modal */}
      
      
      {/* <FAQSection /> */}
      

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
