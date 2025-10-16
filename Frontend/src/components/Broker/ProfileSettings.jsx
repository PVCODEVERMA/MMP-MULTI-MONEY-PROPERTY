import React, { useState } from 'react';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    personal: {
      firstName: " ",
      lastName: " ",
      email: " ",
      phone: "+91 ",
      alternatePhone: "+91 ",
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      state: "", 
      pincode: ""
    },
    professional: {
      brokerId: " ",
      experience: " ",
      specialization: ["Residential", "Commercial"],
      licenseNumber: " ",
      licenseExpiry: " ",
      languages: [ ],
      bio: " ",
      areasServed: []
    },
    social: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: ""
    }
  });

  const handleInputChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsEditing(false);
    console.log('Saving profile data:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploading image:', file);
    }
  };

  const handleAddSpecialization = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const newSpecialization = [...profileData.professional.specialization, e.target.value.trim()];
      handleInputChange('professional', 'specialization', newSpecialization);
      e.target.value = '';
    }
  };

  const handleRemoveSpecialization = (index) => {
    const newSpecialization = profileData.professional.specialization.filter((_, i) => i !== index);
    handleInputChange('professional', 'specialization', newSpecialization);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        

        {/* Profile Overview Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="text-center">
                {/* Profile Photo */}
                <div className="relative inline-block group">
                  <img 
                    src="" 
                    alt="" 
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#ffe8cc] object-cover transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
                  />
                  <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 bg-[#ff9c00] text-white p-1 rounded-full cursor-pointer hover:bg-[#e68a00] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <label htmlFor="profile-image-upload" className="mt-2  text-sm text-[#ff9c00] hover:text-[#e68a00] cursor-pointer font-medium">
                  Change Photo
                </label>
              </div>
              
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-[#154056]">
                  {profileData.personal.firstName} {profileData.personal.lastName}
                </h2>
                
                <p className="text-[#ff9c00] font-medium text-sm mt-1">{profileData.professional.experience} experience</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                  {profileData.professional.specialization.map((spec, index) => (
                    <span key={index} className="bg-[#ffe8cc] text-[#154056] px-3 py-1 rounded-full text-xs font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-6 sm:gap-8 mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#154056]">0</div>
                <div className="text-[#154056] text-sm mt-1">Total Leads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#154056]">0</div>
                <div className="text-[#154056] text-sm mt-1">Deals Closed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#154056]">0.1</div>
                <div className="text-[#154056] text-sm mt-1">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            {[
              { id: 'personal', label: 'Personal Info' },
              { id: 'professional', label: 'Professional Info' },
              { id: 'social', label: 'Social Links' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#ff9c00] text-white shadow-md'
                    : 'text-[#154056] hover:bg-[#ffe8cc]'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div>
              <h3 className="text-xl font-semibold text-[#154056] mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Inputs */}
                {Object.entries(profileData.personal).map(([field, value]) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-[#154056] mb-2">
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : field === 'dateOfBirth' ? 'date' : 'text'}
                      value={value}
                      onChange={(e) => handleInputChange('personal', field, e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Info Tab */}
          {activeTab === 'professional' && (
            <div>
              <h3 className="text-xl font-semibold text-[#154056] mb-6">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Broker ID */}
                <div>
                  <label className="block text-sm font-medium text-[#154056] mb-2">Broker ID</label>
                  <input
                    type="text"
                    value={profileData.professional.brokerId}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                  />
                </div>
                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-[#154056] mb-2">Experience</label>
                  <input
                    type="text"
                    value={profileData.professional.experience}
                    onChange={(e) => handleInputChange('professional', 'experience', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
                {/* License Number */}
                <div>
                  <label className="block text-sm font-medium text-[#154056] mb-2">License Number</label>
                  <input
                    type="text"
                    value={profileData.professional.licenseNumber}
                    onChange={(e) => handleInputChange('professional', 'licenseNumber', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
                {/* License Expiry */}
                <div>
                  <label className="block text-sm font-medium text-[#154056] mb-2">License Expiry</label>
                  <input
                    type="date"
                    value={profileData.professional.licenseExpiry}
                    onChange={(e) => handleInputChange('professional', 'licenseExpiry', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>

                {/* Specialization */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#154056] mb-2">Specialization</label>
                  <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg min-h-12">
                    {profileData.professional.specialization.map((spec, index) => (
                      <span key={index} className="inline-flex items-center gap-1 bg-[#ffe8cc] text-[#154056] px-3 py-1 rounded-full text-sm">
                        {spec}
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSpecialization(index)}
                            className="text-[#154056] hover:text-[#ff9c00] text-lg leading-none"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <input
                        type="text"
                        placeholder="Add specialization..."
                        onKeyPress={handleAddSpecialization}
                        className="flex-1 min-w-32 border-none focus:ring-0 p-0 text-sm"
                      />
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#154056] mb-2">Bio</label>
                  <textarea
                    value={profileData.professional.bio}
                    onChange={(e) => handleInputChange('professional', 'bio', e.target.value)}
                    disabled={!isEditing}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Links Tab */}
          {activeTab === 'social' && (
            <div>
              <h3 className="text-xl font-semibold text-[#154056] mb-6">Social Media Links</h3>
              <div className="space-y-6">
                {['linkedin','twitter','facebook','instagram'].map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-[#154056] mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <input
                      type="url"
                      value={profileData.social[key]}
                      onChange={(e) => handleInputChange('social', key, e.target.value)}
                      disabled={!isEditing}
                      placeholder={`https://${key}.com/yourprofile`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          {!isEditing ? (
            <button
              className="w-full sm:w-auto bg-[#ff9c00] hover:bg-[#e68a00] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          ) : (
            <>
              <button
                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 cursor-pointer"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="w-full sm:w-auto bg-[#ff9c00] hover:bg-[#e68a00] text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
