import { Navigate } from "react-router-dom";
export const Authroute = ({ authSessionToken, children }) => {
  if (!authSessionToken) {
    return children;
  } else {
    return <Navigate to="/" replace={true} />;
  }
};
