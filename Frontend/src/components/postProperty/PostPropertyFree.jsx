// src/components/PropertyPostForm.jsx
import React, { useState, useEffect, useRef } from "react";
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

/*
  Theme colors:
  orange:  #ff9c00
  navy:    #164057
  bg:      #f7f7f7
*/

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

const showRoomsFor = new Set([
  "Apartment",
  "Townhouse",
  "Villa",
  "Penthouse",
  "Hotel Apartment",
  "Floor",
]);

const maxImages = 10;

const PropertyPostForm = () => {
  const [formData, setFormData] = useState({
    userType: "",
    purpose: "sell", // sell | purchase
    category: "residential",
    propertyType: "",
    title: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
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
    // NOTE: lat/lng removed, and all map/geolocation code removed
  });

  const [images, setImages] = useState([]); // [{file,url}]
  const [modalIndex, setModalIndex] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      images.forEach((i) => URL.revokeObjectURL(i.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value),
      }));
    } else if (name === "category") {
      setFormData((prev) => ({ ...prev, category: value, propertyType: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhoneChange = (phone, name) => {
    setFormData((prev) => ({ ...prev, [name]: phone }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const canAdd = maxImages - images.length;
    if (canAdd <= 0) {
      toast.error(`You can upload up to ${maxImages} images.`);
      return;
    }
    const toAdd = files.slice(0, canAdd).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...toAdd]);
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const removed = prev[index];
      if (removed && removed.url) URL.revokeObjectURL(removed.url);
      return prev.filter((_, i) => i !== index);
    });
    if (modalIndex !== null) {
      if (index === modalIndex) setModalIndex(null);
      else if (index < modalIndex) setModalIndex((m) => m - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.city) {
      toast.error("Please fill Title, Price and City before submitting.");
      return;
    }

    console.log("Form data:", formData);
    console.log("Images:", images.map((i) => i.file));
    toast.success("Property Posted Successfully!");
  };

  const showRooms =
    formData.propertyType && showRoomsFor.has(formData.propertyType);

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-20 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-[#164057] text-center">
            Post Your Property
          </h2>

          {/* row: userType + purpose */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 ">User Type</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg cursor-pointer"
                required
              >
                <option value="">Select</option>
                <option value="channel-partner">Channel Partner</option>
                <option value="broker">Broker</option>
                <option value="builder">Builder</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Purpose</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg cursor-pointer"
                required
              >
                <option value="sell">Sell</option>
                <option value="purchase">Purchase</option>
              </select>
            </div>
          </div>

          {/* category + property type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg cursor-pointer"
                required
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg cursor-pointer"
                required
              >
                <option value="">Select</option>
                {(formData.category === "residential" ? RESIDENTIAL : COMMERCIAL).map(
                  (t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., 2BHK Flat near Delhi NCR"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Price & Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., ₹2.5 Cr"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Area (sq.ft.)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., 1200"
              />
            </div>
          </div>

          {/* Bedrooms/Bathrooms - conditional */}
          {showRooms && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., 2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., 2"
                />
              </div>
            </div>
          )}

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium mb-1">Amenities</label>
            <div className="flex flex-wrap gap-3">
              {["Parking", "Lift", "Security", "Furnished"].map((a) => (
                <label key={a} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="amenities"
                    value={a}
                    checked={formData.amenities.includes(a)}
                    onChange={handleChange}
                  />
                  <span className="text-sm">{a}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Write a short description (nearby landmarks, condition, facing)"
            />
          </div>

          {/* Address (no map/geolocation) */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter full address (street, locality, city)"
              required
            />
          </div>

          {/* City + Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., Lucknow"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., 226010"
              />
            </div>
          </div>

          {/* Floor & total floors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Floor</label>
              <input
                type="number"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., 3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Floors</label>
              <input
                type="number"
                name="totalFloors"
                value={formData.totalFloors}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., 10"
              />
            </div>
          </div>

          {/* Date field */}
          <div>
            <label className="block text-sm font-medium mb-1">Available From</label>
            <input
              type="date"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Contact info trio */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contact Number</label>
              <PhoneInput
                defaultCountry="in"
                value={formData.contactNumber}
                onChange={(phone) => handlePhoneChange(phone, "contactNumber")}
                inputClassName="w-full p-2 border rounded-lg"
                inputStyle={{ width: "100%" }}
                placeholder="e.g., +91 98765 43210"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
              <PhoneInput
                defaultCountry="in"
                value={formData.whatsappNumber}
                onChange={(phone) => handlePhoneChange(phone, "whatsappNumber")}
                inputClassName="w-full p-2 border rounded-lg"
                inputStyle={{ width: "100%" }}
                placeholder="optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Image upload field */}
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium mb-2">Property Images</label>
            <p className="text-sm text-gray-500 mb-3">
              Add up to {maxImages} images to showcase the property. Click on images to view larger.
            </p>

            {/* File input button */}
            <div
              className="border-2 border-dashed border-[#ff9c00] rounded-lg p-4 text-center cursor-pointer hover:bg-orange-50 transition-colors mb-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <PhotoIcon className="h-10 w-10 mx-auto text-[#ff9c00] mb-2" />
              <p className="text-sm font-medium text-[#164057]">Click to upload images</p>
              <p className="text-xs text-gray-500">or drag and drop</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Image preview grid */}
            {images.length > 0 && (
              <motion.div
                className="p-4 border rounded-lg bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-medium text-[#164057]">
                    Image Preview ({images.length}/{maxImages})
                  </h3>
                  <div className="text-sm text-gray-600">
                    Click to enlarge • Drag to reorder (coming soon)
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {images.map((img, idx) => (
                    <motion.div
                      key={img.url}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="relative rounded-lg overflow-hidden group"
                      whileHover={{ scale: 1.03 }}
                    >
                      <img
                        src={img.url}
                        alt={`preview-${idx}`}
                        className="w-full h-28 object-cover cursor-pointer border-2 border-[#164057] transition-all group-hover:border-[#ff9c00] group-hover:shadow-md"
                        onClick={() => setModalIndex(idx)}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(idx);
                        }}
                        className="absolute -top-0.5 -right-0 bg-[#ff9c00] text-white p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        aria-label={`Remove image ${idx + 1}`}
                      >
                        <XMarkIcon className="h-4 w-4 " />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white hover:bg-opacity-90 transition-colors cursor-pointer"
              style={{ background: "#ff9c00" }}
            >
              Post Property
            </button>
          </div>
        </form>
      </div>

      {/* Image modal viewer */}
      <AnimatePresence>
        {modalIndex !== null && images[modalIndex] && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalIndex(null)}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={images[modalIndex].url}
                src={images[modalIndex].url}
                alt={`large-${modalIndex}`}
                className="w-full max-h-[85vh] object-contain rounded-lg cursor-default"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {/* Close */}
              <button
                onClick={() => setModalIndex(null)}
                className="absolute top-3 right-3 p-2 rounded-full cursor-pointer hover:bg-opacity-80 transition-colors"
                style={{ background: "#ff9c00" }}
                aria-label="Close image viewer"
              >
                <XMarkIcon className="h-5 w-5 text-white" />
              </button>

              {/* Prev */}
              {modalIndex > 0 && (
                <button
                  onClick={() => setModalIndex((i) => i - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer hover:bg-opacity-80 transition-colors"
                  style={{ background: "#164057" }}
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="h-6 w-6 text-white" />
                </button>
              )}

              {/* Next */}
              {modalIndex < images.length - 1 && (
                <button
                  onClick={() => setModalIndex((i) => i + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer hover:bg-opacity-80 transition-colors"
                  style={{ background: "#164057" }}
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="h-6 w-6 text-white" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyPostForm;
