
import React, { useState } from "react";

import pv from "../assets/OurCustomersImg/pv.jpg";
import customer01 from "../assets/OurCustomersImg/21.jpg";
import customer02 from "../assets/OurCustomersImg/68.jpg";
import CRM from "../assets/OurCustomersImg/CRM.png";
const testimonials = [
  {
    name: "Amit Jain",
    company: "DreamBuild Realty",
    photo: customer01,
    quote: "MMP has truly transformed our lead conversion workflow. The support is outstanding and the automation features saved us hours every week."
  },
  {
    name: "Priya Mehta",
    company: "UrbanHomes",
    photo: pv,
    quote: "Thanks to MMP Hybrid, our brokers get leads faster and our customers are happier. Onboarding was seamless and the dashboard is super easy!"
  },
  {
    name: "Raghav Singh",
    company: "Elite Prop",
    photo: customer02,
    quote: "The reporting tools and analytics on broker performance set MMP apart. It’s perfect for medium and large brokerages to scale!",
  },
  {
    name: "Meera Joshi",
    company: "CityHomes",
    photo: pv,
    quote: "Absolutely love the dashboard and reporting. The team at MMP listens to feedback and keeps adding new features.",
  },
  {
    name: "Gopal Singh",
    company: "Skyline Realtors",
    photo: customer01,
    quote: "MMP helps our field agents keep everything organized and follow up efficiently. Highly recommended!",
  },
  {
    name: "Saloni Parikh",
    company: "EstateWorld",
    photo: pv,
    quote: "The CSV export and lead tracking makes reporting to management simple. Support is responsive and fast.",
  },
];

const ITEMS_PER_PAGE = 3;
export default function OurCustomers() {
     const [visible, setVisible] = useState(ITEMS_PER_PAGE);

  const handleShowMore = () =>
    setVisible((v) => Math.min(v + ITEMS_PER_PAGE, testimonials.length));

  return (
    <>
    <section className="relative max-w-7xl mx-auto mt-10 mb-16 px-4 py-12 bg-white rounded-2xl  overflow-hidden">
      {/* Subtle background text */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-10 flex items-center justify-center font-bold text-6xl text-gray-300">
        CUSTOMER TESTIMONIALS
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Left Side Heading and Main Quote */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-800 mb-6 tracking-tight">
            CUSTOMER <br /> TESTIMONIALS
          </h2>
          <blockquote className="text-xl md:text-2xl text-gray-900 font-bold mb-4">
            <span className="text-amber-500 text-3xl font-extrabold">“</span>
            I love HelloLeads. <br className="hidden md:block" />
            Excellent, complete and super simple.
            <span className="text-amber-500 text-3xl font-extrabold">”</span>
          </blockquote>
          <div className="text-lg font-bold text-amber-600">
            James Pearson, Sales Head, USA
          </div>
        </div>

      
          
        
       <img src={CRM} alt="" />
      </div>
    </section>
     <section className="max-w-5xl mx-auto my-16 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-emerald-800 tracking-tight">
       
        Customer Testimonials
      </h2>
      {/* Testimonial Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.slice(0, visible).map((c, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-emerald-50 via-blue-50 to-white rounded-lg p-6 flex flex-col items-center text-center shadow hover:shadow-xl transition-all duration-300 group"
          >
            <img
              src={c.photo}
              alt={c.name}
              className="w-20 h-20 rounded-full border-4 border-emerald-200 mb-4 shadow-lg"
            />
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400 inline" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.75l-6.172 3.846 1.75-7.341L2 9.82l7.415-.607L12 2.75l2.585 6.463L22 9.82l-5.578 4.435 1.75 7.341z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-lg text-gray-700 font-medium mb-4">
              <span className="text-emerald-600 font-bold text-2xl mr-2">“</span>
              {c.quote}
              <span className="text-emerald-600 font-bold text-2xl ml-2">”</span>
            </blockquote>
            <div className="font-bold text-xl text-gray-900 mt-2">{c.name}</div>
            <div className="text-emerald-700 font-medium">{c.company}</div>
          </div>
        ))}
      </div>
      {visible < testimonials.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 bg-emerald-600 text-white text-lg rounded hover:bg-emerald-700 transition font-bold shadow-md"
          >
            Show More Customers
          </button>
        </div>
      )}
    </section>
    </>
  );
}
