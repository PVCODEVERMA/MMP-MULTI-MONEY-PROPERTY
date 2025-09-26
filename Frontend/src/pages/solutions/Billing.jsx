import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Zap, CreditCard, Receipt, BarChart3, Shield, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function Billing() {
  const features = [
    { icon: Shield, text: "Secure Razorpay Payments" },
    { icon: Receipt, text: "Auto-GST Invoices" },
    { icon: BarChart3, text: "Revenue Reporting" },
    { icon: Download, text: "Export Financial Data" }
  ];

  const pricingCards = [
    {
      type: "packages",
      icon: "📦",
      title: "Packages",
      subtitle: "Fixed quota plans for predictable costs",
      price: "From ₹9,999/month",
      description: "Ideal for high-volume brokers with consistent lead requirements",
      features: [
        "Fixed monthly lead quota",
        "Volume discounts available",
        "Priority support",
        "Custom location targeting",
        "Advanced analytics dashboard"
      ],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      cta: "View Packages"
    },
    {
      type: "wallet",
      icon: "💰",
      title: "Wallet",
      subtitle: "Pay-per-lead with full spending control",
      price: "Pay as you go",
      description: "Perfect for growing brokers and flexible requirements",
      features: [
        "₹150-300 per lead (varies by type)",
        "No monthly commitment",
        "Real-time spending tracking",
        "Instant lead delivery",
        "Auto-low balance alerts"
      ],
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      cta: "Setup Wallet"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold bg-white text-[#FF9C00] px-4 py-2 rounded-full mb-6 shadow-sm border border-orange-100">
              <CreditCard className="w-4 h-4" />
              Flexible Billing Options
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Simple, Transparent
              <span className="block text-[#FF9C00]">Pricing</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-3xl leading-relaxed">
              Choose between fixed packages or pay-as-you-go wallet billing. All plans include automatic GST invoices, 
              secure Razorpay payments, and detailed revenue reporting.
            </p>

            {/* Features Grid */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-2 text-slate-700"
                >
                  <feature.icon className="w-4 h-4 text-[#FF9C00]" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/plans"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF9C00] to-orange-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Compare Plans
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 border border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-xl bg-white hover:bg-slate-50 transition-all duration-300"
              >
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Pricing Cards */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {pricingCards.map((card, index) => (
            <motion.div
              key={card.type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 + 0.4 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className={`bg-[#f7f7f7] ${card.bgGradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${card.borderColor} h-full flex flex-col`}>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{card.icon}</div>
                  <h3 className="text-2xl font-bold text-[#154056]">{card.title}</h3>
                  <p className="text-slate-600 mt-2">{card.subtitle}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className={`text-3xl font-bold text-[#154056] ${card.gradient} `}>
                    {card.price}
                  </div>
                  <p className="text-slate-600 text-sm mt-2">{card.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {card.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ff9c00] mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  to={card.type === "packages" ? "/home/leads/plans" : "/wallet"}
                  className={`w-full bg-orange-500 ${card.gradient} text-white font-semibold py-4 px-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 inline-flex items-center justify-center gap-2`}
                >
                  {card.cta}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-lg border border-slate-100 max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Common Questions</h3>
            <p className="text-slate-600">Get quick answers about billing and payments</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl p-6">
              <h4 className="font-semibold text-slate-900 mb-2">GST Invoices</h4>
              <p className="text-slate-600 text-sm">Automatically generated GST-compliant invoices for all transactions. Download anytime from your dashboard.</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h4 className="font-semibold text-slate-900 mb-2">Payment Security</h4>
              <p className="text-slate-600 text-sm">All payments processed securely via Razorpay with bank-level encryption and PCI DSS compliance.</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 shadow-lg border border-orange-100/50">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Need Custom Pricing?</h3>
            <p className="text-slate-600 mb-6">Large teams and enterprise customers can get custom quotes with dedicated support.</p>
            <button className="bg-gradient-to-r from-[#FF9C00] to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer">
             <a href="/home/leads/plans"> Request Custom Quote</a>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}