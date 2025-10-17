// pages/sub-admin/SubAdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  HomeIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

const SubAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBrokers: 45,
    totalProperties: 1250,
    totalLeads: 890,
    monthlyRevenue: 2500000,
    activeBrokers: 38,
    pendingVerifications: 15
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'broker_joined',
      broker: 'Rajesh Kumar',
      message: 'New broker registered and approved',
      timestamp: '5 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'property_verified',
      property: 'Sobha Paradise, Gurgaon',
      message: 'Property verification completed',
      timestamp: '15 minutes ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'lead_distributed',
      message: '25 new leads distributed to top performers',
      timestamp: '1 hour ago',
      status: 'info'
    },
    {
      id: 4,
      type: 'payment_received',
      broker: 'Priya Sharma',
      message: 'Monthly subscription payment received',
      timestamp: '2 hours ago',
      status: 'success'
    }
  ]);

  const [topPerformers, setTopPerformers] = useState([
    { name: 'Rajesh Kumar', deals: 12, revenue: 480000, growth: '+25%' },
    { name: 'Priya Sharma', deals: 10, revenue: 420000, growth: '+18%' },
    { name: 'Amit Singh', deals: 8, revenue: 350000, growth: '+15%' },
    { name: 'Sneha Patel', deals: 7, revenue: 290000, growth: '+12%' },
    { name: 'Ravi Gupta', deals: 6, revenue: 240000, growth: '+8%' }
  ]);

  const statsCards = [
    {
      title: "Active Brokers",
      value: stats.activeBrokers,
      total: stats.totalBrokers,
      change: "+8%",
      changeType: "increase",
      icon: UserGroupIcon,
      color: "bg-blue-500"
    },
    {
      title: "Total Properties",
      value: stats.totalProperties.toLocaleString(),
      change: "+15%",
      changeType: "increase",
      icon: HomeIcon,
      color: "bg-green-500"
    },
    {
      title: "Monthly Revenue",
      value: `₹${(stats.monthlyRevenue / 100000).toFixed(1)}L`,
      change: "+22%",
      changeType: "increase",
      icon: CurrencyRupeeIcon,
      color: "bg-orange-500"
    },
    {
      title: "Total Leads",
      value: stats.totalLeads.toLocaleString(),
      change: "+18%",
      changeType: "increase",
      icon: ChartBarIcon,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="space-y-6">
     

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  mt-5 mx-5">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center text-sm">
                {stat.changeType === "increase" ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={stat.changeType === "increase" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
            {stat.total && (
              <div className="text-xs text-gray-500 mt-1">
                of {stat.total} total
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-5">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' : 
                  activity.status === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  {activity.broker && (
                    <p className="text-xs text-gray-600">Broker: {activity.broker}</p>
                  )}
                  {activity.property && (
                    <p className="text-xs text-gray-600">Property: {activity.property}</p>
                  )}
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              View all activities →
            </button>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Brokers</h3>
          <div className="space-y-3">
            {topPerformers.map((performer, index) => (
              <div key={performer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{performer.name}</div>
                    <div className="text-sm text-gray-600">{performer.deals} deals</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ₹{(performer.revenue / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-green-600">{performer.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white rounded-lg shadow-sm p-6 mx-5 mb-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Property Verifications</div>
              <div className="text-sm text-gray-600">{stats.pendingVerifications} pending</div>
            </div>
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Broker Applications</div>
              <div className="text-sm text-gray-600">8 pending review</div>
            </div>
            <ClockIcon className="h-6 w-6 text-blue-500" />
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">System Health</div>
              <div className="text-sm text-gray-600">All systems operational</div>
            </div>
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminDashboard;
