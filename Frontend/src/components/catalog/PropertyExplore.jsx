
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ---------------- BUY/RENT OPTIONS ----------------
const BUY_SECTIONS = [
  {
    heading: "Popular Residential Searches",
    items: [
      { label: "Property for Sale in New Delhi", to: "/listings/delhi/sale/all" },
      { label: "Flats in New Delhi", to: "/listings/delhi/sale/flats" },
      { label: "Studio Apartments in New Delhi", to: "/listings/delhi/sale/studio" },
      { label: "Resale House in New Delhi", to: "/listings/delhi/sale/house-resale" },
    ],
  },
  {
    heading: "Popular BHK Searches",
    items: [
      { label: "1 BHK Flats in New Delhi", to: "/listings/delhi/sale/flats-1bhk" },
      { label: "2 BHK Flats in New Delhi", to: "/listings/delhi/sale/flats-2bhk" },
      { label: "3 BHK Flats in New Delhi", to: "/listings/delhi/sale/flats-3bhk" },
      { label: "4 BHK Flats in New Delhi", to: "/listings/delhi/sale/flats-4bhk" },
    ],
  },
];

const RENT_SECTIONS = [
  {
    heading: "Popular Residential Searches",
    items: [
      { label: "Property for Rent in New Delhi", to: "/listings/delhi/rent/all" },
      { label: "Flats for Rent in New Delhi", to: "/listings/delhi/rent/flats" },
      { label: "Houses for Rent in New Delhi", to: "/listings/delhi/rent/houses" },
    ],
  },
  {
    heading: "Popular BHK Searches",
    items: [
      { label: "1 BHK for Rent", to: "/listings/delhi/rent/1bhk" },
      { label: "2 BHK for Rent", to: "/listings/delhi/rent/2bhk" },
      { label: "3 BHK for Rent", to: "/listings/delhi/rent/3bhk" },
    ],
  },
];

function Section({ heading, items }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-[#154058] mb-3">{heading}</h3>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i}>
            <Link
              to={it.to}
              className="text-[#154058] hover:text-orange-500 transition-colors"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PropertyOptions({ city = "New Delhi", brand = { name: "MMP" } }) {
  const [tab, setTab] = useState("buy");
  const SECTIONS = tab === "buy" ? BUY_SECTIONS : RENT_SECTIONS;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#154058">
          Property Options in {city}
        </h2>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-100 text-[#FF9C00]">
          {brand.name}
        </span>
      </div>

      <div className="flex items-center gap-6 border-b mb-6">
        {["buy", "rent"].map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 -mb-px font-semibold cursor-pointer ${
                active
                  ? "text-[#FF9C00] border-b-2 border-[#FF9C00]"
                  : "text-[#154058] hover:text-[#FF9C00]"
              }`}
            >
              {t === "buy" ? "Buy" : "Rent"}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SECTIONS.map((sec, idx) => (
          <Section key={idx} heading={sec.heading} items={sec.items} />
        ))}
      </div>
    </div>
  );
}

// ---------------- PROPERTY TYPES ----------------
const RESIDENTIAL = [
  { label: "Apartment", slug: "apartment" },
  { label: "Townhouse", slug: "townhouse" },
  { label: "Villa Compound", slug: "villa-compound" },
  { label: "Land", slug: "land" },
  { label: "Building", slug: "building" },
  { label: "Villa", slug: "villa" },
  { label: "Penthouse", slug: "penthouse" },
  { label: "Hotel Apartment", slug: "hotel-apartment" },
  { label: "Floor", slug: "floor" },
];

const COMMERCIAL = [
  { label: "Office", slug: "office" },
  { label: "Warehouse", slug: "warehouse" },
  { label: "Villa", slug: "villa" },
  { label: "Land", slug: "land" },
  { label: "Building", slug: "building" },
  { label: "Industrial Land", slug: "industrial-land" },
  { label: "Showroom", slug: "showroom" },
  { label: "Shop", slug: "shop" },
  { label: "Labour Camp", slug: "labour-camp" },
  { label: "Bulk Unit", slug: "bulk-unit" },
  { label: "Floor", slug: "floor" },
  { label: "Factory", slug: "factory" },
  { label: "Mixed Use Land", slug: "mixed-use-land" },
  { label: "Other Commercial", slug: "other-commercial" },
];

function TypeGroup({ title, basePath, items }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="text-base font-semibold text-[#154058] mb-3">{title}</h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((it) => (
          <li key={it.slug}>
            <Link
              to={`${basePath}/${it.slug}`}
              className="block rounded-lg border border-slate-200 px-3 py-2 text-slate-700 hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PropertyTypeOptions({ citySlug = "delhi", brand = { name: "MMP" } }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Property Types in {citySlug.toUpperCase()}
        </h2>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-100 text-orange-700">
          {brand.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TypeGroup
          title="Residential"
          basePath={`/types/${citySlug}/residential`}
          items={RESIDENTIAL}
        />
        <TypeGroup
          title="Commercial"
          basePath={`/types/${citySlug}/commercial`}
          items={COMMERCIAL}
        />
      </div>
    </div>
  );
}

// ---------------- MAIN PAGE WITH SLIDES ----------------
export default function PropertyExplore() {
  const [slide, setSlide] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Navigation */}
      <div className="flex gap-6 justify-center mb-8">
        <button
          onClick={() => setSlide(0)}
          className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
            slide === 0
              ? "bg-[#FF9C00] text-white"
              : "bg-slate-100 text-slate-700 hover:bg-orange-100"
          }`}
        >
          Property Options
        </button>
        <button
          onClick={() => setSlide(1)}
          className={`px-4 py-2 rounded-lg font-semibold  cursor-pointer${
            slide === 1
              ? "bg-[#FF9C00] text-white"
              : "bg-slate-100 text-slate-700 hover:bg-orange-100"
          }`}
        >
          Property Types
        </button>
      </div>

      {/* Slide Content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {slide === 0 && (
            <motion.div
              key="options"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PropertyOptions />
            </motion.div>
          )}
          {slide === 1 && (
            <motion.div
              key="types"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PropertyTypeOptions />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
