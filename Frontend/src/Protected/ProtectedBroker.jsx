import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

const ProtectedBroker = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const loc = useLocation();

  console.log("ProtectedBroker:", { loading, isAuthenticated, user });

  if (loading) return <LoadingSpinner message="Checking authentication..." />;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: loc }} replace />;
  if (user?.role !== "broker") {
    toast.error("You don’t have permission for this page");
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default ProtectedBroker;
