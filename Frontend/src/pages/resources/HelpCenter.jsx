
import React from "react";
import { Link } from "react-router-dom";

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <span className="inline-block text-xs font-semibold bg-orange-100 text-[#FF9C00] px-3 py-1 rounded-full">💡 Help Center</span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">Help Center</h1>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Browse quick-start guides, account setup, billing, and troubleshooting resources for MMP. 
          </p>
          <div className="mt-5 flex gap-3">
            <Link to="/resources/faq" className="px-5 py-3 rounded-xl bg-[#FF9C00] text-white font-semibold transition-colors duration-300 hover:brightness-95">
              View FAQs
            </Link>
            <Link to="/contact" className="px-5 py-3 rounded-xl border border-orange-300 text-orange-600 bg-white transition-colors duration-300 hover:bg-orange-50">
              Contact Support
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Getting Started", text: "Create an account, choose a plan, and invite team members.", href: "/resources/faq#getting-started" },
            { title: "Leads & Delivery", text: "Understand shared vs exclusive, WhatsApp/Email delivery.", href: "/resources/faq#leads" },
            { title: "Billing & GST", text: "Packages vs Wallet, GST invoices, and renewals.", href: "/resources/faq#billing" }
          ].map((c, i) => (
            <article key={i} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-2 text-slate-600">{c.text}</p>
              <Link to={c.href} className="mt-3 inline-block text-[#FF9C00] font-semibold hover:underline">
                Learn more →
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
