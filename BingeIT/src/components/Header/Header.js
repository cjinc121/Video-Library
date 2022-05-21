import React, { useState } from "react";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../features/video/videoSlice";
import { getAuth } from "../../features/auth/authSlice";
function Header() {
  const authState = useSelector(getAuth);
  const dispatch = useDispatch();
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
            dispatch(search(input));
          }}
        />
        <button
          className="search-button"
          onClick={() => {
            dispatch(search(input));
          }}
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
