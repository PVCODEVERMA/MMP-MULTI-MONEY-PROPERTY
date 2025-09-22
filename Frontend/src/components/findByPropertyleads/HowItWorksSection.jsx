import React from "react";
import { motion } from "framer-motion";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function HowItWorksSection() {
  return (
    <section className="relative bg-[#f7f7f7] overflow-hidden">
      {/* Decorative elements */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff9c00] mb-4"
          >
            How It Works
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Simple, transparent, and designed for your success
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {/* Step 1 */}
          <motion.div
            variants={fadeIn}
            className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-[#ff9c00] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-[#154056] mb-3">Buyers Click Our Ads</h3>
            <p className="text-[#154056]">
              Interested buyers click our targeted ads and fill out their details with genuine interest.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            variants={fadeIn}
            className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-[154056] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full text-2xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Inquiries Flow to Your Dashboard</h3>
            <p className="text-gray-700">
              All qualified inquiries are instantly delivered to your personalized MMP dashboard.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            variants={fadeIn}
            className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-[#ff9c00] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-orange-100 text-[#ff9c00] rounded-full text-2xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">You Contact & Close Deals</h3>
            <p className="text-gray-700">
              You contact the qualified leads directly and close deals without any middlemen.
            </p>
          </motion.div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-[#f49e15] to-[#ff9c00] rounded-2xl p-8 md:p-10 text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
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
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {[
            {
              title: "Real-time Notifications",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              ),
              color: "text-blue-600"
            },
            {
              title: "Detailed Buyer Profiles",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              ),
              color: "text-green-600"
            },
            {
              title: "Performance Analytics",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              color: "text-orange-600"
            },
            {
              title: "Dedicated Support",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
              color: "text-purple-600"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-opacity-20 ${feature.color} bg-gray-100 mb-4`}>
                {feature.icon}
              </div>
              <h4 className="font-semibold text-gray-900">{feature.title}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}