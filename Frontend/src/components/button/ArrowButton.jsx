import React from "react";
import { motion } from "framer-motion";

const ArrowButton = () => {
  return (
    <button className="relative w-14 h-14 flex items-center justify-center rounded-full overflow-hidden border-4 border-[#164057] hover:border-[#FF9C00] transition-colors duration-500 group  cursor-pointer">
      {/* Inner Circle Animation */}
      <span className="absolute inset-1 rounded-full border-4 border-[#FF9C00] scale-125 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />

      {/* Arrow Wrapper */}
      <motion.div
        className="flex items-center absolute left-0 top-1/2 -translate-y-1/2"
        whileHover={{ x: -56 }}
        transition={{ duration: 0.4 }}
      >
        {/* First Arrow */}
        <svg
          className="w-5 h-5 mx-4 fill-[#FF9C00]"
          viewBox="0 0 46 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
        </svg>

        {/* Second Arrow */}
        <svg
          className="w-5 h-5 mx-4 fill-[#FF9C00]"
          viewBox="0 0 46 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
        </svg>
      </motion.div>
    </button>
  );
};

export default ArrowButton;
