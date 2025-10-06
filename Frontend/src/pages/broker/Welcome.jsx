
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaArrowRight,
  FaCrown,
  FaCheck,
  FaHome,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

import mmp_imag from "../../assets/registerimg/form_img.avif";
import mmp_logo from "../../assets/componyLogos/logo.jpg";

import logo1 from "../../assets/componyLogos/logo.jpg";
import logo2 from "../../assets/componyLogos/logo.jpg";
import logo3 from "../../assets/componyLogos/logo.jpg";
import logo4 from "../../assets/componyLogos/logo.jpg";
import logo5 from "../../assets/componyLogos/logo.jpg";
import logo6 from "../../assets/componyLogos/logo.jpg";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

export default function Welcome() {
  const navigate = useNavigate();

  const handleContinue = () => navigate("/home/leads");

  return (
    <div className="w-full h-screen flex">
      {/* Background */}
      <div className="fixed inset-0 w-full h-full">
        <img
          src={mmp_imag}
          alt="Real Estate Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row">
        {/* Left */}
        <section className="lg:w-1/2 w-full flex flex-col justify-between p-6 lg:p-12 text-white">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <img
              src={mmp_logo}
              alt="MMP Logo"
              className="w-12 h-12 lg:w-25 lg:h-25 rounded-lg"
            />
          </div>

          {/* Headline */}
          <div className="lg:mt-3">
            <h2 className=" property-hero-title leading-tight mb-6 mt-2">
              Find <span className="text-orange-500">High-Intent</span> Property
              Leads
            </h2>

            <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl">
              Join India’s fastest-growing broker network—already trusted by
              500+ professionals.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <StatBox
                icon={<FaHome className="text-white" />}
                bg="bg-orange-500"
                number="10,000+"
                label="Verified Properties"
              />
              <StatBox
                icon={<FaUsers className="text-white" />}
                bg="bg-green-500"
                number="500+"
                label="Active Brokers"
              />
              <StatBox
                icon={<FaChartLine className="text-white" />}
                bg="bg-blue-500"
                number="95%"
                label="Lead-to-Visit Success"
              />
            </div>
          </div>

          {/* Social Proof */}
          <footer className="mt-auto space-y-8">
            {/* Hide logos until real ones are ready */}
            <div className="hidden lg:block">
              <p className="text-gray-300 text-sm mb-4">
                Trusted by top brokers at
              </p>
              <div className="flex flex-wrap  gap-4 lg:gap-6">
                {logos.map((logo, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 lg:w-20 lg:h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center p-2 border border-white/20"
                  >
                    <img
                      src={logo}
                      alt={`Partner ${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <StarRating count={5} />
                <span className="font-semibold">4.9/5</span>
              </div>
              <div className="h-6 w-px bg-gray-400" />
              <p className="text-gray-300 text-sm">500+ Verified Brokers</p>
            </div>
          </footer>
        </section>

        {/* Right – CTA Card */}
        <section className="lg:w-1/2 w-full flex items-center justify-center p-6 lg:p-12">
          <div className="bg-[#f7f7f7] mb-16  backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 lg:p-12 max-w-md w-full">
            {/* Welcome */}
            <header className="text-center ">
              <span className="inline-flex items-center px-4 py-2 bg-[#ff9c00] text-white rounded-full text-sm font-semibold mb-6">
                🎉 Registration Successful!
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                Welcome to <span className="text-[#ff9c00]">MMP</span>
              </h3>
              <p className="text-gray-600 mb-2">
                Your gateway to premium real-estate leads
              </p>
            </header>

            {/* Benefits */}
            <ul className="space-y-2 mb-4">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-[#ff9c00] rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Instant access to 1,000+ active leads</span>
              </div>

              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-[#ff9c00] rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Verified buyer contacts</span>
              </div>

              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-[#ff9c00] rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Get real-time lead alerts</span>
              </div>

              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-[#ff9c00] rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Dedicated broker success team</span>
              </div>
            </ul>

            {/* CTAs */}
            <div className="space-y-4">
              <button
                onClick={handleContinue}
                className="hidden md:flex w-full bg-[#ff9c00] hover:bg-[#154056] text-white py-4 px-6 rounded-xl font-semibold items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
              >
                Explore Leads Dashboard
                <FaArrowRight className="ml-2" />
              </button>
            </div>

            {/* Premium blurb */}
            <div className="mt-6  p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <FaCrown className="text-amber-500" />
                <span className="text-sm font-semibold text-gray-900">
                  Premium Benefits
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Priority leads Advanced analytics Dedicated account manager 24/7
                support
              </p>
            </div>

            {/* Security */}
            <p className="mt-6 text-center text-xs text-gray-500">
              🔒 SSL-encrypted. Your data stays secure.
            </p>
          </div>
        </section>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-white/95 backdrop-blur-lg border-t border-gray-200 p-4">
        <button
          onClick={handleContinue}
          className="w-full bg-[#ff9c00] hover:bg-[#154056] text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          Get Started with Leads
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
}

/* ───────────── Helper Components ───────────── */

function StatBox({ icon, bg, number, label }) {
  return (
    <div className="flex items-center space-x-3">
      <div
        className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <p className="font-semibold">{number}</p>
        <p className="text-gray-300 text-sm">{label}</p>
      </div>
    </div>
  );
}

function Benefit({ text }) {
  return (
    <li className="flex items-center space-x-3">
      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
        <FaCheck className="text-green-600 text-xs" />
      </div>
      <span className="text-gray-700 text-sm">{text}</span>
    </li>
  );
}

function StarRating({ count }) {
  return (
    <div className="flex">
      {[...Array(count)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400 text-sm" />
      ))}
    </div>
  );
}
