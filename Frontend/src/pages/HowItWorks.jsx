// pages/HowItWorks.js
import React, { useState } from 'react';
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  MagnifyingGlassIcon,
  PhoneIcon,
  CheckCircleIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const userJourney = [
    {
      title: "Submit Requirements",
      description: "Tell us what type of property you're looking for",
      icon: MagnifyingGlassIcon,
      color: "bg-blue-500",
      steps: [
        "Fill out our simple property requirement form",
        "Specify your budget, location preferences, and property type",
        "Add any special requirements or amenities you need",
        "Our system automatically scores and categorizes your lead"
      ],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"
    },
    {
      title: "Verification Process", 
      description: "We verify and quality-check all requirements",
      icon: ShieldCheckIcon,
      color: "bg-green-500",
      steps: [
        "Our team reviews your requirements for completeness",
        "We verify your contact information and preferences",
        "Requirements are matched with our property database",
        "Quality score is assigned based on lead potential"
      ],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400"
    },
    {
      title: "Broker Matching",
      description: "Connected with verified, specialized brokers",
      icon: UserIcon, 
      color: "bg-purple-500",
      steps: [
        "System matches you with 3 qualified brokers",
        "Brokers are selected based on location and specialization",
        "Only active, high-performing brokers receive your lead",
        "Brokers are notified instantly via multiple channels"
      ],
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400"
    },
    {
      title: "Property Recommendations",
      description: "Receive personalized property suggestions",
      icon: BuildingOfficeIcon,
      color: "bg-orange-500", 
      steps: [
        "Brokers contact you within 2 hours with suitable options",
        "Receive curated property recommendations via WhatsApp/email",
        "Schedule property visits at your convenience", 
        "Get expert advice on market trends and pricing"
      ],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"
    },
    {
      title: "Successful Closure",
      description: "Complete your property journey with expert support",
      icon: CheckCircleIcon,
      color: "bg-indigo-500",
      steps: [
        "Visit shortlisted properties with broker assistance",
        "Get help with negotiations and paperwork",
        "Receive legal and financial guidance throughout",
        "Close the deal with complete peace of mind"
      ],
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400"
    }
  ];

  const brokerProcess = [
    {
      title: "Registration & Verification",
      description: "Join our network of verified professionals",
      steps: [
        "Submit broker registration with required documents",
        "Upload real estate license and certification",
        "Complete profile with specialization and experience",
        "Undergo verification process (24-48 hours)"
      ]
    },
    {
      title: "Package Selection",
      description: "Choose the right package for your business needs",
      steps: [
        "Browse available lead packages and pricing",
        "Select package based on lead volume requirements",
        "Make secure payment through integrated gateway",
        "Receive lead credits in your account instantly"
      ]
    },
    {
      title: "Lead Distribution",
      description: "Start receiving quality leads in your area",
      steps: [
        "Receive real-time notifications for new leads",
        "Access detailed client requirements and contact info",
        "View lead quality score and budget information",
        "Get maximum 3 leads shared per requirement"
      ]
    },
    {
      title: "Client Conversion",
      description: "Convert leads into successful transactions",
      steps: [
        "Contact clients within 2-hour SLA commitment",
        "Provide personalized property recommendations",
        "Schedule and conduct property visits",
        "Close deals and earn commission"
      ]
    }
  ];

  const features = [
    {
      icon: ClockIcon,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your queries"
    },
    {
      icon: ShieldCheckIcon, 
      title: "Verified Brokers",
      description: "All brokers are verified and certified professionals"
    },
    {
      icon: CurrencyRupeeIcon,
      title: "Transparent Pricing",
      description: "No hidden costs, clear pricing for all services"
    },
    {
      icon: CheckCircleIcon,
      title: "Quality Assurance",
      description: "Quality checks on all leads and property information"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Properties Listed" },
    { number: "500+", label: "Verified Brokers" }, 
    { number: "25,000+", label: "Happy Customers" },
    { number: "50+", label: "Cities Covered" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">How MMP Works</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover how our platform connects property seekers with verified brokers 
            for a seamless real estate experience
          </p>
          <div className="flex justify-center">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center">
              <PlayIcon className="w-5 h-5 mr-2" />
              Watch Demo Video
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* For Property Seekers */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">For Property Seekers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From submitting your requirements to finding your dream property, 
              here's how our process works for you
            </p>
          </div>

          {/* Interactive Step Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {userJourney.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeStep === index
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {index + 1}. {step.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Detail */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 ${userJourney[activeStep].color} rounded-full flex items-center justify-center mr-4`}>
                    {/* <userJourney[activeStep].icon className="w-8 h-8 text-white" /> */}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{userJourney[activeStep].title}</h3>
                    <p className="text-gray-600">{userJourney[activeStep].description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {userJourney[activeStep].steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                        <CheckCircleIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <img 
                  src={userJourney[activeStep].image}
                  alt={userJourney[activeStep].title}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {userJourney.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
                {index < userJourney.length - 1 && (
                  <ArrowRightIcon className="w-6 h-6 text-gray-400 mx-auto mt-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* For Brokers */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">For Real Estate Brokers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network of verified professionals and start receiving 
              quality leads in your area of expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brokerProcess.map((process, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                  {index + 1}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{process.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{process.description}</p>
                <ul className="space-y-2">
                  {process.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MMP?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our comprehensive platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and verified brokers on India's 
            leading property platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Submit Property Requirements
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors">
              Join as Broker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
