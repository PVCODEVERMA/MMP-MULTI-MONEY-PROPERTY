import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

// Mock data for charts
const leadData = [
  { name: "Jan", leads: 4000, converted: 2400 },
  { name: "Feb", leads: 3000, converted: 1398 },
  { name: "Mar", leads: 2000, converted: 9800 },
  { name: "Apr", leads: 2780, converted: 3908 },
  { name: "May", leads: 1890, converted: 4800 },
  { name: "Jun", leads: 2390, converted: 3800 },
  { name: "Jul", leads: 3490, converted: 4300 }
];

const revenueData = [
  { name: "Packages", value: 65 },
  { name: "Wallet", value: 35 }
];

const COLORS = ["#0088FE", "#00C49F"];

// Dashboard Component
export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Leads</p>
              <h3 className="text-3xl font-bold text-gray-800">1,248</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <i className="fas fa-users text-blue-600 text-xl"></i>
            </div>
          </div>
          <p className="text-green-600 mt-2">
            <i className="fas fa-arrow-up"></i> 12% from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Active Brokers</p>
              <h3 className="text-3xl font-bold text-gray-800">42</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <i className="fas fa-user-tie text-green-600 text-xl"></i>
            </div>
          </div>
          <p className="text-green-600 mt-2">
            <i className="fas fa-arrow-up"></i> 5% from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Conversion Rate</p>
              <h3 className="text-3xl font-bold text-gray-800">24%</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <i className="fas fa-chart-line text-purple-600 text-xl"></i>
            </div>
          </div>
          <p className="text-red-600 mt-2">
            <i className="fas fa-arrow-down"></i> 3% from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Revenue</p>
              <h3 className="text-3xl font-bold text-gray-800">₹2.18L</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <i className="fas fa-rupee-sign text-yellow-600 text-xl"></i>
            </div>
          </div>
          <p className="text-green-600 mt-2">
            <i className="fas fa-arrow-up"></i> 18% from last month
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Leads Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="leads" fill="#8884d8" />
              <Bar dataKey="converted" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Revenue Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Leads</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">Rahul Sharma</td>
                <td className="px-6 py-4 whitespace-nowrap">Godrej Paradise</td>
                <td className="px-6 py-4 whitespace-nowrap">Mumbai</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Contacted
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">12 Oct 2023</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">Priya Patel</td>
                <td className="px-6 py-4 whitespace-nowrap">DLF Capital Greens</td>
                <td className="px-6 py-4 whitespace-nowrap">Delhi</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    New
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">11 Oct 2023</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">Vikram Singh</td>
                <td className="px-6 py-4 whitespace-nowrap">Lodha Bellissimo</td>
                <td className="px-6 py-4 whitespace-nowrap">Mumbai</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">10 Oct 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



export default AdminDashboard;