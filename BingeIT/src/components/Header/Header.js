import React from "react";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
function Header() {
  const { authState } = useAuth();
  const { isUserLoggedIn } = authState;
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="brand-name" onClick={() => navigate("/")}>
        BingeIT
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-button">
          <BsSearch className="search-icon" />
        </button>
      </div>
      {!isUserLoggedIn && (
        <div className="user">
          Login
          <FaUserCircle
            className="user-icon"
            onClick={() => navigate("/login")}
          />
        </div>
      )}
      {isUserLoggedIn && (
        <div className="user">
          <h4>Hi {authState.user.firstName}</h4>
          <FaUserCircle
            className="user-icon"
            onClick={() => navigate("/profile")}
          />
        </div>
      )}
    </div>
  );
}

export { Header };
