import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Password reset link sent to your email! 📧");
      console.log("Reset password email sent to:", email);
      setEmailSent(true);
      setLoading(false);
    }, 2000);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        {/* Left Side - Image Section */}
        <div className="lg:w-1/2 w-full h-64 lg:h-auto bg-gradient-to-br from-[#164057] to-[#0f2d3d] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-16 text-white h-full">
            <div className="max-w-md mx-auto lg:mx-0">
              <div className="w-16 h-16 bg-[#ff9c00] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Email <span className="text-[#ff9c00]">Sent!</span>
              </h1>
              <p className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-8">
                Your password reset link is on its way. Check your inbox for secure access recovery.
              </p>

              <div className="space-y-4">
                {[
                  "Secure one-time reset link",
                  "Link expires in 1 hour for safety",
                  "Check spam folder if not received",
                  "Immediate access upon reset"
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-6 h-6 bg-[#ff9c00] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
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
                    <span className="text-sm sm:text-base text-gray-200">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Success Message */}
        <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 lg:p-16">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg 
                  className="h-10 w-10 text-green-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Check Your Email
              </h2>
              
              <p className="text-sm text-gray-600">
                We've sent a password reset link to <strong className="text-[#ff9c00]">{email}</strong>
              </p>
            </div>

            <div className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-700 mb-2 text-center">Didn't receive the email?</p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    Check your spam or junk folder
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    Verify you entered the correct email address
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    Wait a few minutes and try again
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setEmailSent(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff9c00] transition-all duration-200"
                >
                  Try Another Email
                </button>
                
                <Link
                  to="/login"
                  className="flex-1 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#ff9c00] to-[#ff7b00] hover:from-[#ff7b00] hover:to-[#ff9c00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff9c00] text-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Side - Image Section */}
      <div className="lg:w-1/2 w-full h-64 lg:h-auto bg-gradient-to-br from-[#164057] to-[#0f2d3d] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-16 text-white h-full">
          <div className="max-w-md mx-auto lg:mx-0">
            <div className="w-16 h-16 bg-[#ff9c00] rounded-full flex items-center justify-center mb-6 shadow-lg">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Recover Your <span className="text-[#ff9c00]">Account</span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-8">
              Secure password recovery process to get you back into your account quickly and safely.
            </p>

            <div className="space-y-4">
              {[
                "Instant reset link delivery",
                "Bank-level security encryption",
                "24/7 account recovery support",
                "One-click secure access restoration"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-6 h-6 bg-[#ff9c00] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
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
                  <span className="text-sm sm:text-base text-gray-200">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 lg:p-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-600">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-transparent placeholder-gray-400 transition-all pr-10"
                  required
                  disabled={loading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg 
                    className="h-5 w-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <svg 
                  className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <p className="text-sm text-blue-800">
                  We'll send a secure password reset link to your email. The link will expire in 1 hour for your security.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#ff9c00] to-[#ff7b00] text-white font-semibold rounded-lg hover:from-[#ff7b00] hover:to-[#ff9c00] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending Reset Link...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                  Send Reset Link
                </span>
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#ff9c00] hover:text-[#ff7b00] transition-colors duration-200 inline-flex items-center"
                >
                  Back to Sign in
                  <svg 
                    className="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}