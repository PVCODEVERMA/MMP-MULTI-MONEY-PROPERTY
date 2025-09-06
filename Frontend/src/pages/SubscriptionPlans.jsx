import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckIcon,
  XMarkIcon,
  CreditCardIcon,
  PhoneIcon,
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  EyeIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const SubscriptionPlans = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [error, setError] = useState('');

  const searchInfo = location.state || {};

  // Subscription Plans with Brand Colors
  const plans = [
    {
      id: 'basic',
      name: 'Basic Broker',
      monthlyPrice: 999,
      yearlyPrice: 9999,
      originalMonthlyPrice: 1999,
      originalYearlyPrice: 19999,
      leads: '25 Property Leads',
      contacts: '50 Owner Contacts',
      popular: false,
      features: [
        '25 verified property leads per month',
        '50 direct owner phone numbers',
        'Basic property alerts',
        'Email support',
        'Mobile app access',
        'Lead tracking dashboard'
      ],
      limitations: [
        'No premium listings access',
        'No dedicated manager'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Broker',
      monthlyPrice: 2999,
      yearlyPrice: 29999,
      originalMonthlyPrice: 4999,
      originalYearlyPrice: 49999,
      leads: '100 Property Leads',
      contacts: 'Unlimited Contacts',
      popular: true,
      features: [
        '100 verified property leads per month',
        'Unlimited direct owner phone numbers',
        'Priority property alerts',
        'WhatsApp support',
        'Dedicated relationship manager',
        'Premium listings access',
        'Advanced lead analytics',
        'Market insights reports',
        'Lead scoring system'
      ],
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise Broker',
      monthlyPrice: 7999,
      yearlyPrice: 79999,
      originalMonthlyPrice: 12999,
      originalYearlyPrice: 129999,
      leads: 'Unlimited Leads',
      contacts: 'Unlimited Contacts',
      popular: false,
      features: [
        'Unlimited verified property leads',
        'Unlimited direct owner contacts',
        'Instant property alerts',
        '24/7 phone support',
        'Personal property consultant',
        'Exclusive premium listings',
        'Custom market reports',
        'Lead automation tools',
        'Multi-city access',
        'Team collaboration tools',
        'API access for integration'
      ],
      limitations: []
    }
  ];

  // Error boundary effect
  useEffect(() => {
    try {
      // Validate plans data
      if (!plans || plans.length === 0) {
        setError('Unable to load subscription plans. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please refresh the page.');
    }
  }, []);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setError(''); // Clear any previous errors
  };

  const handleSubscribe = (plan) => {
    if (!plan) {
      setError('Please select a valid plan');
      return;
    }
    setShowPayment(true);
    setError('');
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedPlanData = plans.find(p => p.id === selectedPlan);
      
      if (!selectedPlanData) {
        throw new Error('Invalid plan selected');
      }

      // Navigate to success page
      navigate('/payment-success', {
        state: {
          plan: selectedPlanData,
          billingCycle,
          searchInfo,
          paymentMethod,
          amount: getPrice(selectedPlanData)
        }
      });
    } catch (err) {
      setError('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  const getPrice = (plan) => {
    if (!plan) return 0;
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getOriginalPrice = (plan) => {
    if (!plan) return 0;
    return billingCycle === 'monthly' ? plan.originalMonthlyPrice : plan.originalYearlyPrice;
  };

  const getSavings = (plan) => {
    if (!plan) return 0;
    return getOriginalPrice(plan) - getPrice(plan);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Error state
  if (error && !showPayment) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F7F7' }}>
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <ExclamationTriangleIcon className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#164058' }}>
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: '#FF9C00' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#F7F7F7' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100"
          style={{ color: '#164058', backgroundColor: 'white' }}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Search
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#164058' }}>
            Unlock <span style={{ color: '#FF9C00' }}>Premium Property Leads</span>
          </h1>
          <p className="text-lg md:text-xl mb-4" style={{ color: '#164058' }}>
            Get verified property leads and direct owner contacts
          </p>
          
          {/* Search Context */}
          {searchInfo?.fromSearch && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-lg mb-6" 
              style={{ backgroundColor: '#FF9C00', color: 'white' }}
            >
              <p className="text-lg font-semibold">
                🔒 To access search results for "{searchInfo.searchQuery}" you need a subscription
              </p>
              <p>Choose a plan below to unlock verified leads and owner contacts</p>
            </motion.div>
          )}
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center p-1 rounded-lg shadow-md" style={{ backgroundColor: 'white' }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'monthly' 
                  ? 'text-white shadow-md' 
                  : 'hover:bg-gray-100'
              }`}
              style={{ 
                backgroundColor: billingCycle === 'monthly' ? '#FF9C00' : 'transparent',
                color: billingCycle === 'monthly' ? 'white' : '#164058'
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-all relative ${
                billingCycle === 'yearly' 
                  ? 'text-white shadow-md' 
                  : 'hover:bg-gray-100'
              }`}
              style={{ 
                backgroundColor: billingCycle === 'yearly' ? '#FF9C00' : 'transparent',
                color: billingCycle === 'yearly' ? 'white' : '#164058'
              }}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Save 40%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden relative transform transition-all hover:scale-105 cursor-pointer ${
                selectedPlan === plan.id ? 'ring-4' : ''
              } ${plan.popular ? 'ring-4' : ''}`}
              style={{ 
                ringColor: plan.popular || selectedPlan === plan.id ? '#FF9C00' : 'transparent'
              }}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full font-bold text-white text-sm z-10" style={{ backgroundColor: '#FF9C00' }}>
                  ⭐ MOST POPULAR
                </div>
              )}

              <div className="p-6 lg:p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl lg:text-2xl font-bold mb-4" style={{ color: '#164058' }}>
                    {plan.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-sm text-gray-500 line-through">
                        ₹{formatPrice(getOriginalPrice(plan))}
                      </span>
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold" style={{ color: '#164058' }}>
                      ₹{formatPrice(getPrice(plan))}
                    </div>
                    <p className="text-sm text-gray-600">
                      per {billingCycle === 'monthly' ? 'month' : 'year'}
                    </p>
                    <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white mt-2" style={{ backgroundColor: '#FF9C00' }}>
                      Save ₹{formatPrice(getSavings(plan))}
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
                    <div className="text-center">
                      <div className="text-xl lg:text-2xl font-bold" style={{ color: '#FF9C00' }}>
                        {plan.leads.split(' ')[0]}
                      </div>
                      <div className="text-xs lg:text-sm" style={{ color: '#164058' }}>
                        Property Leads
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl lg:text-2xl font-bold" style={{ color: '#FF9C00' }}>
                        {plan.contacts.split(' ')[0]}
                      </div>
                      <div className="text-xs lg:text-sm" style={{ color: '#164058' }}>
                        Owner Contacts
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#FF9C00' }} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <li key={`limitation-${idx}`} className="flex items-start">
                      <XMarkIcon className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500 text-sm line-through">{limitation}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscribe(plan);
                  }}
                  className="w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 text-white focus:outline-none focus:ring-4 focus:ring-opacity-50"
                  style={{ 
                    backgroundColor: plan.popular ? '#FF9C00' : '#164058',
                    focusRingColor: plan.popular ? '#FF9C00' : '#164058'
                  }}
                >
                  Choose {plan.name}
                </button>

                {/* Support Info */}
                <div className="text-center mt-4 text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 inline mr-1" />
                  24/7 Support Available
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-6" style={{ color: '#164058' }}>
            Compare All Features
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr style={{ backgroundColor: '#F7F7F7' }}>
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: '#164058' }}>
                    Features
                  </th>
                  <th className="text-center py-4 px-4 font-semibold" style={{ color: '#164058' }}>
                    Basic
                  </th>
                  <th className="text-center py-4 px-4 font-semibold" style={{ color: '#FF9C00' }}>
                    Premium ⭐
                  </th>
                  <th className="text-center py-4 px-4 font-semibold" style={{ color: '#164058' }}>
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ['Monthly Property Leads', '25', '100', 'Unlimited'],
                  ['Owner Phone Numbers', '50', 'Unlimited', 'Unlimited'],
                  ['Dedicated Manager', '❌', '✅', '✅'],
                  ['Market Reports', '❌', '✅', '✅ Custom'],
                  ['API Access', '❌', '❌', '✅'],
                  ['Multi-city Access', '❌', '❌', '✅'],
                  ['Team Tools', '❌', '❌', '✅'],
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium" style={{ color: '#164058' }}>{row[0]}</td>
                    <td className="text-center py-3 px-4">{row[1]}</td>
                    <td className="text-center py-3 px-4 font-semibold" style={{ color: '#FF9C00' }}>{row[2]}</td>
                    <td className="text-center py-3 px-4">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-2xl p-6 lg:p-8"
          style={{ background: 'linear-gradient(135deg, #F7F7F7 0%, white 100%)' }}
        >
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: '#164058' }}>
            Success Stories from Our Brokers
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh Kumar",
                role: "Property Broker, Mumbai",
                story: "Premium plan helped me close 15 deals in 2 months. Direct owner contacts saved me hours of searching!",
                deals: "15 deals closed",
                savings: "₹50,000 saved"
              },
              {
                name: "Priya Sharma",
                role: "Real Estate Agent, Delhi",
                story: "Enterprise plan's unlimited leads transformed my business. Now I have more clients than I can handle!",
                deals: "25+ deals monthly",
                savings: "₹1,20,000 revenue boost"
              },
              {
                name: "Amit Patel",
                role: "Independent Broker, Pune",
                story: "Started with Basic plan, upgraded to Premium after seeing results. Best investment for my business!",
                deals: "8 deals in first month",
                savings: "₹30,000 commission"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#FF9C00' }}>
                    <UserGroupIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: '#164058' }}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  "{testimonial.story}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm" style={{ color: '#FF9C00' }}>
                    <strong>{testimonial.deals}</strong>
                  </div>
                  <div className="text-sm" style={{ color: '#164058' }}>
                    <strong>{testimonial.savings}</strong>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { icon: ShieldCheckIcon, text: "100% Verified Leads" },
            { icon: PhoneIcon, text: "Direct Owner Contacts" },
            { icon: EyeIcon, text: "Real-time Updates" },
            { icon: UserGroupIcon, text: "24/7 Support" }
          ].map((badge, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="text-center p-4"
            >
              <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: '#FF9C00' }}>
                <badge.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium" style={{ color: '#164058' }}>
                {badge.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#164058' }}>
                Complete Your Subscription
              </h3>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                    {error}
                  </div>
                </div>
              )}
              
              <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#F7F7F7' }}>
                <div className="font-semibold text-lg" style={{ color: '#164058' }}>
                  {plans.find(p => p.id === selectedPlan)?.name}
                </div>
                <div className="text-2xl font-bold" style={{ color: '#FF9C00' }}>
                  ₹{formatPrice(getPrice(plans.find(p => p.id === selectedPlan)))}
                </div>
                <div className="text-sm text-gray-600">
                  per {billingCycle}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: '#164058' }}>
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3" 
                    />
                    <CreditCardIcon className="w-5 h-5 mr-2" style={{ color: '#FF9C00' }} />
                    <span style={{ color: '#164058' }}>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3" 
                    />
                    <span className="mr-2" style={{ color: '#FF9C00' }}>💳</span>
                    <span style={{ color: '#164058' }}>UPI Payment</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowPayment(false);
                    setError('');
                  }}
                  disabled={loading}
                  className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="flex-1 font-semibold py-3 px-6 rounded-lg transition-colors text-white disabled:opacity-50 flex items-center justify-center"
                  style={{ backgroundColor: '#FF9C00' }}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Pay Now'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionPlans;
