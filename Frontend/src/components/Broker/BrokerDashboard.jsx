// pages/broker/BrokerDashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CurrencyRupeeIcon,
  ShareIcon,
  HomeIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PhoneIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

const BrokerDashboard = () => {
  const [stats, setStats] = useState({
    monthlyEarnings: 185000,
    totalLeads: 45,
    propertiesListed: 12,
    activeDeals: 8,
    conversionRate: 22.5,
    packageExpiry: "15 days",
    pendingFollowups: 6
  });

  const [recentLeads, setRecentLeads] = useState([
    {
      id: 1,
      customerName: "Rahul Sharma",
      phone: "+91 98765 43210",
      budget: "80L - 1.2Cr",
      location: "Mumbai",
      status: "new",
      timestamp: "5 minutes ago"
    },
    {
      id: 2,
      customerName: "Priya Patel",
      phone: "+91 87654 32109",
      budget: "60L - 90L",
      location: "Pune",
      status: "contacted",
      timestamp: "2 hours ago"
    },
    {
      id: 3,
      customerName: "Amit Kumar",
      phone: "+91 76543 21098",
      budget: "1Cr - 1.5Cr",
      location: "Bangalore",
      status: "interested",
      timestamp: "1 day ago"
    }
  ]);

  const [upcomingTasks, setUpcomingTasks] = useState([
    {
      id: 1,
      task: "Property site visit with Rahul Sharma",
      time: "10:00 AM",
      priority: "high"
    },
    {
      id: 2,
      task: "Follow up call with Priya Patel",
      time: "2:00 PM",
      priority: "medium"
    },
    {
      id: 3,
      task: "Submit property documents",
      time: "4:00 PM",
      priority: "high"
    }
  ]);

  const statsCards = [
    {
      title: "Monthly Earnings",
      value: `₹${(stats.monthlyEarnings / 1000).toFixed(0)}K`,
      change: "+18.5%",
      changeType: "increase",
      icon: CurrencyRupeeIcon,
      color: "bg-green-500"
    },
    {
      title: "Active Leads",
      value: stats.totalLeads,
      change: "+12%",
      changeType: "increase",
      icon: ShareIcon,
      color: "bg-blue-500"
    },
    {
      title: "Properties Listed",
      value: stats.propertiesListed,
      change: "+25%",
      changeType: "increase",
      icon: HomeIcon,
      color: "bg-orange-500"
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      change: "-2.1%",
      changeType: "decrease",
      icon: ChartBarIcon,
      color: "bg-purple-500"
    }
  ];

  const getStatusBadge = (status) => {
    const classes = {
      new: "bg-green-100 text-green-800",
      contacted: "bg-blue-100 text-blue-800",
      interested: "bg-yellow-100 text-yellow-800",
      closed: "bg-purple-100 text-purple-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const classes = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-gray-100 text-gray-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[priority]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back, Broker!</h1>
        <p className="text-gray-600">Here's your business overview for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
            <Link to="/broker/leads" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{lead.customerName}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 mr-1" />
                      {lead.phone}
                    </div>
                    <span>Budget: {lead.budget}</span>
                    <span>{lead.location}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{lead.timestamp}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(lead.status)}
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Tasks</h3>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <p className="text-xs text-gray-500 mt-1">{task.time}</p>
                </div>
                <div>
                  {getPriorityBadge(task.priority)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="w-full text-center text-sm text-orange-600 hover:text-orange-700 font-medium">
              View full calendar →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/broker/submit-property"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-orange-500 hover:bg-orange-50 transition-colors"
            >
              <HomeIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Add Property</span>
            </Link>
            <Link
              to="/broker/leads"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-orange-500 hover:bg-orange-50 transition-colors"
            >
              <ShareIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Manage Leads</span>
            </Link>
            <Link
              to="/broker/packages"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-orange-500 hover:bg-orange-50 transition-colors"
            >
              <CurrencyRupeeIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Buy Package</span>
            </Link>
            <Link
              to="/broker/reports"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-orange-500 hover:bg-orange-50 transition-colors"
            >
              <ChartBarIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">View Reports</span>
            </Link>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Package Expiring Soon</p>
                <p className="text-xs text-gray-600">Your package expires in {stats.packageExpiry}</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <ClockIcon className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Pending Follow-ups</p>
                <p className="text-xs text-gray-600">{stats.pendingFollowups} leads need follow-up</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Property Approved</p>
                <p className="text-xs text-gray-600">Your latest property listing is now live</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;
