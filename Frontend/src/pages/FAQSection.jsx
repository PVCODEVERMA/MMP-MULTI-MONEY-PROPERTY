import React, { useState } from "react";

// Edit this array with exact company answers/policies.
const faqData = [
  {
    question: "Does MMP offer a free trial?",
    answer:
      "Trial/preview availability can vary by plan and time period—contact Sales for current options.",
  },
  {
    question: "What happens when any trial or preview access ends?",
    answer:
      "Access may be limited until a plan is activated; all saved data remains associated with the account.",
  },
  {
    question: "How much do plans cost?",
    answer:
      "Pricing depends on selected plan and inclusions; see Plans or contact Sales for a custom quote.",
  },
  {
    question: "Are leads exclusive or shared?",
    answer:
      "Lead delivery can be shared or exclusive depending on plan and inventory; choose what fits the pipeline.",
  },
  {
    question: "How are leads delivered?",
    answer:
      "Leads are delivered in real time to the dashboard and via configured channels like email or WhatsApp.",
  },
  {
    question: "Is support included?",
    answer:
      "Standard support is available to all paid plans; response SLAs vary by plan and channel.",
  },
  {
    question: "Do you provide refunds or lead replacements?",
    answer:
      "Refunds/replacements depend on plan terms and verification rules; check plan-specific T&Cs.",
  },
  {
    question: "Do you offer discounts?",
    answer:
      "Periodic or volume discounts may be available; contact Sales for eligibility and terms.",
  },
  {
    question: "How do I purchase or upgrade?",
    answer:
      "Pick a plan from the pricing page or request a pro‑forma invoice; payments are processed securely.",
  },
  {
    question: "How do I cancel?",
    answer:
      "Submit a cancellation request from the account or by contacting Support; service runs until the end of the current term.",
  },
  {
    question: "Which locations are supported?",
    answer:
      "Major metros and surrounding regions are supported; see the locations list on the website for coverage.",
  },
  {
    question: "Who can I contact for anything else?",
    answer:
      "Reach Support or Sales from the Contact page; share the account email and plan details for faster help.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#F7F7F7] py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        <span className="text-[#164058]">Frequently asked </span>
        <span className="text-[#F29400]">questions</span>
      </h2>

      <div className="max-w-6xl mx-auto space-y-4">
        {faqData.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg border-[#F29400] transition-shadow duration-300 hover:shadow-sm"
            >
              <button
                className="flex justify-between w-full  px-4 py-4 text-left font-medium  text-[#F29400] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="pr-6">{faq.question}</span>
                <span
                  aria-hidden="true"
                  className={`ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border cursor-pointer text-sm transition-transform duration-300 ${
                    isOpen
                      ? "rotate-45 border-orange-300 text-orange-500"
                      : "border-slate-300 text-slate-500"
                  }`}
                >
                  +
                </span>
              </button>

              <div
                id={`faq-panel-${idx}`}
                className={`px-6 overflow-hidden text-slate-700 transition-[max-height,opacity] duration-300 ease-out cursor-pointer ${
                  isOpen ? "max-h-80 opacity-100 pb-4" : "max-h-0 opacity-0 pb-0"
                }`}
              >
                <p className="text-[#164058]/80">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
