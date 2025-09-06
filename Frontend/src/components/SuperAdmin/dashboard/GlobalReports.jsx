// pages/super-admin/GlobalReports.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  DocumentChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";

const GlobalReports = () => {
  const [dateRange, setDateRange] = useState("last_30_days");
  const [reportType, setReportType] = useState("overview");

  const reportTypes = [
    { value: "overview", label: "Platform Overview" },
    { value: "companies", label: "Companies Report" },
    { value: "revenue", label: "Revenue Report" },
    { value: "users", label: "Users Report" },
    { value: "properties", label: "Properties Report" }
  ];

  const dateRanges = [
    { value: "today", label: "Today" },
    { value: "last_7_days", label: "Last 7 Days" },
    { value: "last_30_days", label: "Last 30 Days" },
    { value: "last_3_months", label: "Last 3 Months" },
    { value: "last_year", label: "Last Year" },
    { value: "custom", label: "Custom Range" }
  ];

  const metrics = [
    {
      title: "Total Revenue",
      value: "₹45.6Cr",
      change: "+15.3%",
      changeType: "increase"
    },
    {
      title: "New Companies",
      value: "23",
      change: "+8.7%",
      changeType: "increase"
    },
    {
      title: "Active Users",
      value: "12,450",
      change: "+22.1%",
      changeType: "increase"
    },
    {
      title: "Properties Listed",
      value: "89,600",
      change: "+18.5%",
      changeType: "increase"
    }
  ];

  const topCompanies = [
    { name: "Real Estate Pro", revenue: 5600000, properties: 234, growth: "+15%" },
    { name: "Property Masters", revenue: 4200000, properties: 186, growth: "+12%" },
    { name: "Urban Spaces", revenue: 3800000, properties: 167, growth: "+8%" },
    { name: "Premium Homes", revenue: 3400000, properties: 145, growth: "+22%" },
    { name: "City Properties", revenue: 2900000, properties: 123, growth: "+18%" }
  ];

  const handleExportReport = (format) => {
    console.log(`Exporting report as ${format}`);
    // Export logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Global Reports</h1>
            <p className="text-gray-600">Comprehensive platform analytics and reporting</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleExportReport('pdf')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => handleExportReport('excel')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <div className="relative">
              <DocumentChartBarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className={`text-sm font-medium ${
                metric.changeType === "increase" ? "text-green-600" : "text-red-600"
              }`}>
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm text-gray-600">{metric.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Revenue chart placeholder</p>
              <p className="text-sm text-gray-400">Chart integration needed</p>
            </div>
          </div>
        </div>

        {/* Top Companies */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Companies</h3>
          <div className="space-y-3">
            {topCompanies.map((company, index) => (
              <div key={company.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{company.name}</div>
                  <div className="text-sm text-gray-600">{company.properties} properties</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ₹{(company.revenue / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-green-600">{company.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Analytics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Properties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topCompanies.map((company, index) => (
                <tr key={company.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{company.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{(company.revenue / 100000).toFixed(1)}L</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{company.properties}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600">{company.growth}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GlobalReports;
