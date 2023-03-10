import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ authSessionToken, children }) => {
  if (!authSessionToken) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return children;
  }
};
