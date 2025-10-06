import React from "react";
import { Link } from "react-router-dom";

export default function PlanCard({
  name,
  tagline,
  price,
  duration,
  features = [],
  deliverables = [],
  limitations = [],
  benefits = [],
  buttonText,
  highlight = false,
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
    <div
      className={`relative rounded-2xl shadow-lg bg-white p-6 flex flex-col h-full transition transform hover:-translate-y-1 hover:shadow-xl 
      ${highlight ? "border-2 border-[#FF9C00] scale-[1.03]" : ""}`}
    >
      {/* Highlight Badge */}
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF9C00] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Most Popular
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-[#164058] mb-2">{name}</h3>
      {tagline && <p className="text-sm text-gray-600 mb-2">{tagline}</p>}


      {/* Price + Duration */}
      {price && (
        <div className="text-2xl font-extrabold text-[#154056] mb-2">
          {price}
        </div>
      )}

      
    {/* CTA with Link */}
      <Link
        to="/home/leads/checkout"
        className="block text-center rounded-full px-4 py-4 text-[#ff9c00] text-lg font-semibold border-2 hover:bg-orange-100  transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300"
        // style={{ backgroundColor: "#164058" }}
      >
        {buttonText}
      </Link>

      <p className="mt-2 text-[10px] text-slate-500 text-center">
        18% GST applicable
      </p>
      {duration && <p className="text-xs text-gray-500 mb-4">{duration}</p>}

      {/* Features */}
      {features.length > 0 && (
        <>
          <h4 className="font-semibold text-sm text-[#164058] mb-2">
            Features
          </h4>
          {renderList(features)}
        </>
      )}

      {/* Deliverables */}
      {deliverables.length > 0 && (
        <>
          <h4 className="font-semibold text-sm text-[#164058] mb-2">
            Deliverables
          </h4>
          {renderList(deliverables)}
        </>
      )}

      

      {/* Limitations */}
      {limitations.length > 0 && (
        <>
          <h4 className="font-semibold text-sm text-[#164058] mb-2">
            Limitations
          </h4>
          {renderList(limitations)}
        </>
      )}

      {/* Benefits */}
      {benefits.length > 0 && (
        <>
          <h4 className="font-semibold text-sm text-[#164058] mb-2">
            Other Benefits
          </h4>
          {renderList(benefits)}
        </>
      )}

    
    </div>
  );
}
