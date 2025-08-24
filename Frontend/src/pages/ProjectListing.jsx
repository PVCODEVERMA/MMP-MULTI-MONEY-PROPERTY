import React from "react";

const dummyProjects = [
  {
    id: 1,
    name: "Godrej Greens",
    city: "Ahmedabad",
    priceRange: "₹60L - 1.2Cr",
    featured: true,
    photo: "",
  },
  {
    id: 2,
    name: "DLF Park",
    city: "Gurgaon",
    priceRange: "₹80L - 2.0Cr",
    featured: false,
    photo: "",
  },
  {
    id: 3,
    name: "Sobha Elite",
    city: "Bangalore",
    priceRange: "₹1Cr - 3Cr",
    featured: true,
    photo: "",
  },
  {
    id: 4,
    name: "Brigade Metropolis",
    city: "Chennai",
    priceRange: "₹70L - 1.5Cr",
    featured: false,
    photo: "https://via.placeholder.com/400x200?text=Brigade+Metropolis",
  },
];

export default function ProjectListing() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Project Listings</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {dummyProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img
                src={project.photo}
                alt={project.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {project.featured && (
                <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                  ★ Featured
                </span>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{project.name}</h2>
              <p className="text-gray-600">{project.city}</p>
              <p className="text-green-700 font-bold mt-2">{project.priceRange}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
