// pages/broker/EnhancedBrokerReports.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  ShareIcon,
  HomeIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  DocumentTextIcon,
  PrinterIcon,
  ChartPieIcon,
  TrophyIcon
} from "@heroicons/react/24/outline";

const BrokerReports = () => {
  const [dateRange, setDateRange] = useState("last_30_days");
  const [reportType, setReportType] = useState("overview");
  const [isGenerating, setIsGenerating] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({ from: "", to: "" });

  // Enhanced date ranges with custom option
  const dateRanges = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last_7_days", label: "Last 7 Days" },
    { value: "last_30_days", label: "Last 30 Days" },
    { value: "this_month", label: "This Month" },
    { value: "last_month", label: "Last Month" },
    { value: "this_quarter", label: "This Quarter" },
    { value: "last_quarter", label: "Last Quarter" },
    { value: "this_year", label: "This Year" },
    { value: "custom", label: "Custom Range" }
  ];

  const reportTypes = [
    { value: "overview", label: "Performance Overview", description: "Complete performance summary" },
    { value: "leads", label: "Lead Analysis", description: "Lead conversion and source analysis" },
    { value: "earnings", label: "Earnings Report", description: "Revenue breakdown and commissions" },
    { value: "properties", label: "Property Performance", description: "Property listing performance" },
    { value: "comparison", label: "Period Comparison", description: "Compare performance across periods" }
  ];

  // Enhanced performance metrics with more detailed data
  const performanceMetrics = [
    {
      title: "Total Earnings",
      value: "₹1,85,000",
      change: "+18.5%",
      changeType: "increase",
      icon: CurrencyRupeeIcon,
      color: "bg-green-500",
      target: "₹2,00,000",
      achievement: 92.5
    },
    {
      title: "Leads Received",
      value: "156",
      change: "+12%",
      changeType: "increase",
      icon: ShareIcon,
      color: "bg-blue-500",
      target: "150",
      achievement: 104
    },
    {
      title: "Properties Sold",
      value: "8",
      change: "+25%",
      changeType: "increase",
      icon: HomeIcon,
      color: "bg-orange-500",
      target: "10",
      achievement: 80
    },
    {
      title: "Conversion Rate",
      value: "22.5%",
      change: "-2.1%",
      changeType: "decrease",
      icon: ArrowTrendingUpIcon,
      color: "bg-purple-500",
      target: "25%",
      achievement: 90
    }
  ];

  // Detailed analytics data
  const leadAnalytics = {
    totalLeads: 156,
    newLeads: 45,
    contacted: 67,
    qualified: 32,
    closed: 12,
    lost: 8,
    conversionRate: 22.5,
    avgResponseTime: "2.3 hours",
    leadSources: [
      { source: "Website", count: 45, percentage: 29, conversion: 25 },
      { source: "Referrals", count: 38, percentage: 24, conversion: 32 },
      { source: "Social Media", count: 32, percentage: 21, conversion: 18 },
      { source: "Cold Calls", count: 25, percentage: 16, conversion: 15 },
      { source: "Others", count: 16, percentage: 10, conversion: 12 }
    ]
  };

  const earningsBreakdown = {
    totalEarnings: 185000,
    commission: 125000,
    bonuses: 35000,
    referralBonus: 25000,
    breakdown: [
      { month: "January", amount: 35000, deals: 2 },
      { month: "February", amount: 42000, deals: 3 },
      { month: "March", amount: 38000, deals: 2 },
      { month: "April", amount: 70000, deals: 1 }
    ]
  };

  const topPerformingProperties = [
    {
      id: 1,
      title: "Luxury Villa in Bandra",
      location: "Bandra West, Mumbai",
      price: "₹2.5 Cr",
      leads: 15,
      views: 245,
      inquiries: 8,
      conversion: 12.5,
      daysListed: 45,
      status: "Active"
    },
    {
      id: 2,
      title: "Modern Apartment Complex",
      location: "Koramangala, Bangalore",
      price: "₹85 L",
      leads: 12,
      views: 189,
      inquiries: 6,
      conversion: 8.5,
      daysListed: 32,
      status: "Active"
    },
    {
      id: 3,
      title: "Commercial Office Space",
      location: "Cyber City, Gurgaon",
      price: "₹1.2 Cr",
      leads: 8,
      views: 156,
      inquiries: 4,
      conversion: 25.0,
      daysListed: 18,
      status: "Sold"
    }
  ];

  // Export functionality with CSV implementation
  const handleExportReport = async (format) => {
    setIsGenerating(true);
    
    try {
      // Simulate API call for report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (format === 'csv' || format === 'excel') {
        // Generate Excel/CSV report
        const reportData = [
          ['Broker Performance Report'],
          [`Report Type: ${reportType}`],
          [`Date Range: ${dateRange}`],
          [`Generated On: ${new Date().toLocaleDateString()}`],
          [],
          ['Performance Metrics'],
          ['Metric', 'Value', 'Change', 'Target', 'Achievement %'],
          ...performanceMetrics.map(metric => [
            metric.title,
            metric.value,
            metric.change,
            metric.target || 'N/A',
            metric.achievement ? `${metric.achievement}%` : 'N/A'
          ]),
          [],
          ['Lead Analytics'],
          ['Total Leads', leadAnalytics.totalLeads],
          ['Conversion Rate', `${leadAnalytics.conversionRate}%`],
          ['Avg Response Time', leadAnalytics.avgResponseTime],
          [],
          ['Lead Sources'],
          ['Source', 'Count', 'Percentage', 'Conversion'],
          ...leadAnalytics.leadSources.map(source => [
            source.source,
            source.count,
            `${source.percentage}%`,
            `${source.conversion}%`
          ]),
          [],
          ['Earnings Breakdown'],
          ['Total Earnings', `₹${earningsBreakdown.totalEarnings.toLocaleString()}`],
          ['Commission', `₹${earningsBreakdown.commission.toLocaleString()}`],
          ['Bonuses', `₹${earningsBreakdown.bonuses.toLocaleString()}`],
          ['Referral Bonus', `₹${earningsBreakdown.referralBonus.toLocaleString()}`],
          [],
          ['Monthly Earnings'],
          ['Month', 'Amount', 'Deals'],
          ...earningsBreakdown.breakdown.map(item => [
            item.month,
            `₹${item.amount.toLocaleString()}`,
            item.deals
          ]),
          [],
          ['Property Performance'],
          ['Property', 'Location', 'Price', 'Leads', 'Views', 'Inquiries', 'Conversion %', 'Status'],
          ...topPerformingProperties.map(prop => [
            prop.title,
            prop.location,
            prop.price,
            prop.leads,
            prop.views,
            prop.inquiries,
            `${prop.conversion}%`,
            prop.status
          ])
        ];
        
        // Convert to CSV format
        const csvContent = reportData.map(row => 
          Array.isArray(row) ? row.join(',') : row
        ).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `broker_report_${reportType}_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        
      } else if (format === 'pdf') {
        // For PDF, we'd typically use a library like jsPDF
        // This is a simplified version - in production, use proper PDF generation
        const pdfContent = `
BROKER PERFORMANCE REPORT
Report Type: ${reportType}
Date Range: ${dateRange}
Generated On: ${new Date().toLocaleDateString()}

PERFORMANCE METRICS:
${performanceMetrics.map(m => `${m.title}: ${m.value} (${m.change})`).join('\n')}

LEAD ANALYTICS:
Total Leads: ${leadAnalytics.totalLeads}
Conversion Rate: ${leadAnalytics.conversionRate}%
Avg Response Time: ${leadAnalytics.avgResponseTime}

EARNINGS BREAKDOWN:
Total Earnings: ₹${earningsBreakdown.totalEarnings.toLocaleString()}
Commission: ₹${earningsBreakdown.commission.toLocaleString()}
Bonuses: ₹${earningsBreakdown.bonuses.toLocaleString()}

PROPERTY PERFORMANCE:
${topPerformingProperties.map(p => `${p.title} - ${p.price} (${p.status})`).join('\n')}
        `;
        
        const blob = new Blob([pdfContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `broker_report_${reportType}_${dateRange}_${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
      }
      
      alert(`${format.toUpperCase()} report generated successfully!`);
      
    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateQuickReport = () => {
    const quickReportData = {
      performance: performanceMetrics,
      topMetrics: {
        bestMonth: "February",
        highestEarning: "₹70,000",
        bestConversionRate: "32%",
        totalDeals: 8
      },
      summary: `Performance Summary for ${dateRange}: Strong growth in lead generation (+12%) and earnings (+18.5%). Conversion rate needs improvement (-2.1%). Focus on lead qualification and follow-up processes.`
    };

    console.log("Quick Report Generated:", quickReportData);
    alert("Quick report generated! Check console for details or export for detailed analysis.");
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Performance Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive analysis of your business performance with export capabilities</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={generateQuickReport}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Quick Report
            </button>
            <button
              onClick={() => handleExportReport('pdf')}
              disabled={isGenerating}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <PrinterIcon className="h-5 w-5 mr-2" />
              )}
              Export PDF
            </button>
            <button
              onClick={() => handleExportReport('excel')}
              disabled={isGenerating}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              )}
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {reportTypes.find(t => t.value === reportType)?.description}
            </p>
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
          <div className="flex items-end">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Schedule Report
            </button>
          </div>
        </div>

        {/* Custom Date Range Inputs */}
        {dateRange === 'custom' && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                value={customDateRange.from}
                onChange={(e) => setCustomDateRange(prev => ({ ...prev, from: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                value={customDateRange.to}
                onChange={(e) => setCustomDateRange(prev => ({ ...prev, to: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Performance Metrics with Targets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`text-sm font-medium ${
                metric.changeType === "increase" ? "text-green-600" : "text-red-600"
              }`}>
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm text-gray-600 mb-2">{metric.title}</div>
            
            {/* Target Progress */}
            {metric.target && (
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Target: {metric.target}</span>
                  <span>{metric.achievement}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full ${
                      metric.achievement >= 100 ? 'bg-green-500' :
                      metric.achievement >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(metric.achievement, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Enhanced Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Conversion Funnel with Detailed Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Conversion Funnel</h3>
          <div className="space-y-4">
            {[
              { label: "Total Leads", count: leadAnalytics.totalLeads, color: "bg-blue-500", width: "100%" },
              { label: "Contacted", count: leadAnalytics.contacted, color: "bg-yellow-500", width: `${(leadAnalytics.contacted / leadAnalytics.totalLeads) * 100}%` },
              { label: "Qualified", count: leadAnalytics.qualified, color: "bg-green-500", width: `${(leadAnalytics.qualified / leadAnalytics.totalLeads) * 100}%` },
              { label: "Closed", count: leadAnalytics.closed, color: "bg-purple-500", width: `${(leadAnalytics.closed / leadAnalytics.totalLeads) * 100}%` }
            ].map((stage, index) => (
              <div key={stage.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{stage.label}</span>
                  <span className="text-sm font-medium text-gray-900">{stage.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${stage.color}`}
                    style={{ width: stage.width }}
                  ></div>
                </div>
              </div>
            ))}

            <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{leadAnalytics.conversionRate}%</div>
              <div className="text-sm text-green-800">Overall Conversion Rate</div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-600">{leadAnalytics.avgResponseTime}</div>
              <div className="text-sm text-blue-800">Average Response Time</div>
            </div>
          </div>
        </div>

        {/* Lead Sources Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources Analysis</h3>
          <div className="space-y-3">
            {leadAnalytics.leadSources.map((source, index) => (
              <div key={source.source} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3" 
                      style={{ backgroundColor: `hsl(${index * 72}, 70%, 50%)` }}
                    ></div>
                    <span className="text-sm text-gray-700">{source.source}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900">{source.count}</span>
                    <span className="text-sm text-gray-500">({source.percentage}%)</span>
                    <span className="text-sm text-green-600">{source.conversion}% conv</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${source.percentage}%`,
                      backgroundColor: `hsl(${index * 72}, 70%, 50%)`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Total Earnings</div>
                <div className="text-2xl font-bold text-green-600">
                  ₹{earningsBreakdown.totalEarnings.toLocaleString()}
                </div>
              </div>
              <CurrencyRupeeIcon className="h-8 w-8 text-green-600" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Commission</span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{earningsBreakdown.commission.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Performance Bonuses</span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{earningsBreakdown.bonuses.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Referral Bonus</span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{earningsBreakdown.referralBonus.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Earnings Trend</h3>
          <div className="space-y-3">
            {earningsBreakdown.breakdown.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{month.month}</div>
                  <div className="text-sm text-gray-600">{month.deals} deals</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ₹{month.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    ₹{Math.round(month.amount / month.deals).toLocaleString()}/deal
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Properties */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Property Performance Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inquiries
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Listed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformingProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{property.title}</div>
                      <div className="text-sm text-gray-500">{property.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">{property.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{property.leads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      {property.views}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{property.inquiries}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 mr-2">
                        {property.conversion}%
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            property.conversion >= 20 ? 'bg-green-500' :
                            property.conversion >= 10 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(property.conversion * 4, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{property.daysListed} days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      property.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : property.status === 'Sold'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Response Performance</h4>
            <ClockIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{leadAnalytics.avgResponseTime}</div>
            <div className="text-sm text-gray-600">Average Response Time</div>
            <div className="mt-3 text-sm text-green-600">15% faster than last month</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Monthly Targets</h4>
            <TrophyIcon className="h-5 w-5 text-orange-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Leads Target</span>
              <span>156/150</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '104%' }}></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Earnings Target</span>
              <span>₹1.85L/₹2L</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92.5%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Overall Performance</h4>
            <ChartPieIcon className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-3">
              <div className="w-24 h-24 rounded-full bg-green-100"></div>
              <div className="absolute text-2xl font-bold text-green-600">8.5</div>
            </div>
            <div className="text-sm text-gray-600">Performance Score (Out of 10)</div>
            <div className="mt-2 text-sm text-green-600">Excellent Performance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerReports;
