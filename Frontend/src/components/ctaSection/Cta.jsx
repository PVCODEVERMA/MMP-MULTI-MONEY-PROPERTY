
import { useEffect, useState } from "react";
import PropertySlideshow from "./PropertySlideshow";


const Cta = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={`mt-16 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-300"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-amber-100 mb-6">
                Connect with our expert advisors to explore the best properties in
                your preferred location.
              </p>
              <button className="bg-white text-[#154056] font-bold px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto lg:mx-0 group cursor-pointer">
                <a href="/contact-property">Contact Us Today</a>
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 text-[#ff9c00]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </button>
            </div>

            {/* Right side - Slideshow */}
            <PropertySlideshow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
