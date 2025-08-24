import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { to: "/plans", label: "Pricing" },
  { to: "/ourCustomers", label: "Our Customers" },
  { to: "/projects", label: "Resources" },
  { to: "/lead-form", label: "Contact" },
  { to: "/login", label: "Login" },
  { to: "/signup", label: "Signup" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (to) =>
    to === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(to);

  return (
    <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Branding */}
          <Link to="/" className="font-extrabold text-2xl flex items-center gap-2">
            <span
              className="bg-white text-blue-700 rounded px-2 py-1 font-black tracking-tight shadow"
              style={{ letterSpacing: "-1.5px" }}
            >
              MMP
            </span>
            Portal
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center  font-medium">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`transition px-3 py-2 rounded 
                  ${isActive(to)
                    ? "bg-white text-blue-700 font-bold shadow"
                    : "hover:bg-blue-600 hover:text-white/90"}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Hamburger Icon */}
          <button className="md:hidden flex items-center" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 border-t border-blue-600">
          <div className="flex flex-col gap-2 px-4 py-3">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block px-3 py-2 rounded 
                  ${isActive(to)
                    ? "bg-white text-blue-700 font-bold"
                    : "hover:bg-blue-600 hover:text-white/90"}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
