// pages/sub-admin/BrokerManagement.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

const BrokerManagement = () => {
  const [brokers, setBrokers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@gmail.com",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      status: "active",
      package: "premium",
      joinDate: "2024-01-15",
      totalDeals: 45,
      monthlyRevenue: 180000,
      rating: 4.8,
      specialization: "Luxury Properties"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      phone: "+91 87654 32109",
      location: "Delhi, NCR",
      status: "active",
      package: "standard",
      joinDate: "2024-02-20",
      totalDeals: 32,
      monthlyRevenue: 140000,
      rating: 4.6,
      specialization: "Residential"
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit.singh@gmail.com",
      phone: "+91 76543 21098",
      location: "Bangalore, Karnataka",
      status: "pending",
      package: "basic",
      joinDate: "2024-08-25",
      totalDeals: 8,
      monthlyRevenue: 35000,
      rating: 4.2,
      specialization: "Commercial"
    },
    {
      id: 4,
      name: "Sneha Patel",
      email: "sneha.patel@gmail.com",
      phone: "+91 65432 10987",
      location: "Pune, Maharashtra",
      status: "suspended",
      package: "standard",
      joinDate: "2024-03-10",
      totalDeals: 28,
      monthlyRevenue: 95000,
      rating: 3.8,
      specialization: "Residential"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "suspended", label: "Suspended" }
  ];

  const packageOptions = [
    { value: "all", label: "All Packages" },
    { value: "basic", label: "Basic" },
    { value: "standard", label: "Standard" },
    { value: "premium", label: "Premium" }
  ];

  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         broker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         broker.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || broker.status === statusFilter;
    const matchesPackage = packageFilter === "all" || broker.package === packageFilter;
    return matchesSearch && matchesStatus && matchesPackage;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'suspended':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPackageBadge = (packageType) => {
    const classes = {
      basic: "bg-gray-100 text-gray-800",
      standard: "bg-blue-100 text-blue-800",
      premium: "bg-purple-100 text-purple-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[packageType]}`}>
        {packageType.charAt(0).toUpperCase() + packageType.slice(1)}
      </span>
    );
  };

  const handleViewBroker = (broker) => {
    setSelectedBroker(broker);
    setShowModal(true);
  };

  const handleStatusChange = (brokerId, newStatus) => {
    setBrokers(brokers.map(broker => 
      broker.id === brokerId ? { ...broker, status: newStatus } : broker
    ));
  };

  const handleDeleteBroker = (brokerId) => {
    if (window.confirm("Are you sure you want to delete this broker?")) {
      setBrokers(brokers.filter(broker => broker.id !== brokerId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Broker Management</h1>
            <p className="text-gray-600">Manage and monitor all brokers in your network</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Broker
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search brokers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <select
              value={packageFilter}
              onChange={(e) => setPackageFilter(e.target.value)}
              className="px-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
            >
              {packageOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Brokers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Broker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBrokers.map((broker, index) => (
                <motion.tr
                  key={broker.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserGroupIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{broker.name}</div>
                        <div className="text-sm text-gray-500">{broker.location}</div>
                        <div className="text-xs text-gray-400">{broker.specialization}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center mb-1">
                      <EnvelopeIcon className="h-4 w-4 mr-1 text-gray-400" />
                      {broker.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <PhoneIcon className="h-4 w-4 mr-1 text-gray-400" />
                      {broker.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(broker.status)}
                      <span className="ml-2">{getStatusBadge(broker.status)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPackageBadge(broker.package)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{broker.totalDeals} deals</div>
                      <div className="text-green-600">₹{(broker.monthlyRevenue / 1000).toFixed(0)}K/month</div>
                      <div className="text-yellow-600">★ {broker.rating}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewBroker(broker)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                        title="View Details"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-green-600"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBroker(broker.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
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
              className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Broker Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-sm text-gray-900">{selectedBroker.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedBroker.status}
                    onChange={(e) => handleStatusChange(selectedBroker.id, e.target.value)}
                    className="text-sm border-gray-300 rounded-md"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-sm text-gray-900">{selectedBroker.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-sm text-gray-900">{selectedBroker.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <p className="text-sm text-gray-900">{selectedBroker.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <p className="text-sm text-gray-900">{selectedBroker.joinDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Deals</label>
                  <p className="text-sm text-gray-900">{selectedBroker.totalDeals}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Revenue</label>
                  <p className="text-sm text-gray-900">₹{selectedBroker.monthlyRevenue.toLocaleString()}</p>
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
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrokerManagement;
