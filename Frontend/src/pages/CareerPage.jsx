// // pages/CareerPage.js
// import React, { useState } from 'react';
// import { 
//   BriefcaseIcon, 
//   MapPinIcon, 
//   ClockIcon,
//   CurrencyRupeeIcon,
//   UserGroupIcon,
//   AcademicCapIcon,
//   StarIcon,
//   ArrowRightIcon,
//   CheckCircleIcon,
//   BuildingOfficeIcon, 
//   HeartIcon,
//   GlobeAltIcon,
//   EnvelopeIcon,
//   PhoneIcon
// } from '@heroicons/react/24/outline';

// const CareerPage = () => {
//   const [selectedDepartment, setSelectedDepartment] = useState('all');
//   const [selectedLocation, setSelectedLocation] = useState('all');
//   const [selectedType, setSelectedType] = useState('all');

//   // Mock job listings
//   const jobs = [
//     {
//       id: 1,
//       title: "Senior Real Estate Sales Manager",
//       department: "Sales",
//       location: "Mumbai",
//       type: "Full-time",
//       experience: "5-8 years",
//       salary: "₹8-12 LPA",
//       postedDate: "2025-08-20",
//       description: "Lead sales operations and manage high-value property transactions. Drive revenue growth and build lasting client relationships.",
//       requirements: [
//         "5+ years experience in real estate sales",
//         "Proven track record in luxury property sales",
//         "Strong negotiation and communication skills",
//         "Bachelor's degree in Business or related field"
//       ],
//       benefits: [
//         "Performance-based incentives",
//         "Health insurance",
//         "Flexible working hours",
//         "Career growth opportunities"
//       ],
//       skills: ["Sales Management", "Client Relations", "Market Analysis", "Lead Generation"],
//       urgent: true
//     },
//     {
//       id: 2,
//       title: "PropTech Developer",
//       department: "Technology",
//       location: "Bangalore",
//       type: "Full-time",
//       experience: "3-5 years",
//       salary: "₹12-18 LPA",
//       postedDate: "2025-08-18",
//       description: "Develop cutting-edge technology solutions for our real estate platform. Work with modern tech stack including React, Node.js, and cloud technologies.",
//       requirements: [
//         "3+ years experience in full-stack development",
//         "Proficiency in React, Node.js, MongoDB",
//         "Experience with cloud platforms (AWS/Azure)",
//         "Understanding of real estate industry is a plus"
//       ],
//       benefits: [
//         "Competitive salary package",
//         "Stock options",
//         "Learning & development budget",
//         "Modern office amenities"
//       ],
//       skills: ["React", "Node.js", "MongoDB", "AWS", "PropTech"],
//       urgent: false
//     },
//     {
//       id: 3,
//       title: "Digital Marketing Specialist",
//       department: "Marketing",
//       location: "Delhi",
//       type: "Full-time",
//       experience: "2-4 years",
//       salary: "₹6-10 LPA",
//       postedDate: "2025-08-15",
//       description: "Drive digital marketing initiatives to enhance brand visibility and generate quality leads. Manage campaigns across multiple digital channels.",
//       requirements: [
//         "2+ years experience in digital marketing",
//         "Expertise in Google Ads, Facebook Ads, SEO",
//         "Experience with marketing automation tools",
//         "Strong analytical and creative skills"
//       ],
//       benefits: [
//         "Creative freedom",
//         "Professional development",
//         "Team outings",
//         "Performance bonuses"
//       ],
//       skills: ["Digital Marketing", "SEO", "Google Ads", "Content Strategy"],
//       urgent: false
//     }
//   ];

//   const departments = ["All Departments", "Sales", "Technology", "Marketing", "Business Development", "Customer Success", "Design"];
//   const locations = ["All Locations", "Mumbai", "Delhi", "Bangalore", "Pune", "Remote"];
//   const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Intern"];

//   const companyBenefits = [
//     {
//       icon: CurrencyRupeeIcon,
//       title: "Competitive Compensation",
//       description: "Market-leading salaries with performance bonuses and stock options"
//     },
//     {
//       icon: HeartIcon,
//       title: "Health & Wellness",
//       description: "Comprehensive health insurance and wellness programs for you and your family"
//     },
//     {
//       icon: AcademicCapIcon,
//       title: "Learning & Development",
//       description: "Continuous learning opportunities with certification support and conferences"
//     },
//     {
//       icon: ClockIcon,
//       title: "Work-Life Balance",
//       description: "Flexible working hours and remote work options for better work-life integration"
//     },
//     {
//       icon: UserGroupIcon,
//       title: "Great Team Culture",
//       description: "Collaborative environment with team building activities and inclusive culture"
//     },
//     {
//       icon: GlobeAltIcon,
//       title: "Growth Opportunities",
//       description: "Clear career progression paths with opportunities to lead and innovate"
//     }
//   ];

//   const filteredJobs = jobs.filter(job => {
//     const matchesDepartment = selectedDepartment === 'all' || selectedDepartment === 'All Departments' || job.department === selectedDepartment;
//     const matchesLocation = selectedLocation === 'all' || selectedLocation === 'All Locations' || job.location === selectedLocation;
//     const matchesType = selectedType === 'all' || selectedType === 'All Types' || job.type === selectedType;
//     return matchesDepartment && matchesLocation && matchesType;
//   });

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const JobCard = ({ job }) => (
//     <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
//       <div className="flex items-start justify-between mb-4">
//         <div>
//           <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
//           <div className="flex items-center text-gray-600 space-x-4 text-sm">
//             <div className="flex items-center">
//               <BuildingOfficeIcon className="w-4 h-4 mr-1" />
//               {job.department}
//             </div>
//             <div className="flex items-center">
//               <MapPinIcon className="w-4 h-4 mr-1" />
//               {job.location}
//             </div>
//             <div className="flex items-center">
//               <ClockIcon className="w-4 h-4 mr-1" />
//               {job.type}
//             </div>
//           </div>
//         </div>
//         {job.urgent && (
//           <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
//             Urgent
//           </span>
//         )}
//       </div>

//       <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <span className="text-gray-500 text-sm">Experience:</span>
//           <span className="font-medium text-gray-900 ml-2">{job.experience}</span>
//         </div>
//         <div>
//           <span className="text-gray-500 text-sm">Salary:</span>
//           <span className="font-medium text-green-600 ml-2">{job.salary}</span>
//         </div>
//       </div>

//       <div className="mb-4">
//         <div className="flex flex-wrap gap-2">
//           {job.skills.slice(0, 4).map((skill, index) => (
//             <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
//               {skill}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//         <span className="text-gray-500 text-sm">
//           Posted on {formatDate(job.postedDate)}
//         </span>
//         <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center">
//           Apply Now
//           <ArrowRightIcon className="w-4 h-4 ml-2" />
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
//           <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
//             Be part of India's leading property technology company and shape the future of real estate
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
//               View Open Positions
//             </button>
//             <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors">
//               Learn About Us
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Company Stats */}
//       <div className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             <div>
//               <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
//               <div className="text-gray-600">Team Members</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
//               <div className="text-gray-600">Cities</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-orange-600 mb-2">4.8/5</div>
//               <div className="text-gray-600">Employee Rating</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
//               <div className="text-gray-600">Retention Rate</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-12">
//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <select
//               value={selectedDepartment}
//               onChange={(e) => setSelectedDepartment(e.target.value)}
//               className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             >
//               {departments.map(dept => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>

//             <select
//               value={selectedLocation}
//               onChange={(e) => setSelectedLocation(e.target.value)}
//               className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             >
//               {locations.map(location => (
//                 <option key={location} value={location}>{location}</option>
//               ))}
//             </select>

//             <select
//               value={selectedType}
//               onChange={(e) => setSelectedType(e.target.value)}
//               className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             >
//               {jobTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Job Listings */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Open Positions ({filteredJobs.length})
//               </h2>
//             </div>

//             <div className="space-y-6">
//               {filteredJobs.map(job => (
//                 <JobCard key={job.id} job={job} />
//               ))}
//             </div>

//             {filteredJobs.length === 0 && (
//               <div className="text-center py-12">
//                 <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-600 mb-2">No positions found</h3>
//                 <p className="text-gray-500 mb-6">Try adjusting your filter criteria</p>
//                 <button 
//                   onClick={() => {
//                     setSelectedDepartment('all');
//                     setSelectedLocation('all');
//                     setSelectedType('all');
//                   }}
//                   className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="space-y-8">
//               {/* Why Join Us */}
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Why Join MMP?</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-start">
//                     <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <h4 className="font-medium text-gray-900">Innovation First</h4>
//                       <p className="text-sm text-gray-600">Work with cutting-edge technology in PropTech</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <h4 className="font-medium text-gray-900">Growth Opportunities</h4>
//                       <p className="text-sm text-gray-600">Fast-track your career with diverse challenges</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <h4 className="font-medium text-gray-900">Impact at Scale</h4>
//                       <p className="text-sm text-gray-600">Shape the future of real estate in India</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Application Tips */}
//               <div className="bg-blue-50 rounded-xl p-6">
//                 <h3 className="text-lg font-bold text-blue-900 mb-4">Application Tips</h3>
//                 <div className="space-y-3 text-sm text-blue-800">
//                   <div className="flex items-start">
//                     <StarIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
//                     <span>Customize your resume for each position</span>
//                   </div>
//                   <div className="flex items-start">
//                     <StarIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
//                     <span>Highlight relevant experience and achievements</span>
//                   </div>
//                   <div className="flex items-start">
//                     <StarIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
//                     <span>Include a compelling cover letter</span>
//                   </div>
//                   <div className="flex items-start">
//                     <StarIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
//                     <span>Showcase your portfolio for design/tech roles</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact HR */}
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Have Questions?</h3>
//                 <p className="text-gray-600 mb-4 text-sm">
//                   Our HR team is here to help with any questions about our open positions or application process.
//                 </p>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-center text-gray-600">
//                     <EnvelopeIcon className="w-4 h-4 mr-2" />
//                     careers@multimoneyproperty.com
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <PhoneIcon className="w-4 h-4 mr-2" />
//                     +91 88888 88888 (HR Desk)
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Benefits Section */}
//         <div className="mt-16">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Our Team Loves Working Here</h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               We believe in creating an environment where our team can thrive professionally and personally
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {companyBenefits.map((benefit, index) => (
//               <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
//                 <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <benefit.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
//                 <p className="text-gray-600">{benefit.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-8 text-center">
//           <h3 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h3>
//           <p className="text-lg mb-6 max-w-2xl mx-auto">
//             Join us in revolutionizing India's real estate industry with innovative technology and exceptional service.
//           </p>
//           <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//             Browse All Openings
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CareerPage;
