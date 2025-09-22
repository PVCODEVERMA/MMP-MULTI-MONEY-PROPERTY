import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { StarIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import houseKeyImg from "../../assets/review/contact-us-img.png"; 

const company = {
  name: "MMP — MultimoneyProperty",
  tagline:
    "MMP is a Real Estate Marketing Platform that provides verified buyer inquiries to builders, brokers and channel partners in Delhi–NCR and Mumbai.",
  subTagline:
    "Powered by TLS Technology (TLS Pvt. Ltd.), offering dashboard access, real‑time leads and transparent reporting."
};

const REVIEWS = [
  {
    name: "Rajesh Kumar",
    date: "2 months ago",
    rating: 5,
    text:
      "Received daily buyer inquiries from MMP; got many qualified conversations by following up within 30 minutes."
  },
  {
    name: "Priya Sharma",
    date: "1 month ago",
    rating: 5,
    text:
      "Location-based leads in Delhi NCR kept our pipeline strong; dashboard updates and reports were very helpful."
  },
  {
    name: "Amit Patel",
    date: "2 weeks ago",
    rating: 4,
    text:
      "Organic inquiries increased with listing + featured visibility; overall MMP team support was fast and reliable."
  }
];

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    // Trigger animations when component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="relative bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT: Title + Reviews Slider */}
          <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#154055]">
              Voices of Our Valued Clients
            </h2>

            <p className="mt-4 text-gray-700 max-w-2xl">
              {company.tagline}
            </p>
            <p className="mt-2 text-gray-600 max-w-2xl">
              {company.subTagline}
            </p>

            <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    EXCELLENT rating
                  </div>
                  <div className="text-sm text-gray-500">Based on 139 reviews</div>
                </div>

                
              </div>

              {/* Slider */}
              <div className="mt-6 relative">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, A11y]}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  navigation={{ nextEl: ".review-next", prevEl: ".review-prev" }}
                  spaceBetween={24}
                  slidesPerView={1}
                >
                  {REVIEWS.map((r, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1">
                          <p className="text-gray-800 leading-relaxed">{r.text}</p>

                          <div className="mt-4 flex items-center gap-3">
                            <img
                              src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(
                                r.name
                              )}`}
                              alt={r.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <div className="font-semibold text-gray-800">{r.name}</div>
                              <div className="text-xs text-gray-500">{r.date}</div>
                            </div>
                          </div>
                        </div>

                        <div className="hidden sm:flex items-start gap-1">
                          {[...Array(r.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Nav buttons */}
                <div className="absolute -bottom-1 right-0 flex items-center gap-2 translate-y-full pt-4">
                  <button
                    className="review-prev p-2 rounded-full border border-gray-200 bg-white hover:bg-amber-500 transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-sm"
                    aria-label="Previous"
                    onMouseEnter={() => setHoveredButton('prev')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <ArrowLongLeftIcon className={`w-5 h-5 transition-all duration-300 ${hoveredButton === 'prev' ? 'text-white transform -translate-x-1' : 'text-gray-700'}`} />
                  </button>
                  <button
                    className="review-next p-2 rounded-full border border-gray-200 bg-white hover:bg-amber-500 transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-sm"
                    aria-label="Next"
                    onMouseEnter={() => setHoveredButton('next')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <ArrowLongRightIcon className={`w-5 h-5 transition-all duration-300 ${hoveredButton === 'next' ? 'text-white transform translate-x-1' : 'text-gray-700'}`} />
                  </button>
                </div>
              </div>

              <div className="mt-10 text-center text-sm text-gray-500">
                Showing our latest reviews
              </div>
            </div>
          </div>

          {/* RIGHT: Image + Circular badge + CTA */}
          <div className="relative">
            {/* Circular badge */}
            <div className="absolute -top-6 right-6 z-10">
              <div className="w-28 h-28 rounded-full hover:text-[#FFF5E6] bg-[#FFF5E6] border-2 hover:bg-amber-500 border-white shadow flex items-center justify-center cursor-pointer transition-all duration-500 transform hover:scale-110  hover:rotate-12">
                <ArrowRightIcon className="w-8 h-8 text-[#F59E0B] hover:text-[#FFF5E6] transition-all duration-300" />
              </div>
            </div>

            {/* Main image */}
            <div className="relative transition-all duration-700 transform hover:scale-105">
              <img
                src={houseKeyImg}
                alt="Home & key"
                className="w-full object-cover transition-transform duration-500"
              />
            </div>

            {/* CTA */}
            {/* <div className="mt-8 flex justify-center  lg:justify-end">
              <button
                className="inline-flex items-center gap-3 bg-[#FF9C00] text-white font-semibold px-5 sm:px-6 py-3 rounded-xl shadow hover:brightness-95 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group cursor-pointer"
                onClick={() => window.alert("Explore MMP buyer leads")}
                onMouseEnter={() => setHoveredButton('cta')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <span>Find your wonderful home</span>
                <ArrowRightIcon className={`w-5 h-5 transition-all duration-300 ${hoveredButton === 'cta' ? 'transform translate-x-2' : ''}`} />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}