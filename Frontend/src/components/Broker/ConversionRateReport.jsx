import React from "react";

const dummyConversionReport = [
  {
    id: 1,
    broker: "Broker #101",
    totalLeads: 28,
    converted: 12,
    conversionRate: "42.8%",
    avgTimeToClose: "09 days"
  },
  {
    id: 2,
    broker: "Broker #102",
    totalLeads: 22,
    converted: 7,
    conversionRate: "31.8%",
    avgTimeToClose: "11 days"
  },
  {
    id: 3,
    broker: "Broker #103",
    totalLeads: 16,
    converted: 6,
    conversionRate: "37.5%",
    avgTimeToClose: "13 days"
  }
];

const ConversionRateReport = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Conversion Rate Report</h2>
    <table className="min-w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th className="px-3 py-2 border">Broker</th>
          <th className="px-3 py-2 border">Total Leads</th>
          <th className="px-3 py-2 border">Converted</th>
          <th className="px-3 py-2 border">Conversion Rate</th>
          <th className="px-3 py-2 border">Avg. Time to Close</th>
        </tr>
      </thead>
      <tbody>
        {dummyConversionReport.map((row) => (
          <tr key={row.id}>
            <td className="px-3 py-2 border">{row.broker}</td>
            <td className="px-3 py-2 border">{row.totalLeads}</td>
            <td className="px-3 py-2 border">{row.converted}</td>
            <td className="px-3 py-2 border">{row.conversionRate}</td>
            <td className="px-3 py-2 border">{row.avgTimeToClose}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ConversionRateReport;
