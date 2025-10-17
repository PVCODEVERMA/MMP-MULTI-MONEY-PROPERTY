import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ConversionRateReport = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [conversionData, setConversionData] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = {
        overallConversion: 12.5,
        previousPeriod: 10.2,
        totalLeads: 245,
        convertedLeads: 28,
        pendingLeads: 45,
        lostLeads: 172,
        monthlyTrend: [8, 10, 12, 15, 11, 14, 13, 16, 12, 15, 18, 12.5],
        sourceBreakdown: {
          website: 15.2,
          referral: 22.5,
          walkin: 18.7,
          social: 8.3,
        },
        propertyTypeConversion: {
          '2BHK': 14.2,
          '3BHK': 18.7,
          '1BHK': 9.8,
          Villa: 25.3,
          Plot: 12.1,
        },
        leadStageAnalysis: {
          initial: 100,
          contacted: 65,
          qualified: 42,
          proposal: 28,
          converted: 12.5,
        }
      };
      setConversionData(mockData);
      setLoading(false);
    }, 1500);
  }, [timeRange]);

  // Chart data configurations
  const monthlyTrendChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Conversion Rate %',
        data: conversionData?.monthlyTrend || [],
        borderColor: '#ff9c00',
        backgroundColor: 'rgba(255, 156, 0, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const sourceBreakdownChart = {
    labels: ['Website', 'Referral', 'Walk-in', 'Social Media'],
    datasets: [
      {
        data: Object.values(conversionData?.sourceBreakdown || {}),
        backgroundColor: [
          '#ff9c00',
          '#154045',
          '#4CAF50',
          '#2196F3',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const propertyTypeChart = {
    labels: Object.keys(conversionData?.propertyTypeConversion || {}),
    datasets: [
      {
        label: 'Conversion Rate %',
        data: Object.values(conversionData?.propertyTypeConversion || {}),
        backgroundColor: '#154045',
        borderRadius: 6,
      },
    ],
  };

  const leadStageChart = {
    labels: ['Initial', 'Contacted', 'Qualified', 'Proposal', 'Converted'],
    datasets: [
      {
        label: 'Leads %',
        data: Object.values(conversionData?.leadStageAnalysis || {}),
        borderColor: '#ff9c00',
        backgroundColor: 'rgba(255, 156, 0, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    cutout: '60%',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const conversionChange = conversionData.overallConversion - conversionData.previousPeriod;
  const isPositive = conversionChange >= 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Conversion Rate Report</h1>
            <p className="text-gray-600 mt-2">Track and analyze your lead conversion performance</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {conversionData.overallConversion}%
                </p>
                <div className={`flex items-center mt-2 text-sm ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(conversionChange).toFixed(1)}% from previous period
                </div>
              </div>
              <div className="p-3 bg-[#ff9c00] bg-opacity-20 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-[#ff9c00]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {conversionData.totalLeads}
                </p>
                <p className="text-sm text-gray-500 mt-2">All time</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Converted Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {conversionData.convertedLeads}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {((conversionData.convertedLeads / conversionData.totalLeads) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {conversionData.pendingLeads}
                </p>
                <p className="text-sm text-gray-500 mt-2">Active in pipeline</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Conversion Trend</h3>
            <div className="h-80">
              <Line data={monthlyTrendChart} options={chartOptions} />
            </div>
          </div>

          {/* Source Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion by Source</h3>
            <div className="h-80">
              <Doughnut data={sourceBreakdownChart} options={doughnutOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property Type Conversion */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion by Property Type</h3>
            <div className="h-80">
              <Bar data={propertyTypeChart} options={chartOptions} />
            </div>
          </div>

          {/* Lead Stage Analysis */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Stage Conversion</h3>
            <div className="h-80">
              <Line data={leadStageChart} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Referral sources show highest conversion at 22.5%</li>
                <li>• Villa properties converting at 25.3% rate</li>
                <li>• Monthly trend shows positive growth</li>
              </ul>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Areas for Improvement</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li> Social media leads converting at only 8.3%</li>
                <li>1BHK properties have lowest conversion rate</li>
                <li>High drop-off between qualified and proposal stages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionRateReport;