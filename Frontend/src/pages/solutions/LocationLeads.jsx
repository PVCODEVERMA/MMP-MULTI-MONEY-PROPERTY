import React from "react";
import { MapPin } from "lucide-react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
export default function LocationLeads() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center md:text-left">
          <span className="inline-flex items-center gap-2 text-sm font-medium bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full shadow-sm">
            <MapPin className="w-4 h-4" /> Geo Targeting
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            City & Area Targeting
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Run micro-campaigns at city, sector or project level to match live inventory.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Key Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              "City, locality and pin-code filters",
              "Project tags for precision delivery",
              "Auto-enrich from pincode (roadmap)",
            ].map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 hover:bg-orange-50 transition-colors"
              >
                <CheckCircleIcon className="h-6 w-6 text-[#FF9C00] shrink-0" />
                <span className="text-slate-700 font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
