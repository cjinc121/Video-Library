import React, { useState } from "react";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useVideo } from "../../context/video-context";
function Header() {
  const { authState } = useAuth();
  const { videoDispatch } = useVideo();
  const { isUserLoggedIn } = authState;
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  return (
    <div className="header">
      <div className="brand-name" onClick={() => navigate("/")}>
        BingeIT
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          onChange={(e) => {
            setInput(e.target.value);
            videoDispatch({ type: "SEARCH", payload: input });
          }}
        />
        <button
          className="search-button"
          onClick={() => videoDispatch({ type: "SEARCH", payload: input })}
        >
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
          {authState.user.firstName && <h4>Hi {authState.user.firstName}</h4>}
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
