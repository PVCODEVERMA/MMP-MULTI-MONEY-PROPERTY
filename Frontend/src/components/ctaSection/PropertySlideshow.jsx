
import React, { useEffect, useState } from "react";

const PropertySlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=60",
      title: "Luxury Villa",
      location: "New Delhi",
      price: "₹2.5 Cr",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=60",
      title: "Modern Apartment",
      location: "Gurgaon",
      price: "₹85 Lac",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=60",
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
    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-xl border-2  border-white/20">
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

export default PropertySlideshow;
