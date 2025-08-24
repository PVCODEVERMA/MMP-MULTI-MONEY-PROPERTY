// src/components/home/SuccessStoriesSection.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrophyIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  ChartBarIcon,
  StarIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  PhoneIcon,
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  MapPinIcon,
  SparklesIcon,
  CheckCircleIcon,
  BuildingOffice2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import pv from "../assets/OurCustomersImg/pv.jpg";
import { Link } from "react-router-dom";
const SuccessStoriesSection = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const successStories = [
    {
      id: 1,
      name: "Rajesh Kumar Sharma",
      age: 34,
      location: "Mumbai, Maharashtra",
      image: pv,
      category: "luxury",
      joinedDate: "March 2022",
      currentRole: "Senior Luxury Property Consultant",
      company: "Elite Mumbai Properties",
      beforeStats: {
        monthlyIncome: "₹45,000",
        dealsPerMonth: 2,
        clientBase: 15,
        experience: "5 years struggling",
      },
      afterStats: {
        monthlyIncome: "₹3,85,000",
        dealsPerMonth: 18,
        clientBase: 250,
        experience: "22 months with MMP",
      },
      growthPercentage: "+755%",
      specialization: "Luxury Apartments & Penthouses",
      achievement: "Top Performer 2024 - Mumbai Region",
      quote:
        "MMP didn't just change my income, it transformed my entire approach to real estate. From struggling to make ends meet to becoming Mumbai's go-to luxury property consultant - this platform gave me the quality leads and professional tools I needed.",
      keyMilestones: [
        { milestone: "First ₹1 Cr+ deal", timeframe: "3 months after joining" },
        { milestone: "Monthly income > ₹2L", timeframe: "8 months" },
        { milestone: "100+ satisfied clients", timeframe: "14 months" },
        { milestone: "Regional top performer", timeframe: "18 months" },
      ],
      videoTestimonial:
        "https://www.youtube.com/results?search_query=lead+real+estate",
      socialProof: {
        linkedinRecommendations: 47,
        googleReviews: 156,
        repeatClients: "78%",
      },
      favoriteFeature: "Premium lead filtering by budget range",
    },
    {
      id: 2,
      name: "Priya Menon",
      age: 29,
      location: "Bangalore, Karnataka",
      image: pv,
      category: "tech",
      joinedDate: "July 2022",
      currentRole: "IT Corridor Specialist",
      company: "TechHub Realty Solutions",
      beforeStats: {
        monthlyIncome: "₹32,000",
        dealsPerMonth: 1,
        clientBase: 8,
        experience: "Fresh graduate",
      },
      afterStats: {
        monthlyIncome: "₹2,95,000",
        dealsPerMonth: 15,
        clientBase: 180,
        experience: "19 months with MMP",
      },
      growthPercentage: "+822%",
      specialization: "IT Professional Housing",
      achievement: "Best Newcomer Award 2023",
      quote:
        "Starting fresh in real estate was daunting, but MMP's training resources and quality tech-professional leads helped me carve my niche. Now I'm the go-to agent for IT relocations in Bangalore!",
      keyMilestones: [
        {
          milestone: "First successful deal",
          timeframe: "2 weeks after joining",
        },
        { milestone: "Monthly income > ₹1L", timeframe: "5 months" },
        { milestone: "50+ IT professional clients", timeframe: "10 months" },
        { milestone: "Company top performer", timeframe: "15 months" },
      ],
      videoTestimonial: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      socialProof: {
        linkedinRecommendations: 23,
        googleReviews: 89,
        repeatClients: "65%",
      },
      favoriteFeature: "Location-based lead matching for IT corridors",
    },
    {
      id: 3,
      name: "Arjun Patel",
      age: 41,
      location: "Ahmedabad, Gujarat",
      image: pv,
      category: "affordable",
      joinedDate: "January 2022",
      currentRole: "Affordable Housing Champion",
      company: "Gujarat Family Homes",
      beforeStats: {
        monthlyIncome: "₹28,000",
        dealsPerMonth: 2,
        clientBase: 20,
        experience: "8 years traditional agent",
      },
      afterStats: {
        monthlyIncome: "₹2,15,000",
        dealsPerMonth: 22,
        clientBase: 320,
        experience: "25 months with MMP",
      },
      growthPercentage: "+668%",
      specialization: "First-time Home Buyers",
      achievement: "Community Choice Award 2024",
      quote:
        "MMP helped me realize my passion for helping families find their first homes. The platform's diverse lead quality means I can serve every income segment and build long-term relationships.",
      keyMilestones: [
        { milestone: "100th family housed", timeframe: "6 months" },
        { milestone: "Monthly income doubled", timeframe: "9 months" },
        { milestone: "200+ happy families", timeframe: "16 months" },
        { milestone: "Community recognition", timeframe: "20 months" },
      ],
      videoTestimonial: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      socialProof: {
        linkedinRecommendations: 67,
        googleReviews: 203,
        repeatClients: "84%",
      },
      favoriteFeature: "EMI calculator integration for client discussions",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      age: 37,
      location: "Hyderabad, Telangana",
      image: pv,
      category: "commercial",
      joinedDate: "September 2021",
      currentRole: "Commercial Real Estate Specialist",
      company: "Hyderabad Business Properties",
      beforeStats: {
        monthlyIncome: "₹65,000",
        dealsPerMonth: 1,
        clientBase: 12,
        experience: "10 years mixed results",
      },
      afterStats: {
        monthlyIncome: "₹4,25,000",
        dealsPerMonth: 8,
        clientBase: 95,
        experience: "30 months with MMP",
      },
      growthPercentage: "+553%",
      specialization: "Office Spaces & Retail",
      achievement: "Commercial Excellence Award 2024",
      quote:
        "Commercial real estate requires serious networking and quality leads. MMP's business-focused lead generation and CRM integration helped me become Hyderabad's trusted commercial space consultant.",
      keyMilestones: [
        { milestone: "First ₹50L+ commercial deal", timeframe: "4 months" },
        {
          milestone: "Corporate client base established",
          timeframe: "8 months",
        },
        { milestone: "Monthly income > ₹3L", timeframe: "18 months" },
        { milestone: "Industry recognition", timeframe: "24 months" },
      ],
      videoTestimonial: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      socialProof: {
        linkedinRecommendations: 72,
        googleReviews: 134,
        repeatClients: "91%",
      },
      favoriteFeature: "Commercial property lead filtering and CRM sync",
    },
    {
      id: 5,
      name: "Karan Singh",
      age: 31,
      location: "Pune, Maharashtra",
      image: pv,
      category: "investment",
      joinedDate: "May 2022",
      currentRole: "Investment Property Advisor",
      company: "Pune Investment Properties",
      beforeStats: {
        monthlyIncome: "₹38,000",
        dealsPerMonth: 1,
        clientBase: 10,
        experience: "3 years struggling freelancer",
      },
      afterStats: {
        monthlyIncome: "₹3,15,000",
        dealsPerMonth: 12,
        clientBase: 140,
        experience: "21 months with MMP",
      },
      growthPercentage: "+729%",
      specialization: "Investment & Rental Properties",
      achievement: "Rising Star Award 2023",
      quote:
        "Investment properties require deep market knowledge and investor-quality leads. MMP's analytics tools and high-net-worth client leads transformed me from struggling freelancer to successful investment advisor.",
      keyMilestones: [
        {
          milestone: "First investment client portfolio",
          timeframe: "3 months",
        },
        { milestone: "₹10Cr+ deals facilitated", timeframe: "12 months" },
        { milestone: "50+ investment properties sold", timeframe: "16 months" },
        { milestone: "Industry award recognition", timeframe: "18 months" },
      ],
      videoTestimonial: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      socialProof: {
        linkedinRecommendations: 34,
        googleReviews: 92,
        repeatClients: "76%",
      },
      favoriteFeature: "Investment ROI calculator and market analytics",
    },
  ];

  const categories = [
    {
      id: "all",
      name: "All Stories",
      icon: <SparklesIcon className="w-5 h-5" />,
    },
    { id: "luxury", name: "Luxury", icon: <StarIcon className="w-5 h-5" /> },
    {
      id: "tech",
      name: "Tech Hub",
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
    {
      id: "affordable",
      name: "Affordable",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      id: "commercial",
      name: "Commercial",
      icon: <BuildingOffice2Icon className="w-5 h-5" />,
    },
    {
      id: "investment",
      name: "Investment",
      icon: <CurrencyRupeeIcon className="w-5 h-5" />,
    },
  ];

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlay) return;

    const filteredStories =
      selectedCategory === "all"
        ? successStories
        : successStories.filter((story) => story.category === selectedCategory);

    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % filteredStories.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlay, selectedCategory, successStories]);

  const filteredStories =
    selectedCategory === "all"
      ? successStories
      : successStories.filter((story) => story.category === selectedCategory);

  const currentStory = filteredStories[activeStory] || filteredStories[0];

  const calculateGrowth = (before, after) => {
    const beforeNum = parseInt(before.replace(/[₹,]/g, ""));
    const afterNum = parseInt(after.replace(/[₹,]/g, ""));
    return Math.round(((afterNum - beforeNum) / beforeNum) * 100);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}( '
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <g fill="#ffffff" fill-opacity="0.03">
              <circle cx="30" cy="30" r="2" />
            </g>
          </g>
        </svg>
        ' );
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
              <TrophyIcon className="w-5 h-5 mr-2" />
              REAL SUCCESS STORIES
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              From Struggle to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Success
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Meet real brokers who transformed their careers with MMP. These
              aren't just numbers - they're life-changing journeys of
              professionals who dared to dream bigger.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setActiveStory(0);
                }}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </button>
            ))}
          </motion.div>

          {/* Main Story Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Story Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${activeStory}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
                >
                  {/* Profile Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                    <div className="relative">
                      <img
                        src={currentStory.image}
                        alt={currentStory.name}
                        className="w-24 h-24 rounded-2xl object-cover border-4 border-amber-400 shadow-xl"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {currentStory.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                        <span className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {currentStory.location}
                        </span>
                        <span className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {currentStory.age} years old
                        </span>
                        <span className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          Joined {currentStory.joinedDate}
                        </span>
                      </div>
                      <p className="text-amber-400 font-semibold mt-2">
                        {currentStory.currentRole} • {currentStory.company}
                      </p>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl mb-6 text-center">
                    <TrophyIcon className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-bold">{currentStory.achievement}</p>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-gray-100 italic leading-relaxed mb-8 pl-6 border-l-4 border-amber-400">
                    "{currentStory.quote}"
                  </blockquote>

                  {/* Before vs After Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Before */}
                    <div className="bg-red-500/20 rounded-2xl p-6 border border-red-500/30">
                      <h4 className="text-lg font-bold text-red-300 mb-4 flex items-center">
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                        Before MMP
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Monthly Income:</span>
                          <span className="text-red-300 font-semibold">
                            {currentStory.beforeStats.monthlyIncome}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Deals/Month:</span>
                          <span className="text-red-300 font-semibold">
                            {currentStory.beforeStats.dealsPerMonth}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Client Base:</span>
                          <span className="text-red-300 font-semibold">
                            {currentStory.beforeStats.clientBase}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* After */}
                    <div className="bg-green-500/20 rounded-2xl p-6 border border-green-500/30">
                      <h4 className="text-lg font-bold text-green-300 mb-4 flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                        After MMP
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Monthly Income:</span>
                          <span className="text-green-300 font-semibold">
                            {currentStory.afterStats.monthlyIncome}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Deals/Month:</span>
                          <span className="text-green-300 font-semibold">
                            {currentStory.afterStats.dealsPerMonth}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Client Base:</span>
                          <span className="text-green-300 font-semibold">
                            {currentStory.afterStats.clientBase}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Growth Highlight */}
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-center text-white mb-6">
                    <ArrowUpIcon className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-3xl font-bold mb-2">
                      {currentStory.growthPercentage}
                    </p>
                    <p className="text-amber-100">Income Growth</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Key Milestones */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  <ChartBarIcon className="w-6 h-6 mr-3 text-amber-400" />
                  Key Milestones
                </h4>
                <div className="space-y-4">
                  {currentStory.keyMilestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">
                          {milestone.milestone}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {milestone.timeframe}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  <UserGroupIcon className="w-6 h-6 mr-3 text-amber-400" />
                  Social Proof
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-blue-500/20 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-blue-300">
                      {currentStory.socialProof.linkedinRecommendations}
                    </p>
                    <p className="text-blue-200 text-sm">
                      LinkedIn Recommendations
                    </p>
                  </div>
                  <div className="bg-green-500/20 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-green-300">
                      {currentStory.socialProof.googleReviews}
                    </p>
                    <p className="text-green-200 text-sm">Google Reviews</p>
                  </div>
                  <div className="bg-purple-500/20 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-purple-300">
                      {currentStory.socialProof.repeatClients}
                    </p>
                    <p className="text-purple-200 text-sm">Repeat Clients</p>
                  </div>
                </div>
              </div>

              {/* Favorite Feature */}
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-indigo-500/30">
                <h4 className="text-lg font-bold text-white mb-3">
                  💡 Favorite MMP Feature
                </h4>
                <p className="text-gray-200 text-sm italic">
                  "{currentStory.favoriteFeature}"
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Story Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setActiveStory((prev) =>
                    prev > 0 ? prev - 1 : filteredStories.length - 1
                  )
                }
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>

              <div className="flex gap-2">
                {filteredStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStory(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeStory
                        ? "bg-amber-400 scale-125"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setActiveStory((prev) => (prev + 1) % filteredStories.length)
                }
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Auto-play Control */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300"
              >
                {isAutoPlay ? (
                  <PauseIcon className="w-5 h-5" />
                ) : (
                  <PlayIcon className="w-5 h-5" />
                )}
                <span className="text-sm">{isAutoPlay ? "Pause" : "Play"}</span>
              </button>

              <div className="text-gray-300 text-sm">
                {activeStory + 1} of {filteredStories.length}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 border border-amber-500/30">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Write Your Success Story?
              </h3>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join over 2,500+ successful brokers who've transformed their
                careers with MMP
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/plans">
                  <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center cursor-pointer">
                    Start Your Journey Today
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </button>
                </Link>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 cursor-pointer">
                  Watch Video Stories
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SuccessStoriesSection;
