// pages/sub-admin/PropertyVerification.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  HomeIcon,
  CurrencyRupeeIcon,
  UserIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";

const PropertyVerification = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Luxury Villa in Bandra West",
      location: "Bandra West, Mumbai",
      price: 85000000,
      bhk: "4 BHK",
      area: "2500 sq ft",
      broker: "Rajesh Kumar",
      submitDate: "2024-08-28",
      status: "pending",
      priority: "high",
      images: 8,
      documents: 12,
      verificationPoints: [
        { item: "Title Documents", status: "pending" },
        { item: "Property Photos", status: "verified" },
        { item: "Legal Clearance", status: "pending" },
        { item: "Market Price Check", status: "verified" },
        { item: "Location Verification", status: "pending" }
      ]
    },
    {
      id: 2,
      title: "Modern Office Space",
      location: "Cyber City, Gurgaon",
      price: 25000000,
      bhk: "Commercial",
      area: "1800 sq ft",
      broker: "Priya Sharma",
      submitDate: "2024-08-27",
      status: "verified",
      priority: "medium",
      images: 12,
      documents: 8,
      verificationPoints: [
        { item: "Title Documents", status: "verified" },
        { item: "Property Photos", status: "verified" },
        { item: "Legal Clearance", status: "verified" },
        { item: "Market Price Check", status: "verified" },
        { item: "Location Verification", status: "verified" }
      ]
    },
    {
      id: 3,
      title: "Penthouse with City View",
      location: "Koramangala, Bangalore",
      price: 45000000,
      bhk: "3 BHK",
      area: "2200 sq ft",
      broker: "Amit Singh",
      submitDate: "2024-08-25",
      status: "rejected",
      priority: "low",
      images: 6,
      documents: 5,
      verificationPoints: [
        { item: "Title Documents", status: "rejected" },
        { item: "Property Photos", status: "verified" },
        { item: "Legal Clearance", status: "rejected" },
        { item: "Market Price Check", status: "pending" },
        { item: "Location Verification", status: "verified" }
      ],
      rejectionReason: "Incomplete title documents and legal issues"
    }
  ]);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending Verification" },
    { value: "verified", label: "Verified" },
    { value: "rejected", label: "Rejected" }
  ];

  const filteredProperties = properties.filter(property => {
    return statusFilter === "all" || property.status === statusFilter;
  });

  const getStatusBadge = (status) => {
    const classes = {
      pending: "bg-yellow-100 text-yellow-800",
      verified: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const classes = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[priority]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const getVerificationIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const handleVerifyProperty = (propertyId, status) => {
    setProperties(properties.map(property => 
      property.id === propertyId ? { ...property, status } : property
    ));
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Verification</h1>
            <p className="text-gray-600">Review and verify property listings before publication</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {properties.filter(p => p.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {properties.filter(p => p.status === 'verified').length}
              </div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {properties.filter(p => p.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{properties.length}</div>
              <div className="text-sm text-gray-600">Total Properties</div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div className="space-y-4">
        {filteredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {property.location}
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-1" />
                        {property.broker}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {property.submitDate}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{property.bhk}</span>
                      <span>{property.area}</span>
                      <span className="text-green-600 font-medium">
                        ₹{(property.price / 10000000).toFixed(1)}Cr
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(property.priority)}
                    {getStatusBadge(property.status)}
                  </div>
                </div>

                {/* Verification Points */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                  {property.verificationPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      {getVerificationIcon(point.status)}
                      <span className="text-xs text-gray-600">{point.item}</span>
                    </div>
                  ))}
                </div>

                {property.rejectionReason && (
                  <div className="mb-4 p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-sm text-red-800">Rejection Reason: {property.rejectionReason}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{property.images} images</span>
                    <span>{property.documents} documents</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewDetails(property)}
                      className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                    {property.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleVerifyProperty(property.id, 'verified')}
                          className="flex items-center px-3 py-1 text-sm text-green-600 hover:text-green-800"
                        >
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleVerifyProperty(property.id, 'rejected')}
                          className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800"
                        >
                          <XCircleIcon className="h-4 w-4 mr-1" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Property Details Modal */}
      {showModal && selectedProperty && (
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
                <h3 className="text-lg font-medium text-gray-900">Property Verification Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Property Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Title:</span> {selectedProperty.title}</div>
                    <div><span className="text-gray-600">Location:</span> {selectedProperty.location}</div>
                    <div><span className="text-gray-600">Price:</span> ₹{selectedProperty.price.toLocaleString()}</div>
                    <div><span className="text-gray-600">Type:</span> {selectedProperty.bhk}</div>
                    <div><span className="text-gray-600">Area:</span> {selectedProperty.area}</div>
                    <div><span className="text-gray-600">Broker:</span> {selectedProperty.broker}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Verification Status</h4>
                  <div className="space-y-2">
                    {selectedProperty.verificationPoints.map((point, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{point.item}</span>
                        <div className="flex items-center">
                          {getVerificationIcon(point.status)}
                          <span className="ml-2 text-xs">{point.status}</span>
                        </div>
                      </div>
                    ))}
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
                {selectedProperty.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleVerifyProperty(selectedProperty.id, 'verified');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-green-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-600"
                    >
                      Approve Property
                    </button>
                    <button
                      onClick={() => {
                        handleVerifyProperty(selectedProperty.id, 'rejected');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-red-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-600"
                    >
                      Reject Property
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyVerification;
