import React, { useState } from "react";
import "./VideoHorizontal.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgPlayListRemove } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";
import { removeVideoFromPlaylistService } from "../../../services/playlistCalls";
function VideoHorizontal({ video }) {
  const { playlistId } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const { authDispatch, authState } = useAuth();
  const { tokenVal } = authState;
  const navigate = useNavigate();
  const deleteVideoFromPlaylistHandler = async (id, videoId) => {
    try {
      const { data, status } = await removeVideoFromPlaylistService(
        id,
        videoId,
        tokenVal
      );
      if (status === 200)
        authDispatch({
          type: "DELETE_VIDEO_FROM_PLAYLIST",
          payload: data.playlist,
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div
        onClick={() => navigate(`/video/${video._id}`)}
        className="image-container"
      >
        <img src={video.thumbnail} alt="thumbnail" />
        <span>{video.duration}</span>
      </div>
      <div className="video-details">
        <h4 onClick={() => navigate(`/video/${video._id}`)}>{video.title}</h4>
        <p>
          {video.creator} &#9734; {video.views}
        </p>
      </div>
      <div className="dropdown-action-button">
        <BsThreeDotsVertical onClick={() => setShowDropdown(!showDropdown)} />
        {showDropdown && (
          <div className="dropdown">
            <button
              className="dropdown-button"
              onClick={() =>
                deleteVideoFromPlaylistHandler(playlistId, video._id)
              }
            >
              Delete Video From Playlist
              <CgPlayListRemove className="dropdown-icon" />
            </button>
            {/* <button className="dropdown-button">
              Add to watch Later
              <MdWatchLater className="dropdown-icon" />
            </button> */}
          </div>
        )}
      </div>
    </>
  );
}

export { VideoHorizontal };
