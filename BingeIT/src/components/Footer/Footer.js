import React from "react";
import "./Footer.css";
import { AiFillHome, AiFillLike } from "react-icons/ai";
import { RiPlayList2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer">
      <li className="footer-item">
        <AiFillHome className="footer-icon" />
        <div className="footer-item-name">Home</div>
      </li>
      <li className="footer-item">
        <RiPlayList2Fill className="footer-icon" />
        <div className="footer-item-name">Playlist</div>
      </li>
      <li className="footer-item">
        <AiFillLike className="footer-icon" />
        <div className="footer-item-name">Liked Videos</div>
      </li>

      <li className="footer-item">
        <FaUserCircle className="footer-icon" />
        <div className="footer-item-name">Login</div>
      </li>
    </div>
  );
};

export { Footer };
