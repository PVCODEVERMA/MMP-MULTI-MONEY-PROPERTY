// pages/super-admin/PackageManagement.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCardIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  XMarkIcon,
  CurrencyRupeeIcon,
  UserIcon,
  ClockIcon,
  StarIcon,
  TrophyIcon,
  ChartBarIcon,
  DocumentArrowDownIcon,
  BoltIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [packageForm, setPackageForm] = useState({
    name: "",
    price: "",
    duration: "1",
    durationType: "month",
    leadQuota: "",
    dailyUpdates: "",
    features: [],
    description: "",
    popular: false,
    active: true,
    color: "orange"
  });

  const availableFeatures = [
    "Verified Leads",
    "Priority Support",
    "Property Listings",
    "Email Notifications",
    "SMS Notifications",
    "Advanced Analytics",
    "Lead Management Tools",
    "Mobile App Access",
    "CRM Integration",
    "API Access",
    "Dedicated Account Manager",
    "Custom Branding",
    "Multi-channel Notifications",
    "24/7 Support"
  ];

  const colorOptions = [
    { name: "Orange", value: "orange", class: "bg-orange-500" },
    { name: "Blue", value: "blue", class: "bg-blue-500" },
    { name: "Green", value: "green", class: "bg-green-500" },
    { name: "Purple", value: "purple", class: "bg-purple-500" },
    { name: "Red", value: "red", class: "bg-red-500" },
    { name: "Indigo", value: "indigo", class: "bg-indigo-500" }
  ];

  // Mock data
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPackages = [
        {
          id: 1,
          name: "Basic",
          price: 2999,
          duration: 1,
          durationType: "month",
          leadQuota: 25,
          dailyUpdates: 5,
          features: [
            "25 Verified Leads",
            "Basic Support",
            "Property Listing (5)",
            "Email Notifications",
            "Basic Analytics"
          ],
          description: "Perfect for new brokers getting started",
          popular: false,
          active: true,
          color: "gray",
          subscribers: 145,
          revenue: 434855,
          conversionRate: 12.5,
          createdDate: "2024-01-15"
        },
        {
          id: 2,
          name: "Standard",
          price: 7999,
          duration: 1,
          durationType: "month",
          leadQuota: 100,
          dailyUpdates: 10,
          features: [
            "100 Verified Leads",
            "Priority Support",
            "Property Listing (20)",
            "SMS + Email Notifications",
            "Advanced Analytics",
            "Lead Management Tools",
            "Mobile App Access"
          ],
          description: "Most popular choice for active brokers",
          popular: true,
          active: true,
          color: "orange",
          subscribers: 467,
          revenue: 3735533,
          conversionRate: 28.7,
          createdDate: "2024-01-15"
        },
        {
          id: 3,
          name: "Premium",
          price: 14999,
          duration: 1,
          durationType: "month",
          leadQuota: 250,
          dailyUpdates: 25,
          features: [
            "250 Verified Leads",
            "24/7 Premium Support",
            "Unlimited Property Listings",
            "Multi-channel Notifications",
            "Advanced Analytics & Reports",
            "CRM Integration",
            "API Access",
            "Dedicated Account Manager",
            "Custom Branding"
          ],
          description: "For professional brokers and agencies",
          popular: false,
          active: true,
          color: "purple",
          subscribers: 89,
          revenue: 1334911,
          conversionRate: 45.2,
          createdDate: "2024-01-15"
        }
      ];
      
      setPackages(mockPackages);
      setLoading(false);
    };

    fetchPackages();
  }, []);

  // CRUD Operations
  const handleAddPackage = () => {
    const newPackage = {
      id: packages.length + 1,
      ...packageForm,
      price: parseFloat(packageForm.price),
      leadQuota: parseInt(packageForm.leadQuota),
      dailyUpdates: parseInt(packageForm.dailyUpdates),
      subscribers: 0,
      revenue: 0,
      conversionRate: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    setPackages([...packages, newPackage]);
    setShowAddModal(false);
    resetForm();
    alert("Package created successfully!");
  };

  const handleEditPackage = () => {
    setPackages(packages.map(pkg => 
      pkg.id === selectedPackage.id 
        ? { 
            ...selectedPackage, 
            ...packageForm,
            price: parseFloat(packageForm.price),
            leadQuota: parseInt(packageForm.leadQuota),
            dailyUpdates: parseInt(packageForm.dailyUpdates)
          }
        : pkg
    ));
    setShowEditModal(false);
    resetForm();
    alert("Package updated successfully!");
  };

  const handleDeletePackage = () => {
    setPackages(packages.filter(pkg => pkg.id !== selectedPackage.id));
    setShowDeleteModal(false);
    setSelectedPackage(null);
    alert("Package deleted successfully!");
  };

  const togglePackageStatus = (packageId) => {
    setPackages(packages.map(pkg => 
      pkg.id === packageId ? { ...pkg, active: !pkg.active } : pkg
    ));
  };

  const togglePopular = (packageId) => {
    setPackages(packages.map(pkg => ({
      ...pkg,
      popular: pkg.id === packageId ? !pkg.popular : false
    })));
  };

  const resetForm = () => {
    setPackageForm({
      name: "",
      price: "",
      duration: "1",
      durationType: "month",
      leadQuota: "",
      dailyUpdates: "",
      features: [],
      description: "",
      popular: false,
      active: true,
      color: "orange"
    });
  };

  const handleFeatureToggle = (feature) => {
    setPackageForm(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const exportPackageData = () => {
    const csvContent = [
      ['Package Name', 'Price', 'Duration', 'Lead Quota', 'Subscribers', 'Revenue', 'Conversion Rate', 'Status'],
      ...packages.map(pkg => [
        pkg.name,
        `₹${pkg.price}`,
        `${pkg.duration} ${pkg.durationType}(s)`,
        pkg.leadQuota,
        pkg.subscribers,
        `₹${pkg.revenue.toLocaleString()}`,
        `${pkg.conversionRate}%`,
        pkg.active ? 'Active' : 'Inactive'
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `packages_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Package Management</h1>
            <p className="text-gray-600">Create and manage subscription packages for brokers</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={exportPackageData}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Package
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCardIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{packages.length}</div>
              <div className="text-sm text-gray-600">Total Packages</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {packages.reduce((sum, pkg) => sum + pkg.subscribers, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Subscribers</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CurrencyRupeeIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                ₹{packages.reduce((sum, pkg) => sum + pkg.revenue, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {packages.filter(p => p.active).length}
              </div>
              <div className="text-sm text-gray-600">Active Packages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 ${
              pkg.popular ? 'border-orange-500' : 'border-gray-200'
            } relative hover:shadow-xl transition-all ${
              !pkg.active ? 'opacity-60' : ''
            }`}
          >
            {pkg.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                  <StarIcon className="h-4 w-4 mr-1" />
                  Most Popular
                </div>
              </div>
            )}

            {!pkg.active && (
              <div className="absolute top-4 right-4">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  Inactive
                </span>
              </div>
            )}

            <div className={`bg-${pkg.color}-50 p-6 text-center border-b`}>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ₹{pkg.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                per {pkg.duration} {pkg.durationType}{pkg.duration > 1 ? 's' : ''}
              </div>
              <p className="text-sm text-gray-600 mt-2">{pkg.description}</p>
              
              {/* Package Highlights */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white bg-opacity-50 rounded p-2">
                  <div className="font-bold text-blue-600">{pkg.leadQuota}</div>
                  <div className="text-xs">Leads</div>
                </div>
                <div className="bg-white bg-opacity-50 rounded p-2">
                  <div className="font-bold text-green-600">{pkg.dailyUpdates}</div>
                  <div className="text-xs">Daily Updates</div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Package Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{pkg.subscribers}</div>
                  <div className="text-xs text-gray-600">Subscribers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">₹{Math.round(pkg.revenue/1000)}K</div>
                  <div className="text-xs text-gray-600">Revenue</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">{pkg.conversionRate}%</div>
                  <div className="text-xs text-gray-600">Conversion</div>
                </div>
              </div>

              {/* Features Preview */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-900 mb-2">Key Features:</div>
                <div className="space-y-1">
                  {pkg.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-600">
                      <CheckCircleIcon className="h-3 w-3 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                  {pkg.features.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{pkg.features.length - 3} more features
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setPackageForm(pkg);
                      setShowEditModal(true);
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 py-2 rounded text-sm font-medium transition-colors"
                  >
                    <PencilIcon className="h-4 w-4 inline mr-1" />
                    Edit
                  </button>
                  
                  <button
                    onClick={() => togglePackageStatus(pkg.id)}
                    className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      pkg.active
                        ? 'bg-red-100 hover:bg-red-200 text-red-800'
                        : 'bg-green-100 hover:bg-green-200 text-green-800'
                    }`}
                  >
                    {pkg.active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePopular(pkg.id)}
                    className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      pkg.popular
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-800'
                    }`}
                  >
                    <StarIcon className="h-4 w-4 inline mr-1" />
                    {pkg.popular ? 'Popular' : 'Mark Popular'}
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setShowSubscriptionsModal(true);
                    }}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded text-sm font-medium transition-colors"
                  >
                    <UserIcon className="h-4 w-4 inline mr-1" />
                    Subscribers
                  </button>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setShowDeleteModal(true);
                  }}
                  className="w-full bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded text-sm font-medium transition-colors"
                >
                  <TrashIcon className="h-4 w-4 inline mr-1" />
                  Delete Package
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Package Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowAddModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Create New Package</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Basic Information</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Package Name *</label>
                      <input
                        type="text"
                        value={packageForm.name}
                        onChange={(e) => setPackageForm({...packageForm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="e.g., Basic, Standard, Premium"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={packageForm.price}
                          onChange={(e) => setPackageForm({...packageForm, price: e.target.value})}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="2999"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                        <input
                          type="number"
                          value={packageForm.duration}
                          onChange={(e) => setPackageForm({...packageForm, duration: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Period *</label>
                        <select
                          value={packageForm.durationType}
                          onChange={(e) => setPackageForm({...packageForm, durationType: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="month">Month</option>
                          <option value="year">Year</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lead Quota *</label>
                        <input
                          type="number"
                          value={packageForm.leadQuota}
                          onChange={(e) => setPackageForm({...packageForm, leadQuota: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Daily Updates *</label>
                        <input
                          type="number"
                          value={packageForm.dailyUpdates}
                          onChange={(e) => setPackageForm({...packageForm, dailyUpdates: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="5"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={packageForm.description}
                        onChange={(e) => setPackageForm({...packageForm, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Brief description of the package..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Package Color</label>
                      <div className="flex space-x-2">
                        {colorOptions.map(color => (
                          <button
                            key={color.value}
                            onClick={() => setPackageForm({...packageForm, color: color.value})}
                            className={`w-8 h-8 rounded-full ${color.class} ${
                              packageForm.color === color.value 
                                ? 'ring-2 ring-gray-400 ring-offset-2' 
                                : ''
                            }`}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={packageForm.popular}
                          onChange={(e) => setPackageForm({...packageForm, popular: e.target.checked})}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Mark as Popular</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={packageForm.active}
                          onChange={(e) => setPackageForm({...packageForm, active: e.target.checked})}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Active Package</span>
                      </label>
                    </div>
                  </div>

                  {/* Features Selection */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Package Features</h4>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="space-y-2">
                        {availableFeatures.map(feature => (
                          <label key={feature} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={packageForm.features.includes(feature)}
                              onChange={() => handleFeatureToggle(feature)}
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPackage}
                    className="px-4 py-2 bg-orange-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-600"
                  >
                    Create Package
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Package Modal */}
      <AnimatePresence>
        {showEditModal && selectedPackage && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowEditModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Edit Package</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Similar form fields as Add Modal */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Basic Information</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Package Name *</label>
                      <input
                        type="text"
                        value={packageForm.name}
                        onChange={(e) => setPackageForm({...packageForm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={packageForm.price}
                          onChange={(e) => setPackageForm({...packageForm, price: e.target.value})}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lead Quota *</label>
                        <input
                          type="number"
                          value={packageForm.leadQuota}
                          onChange={(e) => setPackageForm({...packageForm, leadQuota: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Daily Updates *</label>
                        <input
                          type="number"
                          value={packageForm.dailyUpdates}
                          onChange={(e) => setPackageForm({...packageForm, dailyUpdates: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Package Features</h4>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="space-y-2">
                        {availableFeatures.map(feature => (
                          <label key={feature} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={packageForm.features.includes(feature)}
                              onChange={() => handleFeatureToggle(feature)}
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditPackage}
                    className="px-4 py-2 bg-orange-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-600"
                  >
                    Update Package
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedPackage && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" onClick={() => setShowDeleteModal(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TrashIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Package
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the <strong>{selectedPackage.name}</strong> package? 
                        This action cannot be undone and will affect {selectedPackage.subscribers} subscribers.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleDeletePackage}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
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

export default PackageManagement;
