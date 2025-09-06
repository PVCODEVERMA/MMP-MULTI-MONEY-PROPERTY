// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// ==========================================
// EXISTING COMPONENTS (Your Current Setup)
// ==========================================
import Navbar from "./components/Shared/Navbar";
import Home from "./pages/Home";
import LeadForm from "./pages/LeadForm";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import BrokerDashboard from "./components/Broker/Dashboard";
import BrokerProfile from "./components/Broker/Profile";
import BrokerLeads from "./components/Broker/Leads";
import Footer from "./components/Shared/Footer";
import BrokerLayout from "./layouts/BrokerLayout";
import PerformanceData from "./components/Broker/PerformanceData";
import OurCustomers from "./pages/OurCustomers";
import FAQSection from "./pages/FAQSection";
import ProjectsListing from "./pages/ProjectsListing";
import ProjectDetailsView from "./pages/ProjectDetailsView";
import MyProfile from "./pages/MyProfile";
import Settings from "./pages/Settings";

// ==========================================
// SUB ADMIN COMPONENTS (Company Level)
// ==========================================
import SubAdminLayout from "./layouts/SubAdminLayout";
import SubAdminLogin from "./components/Auth/SubAdminLogin";
import SubAdminDashboard from "./components/SubAdmin/SubAdminDashboard";
import SubAdminBrokers from "./components/SubAdmin/SubAdminBrokers";
import SubAdminPackages from "./components/SubAdmin/SubAdminPackages";
import SubAdminReports from "./components/SubAdmin/SubAdminReports";
import SubAdminLeads from "./components/SubAdmin/SubAdminLeads";
import SubAdminPayments from "./components/SubAdmin/SubAdminPayments";

// ==========================================
// SUPER ADMIN COMPONENTS (Boss Level)
// ==========================================
import SuperAdminLayout from "./components/superAdmin/layout/SuperAdminLayout";
import SuperAdminLogin from "./components/superAdmin/auth/SuperAdminLogin";

// SuperAdmin Dashboard Components
import DashboardOverview from "./components/superAdmin/dashboard/DashboardOverview";
import SystemHealthCard from "./components/superAdmin/dashboard/SystemHealthCard";
import RevenueChart from "./components/superAdmin/dashboard/RevenueChart";
import UserActivityChart from "./components/superAdmin/dashboard/UserActivityChart";
import AlertsPanel from "./components/superAdmin/dashboard/AlertsPanel";
import QuickActions from "./components/superAdmin/dashboard/QuickActions";

// SuperAdmin Company Components
import CompanyList from "./components/superAdmin/companies/CompanyList";
import CompanyDetails from "./components/superAdmin/companies/CompanyDetails";
import CompanyForm from "./components/superAdmin/companies/CompanyForm";
import CompanyVerification from "./components/superAdmin/companies/CompanyVerification";
import CompanyAnalytics from "./components/superAdmin/companies/CompanyAnalytics";

// SuperAdmin Broker Components  
import BrokerManagement from "./components/superAdmin/brokers/BrokerManagement";
import BrokerForm from "./components/superAdmin/brokers/BrokerForm";
import BrokerDetails from "./components/superAdmin/brokers/BrokerDetails";
import BrokerApproval from "./components/superAdmin/brokers/BrokerApproval";
import BrokerPerformanceAnalytics from "./components/superAdmin/brokers/BrokerPerformanceAnalytics";

// SuperAdmin Lead Components (Phase 1 MVP)
import LeadManagement from "./components/superAdmin/leads/LeadManagement";
import LeadDistribution from "./components/superAdmin/leads/LeadDistribution";
import TeleVerification from "./components/superAdmin/leads/TeleVerification";
import DuplicateCheck from "./components/superAdmin/leads/DuplicateCheck";

// SuperAdmin Payment Components (Razorpay/PayU Integration)
import PaymentOverview from "./components/superAdmin/payments/PaymentOverview";
import PackageManagement from "./components/superAdmin/payments/PackageManagement";
import WalletManagement from "./components/superAdmin/payments/WalletManagement";
import InvoiceManagement from "./components/superAdmin/payments/InvoiceManagement";
import PendingPayments from "./components/superAdmin/payments/PendingPayments";

// SuperAdmin Analytics Components
import AnalyticsDashboard from "./components/superAdmin/analytics/AnalyticsDashboard";
import BrokerAnalytics from "./components/superAdmin/analytics/BrokerAnalytics";

// SuperAdmin Integration Components (FB/Google Lead Ads)
import IntegrationHub from "./components/superAdmin/integrations/IntegrationHub";
import FacebookIntegration from "./components/superAdmin/integrations/FacebookIntegration";
import GoogleIntegration from "./components/superAdmin/integrations/GoogleIntegration";
import WhatsAppIntegration from "./components/superAdmin/integrations/WhatsAppIntegration";
import EmailIntegration from "./components/superAdmin/integrations/EmailIntegration";

// SuperAdmin System Components
import SystemManagement from "./components/superAdmin/system/SystemManagement";
import SystemSettings from "./components/superAdmin/system/SystemSettings";
import BackupManagement from "./components/superAdmin/system/BackupManagement";
import SystemMaintenance from "./components/superAdmin/system/SystemMaintenance";
import SystemUpdates from "./components/superAdmin/system/SystemUpdates";

// ==========================================
// AUTH PROVIDERS & HOOKS
// ==========================================
import { AuthProvider } from './hooks/auth/AuthProvider';

// ==========================================
// MUI THEME CONFIGURATION FOR MMP SYSTEM
// ==========================================
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',        // MMP Primary Blue
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',        // MMP Accent Red
      light: '#ff5983',
      dark: '#9a002e',
    },
    success: {
      main: '#2e7d32',        // Success Green
      light: '#4caf50',
      dark: '#1b5e20',
    },
    warning: {
      main: '#ed6c02',        // Warning Orange
      light: '#ff9800',
      dark: '#e65100',
    },
    error: {
      main: '#d32f2f',        // Error Red
      light: '#f44336',
      dark: '#c62828',
    },
    info: {
      main: '#0288d1',        // Info Blue
      light: '#03a9f4',
      dark: '#01579b',
    },
    background: {
      default: '#f5f5f5',     // Light Gray Background
      paper: '#ffffff',       // White Paper
    },
    text: {
      primary: '#212121',     // Dark Gray Text
      secondary: '#757575',   // Medium Gray Text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { 
      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, 
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: { 
      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }, 
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: { 
      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }, 
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: { 
      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }, 
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: { 
      fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' }, 
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: { 
      fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }, 
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
          transition: 'all 0.2s ease',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
          fontSize: '0.8125rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#f8f9fa',
        },
      },
    },
  },
});

// ==========================================
// REACT-HOT-TOAST CONFIGURATION
// ==========================================
const toastOptions = {
  duration: 4000,
  position: 'top-right',
  style: {
    borderRadius: '12px',
    background: '#333',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    maxWidth: '500px',
    padding: '12px 16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  success: {
    duration: 3000,
    iconTheme: { primary: '#4caf50', secondary: '#fff' },
    style: { background: '#4caf50', color: '#fff' },
  },
  error: {
    duration: 5000,
    iconTheme: { primary: '#f44336', secondary: '#fff' },
    style: { background: '#f44336', color: '#fff' },
  },
  loading: {
    iconTheme: { primary: '#2196f3', secondary: '#fff' },
    style: { background: '#2196f3', color: '#fff' },
  },
  warning: {
    duration: 4000,
    iconTheme: { primary: '#ff9800', secondary: '#fff' },
    style: { background: '#ff9800', color: '#fff' },
  },
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
  const location = useLocation();

  // Hide navbar/footer for admin panels, broker dashboards, and super-admin console
  const hideNavFooter = 
    location.pathname.startsWith("/admin") ||          // Sub Admin routes
    location.pathname.startsWith("/broker") ||         // Broker routes
    location.pathname.startsWith("/super-admin") ||    // Super Admin routes
    location.pathname.startsWith("/auth/super-admin") || // Super Admin auth
    location.pathname.startsWith("/auth/sub-admin");   // Sub Admin auth

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            
            {/* ==========================================
                NAVBAR - Show only for public pages
                ========================================== */}
            {!hideNavFooter && <Navbar />}

            <Box sx={{ flexGrow: 1 }}>
              <Routes>
                
                {/* ==========================================
                    PUBLIC ROUTES (User Role)
                    ========================================== */}
                <Route path="/" element={<Home />} />
                <Route path="/projectsListing" element={<ProjectsListing />} />
                <Route path="/projectDetailsView/:id" element={<ProjectDetailsView />} />
                <Route path="/lead-form" element={<LeadForm />} />
                <Route path="/ourCustomers" element={<OurCustomers />} />
                <Route path="/plans" element={<SubscriptionPlans />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/fAQSection" element={<FAQSection />} />

                {/* ==========================================
                    BROKER ROUTES (Agent Level)
                    Phase 1: Phone OTP + Email, Profile, Package/Wallet
                    ========================================== */}
                <Route path="/broker" element={<BrokerLayout />}>
                  <Route path="dashboard" element={<BrokerDashboard />} />
                  <Route path="profile" element={<BrokerProfile />} />
                  <Route path="leads" element={<BrokerLeads />} />
                  <Route path="performanceData" element={<PerformanceData />} />
                </Route>

                {/* ==========================================
                    SUB ADMIN ROUTES (Company Level)
                    Manage brokers within their company
                    ========================================== */}
                <Route path="/auth/sub-admin/login" element={<SubAdminLogin />} />
                
                <Route path="/admin" element={<SubAdminLayout />}>
                  <Route path="dashboard" element={<SubAdminDashboard />} />
                  <Route path="brokers" element={<SubAdminBrokers />} />
                  <Route path="leads" element={<SubAdminLeads />} />
                  <Route path="packages" element={<SubAdminPackages />} />
                  <Route path="payments" element={<SubAdminPayments />} />
                  <Route path="reports" element={<SubAdminReports />} />
                </Route>

                {/* ==========================================
                    SUPER ADMIN AUTHENTICATION
                    ========================================== */}
                <Route path="/auth/super-admin/login" element={<SuperAdminLogin />} />

                {/* ==========================================
                    SUPER ADMIN ROUTES (Boss Level)
                    Complete MMP System Management
                    ========================================== */}
                <Route path="/super-admin/*" element={
                  <SuperAdminLayout>
                    <Routes>
                      {/* Dashboard & Overview */}
                      <Route path="/" element={<DashboardOverview />} />
                      <Route path="/dashboard" element={<DashboardOverview />} />
                      
                      {/* System Health Monitoring */}
                      <Route path="/system-health" element={<SystemHealthCard />} />
                      
                      {/* Company Management (RERA Verification) */}
                      <Route path="/companies" element={<CompanyList />} />
                      <Route path="/companies/new" element={<CompanyForm />} />
                      <Route path="/companies/:id" element={<CompanyDetails />} />
                      <Route path="/companies/:id/edit" element={<CompanyForm />} />
                      <Route path="/companies/verification" element={<CompanyVerification />} />
                      <Route path="/companies/analytics" element={<CompanyAnalytics />} />
                      
                      {/* Broker Management (Phone OTP + Email Oversight) */}
                      <Route path="/brokers" element={<BrokerManagement />} />
                      <Route path="/brokers/new" element={<BrokerForm />} />
                      <Route path="/brokers/:id" element={<BrokerDetails />} />
                      <Route path="/brokers/pending" element={<BrokerApproval />} />
                      <Route path="/brokers/performance" element={<BrokerPerformanceAnalytics />} />
                      
                      {/* Lead Management (Phase 1: Distribution to 3 Brokers, Tele-verification) */}
                      <Route path="/leads" element={<LeadManagement />} />
                      <Route path="/leads/distribute" element={<LeadDistribution />} />
                      <Route path="/leads/verification" element={<TeleVerification />} />
                      <Route path="/leads/duplicates" element={<DuplicateCheck />} />
                      
                      {/* Payment Management (Phase 1: Razorpay/PayU, Packages vs Wallet) */}
                      <Route path="/payments" element={<PaymentOverview />} />
                      <Route path="/payments/packages" element={<PackageManagement />} />
                      <Route path="/payments/wallet" element={<WalletManagement />} />
                      <Route path="/payments/invoices" element={<InvoiceManagement />} />
                      <Route path="/payments/pending" element={<PendingPayments />} />
                      
                      {/* Analytics & Reports (Phase 1: Revenue Reports - Packages vs Wallet) */}
                      <Route path="/analytics" element={<AnalyticsDashboard />} />
                      <Route path="/analytics/revenue" element={<RevenueChart />} />
                      <Route path="/analytics/brokers" element={<BrokerAnalytics />} />
                      <Route path="/analytics/contact" element={<UserActivityChart />} />
                      
                      {/* Integrations (Phase 1: FB/Google Lead Ads via Zapier/Pabbly/Make) */}
                      <Route path="/integrations" element={<IntegrationHub />} />
                      <Route path="/integrations/facebook" element={<FacebookIntegration />} />
                      <Route path="/integrations/google" element={<GoogleIntegration />} />
                      <Route path="/integrations/whatsapp" element={<WhatsAppIntegration />} />
                      <Route path="/integrations/email" element={<EmailIntegration />} />
                      
                      {/* System Management */}
                      <Route path="/system" element={<SystemManagement />} />
                      <Route path="/system/settings" element={<SystemSettings />} />
                      <Route path="/system/backup" element={<BackupManagement />} />
                      <Route path="/system/maintenance" element={<SystemMaintenance />} />
                      <Route path="/system/updates" element={<SystemUpdates />} />
                    </Routes>
                  </SuperAdminLayout>
                } />

                {/* ==========================================
                    404 ERROR PAGE
                    ========================================== */}
                <Route path="*" element={
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      minHeight: '60vh',
                      flexDirection: 'column',
                      gap: 3,
                      textAlign: 'center',
                      p: 3
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: '6rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #1976d2, #dc004e)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      404
                    </Box>
                    <Box>
                      <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>
                        Page Not Found
                      </h2>
                      <p style={{ margin: '0 0 24px 0', color: '#666' }}>
                        The page you're looking for doesn't exist or has been moved.
                      </p>
                    </Box>
                    <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
                      <button 
                        onClick={() => window.history.back()}
                        style={{
                          padding: '12px 24px',
                          borderRadius: '8px',
                          border: '1px solid #1976d2',
                          background: 'transparent',
                          color: '#1976d2',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: '600',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        ← Go Back
                      </button>
                      <button 
                        onClick={() => window.location.href = '/'}
                        style={{
                          padding: '12px 24px',
                          borderRadius: '8px',
                          border: 'none',
                          background: '#1976d2',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: '600',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        🏠 Go Home
                      </button>
                    </Box>
                  </Box>
                } />
              </Routes>
            </Box>

            {/* ==========================================
                FOOTER - Show only for public pages
                ========================================== */}
            {!hideNavFooter && <Footer />}
          </Box>

          {/* ==========================================
              GLOBAL TOAST NOTIFICATIONS
              ========================================== */}
          <Toaster 
            toastOptions={toastOptions}
            containerStyle={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          />
          
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
