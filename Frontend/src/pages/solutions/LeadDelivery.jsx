import React from "react";
import {
  CheckCircleIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
  PlayIcon,
  CloudArrowUpIcon,
  EyeIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function LeadDelivery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f7f7] via-[#f7f7f7] to-[#f7f7f7]">
      {/* Enhanced Hero Header */}
      <header className="relative overflow-hidden">
      
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#ff9c00] text-white px-4 py-2 rounded-full shadow-lg border border-[#ff9c00]/30 mb-6">
              <CloudArrowUpIcon className="h-4 w-4" />
              <span className="text-sm font-semibold">Instant Delivery</span>
            </div>
            
            <h1 className="mt-4 text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#154956] to-[#154956] bg-clip-text text-transparent leading-tight">
              WhatsApp / Email<br />
              <span className="bg-gradient-to-r from-[#ff9c00] to-[#154956] bg-clip-text text-transparent">
                Delivery Engine
              </span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-[#154956] max-w-3xl leading-relaxed">
              Send leads instantly via{" "}
              <span className="font-semibold text-[#ff9c00]">Interakt / Gupshup</span>, Email and show them in the 
              Broker Dashboard for real-time access and management.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="inline-flex items-center justify-center gap-2 bg-[#ff9c00] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <DevicePhoneMobileIcon className="h-5 w-5" />
                Start Delivering
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-white text-[#154956] px-6 py-3 rounded-xl font-semibold shadow-lg border border-[#154956]/20 hover:shadow-xl transition-all duration-300">
                <PlayIcon className="h-5 w-5 text-[#ff9c00]" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Features Section */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Background Elements */}
        
        
        <div className="relative bg-[#f7f7f7] backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#154956] to-[#154956] bg-clip-text text-transparent">
              Smart Delivery Features
            </h2>
            <p className="mt-4 text-[#154956] text-lg max-w-2xl mx-auto">
              Multi-channel delivery solutions for maximum reach and efficiency
            </p>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "CRM Push via Webhook",
                desc: "Seamless integration with your CRM through automated webhook delivery with real-time sync.",
                icon: <ArrowPathIcon className="h-12 w-12" />,
                stats: "Instant Sync",
                color: "from-[#ff9c00] to-[#ff9c00]/80",
                features: ["Real-time updates", "API integration", "Error handling"]
              },
              {
                title: "Balance & Renewal Alerts",
                desc: "Stay informed with intelligent low-balance warnings and timely renewal reminders.",
                icon: <DevicePhoneMobileIcon className="h-12 w-12" />,
                stats: "Smart Alerts",
                color: "from-[#154956] to-[#154956]/80",
                features: ["Proactive warnings", "Multi-channel", "Custom thresholds"]
              },
              {
                title: "CSV / Excel Exports",
                desc: "Export leads easily for offline work, comprehensive reports, and team collaboration.",
                icon: <DocumentArrowDownIcon className="h-12 w-12" />,
                stats: "One-Click Export",
                color: "from-[#ff9c00] to-[#154956]",
                features: ["Multiple formats", "Custom columns", "Scheduled exports"]
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-white to-[#f7f7f7] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#154956]/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                
                <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-[#154956] mb-3">{feature.title}</h3>
                <p className="text-[#154956] leading-relaxed mb-6">{feature.desc}</p>
                
                <div className="space-y-2 mb-6">
                  {feature.features.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-2 text-sm text-[#154956]">
                      <CheckCircleIcon className="h-4 w-4 text-[#ff9c00]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#ff9c00]">{feature.stats}</span>
                  <div className="text-xs bg-[#ff9c00]/10 text-[#ff9c00] px-2 py-1 rounded-full font-medium">
                    Active
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Quick Checklist */}
          <div className="mt-16 bg-gradient-to-r from-[#ff9c00]/10 to-[#154956]/10 rounded-2xl p-8 border border-[#ff9c00]/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#154956]">Complete Delivery Suite</h3>
              <p className="text-[#154956] mt-2">Everything you need for seamless lead distribution</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                "Webhook for CRM push integration",
                "Low-balance and renewal reminders",
                "CSV/Excel exports for offline work",
                "Real-time delivery analytics",
                "Multi-channel notification system",
                "Automated retry mechanisms",
                "Delivery status tracking",
                "Custom template support",
                "Bulk export capabilities"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-colors">
                  <div className="bg-[#ff9c00]/10 p-1 rounded-full">
                    <CheckCircleIcon className="h-4 w-4 text-[#ff9c00]" />
                  </div>
                  <span className="text-sm font-medium text-[#154956]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Delivery Flow */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#154956] to-[#154956] bg-clip-text text-transparent">
                Delivery Workflow
              </h2>
              <p className="mt-4 text-[#154956] text-lg">Seamless lead distribution process</p>
            </div>
            
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#ff9c00] to-[#ff9c00] hidden lg:block"></div>
              
              <div className="space-y-8 lg:space-y-0">
                {[
                  {
                    step: 1,
                    title: "Lead Captured",
                    desc: "New lead enters the system",
                    icon: <ChartBarIcon className="h-6 w-6" />,
                    color: "from-[#ff9c00] to-[#ff9c00]/80",
                    status: "Instant"
                  },
                  {
                    step: 2,
                    title: "WhatsApp / Email Sent",
                    desc: "Multi-channel instant delivery",
                    icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
                    color: "from-[#ff9c00]/80 to-[#154956]/80",
                    status: "Real-time"
                  },
                  {
                    step: 3,
                    title: "Webhook to CRM",
                    desc: "Seamless CRM integration",
                    icon: <CloudArrowUpIcon className="h-6 w-6" />,
                    color: "from-[#154956]/80 to-[#154956]",
                    status: "Sync"
                  },
                  {
                    step: 4,
                    title: "Dashboard Updated",
                    desc: "Broker dashboard refresh",
                    icon: <EyeIcon className="h-6 w-6" />,
                    color: "from-[#154956] to-[#ff9c00]",
                    status: "Live"
                  },
                  {
                    step: 5,
                    title: "Export Available",
                    desc: "Instant export capabilities",
                    icon: <DocumentArrowDownIcon className="h-6 w-6" />,
                    color: "from-[#ff9c00] to-[#154956]",
                    status: "Ready"
                  }
                ].map((item, idx) => (
                  <div key={idx} className={`relative flex flex-col lg:flex-row items-center gap-6 p-6 bg-white rounded-2xl shadow-lg border border-[#154956]/10 hover:shadow-xl transition-shadow ${
                    idx % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}>
                    {/* Step Number */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-[#ff9c00] ${item.color} text-white flex items-center justify-center text-lg font-bold shadow-lg`}>
                      {item.step}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                        <div className={`p-2 rounded-lg bg-[#ff9c00] ${item.color} bg-opacity-10`}>
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#154956]">{item.title}</h3>
                          <p className="text-[#154956] text-sm">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-[#ff9c00] ${item.color} bg-opacity-10 text-[#154956]`}>
                      {item.status}
                    </div>
                    
                    {/* Connector Dot */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] rounded-full hidden lg:block" 
                         style={{ left: idx % 2 === 0 ? 'calc(100% - 2rem)' : '2rem' }}>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Integration Partners */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-[#154956] mb-8">Trusted Integration Partners</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              <div className="bg-white p-4 rounded-xl shadow-lg border border-[#154956]/10">
                <div className="w-32 h-8 bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] rounded-lg flex items-center justify-center text-white font-bold">
                  Interakt
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg border border-[#154956]/10">
                <div className="w-32 h-8 bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] rounded-lg flex items-center justify-center text-white font-bold">
                  Gupshup
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg border border-[#154956]/10">
                <div className="w-32 h-8 bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] rounded-lg flex items-center justify-center text-white font-bold">
                  WhatsApp
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg /10">
                <div className="w-32 h-8 bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] rounded-lg flex items-center justify-center text-white font-bold">
                  Gmail
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-[#ff9c00] rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Streamline Your Lead Delivery?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using our delivery engine to reach customers faster and more efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#154956] px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Start Delivering Now
            </button>
            <button className="bg-white/20 text-white px-8 py-3 rounded-xl font-bold border border-white/30 hover:bg-white/30 transition-colors">
              View Integration Docs
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}