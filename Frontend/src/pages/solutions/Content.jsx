import React from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  CursorArrowRaysIcon,
  SparklesIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

export default function Content() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="relative ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center md:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full shadow-sm">
            Enablement
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Sales Scripts &amp; Content
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl">
            Ready-to-use call/email scripts, landing pages, and creatives to
            improve conversions.
          </p>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Enablement Features
          </h2>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Email & Call Scripts",
                desc: "Generate personalized outreach templates that boost engagement.",
                icon: <EnvelopeIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
              {
                title: "Landing Pages & Creatives",
                desc: "Quick-launch landing pages and ad designs for campaigns.",
                icon: <CursorArrowRaysIcon className="h-10 w-10 text-[#FF9C00]" />,
              },
              {
                title: "Follow-up Playbooks",
                desc: "Step-by-step call and email sequences for faster conversions.",
                icon: <ClipboardDocumentCheckIcon className="h-10 w-10 text-[#FF9C00]" />,
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

          {/* Example Preview */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Example Preview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sample Email Script */}
              <div className="bg-slate-50 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                  <EnvelopeIcon className="h-5 w-5 text-[#FF9C00]" />
                  Sample Email Script
                </h3>
                <p className="text-sm text-slate-600">
                  Hi [Name], <br />
                  I noticed your interest in [Project/Service]. We can help you
                  save time and get the best deal. Let’s schedule a quick call
                  this week.  
                  <br />
                  – Your Sales Team
                </p>
              </div>

              {/* Sample Landing Page */}
              <div className="bg-slate-50 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                  <SparklesIcon className="h-5 w-5 text-[#FF9C00]" />
                  Landing Page Snapshot
                </h3>
                <div className="border rounded-lg h-40 flex items-center justify-center text-slate-500 italic">
                  [ Landing Page Preview ]
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
