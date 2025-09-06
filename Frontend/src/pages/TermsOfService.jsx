
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const TermsOfService = () => {
  const lastUpdated = "August 28, 2025";
  
  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: `By accessing and using the Multi Money Property (MMP) platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.`
    },
    {
      id: 'definitions',
      title: '2. Definitions',
      content: `• "Platform" refers to the Multi Money Property website and mobile application
• "User" refers to any individual or entity using our services
• "Broker" refers to registered real estate professionals on our platform
• "Property" refers to real estate listings and related information
• "Content" refers to all text, images, and data on the platform`
    },
    {
      id: 'services',
      title: '3. Description of Services',
      content: `MMP provides a comprehensive real estate platform that connects property seekers with verified brokers. Our services include:
• Property listing and search functionality
• Lead generation and distribution
• Broker verification and management
• Payment processing for broker subscriptions
• Customer support and assistance`
    },
    {
      id: 'user-accounts',
      title: '4. User Accounts',
      content: `To access certain features, you must create an account. You are responsible for:
• Providing accurate and complete information
• Maintaining the confidentiality of your credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorized access`
    },
    {
      id: 'broker-obligations',
      title: '5. Broker Obligations',
      content: `Registered brokers must:
• Maintain valid real estate licenses
• Provide accurate property information
• Respond to leads within specified timeframes
• Comply with all applicable real estate laws
• Pay subscription fees as agreed`
    },
    {
      id: 'prohibited-activities',
      title: '6. Prohibited Activities',
      content: `Users may not:
• Violate any applicable laws or regulations
• Impersonate another person or entity
• Upload malicious software or harmful content
• Interfere with the platform's operation
• Engage in spam or unsolicited communications
• Attempt to circumvent security measures`
    },
    {
      id: 'intellectual-property',
      title: '7. Intellectual Property',
      content: `All content on the MMP platform, including but not limited to text, graphics, logos, and software, is owned by Multi Money Property or its licensors and is protected by copyright and other intellectual property laws.`
    },
    {
      id: 'privacy',
      title: '8. Privacy and Data Protection',
      content: `Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our services, you consent to the collection and use of your data as described in our Privacy Policy.`
    },
    {
      id: 'payments',
      title: '9. Payments and Refunds',
      content: `• All payments are processed securely through third-party payment gateways
• Subscription fees are non-refundable unless required by law
• Prices may change with 30 days' notice
• Failed payments may result in service suspension`
    },
    {
      id: 'disclaimers',
      title: '10. Disclaimers and Limitations',
      content: `MMP provides services "as is" without warranties of any kind. We are not responsible for:
• The accuracy of property information provided by third parties
• Actions or omissions of brokers or users
• Technical issues or service interruptions
• Investment decisions based on platform information`
    },
    {
      id: 'termination',
      title: '11. Termination',
      content: `We may suspend or terminate your access to our services at any time for violation of these terms or other reasonable causes. Upon termination, your right to use the platform ceases immediately.`
    },
    {
      id: 'governing-law',
      title: '12. Governing Law',
      content: `These terms are governed by the laws of India. Any disputes will be resolved in the courts of Mumbai, Maharashtra. If any provision is found unenforceable, the remaining terms remain in effect.`
    }
  ];

  const tableOfContents = sections.map(section => ({
    id: section.id,
    title: section.title
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <DocumentTextIcon className="w-16 h-16 mr-4" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Terms of Service</h1>
              <p className="text-xl">Multi Money Property Platform Agreement</p>
            </div>
          </div>
          <p className="text-lg max-w-3xl mx-auto">
            Please read these terms carefully before using our services. 
            By using MMP, you agree to these terms and conditions.
          </p>
          <div className="mt-6">
            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">
              Last Updated: {lastUpdated}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <InformationCircleIcon className="w-5 h-5 mr-2 text-blue-600" />
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Have questions about our terms?
                  </p>
                  <Link 
                    to="/contact"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Contact Support →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Important Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Important Notice</h3>
                    <p className="text-yellow-800 text-sm leading-relaxed">
                      These terms constitute a legally binding agreement between you and Multi Money Property. 
                      Please read them carefully and contact us if you have any questions before using our services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <div key={section.id} id={section.id} className="scroll-mt-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      {section.title}
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">Multi Money Property</p>
                      <p className="text-gray-600">MMP Tower, Business District</p>
                      <p className="text-gray-600">Mumbai - 400001, Maharashtra, India</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email: legal@multimoneyproperty.com</p>
                      <p className="text-gray-600">Phone: +91 88888 88888</p>
                      <p className="text-gray-600">Business Hours: Mon-Sat, 9AM-6PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agreement Confirmation */}
              <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Agreement Acceptance</h4>
                    <p className="text-green-800 text-sm">
                      By continuing to use Multi Money Property services, you acknowledge that you have 
                      read, understood, and agree to be bound by these Terms of Service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
