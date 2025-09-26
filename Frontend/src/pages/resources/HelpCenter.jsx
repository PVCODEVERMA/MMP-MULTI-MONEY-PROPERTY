import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight, FaSearch, FaBook, FaQuestionCircle, FaHeadset, FaRocket, FaWhatsapp, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HelpCenter() {
  const helpCategories = [
    {
      icon: <FaRocket className="text-2xl text-blue-500" />,
      title: "Getting Started",
      description: "Create an account, choose a plan, and invite team members.",
      href: "/resources/faq#getting-started",
      count: "12 articles",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <FaWhatsapp className="text-2xl text-green-500" />,
      title: "Leads & Delivery",
      description: "Understand shared vs exclusive, WhatsApp/Email delivery.",
      href: "/resources/faq#leads",
      count: "8 articles",
      gradient: "from-green-50 to-green-100"
    },
    {
      icon: <FaCreditCard className="text-2xl text-purple-500" />,
      title: "Billing & GST",
      description: "Packages vs Wallet, GST invoices, and renewals.",
      href: "/resources/faq#billing",
      count: "6 articles",
      gradient: "from-purple-50 to-purple-100"
    },
    {
      icon: <FaBook className="text-2xl text-orange-500" />,
      title: "Dashboard Guide",
      description: "Learn how to use your broker dashboard effectively.",
      href: "/resources/faq#dashboard",
      count: "15 articles",
      gradient: "from-orange-50 to-orange-100"
    },
    {
      icon: <FaQuestionCircle className="text-2xl text-red-500" />,
      title: "Troubleshooting",
      description: "Common issues and their solutions.",
      href: "/resources/faq#troubleshooting",
      count: "10 articles",
      gradient: "from-red-50 to-red-100"
    },
    {
      icon: <FaHeadset className="text-2xl text-cyan-500" />,
      title: "Support",
      description: "Contact our support team and get help quickly.",
      href: "/resources/faq#support",
      count: "5 articles",
      gradient: "from-cyan-50 to-cyan-100"
    }
  ];

  const popularArticles = [
    {
      title: "How to set up WhatsApp lead delivery?",
      href: "/resources/faq#whatsapp-setup",
      views: "1.2k views"
    },
    {
      title: "Understanding shared vs exclusive leads",
      href: "/resources/faq#lead-types",
      views: "980 views"
    },
    {
      title: "Wallet recharge and package purchase",
      href: "/resources/faq#billing-setup",
      views: "850 views"
    },
    {
      title: "Lead distribution system explained",
      href: "/resources/faq#lead-distribution",
      views: "720 views"
    }
  ];

  return (
    <div className=" bg-gradient-to-br from-[#f7f7f7] via-[#f7f7f7] to-orange-50/20 my-20">
      {/* Breadcrumb */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/home/leads" className="hover:text-[#ff9c00] transition-colors">
              Home
            </Link>
            <FaAngleRight className="text-gray-400" />
            <Link to="/resources" className="hover:text-[#ff9c00] transition-colors">
              Resources
            </Link>
            <FaAngleRight className="text-gray-400" />
            <span className="text-gray-900 font-medium">Help Center</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 "></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-semibold bg-[#ff9c00] text-white px-4 py-2 rounded-full mb-6"
            >
              <FaQuestionCircle />
              💡 Help Center
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            >
              How can we help you
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"> today?</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Browse quick-start guides, account setup, billing, and troubleshooting resources for MMP. 
              Find answers to common questions or contact our support team.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for articles, guides, or topics..."
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/resources/faq" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <FaBook />
                Browse FAQs
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <FaHeadset />
                Contact Support
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Popular Articles */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Articles</h2>
            <Link to="/resources/faq" className="text-orange-600 font-semibold hover:underline flex items-center gap-2">
              View all articles
              <FaAngleRight />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
              >
                <Link to={article.href} className="block">
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.views}</span>
                    <FaAngleRight className="text-orange-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Help Categories */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#154056] mb-8 text-center">Browse by Category</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5
                }}
                className="group"
              >
                <Link to={category.href}>
                  <div className={`bg-gradient-to-br ${category.gradient} rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100/50 transition-all duration-300 h-full`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                          {category.title}
                        </h3>
                        <span className="text-sm text-gray-600">{category.count}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all duration-300">
                      Learn more
                      <FaAngleRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Support CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-slate-900 to-[#154056] rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <div className="max-w-2xl mx-auto">
            <FaHeadset className="text-4xl text-orange-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Our support team is here to help you get the most out of MMP. Contact us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-orange-600 transition-colors"
              >
                Contact Support
              </Link>
              <Link 
                to="/resources/demo" 
                className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}