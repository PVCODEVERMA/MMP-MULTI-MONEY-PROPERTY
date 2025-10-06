import React from "react";
import { MapPin, Target, Navigation, Zap } from "lucide-react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function LocationLeads() {
  const features = [
    {
      icon: Target,
      title: "Precision Targeting",
      description:
        "City, locality and pin-code filters for exact audience reach",
    },
    {
      icon: Navigation,
      title: "Project-Level Accuracy",
      description:
        "Project tags for precision delivery and better conversion rates",
    },
    {
      icon: Zap,
      title: "Auto-Enrichment",
      description: "Auto-enrich from pincode (roadmap) for smarter campaigns",
    },
    {
      icon: MapPin,
      title: "Micro-Campaigns",
      description:
        "Run hyper-local campaigns matching live inventory availability",
    },
  ];

  const stats = [
    { value: "50k+", label: "Targeted Locations" },
    { value: "98%", label: "Accuracy Rate" },
    { value: "24/7", label: "Live Inventory Matching" },
    { value: "500+", label: "Active Projects" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] ">
      {/* Enhanced Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-32">
          <div className="grid md:grid-cols-2  gap-12 items-center">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-sm font-medium bg-white text-[#154956] px-4 py-2 rounded-full shadow-md border border-[#FF9C00]/20">
                <MapPin className="w-4 h-4 text-[#FF9C00]" />
                Advanced Geo Targeting
              </span>

              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-[#154956] leading-tight">
                Hyper-Local
                <span className="block text-[#FF9C00]">Lead Generation</span>
              </h1>

              <p className="mt-4 text-lg text-[#154956]/80 max-w-2xl mx-auto leading-relaxed">
                Run micro-campaigns at city, sector or project level with
                pinpoint accuracy. Match live inventory and maximize your ROI
                with our advanced geo-targeting platform.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#FF9C00] hover:bg-[#FF9C00]/90 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105">
                  Start Targeting
                </button>
                <button className="border-2 border-[#154956] text-[#154956] hover:bg-[#154956] hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200">
                  View Demo
                </button>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className=" rounded-3xl p-8 md:p-12 text-white ">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white text-[#ff9c00] rounded-full mb-6">
                    <Target className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#154056]">
                    Precision Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-[#ff9c00]">
                          {stat.value}
                        </div>
                        <div className="text-sm opacity-90 text-[#ff9c00]">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Features Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#154956] mb-4">
            Advanced Targeting Features
          </h2>
          <p className="text-lg text-[#154956]/80 max-w-3xl mx-auto">
            Leverage our sophisticated geo-targeting capabilities to reach your
            ideal audience with unprecedented precision and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#154956]/10"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FF9C00]/10 rounded-lg mb-4">
                <feature.icon className="w-6 h-6 text-[#FF9C00]" />
              </div>
              <h3 className="text-xl font-bold text-[#154956] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#154956]/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Features Grid */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#154956] mb-8 text-center">
            Key Capabilities
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "City & Locality Targeting",
                description:
                  "Precisely target specific cities and localities with advanced filtering options",
                benefits: [
                  "Radius targeting",
                  "Multiple location selection",
                  "Real-time coverage maps",
                ],
              },
              {
                title: "Pin-Code Precision",
                description:
                  "Target down to individual pin-codes for hyper-local campaign delivery",
                benefits: [
                  "Pin-code validation",
                  "Coverage analysis",
                  "Delivery optimization",
                ],
              },
              {
                title: "Project Tag Integration",
                description:
                  "Seamlessly integrate project tags for context-aware campaign delivery",
                benefits: [
                  "Auto-tagging",
                  "Project matching",
                  "Inventory synchronization",
                ],
              },
              {
                title: "Smart Auto-Enrichment",
                description:
                  "Automatically enrich targeting data from pin-codes (roadmap feature)",
                benefits: [
                  "Data enhancement",
                  "Smart suggestions",
                  "Performance insights",
                ],
              },
            ].map((capability, index) => (
              <div
                key={index}
                className="bg-[#F7F7F7] rounded-2xl p-6 hover:bg-[#FF9C00]/5 transition-all duration-200 border border-[#154956]/5"
              >
                <div className="flex items-start gap-4">
                  <CheckCircleIcon className="h-6 w-6 text-[#FF9C00] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-[#154956] mb-2">
                      {capability.title}
                    </h3>
                    <p className="text-[#154956]/70 mb-3">
                      {capability.description}
                    </p>
                    <ul className="space-y-1">
                      {capability.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="text-sm  text-[#154956]/60 flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-[#FF9C00] rounded-full"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-[#154956] to-[#FF9C00] rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Targeting Strategy?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-6">
            Join thousands of marketers who are already using our advanced
            geo-targeting platform to drive better results and higher
            conversions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#154956] hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-200">
              Get Started Free
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
