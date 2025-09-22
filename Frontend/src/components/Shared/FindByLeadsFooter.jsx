import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/componyLogos/logo.jpg";
const FindByLeadsFooter = () => {
  return (
    <footer className="bg-[#f7f7f7] text-[#154056] ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left */}
        <div>
          <img
            src={logo}
            className="h-24 w-auto transition-transform hover:scale-105"
            alt="MMP Logo"
          />
          <p className="mt-2 text-sm">
            Get buyer inquiries straight to your dashboard.
          </p>
          <div>
            <div className="font-semibold text-[#154056]">Quick links</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Why MMP?</li>
              <li>How it works</li>
              <li>Pricing</li>
            </ul>
          </div>
        </div>

        {/* Middle */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/findByLeads" className="hover:text-[#FF9C00]">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/plans" className="hover:text-[#FF9C00]">
                Plans
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#FF9C00]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <Link to="/findByLeadsContact" className="font-semibold mb-4">
            Contact
          </Link>
          <p className="text-sm">Email: Business@Multimoneyproperty.com</p>
          <p className="text-sm">ADD: - Kalindi Kunj Delhi – 110025 </p>
          <p className="text-sm">Phone: +91-9990725864 </p>
        </div>
      </div>

      <div className="text-center text-lg font-bold bg-[#ffc900] text-white mt-6 p-4">
        © {new Date().getFullYear()} MMP Leads. All rights reserved.
      </div>
    </footer>
  );
};

export default FindByLeadsFooter;
