"use client";
import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// images import
import image01 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_01.avif";
import image02 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_02.avif";
import image03 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_03.avif";
import image04 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_04.avif";
import image05 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_05.avif";
import image06 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_06.avif";

// broker data
const brokerImages = [
  {
    id: 1,
    photo: image01,
    name: "Rahul Singh",
    city: "Lucknow",
    story: "Thanks to this portal, I closed 5 deals in one month!",
  },
  {
    id: 2,
    photo: image02,
    name: "Priya Sharma",
    city: "Kanpur",
    story: "Easy to use and trusted leads, I’m very happy!",
  },
  {
    id: 3,
    photo: image03,
    name: "Amit Verma",
    city: "Delhi",
    story: "Saved a lot of marketing cost, highly recommend!",
  },
  {
    id: 4,
    photo: image04,
    name: "Sneha Gupta",
    city: "Noida",
    story: "Helped me expand my client base quickly.",
  },
  {
    id: 5,
    photo: image05,
    name: "Vikram Yadav",
    city: "Gurugram",
    story: "Got verified buyers, no fake inquiries.",
  },
  {
    id: 6,
    photo: image06,
    name: "Neha Kapoor",
    city: "Mumbai",
    story: "Closed premium property deals using this platform.",
  },
];

export default function BrokerStories() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1.1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <section className="bg-[#F7F7F7] py-12">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        <span className="text-[#164058]">Successful Broker </span>
        <span className="text-[#F29400]">Stories</span>
      </h2>

      {/* Slider */}
      <div ref={sliderRef} className="keen-slider max-w-7xl mx-auto px-4">
        {brokerImages.map((broker) => (
          <div
            key={broker.id}
            className="keen-slider__slide bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
          >
            {/* Photo */}
            <img
              src={broker.photo}
              alt={broker.name}
              className="w-16 h-16 rounded-full mb-4 object-cover"
            />
            {/* Name + City */}
            <h3 className="text-lg font-semibold text-[#164058]">
              {broker.name}
            </h3>
            <p className="text-sm text-gray-500 mb-3">{broker.city}</p>
            {/* Story */}
            <p className="text-sm text-gray-700 italic">“{broker.story}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
