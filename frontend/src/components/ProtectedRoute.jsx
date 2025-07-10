import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { CircularProgress, Box } from "@mui/material";

export default function ProtectedRoute({ element, allowedRoles }) {
  const { user, isLoading } = useAuth();

  console.log("[ProtectedRoute] user:", user);
  console.log("[ProtectedRoute] isLoading:", isLoading);
  console.log("[ProtectedRoute] allowedRoles:", allowedRoles);

  if (isLoading) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    console.log("[ProtectedRoute] No user, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log("[ProtectedRoute] User role not allowed, redirecting to /");
    return <Navigate to="/" replace />;
  }

  console.log("[ProtectedRoute] Access granted");
  return element;
}
