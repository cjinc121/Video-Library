import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const PrivateRoute = ({ navigateTo }) => {
  const { authState } = useAuth();
  return authState.isUserLoggedIn ? (
    navigateTo
  ) : (
    <Navigate replace to="/login"></Navigate>
  );
};
export { PrivateRoute };
