
import { Link } from "react-router-dom";

import {
 FaCheckCircle,
 FaArrowRight,
 FaBolt,
 FaUserCheck,
 FaRocket,
 FaEnvelopeOpen,
 FaShieldAlt,
} from "react-icons/fa";

import mmp_imag from "../../assets/registerimg/form_img.avif";

export default function PostSuccess() {
  return (
    <div 
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f7f7] to-[#f7f7f7] py-12 px-4"
    style={{
    backgroundImage: `url(${mmp_imag})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 sm:p-12 text-center transform hover:scale-[1.01] transition-all duration-300">
        
        {/* Animated Success Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
          <FaCheckCircle className="text-[#ff9c00] text-7xl mx-auto relative z-10" />
        </div>

        {/* Confirmation Badge */}
        <div className="inline-flex items-center bg-orange-200 border border-[#ff9c00] rounded-full px-4 py-2 mb-6">
          <FaRocket className="text-[ff7c00] mr-2" />
          <span className="text-[#154056] font-semibold text-sm">PROPERTY LIVE!</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#164057] mb-4 leading-tight">
          Your property is now <span className="text-[#ff9c00]">live!</span>
        </h1>

        {/* Success Message */}
        <div className="bg-blue-50 border-l-4 border-[#ff9c00] rounded-lg p-6 mb-8 text-left">
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong className="text-[#ff9c00]">Thank you for posting with MMP.</strong>  We've alerted high-intent buyers and channel partners in your area. Sit back while the enquiries roll in—most owners see your property within the first 24 hours
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <FaEnvelopeOpen className="text-[#ff9c00] text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#ff9c00]">24h</div>
            <div className="text-xs text-gray-600">Initial Responses</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <FaBolt className="text-[#ff9c00] text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#ff9c00]">3x</div>
            <div className="text-xs text-gray-600">More Visibility</div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-[#164057] mb-4 text-left">What happens next?</h3>
          <div className="space-y-4">
            <Step
              icon={<FaEnvelopeOpen className="text-white" />}
              title="Instant notifications sent"
              desc="Buyers and partners in your area have been notified instantly"
              color="bg-blue-500"
            />
            <Step
              icon={<FaUserCheck className="text-white" />}
              title="Lead matching begins"
              desc="We start connecting you with verified buyers"
              color="bg-green-500"
            />
            <Step
              icon={<FaBolt className="text-white" />}
              title="Enquiries start rolling in"
              desc="Expect first enquiries for your property within 24 hours"
              color="bg-orange-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#ff9c00] to-[#ff7c00] hover:from-[#e48900] hover:to-[#e26b00] text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Go to Back
            <FaArrowRight className="ml-3" />
          </Link>

        
        </div>

     
      </div>
    </div>
  );
}

/* ---------- Step Component ---------- */
function Step({ icon, title, desc, color }) {
  return (
    <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white transition-colors duration-200">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color} shadow-md flex-shrink-0`}>
        {icon}
      </div>
      <div className="text-left">
        <h3 className="text-base font-semibold text-[#164057]">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </div>
  );
}