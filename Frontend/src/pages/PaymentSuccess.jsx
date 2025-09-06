// components/PaymentSuccess.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  PhoneIcon,
  MapPinIcon,
  HomeIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, billingCycle, searchInfo } = location.state || {};

  // Sample property leads that are now unlocked
  const unlockedLeads = [
    {
      id: 1,
      title: 'Luxury 3 BHK Apartment in Sector 62',
      location: 'Sector 62, Noida',
      price: '₹1.2 Cr',
      bhk: '3 BHK',
      area: '1800 sq.ft',
      ownerPhone: '+91 98765 43210',
      ownerName: 'Mr. Rajesh Gupta',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      postedDate: '2 hours ago',
      leadScore: 95,
      verified: true
    },
    {
      id: 2,
      title: 'Modern 2 BHK Flat in Electronic City',
      location: 'Electronic City, Bangalore',
      price: '₹85 Lac',
      bhk: '2 BHK',
      area: '1200 sq.ft',
      ownerPhone: '+91 98765 43211',
      ownerName: 'Mrs. Priya Sharma',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      postedDate: '5 hours ago',
      leadScore: 88,
      verified: true
    },
    {
      id: 3,
      title: 'Spacious 4 BHK Villa in Whitefield',
      location: 'Whitefield, Bangalore',
      price: '₹2.5 Cr',
      bhk: '4 BHK',
      area: '2800 sq.ft',
      ownerPhone: '+91 98765 43212',
      ownerName: 'Mr. Amit Kumar',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      postedDate: '1 day ago',
      leadScore: 92,
      verified: true
    }
  ];

  useEffect(() => {
    // Store subscription status in localStorage
    localStorage.setItem('isSubscribed', 'true');
    localStorage.setItem('subscriptionPlan', plan?.id);
    localStorage.setItem('subscriptionExpiry', new Date(Date.now() + (billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString());
  }, [plan, billingCycle]);

  const handleContactOwner = (lead) => {
    // In a real app, this would initiate contact
    alert(`Contacting ${lead.ownerName} at ${lead.ownerPhone}`);
  };

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#F7F7F7' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: '#FF9C00' }}>
            <CheckCircleIcon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#164058' }}>
            Payment Successful! 🎉
          </h1>
          <p className="text-xl mb-4" style={{ color: '#164058' }}>
            Welcome to {plan?.name} - Your leads are now unlocked!
          </p>
          
          {/* Subscription Details */}
          <div className="inline-block p-4 rounded-lg mb-6" style={{ backgroundColor: '#FF9C00', color: 'white' }}>
            <p className="text-lg font-semibold">
              {plan?.name} - ₹{billingCycle === 'yearly' ? plan?.yearlyPrice?.toLocaleString() : plan?.monthlyPrice?.toLocaleString()}/{billingCycle}
            </p>
            <p className="text-sm opacity-90">
              Active until {new Date(Date.now() + (billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-2xl font-bold" style={{ color: '#FF9C00' }}>
              {unlockedLeads.length}
            </div>
            <p className="text-sm" style={{ color: '#164058' }}>
              New Leads Available
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-2xl font-bold" style={{ color: '#FF9C00' }}>
              {unlockedLeads.filter(lead => lead.verified).length}
            </div>
            <p className="text-sm" style={{ color: '#164058' }}>
              Verified Properties
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-2xl font-bold" style={{ color: '#FF9C00' }}>
              {unlockedLeads.length}
            </div>
            <p className="text-sm" style={{ color: '#164058' }}>
              Owner Contacts
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-2xl font-bold" style={{ color: '#FF9C00' }}>
              {Math.round(unlockedLeads.reduce((sum, lead) => sum + lead.leadScore, 0) / unlockedLeads.length)}%
            </div>
            <p className="text-sm" style={{ color: '#164058' }}>
              Avg Lead Score
            </p>
          </div>
        </motion.div>

        {/* Unlocked Leads */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#164058' }}>
            🔓 Your Unlocked Property Leads
            {searchInfo?.searchQuery && (
              <span className="text-lg font-normal text-gray-600 ml-2">
                for "{searchInfo.searchQuery}"
              </span>
            )}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unlockedLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Property Image */}
                <div className="relative">
                  <img src={lead.image} alt={lead.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="text-white text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: '#FF9C00' }}>
                      VERIFIED LEAD
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <div className={`w-3 h-3 rounded-full ${lead.leadScore > 90 ? 'bg-green-500' : lead.leadScore > 80 ? 'bg-yellow-500' : 'bg-orange-500'}`}></div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2" style={{ color: '#164058' }}>
                    {lead.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">{lead.location}</span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold" style={{ color: '#FF9C00' }}>
                      {lead.price}
                    </span>
                    <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: '#F7F7F7', color: '#164058' }}>
                      {lead.bhk}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{lead.area}</span>
                    <span className="flex items-center">
                      <EyeIcon className="w-3 h-3 mr-1" />
                      Lead Score: {lead.leadScore}%
                    </span>
                  </div>

                  {/* Owner Contact - NOW UNLOCKED */}
                  <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: '#F7F7F7' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#164058' }}>
                          Owner: {lead.ownerName}
                        </p>
                        <p className="text-sm" style={{ color: '#FF9C00' }}>
                          📞 {lead.ownerPhone}
                        </p>
                      </div>
                      <div className="text-xs px-2 py-1 rounded text-white" style={{ backgroundColor: '#FF9C00' }}>
                        VERIFIED
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleContactOwner(lead)}
                      className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors text-white"
                      style={{ backgroundColor: '#FF9C00' }}
                    >
                      <PhoneIcon className="w-4 h-4 inline mr-1" /> Call Now
                    </button>
                    <button
                      onClick={() => handleContactOwner(lead)}
                      className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors text-white"
                      style={{ backgroundColor: '#164058' }}
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-1" /> WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 p-8 bg-white rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#164058' }}>
            What's Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#FF9C00' }}>
                <PhoneIcon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2" style={{ color: '#164058' }}>
                1. Contact Property Owners
              </h4>
              <p className="text-sm text-gray-600">
                Call or WhatsApp property owners directly using verified contact numbers
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#164058' }}>
                <HomeIcon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2" style={{ color: '#164058' }}>
                2. Schedule Property Visits
              </h4>
              <p className="text-sm text-gray-600">
                Arrange property viewings and site visits with interested clients
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#FF9C00' }}>
                <CheckCircleIcon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2" style={{ color: '#164058' }}>
                3. Close Deals
              </h4>
              <p className="text-sm text-gray-600">
                Use our verified leads to close more deals and earn higher commissions
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 text-white"
            style={{ backgroundColor: '#FF9C00' }}
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            style={{ backgroundColor: '#F7F7F7', color: '#164058' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
