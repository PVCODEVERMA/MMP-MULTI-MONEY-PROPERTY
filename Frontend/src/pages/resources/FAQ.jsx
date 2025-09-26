
import React from "react";

export default function FAQ() {
  const faqs = [
    { 
      id: "getting-started", 
      q: "How do I start with MMP?", 
      a: "Create an account, choose Packages or Wallet, and set preferred locations." 
    },
    { 
      id: "leads", 
      q: "What's the difference between Shared and Exclusive leads?", 
      a: "Shared leads deliver to up to 3 brokers, Exclusive leads go to one broker only—significantly improving close probability." 
    },
    { 
      id: "delivery", 
      q: "How are leads delivered?", 
      a: "Leads are delivered instantly via WhatsApp and Email, and are also visible in your Broker Dashboard for easy tracking." 
    },
    { 
      id: "billing", 
      q: "How does billing work?", 
      a: "Packages offer fixed quota of leads; Wallet is pay-as-you-go per lead. GST invoices are provided for all transactions." 
    },
    { 
      id: "support", 
      q: "What support is available?", 
      a: "24/7 customer support via chat, email, and phone. Dedicated account manager for premium packages." 
    },
    { 
      id: "quality", 
      q: "How do you ensure lead quality?", 
      a: "All leads are verified, filtered for duplicates, and scored based on intent and engagement metrics." 
    }
  ];

  return (
    <div className="">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold bg-orange-100 text-[#FF9C00] px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 bg-[#FF9C00] rounded-full"></span>
              Frequently Asked Questions
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl  font-bold text-[#154056] leading-tight">
              Get Answers to<br />Your Questions
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about leads, delivery, billing, and getting started with our platform.
            </p>
          </div>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60">
          <section className="p-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-slate-800">Common Questions</h2>
              <p className="text-slate-600 mt-2">Browse through the most frequently asked questions</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((f, index) => (
                <div 
                  key={f.id} 
                  id={f.id}
                  className="group bg-gradient-to-r from-white to-slate-50/50 hover:from-white hover:to-orange-50/30 rounded-xl border border-slate-200/60 hover:border-orange-200/80 transition-all duration-300 hover:shadow-md"
                >
                  <details className="cursor-pointer">
                    <summary className="list-none px-6 py-5 rounded-xl flex items-center justify-between hover:bg-white/50 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF9C00] to-orange-500 rounded-lg flex items-center justify-center mt-0.5">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className="font-semibold text-slate-800 text-lg leading-relaxed">{f.q}</span>
                      </div>
                      <span className="flex-shrink-0 w-6 h-6 bg-slate-100 group-hover:bg-orange-100 text-slate-500 group-hover:text-[#FF9C00] rounded-full flex items-center justify-center transition-all duration-300 group-open:rotate-180">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 ml-12">
                      <div className="pl-4 border-l-2 border-orange-200/60">
                        <p className="text-slate-700 leading-relaxed text-base">{f.a}</p>
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Additional Help Section */}
        <div className="text-center mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/60">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Still have questions?</h3>
            <p className="text-slate-600 mb-6">Can't find the answer you're looking for? Please chat with our friendly team.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-[#FF9C00] to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Contact Support
              </button>
              <button className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-all duration-300">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}