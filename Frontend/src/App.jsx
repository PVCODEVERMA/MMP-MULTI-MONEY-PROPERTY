import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

/* shared UI */
import Header from "./components/Shared/Header.jsx";
import Footer from "./components/Shared/Footer.jsx";
import ChatBot from "./chatBot/ChatBot.jsx";
import LoadingSpinner from "./common/LoadingSpinner.jsx";
import Unauthorized from "./common/Unauthorized.jsx";
import NotFound from "./common/NotFound.jsx";

/* auth */
import { useAuth } from "./context/AuthContext.jsx";

/* layouts */
import FindByLeadsLayout from "./layout/FindByLeadsLayout/FindByLeadsLayout.jsx";
import LeadsLayout from "./layout/LeadsPageLayout/LeadsLayout.jsx";

/* leads */
import FindByPropertyLeads from "./components/findByPropertyleads/FindByPropertyLeads.jsx";
import RightPane from "./components/findByPropertyleads/leadsExplorer/RightPane.jsx";

/* public pages */
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import MobileSearch from "./pages/MobileSearch.jsx";
import PostPropertyFree from "./components/postProperty/PostPropertyFree.jsx";
import AllProperties from "./components/advancedSearch/Allproperties.jsx";
import PropertyDetail from "./components/advancedSearch/PropertyDetailsModal.jsx";
import AdvancedSearch from "./components/advancedSearch/AdvancedSearch.jsx";
import PlansCarousel from "./components/PlansSection/PlansCarousel.jsx";
import PaymentPage from "./components/PlansSection/PaymentPage.jsx";
import PeSuccess from "./pages/PeSuccess.jsx";

/* solutions */
import Billing from "./pages/solutions/Billing.jsx";

import Integrations from "./pages/solutions/Integrations.jsx";
import LeadDelivery from "./pages/solutions/LeadDelivery.jsx";
import LeadDistribution from "./pages/solutions/LeadDistribution.jsx";
import LeadVerification from "./pages/solutions/LeadVerification.jsx";
import ListingsSEO from "./pages/solutions/ListingsSEO.jsx";
import LocationLeads from "./pages/solutions/LocationLeads.jsx";
import RealEstateLeads from "./pages/solutions/RealEstateLeads.jsx";
import BrokerDashHome from "./pages/solutions/BrokerDashboardHome.jsx";

/* resources */
import HelpCenter from "./pages/resources/HelpCenter.jsx";

import BrokerProfile from "./pages/broker/BrokerProfile.jsx";

/* property details */
import PropertyDetails from "./components/propertyCardDetails/topPropertyCardDetails.jsx";
import ContactSection from "./pages/ContactSection.jsx";

/*──── lazy imports ─────────────────────────────────────*/
const Login = lazy(() => import("./Auth/Login.jsx"));
const Register = lazy(() => import("./Auth/Register.jsx"));
const RegisterB = lazy(() => import("./Auth/RegisterBroker.jsx"));
const ForgotPwd = lazy(() => import("./Auth/ForgotPassword.jsx"));
const ResetPwd = lazy(() => import("./Auth/ResetPassword.jsx"));
const Dashboard = lazy(() => import("./components/User/Dashboard.jsx"));

/* Sub-admin */
const SubAdminLayout = lazy(() =>
  import("./layout/subAdminLayOut/SubAdmin.jsx")
);
const SubAdminDash = lazy(() =>
  import("./layout/subAdminLayOut/SubAdminDashboard.jsx")
);
const BrokerMgmt = lazy(() =>
  import("./components/SubAdmin/BrokerManagement.jsx")
);
const BrokerPerf = lazy(() =>
  import("./components/SubAdmin/BrokerPerformance.jsx")
);
const LeadMgmt = lazy(() => import("./components/SubAdmin/LeadManagement.jsx"));
const PropertyMgmt = lazy(() =>
  import("./components/SubAdmin/PropertyManagement.jsx")
);

/* Super-admin */
const SuperLayout = lazy(() =>
  import("./layout/superAdminLayOut/SuperAdminLayout.jsx")
);
const SuperDash = lazy(() =>
  import("./layout/superAdminLayOut/SuperAdminDashboard.jsx")
);
const UserMgmt = lazy(() =>
  import("./components/SuperAdmin/UserManagement.jsx")
);
const SystemSettings = lazy(() =>
  import("./components/SuperAdmin/SystemSettings.jsx")
);
const GlobalReports = lazy(() =>
  import("./components/SuperAdmin/GlobalReports.jsx")
);
const CompanyMgmt = lazy(() =>
  import("./components/SuperAdmin/CompaniesManagement.jsx")
);
const PackageMgmt = lazy(() =>
  import("./components/SuperAdmin/PackageManagement.jsx")
);

/* Broker */
const BrokerLayout = lazy(() =>
  import("./layout/brokerLayOut/BrokerLayout.jsx")
);
const BrokerDash = lazy(() =>
  import("./layout/brokerLayOut/BrokerDashboard.jsx")
);
const BrokerLeads = lazy(() =>
  import("./components/Broker/LeadManagement.jsx")
);
const BrokerProps = lazy(() =>
  import("./components/Broker/PropertySubmission.jsx")
);
const BrokerPackages = lazy(() =>
  import("./components/Broker/PackagePurchase.jsx")
);
// const BrokerProfile = lazy(() =>
//   import("./components/Broker/BrokerProfile.jsx")
// );
const BrokerReports = lazy(() =>
  import("./components/Broker/BrokerReports.jsx")
);

/*──── helpers ─────────────────────────────────────*/
const PageLoader = ({ message = "Loading..." }) => (
  <LoadingSpinner message={message} />
);

const Lazy = (Cmp, msg) => (
  <Suspense fallback={<PageLoader message={msg} />}>
    <Cmp />
  </Suspense>
);

const Protected = ({ roles, children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const loc = useLocation();

  if (loading) return <PageLoader message="Checking authentication..." />;
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: loc }} replace />;
  if (roles?.length && !roles.includes(user.role)) {
    toast.error("You don’t have permission for this page");
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

const PublicLayout = ({ children }) => (
  <>
    <Header />
    <main className="pt-16 lg:pt-20 bg-gray-50 min-h-screen">{children}</main>
    <Footer />
  </>
);

const AuthLayout = ({ children }) => {
  const loc = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={loc.pathname}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.25 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

/*─────────────────────────────── routes ───────────────────────────────*/
function app() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/search-mobile"
            element={
              <PublicLayout>
                <MobileSearch />
              </PublicLayout>
            }
          />
          <Route
            path="/post-property"
            element={
              <PublicLayout>
                <PostPropertyFree />
              </PublicLayout>
            }
          />
          /* routes.jsx (or App.jsx) */
          <Route
            path=":location?"
            element={
              <PublicLayout>
                <AllProperties />
              </PublicLayout>
            }
          />
          <Route
            path="/property/:id"
            element={
              <PublicLayout>
                <PropertyDetail />
              </PublicLayout>
            }
          />
          <Route
            path="/contact-property"
            element={
              <PublicLayout>
                <ContactSection />
              </PublicLayout>
            }
          />
          <Route
            path="/advanced-search"
            element={
              <PublicLayout>
                {Lazy(AdvancedSearch, "Loading search")}
              </PublicLayout>
            }
          />
          {/* LEADS */}
          <Route
            path="/home/leads"
            element={
              <FindByLeadsLayout>
                <FindByPropertyLeads />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/help"
            element={
              <FindByLeadsLayout>
                <HelpCenter />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/profile"
            element={
              <FindByLeadsLayout>
                <BrokerProfile />
              </FindByLeadsLayout>
            }
          />
          <Route path="/home/leads/lock/*" element={<LeadsLayout />}>
            <Route index element={<RightPane />} /> {/* default */}
            <Route
              path="trendingLeads"
              element={<RightPane source="trending" />}
            />
            <Route
              path="popularLeads"
              element={<RightPane source="popular" />}
            />
            <Route path="allLeads" element={<RightPane source="all" />} />
          </Route>
          <Route
            path="/home/leads/plans"
            element={
              <FindByLeadsLayout>
                <PlansCarousel />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/payment"
            element={
              <FindByLeadsLayout>
                <PaymentPage />
              </FindByLeadsLayout>
            }
          />
          {/* SOLUTIONS */}
          <Route
            path="/home/leads/solutions/billing"
            element={
              <FindByLeadsLayout>
                <Billing />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/solutions/broker/dashboard/home"
            element={
              <FindByLeadsLayout>
                <BrokerDashHome />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/solutions/integrations"
            element={
              <FindByLeadsLayout>
                <Integrations />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/solutions/lead-delivery"
            element={
              <FindByLeadsLayout>
                <LeadDelivery />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/solutions/lead-distribution"
            element={
              <FindByLeadsLayout>
                <LeadDistribution />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/solutions/lead-verification"
            element={
              <FindByLeadsLayout>
                <LeadVerification />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/solutions/listings-seo"
            element={
              <FindByLeadsLayout>
                <ListingsSEO />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/solutions/location-leads"
            element={
              <FindByLeadsLayout>
                <LocationLeads />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/solutions/real-estate-leads"
            element={
              <FindByLeadsLayout>
                <RealEstateLeads />
              </FindByLeadsLayout>
            }
          />
          {/* RESOURCES */}
          {/* STATIC */}
          <Route
            path="/home/leads/about"
            element={
              <FindByLeadsLayout>
                <About />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/contact"
            element={
              <FindByLeadsLayout>
                <Contact />
              </FindByLeadsLayout>
            }
          />
          {/* AUTH */}
          <Route path="/pe/success" element={<PeSuccess />} />
          <Route
            path="/login"
            element={<AuthLayout>{Lazy(Login, "Loading login")}</AuthLayout>}
          />
          <Route
            path="/register"
            element={
              <AuthLayout>{Lazy(Register, "Loading register")}</AuthLayout>
            }
          />
          <Route
            path="/register-broker"
            element={
              <AuthLayout>
                {Lazy(RegisterB, "Loading broker register")}
              </AuthLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthLayout>
                {Lazy(ForgotPwd, "Loading forgot password")}
              </AuthLayout>
            }
          />
          <Route
            path="/reset-password/:token"
            element={<AuthLayout>{Lazy(ResetPwd, "Loading reset")}</AuthLayout>}
          />
          <Route
            path="/property-details/:id"
            element={
              <AuthLayout>
                {Lazy(PropertyDetails, "Loading details")}
              </AuthLayout>
            }
          />
          {/* USER DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <Protected roles={["user"]}>
                <PublicLayout>
                  {Lazy(Dashboard, "Loading dashboard")}
                </PublicLayout>
              </Protected>
            }
          />
          {/* SUPER ADMIN */}
          <Route
            path="/super-admin/*"
            element={
              <Protected roles={["superadmin"]}>
                <SuperLayout />
              </Protected>
            }
          >
            <Route
              index
              element={<Navigate to="/super-admin/dashboard" replace />}
            />
            <Route path="dashboard" element={Lazy(SuperDash, "Loading dash")} />
            <Route path="users" element={Lazy(UserMgmt, "Loading users")} />
            <Route
              path="companies"
              element={Lazy(CompanyMgmt, "Loading companies")}
            />
            <Route
              path="settings"
              element={Lazy(SystemSettings, "Loading settings")}
            />
            <Route
              path="reports"
              element={Lazy(GlobalReports, "Loading reports")}
            />
            <Route
              path="packages"
              element={Lazy(PackageMgmt, "Loading packages")}
            />
          </Route>
          {/* SUB-ADMIN */}
          <Route
            path="/sub-admin/*"
            element={
              <Protected roles={["subadmin"]}>
                <SubAdminLayout />
              </Protected>
            }
          >
            <Route
              index
              element={<Navigate to="/sub-admin/dashboard" replace />}
            />
            <Route
              path="dashboard"
              element={Lazy(SubAdminDash, "Loading dash")}
            />
            <Route
              path="brokers"
              element={Lazy(BrokerMgmt, "Loading brokers")}
            />
            <Route
              path="performance"
              element={Lazy(BrokerPerf, "Loading performance")}
            />
            <Route path="leads" element={Lazy(LeadMgmt, "Loading leads")} />
            <Route
              path="properties"
              element={Lazy(PropertyMgmt, "Loading properties")}
            />
          </Route>
          {/* BROKER */}
          <Route
            path="/broker/*"
            element={
              <Protected roles={["broker"]}>
                <BrokerLayout />
              </Protected>
            }
          >
            <Route
              index
              element={<Navigate to="/broker/dashboard" replace />}
            />
            <Route
              path="dashboard"
              element={Lazy(BrokerDash, "Loading dash")}
            />
            <Route path="leads" element={Lazy(BrokerLeads, "Loading leads")} />
            <Route
              path="properties"
              element={Lazy(BrokerProps, "Loading properties")}
            />
            <Route
              path="packages"
              element={Lazy(BrokerPackages, "Loading packages")}
            />
            {/* <Route
              path="profile"
              element={Lazy(BrokerProfile, "Loading profile")}
            /> */}
            <Route
              path="reports"
              element={Lazy(BrokerReports, "Loading reports")}
            />
          </Route>
          {/* MISC */}
          <Route
            path="/unauthorized"
            element={
              <PublicLayout>
                <Unauthorized />
              </PublicLayout>
            }
          />
          <Route
            path="*"
            element={
              <PublicLayout>
                <NotFound />
              </PublicLayout>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

/*────────────────────────── exported root ─────────────────────────*/
export default app;
