import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  ChartBarIcon,
  DocumentChartBarIcon,
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  EyeIcon,
  PrinterIcon,
  ShareIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const CompanyReports = () => {
  const { user, api } = useAuth();
  
  // State Management
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState({});
  const [selectedDateRange, setSelectedDateRange] = useState('last6months');
  const [selectedReportType, setSelectedReportType] = useState('overview');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [showFilters, setShowFilters] = useState(false);

  // Sample Data
  const sampleData = {
    overview: {
      totalCompanies: 156,
      totalRevenue: 8450000,
      totalUsers: 12847,
      totalProperties: 45632,
      growth: {
        companies: 12.5,
        revenue: 18.3,
        users: 8.7,
        properties: 15.2
      }
    },
    monthlyRevenue: [
      { month: 'Apr', revenue: 1250000, companies: 45 },
      { month: 'May', revenue: 1380000, companies: 48 },
      { month: 'Jun', revenue: 1420000, companies: 52 },
      { month: 'Jul', revenue: 1380000, companies: 55 },
      { month: 'Aug', revenue: 1450000, companies: 58 },
      { month: 'Sep', revenue: 1570000, companies: 61 }
    ],
    topCompanies: [
      {
        name: 'Premium Properties Ltd.',
        revenue: 2850000,
        users: 245,
        properties: 1250,
        plan: 'Premium',
        growth: 25.3
      },
      {
        name: 'Metro Real Estate',
        revenue: 1950000,
        users: 189,
        properties: 890,
        plan: 'Enterprise',
        growth: 18.7
      },
      {
        name: 'Elite Homes',
        revenue: 750000,
        users: 67,
        properties: 345,
        plan: 'Basic',
        growth: -5.2
      },
      {
        name: 'Royal Properties',
        revenue: 1250000,
        users: 134,
        properties: 523,
        plan: 'Premium',
        growth: 15.8
      },
      {
        name: 'Urban Estates',
        revenue: 980000,
        users: 98,
        properties: 412,
        plan: 'Basic',
        growth: 22.1
      }
    ],
    planDistribution: [
      { plan: 'Basic', count: 89, percentage: 57.1, revenue: 3200000 },
      { plan: 'Premium', count: 45, percentage: 28.8, revenue: 4100000 },
      { plan: 'Enterprise', count: 22, percentage: 14.1, revenue: 1150000 }
    ],
    geographicData: [
      { region: 'Mumbai', companies: 45, revenue: 2800000, users: 3456 },
      { region: 'Delhi', companies: 38, revenue: 2100000, users: 2890 },
      { region: 'Bangalore', companies: 32, revenue: 1900000, users: 2234 },
      { region: 'Pune', companies: 28, revenue: 1200000, users: 1876 },
      { region: 'Chennai', companies: 25, revenue: 1100000, users: 1654 },
      { region: 'Hyderabad', companies: 22, revenue: 900000, users: 1432 }
    ]
  };

  useEffect(() => {
    loadReportData();
  }, [selectedDateRange, selectedReportType]);

  const loadReportData = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await api.get(`/admin/reports/companies?range=${selectedDateRange}&type=${selectedReportType}`);
      
      // Simulate API delay
      setTimeout(() => {
        setReportData(sampleData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading report data:', error);
      toast.error('Failed to load report data');
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    // Implement export functionality
    toast.success(`Exporting report as ${format.toUpperCase()}...`);
    
    // Simulate export
    setTimeout(() => {
      toast.success(`Report exported successfully as ${format.toUpperCase()}`);
    }, 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const reportTypes = [
    { value: 'overview', label: 'Overview Report' },
    { value: 'revenue', label: 'Revenue Analysis' },
    { value: 'performance', label: 'Company Performance' },
    { value: 'geographic', label: 'Geographic Distribution' },
    { value: 'plans', label: 'Subscription Plans' }
  ];

  const dateRanges = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <DocumentChartBarIcon className="h-8 w-8 mr-3" />
              Company Reports & Analytics
            </h1>
            <p className="text-red-100 text-lg">
              Comprehensive business intelligence and performance analytics
            </p>
          </div>
          <div className="text-right">
            <div className="text-red-100 text-sm">Total Revenue</div>
            <div className="font-bold text-3xl">{formatCurrency(reportData.overview?.totalRevenue || 0)}</div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Report Controls */}
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              {dateRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Export Controls */}
          <div className="flex gap-2">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>

            <button
              onClick={() => handleExport(exportFormat)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export
            </button>

            <button
              onClick={() => window.print()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <PrinterIcon className="h-5 w-5 mr-2" />
              Print
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Plans</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500">
                  <option value="">All Plans</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500">
                  <option value="">All Regions</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="bangalore">Bangalore</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Revenue Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500">
                  <option value="">All Ranges</option>
                  <option value="0-500000">₹0 - ₹5L</option>
                  <option value="500000-2000000">₹5L - ₹20L</option>
                  <option value="2000000+">₹20L+</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Companies',
            value: reportData.overview?.totalCompanies || 0,
            change: reportData.overview?.growth?.companies || 0,
            icon: BuildingOfficeIcon,
            color: 'blue'
          },
          {
            title: 'Total Revenue',
            value: formatCurrency(reportData.overview?.totalRevenue || 0),
            change: reportData.overview?.growth?.revenue || 0,
            icon: CurrencyRupeeIcon,
            color: 'green'
          },
          {
            title: 'Total Users',
            value: (reportData.overview?.totalUsers || 0).toLocaleString(),
            change: reportData.overview?.growth?.users || 0,
            icon: UserGroupIcon,
            color: 'purple'
          },
          {
            title: 'Total Properties',
            value: (reportData.overview?.totalProperties || 0).toLocaleString(),
            change: reportData.overview?.growth?.properties || 0,
            icon: ChartBarIcon,
            color: 'orange'
          }
        ].map((metric, index) => {
          const IconComponent = metric.icon;
          const isPositive = metric.change >= 0;
          
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {isPositive ? (
                      <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(metric.change)}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">vs last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${metric.color}-50`}>
                  <IconComponent className={`h-8 w-8 text-${metric.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <ChartBarIcon className="h-6 w-6 mr-2 text-red-500" />
            Revenue Trend Analysis
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Last 6 months</span>
          </div>
        </div>

        {/* Chart Placeholder - Replace with actual chart component */}
        <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
          [403]
        </div>

        {/* Monthly Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Month</th>
                <th className="text-right py-2 px-3 text-sm font-medium text-gray-600">Revenue</th>
                <th className="text-right py-2 px-3 text-sm font-medium text-gray-600">Companies</th>
                <th className="text-right py-2 px-3 text-sm font-medium text-gray-600">Avg/Company</th>
              </tr>
            </thead>
            <tbody>
              {reportData.monthlyRevenue?.map((month, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 px-3 text-sm font-medium text-gray-900">{month.month} 2025</td>
                  <td className="py-2 px-3 text-sm text-right text-green-600 font-semibold">
                    {formatCurrency(month.revenue)}
                  </td>
                  <td className="py-2 px-3 text-sm text-right text-gray-600">{month.companies}</td>
                  <td className="py-2 px-3 text-sm text-right text-gray-600">
                    {formatCurrency(month.revenue / month.companies)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Companies Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUpIcon className="h-6 w-6 mr-2 text-green-500" />
          Top Performing Companies
        </h2>

        {/* Top Companies Chart */}
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
          [405]
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Company</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Revenue</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Users</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Properties</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Plan</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Growth</th>
              </tr>
            </thead>
            <tbody>
              {reportData.topCompanies?.map((company, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{company.name}</div>
                        <div className="text-xs text-gray-500">Rank #{index + 1}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="text-sm font-semibold text-green-600">
                      {formatCurrency(company.revenue)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-gray-600">
                    {company.users.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-gray-600">
                    {company.properties.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      company.plan === 'Enterprise' ? 'bg-yellow-100 text-yellow-800' :
                      company.plan === 'Premium' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {company.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className={`flex items-center justify-end ${
                      company.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {company.growth >= 0 ? (
                        <TrendingUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDownIcon className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">
                        {formatPercentage(company.growth)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Distribution & Geographic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Plan Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <FunnelIcon className="h-6 w-6 mr-2 text-purple-500" />
            Subscription Plan Distribution
          </h2>

          {/* Plan Distribution Chart */}
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
            [404]
          </div>

          <div className="space-y-3">
            {reportData.planDistribution?.map((plan, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-3 ${
                    plan.plan === 'Enterprise' ? 'bg-yellow-500' :
                    plan.plan === 'Premium' ? 'bg-purple-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{plan.plan}</div>
                    <div className="text-xs text-gray-600">{plan.count} companies</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{plan.percentage}%</div>
                  <div className="text-xs text-green-600">{formatCurrency(plan.revenue)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <BuildingOfficeIcon className="h-6 w-6 mr-2 text-blue-500" />
            Geographic Distribution
          </h2>

          <div className="space-y-4">
            {reportData.geographicData?.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    {region.region.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{region.region}</div>
                    <div className="text-xs text-gray-600">{region.companies} companies</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600">
                    {formatCurrency(region.revenue)}
                  </div>
                  <div className="text-xs text-gray-600">{region.users.toLocaleString()} users</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DocumentChartBarIcon className="h-6 w-6 mr-2 text-gray-500" />
          Report Summary & Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900">Key Findings</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Total revenue increased by 18.3% compared to previous period
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Premium Properties Ltd. leads with ₹28.5L revenue contribution
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Mumbai region dominates with 45 companies and ₹28L revenue
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Basic plan accounts for 57.1% of all subscriptions
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900">Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Focus on converting Basic plan users to Premium/Enterprise
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Investigate declining performance in Elite Homes (-5.2%)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Expand market presence in underrepresented regions
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Leverage high-performing companies for case studies
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Report generated on {new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div>
              Generated by {user?.name} (Super Admin)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyReports;
