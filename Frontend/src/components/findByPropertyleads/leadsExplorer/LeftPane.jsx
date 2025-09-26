
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, TrendingUp, Star, List } from "lucide-react";

export default function LeftPane() {
  const [open, setOpen] = useState(false);          
  const base =
    "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 whitespace-nowrap overflow-hidden transition-colors";

  return (
    <aside
      className={`
        h-72  /* below the header */ 
        ${open ? "w-48 sm:w-56" : "w-12"}
        bg-white shadow-sm 
        flex flex-col transition-all duration-300
        fixed sm:sticky top-44 left-0 z-40 rounded-2xl
      `}
    >
      {/* ─── TOGGLE ─── */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center h-12 mx-auto text-gray-600 hover:text-[#ff9c00] rounded-md transition cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {/* ─── LINKS ─── */}
      <nav className="mt-2 flex-1 space-y-1 overflow-y-auto">
        <NavLink
          to="/home/leads/lock/trendingLeads"
          className={({ isActive }) =>
            `${base} ${isActive ? "bg-orange-100 hover:text-[#ff9c00]" : "hover:bg-gray-100"}`
          }
        >
          <TrendingUp size={18} />
          {open && "Trending Leads"}
        </NavLink>

        <NavLink
          to="/home/leads/lock/popularLeads"
          className={({ isActive }) =>
            `${base} ${isActive ? "bg-blue-100 hover:text-[#ff9c00]" : "hover:bg-gray-100"}`
          }
        >
          <Star size={18} />
          {open && "Popular Leads"}
        </NavLink>

        <NavLink
          to="/home/leads/lock/allLeads"
          className={({ isActive }) =>
            `${base} ${isActive ? "bg-gray-200 hover:text-[#ff9c00]" : "hover:bg-gray-100"}`
          }
        >
          <List size={18} />
          {open && "All Leads"}
        </NavLink>
      </nav>
    </aside>
  );
}
