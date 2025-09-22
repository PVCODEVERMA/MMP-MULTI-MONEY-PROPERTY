import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircleIcon } from "lucide-react";

export default function Billing() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className=" ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <span className="inline-block text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
             Billing
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
            Packages &amp; Wallet Billing
          </h1>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Razorpay payments, automatic GST invoices, and clear revenue reporting.
          </p>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 bg-[#FF9C00] text-white font-semibold px-5 py-3 rounded-xl shadow hover:brightness-95 transition"
            >
              See Plans <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-orange-300 text-orange-600 font-semibold px-5 py-3 rounded-xl bg-white hover:bg-orange-50 transition"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Packages Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-lg font-bold text-slate-900 mb-2">📦 Packages</h3>
            <p className="text-slate-600 mb-3">Choose a fixed quota plan for predictable costs.</p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2"><span> <CheckCircleIcon className="h-6 w-6 text-[#FF9C00] shrink-0" /></span><span>Fixed quota leads</span></li>
              <li className="flex gap-2"><span> <CheckCircleIcon className="h-6 w-6 text-[#FF9C00] shrink-0" /></span><span>Best for high-volume brokers</span></li>
            </ul>
          </div>

          {/* Wallet Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-lg font-bold text-slate-900 mb-2"> Wallet</h3>
            <p className="text-slate-600 mb-3">Pay per lead with full control of spend.</p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2"><span> <CheckCircleIcon className="h-6 w-6 text-[#FF9C00] shrink-0" /></span><span>₹/lead pay-as-you-go</span></li>
              <li className="flex gap-2"><span> <CheckCircleIcon className="h-6 w-6 text-[#FF9C00] shrink-0" /></span><span>Auto-GST invoices & breakdowns</span></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
