
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HomeIcon,
  PhotoIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlusIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  TrashIcon,
  CloudArrowUpIcon
} from "@heroicons/react/24/outline";

const PropertySubmission = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyData, setPropertyData] = useState({
    // Basic Details
    title: "",
    description: "",
    propertyType: "residential",
    category: "sale",
    bhk: "",
    
    // Location Details
    address: "",
    city: "",
    state: "",
    pincode: "",
    locality: "",
    landmark: "",
    
    // Pricing
    price: "",
    priceType: "total",
    maintenance: "",
    
    // Property Details
    builtUpArea: "",
    carpetArea: "",
    plotArea: "",
    floor: "",
    totalFloors: "",
    bathrooms: "",
    balconies: "",
    parking: "",
    furnished: "unfurnished",
    
    // Amenities
    amenities: [],
    
    // Contact
    contactPerson: "",
    contactNumber: "",
    
    // Images and Documents
    images: [],
    documents: []
  });

  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, name: "Basic Details", icon: HomeIcon },
    { id: 2, name: "Location", icon: MapPinIcon },
    { id: 3, name: "Pricing", icon: CurrencyRupeeIcon },
    { id: 4, name: "Property Details", icon: BuildingOffice2Icon },
    { id: 5, name: "Images & Documents", icon: PhotoIcon },
    { id: 6, name: "Review", icon: CheckCircleIcon }
  ];

  const propertyTypes = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
    { value: "agricultural", label: "Agricultural" }
  ];

  const categories = [
    { value: "sale", label: "For Sale" },
    { value: "rent", label: "For Rent" },
    { value: "lease", label: "For Lease" }
  ];

  const bhkOptions = [
    { value: "1", label: "1 BHK" },
    { value: "2", label: "2 BHK" },
    { value: "3", label: "3 BHK" },
    { value: "4", label: "4 BHK" },
    { value: "5+", label: "5+ BHK" }
  ];

  const amenitiesList = [
    "Swimming Pool", "Gym", "Parking", "Security", "Lift", "Garden",
    "Club House", "Power Backup", "Water Supply", "Playground",
    "Internet/Wi-Fi", "Air Conditioning", "Modular Kitchen",
    "Servant Room", "Study Room", "Pooja Room"
  ];

  const furnishedOptions = [
    { value: "unfurnished", label: "Unfurnished" },
    { value: "semifurnished", label: "Semi Furnished" },
    { value: "furnished", label: "Fully Furnished" }
  ];

  const handleInputChange = (field, value) => {
    setPropertyData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setPropertyData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPropertyData(prev => ({
          ...prev,
          images: [...prev.images, {
            id: Date.now() + Math.random(),
            url: e.target.result,
            name: file.name
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setPropertyData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!propertyData.title) newErrors.title = "Title is required";
        if (!propertyData.description) newErrors.description = "Description is required";
        if (!propertyData.bhk && propertyData.propertyType === "residential") {
          newErrors.bhk = "BHK is required";
        }
        break;
      case 2:
        if (!propertyData.address) newErrors.address = "Address is required";
        if (!propertyData.city) newErrors.city = "City is required";
        if (!propertyData.state) newErrors.state = "State is required";
        if (!propertyData.pincode) newErrors.pincode = "Pincode is required";
        break;
      case 3:
        if (!propertyData.price) newErrors.price = "Price is required";
        break;
      case 4:
        if (!propertyData.builtUpArea) newErrors.builtUpArea = "Built-up area is required";
        break;
      case 5:
        if (propertyData.images.length === 0) newErrors.images = "At least one image is required";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call with progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log("Property submitted:", propertyData);
    alert("Property submitted successfully! It will be reviewed and published within 24 hours.");
    
    // Reset form
    setPropertyData({
      title: "", description: "", propertyType: "residential", category: "sale",
      bhk: "", address: "", city: "", state: "", pincode: "", locality: "",
      landmark: "", price: "", priceType: "total", maintenance: "",
      builtUpArea: "", carpetArea: "", plotArea: "", floor: "", totalFloors: "",
      bathrooms: "", balconies: "", parking: "", furnished: "unfurnished",
      amenities: [], contactPerson: "", contactNumber: "", images: [], documents: []
    });
    setCurrentStep(1);
    setIsSubmitting(false);
    setUploadProgress(0);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
              <input
                type="text"
                value={propertyData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Luxury 3BHK Apartment in Prime Location"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {propertyTypes.map(type => (
                  <label key={type.value} className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${
                    propertyData.propertyType === type.value 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="propertyType"
                      value={type.value}
                      checked={propertyData.propertyType === type.value}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-medium">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <div className="grid grid-cols-3 gap-3">
                {categories.map(category => (
                  <label key={category.value} className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${
                    propertyData.category === category.value 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={propertyData.category === category.value}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-medium">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {propertyData.propertyType === 'residential' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">BHK Configuration *</label>
                <select
                  value={propertyData.bhk}
                  onChange={(e) => handleInputChange('bhk', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select BHK</option>
                  {bhkOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.bhk && <p className="text-red-600 text-sm mt-1">{errors.bhk}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={propertyData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                placeholder="Describe your property, its features, and what makes it special..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address *</label>
              <textarea
                value={propertyData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                placeholder="Enter complete address with building name, street, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  value={propertyData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  value={propertyData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                <input
                  type="text"
                  value={propertyData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Locality</label>
                <input
                  type="text"
                  value={propertyData.locality}
                  onChange={(e) => handleInputChange('locality', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nearby Landmark</label>
              <input
                type="text"
                value={propertyData.landmark}
                onChange={(e) => handleInputChange('landmark', e.target.value)}
                placeholder="e.g., Near ABC Mall, XYZ Metro Station"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                  ₹
                </span>
                <input
                  type="number"
                  value={propertyData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="Enter price"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Type</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${
                  propertyData.priceType === 'total' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="priceType"
                    value="total"
                    checked={propertyData.priceType === 'total'}
                    onChange={(e) => handleInputChange('priceType', e.target.value)}
                    className="sr-only"
                  />
                  <span className="font-medium">Total Price</span>
                </label>
                <label className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${
                  propertyData.priceType === 'per_sqft' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="priceType"
                    value="per_sqft"
                    checked={propertyData.priceType === 'per_sqft'}
                    onChange={(e) => handleInputChange('priceType', e.target.value)}
                    className="sr-only"
                  />
                  <span className="font-medium">Per Sq Ft</span>
                </label>
              </div>
            </div>

            {propertyData.category === 'rent' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={propertyData.maintenance}
                    onChange={(e) => handleInputChange('maintenance', e.target.value)}
                    placeholder="Monthly maintenance"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Built-up Area (sq ft) *</label>
                <input
                  type="number"
                  value={propertyData.builtUpArea}
                  onChange={(e) => handleInputChange('builtUpArea', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.builtUpArea && <p className="text-red-600 text-sm mt-1">{errors.builtUpArea}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area (sq ft)</label>
                <input
                  type="number"
                  value={propertyData.carpetArea}
                  onChange={(e) => handleInputChange('carpetArea', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plot Area (sq ft)</label>
                <input
                  type="number"
                  value={propertyData.plotArea}
                  onChange={(e) => handleInputChange('plotArea', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                <input
                  type="number"
                  value={propertyData.floor}
                  onChange={(e) => handleInputChange('floor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Floors</label>
                <input
                  type="number"
                  value={propertyData.totalFloors}
                  onChange={(e) => handleInputChange('totalFloors', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                <input
                  type="number"
                  value={propertyData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Balconies</label>
                <input
                  type="number"
                  value={propertyData.balconies}
                  onChange={(e) => handleInputChange('balconies', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parking</label>
                <select
                  value={propertyData.parking}
                  onChange={(e) => handleInputChange('parking', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Parking</option>
                  <option value="0">No Parking</option>
                  <option value="1">1 Car</option>
                  <option value="2">2 Cars</option>
                  <option value="3+">3+ Cars</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Furnished Status</label>
              <div className="grid grid-cols-3 gap-3">
                {furnishedOptions.map(option => (
                  <label key={option.value} className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${
                    propertyData.furnished === option.value 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="furnished"
                      value={option.value}
                      checked={propertyData.furnished === option.value}
                      onChange={(e) => handleInputChange('furnished', e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenitiesList.map(amenity => (
                  <label key={amenity} className={`border-2 rounded-lg p-2 cursor-pointer transition-colors text-sm ${
                    propertyData.amenities.includes(amenity)
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={propertyData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="sr-only"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Images *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="images" className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                      <span>Upload Images</span>
                      <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </div>
              </div>
              {errors.images && <p className="text-red-600 text-sm mt-1">{errors.images}</p>}

              {propertyData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {propertyData.images.map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(image.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                <input
                  type="text"
                  value={propertyData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  value={propertyData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Review Your Property Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                  <div className="space-y-1 text-gray-600">
                    <div><span className="font-medium">Title:</span> {propertyData.title}</div>
                    <div><span className="font-medium">Type:</span> {propertyData.propertyType}</div>
                    <div><span className="font-medium">Category:</span> {propertyData.category}</div>
                    {propertyData.bhk && <div><span className="font-medium">BHK:</span> {propertyData.bhk}</div>}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                  <div className="space-y-1 text-gray-600">
                    <div><span className="font-medium">City:</span> {propertyData.city}</div>
                    <div><span className="font-medium">State:</span> {propertyData.state}</div>
                    <div><span className="font-medium">Pincode:</span> {propertyData.pincode}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Pricing</h4>
                  <div className="space-y-1 text-gray-600">
                    <div><span className="font-medium">Price:</span> ₹{propertyData.price ? parseInt(propertyData.price).toLocaleString() : ''}</div>
                    <div><span className="font-medium">Type:</span> {propertyData.priceType === 'total' ? 'Total Price' : 'Per Sq Ft'}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
                  <div className="space-y-1 text-gray-600">
                    <div><span className="font-medium">Built-up Area:</span> {propertyData.builtUpArea} sq ft</div>
                    <div><span className="font-medium">Furnished:</span> {propertyData.furnished}</div>
                    <div><span className="font-medium">Images:</span> {propertyData.images.length} uploaded</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600 text-sm">{propertyData.description}</p>
              </div>

              {propertyData.amenities.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {propertyData.amenities.map((amenity) => (
                      <span key={amenity} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isSubmitting && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">Uploading property...</span>
                  <span className="text-sm text-blue-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit Property</h1>
            <p className="text-gray-600">Add a new property to your listings</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step.id 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <div className="ml-3 hidden md:block">
                <div className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-orange-600' : 'text-gray-600'
                }`}>
                  {step.name}
                </div>
              </div>
              {step.id < steps.length && (
                <div className={`hidden md:block w-16 h-1 mx-4 ${
                  currentStep > step.id ? 'bg-orange-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="flex items-center space-x-3">
            {currentStep < 6 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Property'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySubmission;
