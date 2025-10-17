import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  UserPlusIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  CheckCircleIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Plan Badge Component
const PlanBadge = () => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#ff9c00] bg-opacity-20 text-[#154045]">
      Starter Plan - Low Level Leads
    </span>
  );
};

// Feature Status Component
const FeatureStatus = ({ enabled, label }) => (
  <div className="flex items-center space-x-3">
    {enabled ? (
      <CheckCircleIcon className="h-5 w-5 text-[#ff9c00]" />
    ) : (
      <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
    )}
    <span className={`text-sm ${enabled ? 'text-[#154045]' : 'text-gray-400'}`}>
      {label}
    </span>
  </div>
);

// Metric Card Component
const MetricCard = ({ title, value, change, icon: Icon, color, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-600 mb-1 truncate">{title}</p>
          <p className="text-xl font-bold text-[#154045] mb-1 truncate">{value}</p>
          {change && (
            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              change > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
            </div>
          )}
        </div>
        <div className={`p-2 rounded-xl ml-2 flex-shrink-0 ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
};

// Chart Container Component
const ChartContainer = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 ${className}`}>
      <h3 className="text-base lg:text-lg font-semibold text-[#154045] mb-4 lg:mb-6">{title}</h3>
      {children}
    </div>
  );
};

// Lead Card Component - Optimized for mobile
const LeadCard = ({ lead }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <div className="flex-1 min-w-0 mr-2">
        <h4 className="font-semibold text-[#154045] text-sm truncate">{lead.name}</h4>
        <p className="text-xs text-gray-600 truncate">{lead.phone}</p>
        <p className="text-xs text-gray-500 truncate">{lead.location}</p>
      </div>
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#ff9c00] bg-opacity-20 text-[#154045] flex-shrink-0">
        LOW INTENT
      </span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-600 truncate">{lead.propertyType}</span>
      <span className="text-xs text-gray-500">{lead.time}</span>
    </div>
  </div>
);

const AgentDashboard = () => {
  const [metrics, setMetrics] = useState({
    monthlyLowLeads: 0,
    lowConversionRate: 0,
    activeLowLeads: 0,
    responseRate: 0,
    leadsChange: 0,
    conversionChange: 0,
    activeChange: 0,
    responseChange: 0,
  });
  const [loading, setLoading] = useState(true);

  // Chart data states
  const [lowLeadsChartData, setLowLeadsChartData] = useState(null);
  const [lowConversionChartData, setLowConversionChartData] = useState(null);
  const [lowSourceChartData, setLowSourceChartData] = useState(null);

  // Recent low leads data
  const [recentLowLeads, setRecentLowLeads] = useState([]);

  // Mock data for Starter Low Level Leads
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Metrics data for Starter Low Level Leads
        setMetrics({
          monthlyLowLeads: 45,
          lowConversionRate: 8.5,
          activeLowLeads: 28,
          responseRate: 65,
          leadsChange: 5,
          conversionChange: 2.2,
          activeChange: 3,
          responseChange: 4.1,
        });

        // Low Leads Overview Chart Data
        setLowLeadsChartData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Low Leads Received',
              data: [35, 42, 38, 45, 48, 52],
              backgroundColor: '#ff9c00',
              borderRadius: 6,
            },
            {
              label: 'Low Leads Converted',
              data: [3, 4, 3, 4, 4, 5],
              backgroundColor: '#154045',
              borderRadius: 6,
            },
          ],
        });

        // Low Conversion Rate Trend Chart Data
        setLowConversionChartData({
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Low Lead Conversion Rate',
              data: [6, 8, 7, 10],
              borderColor: '#ff9c00',
              backgroundColor: 'rgba(255, 156, 0, 0.1)',
              tension: 0.4,
              fill: true,
            },
          ],
        });

        // Low Lead Sources Chart Data - Only Website Forms
        setLowSourceChartData({
          labels: ['multimoneyproperty.com'],
          datasets: [
            {
              data: [100],
              backgroundColor: ['#ff9c00'],
              borderWidth: 2,
              borderColor: '#ffffff',
            },
          ],
        });

        // Recent low leads data
        setRecentLowLeads([
          {
            name: 'Rohit Sharma',
            phone: '+91 9811000001',
            location: 'Sector 45, Gurgaon',
            propertyType: '2BHK Apartment',
            time: '2 min ago'
          },
          {
            name: 'Anjali Singh',
            phone: '+91 9811000002',
            location: 'Sector 50, Gurgaon',
            propertyType: '1BHK Rental',
            time: '15 min ago'
          },
          {
            name: 'Vikram Patel',
            phone: '+91 9811000003',
            location: 'Sector 52, Gurgaon',
            propertyType: 'Studio Apartment',
            time: '1 hour ago'
          },
          {
            name: 'Priya Mehta',
            phone: '+91 9811000004',
            location: 'Cyber City',
            propertyType: '1BHK Purchase',
            time: '2 hours ago'
          }
        ]);

        setLoading(false);
      }, 1500);
    };

    fetchDashboardData();
  }, []);

  // Chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          font: {
            size: 11
          }
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 15,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          font: {
            size: 10
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          font: {
            size: 10
          }
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `multimoneyproperty.com: 100%`;
          }
        }
      }
    },
    cutout: '70%',
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="p-4 lg:p-6">
        

        {/* Metrics Grid - Optimized for mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          <MetricCard
            title="Monthly Low Leads"
            value={metrics.monthlyLowLeads}
            change={metrics.leadsChange}
            icon={TagIcon}
            color="bg-[#ff9c00]"
            isLoading={loading}
          />
          <MetricCard
            title="Low Lead Conversion"
            value={`${metrics.lowConversionRate}%`}
            change={metrics.conversionChange}
            icon={ArrowTrendingUpIcon}
            color="bg-[#154045]"
            isLoading={loading}
          />
          <MetricCard
            title="Active Low Leads"
            value={metrics.activeLowLeads}
            change={metrics.activeChange}
            icon={UserPlusIcon}
            color="bg-[#ff9c00]"
            isLoading={loading}
          />
          <MetricCard
            title="Response Rate"
            value={`${metrics.responseRate}%`}
            change={metrics.responseChange}
            icon={PhoneIcon}
            color="bg-[#154045]"
            isLoading={loading}
          />
        </div>

        {/* Charts Grid - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
          {/* Low Leads Overview Chart */}
          <ChartContainer title="Leads Performance">
            {loading ? (
              <div className="h-64 sm:h-72 lg:h-80 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : (
              <div className="h-64 sm:h-72 lg:h-80">
                <Bar data={lowLeadsChartData} options={barChartOptions} />
              </div>
            )}
          </ChartContainer>

          {/* Recent Low Leads */}
          <ChartContainer title="Recent Leads">
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 max-h-64 sm:max-h-72 lg:max-h-80 overflow-y-auto no-scrollbar">
                {recentLowLeads.map((lead, index) => (
                  <LeadCard key={index} lead={lead} />
                ))}
              </div>
            )}
          </ChartContainer>
        </div>

        {/* Charts Grid - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Low Conversion Rate Trend */}
          <ChartContainer title="Low Lead Conversion Trend" className="lg:col-span-1">
            {loading ? (
              <div className="h-56 sm:h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : (
              <div className="h-56 sm:h-64">
                <Line data={lowConversionChartData} options={lineChartOptions} />
              </div>
            )}
          </ChartContainer>

          {/* Low Lead Sources - Updated to show only multimoneyproperty.com */}
          <ChartContainer title="Low Lead Sources" className="lg:col-span-1">
            {loading ? (
              <div className="h-56 sm:h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : (
              <div className="h-56 sm:h-64 flex flex-col items-center justify-center">
                <div className="w-full h-full">
                  <Doughnut data={lowSourceChartData} options={doughnutChartOptions} />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">All leads are sourced from</p>
                  <p className="text-[#ff9c00] font-semibold">multimoneyproperty.com</p>
                </div>
              </div>
            )}
          </ChartContainer>

          {/* Low Lead Plan Usage */}
          <ChartContainer title="Low Lead Plan Usage" className="lg:col-span-1">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span>Low Leads Used</span>
                  <span>{metrics.monthlyLowLeads} / 50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#ff9c00] h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(metrics.monthlyLowLeads / 50) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span>Active Low Leads</span>
                  <span>{metrics.activeLowLeads} / 30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#154045] h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(metrics.activeLowLeads / 30) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span>Conversion Progress</span>
                  <span>{metrics.lowConversionRate}% / 15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#ff9c00] h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(metrics.lowConversionRate / 15) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;