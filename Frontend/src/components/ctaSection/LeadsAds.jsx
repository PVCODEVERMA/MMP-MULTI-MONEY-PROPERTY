
import React, { useEffect, useState } from "react";


import slide_01 from "../../assets/AdsImg/slide_01.avif"
import slide_02 from "../../assets/AdsImg/slide_02.avif"
import slide_03 from "../../assets/AdsImg/slide_03.avif"
const LeadsAds = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const properties = [
    {
      id: 1,
      image:
        slide_01,
      title: "Luxury Villa",
      location: "New Delhi",
      price: "₹2.5 Cr",
    },
    {
      id: 2,
      image:
        slide_02,
      title: "Modern Apartment",
      location: "Gurgaon",
      price: "₹85 Lac",
    },
    {
      id: 3,
      image:
        slide_03,
      title: "Beachfront Property",
      location: "Mumbai",
      price: "₹4.2 Cr",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % properties.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [properties.length]);

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="relative h-40 md:h-40 w-52 rounded-xl overflow-hidden shadow-xl border-2 border-white/20">
      {/* Slides container */}
      <div
        className="h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {properties.map((property) => (
          <div key={property.id} className="min-w-full h-full flex-shrink-0 relative">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-bold text-lg">{property.title}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm">{property.location}</p>
                <span className="bg-amber-500 text-xs font-semibold px-2 py-1 rounded">
                  {property.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() =>
          setCurrentSlide((currentSlide - 1 + properties.length) % properties.length)
        }
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 z-10 cursor-pointer"
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % properties.length)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 z-10 cursor-pointer"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-amber-500 scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LeadsAds;
