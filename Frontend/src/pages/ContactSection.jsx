import React, { useState } from "react";
import toast from "react-hot-toast";

import indiaImg from "../assets/contactsection_img/india-flag.webp";
import dubaiflag from "../assets/contactsection_img/dubai-flag.webp";
import bg_img from "../assets/contact/bg_img.avif"

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [phone, setPhone] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !phone || !formData.message) {
      toast.error("Please fill all the fields.");
      return;
    }

    if (!isValidPhone) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    toast.success("Thanks for reaching out! We will get back to you soon.");
    console.log("Form submitted:", { ...formData, phone });

    // Reset form
    setFormData({ fullName: "", email: "", message: "" });
    setPhone("");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat flex items-center justify-center py-8 px-4 relative"
      style={{
        backgroundImage:
          bg_img,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/70 to-[#ff9c00]/80"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full my-10">
        {/* Left Content Section */}
        <div className="text-white space-y-8 px-2">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-[#164058] to-[#164058] bg-clip-text text-transparent">
              Find Us Fast
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-gray-100 leading-relaxed font-light">
              Let's Discuss Your{" "}
              <span className="font-semibold text-[#ff9c00]">
                Property Goals
              </span>
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 text-sm sm:text-base">
            <div className="flex items-start space-x-4">
              <div className="bg-[#164058] p-3 rounded-xl backdrop-blur-sm">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-300">Phone</p>
                <p className="font-semibold">+1 (999) 073-5864</p>
                <p className="text-gray-300 mt-2">Mail ID</p>
                <p className="font-semibold">
                  Business@Multimoneyproperty.com
                </p>
                <p className="text-gray-300 mt-2">Address</p>
                <p className="font-semibold">Kalindi Kunj Delhi - 110025</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-500 p-3 rounded-xl backdrop-blur-sm">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-300">Email</p>
                <p className="font-semibold">hello@property.com</p>
              </div>
            </div>
          </div>

          {/* Locations Section */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold bg-[#ff9c00] text-transparent bg-clip-text">
              Our Locations
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[120px] text-center border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <img
                  src={indiaImg}
                  alt="India flag"
                  className="mx-auto mb-2 w-10 h-6 object-cover"
                />
                <span className="text-base font-medium">India</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[120px] text-center border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <img
                  src={dubaiflag}
                  alt="Dubai flag"
                  className="mx-auto mb-2 w-10 h-6 object-cover"
                />
                <span className="text-base font-medium">Dubai</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/20 w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-white mb-2"
              >
                Full Name*
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number*
              </label>
              <PhoneInput
                defaultCountry="in"
                value={phone}
                onChange={(phone, meta) => {
                  setPhone(phone);
                  setIsValidPhone(meta.isValid);
                }}
                className="w-full"
                inputClassName="!w-full !px-4 !py-3 !text-sm sm:!text-base !bg-white/5 !border !border-white/20 !text-white placeholder:!text-gray-300 focus:!ring-2 focus:!ring-blue-400 focus:!border-transparent rounded-xl"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white mb-2"
              >
                Message*
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent text-white placeholder-gray-300 resize-none"
                placeholder="Tell us about your property needs..."
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-[#164058] hover:to-[#164058] text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg border border-white/20 cursor-pointer"
            >
              <span className="flex items-center justify-center text-sm sm:text-base">
                Contact Us
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-xs sm:text-sm">
              We'll get back to you within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
