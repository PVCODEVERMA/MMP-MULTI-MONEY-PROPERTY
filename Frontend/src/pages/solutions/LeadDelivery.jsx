import React from "react";
import {
  CheckCircleIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function LeadDelivery() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Hero Header */}
      <header className="relative ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center md:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full shadow-sm">
             Delivery
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            WhatsApp / Email Delivery
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl">
            Send leads instantly via{" "}
            <span className="font-semibold text-slate-800">Interakt / Gupshup</span>, Email and show them in the Broker
            Dashboard for real-time access.
          </p>
        </div>
      </header>

      {/* Features Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Delivery Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "CRM Push via Webhook",
                desc: "Seamless integration with your CRM through automated webhook delivery.",
                icon: <ArrowPathIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
              {
                title: "Balance & Renewal Alerts",
                desc: "Stay informed with low-balance warnings and timely renewal reminders.",
                icon: <DevicePhoneMobileIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
              {
                title: "CSV / Excel Exports",
                desc: "Export leads easily for offline work, reports, and team sharing.",
                icon: <DocumentArrowDownIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center bg-orange-50/50 p-6 rounded-xl hover:shadow-md transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
                <p className="mt-2 text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick Checklist */}
          <ul className="mt-10 space-y-3 max-w-xl mx-auto">
            {[
              "Webhook for CRM push",
              "Low-balance and renewal reminders",
              "CSV/Excel exports for offline work",
            ].map((text, idx) => (
              <li key={idx} className="flex items-center gap-3 text-slate-700">
                <CheckCircleIcon className="h-5 w-5 text-[#FF9C00] shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Delivery Flow */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Delivery Flow</h2>
          <div className="relative border-l-2 border-orange-200 max-w-2xl mx-auto">
            {[
              "Lead Captured",
              "Instant WhatsApp / Email sent",
              "Webhook pushes to CRM",
              "Broker Dashboard updated",
              "Export available anytime",
            ].map((step, idx) => (
              <div key={idx} className="mb-8 ml-6">
                <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-[#FF9C00] text-white text-xs font-bold">
                  {idx + 1}
                </div>
                <p className="text-slate-700 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
