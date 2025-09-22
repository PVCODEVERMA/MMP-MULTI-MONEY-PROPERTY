import React from "react";
import { motion } from "framer-motion";

// Custom Warning Icon
const WarningIcon = ({ size = 22, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export default function ProblemsSection() {
  return (
    <section className="relative  bg-[#f7f7f7] py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-red-100 opacity-30 blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Tired of Fake Leads <span className="text-[#f99c00]">& </span> Shared Data?
            
            
          </motion.h2>
          
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Most portals sell the same project-based leads to 10 brokers. Old numbers, fake data, and wasted calls.
          </motion.p>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Problems with other portals */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="space-y-6"
          >
            <motion.h3 
              variants={fadeIn}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
            >
              The Problems With Other Portals
            </motion.h3>
            
            {[
              {
                title: "Shared Leads",
                description: "Same leads sold to multiple brokers, creating intense competition"
              },
              {
                title: "Outdated Information",
                description: "Old phone numbers and incorrect buyer details waste your time"
              },
              {
                title: "Fake Inquiries",
                description: "Portals inflate numbers with irrelevant or fake leads"
              },
              {
                title: "No Targeting",
                description: "Leads aren't filtered by location, budget, or property preferences"
              },
              {
                title: "Hidden Costs",
                description: "Unexpected charges and unclear pricing models"
              },
              {
                title: "Poor Support",
                description: "No assistance when you encounter issues with leads"
              }
            ].map((problem, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="flex items-start p-5 bg-white rounded-xl shadow-md border-l-4 border-red-500 transition-all duration-300 hover:shadow-lg"
              >
                <WarningIcon className="text-red-500 mt-1 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{problem.title}</h4>
                  <p className="text-gray-700 mt-1">{problem.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - MMP Solution */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="space-y-6"
          >
            <motion.h3 
              variants={fadeIn}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
            >
              The MMP Advantage
            </motion.h3>
            
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-white to-white p-7 rounded-2xl border border-[#ff9c00] shadow-md mb-8"
            >
              <div className="flex items-start">
                <div className="bg-[#ff9c00] text-white p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl text-gray-800 font-medium">
                   With MMP, you only get real-time buyer inquiries targeted by location & budget.
                </p>
              </div>
            </motion.div>
            
            {[
              {
                title: "Exclusive Leads",
                description: "Leads are assigned to only one partner, eliminating competition"
              },
              {
                title: "Real-time Data",
                description: "Fresh inquiries from active buyers delivered daily"
              },
              {
                title: "Verified Buyers",
                description: "Rigorous verification process ensures genuine leads"
              },
              {
                title: "Precise Targeting",
                description: "Leads filtered by location, budget, and property requirements"
              },
              {
                title: "Transparent Pricing",
                description: "Clear costs with no hidden fees or surprises"
              },
              {
                title: "Dedicated Support",
                description: "Personal account manager to assist with your needs"
              }
            ].map((solution, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="flex items-start p-5 bg-white rounded-xl shadow-md border-l-4 border-[#ff9c00] transition-all duration-300 hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#ff9c00] mt-1 mr-4 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{solution.title}</h4>
                  <p className="text-gray-700 mt-1">{solution.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}