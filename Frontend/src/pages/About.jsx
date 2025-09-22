
import React from 'react';
import { 
  BuildingOfficeIcon,
  UserGroupIcon,
  TrophyIcon,
  HeartIcon,
  CheckCircleIcon,
  StarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UsersIcon,
  HomeIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

const About = () => {
  // Company Statistics
  const stats = [
    { icon: HomeIcon, label: 'Properties Listed', value: '50,000+', color: 'bg-blue-500' },
    { icon: UsersIcon, label: 'Happy Customers', value: '25,000+', color: 'bg-green-500' },
    { icon: UserGroupIcon, label: 'Verified Brokers', value: '500+', color: 'bg-orange-500' },
    { icon: GlobeAltIcon, label: 'Cities Covered', value: '50+', color: 'bg-purple-500' }
  ];

  // Core Values
  const values = [
    {
      icon: HeartIcon,
      title: 'Customer First',
      description: 'We prioritize our customers\' needs and satisfaction above everything else.',
      color: 'bg-red-500'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Trust & Transparency',
      description: 'We maintain complete transparency in all our dealings and build trust through honesty.',
      color: 'bg-blue-500'
    },
    {
      icon: TrophyIcon,
      title: 'Excellence',
      description: 'We strive for excellence in every service we provide and continuously improve.',
      color: 'bg-yellow-500'
    },
    {
      icon: ChartBarIcon,
      title: 'Innovation',
      description: 'We embrace technology and innovation to provide cutting-edge solutions.',
      color: 'bg-green-500'
    }
  ];

  // Leadership Team
  const team = [
    {
      name: 'Rajesh Sharma',
      position: 'Founder & CEO',
      image: 'https://ui-avatars.com/api/?name=Rajesh+Sharma&background=f97316&color=fff&size=150',
      bio: '15+ years experience in real estate and technology. Previously led PropTech initiatives at leading firms.',
      linkedin: '#',
      email: 'rajesh@multimoneyproperty.com'
    },
    {
      name: 'Priya Gupta',
      position: 'Chief Technology Officer',
      image: 'https://ui-avatars.com/api/?name=Priya+Gupta&background=3b82f6&color=fff&size=150',
      bio: 'Expert in scalable technology solutions with 12+ years in fintech and proptech industries.',
      linkedin: '#',
      email: 'priya@multimoneyproperty.com'
    },
    {
      name: 'Amit Patel',
      position: 'Head of Operations',
      image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=10b981&color=fff&size=150',
      bio: 'Specializes in business operations and process optimization. 10+ years in real estate operations.',
      linkedin: '#',
      email: 'amit@multimoneyproperty.com'
    },
    {
      name: 'Sneha Kumar',
      position: 'Head of Customer Success',
      image: 'https://ui-avatars.com/api/?name=Sneha+Kumar&background=8b5cf6&color=fff&size=150',
      bio: 'Customer experience expert with proven track record in building customer-centric organizations.',
      linkedin: '#',
      email: 'sneha@multimoneyproperty.com'
    }
  ];

  // Company Milestones
  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Multi Money Property was established with a vision to revolutionize the real estate industry.'
    },
    {
      year: '2021',
      title: 'First 1,000 Properties',
      description: 'Reached our first milestone of 1,000 verified properties and 50 brokers on the platform.'
    },
    {
      year: '2022',
      title: 'Series A Funding',
      description: 'Secured ₹50 crores in Series A funding to expand operations across major Indian cities.'
    },
    {
      year: '2023',
      title: '10,000+ Customers',
      description: 'Served over 10,000 satisfied customers and expanded to 25 cities across India.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Launched AI-powered property matching and introduced advanced analytics for brokers.'
    },
    {
      year: '2025',
      title: 'Market Leadership',
      description: 'Became one of India\'s leading property tech platforms with 50+ cities and 500+ brokers.'
    }
  ];

  // Services Offered
  const services = [
    {
      title: 'Property Listing & Verification',
      description: 'Comprehensive property verification and professional listing services',
      features: ['Document Verification', 'Professional Photography', 'Legal Compliance Check', 'Market Valuation']
    },
    {
      title: 'Broker Network',
      description: 'Connect with verified and experienced real estate professionals',
      features: ['Verified Brokers', 'Performance Tracking', 'Lead Management', 'Commission Transparency']
    },
    {
      title: 'Lead Management',
      description: 'Advanced lead generation and distribution system',
      features: ['Quality Scoring', 'Automated Distribution', 'Real-time Notifications', 'Performance Analytics']
    },
    {
      title: 'Market Analytics',
      description: 'Data-driven insights for informed property decisions',
      features: ['Price Trends', 'Market Reports', 'Investment Analysis', 'ROI Calculations']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white p-4 rounded-xl shadow-lg mr-4">
              <span className="text-orange-500 font-black text-3xl">MMP</span>
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold mb-2">Multi Money Property</h1>
              <p className="text-xl text-blue-100">Transforming Real Estate with Technology</p>
            </div>
          </div>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing the real estate industry through innovative technology, 
            connecting property seekers with verified brokers and creating seamless 
            experiences for all stakeholders in the property ecosystem.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-600 text-lg">Trusted by thousands across India</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission & Vision</h2>
              
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-500 p-3 rounded-lg mr-4">
                      <TrophyIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    To democratize access to real estate opportunities by creating a transparent, 
                    efficient, and technology-driven platform that connects property seekers with 
                    verified professionals, ensuring every Indian has access to their dream property.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500 p-3 rounded-lg mr-4">
                      <StarIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    To become India's most trusted and comprehensive real estate platform, 
                    where every property transaction is seamless, transparent, and delivers 
                    exceptional value to all stakeholders in the ecosystem.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-blue-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose MMP?</h3>
              <div className="space-y-4">
                {[
                  'AI-powered property matching algorithm',
                  'Verified broker network with performance tracking',
                  'Comprehensive property verification process',
                  'Transparent pricing with no hidden costs',
                  '24/7 customer support across all channels',
                  'Advanced analytics and market insights',
                  'Mobile-first platform for on-the-go access'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do at Multi Money Property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-gray-600 text-lg">
              Experienced professionals driving innovation in real estate technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-orange-500 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                
                <div className="flex justify-center space-x-3">
                  <a
                    href={`mailto:${member.email}`}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    title="Email"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                  <a
                    href={member.linkedin}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    title="LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 text-lg">Key milestones in our growth story</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="text-orange-500 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg">Comprehensive solutions for all your real estate needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Property Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect properties through MMP
          </p>
          
          <div className="space-x-4">
            <a
              href="/requirement-form"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Submit Your Requirements
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors inline-block"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
