
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckIcon,
  StarIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  HomeIcon,
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  GiftIcon
} from '@heroicons/react/24/outline';

const BrokerPackages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [showPayment, setShowPayment] = useState(false);
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    // Get lead data from navigation state
    if (location.state?.leadData) {
      setLeadData(location.state.leadData);
    }
  }, [location.state]);

  // Package Plans
  const packages = [
    {
      id: 'basic',
      name: 'Basic Connect',
      price: 999,
      originalPrice: 1499,
      duration: '30 days',
      color: 'blue',
      popular: false,
      savings: 500,
      features: [
        'Contact 10 property owners directly',
        'View 50 verified phone numbers',
        'Basic property alerts',
        'Email support',
        'Mobile app access'
      ],
      leads: 10,
      contacts: 50,
      support: 'Email'
    },
    {
      id: 'premium',
      name: 'Premium Access',
      price: 2999,
      originalPrice: 4499,
      duration: '90 days',
      color: 'orange',
      popular: true,
      savings: 1500,
      features: [
        'Contact 50 property owners directly',
        'View 200 verified phone numbers',
        'Priority property alerts',
        'Dedicated relationship manager',
        'WhatsApp support',
        'Property visit assistance',
        'Legal document help',
        'Market price analysis'
      ],
      leads: 50,
      contacts: 200,
      support: 'Phone + WhatsApp'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Pro',
      price: 7999,
      originalPrice: 12999,
      duration: '180 days',
      color: 'green',
      popular: false,
      savings: 5000,
      features: [
        'Unlimited property owner contacts',
        'Unlimited verified phone numbers',
        'Instant property alerts',
        'Personal property consultant',
        '24/7 phone support',
        'Free property visits (up to 10)',
        'Complete legal assistance',
        'Loan assistance',
        'Interior design consultation',
        'Free home inspection'
      ],
      leads: 'Unlimited',
      contacts: 'Unlimited',
      support: '24/7 Dedicated'
    }
  ];

  // Handle package selection
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowPayment(true);
  };

  // Handle payment
  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      navigate('/payment-success', {
        state: {
          package: selectedPackage,
          leadData,
          paymentMethod
        }
      });
    }, 2000);
  };

  // Get personalized recommendations based on lead score
  const getRecommendedPackage = () => {
    if (!leadData) return 'premium';
    
    if (leadData.leadScore > 80) return 'enterprise';
    if (leadData.leadScore > 40) return 'premium';
    return 'basic';
  };

  const recommendedPackageId = getRecommendedPackage();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your <span className="text-orange-500">Broker Package</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Get direct access to property owners and verified listings
          </p>
          
          {/* Personalized Message */}
          {leadData && (
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-blue-800">
                <strong>Based on your activity:</strong> {leadData.searchCount} searches, {leadData.propertiesViewed.length} properties viewed
                <br />
                <strong>Recommended:</strong> {packages.find(p => p.id === recommendedPackageId)?.name}
              </p>
            </div>
          )}
        </motion.div>

        {/* Limited Time Offer Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-4 text-white text-center mb-8"
        >
          <div className="flex items-center justify-center mb-2">
            <GiftIcon className="w-6 h-6 mr-2" />
            <span className="font-bold text-lg">LIMITED TIME OFFER!</span>
          </div>
          <p>Save up to ₹5000 on all packages • Offer ends in 24 hours</p>
        </motion.div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden relative transform transition-all hover:scale-105 ${
                pkg.id === recommendedPackageId ? 'ring-4 ring-orange-300' : ''
              }`}
            >
              {/* Recommended Badge */}
              {pkg.id === recommendedPackageId && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-lg font-bold text-sm">
                  RECOMMENDED
                </div>
              )}

              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-1 rounded-br-lg font-bold text-sm">
                  MOST POPULAR
                </div>
              )}

              <div className="p-6">
                {/* Package Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500 line-through">₹{pkg.originalPrice}</span>
                    <div className="text-4xl font-bold text-gray-800">₹{pkg.price}</div>
                    <span className="text-gray-600">for {pkg.duration}</span>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ₹{pkg.savings}
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className={`text-2xl font-bold text-${pkg.color}-600`}>{pkg.leads}</div>
                    <div className="text-sm text-gray-600">Direct Contacts</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold text-${pkg.color}-600`}>{pkg.contacts}</div>
                    <div className="text-sm text-gray-600">Phone Numbers</div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckIcon className={`w-5 h-5 text-${pkg.color}-500 mr-3 mt-0.5 flex-shrink-0`} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handlePackageSelect(pkg)}
                  className={`w-full bg-${pkg.color}-600 hover:bg-${pkg.color}-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors transform hover:scale-105`}
                >
                  Choose {pkg.name}
                </button>

                {/* Support Info */}
                <div className="text-center mt-4 text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 inline mr-1" />
                  Support: {pkg.support}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Compare All Features</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Features</th>
                    <th className="text-center py-3 px-4 font-semibold text-blue-600">Basic</th>
                    <th className="text-center py-3 px-4 font-semibold text-orange-600">Premium</th>
                    <th className="text-center py-3 px-4 font-semibold text-green-600">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Direct Owner Contacts</td>
                    <td className="text-center py-3 px-4">10</td>
                    <td className="text-center py-3 px-4">50</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Phone Number Access</td>
                    <td className="text-center py-3 px-4">50</td>
                    <td className="text-center py-3 px-4">200</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Property Visit Assistance</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅ Free (10)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Legal Document Help</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅ Complete</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Loan Assistance</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">24/7 Support</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Success Stories</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <HomeIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Rahul Sharma</div>
                  <div className="text-sm text-gray-600">Bought 2 BHK in Pune</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                "Found my dream home in just 15 days with Premium package. Direct owner contact saved me ₹2 lakhs in brokerage!"
              </p>
              <div className="flex items-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <UserGroupIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Priya Patel</div>
                  <div className="text-sm text-gray-600">Rented 3 BHK in Mumbai</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                "Enterprise package gave me unlimited access. The relationship manager helped me negotiate rent from ₹45K to ₹38K!"
              </p>
              <div className="flex items-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <ShieldCheckIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Amit Kumar</div>
                  <div className="text-sm text-gray-600">Bought villa in Bangalore</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                "Basic package was perfect for first-time buyer like me. Got verified properties and saved time with direct contacts."
              </p>
              <div className="flex items-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showPayment && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Purchase</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="font-semibold text-lg">{selectedPackage.name}</div>
              <div className="text-2xl font-bold text-gray-800">₹{selectedPackage.price}</div>
              <div className="text-sm text-gray-600">for {selectedPackage.duration}</div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <CreditCardIcon className="w-5 h-5 mr-2" />
                  Online Payment (UPI/Card)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="phone"
                    checked={paymentMethod === 'phone'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  Pay by Phone
                </label>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Pay Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BrokerPackages;
