"use client";
import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import PlanCard from "./PlanCard.jsx";
import CustomSlideCard from "./CustomSlideCard.jsx";

import {
  starterPlan,
  growthPlan,
  customPlan,
} from "./constants/planFeatures.js";
import AddOnsPricing from "./AddOnsPricing.jsx";
import FAQSection from "./FAQSection.jsx";
import BrokerStories from "./BrokerStories.jsx";

export default function PlansCarousel() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.1, spacing: 12 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 1.2, spacing: 16 } },
      "(min-width: 768px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1024px)": { disabled: true },
    },
  });

  // Auto-scroll (mobile only)
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 1024) instanceRef.current?.next();
    }, 3000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  // Pricing logic
  const getPrice = (base) => {
    if (!base) return "—";
    if (billingPeriod === "monthly") return `₹${base.toLocaleString()}/mo`;
    return `₹${Math.round(base * 12 * 0.8).toLocaleString()}/yr (20% off)`;
  };

  return (
    <>
      <section className="bg-[#f7f7f7]">
        <div className="relative bg-[#f7f7f7] max-w-7xl mx-auto py-10  px-3">
          {/* Header */}
          <div className="text-center mb-4 mt-8">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 property-hero-title text-[#164058]">
              MMP Pricing Plans Real Estate Buyer{" "}
              <span className="text-[#ff9c00]">Leads</span>
            </h1>
            <p className="text-lg md:text-xl leading-tight text-[#164058]">
              Builder/Broker/Channel Partner inquiries delivered in real time
              across Delhi NCR
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl bg-[#f7f7f7] p-1 shadow border">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-2 text-sm font-semibold rounded-lg cursor-pointer ${
                  billingPeriod === "monthly"
                    ? "bg-[#FF9C00] text-white"
                    : "text-[#164058]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-4 py-2 text-sm font-semibold rounded-lg cursor-pointer ${
                  billingPeriod === "yearly"
                    ? "bg-[#FF9C00] text-white"
                    : "text-[#164058]"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Plans */}
          <div
            ref={sliderRef}
            className="keen-slider mt-20 lg:grid lg:grid-cols-3 lg:gap-6"
          >
            <div className="keen-slider__slide">
              <PlanCard
                {...starterPlan}
                price={getPrice(starterPlan.basePrice)}
                duration={starterPlan.duration}
              />
            </div>
            <div className="keen-slider__slide">
              <PlanCard
                {...growthPlan}
                price={getPrice(growthPlan.basePrice)}
                duration={growthPlan.duration}
                highlight={true}
              />
            </div>
            <div className="keen-slider__slide">
              <CustomSlideCard {...customPlan} />
            </div>
          </div>

          {/* Nav buttons (mobile only) */}
          <div className="flex justify-center gap-6 mt-4 lg:hidden">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="bg-white shadow-md hover:bg-[#ff9c00] hover:text-white rounded-full px-4 py-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="bg-white shadow-md rounded-full px-4 py-2 hover:bg-[#ff9c00] hover:text-white cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />{" "}
              </svg>
            </button>
          </div>
        </div>
        <AddOnsPricing />
        <BrokerStories />
        <FAQSection />
      </section>
    </>
  );
}
