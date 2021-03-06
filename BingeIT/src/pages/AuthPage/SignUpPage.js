import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPage.css";
import { signUp } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
function SignUpPage() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpHandler = async ({ first, last, email, password }) => {
    dispatch(signUp({ first, last, email, password }));
    navigate("/");
  };
  useEffect(() => {
    window.scrollTo(0, 500);
  }, []);
  return (
    <div className="login-container">
      <div className="login-form">
        <h3>Sign Up</h3>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
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

        <button
          onClick={() =>
            signUpHandler({ firstname, lastname, email, password })
          }
        >
          Continue
        </button>
        <h4>Or</h4>

        <div>
          Already a user?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span className="link"> LOGIN </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
