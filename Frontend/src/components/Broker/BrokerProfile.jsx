// pages/broker/EnhancedBrokerProfile.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UserIcon,
  CameraIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  DocumentTextIcon,
  StarIcon,
  CheckCircleIcon,
  CloudArrowUpIcon,
  TrashIcon,
  EyeIcon,
  CreditCardIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";

const BrokerProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState({
    // Personal Information
    name: "Rajesh Kumar",
    email: "rajesh.kumar@gmail.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 87654 32109",
    address: "123, Business District, Mumbai, Maharashtra 400001",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    dateOfBirth: "1985-06-15",
    
    // Professional Details
    experience: "8 years",
    specialization: "Luxury Properties",
    license: "MH/REA/12345/2020",
    reraId: "A52000012345",
    companyName: "Kumar Real Estate Solutions",
    designation: "Senior Broker",
    
    // Documents
    panCard: "ABCDE1234F",
    aadharCard: "1234 5678 9012",
    
    // Banking Details
    bankName: "HDFC Bank",
    accountNumber: "123456789012",
    ifscCode: "HDFC0001234",
    accountHolderName: "Rajesh Kumar",
    
    // Profile Stats
    bio: "Experienced real estate broker specializing in luxury properties in Mumbai. Over 8 years of experience helping clients find their dream homes.",
    languages: ["Hindi", "English", "Marathi"],
    rating: 4.8,
    totalDeals: 156,
    verified: true,
    profilePicture: null
  });

  const [uploadedDocuments, setUploadedDocuments] = useState([
    {
      id: 1,
      name: "PAN Card",
      fileName: "pan_card_rajesh.jpg",
      uploadDate: "2024-08-15",
      status: "verified",
      type: "pan"
    },
    {
      id: 2,
      name: "Aadhar Card",
      fileName: "aadhar_card_rajesh.pdf",
      uploadDate: "2024-08-15",
      status: "verified",
      type: "aadhar"
    },
    {
      id: 3,
      name: "Real Estate License",
      fileName: "rera_license_rajesh.pdf",
      uploadDate: "2024-08-16",
      status: "pending",
      type: "license"
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "personal", label: "Personal Info", icon: UserIcon },
    { id: "professional", label: "Professional", icon: BuildingOfficeIcon },
    { id: "documents", label: "Documents", icon: DocumentTextIcon },
    { id: "banking", label: "Banking", icon: CreditCardIcon },
    { id: "verification", label: "Verification", icon: CheckCircleIcon }
  ];

  const documentTypes = [
    { id: "pan", name: "PAN Card", required: true },
    { id: "aadhar", name: "Aadhar Card", required: true },
    { id: "license", name: "Real Estate License", required: true },
    { id: "photo", name: "Passport Photo", required: false },
    { id: "bank", name: "Bank Statement", required: false }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event, documentType) => {
    const file = event.target.files[0];
    if (file) {
      // In real implementation, upload to server
      const newDocument = {
        id: uploadedDocuments.length + 1,
        name: documentTypes.find(dt => dt.id === documentType)?.name,
        fileName: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        status: "pending",
        type: documentType
      };
      
      setUploadedDocuments(prev => [...prev, newDocument]);
    }
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, profilePicture: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeDocument = (documentId) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const getDocumentStatus = (status) => {
    const statusConfig = {
      verified: { color: "text-green-800 bg-green-100", label: "Verified" },
      pending: { color: "text-yellow-800 bg-yellow-100", label: "Pending Review" },
      rejected: { color: "text-red-800 bg-red-100", label: "Rejected" }
    };
    
    return statusConfig[status] || statusConfig.pending;
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log("Profile saved:", profileData);
    alert("Profile updated successfully!");
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {profileData.profilePicture ? (
              <img src={profileData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-12 h-12 text-gray-500" />
            )}
          </div>
          <button 
            onClick={() => document.getElementById('profile-picture').click()}
            className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2 text-white hover:bg-orange-600"
            disabled={!isEditing}
          >
            <CameraIcon className="w-4 h-4" />
          </button>
          <input
            id="profile-picture"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="hidden"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{profileData.name}</h3>
          <p className="text-gray-600">{profileData.specialization}</p>
          <div className="flex items-center mt-2">
            <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm text-gray-600">{profileData.rating} ({profileData.totalDeals} deals)</span>
            {profileData.verified && (
              <CheckCircleIcon className="w-4 h-4 text-green-500 ml-2" />
            )}
          </div>
        </div>
      </div>

      {/* Personal Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Phone *</label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
          <input
            type="tel"
            value={profileData.alternatePhone}
            onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={profileData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
          <input
            type="text"
            value={profileData.languages.join(', ')}
            onChange={(e) => handleInputChange('languages', e.target.value.split(', '))}
            disabled={!isEditing}
            placeholder="Hindi, English, Marathi"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
          <textarea
            value={profileData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            disabled={!isEditing}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            value={profileData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <input
            type="text"
            value={profileData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            value={profileData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            disabled={!isEditing}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
        <input
          type="text"
          value={profileData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
        <select
          value={profileData.specialization}
          onChange={(e) => handleInputChange('specialization', e.target.value)}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
        >
          <option value="Luxury Properties">Luxury Properties</option>
          <option value="Commercial">Commercial</option>
          <option value="Residential">Residential</option>
          <option value="Industrial">Industrial</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
        <input
          type="text"
          value={profileData.license}
          onChange={(e) => handleInputChange('license', e.target.value)}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">RERA ID</label>
        <input
          type="text"
          value={profileData.reraId}
          onChange={(e) => handleInputChange('reraId', e.target.value)}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
        <input
          type="text"
          value={profileData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
        <input
          type="text"
          value={profileData.designation}
          onChange={(e) => handleInputChange('designation', e.target.value)}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
        />
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Document Upload Section */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Upload Documents</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentTypes.map((docType) => {
            const uploaded = uploadedDocuments.find(doc => doc.type === docType.id);
            
            return (
              <div key={docType.id} className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-900">
                      {docType.name}
                      {docType.required && <span className="text-red-500"> *</span>}
                    </h5>
                    
                    {uploaded ? (
                      <div className="mt-2">
                        <div className="flex items-center justify-center text-sm text-gray-600">
                          <span>{uploaded.fileName}</span>
                        </div>
                        <div className="mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(uploaded.status).color}`}>
                            {getDocumentStatus(uploaded.status).label}
                          </span>
                        </div>
                        <div className="mt-2 flex justify-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => removeDocument(uploaded.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <label htmlFor={`upload-${docType.id}`} className="cursor-pointer text-orange-600 hover:text-orange-500 text-sm">
                          Click to upload
                        </label>
                        <input
                          id={`upload-${docType.id}`}
                          type="file"
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, docType.id)}
                        />
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">PDF, PNG, JPG up to 2MB</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Document Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PAN Card Number</label>
          <input
            type="text"
            value={profileData.panCard}
            onChange={(e) => handleInputChange('panCard', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Card Number</label>
          <input
            type="text"
            value={profileData.aadharCard}
            onChange={(e) => handleInputChange('aadharCard', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );

  const renderBankingInfo = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <BanknotesIcon className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-sm text-blue-800">
            Banking details are required for commission payments and wallet transactions.
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name *</label>
          <input
            type="text"
            value={profileData.bankName}
            onChange={(e) => handleInputChange('bankName', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name *</label>
          <input
            type="text"
            value={profileData.accountHolderName}
            onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Number *</label>
          <input
            type="text"
            value={profileData.accountNumber}
            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code *</label>
          <input
            type="text"
            value={profileData.ifscCode}
            onChange={(e) => handleInputChange('ifscCode', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );

  const renderVerificationStatus = () => {
    const requiredDocs = documentTypes.filter(doc => doc.required);
    const uploadedRequired = requiredDocs.filter(doc => 
      uploadedDocuments.some(uploaded => uploaded.type === doc.id)
    );
    const verifiedDocs = uploadedDocuments.filter(doc => doc.status === 'verified');
    
    const completionPercentage = (uploadedRequired.length / requiredDocs.length) * 100;
    const verificationPercentage = uploadedRequired.length > 0 ? (verifiedDocs.length / uploadedRequired.length) * 100 : 0;

    return (
      <div className="space-y-6">
        {/* Profile Completion */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Profile Completion Status</h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Profile Completion</span>
                <span>{Math.round(completionPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Document Verification</span>
                <span>{Math.round(verificationPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${verificationPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Verification Checklist</h4>
          
          <div className="space-y-3">
            {requiredDocs.map((doc) => {
              const uploaded = uploadedDocuments.find(u => u.type === doc.id);
              
              return (
                <div key={doc.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {uploaded ? (
                      uploaded.status === 'verified' ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                      ) : (
                        <ClockIcon className="h-5 w-5 text-yellow-500 mr-3" />
                      )
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3"></div>
                    )}
                    <span className="text-sm text-gray-700">{doc.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    uploaded 
                      ? uploaded.status === 'verified'
                        ? 'bg-green-100 text-green-800'
                        : uploaded.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {uploaded 
                      ? uploaded.status === 'verified' ? 'Verified' 
                        : uploaded.status === 'pending' ? 'Pending'
                        : 'Rejected'
                      : 'Not Uploaded'
                    }
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Benefits */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="font-medium text-green-900 mb-4">Benefits of Profile Verification</h4>
          <ul className="space-y-2 text-sm text-green-800">
            <li className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Higher lead priority and quality
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Verified badge on your profile
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Access to premium features
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Faster commission payments
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalInfo();
      case "professional":
        return renderProfessionalInfo();
      case "documents":
        return renderDocuments();
      case "banking":
        return renderBankingInfo();
      case "verification":
        return renderVerificationStatus();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Management</h1>
            <p className="text-gray-600">Manage your personal and professional information</p>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
                {tab.id === 'documents' && uploadedDocuments.some(doc => doc.status === 'pending') && (
                  <span className="ml-2 w-2 h-2 bg-yellow-500 rounded-full"></span>
                )}
                {tab.id === 'verification' && profileData.verified && (
                  <CheckCircleIcon className="h-4 w-4 ml-2 text-green-500" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BrokerProfile;
