import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput, isValidPhoneNumber } from "react-international-phone";
import "react-international-phone/style.css";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function RegisterLeads({ onClose }) {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showRoleSelection, setShowRoleSelection] = useState(true);
  const [role, setRole] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    company: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [contactOk, setContactOk] = useState(true);
  const [touched, setTouched] = useState({});
  const [busy, setBusy] = useState(false);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setForm({ ...form, role: selectedRole });
    setShowRoleSelection(false);
  };

  const handleBackToRoleSelection = () => {
    setShowRoleSelection(true);
    setRole("");
    setForm({ ...form, role: "" });
  };

  const handleFormChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return toast.error("Please select a valid image file");
    if (file.size > 5 * 1024 * 1024)
      return toast.error("Image size should be less than 5MB");
    setProfileImage(file);
    const reader = new FileReader();
    reader.onload = () => setProfilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const getInitial = () => {
    if (form.name.trim()) return form.name.trim().charAt(0).toUpperCase();
    if (role) return role.charAt(0).toUpperCase();
    return "U";
  };

  const errors = {
    name:
      touched.name && form.name.trim().length < 2
        ? "Please enter a valid name"
        : "",
    phone:
      touched.phone && !isValidPhoneNumber(form.phone)
        ? "Please enter a valid phone number"
        : "",
    city: touched.city && !form.city.trim() ? "City is required" : "",
    company:
      touched.company && !form.company.trim() ? "Company name is required" : "",
    email: touched.email && !form.email.trim() ? "Email is required" : "",
    password:
      touched.password && form.password.length < 6
        ? "Password must be at least 6 characters"
        : "",
    confirmPassword:
      touched.confirmPassword && form.password !== form.confirmPassword
        ? "Passwords do not match"
        : "",
    consent: !contactOk ? "You must agree to continue" : "",
  };

  const isRegisterValid = !Object.values(errors).some((e) => e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isRegisterValid) return console.warn("Validation failed", errors);

    try {
      setBusy(true);

      const fd = new FormData();
      fd.append("fullName", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("city", form.city);
      fd.append("company", form.company);
      fd.append("password", form.password);
      fd.append("confirmPassword", form.confirmPassword);
      fd.append("role", form.role);
      if (profileImage) fd.append("profileImage", profileImage);

      const res = await register(fd);
      console.log("Register API Response:", res);

      toast.success(res.message || "Registration successful!");
      setForm({
        name: "",
        email: "",
        phone: "",
        city: "",
        company: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      setProfileImage(null);
      setProfilePreview(null);
      setContactOk(true);
      setTouched({});
      setRole("");
      setShowRoleSelection(true);

      onClose?.();
      navigate("/welcome");
    } catch (err) {
      console.error("Register API Error:", err);
      toast.error(err.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  // Role Selection Screen
  if (showRoleSelection) {
    return (
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">
            Join as <span className="text-[#ff9c00]">Professional</span>
          </h1>
          <p className="text-gray-600 text-sm">
            Select your role to get started
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {["Channel Partner", "Broker", "Developer", "Builder"].map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => handleRoleSelect(r)}
              className="p-5 rounded-xl transition-all duration-300 font-semibold border-2 border-gray-200 hover:border-[#ff9c00] hover:bg-orange-50 text-gray-700 hover:text-[#ff9c00] text-base cursor-pointer shadow-sm hover:shadow-md"
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Registration Form Screen
  return (
    <form
      className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar"
      onSubmit={handleSubmit}
    >
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBackToRoleSelection}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 mb-2 cursor-pointer group"
      >
        <svg
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </button>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Register as <span className="text-[#ff9c00]">{role}</span>
        </h1>
        <p className="text-gray-500 text-sm">Complete your profile details</p>
      </div>

      {/* Profile Image Upload */}
      <div className="text-center">
        <div className="flex flex-col items-center mb-4">
          <div
            className="w-20 h-20 rounded-full bg-gradient-to-r from-[#ff9c00] to-[#ff7b00] flex items-center justify-center text-white text-xl font-bold shadow-lg mb-3 relative overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl"
            onClick={handleAvatarClick}
          >
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile preview"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <span className="transition-transform duration-300 group-hover:opacity-0">
                {getInitial()}
              </span>
            )}

            {!profilePreview && (
              <div className="absolute inset-0 bg-transparent bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
            )}
          </div>
          <p className="text-xs text-gray-500 transition-colors duration-200 group-hover:text-gray-700">
            {profilePreview ? "Click to change photo" : "Click to upload photo"}
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

      {/* Form Inputs */}
      <div className="space-y-5">
        {[
          "name",
          "email",
          "company",
          "city",
          "password",
          "confirmPassword",
        ].map((field) => (
          <div key={field} className="space-y-2">
            <input
              type={field.includes("password") ? "password" : "text"}
              value={form[field]}
              onChange={handleFormChange(field)}
              onBlur={() => setTouched((t) => ({ ...t, [field]: true }))}
              placeholder={
                field === "confirmPassword"
                  ? "Confirm Password *"
                  : field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1") +
                    " *"
              }
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none focus:border-[#ff9c00] ${
                errors[field]
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200"
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-xs font-medium px-1">
                {errors[field]}
              </p>
            )}
          </div>
        ))}

        {/* Phone Input */}
        <div className="space-y-2">
          <div
            className={`px-4 py-2 rounded-xl border-2 transition-all duration-200 ${
              errors.phone
                ? "border-red-500"
                : "border-gray-200 focus-within:border-[#ff9c00]"
            }`}
          >
            <PhoneInput
              defaultCountry="in"
              value={form.phone}
              onChange={handlePhoneChange}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              inputClassName="!border-none !w-full !py-2 !outline-none"
              countrySelectorStyleProps={{
                buttonClassName: "!border-none",
              }}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs font-medium px-1">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={contactOk}
            onChange={(e) => setContactOk(e.target.checked)}
            className="mt-0.5 accent-[#ff9c00] cursor-pointer transform scale-110"
          />
          <span>
            I agree to be contacted by MULTI MONEY PROPERTY and agents via
            WhatsApp, SMS, phone, email etc.
          </span>
        </label>
        {errors.consent && (
          <p className="text-red-500 text-xs font-medium px-1">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Submit Button */}

      <button
        type="submit"
        disabled={!isRegisterValid || busy}
        className={`w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg focus:outline-none  cursor-pointer ${
          isRegisterValid && !busy
            ? "bg-gradient-to-r from-[#ff9c00] to-[#ff7b00] hover:shadow-2xl hover:brightness-105 transform hover:-translate-y-0.5"
            : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-80"
        }`}
      >
        {busy ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Registering...
          </span>
        ) : (
          <span className="relative">
            Register as {role}
            {/* Decorative spark effect */}
            {isRegisterValid && !busy && (
              <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-r from-yellow-200 via-orange-300 to-yellow-400 opacity-30 animate-pulse blur-xl pointer-events-none"></span>
            )}
          </span>
        )}
      </button>
    </form>
  );
}
