import React, { useState } from "react";

export default function BrokerProfile() {
  // Dummy initial profile data
  const [profile, setProfile] = useState({
    name: "Shyam Makwana",
    company: "ABC Realty",
    city: "Ahmedabad",
    areasOfInterest: "Residential, Commercial",
    whatsapp: "9999988888",
  });

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved (dummy). Implement API call here.");
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={profile.company}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={profile.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Areas of Interest</label>
          <input
            type="text"
            name="areasOfInterest"
            value={profile.areasOfInterest}
            onChange={handleChange}
            placeholder="e.g., Residential, Commercial"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">WhatsApp Number</label>
          <input
            type="text"
            name="whatsapp"
            value={profile.whatsapp}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
