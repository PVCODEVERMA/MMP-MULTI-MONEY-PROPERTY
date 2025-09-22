
import React from "react";

const DATA = [
  { name: "Rajesh Kumar", role: "Broker, Delhi", quote: "Location-based leads improved my closures in NCR.", rating: 5 },
  { name: "Priya Sharma", role: "Agent, Gurgaon", quote: "Dashboard and WhatsApp delivery save time.", rating: 5 },
  { name: "Amit Patel", role: "Broker, Mumbai", quote: "Wallet billing is transparent and flexible.", rating: 4 }
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <span className="inline-block text-xs font-semibold bg-orange-100 text-[#FF9C00] px-3 py-1 rounded-full">⭐ Testimonials</span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">What Clients Say</h1>
          <p className="mt-3 text-slate-600 max-w-3xl">Stories from brokers and agents using MMP across Delhi–NCR and Mumbai.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DATA.map((t, i) => (
            <figure key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 text-yellow-500" aria-label={`${t.rating} star rating`}>
                {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
              </div>
              <blockquote className="mt-3 text-slate-800">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-slate-600">
                <span className="font-semibold text-slate-800">{t.name}</span> • {t.role}
              </figcaption>
            </figure>
          ))}
        </section>
      </main>
    </div>
  );
}
