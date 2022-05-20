import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endSession, getAuth } from "../../features/auth/authSlice";

const Profile = () => {
  const authState = useSelector(getAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutHandler = () => {
    localStorage.removeItem("token");
    dispatch(endSession());
    navigate("/login");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="login-container">
      <div className="login-form">
        <h3>BingeIT</h3>

        {authState.user.firstName && (
          <h4>
            {" "}
            Name: {authState.user.firstName} {authState.user.lastName}
          </h4>
        )}
        {authState.user.email && <p>Email: {authState.user.email}</p>}
        <button onClick={() => signOutHandler()}>Sign Out</button>
      </div>
    </div>
  );
};
export { Profile };
