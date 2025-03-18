import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles, role }) => {
  return allowedRoles.includes(role) ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
