// pages/sub-admin/BrokerPerformance.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrophyIcon,
  UserGroupIcon,
  ChartBarIcon,
  CurrencyRupeeIcon,
  StarIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  MapPinIcon,
  UserIcon
} from "@heroicons/react/24/outline";

const BrokerPerformance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [sortBy, setSortBy] = useState("revenue");

  const periods = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" }
  ];

  const sortOptions = [
    { value: "revenue", label: "Revenue" },
    { value: "deals", label: "Deals Closed" },
    { value: "conversion", label: "Conversion Rate" },
    { value: "rating", label: "Client Rating" }
  ];

  const [brokers, setBrokers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@gmail.com",
      phone: "+91 98765 43210",
      joinDate: "2024-01-15",
      avatar: null,
      performance: {
        deals: 28,
        revenue: 1120000,
        target: 1000000,
        conversion: 68,
        rating: 4.8,
        clients: 42,
        avgDealSize: 40000,
        responseTime: "2.3 hours"
      },
      trend: "up",
      specialization: "Luxury Properties",
      location: "Mumbai, Maharashtra",
      monthlyData: [
        { month: "Jan", deals: 5, revenue: 200000 },
        { month: "Feb", deals: 6, revenue: 240000 },
        { month: "Mar", deals: 8, revenue: 320000 },
        { month: "Apr", deals: 9, revenue: 360000 }
      ]
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      phone: "+91 87654 32109",
      joinDate: "2024-02-20",
      avatar: null,
      performance: {
        deals: 24,
        revenue: 960000,
        target: 950000,
        conversion: 65,
        rating: 4.6,
        clients: 38,
        avgDealSize: 40000,
        responseTime: "1.8 hours"
      },
      trend: "up",
      specialization: "Commercial",
      location: "Delhi, NCR",
      monthlyData: [
        { month: "Jan", deals: 4, revenue: 160000 },
        { month: "Feb", deals: 7, revenue: 280000 },
        { month: "Mar", deals: 6, revenue: 240000 },
        { month: "Apr", deals: 7, revenue: 280000 }
      ]
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit.singh@gmail.com",
      phone: "+91 76543 21098",
      joinDate: "2024-03-10",
      avatar: null,
      performance: {
        deals: 22,
        revenue: 880000,
        target: 900000,
        conversion: 62,
        rating: 4.4,
        clients: 35,
        avgDealSize: 40000,
        responseTime: "3.1 hours"
      },
      trend: "down",
      specialization: "Residential",
      location: "Bangalore, Karnataka",
      monthlyData: [
        { month: "Jan", deals: 6, revenue: 240000 },
        { month: "Feb", deals: 5, revenue: 200000 },
        { month: "Mar", deals: 6, revenue: 240000 },
        { month: "Apr", deals: 5, revenue: 200000 }
      ]
    },
    {
      id: 4,
      name: "Sneha Patel",
      email: "sneha.patel@gmail.com",
      phone: "+91 65432 10987",
      joinDate: "2024-04-05",
      avatar: null,
      performance: {
        deals: 18,
        revenue: 720000,
        target: 750000,
        conversion: 58,
        rating: 4.2,
        clients: 28,
        avgDealSize: 40000,
        responseTime: "4.2 hours"
      },
      trend: "up",
      specialization: "Residential",
      location: "Pune, Maharashtra",
      monthlyData: [
        { month: "Jan", deals: 3, revenue: 120000 },
        { month: "Feb", deals: 4, revenue: 160000 },
        { month: "Mar", deals: 5, revenue: 200000 },
        { month: "Apr", deals: 6, revenue: 240000 }
      ]
    },
    {
      id: 5,
      name: "Ravi Gupta",
      email: "ravi.gupta@gmail.com",
      phone: "+91 54321 09876",
      joinDate: "2024-05-12",
      avatar: null,
      performance: {
        deals: 15,
        revenue: 600000,
        target: 700000,
        conversion: 55,
        rating: 4.0,
        clients: 25,
        avgDealSize: 40000,
        responseTime: "5.5 hours"
      },
      trend: "down",
      specialization: "Commercial",
      location: "Chennai, Tamil Nadu",
      monthlyData: [
        { month: "Jan", deals: 4, revenue: 160000 },
        { month: "Feb", deals: 3, revenue: 120000 },
        { month: "Mar", deals: 4, revenue: 160000 },
        { month: "Apr", deals: 4, revenue: 160000 }
      ]
    }
  ]);

  const [selectedBroker, setSelectedBroker] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const sortedBrokers = [...brokers].sort((a, b) => {
    switch (sortBy) {
      case "revenue":
        return b.performance.revenue - a.performance.revenue;
      case "deals":
        return b.performance.deals - a.performance.deals;
      case "conversion":
        return b.performance.conversion - a.performance.conversion;
      case "rating":
        return b.performance.rating - a.performance.rating;
      default:
        return 0;
    }
  });

  const getPerformanceBadge = (performance) => {
    const target = performance.target;
    const revenue = performance.revenue;
    const percentage = ((revenue / target) * 100);
    
    if (percentage >= 100) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Excellent</span>;
    } else if (percentage >= 80) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Good</span>;
    } else if (percentage >= 60) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Average</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Needs Improvement</span>;
    }
  };

  const getTrendIcon = (trend) => {
    return trend === "up" ? (
      <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
    );
  };

  const calculateOverallStats = () => {
    const totalRevenue = brokers.reduce((sum, broker) => sum + broker.performance.revenue, 0);
    const totalDeals = brokers.reduce((sum, broker) => sum + broker.performance.deals, 0);
    const avgConversion = brokers.reduce((sum, broker) => sum + broker.performance.conversion, 0) / brokers.length;
    const avgRating = brokers.reduce((sum, broker) => sum + broker.performance.rating, 0) / brokers.length;

    return {
      totalRevenue,
      totalDeals,
      avgConversion: avgConversion.toFixed(1),
      avgRating: avgRating.toFixed(1),
      totalBrokers: brokers.length,
      topPerformers: brokers.filter(b => (b.performance.revenue / b.performance.target) >= 1).length
    };
  };

  const stats = calculateOverallStats();

  const handleViewDetails = (broker) => {
    setSelectedBroker(broker);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Broker Performance</h1>
            <p className="text-gray-600">Track and analyze individual broker metrics and KPIs</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CurrencyRupeeIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                ₹{(stats.totalRevenue / 100000).toFixed(1)}L
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.totalDeals}</div>
              <div className="text-sm text-gray-600">Total Deals</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrophyIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.topPerformers}</div>
              <div className="text-sm text-gray-600">Top Performers</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <StarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.avgRating}</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Broker Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedBrokers.map((broker, index) => (
          <motion.div
            key={broker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            {/* Broker Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{broker.name}</h3>
                  <p className="text-sm text-gray-600">{broker.specialization}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(broker.trend)}
                {getPerformanceBadge(broker.performance)}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{broker.performance.deals}</div>
                <div className="text-xs text-gray-600">Deals Closed</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">
                  ₹{(broker.performance.revenue / 100000).toFixed(1)}L
                </div>
                <div className="text-xs text-gray-600">Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{broker.performance.conversion}%</div>
                <div className="text-xs text-gray-600">Conversion</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-600 flex items-center justify-center">
                  <StarIcon className="h-4 w-4 mr-1" />
                  {broker.performance.rating}
                </div>
                <div className="text-xs text-gray-600">Client Rating</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Target Progress</span>
                <span className="text-sm font-medium text-gray-900">
                  {((broker.performance.revenue / broker.performance.target) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    (broker.performance.revenue / broker.performance.target) >= 1 
                      ? 'bg-green-500' 
                      : (broker.performance.revenue / broker.performance.target) >= 0.8 
                        ? 'bg-blue-500' 
                        : 'bg-yellow-500'
                  }`}
                  style={{ 
                    width: `${Math.min((broker.performance.revenue / broker.performance.target) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-2" />
                {broker.location}
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-2" />
                Avg Response: {broker.performance.responseTime}
              </div>
              <div className="flex items-center">
                <UserGroupIcon className="h-4 w-4 mr-2" />
                {broker.performance.clients} Active Clients
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Joined: {new Date(broker.joinDate).toLocaleDateString()}
              </div>
              <button
                onClick={() => handleViewDetails(broker)}
                className="flex items-center px-3 py-1 text-sm text-orange-600 hover:text-orange-800 font-medium"
              >
                <EyeIcon className="h-4 w-4 mr-1" />
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Leaderboard */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Performance Leaderboard</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Broker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Achievement
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedBrokers.map((broker, index) => (
                <tr key={broker.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {index < 3 ? (
                          <TrophyIcon className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-medium">#{index + 1}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{broker.name}</div>
                      <div className="text-sm text-gray-500">{broker.specialization}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{broker.performance.deals}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">
                      ₹{(broker.performance.revenue / 100000).toFixed(1)}L
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{broker.performance.conversion}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-900">{broker.performance.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            (broker.performance.revenue / broker.performance.target) >= 1 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ 
                            width: `${Math.min((broker.performance.revenue / broker.performance.target) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {((broker.performance.revenue / broker.performance.target) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broker Details Modal */}
      {showModal && selectedBroker && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedBroker.name} - Performance Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedBroker.email}
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedBroker.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedBroker.location}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                      Joined: {new Date(selectedBroker.joinDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                      Specialization: {selectedBroker.specialization}
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-gray-900">{selectedBroker.performance.deals}</div>
                      <div className="text-xs text-gray-600">Deals Closed</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-green-600">
                        ₹{(selectedBroker.performance.revenue / 100000).toFixed(1)}L
                      </div>
                      <div className="text-xs text-gray-600">Revenue Generated</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-600">{selectedBroker.performance.conversion}%</div>
                      <div className="text-xs text-gray-600">Conversion Rate</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-yellow-600">{selectedBroker.performance.rating}</div>
                      <div className="text-xs text-gray-600">Client Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Performance Chart Placeholder */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Monthly Performance Trend</h4>
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Performance chart placeholder</p>
                    <p className="text-sm text-gray-400">Chart integration needed</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-orange-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-600">
                  Send Message
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrokerPerformance;
