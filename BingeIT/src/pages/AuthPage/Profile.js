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
    localStorage.removeItem("user");
    dispatch(endSession());
    navigate("/login");
  };
  const currentUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="login-container">
      <div className="login-form">
        <h3>BingeIT</h3>
        <h4>
          Name: {currentUser.firstName} {currentUser.lastName}
        </h4>
        <p>Email: {currentUser.email}</p>
        <button onClick={() => signOutHandler()}>Sign Out</button>
      </div>
    </div>
  );
};
export { Profile };
