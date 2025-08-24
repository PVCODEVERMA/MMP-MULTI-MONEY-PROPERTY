import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import Home from "./pages/Home";

import LeadForm from "./pages/LeadForm";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import BrokerDashboard from "./components/Broker/Dashboard";
import BrokerProfile from "./components/Broker/Profile";
import BrokerLeads from "./components/Broker/Leads";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminBrokers from "./components/Admin/AdminBrokers";
import AdminPackages from "./components/Admin/AdminPackages";
import AdminReports from "./components/Admin/AdminReports";
import Footer from "./components/Shared/Footer";
import BrokerLayout from "./layouts/BrokerLayout";
import AdminLayout from "./layouts/AdminLayout";
import AddLead from "./components/Admin/AddLead";
import PerformanceData from "./components/Broker/PerformanceData";
import OurCustomers from "./pages/OurCustomers";
import FAQSection from "./pages/FAQSection";
import ProjectsListing from "./pages/ProjectsListing";
import ProjectDetailsView from "./pages/ProjectDetailsView";

function App() {
  const location = useLocation();

  // Helper: Only show navbar/footer if not in /admin/*
  const hideNavFooter = 
   location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/broker");

  return (
    <>
      {!hideNavFooter && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/projectsListing" element={<ProjectsListing />} />
        <Route path="/projectDetailsView/:id" element={<ProjectDetailsView />} />
        

        <Route path="/lead-form" element={<LeadForm />} />
        <Route path="/ourCustomers" element={<OurCustomers />} />
        <Route path="/plans" element={<SubscriptionPlans />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/fAQSection" element={<FAQSection />} />


        {/* Broker nested routes */}
        <Route path="/broker" element={<BrokerLayout />}>
          <Route path="dashboard" element={<BrokerDashboard />} />
          <Route path="profile" element={<BrokerProfile />} />
          <Route path="leads" element={<BrokerLeads />} />
          <Route path="performanceData" element={<PerformanceData />} />
        </Route>

        {/* Admin nested routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="brokers" element={<AdminBrokers />} />
          <Route path="addLead" element={<AddLead />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
      </Routes>

      {!hideNavFooter && <Footer />}
    </>
  );
}

export default App;
