import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const monthlyRevenue = [
  { month: "Mar", Wallet: 85000, Packages: 205000 },
  { month: "Apr", Wallet: 115000, Packages: 245000 },
  { month: "May", Wallet: 110000, Packages: 272000 },
  { month: "Jun", Wallet: 98000, Packages: 290000 },
  { month: "Jul", Wallet: 100000, Packages: 315000 },
  { month: "Aug", Wallet: 125000, Packages: 350000 },
];

export default function AdminReports() {
  const handleDownload = () =>
    alert("Download Revenue Report CSV here! (Plug in your real logic)");

  return (
    <div className=" mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Revenue Report</h2>
        <button
          onClick={handleDownload}
          className="flex items-center bg-green-600 text-white px-5 py-2 rounded font-semibold hover:bg-green-800 transition"
        >
          <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
          Download Report
        </button>
      </div>
      <section className="bg-white rounded-lg shadow p-8 mb-8">
        <h3 className="text-xl font-semibold mb-4">Wallet vs Package Revenue (Monthly)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenue}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Wallet" fill="#4f46e5" />
            <Bar dataKey="Packages" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </section>
      <div className="bg-white rounded-lg shadow p-8">
        <h3 className="font-semibold mb-2 text-lg">Summary</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Total Wallet Revenue: ₹{monthlyRevenue.reduce((s, m) => s + m.Wallet, 0).toLocaleString()}</li>
          <li>Total Packages Revenue: ₹{monthlyRevenue.reduce((s, m) => s + m.Packages, 0).toLocaleString()}</li>
          <li>Total Combined Revenue: ₹{monthlyRevenue.reduce((s, m) => s + m.Wallet + m.Packages, 0).toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
}
