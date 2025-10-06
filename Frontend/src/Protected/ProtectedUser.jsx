import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

const ProtectedUser = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const loc = useLocation();

  console.log("ProtectedUser:", { loading, isAuthenticated, user });

  if (loading) return <LoadingSpinner message="Checking authentication..." />;

  // If not logged in → redirect to login
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }

  // If logged in but role is not "user"
  if (user?.role !== "User") {
    toast.error("You don’t have permission for this page");
    return <Navigate to="/unauthorized" replace />;
  }

  // Otherwise show the page
  return children;
};

export default ProtectedUser;
