import React from "react";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function Header() {
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
      <div className="user">
        Login
        <FaUserCircle className="user-icon" />
      </div>
    </div>
  );
}

export { Header };
