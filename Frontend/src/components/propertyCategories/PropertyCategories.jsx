import React, { useState, useEffect, useRef } from "react";
import NewDelhi from "../../assets/cities/NewDelih.jpg";
import Faridabad from "../../assets/cities/Faridabad.avif";
import Gurgaon from "../../assets/cities/Gurgaon.avif";
import Bangalore from "../../assets/cities/Bangalore.jpeg";
import Noida from "../../assets/cities/Noida.avif";
import Mumbai from "../../assets/cities/Mumbai.jpeg";

const FreshProperties = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);
  
  const locations = [
    { 
      city: "New Delhi", 
      count: "120+ Properties", 
      img: NewDelhi,
      description: "Capital City Living",
      tagline: "Luxury apartments & villas"
    },
    { 
      city: "Noida", 
      count: "95+ Properties", 
      img: Noida,
      description: "Modern Apartments",
      tagline: "With premium amenities"
    },
    { 
      city: "Gurgaon", 
      count: "110+ Properties", 
      img: Gurgaon,
      description: "Corporate Hub",
      tagline: "Near business districts"
    },
    { 
      city: "Faridabad", 
      count: "70+ Properties", 
      img: Faridabad,
      description: "Affordable Living",
      tagline: "Family-friendly communities"
    },
    { 
      city: "Mumbai", 
      count: "150+ Properties", 
      img: Mumbai,
      description: "Coastal Living",
      tagline: "Sea-view apartments"
    },
    { 
      city: "Bangalore", 
      count: "130+ Properties", 
      img: Bangalore,
      description: "Garden City",
      tagline: "Tech hub residences"
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Auto slide for mobile view
    const interval = setInterval(() => {
      if (window.innerWidth < 768) {
        setCurrentSlide(prev => (prev + 1) % locations.length);
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [locations.length]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Left swipe
      setCurrentSlide(prev => (prev + 1) % locations.length);
    } else if (touchEnd - touchStart > 50) {
      // Right swipe
      setCurrentSlide(prev => (prev - 1 + locations.length) % locations.length);
    }
  };

  // Navigate to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header Section */}
      <div className={`transition-all duration-700 transform text-center mb-16 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold text-[#164058] mb-4 relative inline-block pb-2 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-gradient-to-r after:from-amber-400 after:to-orange-500 after:w-3/4 after:mx-auto">
          Discover Premium Properties
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Explore our handpicked selection of properties in top cities across India
        </p>
      </div>

      {/* Property Grid - Desktop */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map((loc, i) => (
          <div
            key={i}
            className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group cursor-pointer hover:-translate-y-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: `${i * 100}ms`,
              transform: hoveredCard === i ? 'translateY(-8px) scale(1.02)' : ''
            }}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={loc.img}
                alt={loc.city}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* City Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                  {loc.city}
                </span>
              </div>
              
              
              
              {/* Text Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-xl font-bold drop-shadow-md">{loc.description}</h3>
                <p className="text-orange-400 text-sm mt-1">{loc.tagline}</p>
              </div>
              
              {/* Hover Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity duration-500">
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-md flex items-center cursor-pointer">
                  Explore Properties
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Property Slider - Mobile */}
      <div className="md:hidden relative overflow-hidden rounded-2xl">
        <div 
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {locations.map((loc, i) => (
            <div key={i} className="w-full flex-shrink-0 px-3">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={loc.img}
                    alt={loc.city}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  
                  {/* City Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                      {loc.city}
                    </span>
                  </div>
                  
                  {/* Property Count */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                      {loc.count}
                    </span>
                  </div>
                  
                  {/* Text Content */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold drop-shadow-md">{loc.description}</h3>
                    <p className="text-amber-200 text-sm mt-1">{loc.tagline}</p>
                  </div>
                  
                  {/* Button (always visible on mobile) */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-md flex items-center cursor-pointer">
                      Explore Properties
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {locations.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'bg-amber-500 scale-125' : 'bg-gray-300'
              }`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300"
          onClick={() => setCurrentSlide(prev => (prev - 1 + locations.length) % locations.length)}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300"
          onClick={() => setCurrentSlide(prev => (prev + 1) % locations.length)}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FreshProperties;