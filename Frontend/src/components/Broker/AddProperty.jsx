import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import toast from "react-hot-toast";
import { useProperty } from "../../context/LeadContext";

/* ─── constants ───────────────────────────────────────────── */
const RESIDENTIAL = [
  "Apartment",
  "Townhouse",
  "Villa Compound",
  "Land/Plot",
  "Building",
  "Villa",
  "Penthouse",
  "Hotel Apartment",
  "Floor",
];
const COMMERCIAL = [
  "Office",
  "Warehouse",
  "Villa",
  "Land",
  "Building",
  "Industrial Land",
  "Showroom",
  "Shop",
  "Labour Camp",
  "Bulk Unit",
  "Floor",
  "Factory",
  "Mixed Use Land",
  "Other Commercial",
];
const ROOMS_ALLOWED = new Set([
  "Apartment",
  "Townhouse",
  "Villa",
  "Penthouse",
  "Hotel Apartment",
  "Floor",
]);
const MAX_IMAGES = 10;

/* ─── main component ──────────────────────────────────────── */
export default function AddProperty() {
  const navigate = useNavigate();
  const { createProperty, user } = useProperty(); 

  /* ---------- state ---------- */
  const [formData, setFormData] = useState({
    userType: "Broker", // Default for broker portal
    purpose: "sell",
    category: "residential",
    propertyType: "",
    title: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    amenities: [],
    address: "",
    city: "",
    pincode: "",
    floor: "",
    totalFloors: "",
    description: "",
    contactNumber: "",
    whatsappNumber: "",
    email: "",
    availableFrom: "",
  });
  const [images, setImages] = useState([]);
  const [modalIdx, setModalIdx] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Set user data on component mount
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || "",
        contactNumber: user.phone || "",
        whatsappNumber: user.phone || ""
      }));
    }
  }, [user]);

  /* ---------- cleanup ---------- */
  useEffect(() => {
    return () => images.forEach((i) => URL.revokeObjectURL(i.url));
  }, [images]);

  /* ---------- handlers ---------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox") {
        const amenities = checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value);
        return { ...prev, amenities };
      }
      if (name === "category") return { ...prev, category: value, propertyType: "" };
      return { ...prev, [name]: value };
    });
  };

  const handlePhone = (val, field) => setFormData((p) => ({ ...p, [field]: val }));

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    const room = MAX_IMAGES - images.length;
    if (room <= 0) return toast.error(`Maximum ${MAX_IMAGES} images allowed`);

    const accepted = files
      .slice(0, room)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ file: f, url: URL.createObjectURL(f) }));

    setImages((prev) => [...prev, ...accepted]);
  };

  const removeImg = (i) => {
    URL.revokeObjectURL(images[i].url);
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setModalIdx((m) => (m === i ? null : m > i ? m - 1 : m));
  };

  /* ---------- validation ---------- */
  const validateForm = () => {
    if (!formData.propertyType) return "Please select Property Type";
    if (!formData.title.trim()) return "Please enter Property Title";
    if (!formData.price || Number(formData.price) <= 0) return "Enter a valid Price";
    if (!formData.area || Number(formData.area) <= 0) return "Enter valid Area in sq.ft";

    if (ROOMS_ALLOWED.has(formData.propertyType)) {
      if (!formData.bedrooms) return "Please enter number of Bedrooms";
      if (!formData.bathrooms) return "Please enter number of Bathrooms";
    }

    if (!formData.description.trim()) return "Please enter Description";
    if (!formData.address.trim()) return "Please enter Address";
    if (!formData.city.trim()) return "Please enter City";
    if (!formData.pincode || formData.pincode.length < 5) return "Enter valid Pincode";

    if (!formData.contactNumber) return "Please enter Contact Number";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Enter a valid Email Address";

    if (!images.length) return "Please upload at least 1 Property Image";

    return null;
  };

  /* ---------- submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return toast.error(error);

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (key === 'amenities') {
          formData.amenities.forEach(amenity => {
            submitData.append('amenities[]', amenity);
          });
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Append images
      images.forEach((image, index) => {
        submitData.append('images', image.file);
      });

      // Add broker-specific data
      submitData.append('postedBy', user?.id || '');
      submitData.append('brokerName', user?.name || '');
      submitData.append('status', 'active');
      submitData.append('isVerified', 'false');

      const property = await createProperty(submitData);

      toast.success("Property listed successfully!");
      
      console.log("Created Property ID:", property._id);

      // Reset form
      setFormData({
        userType: "Broker",
        purpose: "sell",
        category: "residential",
        propertyType: "",
        title: "",
        price: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        balconies: "",
        amenities: [],
        address: "",
        city: "",
        pincode: "",
        floor: "",
        totalFloors: "",
        description: "",
        contactNumber: user?.phone || "",
        whatsappNumber: user?.phone || "",
        email: user?.email || "",
        availableFrom: "",
      });
      setImages([]);

      // Navigate to properties listings
      navigate("/broker/property/listings");
    } catch (err) {
      console.error("Property creation error:", err);
      toast.error(err.response?.data?.message || "Failed to list property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- helpers ---------- */
  const showRooms = ROOMS_ALLOWED.has(formData.propertyType);
  const getPricePlaceholder = () => formData.purpose === "rent" ? "25,000" : "25,00,000";
  const getPriceLabel = () => formData.purpose === "rent" ? "Monthly Rent (₹)" : "Price (₹)";

  /* ─── UI ────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#f7f7f7] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Add New Property
          </h1>
          <p className="text-gray-600 text-lg">
            List your property to reach potential buyers and tenants
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-[#154045] py-4 px-6 flex justify-center">
            <h2 className="text-xl font-semibold text-white">
              Property Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information Section */}
            <Section title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a*
                  </label>
                  <input
                    type="text"
                    value="Broker"
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Registered as broker</p>
                </div>
                <Select
                  label="Looking to*"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  options={[
                    ["sell", "Sell"],
                    ["rent", "Rent"],
                  ]}
                  required
                />
                <Select
                  label="Property Category*"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={[
                    ["residential", "Residential"],
                    ["commercial", "Commercial"],
                  ]}
                  required
                />
                <Select
                  label="Property Type*"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  options={[
                    ["", "Select property type"],
                    ...(formData.category === "residential" ? RESIDENTIAL : COMMERCIAL).map((t) => [
                      t,
                      t,
                    ]),
                  ]}
                  required
                />
              </div>
            </Section>

            {/* Property Details Section */}
            <Section title="Property Details">
              <Input
                label="Property Title*"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="2 BHK Apartment for Sale in Prime Location"
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
                <Input
                  label={getPriceLabel() + "*"}
                  type="number"
                  name="price"
                  min="1"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder={getPricePlaceholder()}
                  required
                />
                <Input
                  label="Carpet Area (sq.ft.)*"
                  type="number"
                  name="area"
                  min="1"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="1200"
                  required
                />
              </div>

              {showRooms && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    label="Bedrooms*"
                    type="number"
                    name="bedrooms"
                    min="0"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="2"
                    required
                  />
                  <Input
                    label="Bathrooms*"
                    type="number"
                    name="bathrooms"
                    min="0"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="2"
                    required
                  />
                  <Input
                    label="Balconies"
                    type="number"
                    name="balconies"
                    min="0"
                    value={formData.balconies || ""}
                    onChange={handleChange}
                    placeholder="2"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Floor"
                  type="number"
                  name="floor"
                  min="0"
                  value={formData.floor || ""}
                  onChange={handleChange}
                  placeholder="3"
                />
                <Input
                  label="Total Floors"
                  type="number"
                  name="totalFloors"
                  min="1"
                  value={formData.totalFloors || ""}
                  onChange={handleChange}
                  placeholder="10"
                />
              </div>

              <Textarea
                label="Description*"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property's key features, amenities, location advantages, nearby schools/hospitals/markets, and any unique selling points..."
                required
              />
            </Section>

            {/* Location Details Section */}
            <Section title="Location Details">
              <Textarea
                label="Complete Address*"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full street address with landmark"
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="City/Locality*"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city or locality name"
                  required
                />
                <Input
                  label="Pincode*"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="560001"
                  required
                />
              </div>
            </Section>

            {/* Contact Information Section */}
            <Section title="Contact Information">
              <div className="space-y-6">
                <PhoneField
                  label="Mobile Number*"
                  value={formData.contactNumber}
                  onChange={(val) => handlePhone(val, "contactNumber")}
                  required
                  placeholder="Enter your mobile number"
                />
                <PhoneField
                  label="WhatsApp Number"
                  value={formData.whatsappNumber}
                  onChange={(val) => handlePhone(val, "whatsappNumber")}
                  placeholder="Enter your WhatsApp number"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  <Input
                    label="Available From"
                    type="date"
                    name="availableFrom"
                    value={formData.availableFrom}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Section>

            {/* Amenities Section */}
            <Section title="Amenities">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {[
                  "Parking", "Security", "Lift", "Power Backup", 
                  "Water Supply", "Swimming Pool", "Gym", "Park",
                  "Clubhouse", "Play Area", "Garden", "Internet"
                ].map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-[#154045] focus:ring-[#154045] cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </Section>

            {/* Property Images Section */}
            <Section title="Property Images">
              <div className="space-y-4">
                <div
                  className="border-2 border-dashed border-[#154045] rounded-xl p-8 text-center  transition-all hover:border-[#ff9c00] hover:bg-orange-50 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <PhotoIcon className="h-12 w-12 mx-auto text-[#154045] mb-3" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Upload Property Photos
                  </p>
                  <p className="text-sm text-gray-500">
                    Click to upload or drag and drop<br />
                    Maximum {MAX_IMAGES} images (JPEG, PNG, WebP)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFiles}
                    className="hidden"
                  />
                </div>

                {images.length > 0 && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      {images.length} of {MAX_IMAGES} images selected
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {images.map((img, i) => (
                        <div key={img.url} className="relative group">
                          <motion.img
                            src={img.url}
                            alt={`Preview ${i + 1}`}
                            onClick={() => setModalIdx(i)}
                            className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 cursor-pointer transition-all group-hover:border-[#ff9c00] group-hover:shadow-md"
                            whileHover={{ scale: 1.05 }}
                          />
                          <button
                            type="button"
                            onClick={() => removeImg(i)}
                            className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <XMarkIcon className="h-3 w-3 text-white" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to view
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </Section>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] hover:bg-[#154056] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Adding Property...
                  </div>
                ) : (
                  `List Property ${formData.purpose === "rent" ? "for Rent" : "for Sale"}`
                )}
              </button>
              <p className="text-center text-gray-500 text-sm mt-3">
                By listing your property, you agree to our Terms & Conditions.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Image Modal Viewer */}
      <AnimatePresence>
        {modalIdx !== null && images[modalIdx] && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalIdx(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl"
            >
              <motion.img
                src={images[modalIdx].url}
                alt="Property preview"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-h-[85vh] object-contain rounded-lg"
              />
              
              <button
                onClick={() => setModalIdx(null)}
                className="absolute top-4 right-4 bg-[#ff9c00] p-3 rounded-full hover:bg-[#154045] transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
              
              {modalIdx > 0 && (
                <NavButton onClick={() => setModalIdx((i) => i - 1)} pos="left">
                  <ChevronLeftIcon className="h-6 w-6 text-white" />
                </NavButton>
              )}
              
              {modalIdx < images.length - 1 && (
                <NavButton onClick={() => setModalIdx((i) => i + 1)} pos="right">
                  <ChevronRightIcon className="h-6 w-6 text-white" />
                </NavButton>
              )}
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
                {modalIdx + 1} of {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── helper components ──────────────────────────────────── */
function Section({ title, children }) {
  return (
    <div className="border-b border-gray-100 pb-8 last:border-b-0 last:pb-0">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        {...props}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors cursor-pointer"
      >
        {options.map(([val, text]) => (
          <option key={val} value={val}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors resize-vertical"
      />
    </div>
  );
}

function PhoneField({ label, value, onChange, required, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <PhoneInput
        defaultCountry="in"
        value={value}
        onChange={onChange}
        inputClassName="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors"
        inputStyle={{ width: "100%" }}
        placeholder={placeholder || "Enter phone number"}
        required={required}
      />
    </div>
  );
}

function NavButton({ children, onClick, pos }) {
  return (
    <button
      onClick={onClick}
      className={`absolute ${pos === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 bg-[#ff9c00] p-4 rounded-full hover:bg-[#154045] transition-colors`}
    >
      {children}
    </button>
  );
}