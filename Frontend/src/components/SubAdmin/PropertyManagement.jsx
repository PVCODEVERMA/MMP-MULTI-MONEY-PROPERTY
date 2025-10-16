
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XMarkIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  UserIcon,
  StarIcon,
  PhotoIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  UserPlusIcon,
  ChartBarIcon,
  TagIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");
  
  // Modal states
  const [showPropertyDetailsModal, setShowPropertyDetailsModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bulkAction, setBulkAction] = useState("");

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProperties = [
        {
          id: 1,
          title: "Luxury Villa in Bandra West",
          description: "Beautiful 4BHK villa with sea view, modern amenities and parking space",
          location: "Bandra West, Mumbai, Maharashtra",
          propertyType: "Residential",
          category: "Villa",
          bhk: "4 BHK",
          price: 25000000,
          area: 3500,
          status: "pending",
          ownerName: "Rajesh Sharma",
          ownerPhone: "+91 98765 43210",
          ownerEmail: "rajesh.sharma@gmail.com",
          submittedDate: "2024-08-29",
          assignedBroker: null,
          brokerId: null,
          verification: "pending",
          images: [
            "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Villa+Front",
            "https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Living+Room",
            "https://via.placeholder.com/400x300/059669/FFFFFF?text=Bedroom"
          ],
          amenities: ["Swimming Pool", "Gym", "Garden", "Parking", "Security"],
          features: ["Sea View", "Furnished", "Premium Location"],
          leadCount: 15,
          viewCount: 245,
          inquiryCount: 8,
          priority: "high",
          lastActivity: "2024-08-29"
        },
        {
          id: 2,
          title: "Modern Office Space in BKC",
          description: "Prime commercial office space in Bandra Kurla Complex with modern facilities",
          location: "Bandra Kurla Complex, Mumbai, Maharashtra",
          propertyType: "Commercial",
          category: "Office",
          bhk: "Office Space",
          price: 12000000,
          area: 2500,
          status: "approved",
          ownerName: "Priya Patel",
          ownerPhone: "+91 87654 32109",
          ownerEmail: "priya.patel@gmail.com",
          submittedDate: "2024-08-27",
          assignedBroker: "Sneha Patel",
          brokerId: 2,
          assignedDate: "2024-08-28",
          verification: "verified",
          images: [
            "https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Office+Space",
            "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Conference+Room"
          ],
          amenities: ["Air Conditioning", "Elevator", "Parking", "Security", "Reception"],
          features: ["Prime Location", "Ready to Move", "High Speed Internet"],
          leadCount: 12,
          viewCount: 189,
          inquiryCount: 6,
          priority: "medium",
          lastActivity: "2024-08-28"
        },
        {
          id: 3,
          title: "Cozy 2BHK Apartment in Koramangala",
          description: "Well-maintained apartment in premium locality with all modern amenities",
          location: "Koramangala, Bangalore, Karnataka",
          propertyType: "Residential",
          category: "Apartment",
          bhk: "2 BHK",
          price: 8500000,
          area: 1200,
          status: "rejected",
          ownerName: "Amit Kumar",
          ownerPhone: "+91 76543 21098",
          ownerEmail: "amit.kumar@gmail.com",
          submittedDate: "2024-08-25",
          assignedBroker: null,
          brokerId: null,
          verification: "rejected",
          rejectionReason: "Incomplete documentation and pricing issues",
          images: [
            "https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Apartment"
          ],
          amenities: ["Gym", "Playground", "Parking", "Security"],
          features: ["Balcony", "Modular Kitchen"],
          leadCount: 3,
          viewCount: 67,
          inquiryCount: 2,
          priority: "low",
          lastActivity: "2024-08-26"
        },
        {
          id: 4,
          title: "Spacious Warehouse in Industrial Area",
          description: "Large warehouse facility perfect for logistics and storage operations",
          location: "MIDC Aurangabad, Maharashtra",
          propertyType: "Industrial",
          category: "Warehouse",
          bhk: "Warehouse",
          price: 15000000,
          area: 5000,
          status: "approved",
          ownerName: "Neha Singh",
          ownerPhone: "+91 65432 10987",
          ownerEmail: "neha.singh@gmail.com",
          submittedDate: "2024-08-24",
          assignedBroker: "Rajesh Kumar",
          brokerId: 1,
          assignedDate: "2024-08-25",
          verification: "verified",
          images: [
            "https://via.placeholder.com/400x300/10B981/FFFFFF?text=Warehouse",
            "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Storage+Area"
          ],
          amenities: ["Loading Dock", "Office Space", "Parking", "Security", "Power Backup"],
          features: ["High Ceiling", "Easy Access", "Industrial Zone"],
          leadCount: 8,
          viewCount: 156,
          inquiryCount: 4,
          priority: "medium",
          lastActivity: "2024-08-25"
        }
      ];

      const mockBrokers = [
        {
          id: 1,
          name: "Rajesh Kumar",
          email: "rajesh.kumar@gmail.com",
          phone: "+91 98765 43210",
          location: "Mumbai, Maharashtra",
          specialization: "Luxury Properties",
          activeProperties: 15,
          maxCapacity: 25,
          successRate: 85,
          totalDeals: 156,
          rating: 4.8,
          status: "active"
        },
        {
          id: 2,
          name: "Sneha Patel",
          email: "sneha.patel@gmail.com",
          phone: "+91 87654 32109",
          location: "Mumbai, Maharashtra",
          specialization: "Commercial Properties",
          activeProperties: 12,
          maxCapacity: 20,
          successRate: 78,
          totalDeals: 89,
          rating: 4.6,
          status: "active"
        },
        {
          id: 3,
          name: "Amit Singh",
          email: "amit.singh@gmail.com",
          phone: "+91 76543 21098",
          location: "Bangalore, Karnataka",
          specialization: "Residential",
          activeProperties: 18,
          maxCapacity: 25,
          successRate: 72,
          totalDeals: 67,
          rating: 4.3,
          status: "active"
        }
      ];
      
      setProperties(mockProperties);
      setBrokers(mockBrokers);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesType = typeFilter === "all" || property.propertyType === typeFilter;
    const matchesLocation = locationFilter === "all" || property.location.includes(locationFilter);
    const matchesPrice = priceRangeFilter === "all" || 
                        (priceRangeFilter === "below-50l" && property.price < 5000000) ||
                        (priceRangeFilter === "50l-1cr" && property.price >= 5000000 && property.price < 10000000) ||
                        (priceRangeFilter === "1cr-2cr" && property.price >= 10000000 && property.price < 20000000) ||
                        (priceRangeFilter === "above-2cr" && property.price >= 20000000);
    
    return matchesSearch && matchesStatus && matchesType && matchesLocation && matchesPrice;
  });

  // Get unique locations and types
  const locations = [...new Set(properties.map(property => property.location.split(',')[1]?.trim()).filter(Boolean))];
  const propertyTypes = [...new Set(properties.map(property => property.propertyType))];

  // Property operations
  const handleApproveProperty = (propertyId, approvalNotes = "") => {
    setProperties(properties.map(property => 
      property.id === propertyId 
        ? { 
            ...property, 
            status: "approved",
            verification: "verified",
            approvalDate: new Date().toISOString().split('T')[0],
            approvalNotes,
            lastActivity: new Date().toISOString().split('T')[0]
          }
        : property
    ));
    alert("Property approved successfully!");
  };

  const handleRejectProperty = (propertyId, rejectionReason = "") => {
    setProperties(properties.map(property => 
      property.id === propertyId 
        ? { 
            ...property, 
            status: "rejected",
            verification: "rejected",
            rejectionReason,
            rejectionDate: new Date().toISOString().split('T')[0],
            lastActivity: new Date().toISOString().split('T')[0]
          }
        : property
    ));
    alert("Property rejected successfully!");
  };

  const handleAssignProperty = (propertyId, brokerId, assignmentNotes = "") => {
    const broker = brokers.find(b => b.id === parseInt(brokerId));
    if (!broker) return;

    setProperties(properties.map(property => 
      property.id === propertyId 
        ? { 
            ...property, 
            assignedBroker: broker.name,
            brokerId: broker.id,
            assignedDate: new Date().toISOString().split('T')[0],
            assignmentNotes,
            lastActivity: new Date().toISOString().split('T')[0]
          }
        : property
    ));

    alert(`Property assigned to ${broker.name} successfully!`);
  };

  const handleStatusUpdate = (propertyId, newStatus) => {
    setProperties(properties.map(property => 
      property.id === propertyId 
        ? { 
            ...property, 
            status: newStatus,
            lastActivity: new Date().toISOString().split('T')[0]
          }
        : property
    ));
  };

  const handleBulkAction = () => {
    let updatedProperties = [...properties];
    
    selectedProperties.forEach(propertyId => {
      const propertyIndex = updatedProperties.findIndex(property => property.id === propertyId);
      if (propertyIndex !== -1) {
        switch (bulkAction) {
          case "approve":
            updatedProperties[propertyIndex] = { 
              ...updatedProperties[propertyIndex], 
              status: "approved",
              verification: "verified",
              approvalDate: new Date().toISOString().split('T')[0]
            };
            break;
          case "reject":
            updatedProperties[propertyIndex] = { 
              ...updatedProperties[propertyIndex], 
              status: "rejected",
              verification: "rejected",
              rejectionDate: new Date().toISOString().split('T')[0]
            };
            break;
          case "priority-high":
            updatedProperties[propertyIndex] = { ...updatedProperties[propertyIndex], priority: "high" };
            break;
          case "priority-medium":
            updatedProperties[propertyIndex] = { ...updatedProperties[propertyIndex], priority: "medium" };
            break;
          case "priority-low":
            updatedProperties[propertyIndex] = { ...updatedProperties[propertyIndex], priority: "low" };
            break;
        }
      }
    });

    setProperties(updatedProperties);
    setSelectedProperties([]);
    setShowBulkActionModal(false);
    setBulkAction("");
    alert(`Bulk action completed for ${selectedProperties.length} properties!`);
  };

  // Export functionality
  const exportProperties = () => {
    const exportData = filteredProperties.map(property => ({
      'Title': property.title,
      'Type': property.propertyType,
      'Category': property.category,
      'Location': property.location,
      'Price': `₹${property.price.toLocaleString()}`,
      'Area': `${property.area} sq ft`,
      'Status': property.status,
      'Owner': property.ownerName,
      'Owner Phone': property.ownerPhone,
      'Assigned Broker': property.assignedBroker || 'Unassigned',
      'Verification': property.verification,
      'Submitted Date': property.submittedDate,
      'Lead Count': property.leadCount,
      'View Count': property.viewCount
    }));

    const csvContent = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `properties_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Badge components
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      approved: { color: "bg-green-100 text-green-800", label: "Approved" },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
      active: { color: "bg-blue-100 text-blue-800", label: "Active" },
      sold: { color: "bg-gray-100 text-gray-800", label: "Sold" }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: "bg-red-100 text-red-800", label: "High" },
      medium: { color: "bg-yellow-100 text-yellow-800", label: "Medium" },
      low: { color: "bg-gray-100 text-gray-800", label: "Low" }
    };
    
    const config = priorityConfig[priority] || priorityConfig.medium;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Management</h1>
            <p className="text-gray-600">Review, approve and manage property listings</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={exportProperties}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowBulkActionModal(true)}
              disabled={selectedProperties.length === 0}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors disabled:opacity-50"
            >
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Bulk Action ({selectedProperties.length})
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <HomeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{properties.length}</div>
              <div className="text-sm text-gray-600">Total Properties</div>
            </div>
          </div>
        </div>
        
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
                {properties.filter(p => p.status === 'approved').length}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XMarkIcon className="h-6 w-6 text-red-600" />
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
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {properties.filter(p => p.assignedBroker).length}
              </div>
              <div className="text-sm text-gray-600">Assigned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="active">Active</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={priceRangeFilter}
              onChange={(e) => setPriceRangeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="below-50l">Below ₹50L</option>
              <option value="50l-1cr">₹50L - ₹1Cr</option>
              <option value="1cr-2cr">₹1Cr - ₹2Cr</option>
              <option value="above-2cr">Above ₹2Cr</option>
            </select>
          </div>
        </div>

        {/* Bulk Selection Actions */}
        {selectedProperties.length > 0 && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-orange-800">
                {selectedProperties.length} propert{selectedProperties.length !== 1 ? 'ies' : 'y'} selected
              </span>
              <div className="flex items-center space-x-2">
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="px-3 py-1 border border-orange-300 rounded text-sm"
                >
                  <option value="">Select Action</option>
                  <option value="approve">Approve Properties</option>
                  <option value="reject">Reject Properties</option>
                  <option value="priority-high">Set High Priority</option>
                  <option value="priority-medium">Set Medium Priority</option>
                  <option value="priority-low">Set Low Priority</option>
                </select>
                <button
                  onClick={() => setShowBulkActionModal(true)}
                  disabled={!bulkAction}
                  className="px-4 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 disabled:opacity-50"
                >
                  Apply
                </button>
                <button
                  onClick={() => setSelectedProperties([])}
                  className="px-4 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProperties(filteredProperties.map(property => property.id));
                      } else {
                        setSelectedProperties([]);
                      }
                    }}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Broker
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
              {filteredProperties.map((property) => (
                <motion.tr
                  key={property.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProperties([...selectedProperties, property.id]);
                        } else {
                          setSelectedProperties(selectedProperties.filter(id => id !== property.id));
                        }
                      }}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-start">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                        {property.images && property.images.length > 0 ? (
                          <img 
                            src={property.images[0]} 
                            alt={property.title}
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                            onClick={() => {
                              setSelectedProperty(property);
                              setShowImageModal(true);
                            }}
                          />
                        ) : (
                          <PhotoIcon className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {property.location}
                        </div>
                        <div className="text-sm text-green-600 flex items-center">
                          <CurrencyRupeeIcon className="h-3 w-3 mr-1" />
                          {(property.price / 10000000).toFixed(2)}Cr
                        </div>
                        <div className="text-xs text-gray-500">
                          {property.propertyType} • {property.bhk} • {property.area} sq ft
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{property.ownerName}</div>
                      <div className="text-sm text-gray-500">{property.ownerPhone}</div>
                      <div className="text-sm text-gray-500">{property.ownerEmail}</div>
                      <div className="text-xs text-gray-500">
                        Submitted: {property.submittedDate}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <select
                        value={property.status}
                        onChange={(e) => handleStatusUpdate(property.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="active">Active</option>
                        <option value="sold">Sold</option>
                      </select>
                      {getPriorityBadge(property.priority)}
                      {property.verification === "verified" && (
                        <div className="flex items-center text-green-600 text-xs">
                          <ShieldCheckIcon className="h-3 w-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {property.assignedBroker ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">{property.assignedBroker}</div>
                        <div className="text-sm text-gray-500">Assigned: {property.assignedDate}</div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowAssignModal(true);
                        }}
                        className="text-orange-600 hover:text-orange-900 text-sm font-medium"
                      >
                        Assign Broker
                      </button>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-center">
                      <div className="text-sm text-gray-900">{property.leadCount} leads</div>
                      <div className="text-sm text-gray-500">{property.viewCount} views</div>
                      <div className="text-sm text-blue-600">{property.inquiryCount} inquiries</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowPropertyDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowApprovalModal(true);
                        }}
                        className="text-green-600 hover:text-green-900"
                        title="Approve/Reject"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowAssignModal(true);
                        }}
                        className="text-orange-600 hover:text-orange-900"
                        title="Assign Broker"
                      >
                        <UserPlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <HomeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>

      {/* Property Details Modal */}
      <AnimatePresence>
        {showPropertyDetailsModal && selectedProperty && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowPropertyDetailsModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Property Details</h3>
                  <button
                    onClick={() => setShowPropertyDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Property Information */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Property Information</h4>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                        <div><strong>Title:</strong> {selectedProperty.title}</div>
                        <div><strong>Type:</strong> {selectedProperty.propertyType}</div>
                        <div><strong>Category:</strong> {selectedProperty.category}</div>
                        <div><strong>BHK:</strong> {selectedProperty.bhk}</div>
                        <div><strong>Area:</strong> {selectedProperty.area} sq ft</div>
                        <div><strong>Price:</strong> ₹{selectedProperty.price.toLocaleString()}</div>
                        <div><strong>Location:</strong> {selectedProperty.location}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <div className="bg-gray-50 p-4 rounded-lg text-sm">
                        {selectedProperty.description}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.amenities?.map((amenity, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.features?.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Owner & Performance Information */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Owner Information</h4>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                        <div><strong>Name:</strong> {selectedProperty.ownerName}</div>
                        <div><strong>Phone:</strong> {selectedProperty.ownerPhone}</div>
                        <div><strong>Email:</strong> {selectedProperty.ownerEmail}</div>
                        <div><strong>Submitted:</strong> {selectedProperty.submittedDate}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                        <div><strong>Leads Generated:</strong> {selectedProperty.leadCount}</div>
                        <div><strong>Total Views:</strong> {selectedProperty.viewCount}</div>
                        <div><strong>Inquiries:</strong> {selectedProperty.inquiryCount}</div>
                        <div><strong>Last Activity:</strong> {selectedProperty.lastActivity}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Status Information</h4>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                        <div className="flex items-center">
                          <strong className="mr-2">Status:</strong>
                          {getStatusBadge(selectedProperty.status)}
                        </div>
                        <div className="flex items-center">
                          <strong className="mr-2">Priority:</strong>
                          {getPriorityBadge(selectedProperty.priority)}
                        </div>
                        <div><strong>Verification:</strong> {selectedProperty.verification}</div>
                        {selectedProperty.assignedBroker && (
                          <div><strong>Assigned Broker:</strong> {selectedProperty.assignedBroker}</div>
                        )}
                      </div>
                    </div>

                    {/* Property Images */}
                    {selectedProperty.images && selectedProperty.images.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Property Images</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedProperty.images.slice(0, 4).map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Property ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg cursor-pointer"
                              onClick={() => setShowImageModal(true)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowPropertyDetailsModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowPropertyDetailsModal(false);
                      setShowApprovalModal(true);
                    }}
                    className="px-4 py-2 bg-orange-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-600"
                  >
                    Review Property
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Approval Modal */}
      <AnimatePresence>
        {showApprovalModal && selectedProperty && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowApprovalModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Review Property</h3>
                  <button
                    onClick={() => setShowApprovalModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Property Summary</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Title:</strong> {selectedProperty.title}</div>
                      <div><strong>Owner:</strong> {selectedProperty.ownerName}</div>
                      <div><strong>Location:</strong> {selectedProperty.location}</div>
                      <div><strong>Price:</strong> ₹{selectedProperty.price.toLocaleString()}</div>
                      <div><strong>Type:</strong> {selectedProperty.propertyType}</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Notes
                    </label>
                    <textarea
                      id="reviewNotes"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Add your review comments..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowApprovalModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const notes = document.getElementById('reviewNotes').value;
                      handleRejectProperty(selectedProperty.id, notes);
                      setShowApprovalModal(false);
                    }}
                    className="px-4 py-2 bg-red-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      const notes = document.getElementById('reviewNotes').value;
                      handleApproveProperty(selectedProperty.id, notes);
                      setShowApprovalModal(false);
                    }}
                    className="px-4 py-2 bg-green-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-600"
                  >
                    Approve
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Assign Property Modal */}
      <AnimatePresence>
        {showAssignModal && selectedProperty && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowAssignModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedProperty.assignedBroker ? 'Reassign' : 'Assign'} Property
                  </h3>
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">
                        <div><strong>Property:</strong> {selectedProperty.title}</div>
                        <div><strong>Location:</strong> {selectedProperty.location}</div>
                        <div><strong>Type:</strong> {selectedProperty.propertyType}</div>
                        <div><strong>Price:</strong> ₹{selectedProperty.price.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Broker
                    </label>
                    <select
                      id="brokerSelect"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      defaultValue={selectedProperty.brokerId || ""}
                    >
                      <option value="">Select a broker</option>
                      {brokers.map(broker => (
                        <option key={broker.id} value={broker.id}>
                          {broker.name} - {broker.location} ({broker.activeProperties}/{broker.maxCapacity})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignment Notes
                    </label>
                    <textarea
                      id="assignmentNotes"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Add any notes for the broker..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const brokerId = document.getElementById('brokerSelect').value;
                      const notes = document.getElementById('assignmentNotes').value;
                      
                      if (brokerId) {
                        handleAssignProperty(selectedProperty.id, brokerId, notes);
                        setShowAssignModal(false);
                      } else {
                        alert('Please select a broker');
                      }
                    }}
                    className="px-4 py-2 bg-orange-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-600"
                  >
                    Assign Property
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Bulk Action Confirmation Modal */}
      <AnimatePresence>
        {showBulkActionModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowBulkActionModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Confirm Bulk Action
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to apply <strong>{bulkAction}</strong> to {selectedProperties.length} selected properties?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleBulkAction}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowBulkActionModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyManagement;
