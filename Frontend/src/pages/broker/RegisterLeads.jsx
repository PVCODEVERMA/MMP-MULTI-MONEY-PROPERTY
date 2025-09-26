import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput, isValidPhoneNumber } from "react-international-phone";
import "react-international-phone/style.css";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterLeads({ onClose }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("register"); 
  const [role, setRole] = useState("broker");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [contactOk, setContactOk] = useState(true);
  const [touched, setTouched] = useState({});

  const errors = {
    name: touched.name && name.trim().length < 2 ? "Please enter a valid name" : "",
    phone: touched.phone && !isValidPhoneNumber(phone) ? "Please enter a valid phone number" : "",
    city: touched.city && city.trim() === "" ? "City is required" : "",
    consent: !contactOk ? "Consent is required" : "",
    email: touched.email && email.trim() === "" ? "Email required" : "",
    password: touched.password && password.length < 6 ? "Password too short" : "",
  };

  const isRegisterValid = !errors.name && !errors.phone && !errors.city && !errors.consent;
  const isLoginValid = !errors.email && !errors.password;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "register" && !isRegisterValid) return;
    if (mode === "login" && !isLoginValid) return;

    if (mode === "register") {
      toast.success(" Registration successful! Redirecting to Leads...");
      onClose?.();
      navigate("/home/leads");
    } else if (mode === "login") {
      toast.success("Login successful! Redirecting to Leads...");
      onClose?.();
      navigate("/home/leads");
    } else if (mode === "forgot") {
      toast.success("Password reset instructions have been sent to your email.");
      onClose?.();
      navigate("/login");
    }
  };

  return (
    <>
      {/* Toaster for toast notifications */}
      <Toaster position="top-right" />

      <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-2xl space-y-5">
        <h1 className="text-2xl font-bold text-center text-[#154056]">
          {mode === "register"
            ? `Register as ${role === "broker" ? "Broker" : "Developer"}`
            : mode === "login"
            ? "Login to Your Account"
            : "Reset Password"}
        </h1>

        {mode === "register" && (
          <>
            {/* Role toggle */}
            <div className="flex gap-3">
              {["broker", "developer"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-full transition cursor-pointer ${
                    role === r ? "bg-[#ff9c00] text-white" : "border hover:bg-gray-50"
                  }`}
                >
                  {r[0].toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            {/* Name */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="Name"
              className={`w-full border-b p-2 outline-none ${errors.name && "border-[#ff9c00]"}`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

            {/* Email */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ID (optional)"
              className="w-full border-b p-2 outline-none"
            />

            {/* Phone */}
            <PhoneInput
              defaultCountry="in"
              value={phone}
              onChange={setPhone}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              inputClassName={`!border-b !w-full !py-2 !outline-none ${errors.phone ? "!border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

            {/* City */}
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, city: true }))}
              placeholder="City"
              className={`w-full border-b p-2 outline-none ${errors.city && "border-red-500"}`}
            />
            {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}

            {/* Consent */}
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={contactOk}
                onChange={(e) => setContactOk(e.target.checked)}
                className="mt-1 accent-[#ff9c00] text-white cursor-pointer"
              />
              I agree to be contacted by MULTI MONEY PROPERTY and agents via WhatsApp, SMS, phone, email etc.
            </label>
            {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}
          </>
        )}

        {/* Login and Forgot Password Sections */}
        {/* Keep your existing login/forgot UI here */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            (mode === "register" && !isRegisterValid) ||
            (mode === "login" && !isLoginValid)
          }
          className={`w-full py-3 rounded-lg text-white font-medium transition cursor-pointer ${
            ((mode === "register" && isRegisterValid) ||
              (mode === "login" && isLoginValid) ||
              mode === "forgot")
              ? "bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] hover:brightness-110"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {mode === "register"
            ? "Go to Leads"
            : mode === "login"
            ? "Sign In"
            : "Send Reset Instructions"}
        </button>
      </form>
    </>
  );
}
