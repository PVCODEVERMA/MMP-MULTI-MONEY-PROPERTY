import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  UsersIcon,
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ServerIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // System Statistics
  const systemStats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: UsersIcon,
      color: "blue",
    },
    {
      title: "Active Companies",
      value: "156",
      change: "+5.2%",
      trend: "up",
      icon: BuildingOfficeIcon,
      color: "green",
    },
    {
      title: "Monthly Revenue",
      value: "₹8.4M",
      change: "+18.3%",
      trend: "up",
      icon: CurrencyRupeeIcon,
      color: "purple",
    },
    {
      title: "System Health",
      value: "99.2%",
      change: "+0.1%",
      trend: "up",
      icon: ServerIcon,
      color: "emerald",
    },
  ];

  const globalStats = [
    { label: "Total Properties", value: "45,632 Units" },
    { label: "Active Brokers", value: "3,456 Users" },
    { label: "Monthly Transactions", value: "₹12.4M Revenue" },
    { label: "System Uptime", value: "99.9% Available" },
  ];

  const regionStats = [
    { region: "Mumbai", companies: "45 Companies", revenue: "₹2.8M" },
    { region: "Delhi", companies: "38 Companies", revenue: "₹2.1M" },
    { region: "Bangalore", companies: "32 Companies", revenue: "₹1.9M" },
    { region: "Pune", companies: "28 Companies", revenue: "₹1.2M" },
    { region: "Chennai", companies: "25 Companies", revenue: "₹1.1M" },
    { region: "Hyderabad", companies: "22 Companies", revenue: "₹0.9M" },
  ];

  const systemActivities = [
    {
      title: "Database Backup Completed",
      description: "Automated backup successful at 02:00 AM",
      time: "2 hours ago",
      type: "success",
      icon: CheckCircleIcon,
    },
    {
      title: "New Company Registration",
      description: "Metro Properties registered from Mumbai",
      time: "3 hours ago",
      type: "info",
      icon: BuildingOfficeIcon,
    },
    {
      title: "Security Alert Resolved",
      description: "Failed login attempts blocked successfully",
      time: "5 hours ago",
      type: "warning",
      icon: ExclamationTriangleIcon,
    },
    {
      title: "System Update Deployed",
      description: "Version 3.0 features released to production",
      time: "1 day ago",
      type: "info",
      icon: ServerIcon,
    },
  ];

  const topCompanies = [
    {
      name: "Premium Properties Ltd.",
      users: 245,
      revenue: "₹890K",
      growth: "+25%",
    },
    { name: "Metro Real Estate", users: 198, revenue: "₹745K", growth: "+18%" },
    { name: "Elite Homes", users: 156, revenue: "₹632K", growth: "+22%" },
    { name: "Royal Properties", users: 134, revenue: "₹523K", growth: "+15%" },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">System Administration</h1>
            <p className="text-red-100 text-lg">
              {getGreeting()}, {user?.name}! Welcome to Multi Money Property
              Control Center
            </p>
            <div className="mt-3 inline-flex items-center px-3 py-1 bg-red-500/30 rounded-full text-sm">
              <ShieldCheckIcon className="w-4 h-4 mr-2" />
              Super Administrator Access
            </div>
          </div>
          <div className="text-right">
            <div className="text-red-100 text-sm">System Time</div>
            <div className="font-semibold text-lg">
              {currentTime.toLocaleString("en-IN", {
                weekday: "long",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-3">
                    {stat.trend === "up" ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                  <IconComponent className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GlobeAltIcon className="h-5 w-5 mr-2 text-red-500" />
          Global Platform Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {globalStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Performance & System Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Regional Performance
          </h3>
          <div className="space-y-4">
            {regionStats.map((region, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {region.region}
                  </div>
                  <div className="text-sm text-gray-600">
                    {region.companies}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {region.revenue}
                  </div>
                  <div className="text-sm text-green-600">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ClockIcon className="h-5 w-5 mr-2 text-blue-500" />
            System Activities
          </h3>
          <div className="space-y-4">
            {systemActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "success"
                        ? "bg-green-100"
                        : activity.type === "warning"
                        ? "bg-yellow-100"
                        : "bg-blue-100"
                    }`}
                  >
                    <IconComponent
                      className={`h-4 w-4 ${
                        activity.type === "success"
                          ? "text-green-600"
                          : activity.type === "warning"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Companies */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Performing Companies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topCompanies.map((company, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  #{index + 1}
                </div>
                <span className="text-xs font-medium text-green-600">
                  {company.growth}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">
                {company.name}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Users:</span>
                  <span className="font-medium">{company.users}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-medium">{company.revenue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Administrative Actions */}
      {/* Quick Administrative Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Administrative Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "User Management",
              icon: UsersIcon,
              color: "blue",
              href: "/super-admin/users",
            },
            {
              label: "System Settings",
              icon: CogIcon,
              color: "gray",
              href: "/super-admin/settings",
            }, // ← Now works
            {
              label: "Global Reports",
              icon: ChartBarIcon,
              color: "purple",
              href: "/super-admin/reports",
            },
            {
              label: "Company Oversight",
              icon: BuildingOfficeIcon,
              color: "green",
              href: "/super-admin/companies",
            },
          ].map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={() => (window.location.href = action.href)}
                className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all text-left group"
              >
                <div
                  className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent
                    className={`h-6 w-6 text-${action.color}-600`}
                  />
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {action.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
