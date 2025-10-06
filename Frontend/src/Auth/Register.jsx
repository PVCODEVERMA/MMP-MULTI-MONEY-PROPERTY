import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import mmp_imag from "../assets/registerimg/form_img.avif";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import imageCompression from "browser-image-compression";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const { register } = useAuth(); // API call
  const fileInputRef = useRef(null);



const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    try {
      const options = {
        maxSizeMB: 1,       // compress to max 1MB
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      setProfileImage(compressedFile);

      const reader = new FileReader();
      reader.onload = () => setProfilePreview(reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error(err);
      toast.error("Failed to compress image");
    }
  }
};


  const handleAvatarClick = () => fileInputRef.current?.click();

  const getInitial = () =>
    form.fullName.trim() ? form.fullName.trim().charAt(0).toUpperCase() : "U";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("fullName", form.fullName);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("city", form.city);
      fd.append("password", form.password);
      fd.append("confirmPassword", form.confirmPassword);
      fd.append("role", "User"); // Always User
      if (profileImage) fd.append("profileImage", profileImage);

      const res = await register(fd);
      toast.success(res.message || "Registration successful!");

      // Reset form
      setForm({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        password: "",
        confirmPassword: "",
      });
      setProfileImage(null);
      setProfilePreview(null);

     navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Right Side - Form Section */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 lg:p-16 order-1 lg:order-2">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Create Your <span className="text-[#ff9c00]">Free Account</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Join thousands of real estate professionals already growing with
              MMP
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-2 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            {/* Profile Image */}
            <div className="text-center">
              <div className="flex flex-col items-center ">
                <div
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-[#ff9c00] to-[#ff7b00] flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-1 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group"
                  onClick={handleAvatarClick}
                >
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="transition-transform duration-300 group-hover:opacity-0">
                      {getInitial()}
                    </span>
                  )}

                  <div className="absolute inset-0 bg-transparent bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-10 h-10 text-white "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  {profilePreview
                    ? "Click avatar to change image"
                    : "Click avatar to upload image"}
                </p>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {["fullName", "email", "city", "password", "confirmPassword"].map(
                (key) => (
                  <div key={key}>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      {key === "fullName"
                        ? "Full Name *"
                        : key === "email"
                        ? "Email Address *"
                        : key === "city"
                        ? "City *"
                        : key === "password"
                        ? "Password *"
                        : "Confirm Password *"}
                    </label>
                    <input
                      type={key.includes("password") ? "password" : "text"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all placeholder-gray-400"
                      placeholder={`Enter your ${key}`}
                      required
                      minLength={key.includes("password") ? 6 : undefined}
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                    />
                  </div>
                )
              )}

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <PhoneInput
                  defaultCountry="in"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={(value) => setForm({ ...form, phone: value })}
                  className="w-full"
                  inputStyle={{
                    width: "100%",
                    padding: "12px",
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                    border: "1px solid #d1d5db",
                  }}
                />
              </div>
            </div>

            <button
  type="submit"
  disabled={loading}
  className="w-full py-4 bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] text-white font-semibold rounded-lg hover:from-[#ff7b00] hover:to-[#ff9c00] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center"
>
  {loading ? (
    <>
      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Setting up your account...
    </>
  ) : (
    "Start Your Journey"
  )}
</button>


            <div className="text-center mt-4">
              <p className="text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#ff9c00] font-semibold hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Left Side - Marketing Section */}
      <div className="lg:w-1/2 w-full h-full lg:h-auto bg-gradient-to-br from-[#164057] to-[#0f2d3d] relative overflow-hidden order-2 lg:order-1">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url(${mmp_imag})`,
          }}
        />
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-16 text-white">
          <div className="max-w-md mx-auto lg:mx-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Grow Faster with{" "}
              <span className="text-[#ff9c00]">India's Most Trusted</span>{" "}
              Property Platform
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-6">
              Connect with verified buyers, showcase your properties, and
              accelerate your real estate business with MMP.
            </p>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                "Showcase unlimited properties for free",
                "Connect only with verified buyers & sellers",
                "Manage and track your listings seamlessly",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-6 h-6 bg-[#ff9c00] rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base">{text}</span>
                </div>
              ))}
            </div>
            {/* Upgrade to Premium Section */}
            <div className="mt-10 sm:mt-12 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-lg p-6 sm:p-10 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                Upgrade to <span className="text-[#ff9c00]">Premium</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-200 mb-6">
                Unlock priority listings, connect with top buyers, and grow your
                business faster with Premium.
              </p>
              <ul className="text-left max-w-sm mx-auto space-y-2 text-sm sm:text-base mb-6">
                {[
                  "Priority property visibility",
                  "Direct access to serious buyers",
                  "Advanced analytics & insights",
                  "Dedicated premium support",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="w-5 h-5 bg-[#ff9c00] rounded-full flex items-center justify-center mr-2">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/register-broker"
                className="inline-block px-6 py-3 bg-[#ff9c00] text-white font-semibold rounded-lg shadow-md hover:bg-[#154056] transition-all cursor-pointer"
              >
                Upgrade to Premium Leads
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
