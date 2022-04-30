import React from "react";
import { AiFillHome, AiOutlineHistory, AiFillLike } from "react-icons/ai";
import { RiPlayList2Fill } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";
import "./Sidebar.css";
function Sidebar() {
  return (
    <ul className="sidebar">
      <li className="sidebar-item">
        <AiFillHome className="sidebar-icon" />
        <div className="sidebar-item-name">Home</div>
      </li>
      <li className="sidebar-item">
        <RiPlayList2Fill className="sidebar-icon" />
        <div className="sidebar-item-name">Playlist</div>
      </li>
      <li className="sidebar-item">
        <AiFillLike className="sidebar-icon" />
        <div className="sidebar-item-name">Liked Videos</div>
      </li>
      <li className="sidebar-item">
        <MdOutlineWatchLater className="sidebar-icon" />
        <div className="sidebar-item-name">Watch later</div>
      </li>
      <li className="sidebar-item">
        <AiOutlineHistory className="sidebar-icon" />
        <div className="sidebar-item-name">History</div>
      </li>
    </ul>
  );
}

export { Sidebar };
