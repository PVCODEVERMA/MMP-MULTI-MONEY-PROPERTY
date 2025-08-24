import React, { useState, useEffect } from "react";
import project01 from "../assets/project/project01.jpg";
import project02 from "../assets/project/project02.jpg";
import project03 from "../assets/project/project03.jpg";
import project04 from "../assets/project/project04.jpg";
import project05 from "../assets/project/project05.jpg";
const featuredProjects = [
  {
    id: 1,
    name: "Godrej Greens",
    city: "Ahmedabad",
    priceRange: "₹60L - 1.2Cr",
    image: project01,
  },
  {
    id: 2,
    name: "DLF Park",
    city: "Gurgaon",
    priceRange: "₹80L - 2Cr",
    image: project02,
  },
  {
    id: 3,
    name: "Sobha Elite",
    city: "Bangalore",
    priceRange: "₹1Cr - 3Cr",
    image: project03,
  },
  {
    id: 4,
    name: "Prestige Lakeview",
    city: "Mumbai",
    priceRange: "₹2Cr - 5Cr",
    image: project04,
  },
  {
    id: 5,
    name: "Kapil Towers",
    city: "Pune",
    priceRange: "₹90L - 1.5Cr",
    image: project05,
  },
];


export default function Carousel() {
  const [current, setCurrent] = useState(0);

  // Auto-play every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredProjects.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden mt-8">
      {featuredProjects.map((project, idx) => (
        <div
          key={project.id}
          className={`absolute inset-0 transform transition duration-700 ease-in-out
            ${idx === current ? "opacity-100 scale-100 z-20" : "opacity-0 scale-95 z-10"}
          `}
          aria-hidden={idx !== current}
        >
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <h3 className="text-2xl font-bold">{project.name}</h3>
            <div className="text-base">{project.city} &middot; {project.priceRange}</div>
          </div>
        </div>
      ))}
      {/* Dot navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredProjects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full border border-white transition
              ${current === idx ? "bg-white" : "bg-white/30"}`}
            aria-label={`Go to slide ${idx+1}`}
          />
        ))}
      </div>
    </section>
  );
}
