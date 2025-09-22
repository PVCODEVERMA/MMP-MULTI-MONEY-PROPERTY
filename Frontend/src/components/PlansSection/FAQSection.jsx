import React, { useState } from "react";

const faqData = [
  {
    question: "How many projects can I list in each plan?",
    answer: "Starter Plan allows 1 project, Growth Plan allows up to 3 projects, and Custom Plan can be tailored as per requirement.",
  },
  {
    question: "Are leads exclusive or shared?",
    answer: "Starter Plan leads are shared with 2–3 people, Growth Plan with 1–2 people, and Custom Plan can be either shared or exclusive.",
  },
  {
    question: "How many leads can I expect?",
    answer: "Starter Plan gives 50–70 location-based leads, Growth Plan gives 100–150 leads, and Custom Plan lets you define your target volume.",
  },
  {
    question: "Do plans include advertising?",
    answer: "Yes. Starter spends 35% on ads, Growth spends 45% and includes Google/YouTube support, while Custom lets you define ad budgets.",
  },
  {
    question: "Is support and reporting included?",
    answer: "Yes. All plans include dashboard access, buyer inquiries, and monthly reports. Custom Plan also provides transparent GST invoices.",
  },
  {
    question: "Is GST included in the price?",
    answer: "No, 18% GST is applicable on all packages and add-ons.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="  bg-[#F7F7F7] py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        <span className="text-[#164058]">Frequently asked </span>
        <span className="text-[#F29400]">questions</span>
      </h2>

      <div className="max-w-7xl px-2 mx-auto space-y-4">
        {faqData.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg border border-[#F29400] transition-shadow duration-300 hover:shadow-sm"
            >
              {/* Question */}
              <button
                className="flex justify-between w-full px-4 py-4 text-left font-semibold text-[#164058]"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                {faq.question}
                <span
                  className={`ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border cursor-pointer text-sm transition-transform duration-300 ${
                    isOpen
                      ? "rotate-45 border-orange-300 text-orange-500"
                      : "border-slate-300 text-slate-500"
                  }`}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              <div
                className={`px-6 overflow-hidden text-slate-700 transition-[max-height,opacity] duration-300 ease-out ${
                  isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0 pb-0"
                }`}
              >
                <p className="text-sm text-[#164058]/80">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
