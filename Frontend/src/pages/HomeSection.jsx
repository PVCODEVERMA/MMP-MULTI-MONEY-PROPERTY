import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LocationSelector from "../components/locationSelector/LocationSelector.jsx";
import Ads from "../components/ctaSection/Ads";

export default function HomeSection() {
  /* local UI state */
  const [showHeading, setShowHeading] = useState(false);
  const [loc, setLoc] = useState("");

  const navigate = useNavigate();

  /* fade-in animation for heading */
  useEffect(() => {
    const t = setTimeout(() => setShowHeading(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* build URL and navigate on Search */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!loc) return;

    /* turn "Delhi NCR" → "delhi-ncr" */
    const slug = loc.toLowerCase().trim().replace(/\s+/g, "-");
    navigate(`/${slug}`);
  };

  return (
    <section className="flex items-center justify-center bg-[#f7f7f7] px-4 py-10 sm:p-10">
      <div className="flex flex-col lg:flex-row w-full lg:w-[80%] gap-10">
        {/* ---------- left column ---------- */}
        <div className="flex-1 text-center lg:text-left lg:flex lg:flex-col lg:justify-center">
          {/* heading */}
          <div className="mb-8 lg:mb-12 text-center lg:text-left">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                        font-bold text-[#164058] mb-4 relative inline-block pb-2 
                        after:absolute after:left-0 after:right-0 after:bottom-0 
                        after:h-1 after:bg-gradient-to-r after:from-amber-400 
                        after:to-orange-500 after:w-3/4 after:mx-auto"
            >
              Discover your place to live
            </h2>

            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl 
                        text-slate-600 mx-auto max-w-2xl"
            >
              Get started in few clicks
            </p>
          </div>

          {/* search bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto lg:mx-0"
          >
            {/* location selector */}
            <div className="flex-1 min-w-0">
              <LocationSelector
                selectedLocation={loc}
                onLocationChange={setLoc}
                placeholder="Choose location…"
              />
            </div>

            {/* search button */}
            {/* <button
              type="submit"
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4
                         bg-[#FF9C00] text-white font-semibold rounded-xl shadow-md
                         hover:bg-orange-600 transition-colors disabled:opacity-60
                         min-w-[120px] sm:min-w-[140px]"
              disabled={!loc}
            >
              <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Search</span>
            </button> */}
          </form>
        </div>

        {/* ---------- right column: ads (desktop only) ---------- */}
        <div className="hidden lg:block lg:w-1/3">
          <Ads />
        </div>
      </div>
    </section>
  );
}
