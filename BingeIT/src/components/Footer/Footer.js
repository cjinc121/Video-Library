import React from "react";
import "./Footer.css";
import { AiFillHome, AiFillLike } from "react-icons/ai";
import { RiPlayList2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth } from "../../features/auth/authSlice";
const Footer = () => {
  const navigate = useNavigate();
  const authState = useSelector(getAuth);
  const { isUserLoggedIn } = authState;
  return (
    <div className="footer">
      <li className="footer-item" onClick={() => navigate("/")}>
        <AiFillHome className="footer-icon" />
        <div className="footer-item-name">Home</div>
      </li>
      <li className="footer-item" onClick={() => navigate("/playlist")}>
        <RiPlayList2Fill className="footer-icon" />
        <div className="footer-item-name">Playlist</div>
      </li>
      <li className="footer-item" onClick={() => navigate("/likes")}>
        <AiFillLike className="footer-icon" />
        <div className="footer-item-name">Liked Videos</div>
      </li>

      {isUserLoggedIn ? (
        <li className="footer-item" onClick={() => navigate("/profile")}>
          <FaUserCircle className="footer-icon" />
          <div className="footer-item-name">Profile</div>
        </li>
      ) : (
        <li className="footer-item" onClick={() => navigate("/login")}>
          <FaUserCircle className="footer-icon" />
          <div className="footer-item-name">Login</div>
        </li>
      )}
    </div>
  );
};

export { Footer };
