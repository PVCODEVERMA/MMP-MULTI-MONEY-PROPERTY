import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-building mr-2 text-blue-400"></i> MMP Hybrid
            </h3>
            <p className="text-gray-400 mb-4">
              Advanced real estate lead management system for brokers and agents.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="social-icon text-gray-400 hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a
                href="#"
                className="social-icon text-gray-400 hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a
                href="#"
                className="social-icon text-gray-400 hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
              <a
                href="#"
                className="social-icon text-gray-400 hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-instagram text-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-400 hover:text-white block"
                >
                  <i className="fas fa-arrow-right mr-2 text-xs text-blue-400"></i>{" "}
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-400 hover:text-white block"
                >
                  <i className="fas fa-arrow-right mr-2 text-xs text-blue-400"></i>{" "}
                  Properties
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-400 hover:text-white block"
                >
                  <i className="fas fa-arrow-right mr-2 text-xs text-blue-400"></i>{" "}
                  Broker Signup
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-400 hover:text-white block"
                >
                  <i className="fas fa-arrow-right mr-2 text-xs text-blue-400"></i>{" "}
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-400 hover:text-white block"
                >
                  <i className="fas fa-arrow-right mr-2 text-xs text-blue-400"></i>{" "}
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Our Services
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-400 hover:text-white block"
                >
                  <i className="fas fa-bullseye mr-2 text-xs text-blue-400"></i>{" "}
                  Lead Generation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-400 hover:text-white block"
                >
                  <i className="fas fa-user-tie mr-2 text-xs text-blue-400"></i>{" "}
                  Broker Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-400 hover:text-white block"
                >
                  <i className="fas fa-home mr-2 text-xs text-blue-400"></i>{" "}
                  Property Listing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-400 hover:text-white block"
                >
                  <i className="fas fa-check-circle mr-2 text-xs text-blue-400"></i>{" "}
                  Lead Verification
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-400 hover:text-white block"
                >
                  <i className="fas fa-credit-card mr-2 text-xs text-blue-400"></i>{" "}
                  Payment Processing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-blue-400"></i>
                <span className="text-gray-400">
                  123 Real Estate Ave, Property City
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-3 text-blue-400"></i>
                <span className="text-gray-400">+1 (912) 978-7343</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-blue-400"></i>
                <span className="text-gray-400">pankaj912978@gmail.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-3 text-blue-400"></i>
                <span className="text-gray-400">Mon-Fri: 9AM-6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-semibold mb-2 text-white">
                Subscribe to our Newsletter
              </h4>
              <p className="text-gray-400">
                Get the latest updates on new properties and features
              </p>
            </div>
            <div className="flex w-full md:w-1/3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 text-gray-800 w-full border-0"
              />
              <button
                onClick={handleSubscribe}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-r-lg font-semibold transition-colors flex items-center"
              >
                <span>Subscribe</span>
                <i className="fas fa-paper-plane ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-2 md:mb-0">
              © {new Date().getFullYear()} MMP Hybrid System. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="/terms"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/privacy"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/contact"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style>
        {`
          .footer-link {
            transition: all 0.3s ease;
          }
          .footer-link:hover {
            transform: translateX(5px);
            color: #93c5fd !important;
          }
          .social-icon {
            transition: all 0.3s ease;
          }
          .social-icon:hover {
            transform: translateY(-3px);
          }
        `}
      </style>
    </footer>
  );
}