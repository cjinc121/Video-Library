import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, logIn } from "../../features/auth/authSlice";
import "./AuthPage.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authState = useSelector(getAuth);
  const dispatch = useDispatch();
  const guestUser = {
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
  };
  const navigate = useNavigate();

  const logInHandler = ({ email, password }) => {
    dispatch(logIn({ email, password }));
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="login-container">
      <div className="login-form">
        <h3>Login</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="Password"
        />

        <button onClick={() => logInHandler({ email, password })}>
          Continue
        </button>
        <h4>Or</h4>
        <button
          onClick={() => logInHandler(guestUser)}
          className="guest-login-btn"
        >
          Guest Login
        </button>
        <div>
          New to Website?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <span className="link"> SIGN UP </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export { LoginPage };
