import React from "react";
import { BellIcon, UserGroupIcon, ChartBarIcon, LifebuoyIcon } from "@heroicons/react/24/outline";

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Buyers Click Our Ads",
      description: "Interested buyers click our targeted ads and fill out their details with genuine interest.",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      borderColor: "border-[#ff9c00]"
    },
    {
      number: 2,
      title: "Inquiries Flow to Your Dashboard",
      description: "All qualified inquiries are instantly delivered to your personalized MMP dashboard.",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      borderColor: "border-[#154056]"
    },
    {
      number: 3,
      title: "You Contact & Close Deals",
      description: "You contact the qualified leads directly and close deals without any middlemen.",
      bgColor: "bg-orange-100",
      textColor: "text-[#ff9c00]",
      borderColor: "border-[#ff9c00]"
    }
  ];

  const features = [
    { title: "Real-time Notifications", color: "text-blue-600", icon: BellIcon },
    { title: "Detailed Buyer Profiles", color: "text-green-600", icon: UserGroupIcon },
    { title: "Performance Analytics", color: "text-orange-600", icon: ChartBarIcon },
    { title: "Dedicated Support", color: "text-purple-600", icon: LifebuoyIcon },
  ];

  return (
    <section className="bg-[#f7f7f7] py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff9c00] mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Simple, transparent, and designed for your success
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <div key={step.number} className={`bg-white p-8 rounded-2xl shadow-lg border-t-4 ${step.borderColor} flex flex-col items-center text-center`}>
              <div className={`flex items-center justify-center w-16 h-16 ${step.bgColor} ${step.textColor} rounded-full text-2xl font-bold mb-5`}>
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-r from-[#f49e15] to-[#ff9c00] rounded-2xl p-10 text-white shadow-xl mb-16 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#154056] bg-opacity-20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Direct & Exclusive Access</h3>
              <p className="text-lg opacity-90">
                No middlemen. No shared data. Just direct buyers ready to make decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 bg-opacity-20 ${feature.color} mb-4`}>
                  <IconComponent className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h4 className="font-semibold text-gray-900">{feature.title}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
