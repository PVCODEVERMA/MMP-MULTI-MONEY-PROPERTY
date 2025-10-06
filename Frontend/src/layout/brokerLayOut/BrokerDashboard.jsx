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
const PlanBadge = ({ plan }) => {
  const planConfig = {
    starter: { label: "Starter Plan", color: "bg-blue-100 text-blue-800" },
    growth: { label: "Growth Plan", color: "bg-green-100 text-green-800" },
    custom: { label: "Custom Plan", color: "bg-purple-100 text-purple-800" }
  };

  const config = planConfig[plan] || planConfig.starter;

  return (
    <span className={` items-center px-3 py-1 rounded-full text-sm font-medium text-[#ff9c00] ${config.color}`}>
      {config.label}
    </span>
  );
};

// Feature Status Component
const FeatureStatus = ({ enabled, label }) => (
  <div className="flex items-center space-x-3 ">
    {enabled ? (
      <CheckCircleIcon className="h-5 w-5 text-green-500" />
    ) : (
      <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
    )}
    <span className={`text-sm ${enabled ? 'text-gray-900' : 'text-gray-400'}`}>
      {label}
    </span>
  </div>
);

// Metric Card Component
const MetricCard = ({ title, value, change, icon: Icon, color, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              change > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// Chart Container Component
const ChartContainer = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      {children}
    </div>
  );
};

// Lead Card Component
const LeadCard = ({ lead }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h4 className="font-semibold text-gray-900">{lead.name}</h4>
        <p className="text-sm text-gray-600">{lead.phone}</p>
        <p className="text-xs text-gray-500">{lead.location}</p>
      </div>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        lead.intent === 'HIGH' ? 'bg-red-100 text-red-800' :
        lead.intent === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
        'bg-blue-100 text-blue-800'
      }`}>
        {lead.intent} INTENT
      </span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{lead.propertyType}</span>
      <span className="text-xs text-gray-500">{lead.time}</span>
    </div>
  </div>
);



const AgentDashboard = () => {
  const [currentPlan, setCurrentPlan] = useState('starter');
  const [metrics, setMetrics] = useState({
    monthlyLeads: 0,
    conversionRate: 0,
    activeProjects: 0,
    responseRate: 0,
    leadsChange: 0,
    conversionChange: 0,
    projectsChange: 0,
    responseChange: 0,
  });
  const [loading, setLoading] = useState(true);

  // Chart data states
  const [leadsChartData, setLeadsChartData] = useState(null);
  const [conversionChartData, setConversionChartData] = useState(null);
  const [sourceChartData, setSourceChartData] = useState(null);

  // Recent leads data
  const [recentLeads, setRecentLeads] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Metrics data based on plan
        const planMetrics = {
          starter: { monthlyLeads: 65, conversionRate: 18.5, activeProjects: 1, responseRate: 72 },
          growth: { monthlyLeads: 125, conversionRate: 23.5, activeProjects: 3, responseRate: 85 },
          custom: { monthlyLeads: 250, conversionRate: 28.5, activeProjects: 5, responseRate: 92 }
        };

        setMetrics({
          monthlyLeads: planMetrics[currentPlan].monthlyLeads,
          conversionRate: planMetrics[currentPlan].conversionRate,
          activeProjects: planMetrics[currentPlan].activeProjects,
          responseRate: planMetrics[currentPlan].responseRate,
          leadsChange: 12,
          conversionChange: 5.2,
          projectsChange: 0,
          responseChange: 8.1,
        });

        // Leads Overview Chart Data
        setLeadsChartData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Leads Received',
              data: [45, 52, 48, 65, 58, 72],
              backgroundColor: '#154056',
              borderRadius: 6,
            },
            {
              label: 'Leads Converted',
              data: [8, 10, 9, 12, 11, 15],
              backgroundColor: '#ff9c00',
              borderRadius: 6,
            },
          ],
        });

        // Conversion Rate Trend Chart Data
        setConversionChartData({
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Conversion Rate',
              data: [16, 18, 15, 22],
              borderColor: '#ff9c00',
              backgroundColor: 'rgba(255, 156, 0, 0.1)',
              tension: 0.4,
              fill: true,
            },
          ],
        });

        // Lead Sources Chart Data
        setSourceChartData({
          labels: ['Website', 'Social Media', 'Referrals', 'Direct', 'Others'],
          datasets: [
            {
              data: [40, 25, 20, 10, 5],
              backgroundColor: [
                '#154056',
                '#ff9c00',
                '#10B981',
                '#3B82F6',
                '#6B7280',
              ],
              borderWidth: 2,
              borderColor: '#ffffff',
            },
          ],
        });

        // Recent leads data
        setRecentLeads([
          {
            name: 'Rohit Sharma',
            phone: '+91 9811000001',
            location: 'Sector 45, Gurgaon',
            propertyType: 'Residential Apartment',
            intent: 'HIGH',
            time: '2 min ago'
          },
          {
            name: 'Anjali Singh',
            phone: '+91 9811000002',
            location: 'Sector 50, Gurgaon',
            propertyType: 'Villa',
            intent: 'MEDIUM',
            time: '15 min ago'
          },
          {
            name: 'Vikram Patel',
            phone: '+91 9811000003',
            location: 'Sector 52, Gurgaon',
            propertyType: 'Penthouse',
            intent: 'LOW',
            time: '1 hour ago'
          },
          {
            name: 'Priya Mehta',
            phone: '+91 9811000004',
            location: 'Cyber City',
            propertyType: 'Office Space',
            intent: 'HIGH',
            time: '2 hours ago'
          }
        ]);

        setLoading(false);
      }, 1500);
    };

    fetchDashboardData();
  }, [currentPlan]);

  // Chart options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 30,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    cutout: '70%',
  };

 

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start ">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your real estate lead performance.</p>
            </div>
            <PlanBadge  plan={currentPlan} />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Monthly Leads"
            value={metrics.monthlyLeads}
            change={metrics.leadsChange}
            icon={UserPlusIcon}
            color="bg-[#154056]"
            isLoading={loading}
          />
          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            change={metrics.conversionChange}
            icon={ArrowTrendingUpIcon}
            color="bg-[#ff9c00]"
            isLoading={loading}
          />
          <MetricCard
            title="Active Projects"
            value={metrics.activeProjects}
            change={metrics.projectsChange}
            icon={BuildingOfficeIcon}
            color="bg-green-500"
            isLoading={loading}
          />
          <MetricCard
            title="Response Rate"
            value={`${metrics.responseRate}%`}
            change={metrics.responseChange}
            icon={PhoneIcon}
            color="bg-purple-500"
            isLoading={loading}
          />
        </div>

        {/* Charts Grid - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Leads Overview Chart */}
          <ChartContainer title="Leads Performance">
            {loading ? (
              <div className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : (
              <Bar data={leadsChartData} options={barChartOptions} height={320} />
            )}
          </ChartContainer>

          {/* Recent Leads */}
          <ChartContainer title="Recent Leads">
            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentLeads.map((lead, index) => (
                  <LeadCard key={index} lead={lead} />
                ))}
              </div>
            )}
          </ChartContainer>
        </div>

        {/* Charts Grid - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Conversion Rate Trend */}
          <ChartContainer title="Conversion Trend" className="lg:col-span-1">
            {loading ? (
              <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : (
              <Line data={conversionChartData} options={lineChartOptions} height={256} />
            )}
          </ChartContainer>

          {/* Lead Sources */}
          <ChartContainer title="Lead Sources" className="lg:col-span-1">
            {loading ? (
              <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : (
              <Doughnut data={sourceChartData} options={doughnutChartOptions} height={256} />
            )}
          </ChartContainer>

          {/* Plan Usage */}
          <ChartContainer title="Plan Usage" className="lg:col-span-1">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Leads Used</span>
                  <span>{metrics.monthlyLeads} / {currentPlan === 'starter' ? 70 : currentPlan === 'growth' ? 150 : 'Unlimited'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#154056] h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(metrics.monthlyLeads / (currentPlan === 'starter' ? 70 : currentPlan === 'growth' ? 150 : 200)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Projects Listed</span>
                  <span>{metrics.activeProjects} / {currentPlan === 'starter' ? 1 : currentPlan === 'growth' ? 3 : 'Unlimited'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#ff9c00] h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(metrics.activeProjects / (currentPlan === 'starter' ? 1 : currentPlan === 'growth' ? 3 : 5)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Plan Features:</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Featured Listings</span>
                    <span>{currentPlan === 'starter' ? '0' : currentPlan === 'growth' ? '1' : 'Custom'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Graphics Included</span>
                    <span>{currentPlan === 'starter' ? 'No' : currentPlan === 'growth' ? '3' : 'Custom'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Video Support</span>
                    <span>{currentPlan === 'starter' ? 'No' : currentPlan === 'growth' ? 'Yes' : 'Yes'}</span>
                  </div>
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