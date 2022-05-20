import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAuth } from "../features/auth/authSlice";

const PrivateRoute = ({ navigateTo }) => {
  const authState = useSelector(getAuth);
  return authState.isUserLoggedIn ? (
    navigateTo
  ) : (
    <Navigate replace to="/login"></Navigate>
  );
};
export { PrivateRoute };
