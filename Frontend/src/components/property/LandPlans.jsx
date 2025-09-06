import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeftIcon,
  MapIcon,
  HomeIcon,
  CurrencyRupeeIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { projectsData } from '../../data/projectsData.js';

const LandPlans = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === parseInt(id));
    setProject(foundProject);
  }, [id]);

  if (!project || !project.landPlans) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Land plans not available</h3>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Search
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Project Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.name}</h1>
          <p className="text-xl text-gray-600 mb-2">{project.area}, {project.city}</p>
          <p className="text-lg text-gray-600">Total Area: <span className="font-semibold text-green-600">{project.landPlans.totalArea}</span></p>
        </div>

        {/* Project Image */}
        <div className="mb-12">
          <img 
            src={project.photo} 
            alt={project.name}
            className="w-full h-80 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Plot Size Options */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Available Plot Sizes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.landPlans.plotSizes.map((size, index) => {
              const priceKey = size.replace(' ft', '').replace('x', 'x');
              const price = project.landPlans.pricing[priceKey] || "Price on Request";
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HomeIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{size}</h3>
                    <div className="text-3xl font-bold text-green-600">{price}</div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Plot Size:</span>
                      <span className="font-semibold">{size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Area (sq ft):</span>
                      <span className="font-semibold">
                        {size.split('x').reduce((a, b) => parseInt(a) * parseInt(b))} sq ft
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPlot({ size, price })}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Select Plot
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Amenities & Infrastructure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Amenities */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h3>
            <div className="space-y-3">
              {project.landPlans.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Infrastructure</h3>
            <div className="space-y-3">
              {project.landPlans.infrastructure.map((infra, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{infra}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location & Map */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MapIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <span className="text-lg font-semibold">{project.area}, {project.city}</span>
              </div>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Developer:</span>
                  <span className="font-semibold">{project.developer || "TBA"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold">{project.status || "TBA"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Area:</span>
                  <span className="font-semibold">{project.landPlans.totalArea}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-600">Interactive Map Coming Soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Modal */}
      {selectedPlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Plot Selection</h3>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Plot Size:</span>
                <span className="font-bold">{selectedPlot.size}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Price:</span>
                <span className="font-bold text-green-600">{selectedPlot.price}</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Contact Sales Team
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Schedule Site Visit
              </button>
            </div>
            
            <button
              onClick={() => setSelectedPlot(null)}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LandPlans;
