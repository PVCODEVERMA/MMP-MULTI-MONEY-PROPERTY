import React from "react";
import { Link } from "react-router-dom";
import WilmingtonImag from "../assets/HelpAndContact/Wilmington.jpg";
import lindalImag from "../assets/HelpAndContact/LindaImag.jpeg";
import TrichyImag from "../assets/HelpAndContact/TrichyIndia.jpg"
import MiltonKeynesImag from "../assets/HelpAndContact/MiltonKeynes.jpg";
import contact_support from "../assets/HelpAndContact/contact_support.png";
import schedule_demo from "../assets/HelpAndContact/schedule_demo.png";
import faq from "../assets/HelpAndContact/faq.png";
const regions = [
  {
    name: "North America",
    city: "Wilmington, DE",
    img: WilmingtonImag,
    address: (
      <>
        3422 Old Capitol Trail, Suite 15<br />
        Wilmington, DE 19808<br />
        USA
      </>
    ),
  },
  {
    name: "Europe",
    city: "Milton Keynes, UK",
    img: MiltonKeynesImag,
    address: (
      <>
        6 Grant Gardens, Oxley Park<br />
        Milton Keynes MK4 4TS<br />
        UK
      </>
    ),
  },
  {
    name: "Asia",
    city: "Trichy, India",
    img: TrichyImag,
    address: (
      <>
        6, Alexandria Road<br />
        Trichy - 620 001<br />
        India
      </>
    ),
  },
];

export default function HelpAndContact() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Ask Linda Section */}
      <section className="bg-white max-w-5xl mx-auto rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 border mb-10">
        <img
          src={ MiltonKeynesImag }
          alt="Ask Linda"
          className="w-44 h-44 object-cover rounded-lg border shadow-md"
        />
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="text-3xl md:text-4xl font-extrabold text-emerald-800 mb-3 text-center md:text-left">
            I am Linda and let me help you quickly!
          </div>
          <div className="font-black text-2xl md:text-3xl text-black my-1">
            <span className="inline-block border-b-4 border-emerald-400 px-1">Ask Me</span>{" "}
            <span className="inline-block italic font-handwriting">anything</span>
          </div>
          <div className="font-semibold text-base text-gray-600 mt-2">
            On HelloLeads CRM
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 mb-12 text-center">
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.75l-6.172 3.846 1.75-7.341L2 9.82l7.415-.607L12 2.75l2.585 6.463L22 9.82l-5.578 4.435 1.75 7.341z" />
            </svg>
          ))}
        </div>
        <p className="font-extrabold text-2xl mb-4">
          Delighted with the lightening speed response of HelloLeads team. Yet another reason why I continue with HelloLeads CRM for my business needs.
        </p>
        <div className="font-bold text-lg text-amber-600 mt-2">
          Brent Davis, Healthcare Business, San Francisco
        </div>
      </section>

      {/* Global Locations */}
      <section className="max-w-6xl mx-auto py-10 mb-10">
        <h2 className="text-3xl text-center font-extrabold text-emerald-800 mb-4">
          HELLOLEADS CRM IS GLOBAL
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {regions.map((r, idx) => (
            <div
              key={r.name}
              className="bg-white rounded-xl shadow border flex flex-col items-center text-center"
            >
              <div className="font-bold text-xl py-4">{r.name}</div>
              <img
                src={r.img}
                alt={r.name}
                className="w-60 h-40 object-cover object-center rounded shadow-sm mb-3"
              />
              <div className="text-gray-800">{r.city}</div>
              <div className="border-t text-gray-600 p-4 text-sm">{r.address}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Icons */}
      <section className="max-w-5xl mx-auto py-8 mt-12 mb-8">
      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        {/* Register Demo */}
        <Link className="flex flex-col items-center group transition hover:scale-105">
          <img src={contact_support} alt="" />
          
        </Link>
        {/* FAQ */}
        <Link to='/fAQSection' className="flex flex-col items-center group transition hover:scale-105">
          <img src={faq} alt="" />
          
        </Link>
        {/* Contact Support */}
        <Link to='/lead-form' className="flex flex-col items-center group transition hover:scale-105">
          <img src={schedule_demo} alt="" />
          
        </Link>
      </div>
    </section>
    </div>
  );
}
