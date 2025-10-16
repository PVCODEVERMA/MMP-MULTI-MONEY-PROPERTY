import React from "react";

const dummyRevenueReport = [
  {
    id: 1,
    broker: "Broker #101",
    month: "October 2025",
    dealsClosed: 4,
    totalRevenue: "₹2,90,000"
  },
  {
    id: 2,
    broker: "Broker #102",
    month: "October 2025",
    dealsClosed: 3,
    totalRevenue: "₹1,75,000"
  },
  {
    id: 3,
    broker: "Broker #103",
    month: "October 2025",
    dealsClosed: 2,
    totalRevenue: "₹1,10,000"
  }
];

const RevenueReport = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Revenue Report</h2>
    <table className="min-w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th className="px-3 py-2 border">Broker</th>
          <th className="px-3 py-2 border">Month</th>
          <th className="px-3 py-2 border">Deals Closed</th>
          <th className="px-3 py-2 border">Total Revenue</th>
        </tr>
      </thead>
      <tbody>
        {dummyRevenueReport.map((row) => (
          <tr key={row.id}>
            <td className="px-3 py-2 border">{row.broker}</td>
            <td className="px-3 py-2 border">{row.month}</td>
            <td className="px-3 py-2 border">{row.dealsClosed}</td>
            <td className="px-3 py-2 border">{row.totalRevenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RevenueReport;
