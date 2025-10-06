import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import mmp_imag from "../assets/registerimg/form_img.avif"

export default function ResetPassword() {
  const { token } = useParams();
  const nav = useNavigate();
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);

  const change = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/auth/reset-password/" + token, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Password updated. Please sign in");
      nav("/login");
    } catch (err) {
      toast.error(err.message || "Error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Right Side - Reset Password Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 lg:p-16 order-1 lg:order-2">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Reset Your Password
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Enter your new password to continue using{" "}
              <span className="text-[#ff9c00] font-semibold">MMP</span>
            </p>
          </div>

          <form
            onSubmit={change}
            className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                New Password *
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent placeholder-gray-400 transition-all"
                required
                minLength={6}
              />
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Must be at least 6 characters long
              </p>
            </div>

            <button
              disabled={busy}
              className="w-full py-4 bg-gradient-to-r from-[#ff9c00] to-[#ff7b00] text-white font-semibold rounded-lg hover:from-[#ff7b00] hover:to-[#ff9c00] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? "Updating..." : "Update Password"}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-[#ff9c00] hover:underline"
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
              Secure Your Account with{" "}
              <span className="text-[#ff9c00]">New Password</span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-6">
              Protect your account by updating your password regularly. Keep
              your credentials safe and enjoy seamless access to{" "}
              <span className="font-semibold">MMP</span>.
            </p>

            <div className="space-y-3">
              {[
                "Strong passwords protect your account",
                "Easily recover access anytime",
                "Stay secure with advanced protection",
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
