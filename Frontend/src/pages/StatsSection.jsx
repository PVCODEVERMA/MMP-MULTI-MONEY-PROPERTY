
// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   UsersIcon, 
//   BuildingOfficeIcon, 
//   CurrencyRupeeIcon, 
//   StarIcon,
//   TrophyIcon,
//   HeartIcon
// } from '@heroicons/react/24/outline';

// const StatsSection = () => {
//   const stats = [
//     {
//       id: 1,
//       title: "Happy Brokers",
//       value: "2,500+",
//       icon: <UsersIcon className="w-8 h-8" />,
//       color: "from-blue-500 to-cyan-500",
//       description: "Active verified brokers"
//     },
//     {
//       id: 2,
//       title: "Properties Listed",
//       value: "15,000+",
//       icon: <BuildingOfficeIcon className="w-8 h-8" />,
//       color: "from-emerald-500 to-teal-500",
//       description: "Premium properties available"
//     },
//     {
//       id: 3,
//       title: "Revenue Generated",
//       value: "₹50Cr+",
//       icon: <CurrencyRupeeIcon className="w-8 h-8" />,
//       color: "from-orange-500 to-red-500",
//       description: "For our broker partners"
//     },
//     {
//       id: 4,
//       title: "Success Rate",
//       value: "95%",
//       icon: <TrophyIcon className="w-8 h-8" />,
//       color: "from-purple-500 to-pink-500",
//       description: "Lead conversion rate"
//     },
//     {
//       id: 5,
//       title: "Customer Rating",
//       value: "4.9★",
//       icon: <StarIcon className="w-8 h-8" />,
//       color: "from-yellow-500 to-amber-500",
//       description: "Average broker rating"
//     },
//     {
//       id: 6,
//       title: "Client Satisfaction",
//       value: "98%",
//       icon: <HeartIcon className="w-8 h-8" />,
//       color: "from-rose-500 to-pink-500",
//       description: "Happy customers"
//     }
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Trusted by Thousands
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Join the largest community of successful real estate brokers in India
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={stat.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               whileHover={{ scale: 1.05, y: -5 }}
//               className="group relative"
//             >
//               <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
//                 {/* Gradient Background */}
//                 <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
//                 {/* Icon */}
//                 <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                   {stat.icon}
//                 </div>
                
//                 {/* Content */}
//                 <div className="relative z-10">
//                   <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
//                     {stat.value}
//                   </h3>
//                   <p className="text-lg font-semibold text-gray-800 mb-2">
//                     {stat.title}
//                   </p>
//                   <p className="text-gray-600">
//                     {stat.description}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StatsSection;
