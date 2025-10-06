import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthSubAdmin } from "../../context/AuthContextSubAdmin";

export default function LoginSubAdmin() {
  const navigate = useNavigate();
  const { login, subAdmin, setSubAdmin } = useAuthSubAdmin();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form.email, form.password);

      if (res?.subAdmin?.role === "SubAdmin") {
        localStorage.setItem("subAdminToken", res.accessToken);
        setSubAdmin(res.subAdmin);
        navigate("/subadmin-dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // redirect if already logged in
  useEffect(() => {
    if (subAdmin) navigate("/subadmin-dashboard");
  }, [subAdmin, navigate]);

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col lg:flex-row">
      {/* Left Side - Image Section */}
      <div className="hidden md:flex md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-[#164057] to-[#0f2d3d] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1973&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-16 text-white h-full">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Welcome to <span className="text-[#ff9c00]">Sub Admin Portal</span>
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Secure access to your administrative dashboard with advanced
            features and controls.
          </p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Sub Admin <span className="text-[#ff9c00]">Sign In</span>
            </h2>
            <p className="text-sm text-gray-600">
              Access your administrative dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your admin email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff9c00] outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff9c00] outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#ff9c00] to-[#ff7b00] text-white font-semibold rounded-lg shadow-md disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link
              to="/forgotPasswordSubAdmin"
              className="text-[#ff9c00] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
