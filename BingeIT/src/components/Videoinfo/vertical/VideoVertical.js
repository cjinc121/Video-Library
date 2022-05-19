import React, { useState } from "react";
import "./VideoVertical.css";
import { useNavigate } from "react-router-dom";
import { BsEyeglasses, BsThreeDotsVertical } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { MdPlaylistAdd, MdWatchLater } from "react-icons/md";
import { useVideo } from "../../../context/video-context";
import { CreatePlaylist } from "../../CreatePlaylistcard/CreatePlaylist";
import { useAuth } from "../../../context/auth-context";
function VideoVertical({ video }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { videoState, videoDispatch } = useVideo();
  const {
    authState,
    addVideoToWatchLaterHandler,
    removeVideoFromWatchLaterHandler,
    removeVideoFromLikesHandler,
    addVideoToLikesHandler,
    addVideoToHistoryHandler,
  } = useAuth();
  const { isUserLoggedIn } = authState;
  const navigate = useNavigate();
  const isPresent = (id, array) => {
    if (array.find((item) => item._id === id)) return true;
    else return false;
  };
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
          onClick={() => {
            navigate(`/video/${video._id}`);
            addVideoToHistoryHandler(video);
          }}
          className="image-container"
        >
          <img src={video.thumbnail} alt="thumbnail" />
          <span>{video.duration}</span>
        </div>
        <div className="video-details">
          <div className="video-info">
            <h4
              onClick={() => {
                navigate(`/video/${video._id}`);
                addVideoToHistoryHandler(video);
              }}
            >
              {video.title}
            </h4>
            <p>
              {video.creator} || {video.views}K
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
                {isPresent(video._id, authState.watchlater) ? (
                  <button
                    className="dropdown-button"
                    onClick={() => removeVideoFromWatchLaterHandler(video._id)}
                  >
                    Remove From Watch Later
                    <MdWatchLater className="dropdown-icon" />
                  </button>
                ) : (
                  <button
                    className="dropdown-button"
                    onClick={() => addVideoToWatchLaterHandler(video)}
                  >
                    Add to watch Later
                    <MdWatchLater className="dropdown-icon" />
                  </button>
                )}
                {isPresent(video._id, authState.likes) ? (
                  <button
                    className="dropdown-button"
                    onClick={() => removeVideoFromLikesHandler(video._id)}
                  >
                    Remove From Liked Videos
                    <AiFillLike className="dropdown-icon" />
                  </button>
                ) : (
                  <button
                    className="dropdown-button"
                    onClick={() => addVideoToLikesHandler(video)}
                  >
                    Add to Liked Videos
                    <AiFillLike className="dropdown-icon" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoVertical;
