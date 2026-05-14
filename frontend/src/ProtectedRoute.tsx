import { Navigate, useLocation } from "react-router";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, but save the current location to redirect back after login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user's role is in the allowed list
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Multi-tenancy check: SCHOOL_ADMIN and TEACHER roles must have a schoolId
  // PARENT can exist without a schoolId until they're associated with one
  if (user && (user.role === 'SCHOOL_ADMIN' || user.role === 'TEACHER') && !user?.schoolId) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;