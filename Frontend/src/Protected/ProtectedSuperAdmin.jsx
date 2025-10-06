
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthSuperAdmin } from "../context/AuthContextSuperAdmin.jsx";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

const ProtectedSuperAdmin = ({ children }) => {
  const { superAdmin, loading } = useAuthSuperAdmin();
  const location = useLocation();

  if (loading) return <LoadingSpinner message="Checking authentication..." />;

  if (!superAdmin) {
    // Not logged in, redirect to login
    return <Navigate to="/superadmin-login" state={{ from: location }} replace />;
  }

  if ((superAdmin.role || "").toLowerCase() !== "superadmin") {
    // Logged in but not superadmin
    toast.error("You don’t have permission to access this page");
    return <Navigate to="/unauthorized" replace />;
  }

  // Authenticated & authorized
  return children;
};

export default ProtectedSuperAdmin;
