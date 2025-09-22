import React from "react";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function CustomSlideCard({
  name,
  tagline,
  features = [],
  deliverables = [],
  limitations = [],
  benefits = [],
  buttonText,
}) {
 
  const renderList = (items = []) => (
    <ul className="space-y-1 mb-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 text-sm">
          {item.available ? (
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-400 text-white text-xs">
              ✔
            </span>
          ) : (
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 text-xs">
              ✖
            </span>
          )}
          {item.label}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative rounded-2xl border-2 border-dashed border-[#FF9C00]/40 p-5 bg-white shadow-lg h-full flex flex-col">
      {/* Badge */}
      <div className="absolute top-1 left-4 rounded-full bg-[#FF9C00] px-2 py-0.5 text-[10px] font-bold text-white tracking-wide">
        CUSTOM
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900">{name}</h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-600">{tagline}</p>

      {/* Icons */}
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3">
        <div className="flex items-center gap-1.5">
          <PhoneIcon className="w-4 h-4 text-[#FF9C00]" />
          <span className="text-xs text-gray-700">Real-time delivery</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPinIcon className="w-4 h-4 text-[#FF9C00]" />
          <span className="text-xs text-gray-700">Multi-city targeting</span>
        </div>
      </div>

      {/* Features */}
      {features.length > 0 && (
        <>
          <h4 className="mt-4 font-semibold text-xs text-[#164058]">Features</h4>
          {renderList(features)}
        </>
      )}

      {/* Deliverables */}
      {deliverables.length > 0 && (
        <>
          <h4 className="font-semibold text-xs text-[#164058]">Deliverables</h4>
          {renderList(deliverables)}
        </>
      )}

      {/* Limitations */}
      {limitations.length > 0 && (
        <>
          <h4 className="font-semibold text-xs text-[#164058]">Limitations</h4>
          {renderList(limitations)}
        </>
      )}

      {/* Benefits */}
      {benefits.length > 0 && (
        <>
          <h4 className="font-semibold text-xs text-[#164058]">Other Benefits</h4>
          {renderList(benefits)}
        </>
      )}

      {/* Button */}
      <div className="pt-4 mt-auto">
         <Link
          to={`/payment?plan=${encodeURIComponent(name)}`} 
          className="block text-center rounded-full px-4 py-4 text-white text-lg font-semibold shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300"
          style={{ backgroundColor: "#164058" }}
        >
          {buttonText}
        </Link>
        <p className="mt-2 text-[10px] text-slate-500 text-center">
          18% GST applicable
        </p>
      </div>
    </div>
  );
}
