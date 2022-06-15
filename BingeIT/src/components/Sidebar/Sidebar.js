import React from "react";
import { AiFillHome, AiOutlineHistory, AiFillLike } from "react-icons/ai";
import { RiPlayList2Fill } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { search } from "../../features/video/videoSlice";
import { useDispatch } from "react-redux";
function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <ul className="sidebar">
      <li className="sidebar-item" onClick={() => {
        navigate("/");
        dispatch(search(""))
      }}>
        <AiFillHome className="sidebar-icon" />
        <div className="sidebar-item-name">Home</div>
      </li>
      <li className="sidebar-item" onClick={() => navigate("/playlist")}>
        <RiPlayList2Fill className="sidebar-icon" />
        <div className="sidebar-item-name">Playlist</div>
      </li>
      <li className="sidebar-item" onClick={() => navigate("/likes")}>
        <AiFillLike className="sidebar-icon" />
        <div className="sidebar-item-name">Liked Videos</div>
      </li>
      <li className="sidebar-item" onClick={() => navigate("/watchlater")}>
        <MdOutlineWatchLater className="sidebar-icon" />
        <div className="sidebar-item-name">Watch later</div>
      </li>
      <li className="sidebar-item" onClick={() => navigate("/history")}>
        <AiOutlineHistory className="sidebar-icon" />
        <div className="sidebar-item-name">History</div>
      </li>
    </ul>
  );
}

export { Sidebar };
