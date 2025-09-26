import React from "react";
import {
  CheckCircleIcon,
  ArrowPathIcon,
  PauseCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

export default function Integrations() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] mb-10">
      {/* Hero Header */}
      <header className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center md:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-[#FF9C00] bg-opacity-20 text-white px-3 py-1 rounded-full shadow-sm">
            Automation
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-[#154956] leading-tight">
            Webhooks &amp; Automation
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl">
            Push to enterprise CRMs, auto-pause on inactivity, and trigger instant
            SMS/Email alerts to keep the pipeline moving.
          </p>
        </div>
      </header>

      {/* Features Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 ">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#ff9c00] mb-8 text-center">Automation Features</h2>
          <div className="grid md:grid-cols-3 gap-6 text-white">
            {[
              {
                title: "Outbound Webhooks",
                desc: "Trigger push events to CRMs and third-party apps with retries for reliability.",
                icon: <ArrowPathIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
              {
                title: "Inactivity Auto-Pause",
                desc: "Automatically pause inactive brokers and send SLA nudges to avoid delays.",
                icon: <PauseCircleIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
              {
                title: "SMS Fallback",
                desc: "Resilient alerts delivered by SMS when email/WhatsApp delivery fails.",
                icon: <ChatBubbleBottomCenterTextIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center bg-[#154956] bg-opacity-5 p-6 rounded-xl hover:shadow-md transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-white text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick Checklist */}
          <ul className="mt-10 space-y-3 max-w-xl mx-auto">
            {[
              "Outbound webhooks with retries",
              "Inactivity auto-pause and SLA nudges",
              "SMS fallback for resilience",
            ].map((text, idx) => (
              <li key={idx} className="flex items-center gap-3 text-slate-700">
                <CheckCircleIcon className="h-5 w-5 text-[#FF9C00] shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Automation Flow */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-[#ff9c00] mb-6 text-center">Automation Flow</h2>
          <div className="relative border-l-2 border-[#FF9C00] border-opacity-40 max-w-2xl mx-auto">
            {[
              "Lead Assigned",
              "Webhook Push to CRM",
              "Inactivity Auto-pause Triggered",
              "SLA Nudge Sent",
              "SMS/Email Alerts Fired",
            ].map((step, idx) => (
              <div key={idx} className="mb-8 ml-6">
                <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-[#FF9C00] text-white text-xs font-bold">
                  {idx + 1}
                </div>
                <p className="text-[#154956] font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}