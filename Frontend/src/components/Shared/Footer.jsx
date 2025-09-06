import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  PaperAirplaneIcon,
  HomeIcon,
  InformationCircleIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CheckCircleIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubscribing(true);
    setTimeout(() => {
      toast.success(`Thank you for subscribing! Welcome to MMP family 🎉`);
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  const quickLinks = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Properties", href: "/properties", icon: BuildingOfficeIcon },
    { name: "About Us", href: "/about", icon: InformationCircleIcon },
    { name: "Brokers", href: "/brokers", icon: UserGroupIcon },
    { name: "Contact", href: "/contact", icon: PhoneIcon },
  ];

  const services = [
    { name: "Lead Generation", icon: ChartBarIcon },
    { name: "Property Verification", icon: CheckCircleIcon },
    { name: "Broker Management", icon: UserGroupIcon },
    { name: "Payment Processing", icon: CurrencyRupeeIcon },
    { name: "Market Analytics", icon: ChartBarIcon },
  ];

  const legalLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Refund Policy", href: "/refunds" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/multimoneyproperty",
      color: "hover:bg-blue-600",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/multimoneyproperty",
      color: "hover:bg-pink-600",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
      name: "Twitter",
      href: "#",
      color: "hover:bg-sky-500",
      icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    },
    {
      name: "LinkedIn",
      href: "#",
      color: "hover:bg-blue-700",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@multimoneyproperty",
      color: "hover:bg-red-600",
      icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/918888888888",
      color: "hover:bg-green-600",
      icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Properties Listed" },
    { number: "500+", label: "Verified Brokers" },
    { number: "25,000+", label: "Happy Customers" },
    { number: "50+", label: "Cities Covered" },
  ];

  return (
    <>
      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-[#FD9E06] text-white py-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              Trusted by Thousands Across India
            </h3>
            <p className="text-blue-100">Our numbers speak for our success</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-600/20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
            {/* Company Info */}
            <div>
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-blue-600 p-3 rounded-xl shadow-lg mr-4">
                  <BuildingOfficeIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">MMP</h3>
                  <p className="text-gray-300 text-sm">Multi Money Property</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                India's leading property technology platform connecting verified
                brokers with quality leads. Transform your real estate business
                with us.
              </p>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg group`}
                    aria-label={social.name}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Trust Badge */}
              <div className="mt-6 flex items-center justify-center md:justify-start">
                <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-300">
                  Verified & Trusted Platform
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6 flex justify-center md:justify-start items-center">
                <HomeIcon className="w-5 h-5 mr-2 text-orange-500" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="group flex items-center justify-center md:justify-start text-gray-300 hover:text-white transition-all duration-300"
                    >
                      <link.icon className="w-4 h-4 mr-3 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <ArrowRightIcon className="w-3 h-3 mr-3 text-orange-500 opacity-100 group-hover:opacity-0 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6 flex justify-center md:justify-start items-center">
                <StarIcon className="w-5 h-5 mr-2 text-blue-500" />
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li
                    key={index}
                    className="group flex items-center justify-center md:justify-start text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <service.icon className="w-4 h-4 mr-3 text-blue-500 group-hover:scale-110 transition-transform" />
                    {service.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6 flex justify-center md:justify-start items-center">
                <EnvelopeIcon className="w-5 h-5 mr-2 text-green-500" />
                Get In Touch
              </h4>

              <div className="space-y-4 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start justify-center group">
                  <MapPinIcon className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      MMP Tower, Business District
                    </p>
                    <p className="text-gray-300 text-sm">
                      Mumbai - 400001, India
                    </p>
                  </div>
                </div>

                <div className="flex justify-center md:justify-start items-center group">
                  <PhoneIcon className="w-5 h-5 text-green-500 mr-3" />
                  <a
                    href="tel:+918888888888"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +91 88888 88888
                  </a>
                </div>

                <div className="flex justify-center md:justify-start items-center group">
                  <EnvelopeIcon className="w-5 h-5 text-green-500 mr-3" />
                  <a
                    href="mailto:info@multimoneyproperty.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    info@multimoneyproperty.com
                  </a>
                </div>

                <div className="flex justify-center md:justify-start items-center group">
                  <ClockIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-300 text-sm">
                    Mon-Sat: 9AM-6PM IST
                  </span>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h5 className="font-semibold text-white mb-3">Stay Updated</h5>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                    />
                    <EnvelopeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubscribing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <PaperAirplaneIcon className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0 text-center">
              <div className="flex items-center justify-center">
                <HeartIcon className="w-4 h-4 text-red-500 mr-2 animate-pulse" />
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Multi Money Property. Made with
                  love in India.
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
                {legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-gray-400 hover:text-orange-500 text-sm transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "12px",
            padding: "16px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}
