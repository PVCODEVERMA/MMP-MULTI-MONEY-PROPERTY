// pages/broker/EnhancedPackagePurchase.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCardIcon,
  CheckCircleIcon,
  StarIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  ShieldCheckIcon,
  BoltIcon,
  TrophyIcon,
  WalletIcon,
  ArrowPathIcon,
  CalendarIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

const PackagePurchase = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  // Wallet & Account State
  const [walletBalance, setWalletBalance] = useState(15000);
  const [autoRenewal, setAutoRenewal] = useState(true);
  
  const [currentPackage, setCurrentPackage] = useState({
    name: "Standard",
    expiryDate: "2024-09-15",
    remainingLeads: 25,
    totalLeads: 50,
    autoRenewal: true,
    nextBilling: "2024-09-15",
    billingAmount: 7999
  });

  const [packageHistory, setPackageHistory] = useState([
    {
      id: 1,
      packageName: "Standard",
      purchaseDate: "2024-08-15",
      expiryDate: "2024-09-15",
      amount: 7999,
      paymentMethod: "Card",
      status: "Active"
    },
    {
      id: 2,
      packageName: "Basic",
      purchaseDate: "2024-07-15",
      expiryDate: "2024-08-15",
      amount: 2999,
      paymentMethod: "Wallet",
      status: "Expired"
    }
  ]);

  const packages = [
    {
      id: 1,
      name: "Basic",
      price: 2999,
      duration: "1 Month",
      popular: false,
      color: "border-gray-200",
      headerColor: "bg-gray-50",
      leadQuota: 25,
      dailyUpdates: 5,
      features: [
        "25 Verified Leads",
        "5 Daily Status Updates",
        "Basic Support",
        "Property Listing (5)",
        "Email Notifications",
        "Basic Analytics"
      ],
      description: "Perfect for new brokers getting started"
    },
    {
      id: 2,
      name: "Standard",
      price: 7999,
      duration: "1 Month",
      popular: true,
      color: "border-orange-500",
      headerColor: "bg-orange-50",
      leadQuota: 100,
      dailyUpdates: 10,
      features: [
        "100 Verified Leads",
        "10 Daily Status Updates",
        "Priority Support",
        "Property Listing (20)",
        "SMS + Email Notifications",
        "Advanced Analytics",
        "Lead Management Tools",
        "Mobile App Access"
      ],
      description: "Most popular choice for active brokers"
    },
    {
      id: 3,
      name: "Premium",
      price: 14999,
      duration: "1 Month",
      popular: false,
      color: "border-purple-500",
      headerColor: "bg-purple-50",
      leadQuota: 250,
      dailyUpdates: 25,
      features: [
        "250 Verified Leads",
        "25 Daily Status Updates",
        "24/7 Premium Support",
        "Unlimited Property Listings",
        "Multi-channel Notifications",
        "Advanced Analytics & Reports",
        "CRM Integration",
        "API Access",
        "Dedicated Account Manager",
        "Custom Branding"
      ],
      description: "For professional brokers and agencies"
    }
  ];

  const walletRechargeOptions = [
    { amount: 5000, bonus: 0, popular: false },
    { amount: 10000, bonus: 500, popular: false },
    { amount: 25000, bonus: 2000, popular: true },
    { amount: 50000, bonus: 5000, popular: false }
  ];

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowPaymentModal(true);
  };

  const handleWalletRecharge = (amount, bonus = 0) => {
    setWalletBalance(prev => prev + amount + bonus);
    alert(`Wallet recharged successfully! Added ₹${amount + bonus} (₹${bonus} bonus)`);
    setShowWalletModal(false);
  };

  const handlePayment = (paymentMethod) => {
    if (paymentMethod === 'wallet' && walletBalance < selectedPackage.price) {
      alert('Insufficient wallet balance! Please recharge your wallet.');
      return;
    }

    if (paymentMethod === 'wallet') {
      setWalletBalance(prev => prev - selectedPackage.price);
    }

    // Add to history
    const newPurchase = {
      id: packageHistory.length + 1,
      packageName: selectedPackage.name,
      purchaseDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      amount: selectedPackage.price,
      paymentMethod: paymentMethod === 'wallet' ? 'Wallet' : 'Card',
      status: 'Active'
    };

    setPackageHistory(prev => [newPurchase, ...prev]);
    
    // Update current package
    setCurrentPackage({
      name: selectedPackage.name,
      expiryDate: newPurchase.expiryDate,
      remainingLeads: selectedPackage.leadQuota,
      totalLeads: selectedPackage.leadQuota,
      autoRenewal: autoRenewal,
      nextBilling: autoRenewal ? newPurchase.expiryDate : null,
      billingAmount: selectedPackage.price
    });

    alert(`Payment successful! ${selectedPackage.name} package activated.`);
    setShowPaymentModal(false);
    setSelectedPackage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Package & Wallet Management</h1>
            <p className="text-gray-600">Manage your subscription plans and wallet balance</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowWalletModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <WalletIcon className="h-5 w-5 mr-2" />
              Recharge Wallet
            </button>
            <button
              onClick={() => setShowHistoryModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Purchase History
            </button>
          </div>
        </div>
      </div>

      {/* Current Package & Wallet Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Package */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Current Package: {currentPackage.name}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Expires: {currentPackage.expiryDate}</div>
                <div>Remaining Leads: {currentPackage.remainingLeads}/{currentPackage.totalLeads}</div>
                {currentPackage.autoRenewal && (
                  <div className="flex items-center text-green-600">
                    <ArrowPathIcon className="h-4 w-4 mr-1" />
                    Auto-renewal active
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((currentPackage.remainingLeads / currentPackage.totalLeads) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(currentPackage.remainingLeads / currentPackage.totalLeads) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Auto-renewal Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Auto-renewal</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoRenewal}
                onChange={(e) => setAutoRenewal(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wallet Balance</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">
                ₹{walletBalance.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Available for package purchases</p>
            </div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <WalletIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <button
            onClick={() => setShowWalletModal(true)}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Recharge Now
          </button>
        </div>
      </div>

      {/* Package Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 ${pkg.color} relative hover:shadow-xl transition-all`}
          >
            {pkg.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                  <StarIcon className="h-4 w-4 mr-1" />
                  Most Popular
                </div>
              </div>
            )}

            <div className={`${pkg.headerColor} p-6 text-center border-b`}>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ₹{pkg.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mb-2">{pkg.duration}</div>
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
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePackageSelect(pkg)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  pkg.popular
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                Select Package
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowPaymentModal(false)}>
              <div className="absolute inset-0 opacity-75"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Complete Payment</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {/* Package Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedPackage.name} Package</h4>
                    <p className="text-sm text-gray-600">{selectedPackage.duration}</p>
                    <p className="text-sm text-blue-600">{selectedPackage.leadQuota} leads • {selectedPackage.dailyUpdates} daily updates</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">₹{selectedPackage.price.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Choose Payment Method</h4>
                <div className="space-y-3">
                  {/* Wallet Payment */}
                  <button
                    onClick={() => handlePayment('wallet')}
                    disabled={walletBalance < selectedPackage.price}
                    className={`w-full flex items-center justify-between p-4 border-2 rounded-lg transition-colors ${
                      walletBalance >= selectedPackage.price
                        ? "border-green-500 bg-green-50 hover:bg-green-100"
                        : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center">
                      <WalletIcon className="h-6 w-6 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">Pay from Wallet</div>
                        <div className="text-sm text-gray-600">
                          Balance: ₹{walletBalance.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    {walletBalance < selectedPackage.price && (
                      <span className="text-red-500 text-sm">Insufficient Balance</span>
                    )}
                  </button>

                  {/* Card Payment */}
                  <button
                    onClick={() => handlePayment('card')}
                    className="w-full flex items-center p-4 border-2 border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <CreditCardIcon className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Pay with Card</div>
                      <div className="text-sm text-gray-600">Credit/Debit Card or UPI</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Auto-renewal Option */}
              <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Enable Auto-renewal</div>
                    <div className="text-sm text-gray-600">Automatically renew before expiry</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoRenewal}
                      onChange={(e) => setAutoRenewal(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Wallet Recharge Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity cursor-pointer" onClick={() => setShowWalletModal(false)}>
              <div className="absolute inset-0 opacity-75"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Recharge Wallet</h3>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600">Current Balance</div>
                  <div className="text-2xl font-bold text-green-600">₹{walletBalance.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-3">
                {walletRechargeOptions.map((option) => (
                  <button
                    key={option.amount}
                    onClick={() => handleWalletRecharge(option.amount, option.bonus)}
                    className={`w-full p-4 border-2 rounded-lg transition-colors text-left ${
                      option.popular 
                        ? "border-green-500 bg-green-50" 
                        : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                    }`}
                  >
                    <div className="flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="font-semibold text-gray-900">₹{option.amount.toLocaleString()}</div>
                        {option.bonus > 0 && (
                          <div className="text-sm text-green-600">+₹{option.bonus} bonus</div>
                        )}
                      </div>
                      {option.popular && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                          Popular
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Package History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center cursor-pointer">
            <div className="fixed inset-0 transition-opacity cursor-pointer" onClick={() => setShowHistoryModal(false)}>
              <div className="absolute inset-0 opacity-75"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block align-bottom bg-white rounded-lg px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Package Purchase History</h3>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Package
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Purchase Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expiry Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {packageHistory.map((purchase) => (
                      <tr key={purchase.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{purchase.packageName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{purchase.purchaseDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{purchase.expiryDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₹{purchase.amount.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{purchase.paymentMethod}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            purchase.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {purchase.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagePurchase;
