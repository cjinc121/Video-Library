import React from "react";
import "./VideoVertical.css";
import { useNavigate } from "react-router-dom";
import { useVideo } from "../../../context/video-context";

function VideoVertical({ video }) {
  const navigate = useNavigate();
  return (
    <div className="video-vertical-card">
      <div
        onClick={() => navigate(`/video/${video._id}`)}
        className="image-container"
      >
        <img src={video.thumbnail} alt="thumbnail" />
        <span>{video.duration}</span>
      </div>
      <div className="video-details">
        <div className="video-info">
          <h4 onClick={() => navigate(`/video/${video._id}`)}>{video.title}</h4>
          <p>
            {video.creator} &#9734; {video.views}K
          </p>
        </div>
        {/* <ActionMenuDropdown item={video._id} /> */}
      </div>
    </div>
  );
}

export default VideoVertical;
