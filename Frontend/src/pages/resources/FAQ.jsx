// src/pages/resources/FAQ.jsx
import React from "react";

export default function FAQ() {
  const faqs = [
    { id: "getting-started", q: "How do I start with MMP?", a: "Create an account, choose Packages or Wallet, and set preferred locations." },
    { id: "leads", q: "What’s the difference between Shared and Exclusive leads?", a: "Shared deliver to up to 3 brokers, Exclusive to one—improves close probability." },
    { id: "delivery", q: "How are leads delivered?", a: "Instantly via WhatsApp/Email and visible in the Broker Dashboard." },
    { id: "billing", q: "How does billing work?", a: "Packages = fixed quota; Wallet = pay‑as‑you‑go per lead; GST invoices provided." }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <span className="inline-block text-xs font-semibold bg-orange-100 text-[#FF9C00] px-3 py-1 rounded-full">❓ FAQ</span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h1>
          <p className="mt-3 text-slate-600 max-w-3xl">Find quick answers about leads, delivery, billing, and setup.</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="space-y-3">
          {faqs.map((f) => (
            <details key={f.id} id={f.id} className="group bg-white rounded-xl shadow-sm open:shadow-md transition-shadow">
              <summary className="cursor-pointer list-none px-5 py-4 rounded-xl flex items-center justify-between">
                <span className="font-semibold text-slate-900">{f.q}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <div className="px-5 pb-5 text-slate-700">{f.a}</div>
            </details>
          ))}
        </section>
      </main>
    </div>
  );
}
