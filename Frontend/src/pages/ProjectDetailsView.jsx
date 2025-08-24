import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPinIcon,
  StarIcon,
  HomeIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserGroupIcon,
  CalendarIcon,
  HeartIcon as HeartSolidIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";

import img01 from "../assets/projectview/id_01.avif"
import img02 from "../assets/projectview/id_02.avif"
import img03 from "../assets/projectview/id_03.avif"

// Import the same project data (or you might want to move this to a shared file)
const projectsData = [
  { 
    id: 1, 
    name: "Godrej Greens", 
    city: "Ahmedabad", 
    area: "Prahlad Nagar",
    priceRange: "₹60L - 1.2Cr", 
    description: "Luxury apartments with modern amenities and green spaces",
    photo: img01,
    type: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    size: "1200 sq ft",
    featured: true,
    sponsored: false,
    leads: 42,
    date: "2023-10-15",
    developer: "Godrej Properties",
    status: "Under Construction",
    possession: "Dec 2024",
    amenities: ["Swimming Pool", "Gym", "Park", "Clubhouse", "Children's Play Area", "24/7 Security"],
    overview: "Godrej Greens offers luxurious 3 BHK apartments in the prime location of Prahlad Nagar, Ahmedabad. The project is designed with modern architecture and offers a host of amenities for a comfortable lifestyle.",
    location: {
      latitude: 23.0225,
      longitude: 72.5714
    },
    images: [
      img02,
      img03,
      img01
    ]
  },
  // Include all other projects from your listing with additional details
  { 
    id: 2, 
    name: "DLF Park", 
    city: "Gurgaon", 
    area: "Sector 56",
    priceRange: "₹80L - 2.0Cr", 
    description: "Premium residential complex with world-class facilities",
    photo: img02,
    type: "villa",
    bedrooms: 4,
    bathrooms: 3,
    size: "2400 sq ft",
    featured: true,
    sponsored: true,
    leads: 38,
    date: "2023-11-05",
    developer: "DLF Limited",
    status: "Ready to Move",
    possession: "Immediate",
    amenities: ["Swimming Pool", "Gym", "Park", "Clubhouse", "Tennis Court", "24/7 Security", "Power Backup"],
    overview: "DLF Park offers luxurious villas in the prime sector 56 of Gurgaon. The project is designed with modern architecture and offers a host of amenities for a comfortable lifestyle.",
    location: {
      latitude: 28.4595,
      longitude: 77.0266
    },
    images: [
      img01,
      img02,
      img03
    ]
  },
  // Add similar details for other projects...
];

const getPropertyTypeIcon = (type) => {
  switch(type) {
    case "apartment": return <BuildingOfficeIcon className="h-5 w-5" />;
    case "villa": return <HomeIcon className="h-5 w-5" />;
    case "penthouse": return <BuildingStorefrontIcon className="h-5 w-5" />;
    default: return <HomeIcon className="h-5 w-5" />;
  }
};

const ProjectDetailsView = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Find the project with the matching ID
    const foundProject = projectsData.find(p => p.id === parseInt(id));
    setProject(foundProject);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 mb-2">Project Not Found</div>
          <Link to="/projects" className="text-indigo-600 hover:text-indigo-800">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/projects" 
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back to Projects
            </Link>
            
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center text-gray-500 hover:text-red-500"
            >
              {isFavorite ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartOutlineIcon className="h-6 w-6" />
              )}
              <span className="ml-1">{isFavorite ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <div className="flex items-center text-gray-600 mt-2">
            <MapPinIcon className="h-5 w-5 mr-1" />
            <span>{project.area}, {project.city}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <img 
              src={project.images ? project.images[activeImage] : project.photo} 
              alt={project.name} 
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(project.images || [project.photo]).slice(0, 4).map((img, index) => (
              <div 
                key={index} 
                className={`cursor-pointer ${activeImage === index ? 'ring-2 ring-indigo-500' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={img} 
                  alt={`${project.name} ${index + 1}`} 
                  className="w-full h-44 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8 cursor-pointer">
                {['overview', 'amenities', 'location', 'floor-plans'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 cursor-pointer">Overview</h2>
                <p className="text-gray-700 mb-6">{project.overview || project.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-indigo-700">{project.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-indigo-700">{project.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-indigo-700">{project.size}</div>
                    <div className="text-sm text-gray-600">Size</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-lg font-bold text-indigo-700">{project.status}</div>
                    <div className="text-sm text-gray-600">Status</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full mr-2"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">Map would be displayed here</p>
                </div>
                <div className="mt-4">
                  <p className="font-medium">Address:</p>
                  <p className="text-gray-600">{project.area}, {project.city}</p>
                </div>
              </div>
            )}

            {activeTab === 'floor-plans' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Floor Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">2 BHK Floor Plan</p>
                  </div>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">3 BHK Floor Plan</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <div className="mb-6">
                <span className="text-2xl font-bold text-indigo-700">{project.priceRange}</span>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Property Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium">{project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Developer</span>
                    <span className="font-medium">{project.developer || "Unknown"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Possession</span>
                    <span className="font-medium">{project.possession || "TBA"}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Contact Developer</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                    <PhoneIcon className="h-5 w-5" />
                    Call Now
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
                    <EnvelopeIcon className="h-5 w-5" />
                    Email
                  </button>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    <span>{project.leads} leads</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>Added {new Date(project.date).toLocaleDateString()}</span>
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

export default ProjectDetailsView;