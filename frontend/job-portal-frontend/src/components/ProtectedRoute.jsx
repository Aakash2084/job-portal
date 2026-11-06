
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, authChecked } = useSelector(
    (state) => state.auth
  );

  // Wait until the session check finishes
  if (!authChecked) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;