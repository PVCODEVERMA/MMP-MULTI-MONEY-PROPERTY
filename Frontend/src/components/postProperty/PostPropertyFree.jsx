
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
export default function PostPropertyFree({ onSubmit }) {
  const navigate = useNavigate();

  /* ---------- state ---------- */
  const [formData, setFormData] = useState({
    userType: "",
    purpose: "sell",
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
  });
  const [images, setImages] = useState([]); // [{file,url}]
  const [modalIdx, setModalIdx] = useState(null);
  const fileInputRef = useRef(null);

  /* ---------- cleanup ---------- */
  useEffect(
    () => () => images.forEach((i) => URL.revokeObjectURL(i.url)),
    [images]
  );

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
    if (!formData.userType) return "Please select User Type.";
    if (!formData.propertyType) return "Please select Property Type.";
    if (!formData.title.trim()) return "Please enter Property Title.";
    if (!formData.price || Number(formData.price) <= 0) return "Enter a valid Price.";
    if (!formData.area || Number(formData.area) <= 0) return "Enter valid Area in sq.ft.";

    if (ROOMS_ALLOWED.has(formData.propertyType)) {
      if (!formData.bedrooms) return "Please enter Bedrooms.";
      if (!formData.bathrooms) return "Please enter Bathrooms.";
    }

    if (!formData.description.trim()) return "Please enter Description.";
    if (!formData.address.trim()) return "Please enter Address.";
    if (!formData.city.trim()) return "Please enter City.";
    if (!formData.pincode || formData.pincode.length < 5) return "Enter valid Pincode.";

    if (!formData.contactNumber) return "Please enter Contact Number.";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Enter a valid Email.";

    if (!images.length) return "Please upload at least 1 Property Image.";

    return null; // ✅ all good
  };

  /* ---------- submit ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return toast.error(error);

    toast.success("Property posted successfully!");

    onSubmit?.({
      ...formData,
      images: images.map((i) => i.file),
      createdAt: new Date().toISOString(),
    });

    // reset form
    setFormData({
      userType: "",
      purpose: "sell",
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
    });
    setImages([]);

    // redirect to thank-you page
    navigate("/post-success");
  };

  /* ---------- helpers ---------- */
  const showRooms = ROOMS_ALLOWED.has(formData.propertyType);
  const getPricePlaceholder = () => (formData.purpose === "rent" ? "25,000" : "25,00,000");
  const getPriceLabel = () => (formData.purpose === "rent" ? "Monthly Rent (₹)" : "Price (₹)");

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-[#f7f7f7] py-20 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-[#164057] text-center">
            Post Your <span className="text-[#ff9c00]">Property</span>
          </h2>

          {/* user type + purpose */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="User Type"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              options={[
                ["", "Select User Type"],
                ["channel-partner", "Channel Partner"],
                ["broker", "Broker"],
                ["builder", "Builder"],
              ]}
              required
            />
            <Select
              label="Purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              options={[
                ["sell", "Sell"],
                ["rent", "Rent"],
              ]}
              required
            />
          </div>

          {/* category + property type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
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
              label="Property Type"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              options={[
                ["", "Select Property Type"],
                ...(formData.category === "residential" ? RESIDENTIAL : COMMERCIAL).map((t) => [
                  t,
                  t,
                ]),
              ]}
              required
            />
          </div>

          {/* title */}
          <Input
            label="Property Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="2 BHK Apartment in Prime Location"
            required
          />

          {/* price + area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={getPriceLabel()}
              type="number"
              name="price"
              min="1"
              value={formData.price}
              onChange={handleChange}
              placeholder={getPricePlaceholder()}
              required
            />
            <Input
              label="Area (sq.ft.)"
              type="number"
              name="area"
              min="1"
              value={formData.area}
              onChange={handleChange}
              placeholder="1,200"
              required
            />
          </div>

          {/* rooms */}
          {showRooms && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Bedrooms"
                type="number"
                name="bedrooms"
                min="0"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="2"
              />
              <Input
                label="Bathrooms"
                type="number"
                name="bathrooms"
                min="0"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="2"
              />
            </div>
          )}

          {/* description */}
          <Textarea
            label="Property Description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your property’s features, location advantages, amenities…"
            required
          />

          {/* address */}
          <Textarea
            label="Full Address"
            name="address"
            rows="2"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street, locality, landmark…"
            required
          />

          {/* city + pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city name"
              required
            />
            <Input
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="110001"
              required
            />
          </div>

          {/* contact details */}
          <div className="pt-4 border-t border-gray-200 space-y-4">
            <PhoneField
              label="Contact Number"
              value={formData.contactNumber}
              onChange={(val) => handlePhone(val, "contactNumber")}
              required
            />
            <PhoneField
              label="WhatsApp Number"
              value={formData.whatsappNumber}
              onChange={(val) => handlePhone(val, "whatsappNumber")}
              placeholder="Optional"
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
            <Input
              label="Available From"
              type="date"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleChange}
            />
          </div>

          {/* images */}
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium mb-2">Property Images</label>
            <div
              className="border-2 border-dashed border-[#ff9c00] rounded-lg p-4 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <PhotoIcon className="h-10 w-10 mx-auto text-[#ff9c00] mb-2" />
              <p className="text-sm text-[#164057]">
                Click to upload property photos (max {MAX_IMAGES})
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
                className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {images.map((img, i) => (
                  <div key={img.url} className="relative group">
                    <img
                      src={img.url}
                      alt={`Preview ${i + 1}`}
                      onClick={() => setModalIdx(i)}
                      className="w-full h-28 object-cover border-2 border-[#164057] cursor-pointer group-hover:border-[#ff9c00]"
                    />
                    <button
                      type="button"
                      onClick={() => removeImg(i)}
                      className="absolute top-1 right-1 bg-[#ff9c00] p-1.5 rounded-full opacity-0 group-hover:opacity-100"
                    >
                      <XMarkIcon className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#ff9c00] text-white font-semibold rounded-lg hover:bg-opacity-90"
          >
            {formData.purpose === "rent" ? "Post Property for Rent" : "Post Property for Sale"}
          </button>
        </form>
      </div>

      {/* modal viewer */}
      <AnimatePresence>
        {modalIdx !== null && images[modalIdx] && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalIdx(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              <motion.img
                src={images[modalIdx].url}
                alt="Large"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setModalIdx(null)}
                className="absolute top-2 right-2 bg-[#ff9c00] p-2 rounded-full"
              >
                <XMarkIcon className="h-5 w-5 text-white" />
              </button>
              {modalIdx > 0 && (
                <NavButton onClick={() => setModalIdx((i) => i - 1)} pos="left">
                  <ChevronLeftIcon className="h-5 w-5 text-white" />
                </NavButton>
              )}
              {modalIdx < images.length - 1 && (
                <NavButton onClick={() => setModalIdx((i) => i + 1)} pos="right">
                  <ChevronRightIcon className="h-5 w-5 text-white" />
                </NavButton>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── helper components ──────────────────────────────────── */
function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select {...props} className="w-full p-2 border rounded-lg">
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
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input {...props} className="w-full p-2 border rounded-lg" />
    </div>
  );
}
function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea {...props} className="w-full p-2 border rounded-lg" />
    </div>
  );
}
function PhoneField({ label, value, onChange, required, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <PhoneInput
        defaultCountry="in"
        value={value}
        onChange={onChange}
        inputClassName="w-full p-2 border rounded-lg"
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
      className={`absolute ${pos}-2 top-1/2 -translate-y-1/2 bg-[#164057] p-2 rounded-full`}
    >
      {children}
    </button>
  );
}
