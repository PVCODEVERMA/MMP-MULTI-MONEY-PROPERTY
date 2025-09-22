import React from "react";
import { Link } from "react-router-dom";
import { Wallet, Users, BarChart3, CheckCircleIcon } from "lucide-react";

export default function BrokerDashboardHome() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <span className="inline-block text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
             CRM
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
            Broker CRM Dashboard
          </h1>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Track wallet/plan, manage leads, update statuses and view performance.
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Quick Actions / Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wallet / Quota */}
          <Link
            to="/broker/wallet"
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition flex flex-col items-start"
          >
            <Wallet className="text-orange-500 mb-3" size={28} />
            <h3 className="text-lg font-bold text-slate-900">Wallet & Quota</h3>
            <p className="text-slate-600 mt-1 text-sm">
              Check balance, plan details, and quota usage.
            </p>
          </Link>

          {/* My Leads */}
          <Link
            to="/broker/leads"
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition flex flex-col items-start"
          >
            <Users className="text-blue-500 mb-3" size={28} />
            <h3 className="text-lg font-bold text-slate-900">My Leads</h3>
            <p className="text-slate-600 mt-1 text-sm">
              Manage and download your active leads.
            </p>
          </Link>

          {/* Insights */}
          <Link
            to="/broker/insights"
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition flex flex-col items-start"
          >
            <BarChart3 className="text-green-500 mb-3" size={28} />
            <h3 className="text-lg font-bold text-slate-900">Insights</h3>
            <p className="text-slate-600 mt-1 text-sm">
              View conversions, top projects, and performance.
            </p>
          </Link>
        </div>

        {/* Quick Info List */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Quick Features
          </h2>
          <ul className="space-y-2 text-slate-700">
            <li className="flex gap-2">
              <span><CheckCircleIcon className="h-6 w-6 text-[#FF9C00] shrink-0" /></span>
              <span>Wallet/Quota, My Leads, downloads</span>
            </li>
            <li className="flex gap-2">
              <span><CheckCircleIcon className="h-6 w-6 text-[#FF9C00] shrink-0" /></span>
              <span>Status: Contacted, Converted, Invalid</span>
            </li>
            <li className="flex gap-2">
              <span> <CheckCircleIcon className="h-6 w-6 text-[#FF9C00] shrink-0" /></span>
              <span>Insights: conversions, top projects</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
