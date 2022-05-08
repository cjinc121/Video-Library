import React, { useState } from "react";
import "./VideoVertical.css";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPlaylistAdd, MdWatchLater } from "react-icons/md";
import { useVideo } from "../../../context/video-context";
import { CreatePlaylist } from "../../CreatePlaylistcard/CreatePlaylist";
import { useAuth } from "../../../context/auth-context";
function VideoVertical({ video }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { videoState, videoDispatch } = useVideo();
  const { authState } = useAuth();
  const { isUserLoggedIn } = authState;
  const navigate = useNavigate();
  return (
    <>
      {videoState.playlistModal && (
        <div
          className="modal-page"
          onClick={() =>
            videoDispatch({
              type: "PLAYLIST_MODAL",
            })
          }
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <CreatePlaylist />
          </div>
        </div>
      )}
      <div className="video-vertical-card" key={video._id}>
        <div
          onClick={() => navigate(`/video/${video._id}`)}
          className="image-container"
        >
          <img src={video.thumbnail} alt="thumbnail" />
          <span>{video.duration}</span>
        </div>
        <div className="video-details">
          <div className="video-info">
            <h4 onClick={() => navigate(`/video/${video._id}`)}>
              {video.title}
            </h4>
            <p>
              {video.creator} &#9734; {video.views}K
            </p>
          </div>
          <div className="dropdown-action-button">
            <BsThreeDotsVertical
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="dropdown">
                <button
                  className="dropdown-button"
                  onClick={() => {
                    if (isUserLoggedIn) {
                      videoDispatch({ type: "PLAYLIST_MODAL" });
                      videoDispatch({
                        type: "VIDEO_TO_BE_ADDED",
                        payload: video,
                      });
                    } else navigate("/login");
                  }}
                >
                  Add to Playlist
                  <MdPlaylistAdd className="dropdown-icon" />
                </button>
                <button className="dropdown-button">
                  Add to watch Later
                  <MdWatchLater className="dropdown-icon" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoVertical;
