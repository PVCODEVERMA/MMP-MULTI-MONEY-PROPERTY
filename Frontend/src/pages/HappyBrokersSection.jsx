// src/components/home/HappyBrokersSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrophyIcon, 
  CurrencyRupeeIcon, 
  ClockIcon,
  ChartBarIcon,
  StarIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';

import pv from "../assets/OurCustomersImg/pv.jpg";
import { Link } from 'react-router-dom';

const HappyBrokersSection = () => {
  const brokerStories = [
    {
      id: 1,
      name: "Rohit Verma",
      location: "Mumbai",
      image: pv,
      beforeEarning: "₹35,000",
      afterEarning: "₹2,50,000",
      growthPercentage: "+614%",
      timeWithMMP: "18 months",
      specialization: "Luxury Properties",
      achievement: "Top Performer 2024",
      story: "From struggling to make ends meet to becoming Mumbai's top luxury property consultant. MMP's premium leads changed everything!",
      stats: {
        dealsCompleted: 89,
        clientsSatisfied: "98%",
        leadConversion: "76%"
      }
    },
    {
      id: 2,
      name: "Kavya Nair",
      location: "Bangalore",
      image: pv,
      beforeEarning: "₹45,000",
      afterEarning: "₹3,20,000",
      growthPercentage: "+611%",
      timeWithMMP: "2 years",
      specialization: "IT Hub Properties",
      achievement: "Best Newcomer 2023",
      story: "Started as a fresher, now I'm the go-to broker for IT professionals in Whitefield. MMP's tech-savvy approach matched my vision!",
      stats: {
        dealsCompleted: 124,
        clientsSatisfied: "99%",
        leadConversion: "82%"
      }
    },
    {
      id: 3,
      name: "Arjun Shah",
      location: "Ahmedabad",
      image: pv,
      beforeEarning: "₹28,000",
      afterEarning: "₹1,85,000",
      growthPercentage: "+560%",
      timeWithMMP: "14 months",
      specialization: "Affordable Housing",
      achievement: "Community Choice Award",
      story: "Helping families find their dream homes at affordable prices. MMP's diverse lead base helped me serve every income segment!",
      stats: {
        dealsCompleted: 67,
        clientsSatisfied: "96%",
        leadConversion: "71%"
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
            <TrophyIcon className="w-4 h-4 mr-2" />
            Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Star Performers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real brokers, real success stories. See how MMP transformed their careers and income
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {brokerStories.map((broker, index) => (
            <motion.div
              key={broker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-100 hover:border-amber-300 relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Achievement Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold transform rotate-12">
                  {broker.achievement}
                </div>

                <div className="relative z-10">
                  {/* Profile Section */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <img
                        src={broker.image}
                        alt={broker.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-amber-300 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                        <StarIcon className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mt-3 mb-1">
                      {broker.name}
                    </h3>
                    <p className="text-amber-600 font-semibold text-sm">
                      📍 {broker.location} • {broker.specialization}
                    </p>
                  </div>

                  {/* Income Growth */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-100">
                    <div className="text-center">
                      <p className="text-gray-600 text-sm mb-2">Monthly Income Growth</p>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-gray-500 text-xs">Before</p>
                          <p className="text-lg font-bold text-gray-700">{broker.beforeEarning}</p>
                        </div>
                        <div className="flex items-center">
                          <ArrowUpIcon className="w-8 h-8 text-green-500" />
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">After</p>
                          <p className="text-lg font-bold text-green-600">{broker.afterEarning}</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Growth: {broker.growthPercentage}
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <div className="mb-6">
                    <p className="text-gray-700 text-sm italic leading-relaxed">
                      "{broker.story}"
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="bg-blue-50 rounded-xl p-3 mb-2">
                        <ChartBarIcon className="w-6 h-6 text-blue-500 mx-auto" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{broker.stats.dealsCompleted}</p>
                      <p className="text-xs text-gray-600">Deals</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-50 rounded-xl p-3 mb-2">
                        <StarIcon className="w-6 h-6 text-purple-500 mx-auto" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{broker.stats.clientsSatisfied}</p>
                      <p className="text-xs text-gray-600">Satisfaction</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-orange-50 rounded-xl p-3 mb-2">
                        <TrophyIcon className="w-6 h-6 text-orange-500 mx-auto" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{broker.stats.leadConversion}</p>
                      <p className="text-xs text-gray-600">Conversion</p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center justify-center bg-gray-50 rounded-xl p-3">
                    <ClockIcon className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700 text-sm font-medium">
                      {broker.timeWithMMP} with MMP
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-700 mb-6">
            Ready to write your own success story?
          </p>
          <Link to="/plans">
          <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
            Join MMP Today
          </button>
           </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HappyBrokersSection;
