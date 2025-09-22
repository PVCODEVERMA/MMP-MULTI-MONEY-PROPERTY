import React, { useState } from "react";
import { motion } from "framer-motion";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Button animation variants
const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

const buttonTap = {
  scale: 0.98,
};

export default function KeyFeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center my-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Powerful Features for{" "}
            <span className="text-[#ff9c00]">Maximum Results</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Everything you need to generate quality leads and close more deals
          </motion.p>
        </div>

        {/* Main 3 Features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {/* Location-Based Leads */}
          <motion.div
            variants={fadeIn}
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-6">
              {/* Map Pin Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3
                     -3 1.343-3 3 1.343 3 3 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 9c0 7.5-7.5 12-7.5 12S4.5 16.5 4.5 9a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#ff9c00] mb-4">
              Location-Based Leads
            </h3>
            <p className="text-gray-700">
              Receive buyers specifically from your target area. No more wasted
              time on leads outside your service area.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Pinpoint specific neighborhoods",
                "Filter by radius around your office",
                "Focus on high-conversion areas",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start">
                  {/* Check Icon */}
                  <svg
                    className="h-5 w-5 text-[#ff9c00] mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Project Listings */}
          <motion.div
            variants={fadeIn}
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-6">
              {/* Office Building Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21h18M9 8h6m-6 4h6m-6 4h6M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#ff9c00] mb-4">
              Project Listings
            </h3>
            <p className="text-gray-700">
              Showcase your inventory directly to interested buyers. Highlight
              your best properties with rich media and detailed descriptions.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Unlimited property listings",
                "High-quality image galleries",
                "Virtual tour integration",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-[#ff9c00] mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Dashboard Access */}
          <motion.div
            variants={fadeIn}
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl mb-6">
              {/* Chart Bar Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 19h16M8 19V9m4 10V5m4 14v-7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#ff9c00] mb-4">
              Dashboard Access
            </h3>
            <p className="text-gray-700">
              All leads, reports, and cost-per-lead data in one centralized
              place. Monitor performance and optimize your strategy.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Real-time lead notifications",
                "Performance analytics",
                "ROI tracking tools",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-[#ff9c00] mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {[
            {
              title: "Lead Quality Scoring",
              description: "Automated scoring to prioritize the hottest leads",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 
                       1.902 0l1.519 4.674a1 1 0 00.95.69h4.915
                       c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 
                       0 00-.363 1.118l1.518 4.674c.3.922-.755 
                       1.688-1.538 1.118l-3.976-2.888a1 1 
                       0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197
                       -1.538-1.118l1.518-4.674a1 1 0 
                       00-.363-1.118L2.577 10.1c-.784-.57-.38-1.81.588-1.81h4.914
                       a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ),
              color: "text-yellow-600",
              bgColor: "bg-yellow-100",
            },
            {
              title: "Daily Notifications",
              description: "Get lead alerts on WhatsApp/Email daily",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 
                       0 0118 14.158V11c0-3.07-1.64-5.64-4.5-6.32V4
                       a1.5 1.5 0 10-3 0v.68C8.64 5.36 7 7.92 7 11v3.159
                       c0 .538-.214 1.055-.595 1.436L5 17h5
                       m5 0v1a3 3 0 11-6 0v-1h6z"
                  />
                </svg>
              ),
              color: "text-blue-600",
              bgColor: "bg-blue-100",
            },
            {
              title: "CRM Integration",
              description: "Sync leads with your existing CRM system",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 17l4 4 4-4m0-10l-4-4-4 4"
                  />
                </svg>
              ),
              color: "text-green-600",
              bgColor: "bg-green-100",
            },
            {
              title: "Custom Reporting",
              description: "Generate tailored reports for your business",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-2m3 2v-4m3 4v-6M13 7l5 5-5 5M6 7h.01M6 11h.01M6 15h.01"
                  />
                </svg>
              ),
              color: "text-purple-600",
              bgColor: "bg-purple-100",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} ${feature.color} mb-4`}
              >
                {feature.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#signup"
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="inline-flex items-center px-8 py-4  border border-transparent text-base font-bold rounded-full shadow-md text-white bg-[#ff9c00]  hover:bg-[#144058] transition-all duration-300 hover:shadow-lg"
          >
            Get Started with MMP Today
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5-5 5M6 12h12"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
