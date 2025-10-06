import React, { useState } from "react";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import bg_img from "../assets/contact/bg_img.avif";
import indiaImg from "../assets/contactsection_img/india-flag.webp";


const RECAPTCHA_SITE_KEY = "6Lf2ntYrAAAAAAfA24Mm5fvJJa9aJKiknoLPWSfW"; // Replace with your key

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [phone, setPhone] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !phone || !formData.message) {
      toast.error("Please fill all the fields.");
      return;
    }
    if (!isValidPhone) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (!recaptchaValue) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }
    toast.success("Thanks for reaching out! We will get back to you soon.");
    console.log("Form submitted:", { ...formData, phone, recaptchaValue });

    setFormData({ fullName: "", email: "", message: "" });
    setPhone("");
    setRecaptchaValue(null);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center py-8 px-4 relative"
      style={{ backgroundImage: `url(${bg_img})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/70 to-[#ff9c00]/60"></div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative z-10">
        {/* Left Info Section */}
        <div className="text-white space-y-8 px-2">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Find Us Fast
          </h2>
          <p className="text-lg md:text-xl text-gray-100">
            Let's Discuss Your{" "}
            <span className="text-[#ff9c00] font-semibold">Property Goals</span>
          </p>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex gap-2">
                <p className="font-semibold">Phone:</p>
                
                <p>+91 85278 59176</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold mt-2">Mail ID:</p>
                <p className="mt-2">Business@Multimoneyproperty.com</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold mt-2">Address:</p>
                <p className="mt-2">Kalindi Kunj Delhi - 110025</p>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-[#ff9c00]">
              Our Locations
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[120px] text-center border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <img
                  src={indiaImg}
                  alt="India flag"
                  className="mx-auto mb-2 w-10 h-6 object-cover"
                />
                <span className="text-base font-medium text-white">India</span>
              </div>
             
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="bg-[#f7f7f7] backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/20 w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-[#164057] mb-2"
              >
                Full Name*
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 text-sm sm:text-base bg-[#f7f7f7] border border-[#164057] rounded-xl focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent text-[#164057] placeholder-[#164057]"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#164057] mb-2"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-sm sm:text-base bg-[#f7f7f7] border border-[#164057] rounded-xl focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent text-[#164057] placeholder-[#164057]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#164057] mb-2">
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
                inputClassName="!w-full !px-4 !py-3 !text-sm sm:!text-base !bg-[#f7f7f7] !border !border-[#164057] !text-[#164057] placeholder:!text-[#164057] rounded-xl focus:!ring-2 focus:!ring-[#ff9c00] focus:!border-transparent"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#164057] mb-2"
              >
                Message*
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your property needs..."
                className="w-full px-4 py-3 text-sm sm:text-base bg-[#f7f7f7] border border-[#164057] rounded-xl focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent text-[#164057] placeholder-[#164057] resize-none"
              ></textarea>
            </div>

            {/* reCAPTCHA */}
            <div>
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(value) => setRecaptchaValue(value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
    w-[150px] h-[60px] 
    border-3 border-[#ff9c00] 
    rounded-[45px] 
    bg-white text-[#ff9c00] 
    font-semibold text-[1.2em] 
    transition-all duration-300 
    transform hover:scale-110 
    hover:bg-[#ff9c00] hover:text-white 
    hover:text-[1.5em] 
    cursor-pointer
  "
            >
              Contact Us
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
