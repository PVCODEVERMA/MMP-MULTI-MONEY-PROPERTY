import React from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { BuildingOffice2Icon, BoltIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function RealEstateLeads() {
  return (
    <div className=" bg-[#F7F7F7]">
      {/* Hero Section */}
      <section className="relative ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 text-center md:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full shadow-sm">
             MMP Solutions
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Real Estate Buyer Leads <span className="text-[#FF9C00]">(India)</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl">
            Get <span className="font-semibold text-slate-800">location-based buyer inquiries</span> from Delhi, Noida,
            Gurgaon, Faridabad and Mumbai with real-time delivery and dashboard access.
          </p>

          {/* Features */}
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Target by city/area/project with form + ads capture",
              "Instant delivery to WhatsApp, Email, and Dashboard",
              "Packages (quota) or Wallet (₹/lead) with GST invoices",
            ].map((text, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300"
              >
                <CheckCircleIcon className="h-6 w-6 text-[#FF9C00] shrink-0" />
                <span className="text-slate-700">{text}</span>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#FF9C00] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Talk to Sales <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              to="/home/leads/plans"
              className="inline-flex items-center justify-center gap-2 border border-orange-300 text-[#ff9c00] font-semibold px-6 py-3 rounded-xl bg-white transition duration-300 hover:bg-orange-50"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">How It <span className="text-[#ff9c00]">Works</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Lead Capture",
                desc: "Leads captured via campaigns & portal forms with duplicate checks.",
                icon: <BuildingOffice2Icon className="h-10 w-10 text-[#FF9C00]" />,
              },
              {
                title: "Smart Routing",
                desc: "Shared (up to 3) or Exclusive delivery modes with instant assignment.",
                icon: <BoltIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
              {
                title: "Dashboard Access",
                desc: "Full visibility with broker dashboard, exports & real-time tracking.",
                icon: <UserGroupIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center bg-orange-50/50 p-6 rounded-xl hover:shadow-md transition"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-slate-800">{step.title}</h3>
                <p className="mt-2 text-slate-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
