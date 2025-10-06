import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import mmp_imag from "../assets/registerimg/form_img.avif"
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Reset link sent. Check your inbox");
    } catch (err) {
      toast.error(err.message || "Error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Right Side - Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 lg:p-16 order-1 lg:order-2">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Forgot Your Password?
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Enter your email to receive a password reset link for{" "}
              <span className="text-[#ff9c00] font-semibold">MMP</span>
            </p>
          </div>

          <form
            onSubmit={send}
            className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent placeholder-gray-400 transition-all"
                required
              />
            </div>

            <button
              disabled={busy}
              className="w-full py-4 bg-gradient-to-r from-[#ff9c00] to-[#ff7b00] text-white font-semibold rounded-lg hover:from-[#ff7b00] hover:to-[#ff9c00] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {busy ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-[#ff9c00] hover:underline cursor-pointer"
              >
                Back to Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Left Side - Marketing Section */}
      <div className="lg:w-1/2 w-full h-64 lg:h-auto bg-gradient-to-br from-[#164057] to-[#0f2d3d] relative overflow-hidden order-2 lg:order-1">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage:
              `url(${mmp_imag})`,
          }}
        />
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-16 text-white">
          <div className="max-w-md mx-auto lg:mx-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Recover Access with{" "}
              <span className="text-[#ff9c00]">Your Email</span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-6">
              Never lose access to your account. Enter your registered email and
              get a secure reset link sent instantly to regain access to{" "}
              <span className="font-semibold">MMP</span>.
            </p>

            <div className="space-y-3">
              {[
                "Quickly regain access to your account",
                "Secure and reliable password reset",
                "Stay protected with advanced security",
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
