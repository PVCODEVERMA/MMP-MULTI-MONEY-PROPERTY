
import React from "react";
import { Link } from "react-router-dom";

const POSTS = [
  { slug: "lead-generation-ncr", title: "Lead Generation in Delhi–NCR: What Works", date: "2025-08-20", excerpt: "Channels, geo‑targeting, and follow‑ups to improve conversion." },
  { slug: "exclusive-vs-shared", title: "Exclusive vs Shared Leads: ROI Trade‑offs", date: "2025-07-02", excerpt: "When to use each delivery mode and how to budget." },
  { slug: "whatsapp-delivery", title: "Why WhatsApp Delivery Improves Speed‑to‑Lead", date: "2025-05-15", excerpt: "Faster first contact increases appointment rates." }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <span className="inline-block text-xs font-semibold bg-orange-100 text-[#FF9C00] px-3 py-1 rounded-full">📚 Blog</span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">Latest Articles</h1>
          <p className="mt-3 text-slate-600 max-w-3xl">Insights on leads, delivery, and conversion best practices for Indian real estate.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <article key={p.slug} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{new Date(p.date).toLocaleDateString()}</p>
              <p className="mt-2 text-slate-700">{p.excerpt}</p>
              <Link to={`/resources/blog/${p.slug}`} className="mt-3 inline-block text-[#FF9C00] font-semibold hover:underline">
                Read more →
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
