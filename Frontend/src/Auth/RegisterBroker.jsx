import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { PhoneInput, isValidPhoneNumber } from "react-international-phone";
import "react-international-phone/style.css";
import mmp_imag from "../assets/registerimg/form_img.avif";
import { motion } from "framer-motion";

export default function RegisterBroker() {
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const [role, setRole] = useState("broker");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirm: "",
  });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const handlePhoneChange = (value) => setForm({ ...form, phone: value });

  async function submit(e) {
    e.preventDefault();

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isValidPhoneNumber(form.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setBusy(true);

    // Dummy API delay
    setTimeout(() => {
      toast.success(
        `${role[0].toUpperCase() + role.slice(1)} account created`
      );
      setBusy(false);
      nav("/home/leads");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <Toaster position="top-center" />

      {/* Right Side - Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 lg:p-16 order-1 lg:order-2">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Register as {role[0].toUpperCase() + role.slice(1)}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Fill in your details to create your account and start managing
              leads with{" "}
              <span className="text-[#ff9c00] font-semibold">
                MMP MB Prime{" "}
                <motion.span
                  className="px-2 py-1 text-xs font-bold rounded bg-[#154056] text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  New
                </motion.span>
              </span>
            </p>
          </div>

          <form
            onSubmit={submit}
            className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            {/* Role toggle */}
            <div className="flex gap-3 mb-4">
              {["broker", "developer"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-full transition font-medium ${
                    role === r
                      ? "bg-[#ff9c00] text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {r[0].toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={update("name")}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] outline-none transition"
            />
            <input
              type="email"
              placeholder="Work Email"
              value={form.email}
              onChange={update("email")}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] outline-none transition"
            />

            {/* FIXED: Phone Input with validation */}
            <PhoneInput
              defaultCountry="in"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handlePhoneChange}
              className="w-full"
              inputStyle={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />

            <input
              type="text"
              placeholder="Company / Brokerage"
              value={form.company}
              onChange={update("company")}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] outline-none transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={update("password")}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] outline-none transition"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={update("confirm")}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] outline-none transition"
            />

            <button
              type="submit"
              disabled={busy}
              className={`w-full py-4 text-white font-semibold rounded-lg shadow-lg transition-all cursor-pointer ${
                busy
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#ff9c00] to-[#ff7b00] hover:from-[#ff7b00] hover:to-[#ff9c00] "
              }`}
            >
              {busy
                ? "Creating… "
                : `Create ${role[0].toUpperCase() + role.slice(1)} Account`}
            </button>

            <p className="mt-4 text-center text-sm">
              Already registered?{" "}
              <Link
                to="/login-broker"
                className="text-[#ff9c00] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Left Side - Marketing Section */}
      <div className="lg:w-1/2 w-full h-64 lg:h-auto bg-gradient-to-br from-[#164057] to-[#0f2d3d] relative overflow-hidden order-2 lg:order-1">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${mmp_imag})` }}
        />
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-16 text-white">
          <div className="max-w-md mx-auto lg:mx-0">
            <motion.h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Join as a {role[0].toUpperCase() + role.slice(1)} with{" "}
              <span className="text-[#ff9c00] font-semibold">
                MMP MB Prime{" "}
                <motion.span
                  className="px-2 py-1 text-xs font-bold rounded bg-[#154056] text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  New
                </motion.span>
              </span>
            </motion.h1>

            <p className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-6">
              Create your account to manage leads, connect with clients, and
              grow your business efficiently.
            </p>
            <div className="space-y-3">
              {[
                "Manage leads efficiently",
                "Secure account and data",
                "Grow your business",
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
          </div>
        </div>
      </div>
    </div>
  );
}
