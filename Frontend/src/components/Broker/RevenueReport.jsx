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
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import {
  CurrencyRupeeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  CreditCardIcon,
  BuildingStorefrontIcon,
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
  Legend
);

const RevenueReport = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = {
        totalRevenue: 1247500,
        previousRevenue: 985200,
        commissionEarned: 748500,
        pendingPayments: 187250,
        transactions: 28,
        averageTransaction: 44553,
        monthlyRevenue: [85000, 92000, 78000, 110000, 125000, 140000, 132000, 145000, 128000, 155000, 162000, 124750],
        revenueSources: {
          residential: 685000,
          commercial: 325000,
          rental: 157500,
          plot: 80000,
        },
        paymentMethods: {
          cash: 35,
          bankTransfer: 45,
          cheque: 12,
          upi: 8,
        },
        topDeals: [
          { property: '3BHK Villa, DLF Phase 3', client: 'Rajesh Kumar', amount: 125000, date: '2024-01-15' },
          { property: 'Commercial Space, Cyber City', client: 'Tech Solutions Ltd.', amount: 98000, date: '2024-01-12' },
          { property: '2BHK Apartment, Sector 45', client: 'Anjali Singh', amount: 75000, date: '2024-01-10' },
          { property: 'Plot, Sector 50', client: 'Vikram Patel', amount: 65000, date: '2024-01-08' },
        ]
      };
      setRevenueData(mockData);
      setLoading(false);
    }, 1500);
  }, [timeRange]);

  // Chart data configurations
  const monthlyRevenueChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Revenue (₹)',
        data: revenueData?.monthlyRevenue || [],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const revenueSourcesChart = {
    labels: ['Residential', 'Commercial', 'Rental', 'Plot'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: Object.values(revenueData?.revenueSources || {}),
        backgroundColor: [
          '#ff9c00',
          '#154045',
          '#10B981',
          '#3B82F6',
        ],
        borderRadius: 6,
      },
    ],
  };

  const paymentMethodsChart = {
    labels: Object.keys(revenueData?.paymentMethods || {}).map(key => 
      key.charAt(0).toUpperCase() + key.slice(1)
    ),
    datasets: [
      {
        label: 'Payment Method %',
        data: Object.values(revenueData?.paymentMethods || {}),
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#F59E0B',
          '#8B5CF6',
        ],
        borderRadius: 6,
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + (value / 1000).toFixed(0) + 'K';
          }
        }
      }
    }
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + (value / 1000).toFixed(0) + 'K';
          }
        }
      }
    }
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
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const revenueChange = revenueData.totalRevenue - revenueData.previousRevenue;
  const isPositive = revenueChange >= 0;
  const changePercentage = ((revenueChange / revenueData.previousRevenue) * 100);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Revenue Report</h1>
            <p className="text-gray-600 mt-2">Track your earnings and financial performance</p>
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
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(revenueData.totalRevenue)}
                </p>
                <div className={`flex items-center mt-2 text-sm ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(changePercentage).toFixed(1)}% from previous period
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CurrencyRupeeIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commission Earned</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(revenueData.commissionEarned)}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {((revenueData.commissionEarned / revenueData.totalRevenue) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BanknotesIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(revenueData.pendingPayments)}
                </p>
                <p className="text-sm text-gray-500 mt-2">To be collected</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <CreditCardIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {revenueData.transactions}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Avg: {formatCurrency(revenueData.averageTransaction)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BuildingStorefrontIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Revenue Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
            <div className="h-80">
              <Line data={monthlyRevenueChart} options={chartOptions} />
            </div>
          </div>

          {/* Revenue by Source */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Property Type</h3>
            <div className="h-80">
              <Bar data={revenueSourcesChart} options={barChartOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods Distribution</h3>
            <div className="h-80">
              <Bar data={paymentMethodsChart} options={barChartOptions} />
            </div>
          </div>

          {/* Top Deals */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Top Deals</h3>
            <div className="space-y-4">
              {revenueData.topDeals.map((deal, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{deal.property}</p>
                    <p className="text-sm text-gray-600">{deal.client}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(deal.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{formatCurrency(deal.amount)}</p>
                    <p className="text-xs text-gray-500">Commission</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-800">Highest Revenue Source</p>
              <p className="text-lg font-bold text-blue-900 mt-1">Residential</p>
              <p className="text-blue-700">{formatCurrency(revenueData.revenueSources.residential)}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="font-medium text-green-800">Best Payment Method</p>
              <p className="text-lg font-bold text-green-900 mt-1">Bank Transfer</p>
              <p className="text-green-700">{revenueData.paymentMethods.bankTransfer}% usage</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-800">Average Deal Size</p>
              <p className="text-lg font-bold text-purple-900 mt-1">
                {formatCurrency(revenueData.averageTransaction)}
              </p>
              <p className="text-purple-700">Per transaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;