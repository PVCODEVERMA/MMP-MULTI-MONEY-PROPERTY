import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import mmp_imag from "../assets/registerimg/form_img.avif";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);

    try {
      const res = await login(form); 
      console.log("Logged in user:", res.user);

      navigate("/"); 
    } catch (err) {
      
    } finally {
      setBusy(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 lg:p-16 order-1 lg:order-2">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Welcome Back
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Sign in to continue your journey with{" "}
              <span className="text-[#ff9c00] font-semibold">MMP</span>
            </p>
          </div>

          <form
            onSubmit={submit}
            className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent placeholder-gray-400 transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent placeholder-gray-400 transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              disabled={busy}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#ff9c00] to-[#ff7b00] text-white font-semibold rounded-lg hover:from-[#ff7b00] hover:to-[#ff9c00] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {busy ? "Signing in..." : "Login"}
            </button>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-[#ff9c00] hover:underline cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-sm sm:text-base text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-[#ff9c00] font-semibold hover:underline transition-colors cursor-pointer"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Left Side - Marketing Section */}
      <div className="lg:w-1/2 w-full h-full lg:h-auto bg-gradient-to-br from-[#164057] to-[#0f2d3d] relative overflow-hidden order-2 lg:order-1">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${mmp_imag})` }}
        />
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-16 text-white">
          <div className="max-w-md mx-auto lg:mx-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Welcome to{" "}
              <span className="text-[#ff9c00]">MMP Property Platform</span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-6">
              Your trusted partner to grow faster in the real estate industry.
              Sign in to manage your listings, connect with verified clients,
              and explore premium opportunities.
            </p>

            <div className="space-y-3">
              {[
                "Access verified leads instantly",
                "Showcase your properties to the right buyers",
                "Boost sales with premium features",
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
