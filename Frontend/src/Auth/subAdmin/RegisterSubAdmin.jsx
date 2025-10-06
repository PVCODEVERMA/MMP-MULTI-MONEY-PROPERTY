import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import toast from "react-hot-toast";
import { useAuthSubAdmin } from "../../context/AuthContextSubAdmin";
import mmp_imag from "../../assets/registerimg/form_img.avif";
import imageCompression from "browser-image-compression";

export default function RegisterSubAdmin() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    department: "",
    inviteSecretKey: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuthSubAdmin();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      try {
        const options = {
          maxSizeMB: 1,
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

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const getInitial = () => {
    return form.fullName.trim() ? form.fullName.trim().charAt(0).toUpperCase() : "A";
  };

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
      fd.append("password", form.password);
      fd.append("confirmPassword", form.confirmPassword);
      fd.append("department", form.department);
      fd.append("inviteSecretKey", form.inviteSecretKey);
      fd.append("role", "SubAdmin");
      if (profileImage) fd.append("profileImage", profileImage);

      const res = await register(fd);
      // toast.success(res.message || "Sub-Admin registration successful!");

      // Reset form
      setForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        department: "",
        inviteSecretKey: "",
      });
      setProfileImage(null);
      setProfilePreview(null);

      navigate("/loginSubAdmin");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Marketing Section (Hidden on mobile by default) */}
        <div className={`lg:w-1/2 w-full h-screen lg:h-auto bg-gradient-to-br from-[#164057] to-[#0f2d3d] relative overflow-hidden ${
          showInfo ? 'block' : 'hidden lg:block'
        }`}>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${mmp_imag})`,
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-16 text-white h-full">
            <div className="max-w-md mx-auto lg:mx-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 -mt-140">
                Manage Efficiently with{" "}
                <span className="text-[#ff9c00]">Sub-Admin</span> Access
              </h1>
              <p className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-6">
                Empower your team with controlled access and streamlined real estate operations management.
              </p>

              {/* Benefits */}
              <div className="space-y-2">
                {[
                  "Secure role-based access management",
                  "Real-time monitoring and analytics",
                  "Streamlined team collaboration",
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

              {/* Admin Features Section */}
              <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                 Sub Admin <span className="text-[#ff9c00]">Features</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-200 mb-6">
                  Comprehensive tools for efficient team and property management
                </p>
                <ul className="text-left max-w-sm mx-auto space-y-2 text-sm sm:text-base mb-6">
                  {[
                    "Role-based permission system",
                    "Team performance analytics",
                    "Property listing management",
                    "User activity monitoring",
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
               
              </div>

              {/* Mobile Info Toggle */}
              <div className="lg:hidden mt-8 text-center">
                <button
                  onClick={() => setShowInfo(false)}
                  className="bg-[#ff9c00] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#ff7b00] transition-all shadow-lg"
                >
                  Back to Registration
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section (Always visible on mobile, togglable on desktop) */}
        <div className={`lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 lg:p-16 transition-all duration-300 ${
          !showInfo ? 'block' : 'hidden lg:flex'
        }`}>
          <div className="w-full max-w-md">
           
            
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Create <span className="text-[#ff9c00]">Sub-Admin</span> Account
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Register new sub-admin for real estate management
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
                {["fullName", "email", "password", "confirmPassword"].map(
                  (key) => (
                    <div key={key}>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        {key === "fullName"
                          ? "Full Name *"
                          : key === "email"
                          ? "Email Address *"
                          : key === "password"
                          ? "Password *"
                          : "Confirm Password *"}
                      </label>
                      <input
                        type={key.includes("password") ? "password" : "text"}
                        name={key}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all placeholder-gray-400"
                        placeholder={`Enter your ${key}`}
                        required
                        minLength={key.includes("password") ? 6 : undefined}
                        value={form[key]}
                        onChange={handleChange}
                      />
                    </div>
                  )
                )}

                {/* Phone Number */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <PhoneInput
                    defaultCountry="in"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={handlePhoneChange}
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

                {/* Department */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                    <option value="property_management">Property Management</option>
                    <option value="leasing">Leasing</option>
                    <option value="customer_service">Customer Service</option>
                    <option value="operations">Operations</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>

                {/* Invite Secret Key */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Invite Secret Key *
                  </label>
                  <input
                    type="text"
                    name="inviteSecretKey"
                    value={form.inviteSecretKey}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all placeholder-gray-400"
                    placeholder="Enter secret key"
                    required
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
                    Setting up sub-admin account...
                  </>
                ) : (
                  "Create Sub-Admin Account"
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-xs sm:text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/loginSubAdmin"
                    className="text-[#ff9c00] font-semibold hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>

              {/* SubAdmin Dashboard Link */}
              <div className="text-center mt-4">
                <Link
                  to="/register-superAdmin"
                  className="inline-flex items-center text-[#ff9c00] font-semibold hover:underline text-sm"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Go to Super Admin Sign in here
                </Link>
              </div>

              {/* Additional Info */}
              <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
                <p>Only authorized administrators can create sub-admin accounts</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}