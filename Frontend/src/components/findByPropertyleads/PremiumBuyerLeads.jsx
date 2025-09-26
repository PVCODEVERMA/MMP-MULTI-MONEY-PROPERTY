import React from "react";
import { Link } from "react-router-dom";
import { Star, Building2, Users, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Building2 className="h-10 w-10 text-[#ff9c00]" />,
    title: "Fresh Buyer Inquiries",
    desc: "Get real-time property leads directly from serious buyers in your area.",
  },
  {
    icon: <Users className="h-10 w-10 text-[#154056]" />,
    title: "Direct Broker Contact",
    desc: "Leads come straight to you – no fake numbers or shared data.",
  },
  {
    icon: <LineChart className="h-10 w-10 text-[#ff9c00]" />,
    title: "Track & Convert",
    desc: "Your personal dashboard helps you monitor, follow up, and close deals faster.",
  },
];

const PremiumBuyerLeads = () => {
  return (
    <section className="bg-[#f7f7f7] py-16 px-6">
      <div className="max-w-7xl mx-auto text-center space-y-16">
     
        <div className="">
          <div className="">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Premium Buyer Inquiries</h2>
                <p className="text-sm text-white/90">
                  Exclusive broker-only buyer leads
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-slate-600 text-sm leading-relaxed">
              Get access to verified, high-intent property buyers in top cities. 
              Our premium inquiries are filtered, exclusive, and ready for quick conversions.
            </p>

            <ul className="space-y-2 text-sm text-slate-700">
              <li>✅ Verified mobile & email leads</li>
              <li>✅ Buyers searching in Delhi NCR, Noida, Gurgaon, Mumbai</li>
              <li>✅ Delivered instantly via WhatsApp, Email & Dashboard</li>
              <li>✅ High conversion rate with serious buyers</li>
            </ul>

            
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#154056] mb-4"
          >
            Real Estate Leads that <span className="text-[#ff9c00]">Convert</span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Stop wasting time on fake or outdated leads. With MMP, get verified
            property inquiries and grow your sales pipeline today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-[#154056] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12"
          >
            <button className="px-8 py-3 bg-[#ff9c00] text-white font-semibold rounded-xl shadow hover:bg-[#e68a00] transition">
              Get Leads Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumBuyerLeads;
