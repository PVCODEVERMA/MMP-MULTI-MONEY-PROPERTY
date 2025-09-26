import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { X, Search } from "lucide-react";

import LocationSelector from "../locationSelector/LocationSelector.jsx";
// import ProfileMenu from "../profile/ProfileMenu.jsx";   // ✅ NEW
import logo from "../../assets/componyLogos/logo.jpg";
import ProfileMenu from "./ProfileMenu.jsx";

/* intent options */
const INTENT_OPTS = [
  { value: "",      label: "All Intents" },
  { value: "high",  label: "High" },
  { value: "medium",label: "Medium" },
  { value: "low",   label: "Low" },
];

export default function FilterHeader() {
  /* ── URL handler ─────────────────────────── */
  const [sp, setSp]  = useSearchParams();

  /* draft (unsaved) filter values */
  const [draftLocation, setDraftLocation] = useState(sp.get("location") || "");
  const [draftIntent,   setDraftIntent]   = useState(sp.get("intent")   || "");

  /* UI state */
  const [showFilters,   setShowFilters]   = useState(false);
  const mobRef  = useRef(null);

  /* write all filters to URL when Search is clicked */
  const applyFilters = () => {
    const nxt = new URLSearchParams();
    if (draftLocation) nxt.set("location", draftLocation);
    if (draftIntent)   nxt.set("intent",   draftIntent);
    setSp(nxt, { replace:true });
  };

  /* close mobile popup on outside click */
  useEffect(() => {
    const close = (e) => {
      if (showFilters && !mobRef.current?.contains(e.target)) setShowFilters(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [showFilters]);

  const closeAll = () => { setShowFilters(false); };

  /* ── RENDER ──────────────────────────────── */
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#f7f7f7]">
      {/*  DESKTOP BAR */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
        {/* logo */}
        <Link to="/findByLeads" className="flex-shrink-0">
          <img src={logo} alt="MMP" className="h-20 w-auto transition-transform hover:scale-105" />
        </Link>

        {/* filters (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-2xl">
          <LocationSelector
            selectedLocation={draftLocation}
            onLocationChange={setDraftLocation}
            onClear={() => setDraftLocation("")}
            className="w-48"
          />

          <select
            value={draftIntent}
            onChange={(e)=>setDraftIntent(e.target.value)}
            className="w-40 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
          >
            {INTENT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Search button */}
          <button
            onClick={applyFilters}
            className="px-6 py-2.5 bg-gradient-to-r from-[#FF9C00] to-[#ff6b00] text-white rounded-lg font-medium hover:from-[#154056] hover:to-[#154056] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>

        {/*  MOBILE filter trigger */}
        <div className="md:hidden flex-1 flex items-center justify-end">
          <button
            onClick={()=>setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#FF9C00] to-[#ff6b00] text-white rounded-lg font-medium cursor-pointer"
          >
            <Search size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/*  PROFILE MENU */}
        <ProfileMenu />
      </div>

      {/* 📱  MOBILE FILTER SHEET */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div ref={mobRef} className="flex flex-col h-full p-5">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b">
              <button 
                onClick={closeAll} 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={22} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
            </div>

            {/* Filters */}
            <div className="space-y-5 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <LocationSelector
                  selectedLocation={draftLocation}
                  onLocationChange={setDraftLocation}
                  onClear={()=>setDraftLocation("")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intent Level</label>
                <select
                  value={draftIntent}
                  onChange={(e)=>setDraftIntent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {INTENT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={()=>{ applyFilters(); closeAll(); }}
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#FF9C00] to-[#ff6b00] text-white font-semibold text-lg hover:from-[#FF8C00] hover:to-[#ff5a00] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 mt-6"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
