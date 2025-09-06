import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Context for Authentication
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// Import Error Boundary
import ErrorBoundary from "./common/ErrorBoundary.jsx";

// Import your Enhanced Navbar component
import Navbar from "./components/Shared/Header.jsx";

// Authentication Components (Lazy loaded)
const Login = lazy(() => import("./Auth/Login.jsx"));
const Register = lazy(() => import("./Auth/Register.jsx"));
const RegisterBroker = lazy(() => import("./Auth/RegisterBroker.jsx"));
const ForgotPassword = lazy(() => import("./Auth/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./Auth/ResetPassword.jsx"));

// Dashboard Components user (Lazy loaded)
const Dashboard = lazy(() => import("./components/User/Dashboard.jsx"));

// Dashboard Components SubAdmin (Lazy loaded)
const SubAdminLayout = lazy(() =>
  import("./layout/subAdminLayOut/SubAdmin.jsx")
);
const SubAdminDashboard = lazy(() =>
  import("./layout/subAdminLayOut/SubAdminDashboard.jsx")
);
const BrokerManagement = lazy(() =>
  import("./components/SubAdmin/BrokerManagement")
);
const BrokerPerformance = lazy(() =>
  import("./components/SubAdmin/BrokerPerformance")
);
const LeadManagement = lazy(() =>
  import("./components/SubAdmin/LeadManagement")
);
const PropertyManagement = lazy(() =>
  import("./components/SubAdmin/PropertyManagement")
);

// Dashboard Components SuperAdmin (Lazy loaded)
const SuperAdminLayout = lazy(() =>
  import("./layout/superAdminLayOut/SuperAdminLayout.jsx")
);
const SuperAdminDashboard = lazy(() =>
  import("./layout/superAdminLayOut/SuperAdminDashboard.jsx")
);
const UserManagement = lazy(() =>
  import("./components/SuperAdmin/UserManagement.jsx")
);
const SystemSettings = lazy(() =>
  import("./components/SuperAdmin/SystemSettings.jsx")
);
const GlobalReports = lazy(() =>
  import("./components/SuperAdmin/GlobalReports.jsx")
);
const CompanyManagement = lazy(() =>
  import("./components/SuperAdmin/CompaniesManagement.jsx")
);
const PackageManagement = lazy(() =>
  import("./components/SuperAdmin/PackageManagement.jsx")
);

// Dashboard Components Broker (Lazy loaded)
const BrokerLayout = lazy(() =>
  import("./layout/brokerLayOut/BrokerLayout.jsx")
);
const BrokerDashboard = lazy(() =>
  import("./layout/brokerLayOut/BrokerDashboard.jsx")
);
const BrokerLeadManagement = lazy(() =>
  import("./components/Broker/LeadManagement.jsx")
);
const BrokerPropertySubmission = lazy(() =>
  import("./components/Broker/PropertySubmission.jsx")
);
const BrokerPackagePurchase = lazy(() =>
  import("./components/Broker/PackagePurchase.jsx")
);
const BrokerProfile = lazy(() =>
  import("./components/Broker/BrokerProfile.jsx")
);
const BrokerReports = lazy(() =>
  import("./components/Broker/BrokerReports.jsx")
);
const PropertyDetails = lazy(() => import  ("./components/propertyDetailsModal/PropertyDetails.jsx"))



// Public Components
import SubscriptionPlans from "./pages/SubscriptionPlans";
import AboutUs from "./pages/About";
import ContactUs from "./pages/Contact";
import Home from "./pages/Home";
import Footer from "./components/Shared/Footer";

// Utility Components
import NotFound from "./common/NotFound";
import Unauthorized from "./common/Unauthorized";

// Styles
import "./App.css";
import { toast } from "react-hot-toast";
import BackToTop from "./common/BackToTop.jsx";
import ChatBot from "./chatBot/ChatBot.jsx";
import Header from "./components/Shared/Header.jsx";


// Enhanced Loading Component
const PageLoader = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
      <p className="font-medium text-gray-600 animate-pulse">{message}</p>
    </div>
  </div>
);

// Enhanced Protected Route with API Integration
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader message="Checking authentication..." />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <ErrorBoundary fallbackMessage="Dashboard encountered an error. Please refresh the page.">
      {children}
    </ErrorBoundary>
  );
};

// Enhanced Public Layout with Dynamic Navbar
const PublicLayout = ({ children, showNavbar = true }) => {
  return (
    <ErrorBoundary fallbackMessage="Application layout encountered an error.">
      <div className="min-h-screen flex flex-col bg-gray-50">
        {showNavbar && (
          <ErrorBoundary
            fallbackMessage="Navigation bar encountered an error."
            fallbackComponent={({ resetError }) => (
              <nav className="bg-white shadow-lg border-b-2 border-orange-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#FD9E06] to-[#FD9E06] rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl">M</span>
                      </div>
                      <span className="ml-2 text-xl font-bold text-gray-800">
                        MMP
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-[#FD9E06]">
                        Navigation Error
                      </span>
                      <button
                        onClick={resetError}
                        className="bg-[#FD9E06] hover:bg-[#FD9E06] text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
            )}
          >
            <Header />
            {/* <Navbar /> */}
          </ErrorBoundary>
        )}

        <ErrorBoundary fallbackMessage="Page content encountered an error.">
          <main
            className={`flex-1 relative ${showNavbar ? "pt-16 lg:pt-18" : ""}`}
          >
            {children}
          </main>
        </ErrorBoundary>

        {showNavbar && (
          <ErrorBoundary
            fallbackMessage="Footer encountered an error."
            fallbackComponent={() => (
              <footer className="bg-gray-800 text-white py-4">
                <div className="max-w-7xl mx-auto px-4 text-center">
                  <p className="text-sm">© 2025 Multi Money Property</p>
                </div>
              </footer>
            )}
          >
            <Footer />
          </ErrorBoundary>
        )}
      </div>
    </ErrorBoundary>
  );
};

// Enhanced Auth Layout
const AuthLayout = ({ children }) => {
  const location = useLocation();

  return (
    <ErrorBoundary fallbackMessage="Authentication page encountered an error.">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Suspense
              fallback={<PageLoader message="Loading authentication..." />}
            >
              {children}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
};

// Lazy Route Wrapper
const LazyRoute = ({ Component, fallbackMessage }) => (
  <Suspense fallback={<PageLoader message={fallbackMessage} />}>
    <Component />
  </Suspense>
);

// Route Error Fallback Component
const RouteErrorFallback = ({ error, resetError, routeName }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {routeName} Error
      </h2>

      <p className="text-gray-600 mb-4">
        Something went wrong while loading this page.
      </p>

      <div className="space-y-3">
        <button
          onClick={resetError}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
        >
          Try Again
        </button>

        <button
          onClick={() => (window.location.href = "/")}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors font-medium"
        >
          Go to Home
        </button>
      </div>
    </div>
  </div>
);

// Main App Component
function App() {
  const location = useLocation();

  return (
    <ErrorBoundary
      fallbackMessage="Application encountered a critical error."
      fallbackComponent={({ error, resetError }) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[#FD9E06]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Oops! Something went wrong
            </h1>

            <p className="text-gray-600 mb-6">
              Multi Money Property encountered an unexpected error. Please try
              refreshing the page.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-[#FD9E06] hover:bg-[#FD9E06] text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Refresh Page
              </button>

              <button
                onClick={resetError}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    >
      <AuthProvider>
        <div className="App font-sans">
          <ErrorBoundary fallbackMessage="Router encountered an error.">
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route
                path="/"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback {...props} routeName="Home Page" />
                    )}
                  >
                    <PublicLayout>
                      <Home />
                    </PublicLayout>
                  </ErrorBoundary>
                }
              />

              <Route
                path="/plans"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback
                        {...props}
                        routeName="Subscription Plans"
                      />
                    )}
                  >
                    <PublicLayout>
                      <SubscriptionPlans />
                    </PublicLayout>
                  </ErrorBoundary>
                }
              />

              <Route
                path="/about"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback {...props} routeName="About Us" />
                    )}
                  >
                    <PublicLayout>
                      <AboutUs />
                    </PublicLayout>
                  </ErrorBoundary>
                }
              />

              <Route
                path="/contact"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback {...props} routeName="Contact Us" />
                    )}
                  >
                    <PublicLayout>
                      <ContactUs />
                    </PublicLayout>
                  </ErrorBoundary>
                }
              />

              {/* AUTHENTICATION ROUTES */}
              <Route
                path="/login"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback {...props} routeName="Login" />
                    )}
                  >
                    <AuthLayout>
                      <LazyRoute
                        Component={Login}
                        fallbackMessage="Loading login page..."
                      />
                    </AuthLayout>
                  </ErrorBoundary>
                }
              />

              <Route
                path="/register"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback {...props} routeName="Registration" />
                    )}
                  >
                    <AuthLayout>
                      <LazyRoute
                        Component={Register}
                        fallbackMessage="Loading registration page..."
                      />
                    </AuthLayout>
                  </ErrorBoundary>
                }
              />

              <Route
                path="/register-broker"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback
                        {...props}
                        routeName="Broker Registration"
                      />
                    )}
                  >
                    <AuthLayout>
                      <LazyRoute
                        Component={RegisterBroker}
                        fallbackMessage="Loading broker registration..."
                      />
                    </AuthLayout>
                  </ErrorBoundary>
                }
              />

              <Route
                path="/forgot-password"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback
                        {...props}
                        routeName="Forgot Password"
                      />
                    )}
                  >
                    <AuthLayout>
                      <LazyRoute
                        Component={ForgotPassword}
                        fallbackMessage="Loading forgot password page..."
                      />
                    </AuthLayout>
                  </ErrorBoundary>
                }
              />

              <Route
                path="/reset-password/:token"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback
                        {...props}
                        routeName="Reset Password"
                      />
                    )}
                  >
                    <AuthLayout>
                      <LazyRoute
                        Component={ResetPassword}
                        fallbackMessage="Loading reset password page..."
                      />
                    </AuthLayout>
                  </ErrorBoundary>
                }
              />

              <Route
                path="/property-details/:id"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback
                        {...props}
                        routeName="Reset Password"
                      />
                    )}
                  >
                    <AuthLayout>
                      <LazyRoute
                        Component={PropertyDetails}
                        fallbackMessage="Loading reset password page..."
                      />
                    </AuthLayout>
                  </ErrorBoundary>
                }
              />



              {/* PROTECTED DASHBOARD ROUTES - User Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback {...props} routeName="Dashboard" />
                    )}
                  >
                    <ProtectedRoute allowedRoles={["user"]}>
                      <PublicLayout>
                        <LazyRoute
                          Component={Dashboard}
                          fallbackMessage="Loading dashboard..."
                        />
                      </PublicLayout>
                    </ProtectedRoute>
                  </ErrorBoundary>
                }
              />

              {/* SUPER ADMIN ROUTES */}
              <Route
                path="/super-admin/*"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback
                        {...props}
                        routeName="Super Admin Panel"
                      />
                    )}
                  >
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                      <SuperAdminLayout />
                    </ProtectedRoute>
                  </ErrorBoundary>
                }
              >
                <Route
                  index
                  element={<Navigate to="/super-admin/dashboard" replace />}
                />
                <Route
                  path="dashboard"
                  element={
                    <LazyRoute
                      Component={SuperAdminDashboard}
                      fallbackMessage="Loading dashboard..."
                    />
                  }
                />
                <Route
                  path="users"
                  element={
                    <LazyRoute
                      Component={UserManagement}
                      fallbackMessage="Loading user management..."
                    />
                  }
                />
                <Route
                  path="companies"
                  element={
                    <LazyRoute
                      Component={CompanyManagement}
                      fallbackMessage="Loading company management..."
                    />
                  }
                />
                <Route
                  path="settings"
                  element={
                    <LazyRoute
                      Component={SystemSettings}
                      fallbackMessage="Loading system settings..."
                    />
                  }
                />
                <Route
                  path="reports"
                  element={
                    <LazyRoute
                      Component={GlobalReports}
                      fallbackMessage="Loading global reports..."
                    />
                  }
                />
                <Route
                  path="packages"
                  element={
                    <LazyRoute
                      Component={PackageManagement}
                      fallbackMessage="Loading package management..."
                    />
                  }
                />
              </Route>

              {/* SUB ADMIN ROUTES */}
              <Route
                path="/sub-admin/*"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback
                        {...props}
                        routeName="Sub Admin Panel"
                      />
                    )}
                  >
                    <ProtectedRoute allowedRoles={["subadmin"]}>
                      <SubAdminLayout />
                    </ProtectedRoute>
                  </ErrorBoundary>
                }
              >
                <Route
                  index
                  element={<Navigate to="/sub-admin/dashboard" replace />}
                />
                <Route
                  path="dashboard"
                  element={
                    <LazyRoute
                      Component={SubAdminDashboard}
                      fallbackMessage="Loading dashboard..."
                    />
                  }
                />
                <Route
                  path="brokers"
                  element={
                    <LazyRoute
                      Component={BrokerManagement}
                      fallbackMessage="Loading broker management..."
                    />
                  }
                />
                <Route
                  path="performance"
                  element={
                    <LazyRoute
                      Component={BrokerPerformance}
                      fallbackMessage="Loading performance..."
                    />
                  }
                />
                <Route
                  path="leads"
                  element={
                    <LazyRoute
                      Component={LeadManagement}
                      fallbackMessage="Loading lead management..."
                    />
                  }
                />
                <Route
                  path="properties"
                  element={
                    <LazyRoute
                      Component={PropertyManagement}
                      fallbackMessage="Loading property management..."
                    />
                  }
                />
              </Route>

              {/* BROKER ROUTES */}
              <Route
                path="/broker/*"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback {...props} routeName="Broker Panel" />
                    )}
                  >
                    <ProtectedRoute allowedRoles={["broker"]}>
                      <BrokerLayout />
                    </ProtectedRoute>
                  </ErrorBoundary>
                }
              >
                <Route
                  index
                  element={<Navigate to="/broker/dashboard" replace />}
                />
                <Route
                  path="dashboard"
                  element={
                    <LazyRoute
                      Component={BrokerDashboard}
                      fallbackMessage="Loading dashboard..."
                    />
                  }
                />
                <Route
                  path="leads"
                  element={
                    <LazyRoute
                      Component={BrokerLeadManagement}
                      fallbackMessage="Loading lead management..."
                    />
                  }
                />
                <Route
                  path="properties"
                  element={
                    <LazyRoute
                      Component={BrokerPropertySubmission}
                      fallbackMessage="Loading property submission..."
                    />
                  }
                />
                <Route
                  path="packages"
                  element={
                    <LazyRoute
                      Component={BrokerPackagePurchase}
                      fallbackMessage="Loading package purchase..."
                    />
                  }
                />
                <Route
                  path="profile"
                  element={
                    <LazyRoute
                      Component={BrokerProfile}
                      fallbackMessage="Loading profile..."
                    />
                  }
                />
                <Route
                  path="reports"
                  element={
                    <LazyRoute
                      Component={BrokerReports}
                      fallbackMessage="Loading reports..."
                    />
                  }
                />
              </Route>

              {/* UTILITY ROUTES */}
              <Route
                path="/unauthorized"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback {...props} routeName="Unauthorized" />
                    )}
                  >
                    <PublicLayout>
                      <Unauthorized />
                    </PublicLayout>
                  </ErrorBoundary>
                }
              />

              <Route path="/loading" element={<PageLoader />} />

              <Route
                path="*"
                element={
                  <ErrorBoundary
                    fallbackComponent={(props) => (
                      <RouteErrorFallback
                        {...props}
                        routeName="Page Not Found"
                      />
                    )}
                  >
                    <PublicLayout>
                      <NotFound />
                    </PublicLayout>
                  </ErrorBoundary>
                }
              />
            </Routes>
          </ErrorBoundary>
        </div>

        {/* Enhanced  Configuration */}
        <ErrorBoundary
          fallbackMessage="Notification system encountered an error."
          fallbackComponent={() => null}
        >
         
        </ErrorBoundary>

        {/* Floating Utilities */}
        <ChatBot />
        <BackToTop />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
