import React, { useState } from "react";
import { motion } from "framer-motion";
import whyImg from "../../assets/whyMMP/whyImg.png";
import Contact from "../../pages/solutions/Content.jsx";

// Custom Orange CheckCircle Icon
const CheckCircle = ({ size = 22, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Animation Variants (instant show, no timing)
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function WhyMMPSection() {
  const [open, setOpen] = useState(false); 

  return (
    <section className="relative bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5 gap-2 relative z-10">
        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#154056] leading-tight"
        >
          <span className="text-transparent bg-clip-text flex justify-center bg-gradient-to-r from-[#ff9c00] to-[#ffb745] relative">
            <span className="text-[#154056] property-hero-title">
              Not Just a Portal. A Sales Partner.
            </span>
            <div className="absolute bottom-0 left-0 mt-3 w-[20%] sm:w-[40%] sm:ml-88 h-1 bg-gradient-to-r from-[#ff9c00] to-[#ffb745] rounded-full"></div>
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 py-2 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="relative rounded-2xl h-80 flex flex-col justify-center items-center overflow-hidden transition-all duration-500 ">
                <img src={whyImg} alt="" />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="space-y-6 md:space-y-5"
          >
            {/* Description Points */}
            <motion.ul className="space-y-4">
              {[
                "Fresh Daily Inquiries → Buyers searching flats in your area.",
                "Personal Dashboard → Track every lead in one place.",
                "Transparent Reports → See ad spend, leads, and cost per lead clearly.",
              ].map((point, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:translate-x-1"
                >
                  <CheckCircle
                    className="text-[#ff9c00] mt-1 flex-shrink-0 drop-shadow-md"
                    size={24}
                  />
                  <span className="text-lg text-gray-800">{point}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA Button */}
            <motion.button
              variants={fadeUp}
              onClick={() => setOpen(true)} 
              className="bg-gradient-to-r from-[#ff9c00] to-[#ff7b00] text-white font-semibold text-lg py-3 px-8 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg relative p-6">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-white hover:bg-[#ff9c00] rounded-full p-2 text-2xl cursor-pointer"
            >
              &times;
            </button>

            {/* Contact Form Content */}
            <Contact onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </section>
  );
}
