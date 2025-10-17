// App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* Shared UI */
import Header from "./components/Shared/Header.jsx";
import Footer from "./components/Shared/Footer.jsx";
import Unauthorized from "./common/Unauthorized.jsx";
import NotFound from "./common/NotFound.jsx";
import LoadingSpinner from "./common/LoadingSpinner.jsx";

/* Context Providers */
import { AuthProviderSubAdmin } from "./context/AuthContextSubAdmin.jsx";
import { AuthProviderSuperAdmin } from "./context/AuthContextSuperAdmin.jsx";

/* Protected Wrappers */
import ProtectedUser from "./Protected/ProtectedUser.jsx";
// import ProtectedBroker from "./Protected/ProtectedBroker.jsx";
import ProtectedSubAdmin from "./Protected/ProtectedSubAdmin.jsx";
import ProtectedSuperAdmin from "./Protected/ProtectedSuperAdmin.jsx";

/* Pages & Components */
import Home from "./pages/Home.jsx";
import MobileSearch from "./pages/MobileSearch.jsx";
import AllProperties from "./components/advancedSearch/Allproperties.jsx";
import ContactSection from "./pages/ContactSection.jsx";
import About from "./pages/About.jsx";
// import Contact from "./pages/Contact.jsx";
// import PeSuccess from "./pages/PeSuccess.jsx";
import PlansCarousel from "./components/PlansSection/PlansCarousel.jsx";
import PaymentPage from "./components/PlansSection/PaymentPage.jsx";
import BrokerProfile from "./pages/broker/BrokerProfile.jsx";
import FindByPropertyLeads from "./components/findByPropertyleads/FindByPropertyLeads.jsx";
import RightPane from "./components/findByPropertyleads/leadsExplorer/RightPane.jsx";
import PostPropertyFree from "./components/postProperty/PostPropertyFree.jsx";
import PropertyDetailsModal from "./components/propertyCards/PropertyDetailsModal.jsx";
import LoginBroker from "./Auth/LoginBroker.jsx";
import Welcome from "./pages/broker/Welcome.jsx";
import PostSuccess from "./components/postProperty/PostSuccess.jsx";

/* SuperAdmin Pages */
import RegisterSuperAdmin from "./Auth/superAdmin/RegisterSuperAdmin.jsx";
import LoginSuperAdmin from "./Auth/superAdmin/LoginSuperAdmin.jsx";
import ForgotPasswordSuperAdmin from "./Auth/superAdmin/ForgotPasswordSuperAdmin.jsx";

import FindByLeadsLayout from "./layout/FindByLeadsLayout/FindByLeadsLayout.jsx";
import AgentsDirectory from "./pages/AgentsDirectory.jsx";
import Billing from "./pages/solutions/Billing.jsx";
import LocationLeads from "./pages/solutions/LocationLeads.jsx";
import LeadDelivery from "./pages/solutions/LeadDelivery.jsx";
import Integrations from "./pages/solutions/Integrations.jsx";
import ListingsSEO from "./pages/solutions/ListingsSEO.jsx";
import LeadDistribution from "./pages/solutions/LeadDistribution.jsx";
import BrokerDashboardHome from "./pages/solutions/BrokerDashboardHome.jsx";
import RealEstateLeads from "./pages/solutions/RealEstateLeads.jsx";
import LeadVerification from "./pages/solutions/LeadVerification.jsx";
import NewLeads from "./components/Broker/NewLeads.jsx";
import LeadsLayout from "./layout/LeadsPageLayout/LeadsLayout.jsx";
import TransactionHistory from "./components/Broker/TransactionHistory.jsx";
import WalletRecharge from "./components/Broker/WalletRecharge.jsx";
import ProfileSettings from "./components/Broker/ProfileSettings.jsx";
import FollowupLeads from "./components/Broker/Followups.jsx";
import AllContacts from "./components/Broker/AllContacts.jsx";
import BuyersContacts from "./components/Broker/BuyersContacts.jsx";
import InvestorsContacts from "./components/Broker/InvestorsContacts.jsx";
import ConversionRateReport from "./components/Broker/ConversionRateReport.jsx";


import MediumLeadForm from "./components/SubAdmin/leadManagement/MediumLeadForm.jsx";

import LeadInvoice from "./components/SubAdmin/leadManagement/LeadInvoice.jsx";
import AssignLeadTableHigh from "./components/SubAdmin/AssignLeadTable/AssignLeadTableHigh.jsx";
import UpcomingCalls from "./components/Broker/UpcomingCalls.jsx";
import SiteVisits from "./components/Broker/SiteVisits.jsx";
import Meetings from "./components/Broker/Meetings.jsx";
import RevenueReport from "./components/Broker/RevenueReport.jsx";
import NotificationSettings from "./components/Broker/NotificationSettings.jsx";
import AddProperty from "./components/Broker/AddProperty.jsx";
import MyListings from "./components/Broker/MyListings.jsx";
import HighLeadForm from "./components/SubAdmin/leadManagement/HighLeadForm.jsx";



/* Lazy Imports */
const Login = lazy(() => import("./Auth/Login.jsx"));
const Register = lazy(() => import("./Auth/Register.jsx"));
const RegisterB = lazy(() => import("./Auth/RegisterBroker.jsx"));
const ForgotPwd = lazy(() => import("./Auth/ForgotPassword.jsx"));
const ResetPwd = lazy(() => import("./Auth/ResetPassword.jsx"));
const Dashboard = lazy(() => import("./components/User/Dashboard.jsx"));

// ---- Lazy imports sub admin  for pages ----
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

const ActivateUsers = lazy(() =>
  import("./components/SubAdmin/ActivateUsers.jsx")
);
const AllUsers = lazy(() => import("./components/SubAdmin/AllUsers.jsx"));
const ActiveUsers = lazy(() => import("./components/SubAdmin/ActiveUsers.jsx"));
const UserRoles = lazy(() => import("./components/SubAdmin/UserRoles.jsx"));
const NewLeadsSubAdmin = lazy(() =>
  import("./components/SubAdmin/NewLeadsSubAdmin.jsx")
);
const AssignedLeads = lazy(() =>
  import("./components/SubAdmin/AssignedLeads.jsx")
);
const ClosedLeadsSubAdmin = lazy(() =>
  import("./components/SubAdmin/ClosedLeadsSubAdmin.jsx")
);
const AutoDistributeLeads = lazy(() =>
  import("./components/SubAdmin/AutoDistributeLeads.jsx")
);
const AddEditProperty = lazy(() =>
  import("./components/SubAdmin/AddEditProperty.jsx")
);
const AttachLeads = lazy(() => import("./components/SubAdmin/AttachLeads.jsx"));
const PlatformManagement = lazy(() =>
  import("./components/SubAdmin/PropertyManagement.jsx")
);
const Addleads = lazy(() => import("./components/SubAdmin/Addleads.jsx"));

// Auth SubAdmin
const LoginSubAdmin = lazy(() => import("./Auth/subAdmin/LoginSubAdmin.jsx"));
const RegisterSubAdmin = lazy(() =>
  import("./Auth/subAdmin/RegisterSubAdmin.jsx")
);
const ForgotPasswordSubAdmin = lazy(() =>
  import("./Auth/subAdmin/ForgotPasswordSubAdmin.jsx")
);
const ResetPasswordSubAdmin = lazy(() =>
  import("./Auth/subAdmin/ResetPasswordSubAdmin.jsx")
);

/* Super-Admin */
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
const AllLeadsPage = lazy(() => import("./components/Broker/AllLeadsPage.jsx"));
const BrokerProps = lazy(() =>
  import("./components/Broker/PropertySubmission.jsx")
);
const BrokerPackages = lazy(() =>
  import("./components/Broker/PackagePurchase.jsx")
);
const BrokerReports = lazy(() =>
  import("./components/Broker/BrokerReports.jsx")
);

/* Layout Wrappers */
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

function App() {
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
          {/* ------------------- PUBLIC ROUTES ------------------- */}
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
          <Route
            path="/post-success"
            element={
              <PublicLayout>
                <PostSuccess />
              </PublicLayout>
            }
          />
          <Route
            path="/:location?"
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
                <PropertyDetailsModal />
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
            path="/all-agents"
            element={
              <PublicLayout>
                <AgentsDirectory />
              </PublicLayout>
            }
          />
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
                <PlansCarousel />
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
          <Route
            path="/home/leads/about"
            element={
              <FindByLeadsLayout>
                <About />
              </FindByLeadsLayout>
            }
          />
          {/* solution */}
          <Route
            path="/home/leads/real-estate-leads"
            element={
              <FindByLeadsLayout>
                <RealEstateLeads />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/location-leads"
            element={
              <FindByLeadsLayout>
                <LocationLeads />
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
            path="/home/leads/lead-distribution"
            element={
              <FindByLeadsLayout>
                <LeadDistribution />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/lead-delivery"
            element={
              <FindByLeadsLayout>
                <LeadDelivery />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/dashboard/home"
            element={
              <FindByLeadsLayout>
                <BrokerDashboardHome />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/billing"
            element={
              <FindByLeadsLayout>
                <Billing />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/lead-verification"
            element={
              <FindByLeadsLayout>
                <LeadVerification />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/integrations"
            element={
              <FindByLeadsLayout>
                <Integrations />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/listings-seo"
            element={
              <FindByLeadsLayout>
                <ListingsSEO />
              </FindByLeadsLayout>
            }
          />
          {/* payement route */}
          <Route
            path="/home/leads/plans"
            element={
              <FindByLeadsLayout>
                <PlansCarousel />
              </FindByLeadsLayout>
            }
          />
          <Route
            path="/home/leads/checkout"
            element={
              <FindByLeadsLayout>
                <PaymentPage />
              </FindByLeadsLayout>
            }
          />
          {/* ------------------- AUTH ROUTES ------------------- */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Suspense
                  fallback={<LoadingSpinner message="Loading login..." />}
                >
                  <Login />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Suspense
                  fallback={<LoadingSpinner message="Loading register..." />}
                >
                  <Register />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/register-broker"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading broker register..." />
                  }
                >
                  <RegisterB />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/login-broker"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading broker login..." />
                  }
                >
                  <LoginBroker />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/welcome"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading broker welcome..." />
                  }
                >
                  <Welcome />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading forgot password..." />
                  }
                >
                  <ForgotPwd />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading reset password..." />
                  }
                >
                  <ResetPwd />
                </Suspense>
              </AuthLayout>
            }
          />
          /* ------------------- SUB-ADMIN AUTH PAGES ------------------- */
          <Route
            path="/registerSubAdmin"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading register subadmin..." />
                  }
                >
                  <RegisterSubAdmin />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/loginSubAdmin"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading login subadmin..." />
                  }
                >
                  <LoginSubAdmin />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/forgotPasswordSubAdmin"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading forgot password subadmin..." />
                  }
                >
                  <ForgotPasswordSubAdmin />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/resetPasswordSubAdmin"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading reset password subadmin..." />
                  }
                >
                  <ResetPasswordSubAdmin />
                </Suspense>
              </AuthLayout>
            }
          />
          {/* ------------------- SUPER-ADMIN AUTH PAGES ------------------- */}
          <Route
            path="/register-superAdmin"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading superadmin register..." />
                  }
                >
                  <RegisterSuperAdmin />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/login-SuperAdmin"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading superadmin login..." />
                  }
                >
                  <LoginSuperAdmin />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/forgot-password-superadmin"
            element={
              <AuthLayout>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading forgot password superadmin..." />
                  }
                >
                  <ForgotPasswordSuperAdmin />
                </Suspense>
              </AuthLayout>
            }
          />
          {/* ------------------- USER DASHBOARD ------------------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedUser>
                <PublicLayout>
                  <Suspense
                    fallback={<LoadingSpinner message="Loading dashboard..." />}
                  >
                    <Dashboard />
                  </Suspense>
                </PublicLayout>
              </ProtectedUser>
            }
          />
          {/* ------------------- SUB-ADMIN DASHBOARD ------------------- */}
          <Route
            path="/subadmin-dashboard/*"
            element={
              <AuthProviderSubAdmin>
                <ProtectedSubAdmin>
                  <Suspense
                    fallback={
                      <LoadingSpinner message="Loading subadmin layout..." />
                    }
                  >
                    <SubAdminLayout />
                  </Suspense>
                </ProtectedSubAdmin>
              </AuthProviderSubAdmin>
            }
          >
            {/* Default redirect */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* Dashboard */}
            <Route path="dashboard" element={<SubAdminDash />} />

            {/* Broker Management */}
            <Route path="brokers" element={<BrokerMgmt />} />
            <Route path="performance" element={<BrokerPerf />} />

            {/* Lead Management */}
            <Route path="leads" element={<LeadMgmt />} />
            <Route path="addNewleads" element={<Addleads />} />
            <Route path="new-leads" element={<NewLeadsSubAdmin />} />
            <Route path="assigned-leads" element={<AssignedLeads />} />
            <Route path="closed-leads" element={<ClosedLeadsSubAdmin />} />
            <Route path="auto-leads" element={<AutoDistributeLeads />} />

            {/* AssignLeadTable */}
            <Route path="AssignLeadTable" element={<AssignLeadTableHigh />} />

            {/* Intent Level post */}

            <Route path="high" element={<HighLeadForm />} />
            {/* <Route path="low" element={<LowLea />} /> */}
            <Route path="medium" element={<MediumLeadForm />} />
            
            <Route path="leadInvoice" element={<LeadInvoice />} />
            {/* Property Management */}
            <Route path="properties" element={<PropertyMgmt />} />
            <Route path="properties/add" element={<AddEditProperty />} />
            <Route path="properties/attach-leads" element={<AttachLeads />} />

            {/* Customers / Users */}
            <Route path="all-user" element={<AllUsers />} />
            <Route path="activate-users" element={<ActivateUsers />} />
            <Route path="active-users" element={<ActiveUsers />} />
            <Route path="user-roles" element={<UserRoles />} />

            {/* Platform Management */}
            <Route
              path="platform-management"
              element={<PlatformManagement />}
            />
          </Route>
          {/* ------------------- SUPER-ADMIN DASHBOARD ------------------- */}
          <Route element={<AuthProviderSuperAdmin />}>
            <Route
              path="/super-admin/*"
              element={
                <ProtectedSuperAdmin>
                  <Suspense
                    fallback={
                      <LoadingSpinner message="Loading superadmin layout..." />
                    }
                  >
                    <SuperLayout />
                  </Suspense>
                </ProtectedSuperAdmin>
              }
            >
              <Route
                index
                element={<Navigate to="/super-admin/dashboard" replace />}
              />
              <Route path="dashboard" element={<SuperDash />} />
              <Route path="users" element={<UserMgmt />} />
              <Route path="companies" element={<CompanyMgmt />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="reports" element={<GlobalReports />} />
              <Route path="packages" element={<PackageMgmt />} />
            </Route>
          </Route>
          {/* ------------------- BROKER DASHBOARD ------------------- */}
          <Route
            path="/broker/*"
            element={
              <ProtectedUser>
                <Suspense
                  fallback={
                    <LoadingSpinner message="Loading broker layout..." />
                  }
                >
                  <BrokerLayout />
                </Suspense>
              </ProtectedUser>
            }
          >
            <Route
              index
              element={<Navigate to="/broker/dashboard" replace />}
            />
            <Route path="dashboard" element={<BrokerDash />} />

            {/* Lead Management */}
            <Route path="leads/all" element={<AllLeadsPage />} />
            <Route path="leads/new" element={<NewLeads />} />
            <Route path="leads/followups" element={<FollowupLeads />} />

            {/* Contacts / Clients */}
            <Route path="contacts/all" element={<AllContacts />} />
            <Route path="contacts/buyers" element={<BuyersContacts />} />
            <Route path="contacts/investors" element={<InvestorsContacts />} />

            {/* Property Post */}
            <Route path="properties/add" element={<AddProperty />} />
            <Route path="property/listings" element={<MyListings />} />

            {/* Tasks & Follow-ups */}
            <Route path="tasks/calls" element={<UpcomingCalls />} />
            <Route path="tasks/visits" element={<SiteVisits />} />
            <Route path="tasks/meetings" element={<Meetings />} />

            {/* Reports & Analytics */}
            <Route
              path="reports/conversion"
              element={<ConversionRateReport />}
            />
            <Route path="analytics/performance" element={<RevenueReport />} />

            {/* Wallet / Billing */}
            <Route path="wallet/recharge" element={<WalletRecharge />} />
            <Route path="wallet/history" element={<TransactionHistory />} />

            {/* Settings */}
            <Route path="settings/profile" element={<ProfileSettings />} />
            <Route
              path="settings/notifications"
              element={<NotificationSettings />}
            />
          </Route>
          {/* ------------------- MISC ------------------- */}
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

export default App;
