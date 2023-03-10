import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ authSessionToken, children, route }) => {
  if (route === "home") {
    if (!authSessionToken) {
      return <Navigate to="/login" replace />;
    } else {
      return children;
    }
  } else if (route === "login" || route === "signup") {
    if (!authSessionToken) {
      return children;
    } else {
      return <Navigate to="/" replace />;
    }
  }
};
