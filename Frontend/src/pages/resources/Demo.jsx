// src/pages/resources/Demo.jsx
import React, { useState } from "react";

export default function Demo() {
  const demos = [
    { title: "Broker Dashboard Overview", minutes: 5, videoId: "dQw4w9WgXcQ" },
    { title: "Lead Delivery & Follow-up", minutes: 4, videoId: "dQw4w9WgXcQ" },
    { title: "Billing: Packages & Wallet", minutes: 3, videoId: "dQw4w9WgXcQ" }
  ];

  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <span className="inline-block text-xs font-semibold bg-orange-100 text-[#FF9C00] px-3 py-1 rounded-full">
            🎥 Demo
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
            Product Demos
          </h1>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Short videos to help understand leads, delivery, billing, and reports.
          </p>
        </div>
      </header>

      {/* Videos */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demos.map((d, i) => (
            <article
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-video w-full overflow-hidden rounded-lg relative">
                {activeVideo === i ? (
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${d.videoId}?autoplay=1`}
                    title={d.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    onClick={() => setActiveVideo(i)}
                    className="w-full h-full relative group"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${d.videoId}/hqdefault.jpg`}
                      alt={d.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition">
                      <div className="bg-white/90 rounded-full p-3 shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-8 h-8 text-[#FF9C00]"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {d.title}
              </h3>
              <p className="text-xs text-slate-500">{d.minutes} min</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
