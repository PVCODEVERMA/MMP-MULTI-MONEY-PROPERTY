// pages/PrivacyPolicy.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  EyeSlashIcon, 
  LockClosedIcon,
  UserIcon,
  DocumentTextIcon,
  ExclamationCircleIcon 
} from '@heroicons/react/24/outline';

const PrivacyPolicy = () => {
  const lastUpdated = "August 28, 2025";

  const dataTypes = [
    {
      category: "Personal Information",
      icon: UserIcon,
      items: [
        "Full name and contact details",
        "Email address and phone number",
        "Address and location data",
        "Government-issued ID for verification"
      ]
    },
    {
      category: "Property Preferences", 
      icon: DocumentTextIcon,
      items: [
        "Property search criteria",
        "Budget and financing information",
        "Location preferences",
        "Property viewing history"
      ]
    },
    {
      category: "Usage Data",
      icon: EyeSlashIcon, 
      items: [
        "Website interaction patterns",
        "Device and browser information",
        "IP address and location data",
        "Cookie and tracking data"
      ]
    }
  ];

  const privacyPrinciples = [
    {
      title: "Transparency",
      description: "We clearly explain what data we collect and how we use it",
      icon: EyeSlashIcon
    },
    {
      title: "Security", 
      description: "Your data is protected with industry-standard encryption",
      icon: LockClosedIcon
    },
    {
      title: "Control",
      description: "You have full control over your personal information",
      icon: ShieldCheckIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <ShieldCheckIcon className="w-16 h-16 mr-4" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
              <p className="text-xl">Your Privacy is Our Priority</p>
            </div>
          </div>
          <p className="text-lg max-w-3xl mx-auto">
            Learn how Multi Money Property collects, uses, and protects your personal information
            when you use our real estate platform.
          </p>
          <div className="mt-6">
            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">
              Last Updated: {lastUpdated}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Privacy Principles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Privacy Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {privacyPrinciples.map((principle, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{principle.title}</h3>
                <p className="text-gray-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <nav className="space-y-2">
                {[
                  'Information We Collect',
                  'How We Use Information', 
                  'Information Sharing',
                  'Data Security',
                  'Your Rights',
                  'Contact Us'
                ].map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Data Protection</h4>
                  <p className="text-sm text-green-700">
                    We comply with Indian data protection laws and international standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Introduction */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  Multi Money Property ("MMP," "we," "us," or "our") respects your privacy and is committed to 
                  protecting your personal information. This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you use our real estate platform.
                </p>
              </div>

              {/* Information We Collect */}
              <div id="information-we-collect" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
                
                <div className="space-y-6">
                  {dataTypes.map((type, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <type.icon className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-lg font-semibold text-gray-900">{type.category}</h3>
                      </div>
                      <ul className="space-y-2">
                        {type.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* How We Use Information */}
              <div id="how-we-use-information" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Service Provision", desc: "To provide and improve our real estate platform services" },
                    { title: "Communication", desc: "To send you updates, notifications, and marketing materials" },
                    { title: "Matching", desc: "To connect you with relevant properties and brokers" },
                    { title: "Analytics", desc: "To analyze usage patterns and improve user experience" },
                    { title: "Legal Compliance", desc: "To comply with legal obligations and prevent fraud" },
                    { title: "Support", desc: "To provide customer support and respond to inquiries" }
                  ].map((use, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{use.title}</h4>
                      <p className="text-sm text-gray-600">{use.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Information Sharing */}
              <div id="information-sharing" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
                  <div className="flex items-start">
                    <ExclamationCircleIcon className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-2">We Never Sell Your Data</h4>
                      <p className="text-yellow-800 text-sm">
                        We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">We may share your information only in these specific circumstances:</p>
                <ul className="space-y-3">
                  {[
                    "With verified brokers when you submit property requirements",
                    "With service providers who help us operate our platform",
                    "When required by law or to protect our legal rights",
                    "In case of business transfer or merger (with prior notice)",
                    "With your explicit consent for specific purposes"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Security */}
              <div id="data-security" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-3">Security Measures</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "SSL/TLS encryption for data transmission",
                      "Regular security audits and updates", 
                      "Access controls and authentication",
                      "Secure data storage and backup systems",
                      "Employee training on data protection",
                      "Incident response and monitoring"
                    ].map((measure, index) => (
                      <div key={index} className="flex items-center text-sm text-green-800">
                        <LockClosedIcon className="w-4 h-4 mr-2" />
                        {measure}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div id="your-rights" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
                <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
                <div className="space-y-3">
                  {[
                    { right: "Access", desc: "Request a copy of your personal information we hold" },
                    { right: "Correction", desc: "Request correction of inaccurate or incomplete data" },
                    { right: "Deletion", desc: "Request deletion of your personal information" },
                    { right: "Portability", desc: "Request transfer of your data to another service" },
                    { right: "Objection", desc: "Object to certain types of data processing" },
                    { right: "Restriction", desc: "Request restriction on how we use your data" }
                  ].map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900">{item.right}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div id="contact-us" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Our Privacy Team</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    If you have questions about this Privacy Policy or want to exercise your privacy rights, 
                    please contact our Data Protection Officer:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">Privacy Officer</p>
                      <p className="text-gray-600">Multi Money Property</p>
                      <p className="text-gray-600">privacy@multimoneyproperty.com</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone: +91 88888 88888</p>
                      <p className="text-gray-600">Address: MMP Tower, Mumbai - 400001</p>
                      <p className="text-gray-600">Response Time: Within 30 days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Updates Notice */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Policy Updates</h4>
                <p className="text-gray-700 text-sm">
                  We may update this Privacy Policy from time to time. We will notify you of any material 
                  changes by email or through our platform. Continued use of our services after such 
                  changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
