import React, { useState, useEffect, useRef } from 'react';
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
  CurrencyRupeeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import mmp_imag from "../assets/registerimg/form_img.avif"

const About = () => {
  // Color constants
  const colors = {
    background: '#f7f7f7',
    primary: '#F99c00',
    secondary: '#154056'
  };

  // Auto-slide state
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [stats, setStats] = useState([
    { icon: HomeIcon, label: 'Properties Listed', value: 0, target: 50000, color: 'bg-[#F99c00]' },
    { icon: UsersIcon, label: 'Happy Customers', value: 0, target: 25000, color: 'bg-[#154056]' },
    { icon: UserGroupIcon, label: 'Verified Brokers', value: 0, target: 500, color: 'bg-[#F99c00]' },
    { icon: GlobeAltIcon, label: 'Cities Covered', value: 0, target: 50, color: 'bg-[#154056]' }
  ]);

  // Company Statistics with count-up animation
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.target / steps;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(Math.floor(increment * currentStep), stat.target);
        
        setStats(prev => prev.map((s, i) => 
          i === index ? { ...s, value: newValue } : s
        ));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, []);

  // Auto-slide for milestones
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMilestone((prev) => (prev + 1) % milestones.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-slide for team
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTeam((prev) => (prev + 1) % team.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Manual navigation for milestones
  const nextMilestone = () => {
    setCurrentMilestone((prev) => (prev + 1) % milestones.length);
  };

  const prevMilestone = () => {
    setCurrentMilestone((prev) => (prev - 1 + milestones.length) % milestones.length);
  };

  // Manual navigation for team
  const nextTeam = () => {
    setCurrentTeam((prev) => (prev + 1) % team.length);
  };

  const prevTeam = () => {
    setCurrentTeam((prev) => (prev - 1 + team.length) % team.length);
  };

  // Core Values
  const values = [
    {
      icon: HeartIcon,
      title: 'Customer First',
      description: 'We prioritize our customers\' needs and satisfaction above everything else.',
      color: 'bg-[#F99c00]'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Trust & Transparency',
      description: 'We maintain complete transparency in all our dealings and build trust through honesty.',
      color: 'bg-[#154056]'
    },
    {
      icon: TrophyIcon,
      title: 'Excellence',
      description: 'We strive for excellence in every service we provide and continuously improve.',
      color: 'bg-[#F99c00]'
    },
    {
      icon: ChartBarIcon,
      title: 'Innovation',
      description: 'We embrace technology and innovation to provide cutting-edge solutions.',
      color: 'bg-[#154056]'
    }
  ];

  // Leadership Team
  const team = [
    {
      name: 'Rajesh Sharma',
      position: 'Founder & CEO',
      image: 'https://ui-avatars.com/api/?name=Rajesh+Sharma&background=F99c00&color=fff&size=150',
      bio: '15+ years experience in real estate and technology. Previously led PropTech initiatives at leading firms.',
      linkedin: '#',
      email: 'rajesh@multimoneyproperty.com'
    },
    {
      name: 'Priya Gupta',
      position: 'Chief Technology Officer',
      image: 'https://ui-avatars.com/api/?name=Priya+Gupta&background=154056&color=fff&size=150',
      bio: 'Expert in scalable technology solutions with 12+ years in fintech and proptech industries.',
      linkedin: '#',
      email: 'priya@multimoneyproperty.com'
    },
    {
      name: 'Amit Patel',
      position: 'Head of Operations',
      image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=F99c00&color=fff&size=150',
      bio: 'Specializes in business operations and process optimization. 10+ years in real estate operations.',
      linkedin: '#',
      email: 'amit@multimoneyproperty.com'
    },
    {
      name: 'Sneha Kumar',
      position: 'Head of Customer Success',
      image: 'https://ui-avatars.com/api/?name=Sneha+Kumar&background=154056&color=fff&size=150',
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
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Hero Section */}
      <section 
        className="text-white py-20 bg-[#ff9c00]"
        style={{
          backgroundImage: `url(${mmp_imag})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="text-left">
              <h1 className="property-hero-title lg:text-5xl  font-bold mb-2">Multi Money Property</h1>
              <p className=" lg:text-xl opacity-90 text-center ">Built for the Dream of Every Real Estate Professional</p>
            </div>
          </div>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-95">
            <span className='text-[#ff9c00]'>Every broker,</span> every builder, every channel partner has the same dream — to close more deals, 
            faster, without wasting time and money. MMP was born to make this dream a reality.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl property-hero-title font-bold mb-4" style={{ color: colors.secondary }}>
              🌟 The Story of MMP
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4" style={{ borderColor: colors.primary }}>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Every broker, every builder, every channel partner has the same dream — to close more deals, faster, without wasting time and money.
                </p>
                
                <p className="font-semibold text-gray-900">
                  But the reality?
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Hours wasted chasing fake leads.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Money burned on ads that don't bring the right buyers.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Endless calls, but very few conversions.
                  </li>
                </ul>

                <p className="font-semibold" style={{ color: colors.primary }}>
                  👉 This is where MMP was born.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg border">
                  <p className="italic text-gray-600 mb-4">
                    One of our founders once sat with a channel partner in Noida who said,
                  </p>
                  <p className="font-semibold text-gray-800 text-center">
                    "Bhai, humare paas buyers ke calls kam hai, aur jo aate hain woh bhi genuine nahin hote. 
                    Agar asli buyer ka lead mil jaaye toh kaam asaan ho jaaye."
                  </p>
                </div>

                <p>
                  That one line sparked the idea: <strong>Why not create a platform where brokers & builders don't have to search for buyers — buyers come directly to them?</strong>
                </p>

                <p>
                  And so, MMP started with a mission:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                    <CheckCircleIcon className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="font-semibold">Fresh, verified buyer leads</p>
                    <p className="text-sm text-gray-600">delivered straight to your dashboard</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <ShieldCheckIcon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="font-semibold">Fair & transparent system</p>
                    <p className="text-sm text-gray-600">no middlemen, no confusion</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <CurrencyRupeeIcon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <p className="font-semibold">Affordable pricing</p>
                    <p className="text-sm text-gray-600">so even small brokers can compete</p>
                  </div>
                </div>

                <div className="text-center mt-8 p-6 rounded-lg" style={{ backgroundColor: `${colors.secondary}10` }}>
                  <p className="text-xl font-bold mb-2" style={{ color: colors.secondary }}>
                    Today, MMP is more than a portal.
                  </p>
                  <p className="text-gray-700">
                    It's a partner in your growth. It's a promise that your hard work will meet the right opportunities. 
                    It's a bridge between buyers dreaming of their home and you, the professionals who make that dream real.
                  </p>
                </div>

                <div className="text-center mt-6">
                  <p className="text-lg font-semibold" style={{ color: colors.primary }}>
                    Because at the end of the day, real estate isn't just about property.
                  </p>
                  <p className="text-lg font-bold mt-2" style={{ color: colors.secondary }}>
                    👉 It's about trust, dreams, and connections.
                  </p>
                  <p className="text-xl font-bold mt-4" style={{ color: colors.primary }}>
                    And MMP is here to make those connections stronger.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl property-hero-title font-bold mb-4" style={{ color: colors.secondary }}>
              <span className='text-[#ff9c00]'>Our</span> Impact in Numbers
            </h2>
            <p className="text-gray-600 text-lg">Trusted by thousands across India</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: colors.secondary }}
                >
                  {stat.value.toLocaleString()}+
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8" style={{ color: colors.secondary }}>
                Our Mission & Vision
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border-[#ff9c00]">
                  <div className="flex items-center mb-4">
                    <div 
                      className="p-3 rounded-lg mr-4"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <TrophyIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: colors.secondary }}>
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    To democratize access to real estate opportunities by creating a transparent, 
                    efficient, and technology-driven platform that connects property seekers with 
                    verified professionals, ensuring every Indian has access to their dream property.
                  </p>
                </div>

                <div className=" p-6 rounded-xl shadow-lg bg-white border-[#ff9c00] shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div 
                      className="p-3 rounded-lg mr-4"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      <StarIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: colors.secondary }}>
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    To become India's most trusted and comprehensive real estate platform, 
                    where every property transaction is seamless, transparent, and delivers 
                    exceptional value to all stakeholders in the ecosystem.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="p-8 rounded-2xl bg-white border-[#ff9c00]   shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: colors.secondary }}>
                Why Choose MMP?
              </h3>
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
                    <CheckCircleIcon 
                      className="w-5 h-5 mr-3 flex-shrink-0" 
                      style={{ color: colors.primary }}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold property-hero-title mb-4" style={{ color: colors.secondary }}>
              <span className='text-[#ff9c00]'>Our</span> Core Values
            </h2>
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
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.secondary }}>
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 property-hero-title">
              <span className='text-[#ff9c00]'>Our</span> Journey
            </h2>
            <p className="text-gray-600 text-lg">Key milestones in our growth story</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border-2" style={{ borderColor: colors.primary }}>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
                  {milestones[currentMilestone].year}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.secondary }}>
                  {milestones[currentMilestone].title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {milestones[currentMilestone].description}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevMilestone}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border"
              style={{ borderColor: colors.primary }}
            >
              <ChevronLeftIcon className="w-6 h-6" style={{ color: colors.primary }} />
            </button>
            <button 
              onClick={nextMilestone}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border"
              style={{ borderColor: colors.primary }}
            >
              <ChevronRightIcon className="w-6 h-6" style={{ color: colors.primary }} />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {milestones.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMilestone(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentMilestone 
                      ? 'bg-[#ff9c00]' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Carousel */}
      <section className="py-16" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 property-hero-title">
              <span className='text-[#ff9c00]'>Our</span> Leadership Team
            </h2>
            <p className="text-gray-600 text-lg">Meet the visionaries behind Multi Money Property</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border-2" style={{ borderColor: colors.secondary }}>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src={team[currentTeam].image} 
                    alt={team[currentTeam].name}
                    className="w-32 h-32 rounded-full object-cover border-4"
                    style={{ borderColor: colors.primary }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: colors.secondary }}>
                    {team[currentTeam].name}
                  </h3>
                  <div className="text-lg mb-4" style={{ color: colors.primary }}>
                    {team[currentTeam].position}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {team[currentTeam].bio}
                  </p>
                  <div className="flex justify-center md:justify-start space-x-4">
                    <a 
                      href={`mailto:${team[currentTeam].email}`}
                      className="text-sm text-gray-600 hover:text-[#ff9c00] transition-colors"
                    >
                      {team[currentTeam].email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevTeam}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border"
              style={{ borderColor: colors.secondary }}
            >
              <ChevronLeftIcon className="w-6 h-6" style={{ color: colors.secondary }} />
            </button>
            <button 
              onClick={nextTeam}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border"
              style={{ borderColor: colors.secondary }}
            >
              <ChevronRightIcon className="w-6 h-6" style={{ color: colors.secondary }} />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {team.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTeam(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTeam 
                      ? 'bg-[#154056]' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 property-hero-title" >
             <span className='text-[#ff9c00]'>Our</span> Services
            </h2>
            <p className="text-gray-600 text-lg">Comprehensive solutions for all your real estate needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-[#ff9c00]">
                <h3 className="text-2xl font-bold mb-3" style={{ color: colors.secondary }}>
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircleIcon 
                        className="w-5 h-5 mr-3 flex-shrink-0"
                        style={{ color: colors.primary }}
                      />
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
      <section 
        className="py-16 "
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="property-hero-title text-[#ff9c00] mb-4">Ready to Start Your Property <span className='text-[#154056]'>Journey?</span></h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Join thousands of satisfied customers who have found their perfect properties through MMP
          </p>
          
          <div className="space-x-4">
            <a
              href="/requirement-form"
              className="bg-[#ff9c00] text-white  px-8 py-3 rounded-lg font-semibold hover:bg-[#154056] transition-colors inline-block"
            >
              Submit Your Requirements
            </a>
            <a
              href="/contact"
              className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#ff9c00] transition-colors inline-block"
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