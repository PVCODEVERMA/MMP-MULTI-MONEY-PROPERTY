import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles = [], children }) {
  const { user, loading, isAuthenticated } = useAuth();
  const loc = useLocation();

  if (loading) return null;                          
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: loc }} replace />;

  if (roles.length && !roles.includes(user.role.toLowerCase()))
    return <Navigate to="/unauthorized" replace />;

  return children;
}
