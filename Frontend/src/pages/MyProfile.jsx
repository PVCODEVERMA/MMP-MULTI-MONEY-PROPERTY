import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeftIcon,
  UserIcon,
  BuildingStorefrontIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import pv from "../assets/OurCustomersImg/pv.jpg"

const MyProfile = () => {
  // Mock user data - in a real app, this would come from authentication context or API
  const [user, setUser] = useState({
    name: "Rajesh Kumar",
    company: "Elite Properties",
    role: "Broker",
    phone: "+91 98765 43210",
    email: "rajesh@example.com",
    city: "Mumbai",
    areas: "Andheri, Bandra, Juhu",
    profileImage: pv
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser({ ...editedUser });
    setIsEditing(false);
    // In a real app, you would make an API call here to update the user profile
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-700 text-white py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-blue-100 hover:text-white">
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
          >
            {isEditing ? (
              <>
                <XMarkIcon className="w-5 h-5 mr-1" />
                Cancel
              </>
            ) : (
              <>
                <PencilSquareIcon className="w-5 h-5 mr-1" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-400 p-2 rounded-full text-white shadow-md">
                    <PencilSquareIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="ml-6">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold bg-blue-500 border-none rounded px-3 py-1 text-white placeholder-blue-200 mb-2 w-full"
                    placeholder="Full Name"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                )}
                <div className="flex items-center mt-1">
                  <UserIcon className="w-5 h-5 mr-1 text-blue-200" />
                  <span className="text-blue-200">{user.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editedUser.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{user.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center">
                        <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <p className="text-gray-800">{user.email}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editedUser.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center">
                        <PhoneIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <p className="text-gray-800">{user.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <BuildingStorefrontIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Professional Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="company"
                        value={editedUser.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{user.company}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={editedUser.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <p className="text-gray-800">{user.city}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Areas of Operation</label>
                    {isEditing ? (
                      <textarea
                        name="areas"
                        value={editedUser.areas}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter areas separated by commas"
                      />
                    ) : (
                      <p className="text-gray-800">{user.areas}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Save/Cancel Buttons (only visible in edit mode) */}
            {isEditing && (
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <CheckIcon className="w-5 h-5 mr-1" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Profile Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Status */}
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Status</h3>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-600">Active</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Your account is in good standing</p>
          </div>

          {/* Membership Plan */}
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Membership Plan</h3>
            <div className="flex justify-between items-center">
              <span className="font-medium text-blue-600">Premium Broker</span>
              <Link to="/plans" className="text-sm text-blue-500 hover:text-blue-700">
                Upgrade Plan
              </Link>
            </div>
            <div className="mt-3 bg-gray-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">45 of 60 leads used this month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;