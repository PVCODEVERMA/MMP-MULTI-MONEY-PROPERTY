import React from "react";
import { CheckCircleIcon, GlobeAltIcon, BuildingOffice2Icon, MapIcon } from "@heroicons/react/24/outline";

export default function ListingsSEO() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Hero Header */}
      <header className="relative ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center md:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full shadow-sm">
             Portal & SEO
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Listings &amp; SEO Pages
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl">
            Project, city and area pages with <span className="font-semibold text-slate-800">integrated forms</span>,
            plus auto-sitemap & optimized content to capture organic demand.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Free vs Featured Listings",
                desc: "Boost visibility with highlighted listings that get higher CTR.",
                icon: <BuildingOffice2Icon className="h-10 w-10 text-[#FF9C00]" />,
              },
              {
                title: "City & Area Templates",
                desc: "SEO-optimized templates with embedded forms to capture leads.",
                icon: <MapIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
              {
                title: "Auto Sitemap Generation",
                desc: "Dynamic XML sitemap for better indexing and Google visibility.",
                icon: <GlobeAltIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center bg-orange-50/50 p-6 rounded-xl hover:shadow-md transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
                <p className="mt-2 text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Simple List with Checkmarks */}
          <ul className="mt-10 space-y-3 max-w-xl mx-auto">
            {[
              "Free vs Featured listings (higher CTR)",
              "City/area templates with embedded forms",
              "Auto-sitemap generation",
            ].map((text, idx) => (
              <li key={idx} className="flex items-center gap-3 text-slate-700">
                <CheckCircleIcon className="h-5 w-5 text-[#FF9C00] shrink-0" />
                <span>{text}</span>
              </li> 
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
