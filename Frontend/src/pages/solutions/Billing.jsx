import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CreditCard,
  Shield,
  Receipt,
  BarChart3,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Billing() {
  const features = [
    { icon: Shield, text: "Secure Razorpay Payments" },
    { icon: Receipt, text: "Auto-GST Invoices" },
    { icon: BarChart3, text: "Revenue Reporting" },
    { icon: Download, text: "Export Financial Data" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f7f7f7] blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold bg-white text-[#FF9C00] px-5 py-2 rounded-full mb-6 shadow-sm border border-orange-200">
              <CreditCard className="w-4 h-4" />
              Flexible Billing Options
            </span>

            <h1 className="mt-4 text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Simple, Transparent
              <span className="block text-[#FF9C00] drop-shadow-sm">
                Pricing Plans
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Choose between flexible wallet billing or subscription plans —
              complete with secure Razorpay payments, GST-compliant invoices, and
              revenue analytics.
            </p>

            {/* Features */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5 justify-center max-w-3xl mx-auto">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  className="flex items-center justify-center gap-2 text-slate-700 bg-white py-3 px-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
                >
                  <feature.icon className="w-4 h-4 text-[#FF9C00]" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/home/leads/plans"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF9C00] to-orange-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 transform hover:-translate-y-1"
              >
                Compare Plans
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 border border-slate-300 text-slate-800 font-semibold px-8 py-4 rounded-xl bg-white hover:bg-slate-50 hover:shadow-md transition-all duration-300"
              >
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* FAQ Section */}
      <main className="relative max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-3">
              Common Questions
            </h3>
            <p className="text-slate-600">
              Get quick answers about billing, invoices, and payment safety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#FF9C00]" />
                GST Invoices
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Automatically generated GST-compliant invoices for all
                transactions. Download them anytime from your dashboard.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#FF9C00]" />
                Payment Security
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                All payments are processed through Razorpay with PCI DSS
                compliance and end-to-end encryption for your peace of mind.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Custom Quote CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-orange-100 to-amber-50 rounded-3xl p-10 shadow-lg border border-orange-200/60">
            <h3 className="text-3xl font-bold text-slate-900 mb-3">
              Need Custom Pricing?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              For large teams or enterprises, we offer tailored plans with
              dedicated support and advanced reporting features.
            </p>
            <Link
              to="/home/leads/plans"
              className="bg-gradient-to-r from-[#FF9C00] to-orange-500 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              Request Custom Quote
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
