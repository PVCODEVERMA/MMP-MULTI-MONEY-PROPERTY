import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import mmp_imag from "../../assets/registerimg/form_img.avif";
import { useAuthSuperAdmin } from "../../context/AuthContextSuperAdmin.jsx";

export default function ForgotPasswordSuperAdmin() {
  const [form, setForm] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const { forgotPassword } = useAuthSuperAdmin();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const res = await forgotPassword(form.email);
      toast.success(res.message || "Password reset instructions sent to your email!");
      setEmailSent(true);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to send reset instructions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Marketing Section */}
        <div className="lg:w-1/2 w-full h-screen lg:h-auto bg-gradient-to-br from-[#164057] to-[#0f2d3d] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${mmp_imag})`,
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-16 text-white h-full">
            <div className="max-w-md mx-auto lg:mx-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Reset Your{" "}
                <span className="text-[#ff9c00]">SuperAdmin</span> Password
              </h1>
              <p className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-6">
                Secure password recovery process for administrative accounts with enhanced security verification.
              </p>

              {/* Security Steps */}
              <div className="space-y-3 mb-8">
                {[
                  "Enter your registered email address",
                  "Receive secure reset instructions",
                  "Create a new strong password",
                  "Regain access to your account",
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-6 h-6 bg-[#ff9c00] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-sm sm:text-base">{text}</span>
                  </div>
                ))}
              </div>

              {/* Security Info */}
              <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Security <span className="text-[#ff9c00]">Verified</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-200 mb-6">
                  Your password reset request is protected with enhanced security measures
                </p>
                <ul className="text-left max-w-sm mx-auto space-y-2 text-sm sm:text-base">
                  {[
                    "Encrypted email communication",
                    "Time-limited reset links",
                    "Identity verification required",
                    "Secure token generation",
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
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 lg:p-16">
          <div className="w-full max-w-md">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Reset <span className="text-[#ff9c00]">Password</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Enter your email to receive password reset instructions
              </p>
            </div>

            {emailSent ? (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Check Your Email</h3>
                <p className="text-gray-600 mb-6">
                  We've sent password reset instructions to <strong>{form.email}</strong>
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => setEmailSent(false)}
                    className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Try Another Email
                  </button>
                  <Link
                    to="/loginSuperAdmin"
                    className="block w-full py-3 bg-[#ff9c00] text-white font-semibold rounded-lg hover:bg-[#ff7b00] transition-all text-center"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-2 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                {/* Form Field */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent transition-all placeholder-gray-400"
                      placeholder="Enter your registered email"
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
                      Sending instructions...
                    </>
                  ) : (
                    "Send Reset Instructions"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link
                      to="/loginSuperAdmin"
                      className="text-[#ff9c00] font-semibold hover:underline"
                    >
                      Back to Login
                    </Link>
                  </p>
                </div>

                {/* Security Notice */}
                <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
                  <p>For security reasons, reset links expire after 1 hour</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}